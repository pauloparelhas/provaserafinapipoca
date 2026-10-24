/* ============================================================
   regras.js — a PROGRAMAÇÃO (tela "Regras")
   Abas: Regras (QUANDO / SÓ SE / ENTÃO FAÇA) · Ajustes (vidas,
   relógio, de onde vêm as perguntas) · Minhas perguntas.
   Cada cartão é um botão: clicou, abre a grade de escolhas.
   ============================================================ */
(function () {
'use strict';
var aba = 'regras', pisca = null;

function txtParam(b, v, blocoDef) {
  if (v === undefined || v === null) return '';
  var o = blocoDef.param;
  if (o === 'objToca' || o === 'objPisa' || o === 'objTem' || o === 'objCria') return FAB.tr(FAB.nomeTipo(v));
  if (o === 'numSinal' || o === 'num') return (v > 0 ? (blocoDef.prefixo || '') : '') + v;
  if (o === 'sons') return '"' + FAB.tr(v) + '"';
  if (o === 'falas') return '"' + FAB.tr(v) + '"';
  if (LISTAS.indexOf(o) >= 0) return FAB.tr((FAB.NOME_OPCAO || {})[v] || v);
  return String(v);
}
/* parâmetros que são uma lista de nomes (poder e duração, destino do cano) */
var LISTAS = ['poderes', 'poder1', 'destinos'];
function icoParam(blocoDef, v) {
  var o = blocoDef.param;
  if ((o === 'objToca' || o === 'objPisa' || o === 'objTem' || o === 'objCria') && v) return FAB.icoTipo(v === 'inimigo' ? 'gosma' : v, 30);
  return FAB.ico(blocoDef.icone, 30);
}
/* valor do parâmetro guardado no bloco: obj | n | v | tecla */
function chaveParam(def) { var o = def.param; if (!o) return null; if (/^obj/.test(o)) return 'obj'; if (o === 'tecla') return 'tecla'; if (o === 'sons' || o === 'falas' || LISTAS.indexOf(o) >= 0) return 'v'; return 'n'; }
/* o bloco (ou a peça da lista) já está em uso numa regra do jogo? então nunca some da escolha */
function emUso(J, tipo, k) {
  return J.regras.some(function (r) { return tipo === 'q' ? r.quando.t === k : tipo === 's' ? r.se && r.se.t === k : r.faca.some(function (a) { return a.t === k; }); });
}
function pecaEmUso(J, t) {
  return J.regras.some(function (r) { return r.quando.obj === t || (r.se && r.se.obj === t) || r.faca.some(function (a) { return a.obj === t; }); });
}

function cartao(cls, rotulo, def, b) {
  var k = chaveParam(def), v = k ? b[k] : null;
  /* em inglês cada pedaço é traduzido antes de juntar (o nome que ela deu à peça fica como ela escreveu) */
  var nome = FAB.tr(def.nome), t = def.prefixo ? txtParam(def.param, v, def) + ' ' + nome : nome + (def.param ? ' ' + txtParam(def.param, v, def) : '') + (def.sufixo ? ' ' + FAB.tr(def.sufixo) : '');
  if (b.t === 'tecla') t = FAB.tr('apertar a tecla') + ' ' + (b.tecla || 'X');
  return '<span class="ico">' + icoParam(def, v) + '</span><span><small>' + rotulo + '</small>' + FAB.esc(t) + '</span>';
}

/* escolher um bloco (e depois o parâmetro dele) */
function escolheBloco(tipo, cb) {
  var D = tipo === 'q' ? FAB.QUANDO : tipo === 's' ? FAB.SE : FAB.FACA;
  var tit = tipo === 'q' ? 'Quando acontecer…' : tipo === 's' ? 'Só se…' : 'Então faça…';
  var J = FAB.jogo();
  /* bloco de peça nova só aparece quando a peça existe em alguma fase (a fase reta continua com a lista de sempre) */
  var ops = Object.keys(D).filter(function (k) { return !FAB.blocoAparece || FAB.blocoAparece(D[k], J, emUso(J, tipo, k)); })
    .map(function (k) { return { id: k, nome: FAB.tr(D[k].nome) + (D[k].sufixo && !D[k].param ? ' ' + FAB.tr(D[k].sufixo) : ''), ico: FAB.ico(D[k].icone, 40), sub: (FAB.CONCEITOS[D[k].conceito] || {}).nome }; });
  if (tipo === 's') ops.unshift({ id: '__nada', nome: 'sem cadeado', ico: FAB.ico('errado', 40), sub: 'a regra vale sempre' });
  if (tipo === 'f') ops.push({ id: '__tira', nome: 'tirar esta ação', ico: FAB.ico('lixo', 40) });
  FAB.ui.escolhe(tit, tit, ops, function (id) {
    if (id === '__nada' || id === '__tira') { cb(null); return; }
    var def = D[id], k = chaveParam(def), b = { t: id };
    if (!k) { cb(b); return; }
    escolheParam(def, function (v) { b[k] = v; cb(b); });
  });
}
function escolheParam(def, cb) {
  var J = FAB.jogo(), lista = FAB.OPCOES[def.param] || [];
  /* peça nova (cipó, pena, cavalo…) só entra na lista se estiver em alguma fase ou já numa regra */
  if (/^obj/.test(def.param)) lista = lista.filter(function (v) { var T = FAB.TIPOS[v]; return !T || !T.mundo || FAB.temPeca(J, v) || pecaEmUso(J, v); });
  var ops = lista.map(function (v) {
    var ico = /^obj/.test(def.param) ? FAB.icoTipo(v === 'inimigo' ? 'gosma' : v, 44) : FAB.ico(def.icone, 36);
    var nome = /^obj/.test(def.param) ? FAB.tr(FAB.nomeTipo(v)) : def.param === 'sons' || def.param === 'falas' ? FAB.tr(v) : LISTAS.indexOf(def.param) >= 0 ? FAB.tr((FAB.NOME_OPCAO || {})[v] || v) : ((v > 0 && def.prefixo ? def.prefixo : '') + v + (def.sufixo ? ' ' + FAB.tr(def.sufixo) : ''));
    return { id: v, nome: nome, ico: ico };
  });
  FAB.ui.escolhe(FAB.tr(def.nome) + '…', def.fala, ops, function (v) { if (def.param === 'sons') FAB.motor.toca(v); cb(v); });
}

function montaRegras(C) {
  var J = FAB.jogo(), T = J.ultimoTeste, h = '<div class="linha" style="margin-bottom:12px"><button class="bt verde" id="rgNova">' + FAB.ico('mais', 24) + 'Regra nova</button>' +
    '<span class="mut">' + (T ? 'O número amarelo = quantas vezes a regra acordou no último teste.' : 'Teste o jogo para ver quais regras acordam.') + '</span></div><div class="rg-lista">';
  J.regras.forEach(function (r, i) {
    var dq = FAB.QUANDO[r.quando.t]; if (!dq) return;
    h += '<div class="regra' + (r.liga === false ? ' off' : '') + (pisca === r.id ? ' pisca' : '') + '" data-r="' + i + '">' +
      '<span class="rn">' + (i + 1) + '</span><button class="liga' + (r.liga !== false ? ' on' : '') + '" data-a="liga" title="Ligar / desligar"></button>' +
      '<button class="bloco q" data-a="q">' + cartao('q', 'QUANDO', dq, r.quando) + '</button>';
    if (r.se && FAB.SE[r.se.t]) h += '<button class="bloco s" data-a="s">' + cartao('s', 'SÓ SE', FAB.SE[r.se.t], r.se) + '</button>';
    else h += '<button class="bloco vazio" data-a="s">' + FAB.ico('cadeado', 22) + 'só se…</button>';
    h += '<span class="seta">→</span>';
    r.faca.forEach(function (a, k) { var df = FAB.FACA[a.t]; if (df) h += '<button class="bloco f" data-a="f" data-k="' + k + '">' + cartao('f', 'FAÇA', df, a) + '</button>'; });
    if (r.faca.length < 3) h += '<button class="bloco vazio" data-a="mais">' + FAB.ico('mais', 22) + 'ação</button>';
    var n = T && T.disparos ? T.disparos[r.id] || 0 : null;
    h += (n !== null ? '<span class="acordou" title="Vezes que acordou no último teste">' + FAB.ico('lupa', 16) + n + '</span>' : '<span style="margin-left:auto"></span>') +
      '<button class="ib" data-a="apaga" title="Apagar regra">' + FAB.ico('lixo', 22) + '</button></div>';
  });
  C.innerHTML = h + '</div>';
  pisca = null;
  FAB.$('rgNova').onclick = function () {
    escolheBloco('q', function (q) {
      if (!q) return;
      escolheBloco('f', function (f) { if (!f) return; J.regras.push(FAB.novaRegra({ quando: q, faca: [f] })); FAB.mudou(); montaRegras(C); FAB.ui.toast('Regra nova no fim da lista!', true); var l = C.querySelector('.rg-lista'); setTimeout(function () { l.lastElementChild && l.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50); });
    });
  };
  C.querySelectorAll('.regra').forEach(function (el) {
    var r = J.regras[+el.dataset.r];
    el.querySelectorAll('[data-a]').forEach(function (b) {
      b.onclick = function () {
        var a = b.dataset.a;
        if (a === 'liga') { r.liga = r.liga === false; FAB.mudou(); montaRegras(C); FAB.fala(r.liga ? 'Regra ligada' : 'Regra desligada'); return; }
        if (a === 'apaga') {
          FAB.ui.abre('<h2>' + FAB.trf('Apagar a regra {0}?', [+el.dataset.r + 1]) + '</h2><div class="linha"><button class="bt rosa" id="rgSim">Apagar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
          FAB.$('rgSim').onclick = function () { J.regras.splice(+el.dataset.r, 1); FAB.mudou(); FAB.ui.fecha(); montaRegras(C); };
          return;
        }
        if (a === 'q') escolheBloco('q', function (q) { if (q) { r.quando = q; FAB.mudou(); montaRegras(C); } });
        if (a === 's') escolheBloco('s', function (s) { r.se = s; FAB.mudou(); montaRegras(C); });
        if (a === 'f') { var k = +b.dataset.k; escolheBloco('f', function (f) { if (f) r.faca[k] = f; else if (r.faca.length > 1) r.faca.splice(k, 1); else { FAB.ui.toast('A regra precisa de pelo menos uma ação.', true); return; } FAB.mudou(); montaRegras(C); }); }
        if (a === 'mais') escolheBloco('f', function (f) { if (f) { r.faca.push(f); FAB.mudou(); montaRegras(C); } });
      };
    });
  });
}

function montaAjustes(C) {
  var J = FAB.jogo(), A = J.ajustes;
  function linha(tit, ico, chave, ops) {
    return '<div class="card"><div class="tit">' + FAB.ico(ico, 28) + tit + '</div><div class="escolhas">' +
      ops.map(function (o) { return '<button class="esc' + (A[chave] === o[0] ? ' on' : '') + '" data-k="' + chave + '" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div></div>';
  }
  var P = FAB.PROVAS.lista[FAB.PROVAS.atual] || {}, np = FAB.perguntasDaProva().length;
  C.innerHTML = '<div class="grade ajustes">' +
    linha('Vidas no começo', 'coracao', 'vidas', [[1, '1'], [2, '2'], [3, '3'], [5, '5'], [9, '9']]) +
    linha('Relógio da fase', 'ampulheta', 'tempo', [[0, 'sem relógio'], [30, '30 s'], [60, '1 min'], [120, '2 min']]) +
    linha('Perguntas da Placa ?', 'pergunta', 'perguntas', [['prova', 'da prova'], ['minhas', 'as minhas'], ['mistura', 'misturadas']]) +
    '</div><p class="mut" style="margin-top:12px">Prova de agora: <b>' + FAB.esc(P.nome || '—') + '</b> ' + FAB.trf('({0} perguntas) · minhas perguntas: {1}', [np, (FAB.E.perguntas || []).length]) + '</p>';
  C.querySelectorAll('.esc').forEach(function (b) {
    b.onclick = function () { var v = b.dataset.v; A[b.dataset.k] = isNaN(+v) ? v : +v; FAB.mudou(); montaAjustes(C); };
  });
}

function montaPerguntas(C) {
  var E = FAB.E;
  var h = '<div class="card" style="margin-bottom:14px"><div class="tit">' + FAB.ico('pergunta', 28) + 'Escrever uma pergunta</div>' +
    '<div class="grade" style="gap:10px">' + FAB.ui.campo('pgP', 'A pergunta', true) +
    '<div class="linha" style="gap:6px">' + FAB.ico('certo', 26) + '<div style="flex:1">' + FAB.ui.campo('pgC', 'A resposta CERTA') + '</div></div>' +
    '<div class="linha" style="gap:6px">' + FAB.ico('errado', 26) + '<div style="flex:1">' + FAB.ui.campo('pgE1', 'Uma resposta errada') + '</div></div>' +
    '<div class="linha" style="gap:6px">' + FAB.ico('errado', 26) + '<div style="flex:1">' + FAB.ui.campo('pgE2', 'Outra resposta errada') + '</div></div>' +
    '<div><button class="bt verde" id="pgSalva" disabled>' + FAB.ico('mais', 22) + 'Guardar pergunta</button></div></div></div>';
  h += '<div class="grade">';
  (E.perguntas || []).slice().reverse().forEach(function (p) {
    h += '<div class="card linha"><div style="flex:1"><b data-sem-traducao>' + FAB.esc(p.p) + '</b><div class="mut">' + FAB.tr('certa:') + ' <span data-sem-traducao>' + FAB.esc(p.o[0]) + '</span> · ' + FAB.tr('erradas:') + ' <span data-sem-traducao>' + FAB.esc(p.o[1]) + ', ' + FAB.esc(p.o[2]) + '</span></div></div>' +
      '<button class="ib" data-id="' + p.id + '" title="Apagar">' + FAB.ico('lixo', 22) + '</button></div>';
  });
  C.innerHTML = h + '</div>';
  FAB.ui.ligaMic(C);
  var ids = ['pgP', 'pgC', 'pgE1', 'pgE2'];
  function ok() {
    var v = ids.map(function (i) { return FAB.$(i).value.trim(); });
    var dif = v[1] && v[2] && v[3] && v[1].toLowerCase() !== v[2].toLowerCase() && v[1].toLowerCase() !== v[3].toLowerCase() && v[2].toLowerCase() !== v[3].toLowerCase();
    FAB.$('pgSalva').disabled = !(v[0].length >= 5 && dif);
  }
  ids.forEach(function (i) { FAB.$(i).oninput = ok; });
  FAB.$('pgSalva').onclick = function () {
    var v = ids.map(function (i) { return FAB.$(i).value.trim(); });
    E.perguntas.push({ id: FAB.uid('p'), p: v[0], o: [v[1], v[2], v[3]], criada: Date.now() });
    var J = FAB.jogo(); if (J.ajustes.perguntas === 'prova') J.ajustes.perguntas = 'mistura';
    FAB.mudou(); montaPerguntas(C); FAB.ui.toast('Pergunta guardada! A Placa ? já pode perguntar ela.', true);
  };
  C.querySelectorAll('[data-id]').forEach(function (b) { b.onclick = function () { E.perguntas = E.perguntas.filter(function (p) { return p.id !== b.dataset.id; }); FAB.mudou(); montaPerguntas(C); }; });
}

function monta(C) {
  if (FAB.pacoteNasce && FAB.pacoteNasce(FAB.jogo())) FAB.mudou();   /* peça de poder no mapa: a regra dela já aparece aqui */
  C.innerHTML = '<div class="fz-barra">' + [['regras', 'Regras', 't_regras'], ['ajustes', 'Ajustes', 'caixinha'], ['perguntas', 'Minhas perguntas', 'pergunta']].map(function (a) {
    return '<button class="aba' + (aba === a[0] ? ' on' : '') + '" data-aba="' + a[0] + '">' + FAB.ico(a[2], 22) + ' ' + a[1] + '</button>';
  }).join('') + '</div><div id="rgCorpo"></div>';
  C.querySelectorAll('[data-aba]').forEach(function (b) { b.onclick = function () { aba = b.dataset.aba; monta(C); }; });
  ({ regras: montaRegras, ajustes: montaAjustes, perguntas: montaPerguntas })[aba](FAB.$('rgCorpo'));
}

FAB.T.regras = { nome: 'Regras', ajuda: 'Quando acontecer uma coisa, então o jogo faz outra.', monta: monta };
FAB.regrasAba = function (a) { aba = a; };
FAB.regrasPisca = function (id) { pisca = id; aba = 'regras'; };
})();
