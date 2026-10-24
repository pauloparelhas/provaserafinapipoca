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
    stats: { testes: 0, convidado: 0, lupa: 0 }, prefs: prefsPadrao(), criado: Date.now(),
    onde: null, desejos: [] };   /* onde = o último lugar em que ela trabalhou (Continuar de onde parei) */
}
/* o jeito dela: voz, cores, tamanho, barra, tela grande (tela "Meu jeito") */
function prefsPadrao() {
  return { voz: 'thalita', vel: 1, tema: 'noite', tam: 'm', navLado: 'esq', navNomes: true, navEsconde: [],
    lingua: 'pt', imersivo: true, toques: 'auto', navFechada: false, topoFechado: false, ajuda: true, pecasFechadas: false, zoomFase: 0, telaFase: 'pouca' };
}
FAB.prefsPadrao = prefsPadrao;
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
  var pp = prefsPadrao(); if (typeof n.prefs !== 'object' || Array.isArray(n.prefs)) n.prefs = {};
  Object.keys(pp).forEach(function (k) { if (n.prefs[k] === undefined || n.prefs[k] === null) n.prefs[k] = pp[k]; });
  if (!Array.isArray(n.prefs.navEsconde)) n.prefs.navEsconde = [];
  if (!Array.isArray(n.desejos)) n.desejos = [];
  n.jogos = n.jogos.filter(function (j) { return j && Array.isArray(j.fases) && j.fases.length && Array.isArray(j.regras); });
  n.jogos.forEach(function (j) { j.versoes = j.versoes || []; j.testes = j.testes || []; j.ajustes = j.ajustes || { vidas: 3, tempo: 0, perguntas: 'prova' }; j.skins = j.skins || { heroi: 'urso' }; j.ideia = j.ideia || {}; });
  return n;
}
E = completa(E) || novoEstado();
FAB.E = E;

var tSalva = null;
/* selo do topo: 'salvo' | 'salvando' | 'erro' (o navegador não guardou) */
FAB.estadoSalvo = 'salvo';
function selo(st) { FAB.estadoSalvo = st; if (FAB.ui && FAB.ui.selo) FAB.ui.selo(); }
FAB.salva = function () {
  clearTimeout(tSalva);
  FAB.E.salvoEm = Date.now();   /* a nuvem compara este carimbo para saber quem é mais novo */
  selo('salvando');
  tSalva = setTimeout(function () {
    if (FAB.nuvem) FAB.nuvem.agenda();
    try { localStorage.setItem(CHAVE, JSON.stringify(FAB.E)); selo('salvo'); }
    catch (e) { console.warn('não salvou', e); selo('erro'); if (FAB.ui && FAB.ui.toast) FAB.ui.toast('O navegador está cheio! Peça ao papai: Guardar no computador.', true); }
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
    skins: skins, fases: copia(M.fases), ajustes: Object.assign({ vidas: 3, tempo: 0, perguntas: 'prova' }, M.ajustes || {}),
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
FAB.mudou = function () { var J = FAB.jogo(); J.mudado = Date.now(); FAB.salva(); FAB.confereMissoes(); if (FAB.ui && FAB.ui.trilho) FAB.ui.trilho(); };   /* contador vivo da missão */
FAB.apagaJogo = function (id) {
  FAB.E.jogos = FAB.E.jogos.filter(function (j) { return j.id !== id; });
  if (FAB.E.atual === id) FAB.E.atual = FAB.E.jogos[0] ? FAB.E.jogos[0].id : null;
  FAB.salva();
};

/* ---------------- foto do jogo (versão) ---------------- */
FAB.tiraFoto = function (nome) {
  var J = FAB.jogo(), s = copia(J); delete s.versoes; delete s.testes;
  J.versoes.push({ nome: nome || ('Foto ' + (J.versoes.length + 1)), data: Date.now(), snap: s });
  while (J.versoes.length > 20) {   /* cabe no navegador (5 MB); a que ela guardou com nome sai por último */
    var k = 0; while (k < J.versoes.length - 1 && J.versoes[k].guardado) k++;
    J.versoes.splice(k, 1);
  }
  FAB.mudou();
};
/* "Guardar este jogo" com nome: é uma foto que ela batizou (aparece no Início) */
FAB.guardaJogo = function (nome) {
  var J = FAB.jogo(); nome = String(nome || '').trim().slice(0, 40) || J.nome;
  FAB.tiraFoto(nome);
  var v = J.versoes[J.versoes.length - 1]; v.guardado = true; FAB.salva();
  return v;
};
FAB.guardados = function () {
  var L = [];
  FAB.E.jogos.forEach(function (j) { (j.versoes || []).forEach(function (v, i) { if (v.guardado) L.push({ jogo: j, i: i, v: v }); }); });
  return L.sort(function (a, b) { return b.v.data - a.v.data; });
};
/* "Queria que tivesse…" no fim do teste: vai no .json para o papai e o robô */
FAB.desejo = function (o) {
  var J = FAB.jogo();
  FAB.E.desejos.push({ id: FAB.uid('w'), data: Date.now(), jogo: J.id, nomeJogo: J.nome, o: o });
  FAB.salva();
};
/* onde ela parou: tela + jogo + fase/aba/papel + quando (o Início lê, o Continuar volta) */
var NAO_MARCA = { painel: 1, jeito: 1 };
FAB.marcaOnde = function (tela) {
  if (FAB.compartilhado || !tela || NAO_MARCA[tela]) return;
  var o = { tela: tela, jogo: FAB.E.atual, quando: Date.now() };
  try {
    var f = document.querySelector('#t-fases .aba.on[data-f]'); if (tela === 'fases' && f) o.fase = +f.dataset.f;
    var a = document.querySelector('#t-regras .aba.on[data-aba]'); if (tela === 'regras' && a) o.aba = a.dataset.aba;
    var p = document.querySelector('#t-pixel .papel.on[data-p]'); if (tela === 'pixel' && p) o.papel = p.dataset.p;
  } catch (e) {}
  var v = FAB.E.onde;
  if (v && v.tela === o.tela && v.jogo === o.jogo && v.fase === o.fase && v.aba === o.aba && v.papel === o.papel && o.quando - v.quando < 60000) return;
  FAB.E.onde = o; FAB.salva();
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

/* a voz mora em voz.js (Thalita ou Antonio gravadas) */

/* primeira vez: já nasce com um jogo pronto para brincar */
if (!E.jogos.length) FAB.novoJogo('primeiro');
})();
