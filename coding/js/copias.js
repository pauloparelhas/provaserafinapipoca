/* copias.js — "Guardar e começar do zero" (Opções > Área do papai).
   No computador da família a Fábrica abre pelo atalho "Abrir a Fabrica.bat", que liga o
   servidor local (_engenharia/servidor_local.py): as cópias vão para coding/guardados/, uma por
   arquivo com data e nome. Fora dele (site publicado) a cópia vai para Downloads, como antes.
   Só fala com a própria origem (URL_G); conferido por gate/seguranca.js. */
var FAB = window.FAB = window.FAB || {};
(function () {
var URL_G = '/fabrica-salvos/', CHAVE = 'fab_mariana_v1';
var temPasta = null;   /* null = ainda não perguntou ao servidor */

function pede(caminho, op) {
  return fetch(URL_G + caminho, Object.assign({ cache: 'no-store' }, op || {})).then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); });
}
var G = FAB.copias = {
  /* a pasta coding/guardados existe só com o servidor local */
  pasta: function () {
    if (temPasta !== null) return Promise.resolve(temPasta);
    if (location.protocol !== 'http:' || !/^(127\.0\.0\.1|localhost)$/.test(location.hostname)) return Promise.resolve(temPasta = false);
    return pede('lista').then(function () { return (temPasta = true); }, function () { return (temPasta = false); });
  },
  lista: function () { return pede('lista'); },
  /* guarda o estado de agora; devolve o nome do arquivo (ou 'Downloads') */
  guarda: function (nome) {
    FAB.salva();
    return G.pasta().then(function (ok) {
      if (!ok) { FAB.exporta(); return 'Downloads'; }
      return pede('guarda?nome=' + encodeURIComponent(nome || ''), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(FAB.E) })
        .then(function (r) { return r.arquivo; });
    });
  },
  abre: function (arquivo) {
    return pede('abre?arquivo=' + encodeURIComponent(arquivo)).then(function (estado) {
      if (!estado || !Array.isArray(estado.jogos)) throw new Error('não é da Fábrica');
      try { localStorage.setItem(CHAVE + '_antes_de_importar', JSON.stringify(FAB.E)); } catch (e) {}
      G.troca(estado);
    });
  },
  /* começa do zero: a Fábrica volta à primeira visita (voz e idioma ficam) */
  zera: function () {
    var P = FAB.E.prefs || {};
    try {
      localStorage.setItem(CHAVE + '_antes_de_zerar', JSON.stringify(FAB.E));
      localStorage.setItem('fab_zerou', JSON.stringify({ voz: P.voz, vel: P.vel, lingua: P.lingua }));
    } catch (e) {}
    G.troca(null);
  },
  temDesfazer: function () { try { return !!localStorage.getItem(CHAVE + '_antes_de_zerar'); } catch (e) { return false; } },
  desfazZera: function () {
    var s = null; try { s = JSON.parse(localStorage.getItem(CHAVE + '_antes_de_zerar') || 'null'); } catch (e) {}
    if (s) { try { localStorage.removeItem(CHAVE + '_antes_de_zerar'); } catch (e) {} G.troca(s); }
  },
  /* troca o estado inteiro e recarrega (o salvamento de saída não pode regravar o antigo) */
  troca: function (estado) {
    FAB.compartilhado = true;
    try {
      if (estado) localStorage.setItem(CHAVE, JSON.stringify(estado)); else localStorage.removeItem(CHAVE);
      localStorage.removeItem('fab_veio_da_nuvem'); if (!estado) localStorage.removeItem('fab_tela');
    } catch (e) {}
    location.reload();
  }
};
})();
