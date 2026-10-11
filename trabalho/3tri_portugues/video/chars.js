/* chars.js — personagens desenhados por codigo.
   Origem de cada personagem = ponto entre os pes, no chao. */

/* Ursinho preto (guia). o: {t, talk 0..1, wave 0..1, look -1..1, jump 0..1, happy} */
function bear(ctx, x, y, s, o = {}) {
  const t = o.t || 0, bob = Math.sin(t * 2.4) * 3, jump = (o.jump || 0) * 26;
  const BK = '#1c1c22', BK2 = '#2b2b33', BG = '#efd6ad', RED = '#d62828';
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ell(ctx, 0, 2, 62, 12, 'rgba(0,0,0,.22)');
  ctx.translate(0, -jump);
  // pernas
  ctx.fillStyle = BK; rr(ctx, -44, -52, 36, 54, 16); ctx.fill(); rr(ctx, 8, -52, 36, 54, 16); ctx.fill();
  ell(ctx, -26, -4, 13, 7, BG); ell(ctx, 26, -4, 13, 7, BG);
  // corpo
  ctx.translate(0, bob);
  ctx.save(); ctx.shadowColor = 'rgba(255,255,255,.35)'; ctx.shadowBlur = 16; ell(ctx, 0, -86, 64, 62, BK); circ(ctx, 0, -192, 60, BK); ctx.restore();
  ell(ctx, 0, -86, 64, 62, BK); ell(ctx, 0, -76, 40, 40, BK2);
  // braco esquerdo
  ctx.save(); ctx.translate(-52, -110); ctx.rotate(.35 + Math.sin(t * 2.4) * .05); ell(ctx, 0, 30, 17, 34, BK); ctx.restore();
  // braco direito (acena)
  const wv = o.wave || 0, ang = -.35 - wv * (1.9 + Math.sin(t * 9) * .35);
  ctx.save(); ctx.translate(52, -110); ctx.rotate(ang); ell(ctx, 0, 30, 17, 34, BK); ell(ctx, 0, 56, 11, 8, BK2); ctx.restore();
  // cachecol
  ctx.fillStyle = RED; rr(ctx, -56, -146, 112, 28, 14); ctx.fill();
  ctx.save(); ctx.translate(26, -130); ctx.rotate(.18 + Math.sin(t * 3) * .05);
  ctx.fillStyle = '#c11f1f'; rr(ctx, -13, 0, 30, 70, 8); ctx.fill();
  mapleLeaf(ctx, 2, 32, 12, '#ffffff');
  ctx.fillStyle = '#ffd8d8'; for (let i = 0; i < 4; i++) ctx.fillRect(-10 + i * 7, 68, 4, 9);
  ctx.restore();
  // cabeca
  const hy = -192;
  circ(ctx, -46, hy - 44, 22, BK); circ(ctx, 46, hy - 44, 22, BK);
  circ(ctx, -46, hy - 44, 11, '#4a3a33'); circ(ctx, 46, hy - 44, 11, '#4a3a33');
  circ(ctx, 0, hy, 60, BK);
  ctx.beginPath(); ctx.arc(0, hy, 60, PI * 1.1, PI * 1.45); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.stroke();
  // olhos
  const lk = (o.look || 0) * 4, blink = ((t * 0.37 + (o.seed || 0)) % 3.1) < 0.09;
  for (const ex of [-23, 23]) {
    if (blink) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex - 8, hy - 8); ctx.lineTo(ex + 8, hy - 8); ctx.stroke(); }
    else { circ(ctx, ex, hy - 8, 10, '#ffffff'); circ(ctx, ex + lk, hy - 7, 6.5, '#111'); circ(ctx, ex + lk + 2, hy - 10, 2.4, '#fff'); }
  }
  circ(ctx, -36, hy + 12, 9, 'rgba(255,120,140,.35)'); circ(ctx, 36, hy + 12, 9, 'rgba(255,120,140,.35)');
  // focinho
  ell(ctx, 0, hy + 18, 30, 23, BG);
  ell(ctx, 0, hy + 8, 11, 8, '#1a1a1a'); circ(ctx, -3, hy + 5, 2.6, 'rgba(255,255,255,.7)');
  const talk = clamp(o.talk || 0);
  if (talk > .05) {
    ell(ctx, 0, hy + 27, 9, 3 + talk * 7, '#7a1d24'); ell(ctx, 0, hy + 30 + talk * 3, 5, 2 + talk * 2, '#e8636f');
  } else {
    ctx.strokeStyle = '#3a2a22'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(-6, hy + 22, 6, .2, PI - .4); ctx.stroke(); ctx.beginPath(); ctx.arc(6, hy + 22, 6, .4, PI - .2); ctx.stroke();
  }
  ctx.restore();
}

