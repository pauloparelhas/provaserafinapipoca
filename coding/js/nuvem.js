/* ============================================================
   nuvem.js — a NUVEM DA FAMÍLIA (opcional, ligada pelo papai)
   Guarda o progresso dela num servidor da família (Cloudflare,
   ver _nuvem/ e _engenharia/NUVEM.md) para continuar em outro
   computador e não perder nada. Sem conta, sem e-mail, sem nome:
   só a CHAVE DA FAMÍLIA (código longo), que fica neste navegador
   e nunca vai dentro do arquivo .json nem do link do jogo.
   Desligada = a Fábrica não faz nenhuma conexão (CSP só libera
   este endereço).
   ============================================================ */
(function () {
'use strict';
var URL_N = 'https://fabrica-mariana-nuvem.pauloparelhas.workers.dev', CH = 'fab_nuvem_chave', CHAVE_E = 'fab_mariana_v1';
var N = FAB.nuvem = { url: URL_N, estado: 'desligada', quando: 0 }, tEnvia = null;

function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
N.chave = function () { var c = ler(CH); return c && /^[A-Za-z0-9-]{20,80}$/.test(c) ? c : null; };
N.ligada = function () { return !!N.chave() && !FAB.compartilhado && !navigator.webdriver; };
N.gera = function () {
  var A = 'abcdefghjkmnpqrstuvwxyz23456789', b = new Uint8Array(24), s = '';
  crypto.getRandomValues(b); for (var i = 0; i < 24; i++) { s += A[b[i] % A.length]; if (i % 6 === 5 && i < 23) s += '-'; }
  return s;
};
function avisa(st) { N.estado = st; N.quando = Date.now(); if (N.aoMudar) N.aoMudar(st); }
function pede(metodo, caminho, corpo) {
  return fetch(URL_N + caminho, { method: metodo, headers: { Authorization: 'Bearer ' + N.chave(), 'Content-Type': 'application/json' }, body: corpo, cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('nuvem ' + r.status); return r.json(); });
}
/* manda o estado inteiro (a cada mudança, depois de 12 s parada) */
N.envia = function () {
  if (!N.ligada()) return Promise.resolve(false);
  avisa('enviando');
  var corpo = JSON.stringify({ salvoEm: FAB.E.salvoEm || Date.now(), estado: FAB.E });
  if (corpo.length > 1850000) {   /* grande demais para a nuvem (1,9 MB): vai sem as fotos antigas do jogo; elas ficam aqui */
    var leve = JSON.parse(corpo); (leve.estado.jogos || []).forEach(function (j) { j.versoes = (j.versoes || []).slice(-3); }); corpo = JSON.stringify(leve);
  }
  return pede('PUT', '/v1/estado', corpo)
    .then(function () { avisa('guardada'); return true; })
    .catch(function () { avisa('sem-internet'); return false; });
};
N.agenda = function () { if (!N.ligada()) return; clearTimeout(tEnvia); tEnvia = setTimeout(N.envia, 12000); };
/* ao abrir: se a nuvem tem trabalho mais novo (feito em outro computador), traz */
N.puxa = function (forcar) {   /* forcar: acabou de pôr a chave aqui — o trabalho de lá vem, o daqui vira cópia */
  if (!N.ligada()) return Promise.resolve(false);
  avisa('olhando');
  return pede('GET', '/v1/estado').then(function (r) {
    if (!r || r.vazio || !r.estado) { avisa('guardada'); return N.envia().then(function () { return false; }); }
    if (!forcar && (r.salvoEm || 0) <= (FAB.E.salvoEm || 0)) { avisa('guardada'); if ((r.salvoEm || 0) < (FAB.E.salvoEm || 0)) N.agenda(); return false; }
    try { localStorage.setItem(CHAVE_E + '_antes_da_nuvem', JSON.stringify(FAB.E)); } catch (e) {}
    try { localStorage.setItem(CHAVE_E, JSON.stringify(r.estado)); localStorage.setItem('fab_veio_da_nuvem', '1'); } catch (e) { avisa('cheia'); return false; }
    FAB.E = r.estado;   /* senão o 'guardar ao sair' (estado.js) grava o trabalho velho por cima */
    location.reload(); return true;
  }).catch(function () { avisa('sem-internet'); return false; });
};
N.liga = function (chave) {
  try { localStorage.setItem(CH, chave); } catch (e) { return Promise.resolve(false); }
  return N.puxa(true);
};
N.desliga = function () { try { localStorage.removeItem(CH); } catch (e) {} clearTimeout(tEnvia); avisa('desligada'); };
N.versoes = function () { return N.ligada() ? pede('GET', '/v1/versoes') : Promise.resolve([]); };
N.volta = function (salvoEm) {
  return pede('GET', '/v1/versao/' + salvoEm).then(function (r) {
    if (!r || !r.estado) return false;
    try { localStorage.setItem(CHAVE_E + '_antes_da_nuvem', JSON.stringify(FAB.E)); r.estado.salvoEm = Date.now(); localStorage.setItem(CHAVE_E, JSON.stringify(r.estado)); } catch (e) { return false; }
    FAB.E = r.estado;
    location.reload(); return true;
  });
};
N.textoEstado = function () {
  return { desligada: 'Desligada: tudo fica só neste computador.', olhando: 'Olhando a nuvem…', enviando: 'Guardando na nuvem…',
    guardada: 'Guardado na nuvem da família.', 'sem-internet': 'Sem internet agora: guardado neste computador, vai para a nuvem depois.', cheia: 'O navegador está cheio.' }[N.estado] || '';
};
if (N.ligada()) avisa('guardada');
window.addEventListener('online', function () { if (N.ligada()) N.envia(); });
})();
