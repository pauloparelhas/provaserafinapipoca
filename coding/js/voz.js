/* ============================================================
   voz.js — a VOZ da Fábrica: Thalita ou Antonio, nunca robótica
   As frases fixas (ajudas, missões, toasts, perguntas da prova)
   estão GRAVADAS em audio/<voz>/<chave>.mp3 (edge-tts, gerado por
   _engenharia/gera_audio.py). Frase cortada em pedaços (por ponto)
   para que "Acertou!" + explicação reaproveitem as gravações.
   Pedaço sem gravação (nome que ela inventou, pergunta dela): só
   fala se o navegador tiver a voz natural Thalita/Antonio (Edge);
   senão fica em silêncio — a voz robótica do sistema é PROIBIDA.
   Teste automático (navigator.webdriver) nunca fala (REGRA ZERO).
   Este arquivo também roda no Node (frases.js) para cortar igual.
   ============================================================ */
(function (G) {
'use strict';
var FAB = G.FAB = G.FAB || {};

/* ---- corte e chave (iguais no navegador e no gerador) ---- */
FAB.pedacos = function (t) {
  return [].concat(t).reduce(function (a, x) {
    var s = String(x == null ? '' : x).replace(/\s+/g, ' ').trim();
    return s ? a.concat(s.split(/(?<=[.!?])\s+/).filter(function (y) { return /[a-z0-9à-ú]/i.test(y); })) : a;
  }, []);
};
FAB.chaveAudio = function (p) {
  var s = String(p).toLowerCase().replace(/\s+/g, ' ').replace(/[.…\s]+$/, '').trim(), h = 0x811c9dc5;   /* "x." e "x" são a mesma gravação */
  for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return ('0000000' + h.toString(16)).slice(-8);
};
/* duas vozes por idioma: a feminina e a masculina. A escolha dela ('thalita' ou 'antonio') vale nos dois idiomas */
FAB.VOZES = { thalita: { nome: 'Thalita', natural: /thalita/i, lang: 'pt' }, antonio: { nome: 'Antonio', natural: /ant[oô]nio/i, lang: 'pt' },
              ava: { nome: 'Ava', natural: /\bava\b/i, lang: 'en' }, brian: { nome: 'Brian', natural: /brian/i, lang: 'en' } };
FAB.vozDe = function (escolha, lingua) { return lingua === 'en' ? (escolha === 'antonio' ? 'brian' : 'ava') : (escolha === 'antonio' ? 'antonio' : 'thalita'); };
FAB.NUMEROS_FALA = ['Um.', 'Dois.', 'Três.', 'Quatro.'];
/* frase -> lista de {p: pedaço, l: idioma}. Em inglês cada texto é traduzido inteiro (ou pedaço por pedaço);
   o que não tem tradução (pergunta da prova, que é em português) continua em português com a voz de lá */
FAB.pedacosNaLingua = function (t, lingua) {
  var R = [], EN = FAB.EN || {}, tem = function (p, e) { return e !== p || Object.prototype.hasOwnProperty.call(EN, p) || Object.prototype.hasOwnProperty.call(EN, p.replace(/\.$/, '')); };   /* "Pixel" -> "Pixel" também é inglês */
  [].concat(t).forEach(function (x) {
    if (lingua !== 'en' || !FAB.trTexto) { FAB.pedacos(x).forEach(function (p) { R.push({ p: p, l: 'pt' }); }); return; }
    var s = String(x == null ? '' : x).replace(/\s+/g, ' ').trim(), e = FAB.trTexto(s);
    if (tem(s, e)) { FAB.pedacos(e).forEach(function (p) { R.push({ p: p, l: 'en' }); }); return; }
    FAB.pedacos(s).forEach(function (p) { var e2 = FAB.trTexto(p); R.push(tem(p, e2) ? { p: e2, l: 'en' } : { p: p, l: 'pt' }); });
  });
  return R;
};
if (typeof Audio === 'undefined' || typeof navigator === 'undefined') return;   /* Node: só o corte */

var mudo = !!navigator.webdriver, som = new Audio(), seq = 0;
function pref() { var P = (FAB.E && FAB.E.prefs) || {}; return { voz: P.voz === 'antonio' ? 'antonio' : 'thalita', vel: P.vel || 1, lingua: P.lingua === 'en' ? 'en' : 'pt' }; }
function gravado(x) { return !!(FAB.AUDIO && FAB.AUDIO[x.l] && FAB.AUDIO[x.l][FAB.chaveAudio(x.p)]); }
function natural(v) {
  var re = FAB.VOZES[v].lang === 'en' ? /en[-_]US/i : /pt[-_]BR/i;
  try { return speechSynthesis.getVoices().filter(function (x) { return re.test(x.lang) && FAB.VOZES[v].natural.test(x.name) && /natural|online/i.test(x.name); })[0] || null; } catch (e) { return null; }
}
FAB.semAudio = [];   /* o portão lê: frase fixa sem gravação é defeito */

FAB.calaVoz = function () { seq++; try { som.pause(); } catch (e) {} try { speechSynthesis.cancel(); } catch (e) {} };
FAB.fala = function (t) {
  var cfg = pref(), P = FAB.pedacosNaLingua(t, cfg.lingua), falta = P.filter(function (x) { return !gravado(x); });
  falta.forEach(function (x) { if (FAB.semAudio.indexOf(x.p) < 0) FAB.semAudio.push(x.p); });   /* conta até no teste mudo */
  if (mudo || !G.somLigado) return;
  FAB.calaVoz();
  var my = seq;
  var fila = [];
  P.forEach(function (x) {   /* gravado toca o mp3; inventado só com a voz natural do navegador (Edge); robótica nunca */
    var v = FAB.vozDe(cfg.voz, x.l);
    if (gravado(x)) fila.push({ src: 'audio/' + v + '/' + FAB.chaveAudio(x.p) + '.mp3' });
    else { var n = natural(v); if (n) fila.push({ txt: x.p, voz: n, lang: x.l === 'en' ? 'en-US' : 'pt-BR' }); }
  });
  (function proximo() {
    if (my !== seq || !fila.length) return;
    var f = fila.shift();
    if (f.src) { som.src = f.src; som.playbackRate = cfg.vel; som.onended = proximo; som.onerror = proximo; var r = som.play(); if (r && r.catch) r.catch(function () {}); return; }
    try { var u = new SpeechSynthesisUtterance(f.txt); u.voice = f.voz; u.lang = f.lang; u.rate = cfg.vel; u.onend = u.onerror = proximo; speechSynthesis.speak(u); } catch (e) { proximo(); }
  })();
};
G.addEventListener('beforeunload', FAB.calaVoz);
try { speechSynthesis.getVoices(); } catch (e) {}
})(typeof window !== 'undefined' ? window : globalThis);
