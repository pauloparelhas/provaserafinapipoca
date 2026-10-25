/* ============================================================
   jeito.js — a tela "Opções" (a engrenagem): a Mariana arruma a
   Fábrica do jeito dela — idioma (português ou inglês), voz
   (Thalita/Antonio; em inglês Ava/Brian), velocidade da voz,
   cores, tamanho, lado e nomes da barra, quais telas aparecem,
   tela grande no teste, botões de toque, explicações.
   Tudo fica em FAB.E.prefs (vai junto no arquivo de cópia).
   ============================================================ */
(function () {
'use strict';
var TEMAS = [['noite', 'Noite', '#2b2370', '#120f2b'], ['oceano', 'Oceano', '#13557a', '#06202e'], ['floresta', 'Floresta', '#245a35', '#0d2116'],
             ['doce', 'Doce', '#7a2f80', '#2b0f2e'], ['sol', 'Pôr do sol', '#7a3d14', '#2a1408']];
var NOMES_TELA = { ideia: 'Ideia', diario: 'Diário', robo: 'Robô', missoes: 'Missões', jogar: 'Mostrar' };
var ICO_TELA = { ideia: 't_ideia', diario: 't_diario', robo: 't_robo', missoes: 't_missoes', jogar: 't_jogar' };

/* o que tem por dentro (para ela e para o papai) */
var FEITA = [
  ['HTML e JavaScript:', 'a mesma linguagem dos sites. Cada regra que você monta vira um pedacinho de programa.'],
  ['Canvas:', 'a tela de desenhar do navegador, onde o jogo roda 60 vezes por segundo.'],
  ['Pixel art 16 por 16:', 'cada personagem é uma grade de 256 quadradinhos coloridos.'],
  ['Música sintetizada:', 'cada trilha é feita de notas calculadas pelo navegador, sem arquivo de som.'],
  ['Vozes gravadas:', 'Thalita, Antonio, Ava e Brian foram gravados antes. Nada do que você faz sai do computador para falar.'],
  ['Memória do navegador:', 'o seu trabalho fica guardado neste computador. Guardar no computador faz uma cópia.'],
  ['Sem conversa com estranhos:', 'a Fábrica não tem chat, não tem propaganda e não conversa com nenhum robô da internet.'],
  ['Robô da Fábrica:', 'o seu pedido vai num arquivo para o papai, e ele traz a peça pronta.']
];
function bandeira(l) {
  return l === 'pt'
    ? '<svg viewBox="0 0 30 20" width="54" height="36"><rect width="30" height="20" rx="2" fill="#009c3b"/><path d="M15 3 27 10 15 17 3 10z" fill="#ffdf00"/><circle cx="15" cy="10" r="4" fill="#002776"/></svg>'
    : '<svg viewBox="0 0 30 20" width="54" height="36"><rect width="30" height="20" rx="2" fill="#fff"/><g fill="#b22234"><rect width="30" height="1.6"/><rect y="3.1" width="30" height="1.6"/><rect y="6.2" width="30" height="1.6"/><rect y="9.3" width="30" height="1.6"/><rect y="12.4" width="30" height="1.6"/><rect y="15.5" width="30" height="1.6"/><rect y="18.4" width="30" height="1.6"/></g><rect width="13" height="10.8" fill="#3c3b6e"/></svg>';
}
function chips(campo, ops) {
  var v = FAB.E.prefs[campo];
  return '<div class="escolhas">' + ops.map(function (o) {
    return '<button class="esc' + (String(v) === String(o[0]) ? ' on' : '') + '" data-campo="' + campo + '" data-v="' + o[0] + '">' + o[1] + '</button>';
  }).join('') + '</div>';
}

function monta(C) {
  var P = FAB.E.prefs;
  C.innerHTML = '<div class="grade jt">' +
    '<div class="card"><div class="tit">' + FAB.ico('t_ideia', 26) + 'Idioma</div><div class="vozes" data-sem-traducao>' +
      [['pt', 'Português', 'Thalita e Antonio'], ['en', 'English', 'Ava and Brian']].map(function (l) {
        return '<button class="vozc' + (FAB.lingua() === l[0] ? ' on' : '') + '" data-lingua="' + l[0] + '">' + bandeira(l[0]) + l[1] + '<small class="mut">' + l[2] + '</small></button>';
      }).join('') + '</div><div class="mut">Tudo muda de idioma: telas, missões, regras e voz. As perguntas da prova continuam na língua da prova.</div></div>' +
    '<div class="card"><div class="tit">' + FAB.ico('falar', 26) + 'Quem fala com você</div><div class="vozes">' +
      ['thalita', 'antonio'].map(function (v) {
        return '<button class="vozc' + (P.voz === v ? ' on' : '') + '" data-voz="' + v + '">' + FAB.ico('voz_' + FAB.vozDe(v, FAB.lingua()), 64) + '<span data-sem-traducao>' + FAB.VOZES[FAB.vozDe(v, FAB.lingua())].nome + '</span></button>';
      }).join('') + '</div>' +
      '<div class="mut">Velocidade da voz</div>' + chips('vel', [[0.85, 'Devagar'], [1, 'Normal'], [1.15, 'Rápida']]) + '</div>' +

    '<div class="card"><div class="tit">' + FAB.ico('pincel', 26) + 'Cores da Fábrica</div><div class="temas">' +
      TEMAS.map(function (t) { return '<button class="tema' + (P.tema === t[0] ? ' on' : '') + '" data-tema="' + t[0] + '" style="background:linear-gradient(160deg,' + t[2] + ',' + t[3] + ')">' + t[1] + '</button>'; }).join('') +
      '</div><div class="mut">Tamanho das coisas</div>' + chips('tam', [['p', 'Pequeno'], ['m', 'Médio'], ['g', 'Grande']]) + '</div>' +

    '<div class="card"><div class="tit">' + FAB.ico('t_painel', 26) + 'Barra das telas</div>' +
      '<div class="mut">De que lado fica</div>' + chips('navLado', [['esq', 'Esquerda'], ['dir', 'Direita']]) +
      '<div class="mut">Como aparece</div>' + chips('navNomes', [[true, 'Desenho e nome'], [false, 'Só desenho']]) +
      '<div class="mut">Telas que aparecem na barra</div><div class="escolhas">' +
      FAB.ESCONDIVEIS.map(function (t) {
        return '<button class="esc' + (P.navEsconde.indexOf(t) < 0 ? ' on' : '') + '" data-tela="' + t + '">' + FAB.ico(ICO_TELA[t], 20) + ' ' + NOMES_TELA[t] + '</button>';
      }).join('') + '</div></div>' +

    '<div class="card"><div class="tit">' + FAB.ico('t_testar', 26) + 'Na hora de jogar</div>' +
      '<div class="mut">Tela grande quando aperta Testar</div>' + chips('imersivo', [[true, 'Sim'], [false, 'Não']]) +
      '<div class="mut">Botões de dedo no jogo</div>' + chips('toques', [['auto', 'Sozinho'], ['sim', 'Sempre'], ['nao', 'Nunca']]) + '</div>' +

    '<div class="card"><div class="tit">' + FAB.ico('t_ideia', 26) + 'Explicações e barras</div>' +
      '<div class="mut">Frase de ajuda no alto de cada tela</div>' + chips('ajuda', [[true, 'Mostrar'], [false, 'Esconder']]) +
      '<div class="mut">Barra de cima</div>' + chips('topoFechado', [[false, 'Aberta'], [true, 'Escondida']]) +
      '<div class="mut">Barra das telas</div>' + chips('navFechada', [[false, 'Aberta'], [true, 'Escondida']]) +
      '<div class="mut">Escondeu? Abra com a setinha na beirada da tela.</div></div>' +

    '<div class="card"><div class="tit">' + FAB.ico('t_robo', 26) + 'Do que a Fábrica é feita</div>' +
      '<ul class="feita">' + FEITA.map(function (f) { return '<li><b>' + f[0] + '</b> ' + f[1] + '</li>'; }).join('') + '</ul></div>' +
    '<div class="card papai" id="jtPapai"><div class="tit">' + FAB.ico('cadeado', 26) + 'Área do papai</div>' +
      '<div class="mut">Nuvem da família: guarda o progresso fora deste computador e continua em outro.</div>' +
      '<div class="nv-st" id="jtNvSt"></div>' +
      (FAB.nuvem.chave() ?
        '<div class="mut">Chave da família (para usar em outro computador):</div><code class="chave" data-sem-traducao>' + FAB.esc(FAB.nuvem.chave()) + '</code>' +
        '<div class="linha"><button class="bt cinza" id="jtNvCopia">Copiar a chave</button><button class="bt cinza" id="jtNvVers">Versões guardadas</button><button class="bt cinza" id="jtNvDesl">Desligar a nuvem</button></div>' :
        '<div class="linha"><button class="bt verde" id="jtNvLiga">Ligar a nuvem da família</button><button class="bt cinza" id="jtNvTenho">Já tenho uma chave</button></div>') +
      '<div class="mut">Arquivo de cópia (também leva os pedidos para o robô):</div>' +
      '<div class="linha"><button class="bt cinza" id="jtExp">' + FAB.ico('foto', 22) + 'Guardar no computador</button>' +
      '<label class="bt cinza">' + FAB.ico('desfazer', 22) + 'Abrir do computador<input type="file" accept=".json" id="jtImp" hidden></label></div>' +
      '<div class="mut">Testes: guarde o que está aqui e comece do zero.</div>' +
      '<div class="linha"><button class="bt amarelo" id="jtZeraG">' + FAB.ico('foto', 22) + 'Guardar e começar do zero</button><button class="bt cinza" id="jtAbreG">Abrir um guardado</button><button class="bt cinza" id="jtZera">Só começar do zero</button>' +
        (FAB.copias.temDesfazer() ? '<button class="bt cinza" id="jtDesZera">' + FAB.ico('desfazer', 22) + 'Voltar para antes do zero</button>' : '') + '</div>' +
      '<div class="mut">Ditado por voz: o Chrome envia a voz da criança ao Google.</div>' +
      '<div class="linha"><button class="bt cinza" id="jtMic">' + FAB.ico('microfone', 22) + (FAB.ui.micLigado() ? 'Desligar o microfone' : 'Ligar o microfone') + '</button></div></div>' +
    '<div class="card"><div class="tit">' + FAB.ico('desfazer', 26) + 'Voltar ao começo</div>' +
      '<div class="mut">Deixa a Fábrica com as cores e a barra do começo. A voz e o idioma que você escolheu ficam.</div>' +
      '<button class="bt cinza" id="jtPadrao">Jeito do começo</button></div>' +
  '</div>';

  C.querySelectorAll('[data-lingua]').forEach(function (b) { b.onclick = function () { if (b.dataset.lingua !== FAB.lingua()) FAB.trocaLingua(b.dataset.lingua); }; });
  C.querySelectorAll('[data-voz]').forEach(function (b) { b.onclick = function () { FAB.ui.trocaVoz(b.dataset.voz); }; });
  C.querySelectorAll('[data-tema]').forEach(function (b) { b.onclick = function () { P.tema = b.dataset.tema; muda(C); }; });
  C.querySelectorAll('[data-campo]').forEach(function (b) {
    b.onclick = function () {
      var v = b.dataset.v; P[b.dataset.campo] = v === 'true' ? true : v === 'false' ? false : /^[\d.]+$/.test(v) ? +v : v;
      muda(C);
      if (b.dataset.campo === 'vel') FAB.fala('Assim fica a minha voz.');
    };
  });
  C.querySelectorAll('[data-tela]').forEach(function (b) {
    b.onclick = function () {
      var t = b.dataset.tela, i = P.navEsconde.indexOf(t);
      if (i >= 0) P.navEsconde.splice(i, 1); else P.navEsconde.push(t);
      muda(C);
    };
  });
  papai(C);
  FAB.$('jtPadrao').onclick = function () {
    var n = FAB.prefsPadrao(); n.voz = P.voz; n.vel = P.vel; n.lingua = P.lingua; FAB.E.prefs = n; muda(C);
  };
}
/* área do papai: nuvem da família, arquivo de cópia, microfone */
function papai(C) {
  var $ = FAB.$, ui = FAB.ui, N = FAB.nuvem;
  function st() { var e = $('jtNvSt'); if (e) e.textContent = FAB.tr(N.textoEstado()); }
  N.aoMudar = st; st();
  if ($('jtNvLiga')) $('jtNvLiga').onclick = function () {
    ui.abre('<h2>Ligar a nuvem da família?</h2><p style="margin-bottom:10px">O trabalho da criança (jogos, desenhos, missões) passa a ser guardado também num servidor da família na Cloudflare, protegido por uma chave longa. Não vai nome, e-mail nem conta. Ninguém vê sem a chave.</p>' +
      '<div class="linha"><button class="bt verde" id="nvSim">Concordo, ligar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
    $('nvSim').onclick = function () { ui.fecha(); N.liga(N.gera()).then(function () { monta(C); }); };
  };
  if ($('jtNvTenho')) $('jtNvTenho').onclick = function () {
    ui.abre('<h2>Chave da família</h2><p class="mut" style="margin-bottom:10px">Cole a chave que aparece no outro computador. O trabalho de lá vem para cá (o daqui fica guardado como cópia).</p>' +
      '<div class="campo"><input id="nvChave" placeholder="abcd23-efgh45-…" data-sem-traducao></div><div class="linha" style="margin-top:10px"><button class="bt verde" id="nvOk">Usar esta chave</button></div>');
    $('nvOk').onclick = function () {
      var c = $('nvChave').value.trim().toLowerCase();
      if (!/^[a-z0-9-]{20,80}$/.test(c)) { ui.toast('Essa chave não parece certa.', true); return; }
      ui.fecha(); N.liga(c).then(function () { monta(C); });
    };
  };
  if ($('jtNvCopia')) $('jtNvCopia').onclick = function () { try { navigator.clipboard.writeText(N.chave()); ui.toast('Chave copiada.'); } catch (e) {} };
  if ($('jtNvDesl')) $('jtNvDesl').onclick = function () { N.desliga(); monta(C); };
  if ($('jtNvVers')) $('jtNvVers').onclick = function () {
    N.versoes().then(function (L) {
      var h = '<h2>Versões guardadas na nuvem</h2>' + (L.length ? '<div class="diario">' + L.map(function (v) {
        return '<div class="card dia"><div class="q">' + new Date(v.salvoEm).toLocaleString(FAB.lingua() === 'en' ? 'en-US' : 'pt-BR') + '</div><button class="bt cinza" data-v="' + v.salvoEm + '">Voltar para esta</button></div>';
      }).join('') + '</div>' : '<p class="mut">Ainda não tem versão antiga.</p>');
      ui.abre(h);
      document.querySelectorAll('#mbox [data-v]').forEach(function (b) { b.onclick = function () { N.volta(+b.dataset.v); }; });
    }).catch(function () { ui.toast('Sem internet agora.', true); });
  };
  $('jtExp').onclick = function () { FAB.exporta(); ui.toast('Arquivo guardado na pasta Downloads.'); };
  /* guardar e começar do zero (js/copias.js) */
  var G = FAB.copias, avisoNuvem = function () { return N.chave() ? '<p class="mut" style="margin-bottom:10px">' + FAB.tr('A nuvem está ligada: o começo do zero também vai para ela. As versões antigas continuam lá.') + '</p>' : ''; };
  $('jtZeraG').onclick = function () {
    G.pasta().then(function (temPasta) {
      ui.abre('<h2>Guardar e começar do zero</h2>' +
        '<p class="mut" style="margin-bottom:10px">' + FAB.tr(temPasta ? 'A cópia vai para a pasta coding/guardados.' : 'A cópia vai para a pasta Downloads.') + '</p>' + avisoNuvem() +
        '<div class="campo"><input id="zgNome" maxlength="40" placeholder="Nome da cópia" value="' + FAB.esc(FAB.tr('teste')) + '"></div>' +
        '<div class="linha" style="margin-top:10px"><button class="bt amarelo" id="zgSim">Guardar e começar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
      $('zgSim').onclick = function () {
        this.disabled = true;
        G.guarda($('zgNome').value).then(function (arq) { ui.toast(FAB.tr('Guardado:') + ' ' + arq); setTimeout(G.zera, 900); })
          .catch(function () { ui.fecha(); ui.toast('Não deu para guardar. Nada foi apagado.'); });
      };
    });
  };
  $('jtZera').onclick = function () {
    ui.abre('<h2>Apagar e começar do zero?</h2><p class="mut" style="margin-bottom:10px">' + FAB.tr('Sem cópia. Dá para voltar uma vez com "Voltar para antes do zero".') + '</p>' + avisoNuvem() +
      '<div class="linha"><button class="bt rosa" id="zrSim">Apagar e começar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
    $('zrSim').onclick = function () { G.zera(); };
  };
  if ($('jtDesZera')) $('jtDesZera').onclick = function () { G.desfazZera(); };
  $('jtAbreG').onclick = function () {
    G.pasta().then(function (temPasta) {
      if (!temPasta) { ui.toast('Abra a Fábrica pelo atalho do computador, ou use Abrir do computador.'); return; }
      G.lista().then(function (L) {
        var data = function (t) { return new Date(t).toLocaleString(FAB.lingua() === 'en' ? 'en-US' : 'pt-BR'); };
        ui.abre('<h2>Guardados</h2><p class="mut" style="margin-bottom:10px">' + FAB.tr('O que está aqui agora fica como cópia no navegador.') + '</p>' +
          (L.length ? '<div class="diario">' + L.map(function (g, i) {
            return '<div class="card dia"><div class="q" data-sem-traducao>' + FAB.esc(g.nome) + '</div><div class="mut">' + data(g.quando) + '</div><button class="bt cinza" data-g="' + i + '">Abrir este</button></div>';
          }).join('') + '</div>' : '<p class="mut">Ainda não tem nada guardado.</p>'));
        document.querySelectorAll('#mbox [data-g]').forEach(function (b) {
          b.onclick = function () { G.abre(L[+b.dataset.g].arquivo).catch(function () { ui.toast('Esse arquivo não é da Fábrica.'); }); };
        });
      }).catch(function () { ui.toast('Não deu para ler a pasta.'); });
    });
  };
  $('jtImp').onchange = function () { var f = this.files[0]; if (!f) return; FAB.importa(f, function (ok) { if (ok) location.reload(); else ui.toast('Esse arquivo não é da Fábrica.', true); }); };
  $('jtMic').onclick = function () {
    if (ui.micLigado()) { try { localStorage.removeItem('fab_mic'); } catch (e) {} monta(C); return; }
    ui.abre('<h2>Ligar o microfone?</h2><p style="margin-bottom:14px">O ditado do Chrome envia a voz da criança ao Google para virar texto. Ligue só se você concordar.</p><div class="linha"><button class="bt verde" id="micSim">Concordo, ligar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
    $('micSim').onclick = function () { try { localStorage.setItem('fab_mic', '1'); } catch (e) {} ui.fecha(); monta(C); };
  };
}
function muda(C) { FAB.salva(); FAB.ui.nav(); FAB.ui.layout(); FAB.ui.topo(); FAB.confereMissoes(); monta(C); }

FAB.T.jeito = { nome: 'Opções', ajuda: 'Deixe a Fábrica do seu jeito: idioma, voz, cores e barras.', monta: monta };
})();
