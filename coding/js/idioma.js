/* ============================================================
   idioma.js — a Fábrica inteira em inglês (Opções > Idioma)
   O código continua escrevendo em português; quando o idioma é
   inglês, cada texto que aparece na tela (e cada atributo title,
   placeholder, aria-label) passa pelo dicionário banco/ingles.js.
   A voz traduz do mesmo jeito (voz.js). Pergunta da prova, que é
   em português, fica em português e é lida pela voz brasileira.
   ============================================================ */
(function () {
'use strict';
FAB.lingua = function () { return (FAB.E && FAB.E.prefs && FAB.E.prefs.lingua) === 'en' ? 'en' : 'pt'; };
FAB.tr = function (s) { return FAB.lingua() === 'en' && FAB.trTexto ? FAB.trTexto(s) : s; };
FAB.naoTraduzidos = [];   /* o portão lê: texto da Fábrica que ficou em português no modo inglês */
/* texto montado com pedaços: o MOLDE passa pelo dicionário e os pedaços entram nos {0} {1}…
   ex.: FAB.trf('Missão {0} de {1}', [3, 24]) -> 'Mission 3 of 24' (dicionário: 'Missão {0} de {1}') */
FAB.trf = function (molde, args) {
  return FAB.tr(molde).replace(/\{(\d+)\}/g, function (_, i) { var a = args[+i]; return a == null ? '' : String(a); });
};
/* texto que o código JÁ montou em inglês (pedaços traduzidos antes de juntar) não é "português que sobrou":
   toda palavra dele aparece em alguma tradução do dicionário (ou em FAB.EN_PALAVRAS) e não tem acento */
var palavrasEN = null;
FAB.pareceIngles = function (t) {
  if (!palavrasEN) {
    palavrasEN = {};
    var poe = function (s) { String(s).toLowerCase().replace(/[a-z']+/g, function (w) { palavrasEN[w] = 1; return w; }); };
    Object.keys(FAB.EN || {}).forEach(function (k) { poe(FAB.EN[k]); });
    (FAB.EN_PALAVRAS || []).forEach(poe);
  }
  if (/[À-ÿ]/.test(t)) return false;
  var ws = String(t).toLowerCase().match(/[a-z']+/g) || [];
  return ws.length > 0 && ws.every(function (w) { return palavrasEN[w] || palavrasEN[w.replace(/'/g, '')]; });
};

var ATTR = ['title', 'placeholder', 'aria-label'];
var feitos = new WeakMap();   /* nó que eu mesmo traduzi não volta para a fila */
function trNo(n) {
  var v = n.nodeValue, t = v.trim(); if (!t || !/[a-zà-ú]/i.test(t) || feitos.get(n) === v) return;
  var e = FAB.trTexto(t);
  if (e !== t) { n.nodeValue = v.replace(t, e); feitos.set(n, n.nodeValue); }
  else if (!FAB.pareceIngles(t) && FAB.naoTraduzidos.length < 400 && FAB.naoTraduzidos.indexOf(t) < 0) FAB.naoTraduzidos.push(t);
}
function trEl(el) {
  ATTR.forEach(function (a) {
    var v = el.getAttribute && el.getAttribute(a); if (!v || !/[a-zà-ú]/i.test(v)) return;
    var t = v.trim(), e = FAB.trTexto(t);
    if (e !== t) el.setAttribute(a, e);
    else if (!FAB.pareceIngles(t) && !(el.closest && el.closest('[data-sem-traducao]')) && FAB.naoTraduzidos.length < 400 && FAB.naoTraduzidos.indexOf(t) < 0) FAB.naoTraduzidos.push(t);
  });
}
function traduz(raiz) {
  if (raiz.nodeType === 3) { if (!eDela(raiz)) trNo(raiz); return; }
  if (raiz.nodeType !== 1 || raiz.closest && raiz.closest('[data-sem-traducao]')) return;
  trEl(raiz);
  var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT), n;
  while ((n = w.nextNode())) {
    if (n.nodeType === 1) { if (n.hasAttribute('data-sem-traducao') || n.tagName === 'SCRIPT' || n.tagName === 'STYLE') continue; trEl(n); }   /* textarea: o placeholder traduz; o texto dela, não (eDela) */
    else if (!eDela(n)) trNo(n);
  }
}
/* texto escrito por ela (nome de jogo, pergunta dela) não se traduz */
function eDela(n) { var p = n.parentNode; return !!(p && (/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName) || p.closest && p.closest('[data-sem-traducao]'))); }   /* código da página também não */

FAB.ligaIdioma = function () {
  if (FAB.lingua() !== 'en') return;
  document.documentElement.lang = 'en';
  document.title = FAB.trTexto(document.title);
  traduz(document.body);
  new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      if (m.type === 'characterData') { if (!eDela(m.target)) trNo(m.target); return; }
      if (m.type === 'attributes') { trEl(m.target); return; }
      m.addedNodes.forEach(traduz);
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTR });
};
/* trocar de idioma: guarda e recarrega (a tela volta já no idioma novo) */
FAB.trocaLingua = function (l) {
  FAB.E.prefs.lingua = l;
  try { localStorage.setItem('fab_mariana_v1', JSON.stringify(FAB.E)); } catch (e) {}
  location.reload();
};
})();
