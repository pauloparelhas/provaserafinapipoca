/* ============================================================
   pixel.js — o ATELIÊ DE PIXEL (tela "Desenhar")
   Ela escolhe QUEM vai desenhar (herói, inimigo, moeda…), começa
   de um modelo ou do zero e pinta 16×16.
   Quadros da animação (até 4): "Todos" pinta em todos de uma vez
   (o jeito de sempre: o nariz aparece andando também); escolhendo
   um quadro, pinta só nele (pernas que mexem). O quadro de antes
   aparece clarinho por baixo, para acertar o passo.
   Cores: a paleta fixa (uma letra por cor, FAB.PALETA) + as cores
   que ela mistura, guardadas no próprio desenho (sprite.cores,
   com os dígitos 1 a 9 como letra).
   O primeiro traço num modelo pronto cria a CÓPIA dela ("meu_…"):
   o modelo original nunca se perde.
   ============================================================ */
(function () {
'use strict';
var papel = 'heroi', cor = 'r', ferr = 'lapis', espelho = false, buf = null, cores = {}, qSel = -1, desfaz = [], pintando = false, tAnim = null;
var MAXQ = 4, LETRAS_MIX = '123456789';
var FERR = [['lapis', 'Lápis', 't_pixel'], ['borracha', 'Borracha', 'lixo'], ['balde', 'Balde', 'magica'], ['conta', 'Pegar cor', 'lupa']];

/* ícones desta tela */
Object.assign(FAB.ICONES, {
  copiar: '<rect x="8" y="8" width="12" height="12" rx="2" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="1.6"/><rect x="4" y="4" width="12" height="12" rx="2" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6"/>',
  misturar: '<path d="M12 3a9 9 0 1 0 0 18c1.6 0 2-1.2 1.3-2.2-.7-1-.3-2.3 1-2.3H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5z" fill="#f2c7a0" stroke="#1a1c2c" stroke-width="1.5" stroke-linejoin="round"/><circle cx="7.5" cy="11" r="1.7" fill="#e43b44"/><circle cx="10" cy="7" r="1.7" fill="#fee761"/><circle cx="14.5" cy="7" r="1.7" fill="#3b9bff"/><circle cx="17.3" cy="10.5" r="1.7" fill="#63c74d"/>'
});

function papeis() {
  var L = [{ id: 'heroi', nome: 'Herói', g: 'Personagens' }];
  ['gosma', 'besouro', 'abelha', 'fantasma', 'sapo'].concat(Object.keys(FAB.TIPOS).filter(function (t) { return FAB.TIPOS[t].classe === 'inimigo' && ['gosma', 'besouro', 'abelha', 'fantasma', 'sapo'].indexOf(t) < 0; }))
    .forEach(function (t) { L.push({ id: t, nome: FAB.TIPOS[t].nome, g: 'Inimigos' }); });
  FAB.GRUPOS_PECAS.forEach(function (G) {
    if (G.id === 'inimigo') return;
    G.tipos.forEach(function (t) { if (FAB.TIPOS[t] && FAB.TIPOS[t].skin) L.push({ id: t, nome: FAB.TIPOS[t].nome, g: G.nome }); });
  });
  return L;
}
function grupoSprite(p) { if (p === 'heroi') return 'heroi'; var T = FAB.TIPOS[p]; return T ? (T.classe === 'inimigo' ? 'inimigo' : FAB.SPRITES[T.skin] ? FAB.SPRITES[T.skin].grupo : 'item') : 'item'; }
function idAtual() { return FAB.skinDe(papel); }
function corDe(k) { return (cores[k]) || FAB.PALETA[k] || null; }
function carrega() {
  var s = FAB.spr(idAtual());
  buf = s.quadros.map(function (q) { return q.map(function (l) { return l.split(''); }); });
  cores = {}; if (s.cores) Object.keys(s.cores).forEach(function (k) { cores[k] = s.cores[k]; });
  if (qSel >= buf.length) qSel = -1;
  desfaz = [];
}
function grava() {
  var J = FAB.jogo(), id = idAtual();
  if (!/^meu_/.test(id)) {
    var nid = 'meu_' + FAB.uid('');
    FAB.E.sprites[nid] = { nome: (J.nomes && J.nomes[papel]) || FAB.spr(id).nome, grupo: grupoSprite(papel), base: id, quadros: [] };
    J.skins[papel] = id = nid;
  }
  var S = FAB.E.sprites[id];
  S.quadros = buf.map(function (q) { return q.map(function (l) { return l.join(''); }); });
  /* só guarda as cores misturadas que estão em uso (desenho antigo sem cor nova fica igualzinho) */
  var usadas = {};
  S.quadros.forEach(function (q) { q.forEach(function (l) { for (var i = 0; i < l.length; i++) if (cores[l[i]]) usadas[l[i]] = cores[l[i]]; }); });
  if (Object.keys(usadas).length) S.cores = usadas; else delete S.cores;
  FAB.limpaCache(id); FAB.mudou();
  pintaPapeis(); pintaQuadros(); FAB.ui.topo();
}
function snap() { desfaz.push(JSON.stringify({ b: buf, q: qSel })); if (desfaz.length > 40) desfaz.shift(); }
function alvosQ() { return qSel < 0 ? buf : [buf[qSel]]; }
function qVis() { return qSel < 0 ? 0 : qSel; }

function pinta(x, y) {
  var alvos = [[x, y]]; if (espelho && 15 - x !== x) alvos.push([15 - x, y]);
  if (ferr === 'conta') { var c = buf[qVis()][y][x]; if (c !== '.') { cor = c; pintaPaleta(); ferr = 'lapis'; pintaFerr(); } return; }
  alvos.forEach(function (p) {
    alvosQ().forEach(function (q) {
      if (ferr === 'balde') balde(q, p[0], p[1], q[p[1]][p[0]], cor);
      else q[p[1]][p[0]] = ferr === 'borracha' ? '.' : cor;
    });
  });
  pintaGrade();
}
/* balde: enche a área da mesma cor (o algoritmo "inundar") */
function balde(q, x, y, de, para) {
  if (de === para) return;
  var pilha = [[x, y]];
  while (pilha.length) {
    var p = pilha.pop(), i = p[0], j = p[1];
    if (i < 0 || j < 0 || i > 15 || j > 15 || q[j][i] !== de) continue;
    q[j][i] = para; pilha.push([i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]);
  }
}

function pintaGrade() {
  var g = FAB.$('pxGrade'); if (!g) return;
  var cel = g.children, Q = buf[qVis()], A = qSel > 0 ? buf[qSel - 1] : null;
  for (var j = 0; j < 16; j++) for (var i = 0; i < 16; i++) {
    var c = corDe(Q[j][i]), s = cel[j * 16 + i].style;
    /* quadro de antes, clarinho (só onde este está vazio) */
    if (!c && A) { var a = corDe(A[j][i]); s.background = a ? a + '55' : 'transparent'; }
    else s.background = c || 'transparent';
  }
}
function pintaPaleta() {
  var h = '';
  FAB.PALETA_ORDEM.forEach(function (k) { h += '<button class="cor' + (k === cor ? ' on' : '') + '" style="background:' + FAB.PALETA[k] + '" data-c="' + k + '" title="cor"></button>'; });
  Object.keys(cores).sort().forEach(function (k) { h += '<button class="cor mix' + (k === cor ? ' on' : '') + '" style="background:' + cores[k] + '" data-c="' + k + '" title="cor"></button>'; });
  h += '<button class="cor misturar" id="pxMix" title="Misturar cor">' + FAB.ico('misturar', 26) + '</button>';
  FAB.$('pxPaleta').innerHTML = h;
  FAB.$('pxPaleta').querySelectorAll('[data-c]').forEach(function (b) { b.onclick = function () { cor = b.dataset.c; if (ferr === 'borracha' || ferr === 'conta') ferr = 'lapis'; pintaPaleta(); pintaFerr(); }; });
  FAB.$('pxMix').onclick = misturar;
}
function pintaFerr() {
  var h = '';
  FERR.forEach(function (f) { h += '<button class="pxb' + (ferr === f[0] ? ' on' : '') + '" data-f="' + f[0] + '" title="' + f[1] + '">' + FAB.ico(f[2], 24) + '<span>' + f[1] + '</span></button>'; });
  h += '<button class="pxb' + (espelho ? ' on' : '') + '" id="pxEsp" title="Espelho">' + FAB.ico('treme', 24) + '<span>Espelho</span></button>';
  h += '<button class="pxb" id="pxDesf" title="Desfazer">' + FAB.ico('desfazer', 24) + '<span>Desfazer</span></button>';
  FAB.$('pxFerr').innerHTML = h;
  FAB.$('pxFerr').querySelectorAll('[data-f]').forEach(function (b) { b.onclick = function () { ferr = b.dataset.f; pintaFerr(); }; });
  FAB.$('pxEsp').onclick = function () { espelho = !espelho; pintaFerr(); if (espelho) FAB.ui.toast('Espelho: o que pinta de um lado aparece do outro', true); };
  FAB.$('pxDesf').onclick = function () {
    if (!desfaz.length) return; var d = JSON.parse(desfaz.pop());
    buf = d.b; qSel = d.q < buf.length ? d.q : -1; pintaGrade(); grava();
  };
}

/* ---------- quadros da animação ---------- */
function miniQuadro(Q) {
  var c = document.createElement('canvas'); c.width = c.height = 16;
  var x = c.getContext('2d');
  for (var j = 0; j < 16; j++) for (var i = 0; i < 16; i++) { var k = corDe(Q[j][i]); if (k) { x.fillStyle = k; x.fillRect(i, j, 1, 1); } }
  return c.toDataURL();
}
function pintaQuadros() {
  var el = FAB.$('pxQuadros'); if (!el || !buf) return;
  var h = '<button class="pxq todos' + (qSel < 0 ? ' on' : '') + '" data-q="-1" title="Pintar em todos os quadros">Todos</button>';
  buf.forEach(function (Q, n) { h += '<button class="pxq' + (qSel === n ? ' on' : '') + '" data-q="' + n + '" title="' + FAB.trf('Quadro {0}', [n + 1]) + '"><img class="pix" alt="" src="' + miniQuadro(Q) + '"><b>' + (n + 1) + '</b></button>'; });
  if (buf.length < MAXQ) h += '<button class="pxq acao" id="pxQNovo" title="Quadro novo">' + FAB.ico('mais', 22) + '</button>';
  if (qSel > 0) h += '<button class="pxq acao" id="pxQCopia" title="Copiar do quadro anterior">' + FAB.ico('copiar', 22) + '</button>';
  if (qSel >= 0 && buf.length > 1) h += '<button class="pxq acao" id="pxQTira" title="Tirar este quadro">' + FAB.ico('lixo', 22) + '</button>';
  el.innerHTML = h;
  el.querySelectorAll('[data-q]').forEach(function (b) {
    b.onclick = function () {
      var n = +b.dataset.q; if (n === qSel) return;
      var antes = qSel; qSel = n; pintaQuadros(); pintaGrade();
      if (n < 0) FAB.ui.toast('Agora você pinta em todos os quadros.', true);
      else if (antes < 0) FAB.ui.toast('Agora você pinta só neste quadro.', true);
    };
  });
  var nv = FAB.$('pxQNovo'); if (nv) nv.onclick = function () {
    snap(); buf.push(JSON.parse(JSON.stringify(buf[buf.length - 1]))); qSel = buf.length - 1;
    pintaGrade(); grava(); FAB.ui.toast('Quadro novo! Mude um pouquinho.', true);
  };
  var cp = FAB.$('pxQCopia'); if (cp) cp.onclick = function () {
    snap(); buf[qSel] = JSON.parse(JSON.stringify(buf[qSel - 1]));
    pintaGrade(); grava(); FAB.ui.toast('Copiado do quadro anterior.', true);
  };
  var tr = FAB.$('pxQTira'); if (tr) tr.onclick = function () {
    snap(); buf.splice(qSel, 1); qSel = Math.min(qSel, buf.length - 1); if (buf.length < 2) qSel = -1;
    pintaGrade(); grava();
  };
}

/* ---------- misturar cor: grade de tons + qualquer cor ---------- */
function hex(hh, s, l) {
  s /= 100; l /= 100;
  var f = function (n) { var k = (n + hh / 30) % 12, a = s * Math.min(l, 1 - l); var v = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); return ('0' + Math.round(v * 255).toString(16)).slice(-2); };
  return '#' + f(0) + f(8) + f(4);
}
function tons() {
  var L = [], H = [0, 28, 52, 105, 170, 210, 268, 318];
  [86, 72, 58, 44, 30].forEach(function (l) { H.forEach(function (h) { L.push(hex(h, h === 28 && l < 50 ? 55 : 82, l)); }); });
  [96, 84, 70, 56, 42, 30, 20, 10].forEach(function (l) { L.push(hex(0, 0, l)); });
  return L;
}
function poeCor(c) {
  c = String(c).toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(c)) return;
  var ja = FAB.PALETA_ORDEM.filter(function (k) { return FAB.PALETA[k] === c; })[0] || Object.keys(cores).filter(function (k) { return cores[k] === c; })[0];
  if (!ja) {
    var usadas = {};
    buf.forEach(function (q) { q.forEach(function (l) { l.forEach(function (k) { usadas[k] = 1; }); }); });
    ja = LETRAS_MIX.split('').filter(function (k) { return !cores[k]; })[0] || LETRAS_MIX.split('').filter(function (k) { return !usadas[k]; })[0];
    if (!ja) { FAB.ui.toast('Cheio! Apague uma cor.', true); return; }
    cores[ja] = c; FAB.limpaCache(idAtual());
  }
  cor = ja; if (ferr === 'borracha' || ferr === 'conta') ferr = 'lapis';
  FAB.ui.fecha(); pintaPaleta(); pintaFerr(); pintaGrade();
  FAB.ui.toast('Cor nova nas cores do desenho!', true);
}
function misturar() {
  var h = '<h2><button class="falar" onclick="FAB.fala(\'Escolha um tom.\')">' + FAB.ico('falar', 22) + '</button>Misturar cor</h2>' +
    '<div class="px-tons">' + tons().map(function (c) { return '<button class="cor" style="background:' + c + '" data-mix="' + c + '" title="cor"></button>'; }).join('') + '</div>' +
    '<label class="bt cinza px-livre">' + FAB.ico('misturar', 22) + 'Mais cores<input type="color" id="pxCorLivre" value="' + (corDe(cor) || '#e43b44') + '"></label>';
  FAB.ui.abre(h);
  FAB.$('mbox').querySelectorAll('[data-mix]').forEach(function (b) { b.onclick = function () { poeCor(b.dataset.mix); }; });
  FAB.$('pxCorLivre').onchange = function () { poeCor(this.value); };
}