/* Chapeuzinho. o: {t, walk, cape, basket(bool), skirt} */
function girl(ctx, x, y, s, o = {}) {
  const t = o.t || 0, wk = o.walk ? Math.sin(t * 9) : 0, cape = o.cape || '#d62828', capeD = o.capeD || '#a61e1e';
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ell(ctx, 0, 2, 40, 9, 'rgba(0,0,0,.2)');
  ctx.translate(0, -Math.abs(wk) * 3);
  // pernas
  ctx.fillStyle = '#f2c9a0';
  withT(ctx, -10, -46, 1, wk * .4, () => { ctx.fillRect(-5, 0, 10, 42); ell(ctx, 2, 44, 10, 6, '#5b3a29'); });
  withT(ctx, 10, -46, 1, -wk * .4, () => { ctx.fillRect(-5, 0, 10, 42); ell(ctx, 2, 44, 10, 6, '#5b3a29'); });
  // vestido
  ctx.beginPath(); ctx.moveTo(-18, -104); ctx.lineTo(18, -104); ctx.lineTo(32, -44); ctx.lineTo(-32, -44); ctx.closePath();
  ctx.fillStyle = o.skirt || '#3b5bdb'; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillRect(-30, -50, 60, 5);
  // capa
  ctx.beginPath(); ctx.moveTo(-6, -140); ctx.quadraticCurveTo(-40, -100, -40, -56); ctx.lineTo(-20, -60); ctx.lineTo(-14, -108); ctx.closePath();
  ctx.fillStyle = cape; ctx.fill();
  ctx.beginPath(); ctx.moveTo(6, -140); ctx.quadraticCurveTo(40, -100, 38, -58); ctx.lineTo(20, -62); ctx.lineTo(14, -108); ctx.closePath(); ctx.fill();
  // capuz
  circ(ctx, 0, -138, 34, cape);
  // rosto
  circ(ctx, 0, -134, 25, '#f6d2ad');
  ctx.fillStyle = '#7b4a2a'; ctx.beginPath(); ctx.arc(0, -140, 25, PI * 1.05, PI * 1.95); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -138, 34, PI * 1.08, PI * 1.92); ctx.lineWidth = 6; ctx.strokeStyle = capeD; ctx.stroke();
  circ(ctx, -9, -132, 3.4, '#222'); circ(ctx, 9, -132, 3.4, '#222');
  circ(ctx, -15, -124, 4.5, 'rgba(255,110,110,.45)'); circ(ctx, 15, -124, 4.5, 'rgba(255,110,110,.45)');
  ctx.strokeStyle = '#a3402f'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(0, -125, 6, .3, PI - .3); ctx.stroke();
  // laco
  ctx.fillStyle = capeD; ctx.beginPath(); ctx.moveTo(0, -108); ctx.lineTo(-10, -114); ctx.lineTo(-10, -102); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, -108); ctx.lineTo(10, -114); ctx.lineTo(10, -102); ctx.closePath(); ctx.fill();
  // cesta
  if (o.basket !== false) {
    ctx.strokeStyle = '#8a5a2b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(34, -76, 16, PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, -76); ctx.lineTo(54, -76); ctx.lineTo(48, -56); ctx.lineTo(20, -56); ctx.closePath();
    ctx.fillStyle = '#c08a4a'; ctx.fill();
    ctx.fillStyle = '#e03131'; ctx.fillRect(16, -80, 36, 6); ctx.fillStyle = '#fff';
    for (let i = 0; i < 6; i++) ctx.fillRect(16 + i * 6, -80, 3, 3);
  }
  ctx.restore();
}

