/* ============================================================
   guia.js — o FIO da Fábrica (Frente A da v3: navegação)
   - os 5 passos do caminho (Desenhar, Fases, Regras, Testar, Mostrar)
   - para cada missão: em que tela ela acontece e QUAL elemento
     clicar (mapa id da missão -> seletor CSS). Missão sem linha
     aqui continua funcionando: a seta aponta o "Próximo passo".
   - o contador vivo da missão ("11 de 15")
   - a SETA amarela que quica sobre o lugar de clicar (uma só).
   banco/missoes.js não muda por causa daqui: missão nova no fim
   ganha uma linha em GUIA quando tiver alvo próprio.
   ============================================================ */
(function () {
'use strict';
FAB.PASSOS = [['pixel', 'Desenhar', 't_pixel'], ['fases', 'Fases', 't_fases'], ['regras', 'Regras', 't_regras'], ['testar', 'Testar', 't_testar'], ['jogar', 'Mostrar', 't_jogar']];

/* índice (na lista de regras) da primeira regra ligada que combina — para apontar o cartão certo */
function regraIdx(J, f) { var i = -1; (J.regras || []).some(function (r, k) { if (f(r)) { i = k; return true; } return false; }); return i; }
function cartaoDaRegra(f, bloco, senao) {
  return function (J) { var i = regraIdx(J, f); return i >= 0 ? '.regra[data-r="' + i + '"] .bloco.' + bloco : senao; };
}
function moeda(r) { return r.quando && r.quando.t === 'toca' && r.quando.obj === 'moeda'; }
function porta(r) { return r.quando && r.quando.t === 'toca' && r.quando.obj === 'porta'; }

/* tela: onde a missão acontece de verdade (se diferente de m.onde); alvo: seletor ou função(J) -> seletor */
var GUIA = {
  heroi:        { alvo: '#pxGrade' },
  pular:        { alvo: '#tsRec' },
  moedas:       { alvo: '.peca[data-t="moeda"]' },
  som:          { alvo: cartaoDaRegra(moeda, 'f', '#rgNova') },
  pontos:       { alvo: cartaoDaRegra(moeda, 'f', '#rgNova') },
  diario:       { tela: 'testar', alvo: '.sobre.on .cara' },
  inimigo:      { alvo: '#pxPapeis' },
  tecla:        { alvo: '#rgNova' },
  bug1:         { alvo: cartaoDaRegra(moeda, 'f', '#rgNova') },
  bug2:         { alvo: '#tsRec' },
  chaveporta:   { alvo: '.peca[data-t="chave"]' },
  condicao:     { alvo: cartaoDaRegra(porta, 's', '#rgNova') },
  laco:         { alvo: '#rgNova' },
  fase2:        { alvo: '#fzNova' },
  convidado:    { alvo: '#jgPlay' },
  versao:       { alvo: '#dgFoto' },
  prova:        { alvo: '.peca[data-t="placa"]' },
  minhapergunta:{ alvo: function () { return document.querySelector('#pgP') ? '#pgP' : '[data-aba="perguntas"]'; } },
  robo:         { alvo: '#rbTipo' },
  pontovolta:   { alvo: '.peca[data-t="pontovolta"]' },
  heroinovo:    { alvo: '#pxGal' },
  cristais:     { alvo: '.peca[data-t="cristal"]' },
  pulaalto:     { alvo: '#rgNova' },
  cenarionovo:  { alvo: '#fzCen' },
  jeito:        { alvo: '.temas' }
};
FAB.GUIA = GUIA;

/* contador vivo: [feito, total] das missões que dá para contar */
function pecas(J, l) { return FAB.util ? FAB.util.pecas(J, l) : 0; }
function T(J) { return J.ultimoTeste || {}; }
var CONTA = {
  moedas:     function (E, J) { return [pecas(J, 'o'), 15]; },
  cristais:   function (E, J) { return [Math.max.apply(null, (J.fases || []).map(function (f) { return f.mapa.join('').split('c').length - 1; }).concat([0])), 5]; },
  pontos:     function (E, J) { return [T(J).pontos || 0, 20]; },
  chaveporta: function (E, J) { return [(pecas(J, 'k') ? 1 : 0) + (pecas(J, 'D') ? 1 : 0), 2]; },
  fase2:      function (E, J) { return [((J.fases || []).length >= 2 ? 1 : 0) + ((T(J).faseMax || 1) >= 2 ? 1 : 0), 2]; },
  laco:       function (E, J) { var n = 0; (J.regras || []).forEach(function (r) { if (r.quando && r.quando.t === 'cada' && T(J).disparos) n = Math.max(n, T(J).disparos[r.id] || 0); }); return [n, 2]; }
};

var G = FAB.guia = {};
G.telaDa = function (m) { return m ? ((GUIA[m.id] || {}).tela || m.onde) : null; };
G.progresso = function (m) {
  if (!m || !CONTA[m.id]) return null;
  try { var c = CONTA[m.id](FAB.E, FAB.jogo()); return [Math.min(c[0], c[1]), c[1]]; } catch (e) { return null; }
};
/* ir fazer a missão: abre o jogo-modelo se ela precisa (jogo quebrado) e vai para a tela certa */
G.vaiMissao = function (m) {
  if (!m) { FAB.ui.vai('fases'); return; }
  if (m.abre) {
    var J = FAB.E.jogos.filter(function (j) { return j.origem === m.abre; })[0] || FAB.novoJogo(m.abre);
    FAB.abreJogo(J.id);
  }
  FAB.ui.nav(); FAB.ui.vai(G.telaDa(m));
};

/* ---------------- a seta que quica ---------------- */
var seta = document.createElement('div');
seta.id = 'guia'; seta.className = 'guia'; seta.setAttribute('aria-hidden', 'true');
seta.innerHTML = '<svg viewBox="0 0 40 48" width="46" height="54"><path d="M13 3h14v20h10L20 45 3 23h10z" fill="#ffd84a" stroke="#1a1c2c" stroke-width="3" stroke-linejoin="round"/></svg>';
document.documentElement.appendChild(seta);   /* fora do <body> (que tem zoom): a posição é a da tela */
var dispensou = {}, rolou = {}, alvoAgora = null;

function chave(m, tela) { return (m ? m.id : '-') + '|' + tela; }
function visivel(el) {
  if (!el) return false;
  var r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 4) return false;
  var cs = getComputedStyle(el); return cs.visibility !== 'hidden' && cs.display !== 'none';
}
/* qual elemento a seta aponta agora (ou null) */
G.alvo = function () {
  var ui = FAB.ui, tela = ui.atual(), m = FAB.proximaMissao();
  if (!tela || FAB.compartilhado) return null;
  var modal = document.getElementById('modal').classList.contains('on');
  if (modal) return null;
  if (tela === 'testar' && FAB.motor && FAB.motor.rodando()) return null;   /* nunca em cima do jogo rodando */
  if (tela === 'painel') return document.getElementById('pnCont');
  if (!m) return null;
  if (G.telaDa(m) !== tela) { var pr = ui.proximo && ui.proximo(); return pr && pr.missao ? document.getElementById('trProx') : null; }   /* outra tela: o Próximo passo leva lá (no Mostrar ele fecha o ciclo: sem seta) */
  var g = GUIA[m.id]; if (!g) return null;
  var sel = typeof g.alvo === 'function' ? g.alvo(FAB.jogo()) : g.alvo;
  var el = sel && document.querySelector('#t-' + tela + ' ' + sel);
  if (!el && sel) el = document.querySelector(sel);
  if (el && el.classList.contains('peca') && !visivel(el)) el = document.getElementById('fzGaveta');   /* peças recolhidas: abra a gaveta */
  return visivel(el) ? el : null;
};
function posiciona() {
  if (FAB.ui && FAB.ui.selo) FAB.ui.selo();
  var tela = FAB.ui && FAB.ui.atual(), m = FAB.proximaMissao(), k = chave(m, tela);
  var el = dispensou[k] ? null : G.alvo();
  alvoAgora = el;
  if (!el) { seta.classList.remove('on'); return; }
  if (!rolou[k] && el.scrollIntoView) {
    var r0 = el.getBoundingClientRect();
    if (r0.bottom > innerHeight - 8 || r0.top < 0) { try { el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' }); } catch (e) {} }
    rolou[k] = true;
  }
  var r = el.getBoundingClientRect(), z = G.zoom();
  if (r.bottom * z < 0 || r.top * z > innerHeight) { seta.classList.remove('on'); return; }   /* rolou para longe: some */
  var x = (r.left + r.width / 2) * z - 23, y = r.top * z - 56, cima = y < 4;
  if (cima) y = r.bottom * z + 2;
  x = Math.max(2, Math.min(innerWidth - 48, x));
  seta.style.left = x + 'px'; seta.style.top = y + 'px';
  seta.classList.toggle('cima', cima); seta.classList.add('on');
}
/* tocou no alvo: a seta some até a próxima tela ou a próxima missão (é estado, não relógio) */
document.addEventListener('pointerdown', function (ev) {
  if (alvoAgora && alvoAgora.contains(ev.target)) { dispensou[chave(FAB.proximaMissao(), FAB.ui.atual())] = true; seta.classList.remove('on'); }
}, true);
/* o tamanho (P/M/G) é zoom no <body>: medimos uma vez como o navegador devolve as medidas */
G.zoom = function () {
  var zb = parseFloat(getComputedStyle(document.body).zoom) || 1; if (zb === 1) return 1;
  var t = document.createElement('div'); t.style.cssText = 'position:fixed;left:100px;top:0;width:10px;height:10px'; document.body.appendChild(t);
  var L = t.getBoundingClientRect().left; t.remove();
  return Math.abs(L - 100) < 1 ? zb : 1;   /* medida "sem zoom" -> multiplica; medida já na tela -> não */
};
G.novaTela = function () { dispensou = {}; rolou = {}; setTimeout(posiciona, 60); };
G.atualiza = posiciona;
setInterval(posiciona, 350);
window.addEventListener('resize', posiciona);
})();