function pintaPapeis() {
  var el = FAB.$('pxPapeis'); if (!el) return;
  var h = '', g0 = '';
  papeis().forEach(function (p) {
    if (p.g !== g0) { g0 = p.g; h += '<div class="mut" style="margin-top:6px">' + p.g + '</div>'; }
    var nm = (FAB.jogo().nomes || {})[p.id];
    h += '<button class="papel' + (p.id === papel ? ' on' : '') + '" data-p="' + p.id + '">' + FAB.ico('spr:' + FAB.skinDe(p.id), 36) + '<span>' + (nm ? '<span data-sem-traducao>' + FAB.esc(nm) + '</span><small>' + p.nome + '</small>' : FAB.esc(p.nome)) + '</span></button>';
  });
  el.innerHTML = h;
  el.querySelectorAll('.papel').forEach(function (b) { b.onclick = function () { papel = b.dataset.p; qSel = -1; carrega(); monta(FAB.$('t-pixel').querySelector('.corpo')); }; });
}
function galeria() {
  var g = grupoSprite(papel), ids = [];
  Object.keys(FAB.SPRITES).forEach(function (k) { if (FAB.SPRITES[k].grupo === g || (g === 'heroi' && FAB.SPRITES[k].grupo === 'inimigo') || (g === 'inimigo' && FAB.SPRITES[k].grupo === 'heroi')) ids.push(k); });
  Object.keys(FAB.E.sprites).forEach(function (k) { ids.push(k); });
  var h = '<button data-s="__branco" title="Desenho em branco" style="color:#fff;font-weight:900;font-size:12px">Do zero</button>';
  ids.forEach(function (k) { h += '<button data-s="' + k + '" title="' + FAB.esc(FAB.spr(k).nome) + '">' + FAB.ico('spr:' + k, 40) + '</button>'; });
  return h;
}
function anima() {
  clearInterval(tAnim); var q = 0;
  tAnim = setInterval(function () {
    var c = FAB.$('pxPrev'); if (!c) { clearInterval(tAnim); return; }
    var x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.clearRect(0, 0, 64, 64);
    var Q = buf[q % buf.length];
    for (var j = 0; j < 16; j++) for (var i = 0; i < 16; i++) { var k = corDe(Q[j][i]); if (k) { x.fillStyle = k; x.fillRect(i * 4, j * 4, 4, 4); } }
    q++;
  }, 260);
}