/* Lobo (de lado, olhando para a direita). o: {t, run, grin} */
function wolf(ctx, x, y, s, o = {}) {
  const t = o.t || 0, run = o.run ? Math.sin(t * 14) : Math.sin(t * 2) * .1;
  const G = '#6c7a89', GD = '#4f5b68', GL = '#c9d1d9';
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ell(ctx, 0, 2, 80, 12, 'rgba(0,0,0,.22)');
  // rabo
  withT(ctx, -72, -82, 1, -.6 + run * .2, () => { ell(ctx, -26, 0, 36, 15, GD); ell(ctx, -50, 0, 12, 10, GL); });
  // pernas
  [[-46, 1], [-26, -1], [34, -1], [52, 1]].forEach(([lx, d]) => withT(ctx, lx, -56, 1, run * .55 * d, () => {
    ctx.fillStyle = GD; rr(ctx, -8, 0, 16, 56, 7); ctx.fill(); ell(ctx, 4, 54, 11, 6, '#3b434d');
  }));
  ell(ctx, 0, -76, 78, 38, G); ell(ctx, 6, -64, 52, 20, GL);
  // cabeca
  ctx.save(); ctx.translate(76, -112);
  ctx.fillStyle = GD; ctx.beginPath(); ctx.moveTo(-26, -18); ctx.lineTo(-18, -62); ctx.lineTo(-2, -24); ctx.fill();
  ctx.beginPath(); ctx.moveTo(4, -22); ctx.lineTo(18, -62); ctx.lineTo(24, -16); ctx.fill();
  circ(ctx, 0, 0, 34, G);
  ell(ctx, 38, 10, 34, 16, G); ell(ctx, 40, 18, 28, 9, GL);
  ell(ctx, 72, 4, 9, 7, '#111');
  // boca com dentes
  ctx.strokeStyle = '#2b2f36'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(20, 22); ctx.quadraticCurveTo(46, 32, 66, 18); ctx.stroke();
  ctx.fillStyle = '#fff'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(28 + i * 9, 24 + i * .5); ctx.lineTo(32 + i * 9, 32); ctx.lineTo(36 + i * 9, 23); ctx.fill(); }
  circ(ctx, 6, -6, 9, '#fff9db'); circ(ctx, 9, -5, 5, '#111');
  ctx.strokeStyle = '#2b2f36'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -20); ctx.lineTo(18, -14); ctx.stroke();
  ctx.restore();
  ctx.restore();
}

/* Lobo de frente, na cama, de touca. o: {eyes 1..2, mouth 0..1, ear 1..2} */
function wolfFace(ctx, x, y, s, o = {}) {
  const G = '#6c7a89', GD = '#4f5b68', GL = '#dfe5ea', eyes = o.eyes || 1, mouth = o.mouth || 0, ear = o.ear || 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // orelhas (crescem)
  ctx.fillStyle = GD;
  ctx.beginPath(); ctx.moveTo(-70, -40); ctx.lineTo(-58 - 26 * ear, -110 * ear); ctx.lineTo(-20, -66); ctx.fill();
  ctx.beginPath(); ctx.moveTo(70, -40); ctx.lineTo(58 + 26 * ear, -110 * ear); ctx.lineTo(20, -66); ctx.fill();
  circ(ctx, 0, 0, 82, G);
  // touca de vovo
  ctx.beginPath(); ctx.arc(0, -18, 84, PI * 1.08, PI * 1.92); ctx.lineTo(60, -50); ctx.quadraticCurveTo(0, -84, -60, -50); ctx.closePath();
  ctx.fillStyle = '#fff0f6'; ctx.fill();
  for (let i = 0; i < 9; i++) circ(ctx, -72 + i * 18, -48 + Math.abs(i - 4) * 3, 9, '#fcc2d7');
  ell(ctx, 0, 40, 46, 34, GL);
  // olhos
  for (const ex of [-30, 30]) { circ(ctx, ex, -12, 14 * eyes, '#fff'); circ(ctx, ex + 2, -10, 8 * eyes, '#111'); circ(ctx, ex + 5, -14, 3 * eyes, '#fff'); }
  // oculos da vovo
  ctx.strokeStyle = '#c8a24a'; ctx.lineWidth = 4;
  circ(ctx, -30, -12, 20 * Math.max(1, eyes * .95), null, '#c8a24a', 4); circ(ctx, 30, -12, 20 * Math.max(1, eyes * .95), null, '#c8a24a', 4);
  ell(ctx, 0, 18, 13, 9, '#111');
  // boca
  if (mouth > .05) {
    ell(ctx, 0, 52, 30 + mouth * 22, 8 + mouth * 26, '#7a1d24');
    ctx.fillStyle = '#fff'; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 13 - 6, 46 - mouth * 22); ctx.lineTo(i * 13, 58 - mouth * 12); ctx.lineTo(i * 13 + 6, 46 - mouth * 22); ctx.fill(); }
  } else { ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 36, 16, .3, PI - .3); ctx.stroke(); }
  ctx.restore();
}

