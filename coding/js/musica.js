/* ============================================================
   musica.js — MÚSICA DE FUNDO das fases (sintetizada, sem arquivo)
   Cada trilha é um laço curto: uma linha de melodia e uma de baixo,
   uma nota por "passo" (colcheia). O navegador calcula o som na hora
   (WebAudio), como os sons do motor. Nada sai do computador.
   A fase guarda só o nome da trilha: fase.musica = 'alegre' | 'aventura'
   | 'calma' | 'misterio' | 'nenhuma'. Fase sem o campo = sem música
   (os jogos antigos continuam iguaizinhos).
   API: FAB.musica.toca(id) · para() · pausa(bool) · amostra(id) · atual()
   Respeita o botão de som (FAB.mudo), pausa com o jogo e cala quando o
   teste para (motor.para / fim) ou a aba some.
   ============================================================ */
(function () {
'use strict';
window.FAB = window.FAB || {};

Object.assign(FAB.ICONES, {
  musica: '<path d="M9 17V5l11-2v12" stroke="#1a1c2c" stroke-width="2" fill="none" stroke-linejoin="round"/><ellipse cx="6.5" cy="17.5" rx="3.3" ry="2.6" fill="#ff9ad5" stroke="#1a1c2c" stroke-width="1.5"/><ellipse cx="17.5" cy="15.5" rx="3.3" ry="2.6" fill="#ff9ad5" stroke="#1a1c2c" stroke-width="1.5"/>',
  semmusica: '<path d="M9 17V5l11-2v12" stroke="#1a1c2c" stroke-width="2" fill="none" stroke-linejoin="round"/><ellipse cx="6.5" cy="17.5" rx="3.3" ry="2.6" fill="#a7b0bd" stroke="#1a1c2c" stroke-width="1.5"/><ellipse cx="17.5" cy="15.5" rx="3.3" ry="2.6" fill="#a7b0bd" stroke="#1a1c2c" stroke-width="1.5"/><path d="M3 3l18 18" stroke="#e43b44" stroke-width="2.6" stroke-linecap="round"/>'
});

/* notas em número MIDI (60 = dó do meio); 0 = pausa. 32 passos por volta. */
var TRILHAS = {
  alegre: { bpm: 132, onda: 'square', ondaB: 'triangle',
    mel: [72,0,76,0,79,0,76,0, 77,0,81,0,79,0,0,0, 76,0,79,0,84,0,79,0, 77,76,74,0,72,0,0,0],
    bai: [48,0,55,0,48,0,55,0, 53,0,60,0,53,0,60,0, 48,0,55,0,48,0,55,0, 43,0,50,0,43,0,47,0] },
  aventura: { bpm: 144, onda: 'square', ondaB: 'triangle',
    mel: [69,0,72,76,0,74,72,0, 71,0,74,77,0,76,74,0, 72,0,76,81,0,79,77,76, 74,0,71,0,69,0,0,0],
    bai: [45,45,0,45,45,0,45,0, 43,43,0,43,43,0,43,0, 41,41,0,41,41,0,41,0, 40,40,0,40,44,0,40,0] },
  calma: { bpm: 84, onda: 'triangle', ondaB: 'sine',
    mel: [77,0,0,0,76,0,72,0, 74,0,0,0,69,0,0,0, 72,0,0,0,74,0,76,0, 77,0,0,0,0,0,0,0],
    bai: [41,0,0,0,48,0,0,0, 38,0,0,0,45,0,0,0, 46,0,0,0,53,0,0,0, 48,0,0,0,43,0,0,0] },
  misterio: { bpm: 96, onda: 'triangle', ondaB: 'triangle',
    mel: [62,0,65,0,68,0,67,0, 0,0,65,0,62,0,0,0, 61,0,64,0,67,0,66,0, 0,0,64,0,61,0,0,0],
    bai: [38,0,0,38,0,0,38,0, 37,0,0,37,0,0,37,0, 38,0,0,38,0,0,38,0, 36,0,0,36,0,0,37,0] }
};
/* o que aparece para ela escolher (o nome passa pelo dicionário de inglês) */
FAB.MUSICAS = [
  { id: 'alegre', nome: 'Alegre' },
  { id: 'aventura', nome: 'Aventura' },
  { id: 'calma', nome: 'Calma' },
  { id: 'misterio', nome: 'Mistério' },
  { id: 'nenhuma', nome: 'Sem música' }
];

var AC = null, mestre = null, tick = null, trilha = null, idAtual = null, passo = 0, proxT = 0, pausada = false, amostraAte = 0;
function ctx() {
  if (AC) return AC;
  try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { AC = false; }
  return AC;
}
function hz(n) { return 440 * Math.pow(2, (n - 69) / 12); }
function nota(a, n, t, dur, onda, vol) {
  var o = a.createOscillator(), g = a.createGain();
  o.type = onda; o.frequency.value = hz(n);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01);
  g.gain.exponentialRampToValueAtTime(.0005, t + dur);
  o.connect(g); g.connect(mestre); o.start(t); o.stop(t + dur + .02);
}
function calado() {
  if (FAB.mudo || pausada || document.hidden) return true;
  if (amostraAte) return Date.now() > amostraAte;
  return !(FAB.motor && FAB.motor.rodando && FAB.motor.rodando());
}
function agenda() {
  var a = AC; if (!a || !trilha) return;
  if (amostraAte && Date.now() > amostraAte) { M.para(); return; }
  if (!amostraAte && !(FAB.motor && FAB.motor.rodando && FAB.motor.rodando())) { M.para(); return; }   /* saiu do teste */
  var p = 60 / trilha.bpm / 2;
  if (calado()) { proxT = a.currentTime + .05; return; }
  if (proxT < a.currentTime) proxT = a.currentTime + .05;
  while (proxT < a.currentTime + .25) {
    var m = trilha.mel[passo % trilha.mel.length], b = trilha.bai[passo % trilha.bai.length];
    try {
      if (m) nota(a, m, proxT, p * .9, trilha.onda, trilha.onda === 'square' ? .035 : .07);
      if (b) nota(a, b, proxT, p * .95, trilha.ondaB, .07);
    } catch (e) {}
    passo++; proxT += p;
  }
}

var M = FAB.musica = {};
M.toca = function (id, comoAmostra) {
  M.para();
  if (!id || !TRILHAS[id]) return;
  idAtual = id;
  var a = ctx(); if (!a) return;
  try {
    if (a.state === 'suspended' && a.resume) a.resume();
    mestre = a.createGain(); mestre.gain.value = .55; mestre.connect(a.destination);
  } catch (e) { return; }
  trilha = TRILHAS[id]; passo = 0; proxT = a.currentTime + .08; pausada = false;
  amostraAte = comoAmostra ? Date.now() + 4000 : 0;
  agenda(); tick = setInterval(agenda, 60);
};
M.amostra = function (id) { if (FAB.mudo) return; M.toca(id, true); };
M.para = function () {
  clearInterval(tick); tick = null; trilha = null; idAtual = null; amostraAte = 0;
  if (mestre) { try { mestre.gain.setValueAtTime(0, AC.currentTime); mestre.disconnect(); } catch (e) {} mestre = null; }
};
M.pausa = function (p) { pausada = !!p; };
M.atual = function () { return idAtual; };
M.nome = function (id) { var x = FAB.MUSICAS.filter(function (m) { return m.id === (id || 'nenhuma'); })[0]; return x ? x.nome : 'Sem música'; };
})();
