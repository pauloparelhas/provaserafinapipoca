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
             ['ideia', 'Ideia'], ['diario', 'Diário'], ['robo', 'Robô'], ['missoes', 'Missões'], ['jogar', 'Mostrar'], ['jeito', 'Opções']];
var ICO = { painel: 't_painel', pixel: 't_pixel', fases: 't_fases', regras: 't_regras', testar: 't_testar', ideia: 't_ideia', diario: 't_diario', robo: 't_robo', missoes: 't_missoes', jogar: 't_jogar', jeito: 'engrenagem' };
FAB.ESCONDIVEIS = ['ideia', 'diario', 'robo', 'missoes', 'jogar'];
FAB.NOME_TELA = {}; ORDEM.forEach(function (o) { if (o !== '-') FAB.NOME_TELA[o[0]] = o[1]; });
FAB.ICO_TELA = ICO;
var atual = null, imersivoAgora = false;
var ui = FAB.ui = {};

/* ícones da casca (setinhas, pincel, tela cheia, rostos das vozes) */
Object.assign(FAB.ICONES, {
  engrenagem: '<path d="M10.3 2h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9L2 13.7v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z" fill="#c2c3c7" stroke="#1a1c2c" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="12" r="3.6" fill="#5f574f" stroke="#1a1c2c" stroke-width="1.4"/>',
  pincel: '<path d="M14.5 3.5l6 6-8 8-6-6z" fill="#ff7ac6" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.5 11.5l6 6-3 2.5H4v-5.5z" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/>',
  s_esq: '<path d="M15 4 7 12l8 8" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  s_dir: '<path d="M9 4l8 8-8 8" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  s_cima: '<path d="M4 15l8-8 8 8" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  s_baixo: '<path d="M4 9l8 8 8-8" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  telacheia: '<path d="M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  zoom_mais: '<circle cx="10" cy="10" r="6.5" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="2"/><path d="M15 15l6 6" stroke="#1a1c2c" stroke-width="3" stroke-linecap="round"/><path d="M7 10h6M10 7v6" stroke="#1a1c2c" stroke-width="2" stroke-linecap="round"/>',
  zoom_menos: '<circle cx="10" cy="10" r="6.5" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="2"/><path d="M15 15l6 6" stroke="#1a1c2c" stroke-width="3" stroke-linecap="round"/><path d="M7 10h6" stroke="#1a1c2c" stroke-width="2" stroke-linecap="round"/>',
  voz_thalita: '<path d="M4 13c0-6 3.5-10 8-10s8 4 8 10v8h-3v-4H7v4H4z" fill="#8b4a2b" stroke="#1a1c2c" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="12" r="5.5" fill="#f2c39b" stroke="#1a1c2c" stroke-width="1.4"/><circle cx="10" cy="11.5" r=".9" fill="#1a1c2c"/><circle cx="14" cy="11.5" r=".9" fill="#1a1c2c"/><path d="M10 14.2a2.4 2.4 0 0 0 4 0" stroke="#c0392b" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M7 7c2 1.5 6 1.5 10-1" stroke="#1a1c2c" stroke-width="1.2" fill="none"/>',
  /* vozes do inglês: rostos próprios (não reaproveitam Thalita e Antonio) */
  voz_ava: '<path d="M4.5 14c0-7 3.3-11 7.5-11s7.5 4 7.5 11c0 3-1 5-2 6l-1.5-6H8l-1.5 6c-1-1-2-3-2-6z" fill="#f4c542" stroke="#1a1c2c" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="5.3" fill="#ffe0c4" stroke="#1a1c2c" stroke-width="1.4"/><path d="M6.8 10.5C9 9.8 11 8 12 6.5c1 1.6 3 3.3 5.2 4" stroke="#1a1c2c" stroke-width="1.2" fill="#f4c542" stroke-linejoin="round"/><circle cx="10" cy="12.6" r=".9" fill="#1a1c2c"/><circle cx="14" cy="12.6" r=".9" fill="#1a1c2c"/><path d="M10.2 15a2.2 2.2 0 0 0 3.6 0" stroke="#c0392b" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="18.6" cy="5.2" r="2" fill="#3b9bff" stroke="#1a1c2c" stroke-width="1.1"/>',
  voz_brian: '<circle cx="12" cy="13" r="7" fill="#f6cfa8" stroke="#1a1c2c" stroke-width="1.4"/><path d="M5 12.5C4.6 7 8 4 12 4s7.6 3 7 8.5c-1.4-2.4-3.2-3.6-5.6-3.6-.8 1-2.3 1.6-4 1.6-1.5 0-3 .6-4.4 2z" fill="#d9662b" stroke="#1a1c2c" stroke-width="1.4" stroke-linejoin="round"/><circle cx="9.5" cy="13.2" r="2" fill="#fff" stroke="#1a1c2c" stroke-width="1.1"/><circle cx="14.5" cy="13.2" r="2" fill="#fff" stroke="#1a1c2c" stroke-width="1.1"/><path d="M11.5 13.2h1" stroke="#1a1c2c" stroke-width="1.1"/><circle cx="9.5" cy="13.3" r=".7" fill="#1a1c2c"/><circle cx="14.5" cy="13.3" r=".7" fill="#1a1c2c"/><path d="M10 16.6a2.6 2.6 0 0 0 4 0" stroke="#1a1c2c" stroke-width="1.3" fill="none" stroke-linecap="round"/>',
  s_dir_esc: '<path d="M9 4l8 8-8 8" stroke="#2a1d00" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  nuvemico: '<path d="M7 18h10.5a4 4 0 0 0 .4-8 6 6 0 0 0-11.5 1.6A3.3 3.3 0 0 0 7 18z" fill="#bdf0ff" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/>',
  salvo: '<circle cx="12" cy="12" r="10" fill="#3fbf5a" stroke="#1a1c2c" stroke-width="1.6"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  salvando: '<circle cx="12" cy="12" r="10" fill="#4b4a6e" stroke="#1a1c2c" stroke-width="1.6"/><path d="M12 6v6l4 2" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
  naosalvou: '<circle cx="12" cy="12" r="10" fill="#ff5a64" stroke="#1a1c2c" stroke-width="1.6"/><path d="M12 6.5v7" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/><circle cx="12" cy="17.2" r="1.6" fill="#fff"/>',
  bandeirinha: '<path d="M6 21V3" stroke="#1a1c2c" stroke-width="2.4" stroke-linecap="round"/><path d="M7 4h11l-3 4 3 4H7z" fill="#ff5a64" stroke="#1a1c2c" stroke-width="1.6" stroke-linejoin="round"/>',
  estrelinha: '<path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="#ffd84a" stroke="#1a1c2c" stroke-width="1.5" stroke-linejoin="round"/>',
  voz_antonio: '<circle cx="12" cy="13" r="7" fill="#d9a07a" stroke="#1a1c2c" stroke-width="1.4"/><path d="M5 12c0-5 3-8 7-8s7 3 7 8c-2-2-4-3-7-3s-5 1-7 3z" fill="#2b2b3a" stroke="#1a1c2c" stroke-width="1.4" stroke-linejoin="round"/><circle cx="9.6" cy="13" r=".9" fill="#1a1c2c"/><circle cx="14.4" cy="13" r=".9" fill="#1a1c2c"/><path d="M9.6 16a3 3 0 0 0 4.8 0" stroke="#1a1c2c" stroke-width="1.3" fill="none" stroke-linecap="round"/>'
});

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
FAB.esc = esc;
function P() { return FAB.E.prefs; }