/* Cacador: chapeu verde com pena, colete marrom */
function hunter(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ell(ctx, 0, 2, 40, 9, 'rgba(0,0,0,.2)');
  ctx.fillStyle = '#5c4033'; rr(ctx, -20, -70, 16, 70, 6); ctx.fill(); rr(ctx, 4, -70, 16, 70, 6); ctx.fill();
  ctx.fillStyle = '#2f9e44'; rr(ctx, -30, -150, 60, 86, 18); ctx.fill();
  ctx.fillStyle = '#8b5a2b'; rr(ctx, -30, -150, 22, 86, 10); ctx.fill(); rr(ctx, 8, -150, 22, 86, 10); ctx.fill();
  circ(ctx, 0, -178, 28, '#f1c7a1');
  ell(ctx, 0, -160, 24, 14, '#7a4b2a');
  circ(ctx, -9, -184, 3.4, '#222'); circ(ctx, 9, -184, 3.4, '#222');
  ctx.fillStyle = '#2b8a3e'; rr(ctx, -36, -206, 72, 12, 6); ctx.fill(); rr(ctx, -22, -232, 44, 30, 12); ctx.fill();
  ctx.save(); ctx.translate(18, -222); ctx.rotate(-.6); ell(ctx, 0, -14, 6, 18, '#e03131'); ctx.restore();
  ctx.restore();
}

/* Joao: menino de camisa azul */
function boy(ctx, x, y, s, o = {}) {
  const t = o.t || 0, wk = o.walk ? Math.sin(t * 9) : 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ell(ctx, 0, 2, 36, 8, 'rgba(0,0,0,.2)');
  withT(ctx, -9, -50, 1, wk * .4, () => { ctx.fillStyle = '#2b8a3e'; rr(ctx, -7, 0, 14, 48, 5); ctx.fill(); ell(ctx, 3, 48, 10, 6, '#5b3a29'); });
  withT(ctx, 9, -50, 1, -wk * .4, () => { ctx.fillStyle = '#2b8a3e'; rr(ctx, -7, 0, 14, 48, 5); ctx.fill(); ell(ctx, 3, 48, 10, 6, '#5b3a29'); });
  ctx.fillStyle = '#4dabf7'; rr(ctx, -24, -112, 48, 66, 14); ctx.fill();
  ctx.fillStyle = '#a5672f'; ctx.fillRect(-24, -60, 48, 8);
  ctx.save(); ctx.translate(-22, -104); ctx.rotate(.3 + (o.armUp ? -2.6 : 0)); ctx.fillStyle = '#4dabf7'; rr(ctx, -7, 0, 14, 40, 7); ctx.fill(); circ(ctx, 0, 42, 7, '#f1c7a1'); ctx.restore();
  ctx.save(); ctx.translate(22, -104); ctx.rotate(-.3 - (o.armUp2 ? 2.6 : 0)); ctx.fillStyle = '#4dabf7'; rr(ctx, -7, 0, 14, 40, 7); ctx.fill(); circ(ctx, 0, 42, 7, '#f1c7a1'); ctx.restore();
  circ(ctx, 0, -138, 27, '#f6d2ad');
  ctx.fillStyle = '#7b4a2a'; ctx.beginPath(); ctx.arc(0, -144, 28, PI * 1.02, PI * 1.98); ctx.fill();
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-22 + i * 10, -150); ctx.lineTo(-17 + i * 10, -138); ctx.lineTo(-12 + i * 10, -150); ctx.fill(); }
  circ(ctx, -9, -136, 3.4, '#222'); circ(ctx, 9, -136, 3.4, '#222');
  ctx.strokeStyle = '#a3402f'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(0, -128, 6, .3, PI - .3); ctx.stroke();
  circ(ctx, -15, -127, 4, 'rgba(255,110,110,.4)'); circ(ctx, 15, -127, 4, 'rgba(255,110,110,.4)');
  ctx.restore();
}

