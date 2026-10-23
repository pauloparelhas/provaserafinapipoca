/* ============================================================
   ui.js — a CASCA: barra de telas, topo, janelas, voz, ditado
   Cada tela se registra em FAB.T[id] = {nome, ico, ajuda, monta()}
   e é desenhada por monta() toda vez que a Mariana entra nela.
   ============================================================ */
(function () {
'use strict';
var $ = function (id) { return document.getElementById(id); };
FAB.$ = $;
FAB.T = FAB.T || {};
var ORDEM = [['painel', 'Início'], ['pixel', 'Desenhar'], ['fases', 'Fases'], ['regras', 'Regras'], ['testar', 'Testar'], '-',
             ['ideia', 'Ideia'], ['diario', 'Diário'], ['robo', 'Robô'], ['missoes', 'Missões'], ['jogar', 'Mostrar']];
var ICO = { painel: 't_painel', pixel: 't_pixel', fases: 't_fases', regras: 't_regras', testar: 't_testar', ideia: 't_ideia', diario: 't_diario', robo: 't_robo', missoes: 't_missoes', jogar: 't_jogar' };
var atual = null;
var ui = FAB.ui = {};

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
FAB.esc = esc;

ui.nav = function () {
  var h = '<div class="logo">' + FAB.ico('spr:' + FAB.skinDe('heroi'), 48) + '</div>';
  ORDEM.forEach(function (o) {
    if (o === '-') { h += '<div class="nav-sep"></div>'; return; }
    var peq = ['ideia', 'diario', 'robo', 'missoes', 'jogar'].indexOf(o[0]) >= 0;
    h += '<button class="nb' + (o[0] === 'testar' ? ' testar' : '') + (peq ? ' peq' : '') + '" id="nb-' + o[0] + '" onclick="FAB.ui.vai(\'' + o[0] + '\')">' +
      '<span class="dot"></span>' + FAB.ico(ICO[o[0]], peq ? 26 : 34) + '<span>' + o[1] + '</span></button>';
  });
  $('nav').innerHTML = h;
  ui.marcaMissao();
};
/* bolinha amarela na tela onde a próxima missão acontece */
ui.marcaMissao = function () {
  var m = FAB.proximaMissao();
  document.querySelectorAll('.nb').forEach(function (b) { b.classList.toggle('tem-missao', !!m && b.id === 'nb-' + m.onde); });
};

ui.vai = function (id, semFala) {
  if (!FAB.T[id]) return;
  if (atual === 'testar' && id !== 'testar' && FAB.motor.rodando()) FAB.motor.termina();
  if (atual === 'jogar' && id !== 'jogar') FAB.motor.para();
  atual = id;
  document.querySelectorAll('.tela').forEach(function (t) { t.classList.toggle('on', t.id === 't-' + id); });
  document.querySelectorAll('.nb').forEach(function (b) { b.classList.toggle('on', b.id === 'nb-' + id); });
  var T = FAB.T[id], el = $('t-' + id);
  el.innerHTML = '<div class="ajuda"><button class="falar" title="Ouvir" onclick="FAB.fala(\'' + esc(T.ajuda).replace(/'/g, "\\'") + '\')">' + FAB.ico('falar', 22) + '</button>' +
    '<div><h1>' + T.nome + '</h1><p>' + esc(T.ajuda) + '</p></div></div><div class="corpo"></div>';
  T.monta(el.querySelector('.corpo'));
  $('tela').scrollTop = 0;
  try { localStorage.setItem('fab_tela', id); } catch (e) {}
  ui.topo();
};
ui.atual = function () { return atual; };

ui.topo = function () {
  var J = FAB.jogo(), n = $('nomeJogo');
  if (document.activeElement !== n) n.value = J.nome;
  var m = FAB.proximaMissao();
  $('chipMissao').innerHTML = m ? FAB.ico('t_missoes', 26) + '<span class="tx">' + esc(m.frase) + '</span>' : FAB.ico('trofeu', 26) + '<span class="tx">Todas as missões feitas! Crie o que quiser.</span>';
  $('chipMissao').onclick = function () { if (m) { FAB.fala(m.frase); ui.vai(m.onde, true); } else ui.vai('missoes'); };
  var N = FAB.nivel();
  $('nivel').innerHTML = FAB.ico('t_missoes', 30) + '<div>' + FAB.xp() + ' XP<small>' + N.nome + '</small></div>';
  $('btSom').innerHTML = FAB.ico('som', 26); $('btSom').classList.toggle('off', !window.somLigado);
  ui.marcaMissao();
  var lg = document.querySelector('#nav .logo'); if (lg) lg.innerHTML = FAB.ico('spr:' + FAB.skinDe('heroi'), 48);
};
ui.som = function () { window.toggleSom && window.toggleSom(); FAB.mudo = !window.somLigado; ui.topo(); };

/* ---------------- janelas ---------------- */
ui.abre = function (html, aoFechar) {
  $('mbox').innerHTML = '<button class="ib fecha" title="Fechar" onclick="FAB.ui.fecha()">' + FAB.ico('errado', 26) + '</button>' + html;
  $('modal').classList.add('on'); ui._aoFechar = aoFechar || null;
};
ui.fecha = function () { $('modal').classList.remove('on'); var f = ui._aoFechar; ui._aoFechar = null; if (f) f(); };
$('modal').addEventListener('click', function (e) { if (e.target.id === 'modal' && !ui._preso) ui.fecha(); });

/* escolher de uma grade de cartões: opcoes = [{id, ico(html), nome, sub}] */
ui.escolhe = function (titulo, fala, opcoes, cb) {
  var h = '<h2><button class="falar" onclick="FAB.fala(\'' + esc(fala).replace(/'/g, "\\'") + '\')">' + FAB.ico('falar', 22) + '</button>' + esc(titulo) + '</h2><div class="opcoes">';
  opcoes.forEach(function (o, i) { h += '<button class="op" data-i="' + i + '">' + (o.ico || '') + '<span>' + esc(o.nome) + '</span>' + (o.sub ? '<small>' + esc(o.sub) + '</small>' : '') + '</button>'; });
  ui.abre(h + '</div>');
  $('mbox').querySelectorAll('.op').forEach(function (b) {
    b.onclick = function () { var o = opcoes[+b.dataset.i]; ui.fecha(); cb(o.id, o); };
  });
};

ui.toast = function (t, fala) {
  var el = $('toast'); el.textContent = t; el.classList.add('on');
  clearTimeout(ui._tt); ui._tt = setTimeout(function () { el.classList.remove('on'); }, 2600);
  if (fala) FAB.fala(t);
};

/* medalha de missão cumprida */
var filaMedalhas = [];
ui.medalha = function (m) {
  filaMedalhas.push(m); if (filaMedalhas.length > 1) return; mostraMedalha();
};
function mostraMedalha() {
  var m = filaMedalhas[0]; if (!m) return;
  var C = FAB.CONCEITOS[m.conceito] || {}, N = FAB.nivel(), prox = FAB.proximaMissao();
  FAB.motor.toca('vitoria');
  ui.abre('<div class="medalha"><div class="estrela">' + FAB.ico('t_missoes', 110) + '</div>' +
    '<h2 style="justify-content:center;padding:0">Missão cumprida!</h2><p class="perg" style="font-size:20px">' + esc(m.frase) + '</p>' +
    '<p class="mut">+' + m.xp + ' XP · você é <b style="color:#ffd84a">' + N.nome + '</b></p>' +
    (C.nome ? '<div class="card" style="margin:14px auto;max-width:420px;text-align:left"><div class="tit">' + FAB.ico(C.icone, 28) + 'Você aprendeu: ' + esc(C.nome) + '</div><div>' + esc(C.frase) + '</div></div>' : '') +
    (prox ? '<p class="mut" style="margin-bottom:8px">Próxima: ' + esc(prox.frase) + '</p>' : '') +
    '<button class="bt verde grande" onclick="FAB.ui.fecha()">Oba!</button></div>', function () {
      filaMedalhas.shift(); ui.topo(); if (filaMedalhas.length) setTimeout(mostraMedalha, 200);
    });
  FAB.fala('Missão cumprida! ' + (C.nome ? 'Você aprendeu: ' + C.nome + '.' : ''));
  if (window.confeteTela) window.confeteTela();
}

/* ---------------- ditado (falar em vez de digitar) ---------------- */
ui.ditado = function (campo, botao) {
  var R = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!R) { ui.toast('Este navegador não ouve. Use o Chrome.', true); return; }
  if (ui._rec) { try { ui._rec.stop(); } catch (e) {} return; }
  var r = new R(); r.lang = 'pt-BR'; r.interimResults = false; r.maxAlternatives = 1;
  ui._rec = r; botao.classList.add('ouvindo');
  r.onresult = function (ev) { var t = ev.results[0][0].transcript; campo.value = (campo.value ? campo.value.trim() + ' ' : '') + t; campo.dispatchEvent(new Event('input')); };
  r.onend = r.onerror = function () { botao.classList.remove('ouvindo'); ui._rec = null; };
  try { r.start(); } catch (e) { botao.classList.remove('ouvindo'); ui._rec = null; }
};
/* campo de texto com microfone: devolve html; ligar depois com ui.ligaMic(raiz) */
ui.campo = function (id, ph, area) {
  return '<div class="campo">' + (area ? '<textarea id="' + id + '" rows="2" placeholder="' + esc(ph) + '"></textarea>' : '<input id="' + id + '" placeholder="' + esc(ph) + '">') +
    '<button class="mic" title="Falar" data-alvo="' + id + '">' + FAB.ico('microfone', 26) + '</button></div>';
};
ui.ligaMic = function (raiz) {
  raiz.querySelectorAll('.mic').forEach(function (b) { b.onclick = function () { ui.ditado($(b.dataset.alvo), b); }; });
};

/* ---------------- topo: nome do jogo ---------------- */
$('nomeJogo').addEventListener('input', function () { var J = FAB.jogo(); J.nome = this.value.slice(0, 40) || 'Meu jogo'; FAB.mudou(); });

/* tela de toque? mostra os botões de controle no jogo */
window.addEventListener('touchstart', function () { document.body.classList.add('toque'); }, { once: true, passive: true });

FAB.mudo = !window.somLigado;
})();
