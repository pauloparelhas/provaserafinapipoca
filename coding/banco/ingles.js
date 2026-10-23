/* ============================================================
   ingles.js — o dicionário da Fábrica em inglês
   FAB.EN:    texto exato em português -> texto em inglês
   FAB.EN_RE: textos com número ou nome no meio (expressão -> molde)
   Texto novo na Fábrica? Acrescente aqui; o portão (teste_ingles.py)
   lista o que apareceu na tela em português com o idioma inglês.
   Também roda no Node (frases.js grava a voz em inglês daqui).
   ============================================================ */
(function (G) {
'use strict';
var FAB = G.FAB = G.FAB || {};
FAB.EN = {};
FAB.EN_RE = [];
FAB.trTexto = function (s) {
  var t = String(s == null ? '' : s), k = t.trim();
  if (!k) return t;
  if (Object.prototype.hasOwnProperty.call(FAB.EN, k)) return t.replace(k, FAB.EN[k]);
  for (var i = 0; i < FAB.EN_RE.length; i++) {
    var R = FAB.EN_RE[i]; if (R[0].test(k)) return t.replace(k, k.replace(R[0], R[1]));
  }
  return t;
};
})(typeof window !== 'undefined' ? window : globalThis);