ui.nav = function () {
  var h = '<button class="recolhe" id="navRecolhe" title="Esconder a barra">' + FAB.ico(P().navLado === 'dir' ? 's_dir' : 's_esq', 20) + '</button>' +
    '<div class="logo">' + FAB.ico('spr:' + FAB.skinDe('heroi'), 48) + '</div>';
  ORDEM.forEach(function (o) {
    if (o === '-') { h += '<div class="nav-sep"></div>'; return; }
    if (P().navEsconde.indexOf(o[0]) >= 0) return;
    var peq = ['ideia', 'diario', 'robo', 'missoes', 'jogar', 'jeito'].indexOf(o[0]) >= 0;
    h += '<button class="nb' + (o[0] === 'testar' ? ' testar' : '') + (peq ? ' peq' : '') + (o[0] === atual ? ' on' : '') + '" id="nb-' + o[0] + '" title="' + o[1] + '" onclick="FAB.ui.vai(\'' + o[0] + '\')">' +
      '<span class="dot"></span>' + FAB.ico(ICO[o[0]], peq ? 26 : 34) + '<span class="nbn">' + o[1] + '</span></button>';
  });
  $('nav').innerHTML = h;
  $('navRecolhe').onclick = function () { P().navFechada = true; FAB.salva(); ui.layout(); };
  ui.marcaMissao();
};
/* bolinha amarela na tela onde a próxima missão acontece */
ui.marcaMissao = function () {
  var m = FAB.proximaMissao();
  document.querySelectorAll('.nb').forEach(function (b) { b.classList.toggle('tem-missao', !!m && b.id === 'nb-' + (FAB.guia ? FAB.guia.telaDa(m) : m.onde)); });
};