/* Gigante: grande, barba, sobrancelha brava. Origem nos pes. */
function giant(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  ctx.fillStyle = '#5c3d2e'; rr(ctx, -60, -170, 46, 170, 14); ctx.fill(); rr(ctx, 14, -170, 46, 170, 14); ctx.fill();
  ell(ctx, -40, -6, 34, 14, '#3b2a20'); ell(ctx, 40, -6, 34, 14, '#3b2a20');
  ctx.fillStyle = '#9c36b5'; rr(ctx, -90, -380, 180, 230, 50); ctx.fill();
  ctx.fillStyle = '#7b2a90'; ctx.fillRect(-90, -200, 180, 22);
  ctx.fillStyle = '#9c36b5'; rr(ctx, -128, -370, 40, 150, 20); ctx.fill(); rr(ctx, 88, -370, 40, 150, 20); ctx.fill();
  circ(ctx, -108, -214, 24, '#e8b08a'); circ(ctx, 108, -214, 24, '#e8b08a');
  circ(ctx, 0, -450, 78, '#e8b08a');
  ctx.fillStyle = '#7a4b2a'; ctx.beginPath(); ctx.moveTo(-70, -440); ctx.quadraticCurveTo(0, -330, 70, -440); ctx.quadraticCurveTo(0, -400, -70, -440); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -470, 80, PI * 1.05, PI * 1.95); ctx.fill();
  circ(ctx, -28, -462, 10, '#fff'); circ(ctx, 28, -462, 10, '#fff'); circ(ctx, -26, -460, 6, '#111'); circ(ctx, 26, -460, 6, '#111');
  ctx.strokeStyle = '#3b2a20'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-46, -490); ctx.lineTo(-12, -478); ctx.stroke(); ctx.beginPath(); ctx.moveTo(46, -490); ctx.lineTo(12, -478); ctx.stroke();
  ell(ctx, 0, -440, 14, 11, '#d4886a');
  ell(ctx, 0, -405, 22, o.shout ? 16 : 5, '#5a1a1a');
  ctx.restore();
}

/* Galinha dourada, opcional ovo de ouro */
function hen(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ctx.strokeStyle = '#e67700'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-8, -18); ctx.lineTo(-10, 0); ctx.moveTo(8, -18); ctx.lineTo(10, 0); ctx.stroke();
  ell(ctx, 0, -40, 40, 30, '#f59f00'); ell(ctx, -30, -50, 18, 22, '#e67700', -.5);
  ell(ctx, 4, -36, 22, 14, '#ffd43b', .2);
  circ(ctx, 30, -70, 18, '#f59f00');
  ctx.fillStyle = '#e03131'; circ(ctx, 26, -90, 7, '#e03131'); circ(ctx, 34, -91, 7, '#e03131'); ell(ctx, 40, -60, 5, 8, '#e03131');
  ctx.fillStyle = '#f76707'; ctx.beginPath(); ctx.moveTo(46, -72); ctx.lineTo(60, -68); ctx.lineTo(46, -64); ctx.fill();
  circ(ctx, 34, -74, 3.4, '#111');
  if (o.egg) { ell(ctx, -6, -6, 15, 19, '#fcc419'); ell(ctx, -10, -12, 5, 7, 'rgba(255,255,255,.7)'); }
  ctx.restore();
}

/* Vaca */
function cow(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ell(ctx, 0, 2, 70, 10, 'rgba(0,0,0,.18)');
  ctx.fillStyle = '#f1f3f5'; [[-44], [-24], [28], [46]].forEach(([lx]) => { rr(ctx, lx - 7, -50, 14, 50, 5); ctx.fill(); });
  ell(ctx, 0, -68, 66, 36, '#f8f9fa');
  ell(ctx, -20, -76, 18, 14, '#343a40'); ell(ctx, 22, -60, 14, 11, '#343a40'); ell(ctx, -42, -56, 9, 8, '#343a40');
  ell(ctx, 0, -38, 16, 10, '#ffc9c9');
  circ(ctx, 70, -96, 28, '#f8f9fa'); ell(ctx, 84, -84, 20, 14, '#ffc9c9');
  ell(ctx, 52, -118, 12, 6, '#f8f9fa', -.5); ell(ctx, 90, -120, 12, 6, '#f8f9fa', .5);
  ctx.fillStyle = '#e9c46a'; ctx.beginPath(); ctx.moveTo(60, -120); ctx.lineTo(56, -136); ctx.lineTo(66, -122); ctx.fill();
  ctx.beginPath(); ctx.moveTo(80, -122); ctx.lineTo(86, -138); ctx.lineTo(88, -120); ctx.fill();
  circ(ctx, 64, -102, 4, '#111'); circ(ctx, 80, -102, 4, '#111');
  ctx.restore();
}