function monta(C) {
  if (!buf || C.dataset.papel !== papel + FAB.E.atual) { qSel = -1; carrega(); C.dataset.papel = papel + FAB.E.atual; }
  var J = FAB.jogo(), nm = (J.nomes || {})[papel] || '';
  C.innerHTML =
    '<div class="px-wrap">' +
      '<div class="px-quem"><div class="tit">Quem?</div><div class="papeis" id="pxPapeis"></div></div>' +
      '<div class="px-centro">' +
        '<div class="px-pintar"><div class="px-barra" id="pxFerr"></div><div id="pxGrade"></div></div>' +
        '<div class="px-quadros"><span class="mut">Quadros</span><div class="px-qs" id="pxQuadros"></div></div>' +
        '<div class="paleta" id="pxPaleta"></div>' +
      '</div>' +
      '<div class="grade px-lado">' +
        '<div class="card"><div class="tit">Nome</div><div class="campo"><input id="pxNome" maxlength="24" placeholder="Dê um nome" value="' + FAB.esc(nm) + '"></div></div>' +
        '<div class="card"><div class="prev"><canvas id="pxPrev" class="pix" width="64" height="64"></canvas><div class="mut">Assim ele anda no jogo</div></div></div>' +
        '<div class="card"><div class="tit">Começar de outro desenho</div><div class="galeria" id="pxGal">' + galeria() + '</div></div>' +
      '</div>' +
    '</div>';
  var g = FAB.$('pxGrade'), h = '';
  for (var n = 0; n < 256; n++) h += '<div data-i="' + n + '"></div>';
  g.innerHTML = h;
  function alvo(ev) { var el = document.elementFromPoint(ev.clientX, ev.clientY); return el && el.parentNode === g ? +el.dataset.i : -1; }
  g.onpointerdown = function (ev) { ev.preventDefault(); var i = alvo(ev); if (i < 0) return; snap(); pintando = true; var f = ferr; pinta(i % 16, Math.floor(i / 16));
    if (f === 'balde') { pintando = false; grava(); } else if (f === 'conta') { pintando = false; desfaz.pop(); } };
  g.onpointermove = function (ev) { if (!pintando) return; var i = alvo(ev); if (i >= 0) pinta(i % 16, Math.floor(i / 16)); };
  window.onpointerup = window.onpointercancel = function () { if (pintando) { pintando = false; grava(); } };
  pintaGrade(); pintaPaleta(); pintaFerr(); pintaQuadros(); pintaPapeis(); anima();
  FAB.$('pxNome').oninput = function () { J.nomes = J.nomes || {}; J.nomes[papel] = this.value; var id = idAtual(); if (/^meu_/.test(id)) FAB.E.sprites[id].nome = this.value; FAB.mudou(); pintaPapeis(); };
  FAB.$('pxGal').querySelectorAll('button').forEach(function (b) {
    b.onclick = function () {
      var s = b.dataset.s;
      if (s === '__branco') {
        var nid = 'meu_' + FAB.uid('');
        FAB.E.sprites[nid] = { nome: nm || 'Meu desenho', grupo: grupoSprite(papel), quadros: [Array(16).fill('................')] };
        J.skins[papel] = nid;
      } else J.skins[papel] = s;
      qSel = -1; carrega(); FAB.mudou(); monta(C); FAB.ui.topo();
    };
  });
}

FAB.T.pixel = { nome: 'Desenhar', ajuda: 'Escolha quem vai desenhar e pinte os quadradinhos.', monta: function (C) { monta(C); } };
FAB.pixelPapel = function (p) { papel = p; buf = null; };
})();
