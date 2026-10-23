/* ============================================================
   estado.js — a MEMÓRIA da Fábrica
   Guarda tudo da Mariana no navegador (autosave) e em arquivo
   (.json baixado). Também desenha sprites (string → canvas) e
   confere as missões.
   ============================================================ */
(function () {
'use strict';
var CHAVE = 'fab_mariana_v1';

function novoEstado() {
  return { v: 1, criadora: { nome: 'Mariana' }, missoes: {}, jogos: [], atual: null,
    sprites: {}, perguntas: [], pedidos: [], diario: [],
    stats: { testes: 0, convidado: 0, lupa: 0 }, criado: Date.now() };
}
function copia(o) { return JSON.parse(JSON.stringify(o)); }
function uid(p) { return (p || 'x') + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
FAB.copia = copia; FAB.uid = uid;

/* ---------------- carregar / salvar ---------------- */
var E;
try { E = JSON.parse(localStorage.getItem(CHAVE) || 'null'); } catch (e) { E = null; }
/* completa o que faltar (arquivo velho ou incompleto não trava a Fábrica) */
function completa(n) {
  if (!n || n.v !== 1 || !Array.isArray(n.jogos)) return null;
  var b = novoEstado(); Object.keys(b).forEach(function (k) { if (n[k] === undefined || n[k] === null) n[k] = b[k]; });
  n.jogos = n.jogos.filter(function (j) { return j && Array.isArray(j.fases) && j.fases.length && Array.isArray(j.regras); });
  n.jogos.forEach(function (j) { j.versoes = j.versoes || []; j.testes = j.testes || []; j.ajustes = j.ajustes || { vidas: 3, tempo: 0, perguntas: 'prova' }; j.skins = j.skins || { heroi: 'urso' }; j.ideia = j.ideia || {}; });
  return n;
}
E = completa(E) || novoEstado();
FAB.E = E;

var tSalva = null;
FAB.salva = function () {
  clearTimeout(tSalva);
  tSalva = setTimeout(function () {
    try { localStorage.setItem(CHAVE, JSON.stringify(FAB.E)); } catch (e) { console.warn('não salvou', e); if (FAB.ui && FAB.ui.toast) FAB.ui.toast('O navegador está cheio! Peça ao papai: Guardar no computador.', true); }
  }, 250);
};
window.addEventListener('beforeunload', function () { if (FAB.compartilhado) return; try { localStorage.setItem(CHAVE, JSON.stringify(FAB.E)); } catch (e) {} });

/* ---------------- jogos ---------------- */
FAB.novaRegra = function (r) {
  r = copia(r); r.id = uid('r'); if (r.liga === undefined) r.liga = true; if (!r.se) r.se = null; return r;
};
FAB.novoJogo = function (modeloId) {
  var M = FAB.MODELOS[modeloId] || FAB.MODELOS.vazio;
  var skins = {}; Object.keys(FAB.TIPOS).forEach(function (t) { if (FAB.TIPOS[t].skin) skins[t] = FAB.TIPOS[t].skin; });
  skins.heroi = 'urso';
  var J = {
    id: uid('j'), nome: M.nome, origem: modeloId, criado: Date.now(), mudado: Date.now(),
    ideia: { heroi: 'urso', objetivo: 'chegar na bandeira', historia: '' },
    skins: skins, fases: copia(M.fases), ajustes: { vidas: 3, tempo: 0, perguntas: 'prova' },
    regras: FAB.REGRAS_PADRAO.map(FAB.novaRegra), versoes: [], testes: [], ultimoTeste: null
  };
  if (M.bugs && FAB.BUGS_QUEBRADO) FAB.BUGS_QUEBRADO(J.regras);
  FAB.E.jogos.push(J); FAB.E.atual = J.id; FAB.salva();
  return J;
};
FAB.jogo = function () {
  var E = FAB.E, J = E.jogos.filter(function (j) { return j.id === E.atual; })[0];
  if (!J) J = E.jogos[0] || FAB.novoJogo('primeiro');
  E.atual = J.id; return J;
};
FAB.abreJogo = function (id) { FAB.E.atual = id; FAB.salva(); };
FAB.mudou = function () { var J = FAB.jogo(); J.mudado = Date.now(); FAB.salva(); FAB.confereMissoes(); };
FAB.apagaJogo = function (id) {
  FAB.E.jogos = FAB.E.jogos.filter(function (j) { return j.id !== id; });
  if (FAB.E.atual === id) FAB.E.atual = FAB.E.jogos[0] ? FAB.E.jogos[0].id : null;
  FAB.salva();
};

/* ---------------- foto do jogo (versão) ---------------- */
FAB.tiraFoto = function (nome) {
  var J = FAB.jogo(), s = copia(J); delete s.versoes; delete s.testes;
  J.versoes.push({ nome: nome || ('Foto ' + (J.versoes.length + 1)), data: Date.now(), snap: s });
  if (J.versoes.length > 20) J.versoes.splice(0, J.versoes.length - 20);   /* cabe no navegador (5 MB) */
  FAB.mudou();
};
FAB.voltaFoto = function (i) {
  var J = FAB.jogo(), v = J.versoes[i]; if (!v) return;
  FAB.tiraFoto('Antes de voltar');
  ['nome', 'ideia', 'skins', 'fases', 'ajustes', 'regras'].forEach(function (k) { J[k] = copia(v.snap[k]); });
  FAB.mudou();
};

/* ---------------- arquivo (.json) ---------------- */
function carimbo() { var d = new Date(), z = function (n) { return (n < 10 ? '0' : '') + n; };
  return d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + '-' + z(d.getHours()) + z(d.getMinutes()); }
FAB.baixa = function (nome, obj) {
  var b = new Blob([JSON.stringify(obj, null, 1)], { type: 'application/json' });
  var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = nome;
  document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
};
/* um arquivo só serve para as duas coisas: cópia de segurança e canal com o robô */
FAB.exporta = function () { FAB.baixa('fabrica_mariana_' + carimbo() + '.json', FAB.E); };
FAB.importa = function (arquivo, pronto) {
  var r = new FileReader();
  r.onload = function () {
    try { var n = completa(JSON.parse(r.result)); if (!n || !n.jogos.length) throw 0;
      localStorage.setItem(CHAVE + '_antes_de_importar', JSON.stringify(FAB.E));
      FAB.E = n; localStorage.setItem(CHAVE, JSON.stringify(n)); pronto(true);
    } catch (e) { pronto(false); }
  };
  r.readAsText(arquivo);
};

/* ---------------- sprites: string → canvas ---------------- */
FAB.spr = function (id) { return (FAB.E.sprites && FAB.E.sprites[id]) || FAB.SPRITES[id] || FAB.SPRITES.urso; };
var cache = {};
FAB.limpaCache = function (id) { Object.keys(cache).forEach(function (k) { if (!id || k.indexOf(id + '|') === 0) delete cache[k]; }); };
FAB.sprCanvas = function (id, q) {
  var s = FAB.spr(id), quadros = s.quadros, Q = quadros[(q || 0) % quadros.length];
  var k = id + '|' + ((q || 0) % quadros.length);
  if (cache[k]) return cache[k];
  var c = document.createElement('canvas'); c.width = 16; c.height = 16;
  var x = c.getContext('2d');
  for (var j = 0; j < 16; j++) { var L = Q[j] || ''; for (var i = 0; i < 16; i++) { var cor = FAB.PALETA[L[i]]; if (cor) { x.fillStyle = cor; x.fillRect(i, j, 1, 1); } } }
  cache[k] = c; return c;
};
FAB.sprURL = function (id, q) { return FAB.sprCanvas(id, q).toDataURL(); };
FAB.ico = function (k, tam) {
  tam = tam || 28;
  if (/^spr:/.test(k)) return '<img class="pix" alt="" width="' + tam + '" height="' + tam + '" src="' + FAB.sprURL(k.slice(4)) + '">';
  return '<svg viewBox="0 0 24 24" width="' + tam + '" height="' + tam + '" aria-hidden="true">' + (FAB.ICONES[k] || '') + '</svg>';
};
/* imagem de um TIPO de peça no jogo aberto (respeita a skin que ela escolheu) */
FAB.skinDe = function (tipo) {
  var J = FAB.jogo(); if (tipo === 'heroi') return J.skins.heroi || 'urso';
  if (tipo === 'inimigo') return J.skins.gosma || 'gosma';
  return (J.skins && J.skins[tipo]) || (FAB.TIPOS[tipo] && FAB.TIPOS[tipo].skin) || 'moeda';
};
FAB.icoTipo = function (tipo, tam) {
  if (tipo === 'inicio') return FAB.ico('spr:' + FAB.skinDe('heroi'), tam);
  return FAB.ico('spr:' + FAB.skinDe(tipo), tam);
};
FAB.nomeTipo = function (tipo) {
  var J = FAB.jogo();
  if (J.nomes && J.nomes[tipo]) return J.nomes[tipo];
  if (FAB.NOME_OBJ[tipo]) return FAB.NOME_OBJ[tipo];
  return FAB.TIPOS[tipo] ? FAB.TIPOS[tipo].nome : tipo;
};

/* ---------------- missões e nível ---------------- */
FAB.feitas = function () { return Object.keys(FAB.E.missoes).length; };
FAB.nivel = function () {
  var n = FAB.feitas(), N = FAB.NIVEIS[0];
  FAB.NIVEIS.forEach(function (x) { if (n >= x.min) N = x; }); return N;
};
FAB.xp = function () {
  var t = 0; FAB.MISSOES.forEach(function (m) { if (FAB.E.missoes[m.id]) t += m.xp; }); return t;
};
FAB.proximaMissao = function () { return FAB.MISSOES.filter(function (m) { return !FAB.E.missoes[m.id]; })[0] || null; };
FAB.confereMissoes = function () {
  var E = FAB.E, J = FAB.jogo(), novas = [];
  FAB.MISSOES.forEach(function (m) {
    if (E.missoes[m.id]) return;
    var ok = false; try { ok = m.confere(E, J); } catch (e) { ok = false; }
    if (ok) { E.missoes[m.id] = Date.now(); novas.push(m); }
  });
  if (novas.length) { FAB.salva(); novas.forEach(function (m) { FAB.ui && FAB.ui.medalha && FAB.ui.medalha(m); }); }
  return novas;
};

/* ---------------- voz ---------------- */
FAB.fala = function (t) { if (window.say) window.say(t); };

/* primeira vez: já nasce com um jogo pronto para brincar */
if (!E.jogos.length) FAB.novoJogo('primeiro');
})();
