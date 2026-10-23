/* ============================================================
   pixel.js — o ATELIÊ DE PIXEL (tela "Desenhar")
   Ela escolhe QUEM vai desenhar (herói, inimigo, moeda…), começa
   de um modelo ou do zero e pinta 16×16. O que pinta vale para os
   dois quadros da animação (o nariz aparece andando também).
   O primeiro traço num modelo pronto cria a CÓPIA dela ("meu_…"):
   o modelo original nunca se perde.
   ============================================================ */
(function () {
'use strict';
var papel = 'heroi', cor = 'r', ferr = 'lapis', espelho = false, buf = null, desfaz = [], pintando = false, tAnim = null;
var FERR = [['lapis', 'Lápis', 't_pixel'], ['borracha', 'Borracha', 'lixo'], ['balde', 'Balde', 'magica'], ['conta', 'Pegar cor', 'lupa']];

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
function carrega() {
  var s = FAB.spr(idAtual());
  buf = s.quadros.map(function (q) { return q.map(function (l) { return l.split(''); }); });
  desfaz = [];
}
function grava() {
  var J = FAB.jogo(), id = idAtual();
  if (!/^meu_/.test(id)) {
    var nid = 'meu_' + FAB.uid('');
    FAB.E.sprites[nid] = { nome: (J.nomes && J.nomes[papel]) || FAB.spr(id).nome, grupo: grupoSprite(papel), base: id, quadros: [] };
    J.skins[papel] = id = nid;
  }
  FAB.E.sprites[id].quadros = buf.map(function (q) { return q.map(function (l) { return l.join(''); }); });
  FAB.limpaCache(id); FAB.mudou();
  pintaPapeis(); FAB.ui.topo();
}
function snap() { desfaz.push(JSON.stringify(buf)); if (desfaz.length > 40) desfaz.shift(); }

function pinta(x, y) {
  var alvos = [[x, y]]; if (espelho && 15 - x !== x) alvos.push([15 - x, y]);
  if (ferr === 'conta') { var c = buf[0][y][x]; if (c !== '.') { cor = c; pintaPaleta(); ferr = 'lapis'; pintaFerr(); } return; }
  alvos.forEach(function (p) {
    buf.forEach(function (q) {
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
  var cel = g.children;
  for (var j = 0; j < 16; j++) for (var i = 0; i < 16; i++) { var c = FAB.PALETA[buf[0][j][i]]; cel[j * 16 + i].style.background = c || 'transparent'; }
}
function pintaPaleta() {
  var h = '';
  FAB.PALETA_ORDEM.forEach(function (k) { h += '<button class="cor' + (k === cor ? ' on' : '') + '" style="background:' + FAB.PALETA[k] + '" data-c="' + k + '" title="cor"></button>'; });
  FAB.$('pxPaleta').innerHTML = h;
  FAB.$('pxPaleta').querySelectorAll('.cor').forEach(function (b) { b.onclick = function () { cor = b.dataset.c; if (ferr === 'borracha' || ferr === 'conta') ferr = 'lapis'; pintaPaleta(); pintaFerr(); }; });
}
function pintaFerr() {
  var h = '';
  FERR.forEach(function (f) { h += '<button class="ib' + (ferr === f[0] ? ' on' : '') + '" data-f="' + f[0] + '">' + FAB.ico(f[2], 26) + f[1] + '</button>'; });
  h += '<button class="ib' + (espelho ? ' on' : '') + '" id="pxEsp">' + FAB.ico('treme', 26) + 'Espelho</button>';
  h += '<button class="ib" id="pxDesf">' + FAB.ico('desfazer', 26) + 'Desfazer</button>';
  FAB.$('pxFerr').innerHTML = h;
  FAB.$('pxFerr').querySelectorAll('[data-f]').forEach(function (b) { b.onclick = function () { ferr = b.dataset.f; pintaFerr(); }; });
  FAB.$('pxEsp').onclick = function () { espelho = !espelho; pintaFerr(); if (espelho) FAB.ui.toast('Espelho: o que pinta de um lado aparece do outro', true); };
  FAB.$('pxDesf').onclick = function () { if (!desfaz.length) return; buf = JSON.parse(desfaz.pop()); pintaGrade(); grava(); };
}
function pintaPapeis() {
  var el = FAB.$('pxPapeis'); if (!el) return;
  var h = '', g0 = '';
  papeis().forEach(function (p) {
    if (p.g !== g0) { g0 = p.g; h += '<div class="mut" style="margin-top:6px">' + p.g + '</div>'; }
    var nm = (FAB.jogo().nomes || {})[p.id];
    h += '<button class="papel' + (p.id === papel ? ' on' : '') + '" data-p="' + p.id + '">' + FAB.ico('spr:' + FAB.skinDe(p.id), 36) + '<span>' + FAB.esc(nm || p.nome) + (nm ? '<small>' + p.nome + '</small>' : '') + '</span></button>';
  });
  el.innerHTML = h;
  el.querySelectorAll('.papel').forEach(function (b) { b.onclick = function () { papel = b.dataset.p; carrega(); monta(FAB.$('t-pixel').querySelector('.corpo')); }; });
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
    for (var j = 0; j < 16; j++) for (var i = 0; i < 16; i++) { var k = FAB.PALETA[Q[j][i]]; if (k) { x.fillStyle = k; x.fillRect(i * 4, j * 4, 4, 4); } }
    q++;
  }, 260);
}

function monta(C) {
  if (!buf || C.dataset.papel !== papel + FAB.E.atual) { carrega(); C.dataset.papel = papel + FAB.E.atual; }
  var J = FAB.jogo(), nm = (J.nomes || {})[papel] || '';
  C.innerHTML =
    '<div class="px-wrap">' +
      '<div><div class="tit">Quem?</div><div class="papeis" id="pxPapeis"></div></div>' +
      '<div><div id="pxGrade"></div><div class="paleta" id="pxPaleta"></div></div>' +
      '<div class="grade">' +
        '<div class="card"><div class="tit">Nome</div><div class="campo"><input id="pxNome" maxlength="24" placeholder="Dê um nome" value="' + FAB.esc(nm) + '"></div></div>' +
        '<div class="card"><div class="prev"><canvas id="pxPrev" class="pix" width="64" height="64"></canvas><div class="mut">Assim ele anda no jogo</div></div></div>' +
        '<div class="card"><div class="ferr" id="pxFerr"></div></div>' +
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
  pintaGrade(); pintaPaleta(); pintaFerr(); pintaPapeis(); anima();
  FAB.$('pxNome').oninput = function () { J.nomes = J.nomes || {}; J.nomes[papel] = this.value; var id = idAtual(); if (/^meu_/.test(id)) FAB.E.sprites[id].nome = this.value; FAB.mudou(); pintaPapeis(); };
  FAB.$('pxGal').querySelectorAll('button').forEach(function (b) {
    b.onclick = function () {
      var s = b.dataset.s;
      if (s === '__branco') {
        var nid = 'meu_' + FAB.uid('');
        FAB.E.sprites[nid] = { nome: nm || 'Meu desenho', grupo: grupoSprite(papel), quadros: [Array(16).fill('................')] };
        J.skins[papel] = nid;
      } else J.skins[papel] = s;
      carrega(); FAB.mudou(); monta(C); FAB.ui.topo();
    };
  });
}

FAB.T.pixel = { nome: 'Desenhar', ajuda: 'Escolha quem vai desenhar e pinte os quadradinhos.', monta: function (C) { monta(C); } };
FAB.pixelPapel = function (p) { papel = p; buf = null; };
})();