/* o jeito dela vira classes no <body>: cor, tamanho, lado e o que está recolhido */
ui.layout = function () {
  var p = P(), B = document.body, imers = atual === 'testar' && imersivoAgora;
  B.dataset.tema = p.tema; B.dataset.tam = p.tam;
  B.classList.toggle('nav-dir', p.navLado === 'dir');
  B.classList.toggle('nav-icones', !p.navNomes);
  B.classList.toggle('nav-fechada', !!p.navFechada || imers);
  B.classList.toggle('topo-fechado', !!p.topoFechado || imers);
  B.classList.toggle('sem-ajuda', !p.ajuda || imers);
  B.classList.toggle('imersivo', imers);
  B.classList.toggle('toque', p.toques === 'sim' || (p.toques === 'auto' && !!ui._toque));
  $('abreNav').innerHTML = FAB.ico(p.navLado === 'dir' ? 's_esq' : 's_dir', 22);
  window.dispatchEvent(new Event('resize'));
};
ui.imersivo = function (on) { imersivoAgora = on; ui.layout(); };
ui.ehImersivo = function () { return atual === 'testar' && imersivoAgora; };

ui.vai = function (id, semFala) {
  if (!FAB.T[id]) return;
  try { if (document.activeElement && document.activeElement.blur && document.activeElement !== document.body) document.activeElement.blur(); } catch (e) {}   /* espaço no jogo não "aperta" o último botão */
  if (atual === 'testar' && id !== 'testar' && FAB.motor.rodando()) FAB.motor.termina();
  if (atual === 'jogar') FAB.motor.para();
  if (id === 'testar' && atual !== 'testar') imersivoAgora = !!P().imersivo;
  atual = id;
  document.querySelectorAll('.tela').forEach(function (t) { t.classList.toggle('on', t.id === 't-' + id); });
  document.querySelectorAll('.nb').forEach(function (b) { b.classList.toggle('on', b.id === 'nb-' + id); });
  ui.layout();
  var T = FAB.T[id], el = $('t-' + id);
  el.innerHTML = '<div class="ajuda"><button class="falar" title="Ouvir" onclick="FAB.fala(\'' + esc(T.ajuda).replace(/'/g, "\\'") + '\')">' + FAB.ico('falar', 22) + '</button>' +
    '<div><h1>' + T.nome + '</h1><p>' + esc(T.ajuda) + '</p></div>' +
    '<button class="ib mini esconde-ajuda" title="Esconder a explicação" onclick="FAB.E.prefs.ajuda=false;FAB.salva();FAB.ui.layout()">' + FAB.ico('s_cima', 18) + '</button></div>' +
    '<button class="ib mini ajuda-volta" title="Mostrar a explicação" onclick="FAB.E.prefs.ajuda=true;FAB.salva();FAB.ui.layout()">' + FAB.ico('s_baixo', 18) + '</button><div class="corpo"></div>';
  T.monta(el.querySelector('.corpo'));
  $('tela').scrollTop = 0;
  try { localStorage.setItem('fab_tela', id); } catch (e) {}
  ui.topo();
  if (FAB.marcaOnde) FAB.marcaOnde(id);
  ui.trilho();
  if (FAB.guia) FAB.guia.novaTela();
};
ui.atual = function () { return atual; };

ui.topo = function () {
  var J = FAB.jogo(), n = $('nomeJogo');
  if (document.activeElement !== n) n.value = FAB.tr(J.nome);   /* nome de modelo vira inglês; o que ela escreveu fica */
  var m = FAB.proximaMissao();
  $('chipMissao').innerHTML = m ? FAB.ico('t_missoes', 26) + '<span class="tx">' + esc(m.frase) + '</span>' : FAB.ico('trofeu', 26) + '<span class="tx">Todas as missões feitas! Crie o que quiser.</span>';
  $('chipMissao').onclick = function () { if (m) { FAB.fala(m.frase); if (FAB.guia) FAB.guia.vaiMissao(m); else ui.vai(m.onde, true); } else ui.vai('missoes'); };
  var N = FAB.nivel();
  $('nivel').innerHTML = FAB.ico('t_missoes', 30) + '<div>' + FAB.xp() + ' XP<small>' + N.nome + '</small></div>';
  $('btSom').innerHTML = FAB.ico('som', 26); $('btSom').classList.toggle('off', !window.somLigado);
  var V = FAB.VOZES[FAB.vozDe(P().voz, P().lingua)];
  $('btVoz').innerHTML = FAB.ico('voz_' + FAB.vozDe(P().voz, P().lingua), 30) + '<span>' + V.nome + '</span>'; $('btVoz').title = 'Trocar a voz';
  $('btJeito').innerHTML = FAB.ico('engrenagem', 28); $('btRecolhe').innerHTML = FAB.ico('s_cima', 20);
  ui.marcaMissao();
  var lg = document.querySelector('#nav .logo'); if (lg) lg.innerHTML = FAB.ico('spr:' + FAB.skinDe('heroi'), 48);
};
/* ---------------- selo "Salvo" (topo; e no trilho quando o topo está recolhido) ---------------- */
var seloAntes = '';
ui.selo = function () {
  var st = FAB.estadoSalvo || 'salvo', N = FAB.nuvem;
  if (st === 'salvo' && N && N.ligada() && N.estado === 'guardada') st = 'nuvem';
  if (st === seloAntes && $('selo').innerHTML) return; seloAntes = st;
  var S = { salvo: ['salvo', 'Salvo'], salvando: ['salvando', 'Salvando…'], erro: ['naosalvou', 'Não salvou'], nuvem: ['nuvemico', 'Na nuvem'] }[st];
  ['selo', 'trSelo'].forEach(function (k) { var el = $(k); if (!el) return; el.className = 'selo ' + st; el.innerHTML = FAB.ico(S[0], 22) + '<span>' + S[1] + '</span>'; el.title = S[1]; });
};
ui.toqueSelo = function () {
  if (FAB.estadoSalvo === 'erro') { FAB.fala('Não consegui guardar. Chame o papai.'); ui.vai('jeito'); return; }
  FAB.fala('Seu jogo está guardado.');
};

/* ---------------- trilho: anterior · missão (contador vivo) · Próximo passo ---------------- */
function passoIdx(t) { for (var i = 0; i < FAB.PASSOS.length; i++) if (FAB.PASSOS[i][0] === t) return i; return -1; }
/* para onde vai o botão amarelo: a tela da missão (se é outra) ou o passo seguinte do caminho */
ui.proximo = function () {
  var m = FAB.proximaMissao(), tm = FAB.guia ? FAB.guia.telaDa(m) : (m && m.onde), i = passoIdx(atual);
  if (atual === 'jogar') return { tela: 'painel', ciclo: true };   /* fim do caminho: guarda e começa outro jogo */
  if (m && tm && tm !== atual) return { tela: tm, missao: m };
  if (i >= 0) return { tela: i + 1 < FAB.PASSOS.length ? FAB.PASSOS[i + 1][0] : 'painel' };
  return { tela: tm && tm !== atual ? tm : 'pixel' };
};
ui.anterior = function () { var i = passoIdx(atual); return i > 0 ? FAB.PASSOS[i - 1][0] : 'painel'; };
ui.trilho = function () {
  var el = $('trilho'); if (!el || !atual) return;
  var m = FAB.proximaMissao(), pr = ui.proximo(), an = ui.anterior(), tm = FAB.guia ? FAB.guia.telaDa(m) : null;
  var c = m && FAB.guia ? FAB.guia.progresso(m) : null;
  var pontos = FAB.PASSOS.map(function (p) {
    return '<i class="' + (p[0] === atual ? 'on' : '') + (p[0] === tm ? ' missao' : '') + '" title="' + p[1] + '"></i>';
  }).join('');
  var fr = m ? '<span class="tr-fr">' + esc(m.frase) + '</span>' + (c ? ' <b class="tr-cont">' + FAB.trf('{0} de {1}', [c[0], c[1]]) + '</b>' : '')
             : '<span class="tr-fr">Todas as missões feitas! Crie o que quiser.</span>';
  el.innerHTML = '<button class="bt cinza tr-ant" id="trAnt" title="Voltar">' + FAB.ico('s_esq', 22) + '<span class="tr-nome"><small>Voltar</small>' + FAB.NOME_TELA[an] + '</span></button>' +
    '<div class="tr-meio"><button class="falar" id="trFala" title="Ouvir">' + FAB.ico('falar', 20) + '</button><div class="tr-txt">' + fr + '</div><div class="tr-pontos">' + pontos + '</div></div>' +
    '<button class="selo" id="trSelo" onclick="FAB.ui.toqueSelo()"></button>' +
    '<button class="bt ' + (atual === 'painel' ? 'cinza' : 'amarelo') + ' tr-prox" id="trProx"' + (pr.ciclo ? ' title="Guardar e fazer outro jogo"' : '') + '><span class="tr-nome"><small>' + (pr.ciclo ? 'Guardar e' : 'Próximo passo') + '</small>' + (pr.ciclo ? 'fazer outro jogo' : FAB.NOME_TELA[pr.tela]) + '</span>' + FAB.ico(atual === 'painel' ? 's_dir' : 's_dir_esc', 24) + '</button>';
  seloAntes = ''; ui.selo();
  $('trAnt').onclick = function () { this.blur(); ui.vai(an); };
  $('trProx').onclick = function () { this.blur(); if (pr.ciclo && FAB.fechaCiclo) { FAB.fechaCiclo(); return; } if (pr.missao && FAB.guia) { FAB.fala(pr.missao.frase); FAB.guia.vaiMissao(pr.missao); } else ui.vai(pr.tela); };
  $('trFala').onclick = function () { this.blur(); FAB.fala(m ? m.frase : 'Todas as missões feitas! Crie o que quiser.'); };
};

ui.som = function () { window.toggleSom && window.toggleSom(); FAB.mudo = !window.somLigado; if (FAB.mudo) FAB.calaVoz(); ui.topo(); };
/* a criança troca a voz com um clique: Thalita <-> Antonio */
ui.trocaVoz = function (v) {
  P().voz = v || (P().voz === 'thalita' ? 'antonio' : 'thalita'); FAB.salva(); ui.topo();
  if (!window.somLigado && window.toggleSom) { window.toggleSom(); FAB.mudo = false; ui.topo(); }
  FAB.fala(P().voz === 'thalita' ? 'Oi! Eu sou a Thalita.' : 'Oi! Eu sou o Antonio.');   /* em inglês: Ava e Brian (dicionário) */
  if (atual === 'jeito') FAB.T.jeito.monta($('t-jeito').querySelector('.corpo'));
};

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
  opcoes.forEach(function (o, i) { h += '<button class="op' + (o.cls ? ' ' + o.cls : '') + '" data-i="' + i + '">' + (o.ico || '') + '<span>' + esc(o.nome) + '</span>' + (o.sub ? '<small>' + esc(o.sub) + '</small>' : '') + '</button>'; });
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
    '<p class="mut">+' + m.xp + ' XP · ' + FAB.tr('você é') + ' <b style="color:#ffd84a">' + N.nome + '</b></p>' +
    (C.nome ? '<div class="card" style="margin:14px auto;max-width:420px;text-align:left"><div class="tit">' + FAB.ico(C.icone, 28) + 'Você aprendeu: ' + esc(C.nome) + '</div><div>' + esc(C.frase) + '</div></div>' : '') +
    (prox ? '<p class="mut" style="margin-bottom:8px">' + FAB.tr('Próxima:') + ' ' + esc(FAB.tr(prox.frase)) + '</p>' : '') +
    '<button class="bt verde grande" onclick="FAB.ui.fecha()">Oba!</button></div>', function () {
      filaMedalhas.shift(); ui.topo(); ui.trilho(); if (filaMedalhas.length) setTimeout(mostraMedalha, 200);
    });
  FAB.fala('Missão cumprida! ' + (C.nome ? 'Você aprendeu: ' + C.nome + '.' : ''));
  if (window.confeteTela) window.confeteTela();
}

/* ---------------- ditado (falar em vez de digitar) ---------------- */
ui.ditado = function (campo, botao) {
  var R = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!R) { ui.toast('Este navegador não ouve. Use o Chrome.', true); return; }
  if (ui._rec) { try { ui._rec.stop(); } catch (e) {} return; }
  var r = new R(); r.lang = FAB.lingua() === 'en' ? 'en-US' : 'pt-BR'; r.interimResults = false; r.maxAlternatives = 1;
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
/* o ditado do Chrome manda a voz ao Google: só com a chave do adulto (guardião, 23/10) */
ui.micLigado = function () { try { return localStorage.getItem('fab_mic') === '1'; } catch (e) { return false; } };
ui.ligaMic = function (raiz) {
  if (!ui.micLigado()) { raiz.querySelectorAll('.mic').forEach(function (b) { b.remove(); }); return; }
  raiz.querySelectorAll('.mic').forEach(function (b) { b.onclick = function () { ui.ditado($(b.dataset.alvo), b); }; });
};

/* ---------------- topo: nome do jogo ---------------- */
$('nomeJogo').addEventListener('input', function () { var J = FAB.jogo(); J.nome = this.value.slice(0, 40) || 'Meu jogo'; FAB.mudou(); });

/* tela de toque? mostra os botões de controle no jogo (ou ela escolhe em Meu jeito) */
window.addEventListener('touchstart', function () { ui._toque = true; ui.layout(); }, { once: true, passive: true });
/* setinhas que reabrem o que foi recolhido */
$('abreNav').onclick = function () { P().navFechada = false; imersivoAgora = false; FAB.salva(); ui.layout(); };
$('abreTopo').onclick = function () { P().topoFechado = false; imersivoAgora = false; FAB.salva(); ui.layout(); };
$('btRecolhe').onclick = function () { P().topoFechado = true; FAB.salva(); ui.layout(); };
$('btVoz').onclick = function () { ui.trocaVoz(); };
$('btJeito').onclick = function () { ui.vai('jeito'); };
$('selo').onclick = function () { ui.toqueSelo(); };
/* onde ela parou muda também dentro da tela (fase, aba, quem desenha) */
document.addEventListener('click', function () { setTimeout(function () { if (FAB.marcaOnde && atual) FAB.marcaOnde(atual); }, 0); }, true);

FAB.mudo = !window.somLigado;
})();
