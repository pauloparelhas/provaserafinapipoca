/* props.js — objetos e cenarios (contos, palco, H, J/G, GU). */

function openBook(ctx, x, y, w, h, o = {}) {
  ctx.save(); shadowOn(ctx, 30, 14, .35);
  rr(ctx, x - w / 2 - 14, y - h / 2 - 10, w + 28, h + 26, 18); ctx.fillStyle = o.cover || '#8c2f39'; ctx.fill(); shadowOff(ctx);
  for (const side of [-1, 1]) {
    ctx.beginPath(); const x0 = x, x1 = x + side * w / 2;
    ctx.moveTo(x0, y - h / 2 + 8); ctx.quadraticCurveTo((x0 + x1) / 2, y - h / 2 - 8, x1, y - h / 2); ctx.lineTo(x1, y + h / 2);
    ctx.quadraticCurveTo((x0 + x1) / 2, y + h / 2 - 12, x0, y + h / 2 + 6); ctx.closePath();
    ctx.fillStyle = o.page || '#fffaf0'; ctx.fill();
  }
  ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(x - 3, y - h / 2 + 6, 6, h);
  ctx.restore();
}
function castle(ctx, x, y, s, o = {}) {
  const c = o.col || '#c5b8e8', d = o.dark || '#9d8fcf';
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = c; ctx.fillRect(-120, -160, 240, 160);
  for (let i = 0; i < 6; i++) ctx.fillRect(-120 + i * 44, -180, 26, 22);
  for (const tx of [-140, 140]) {
    ctx.fillStyle = d; ctx.fillRect(tx - 34, -250, 68, 250);
    ctx.fillStyle = '#e8590c'; ctx.beginPath(); ctx.moveTo(tx - 44, -250); ctx.lineTo(tx, -330); ctx.lineTo(tx + 44, -250); ctx.fill();
    ctx.fillStyle = '#4c3a8c'; rr(ctx, tx - 10, -210, 20, 34, 10); ctx.fill();
    ctx.strokeStyle = '#555'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx, -330); ctx.lineTo(tx, -360); ctx.stroke();
    ctx.fillStyle = '#e03131'; ctx.beginPath(); ctx.moveTo(tx, -360); ctx.lineTo(tx + 26, -352); ctx.lineTo(tx, -344); ctx.fill();
  }
  ctx.fillStyle = '#5f3dc4'; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(-34, -60); ctx.arc(0, -60, 34, PI, 0); ctx.lineTo(34, 0); ctx.fill();
  ctx.fillStyle = '#4c3a8c'; rr(ctx, -80, -120, 26, 36, 13); ctx.fill(); rr(ctx, 54, -120, 26, 36, 13); ctx.fill();
  ctx.restore();
}
function cottage(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#ffe8cc'; ctx.fillRect(-90, -110, 180, 110);
  ctx.fillStyle = '#c92a2a'; ctx.beginPath(); ctx.moveTo(-112, -106); ctx.lineTo(0, -190); ctx.lineTo(112, -106); ctx.fill();
  ctx.fillStyle = '#8d5a35'; rr(ctx, -20, -64, 40, 64, 6); ctx.fill(); circ(ctx, 10, -32, 3, '#ffd43b');
  ctx.fillStyle = '#74c0fc'; rr(ctx, -72, -84, 36, 30, 4); ctx.fill(); rr(ctx, 36, -84, 36, 30, 4); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(-72, -84, 36, 30); ctx.strokeRect(36, -84, 36, 30);
  ctx.fillStyle = '#868e96'; ctx.fillRect(50, -176, 22, 44);
  ctx.restore();
}
function bed(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#8d5a35'; rr(ctx, -230, -170, 30, 190, 10); ctx.fill(); rr(ctx, 200, -110, 30, 130, 10); ctx.fill();
  ctx.fillStyle = '#fff'; rr(ctx, -210, -60, 420, 50, 16); ctx.fill();
  ctx.fillStyle = '#e599f7'; rr(ctx, -150, -70, 360, 80, 22); ctx.fill();
  ctx.fillStyle = '#fff'; for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) circ(ctx, -125 + i * 44 + j * 22, -46 + j * 30, 6, 'rgba(255,255,255,.55)');
  ctx.restore();
}
function beanstalk(ctx, x, y, hgt, t) {
  if (hgt <= 0) return;
  ctx.save(); ctx.lineCap = 'round';
  const pts = []; for (let k = 0; k <= 60; k++) { const yy = y - hgt * k / 60; pts.push([x + Math.sin(k * .35 + t * .8) * 22, yy]); }
  for (const [lw, col] of [[34, '#2b8a3e'], [20, '#40c057']]) {
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.stroke();
  }
  for (let k = 3; k < 60; k += 4) {
    const [a, b] = pts[k], side = k % 8 < 4 ? 1 : -1;
    ctx.save(); ctx.translate(a, b); ctx.rotate(side * (.7 + Math.sin(t * 2 + k) * .1));
    ell(ctx, side * 34, 0, 34, 15, k % 3 ? '#51cf66' : '#37b24d'); ctx.restore();
  }
  ctx.restore();
}
function bean(ctx, x, y, s, glow = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glow > 0) { ctx.globalAlpha = .35 * glow; circ(ctx, 0, 0, 34, '#ffe066'); ctx.globalAlpha = 1; }
  ell(ctx, 0, 0, 20, 13, '#7048e8', .3); ell(ctx, -5, -4, 6, 3, 'rgba(255,255,255,.6)', .3);
  ctx.restore();
}
function axe(ctx, x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = '#a0522d'; rr(ctx, -7, -10, 14, 120, 6); ctx.fill();
  ctx.fillStyle = '#adb5bd'; ctx.beginPath(); ctx.moveTo(4, -6); ctx.lineTo(54, -30); ctx.quadraticCurveTo(66, 4, 54, 34); ctx.lineTo(4, 18); ctx.fill();
  ctx.restore();
}
function mask(ctx, x, y, s, happy, col) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, -50); ctx.quadraticCurveTo(0, -80, 60, -50); ctx.quadraticCurveTo(66, 40, 0, 74); ctx.quadraticCurveTo(-66, 40, -60, -50);
  ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.stroke();
  ctx.fillStyle = '#2b2b40';
  for (const ex of [-24, 24]) { ctx.beginPath(); ctx.ellipse(ex, -14, 14, happy ? 9 : 11, 0, happy ? PI : 0, happy ? TAU : PI); ctx.fill(); }
  ctx.beginPath();
  if (happy) { ctx.moveTo(-30, 22); ctx.quadraticCurveTo(0, 62, 30, 22); ctx.quadraticCurveTo(0, 36, -30, 22); }
  else { ctx.moveTo(-26, 46); ctx.quadraticCurveTo(0, 14, 26, 46); ctx.quadraticCurveTo(0, 34, -26, 46); }
  ctx.fill();
  ctx.restore();
}
function curtains(ctx, k) {
  const w = lerp(W / 2 + 20, 72, easeInOut(k));
  for (const side of [0, 1]) {
    ctx.save(); if (side) { ctx.translate(W, 0); ctx.scale(-1, 1); }
    ctx.fillStyle = grad(ctx, 0, H, ['#c92a2a', '#7b1d1d']); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, 0);
    ctx.quadraticCurveTo(w - 40, H * .5, w * .6, H); ctx.lineTo(0, H); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 6;
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(w * i / 5, 0); ctx.quadraticCurveTo(w * i / 5 - 20, H * .5, w * .6 * i / 5, H); ctx.stroke(); }
    ctx.restore();
  }
  ctx.fillStyle = grad(ctx, 0, 70, ['#a61e1e', '#7b1d1d']); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 50);
  for (let i = 10; i >= 0; i--) ctx.quadraticCurveTo(W * (i + .5) / 10, 90, W * i / 10, 50);
  ctx.fill();
}
function helicopter(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 1.5) * .05);
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-60, 70); ctx.lineTo(60, 70); ctx.moveTo(-30, 50); ctx.lineTo(-36, 70); ctx.moveTo(30, 50); ctx.lineTo(36, 70); ctx.stroke();
  ctx.fillStyle = '#f03e3e'; ctx.fillRect(40, -10, 110, 20); circ(ctx, 150, 0, 20, '#f03e3e');
  const rs = Math.sin(t * 40); ctx.fillStyle = 'rgba(73,80,87,.8)'; ell(ctx, 150, 0, 6, 34 * Math.abs(rs) + 4, 'rgba(73,80,87,.8)');
  ell(ctx, 0, 0, 80, 56, '#f03e3e'); ell(ctx, -26, -8, 38, 30, '#a5d8ff'); ell(ctx, -34, -16, 12, 8, 'rgba(255,255,255,.7)');
  ctx.fillStyle = '#495057'; ctx.fillRect(-6, -76, 12, 22);
  ell(ctx, 0, -78, 150 * Math.abs(Math.cos(t * 30)) + 20, 7, '#343a40');
  ctx.restore();
}
function hippo(ctx, x, y, s, t) {
  const C = '#9775fa', D = '#7950f2';
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 2, 120, 14, 'rgba(0,0,0,.18)');
  ctx.fillStyle = D; [-80, -40, 40, 80].forEach(lx => { rr(ctx, lx - 16, -50, 32, 52, 12); ctx.fill(); });
  ell(ctx, 0, -86, 120, 66, C);
  ctx.save(); ctx.translate(110, -110); ctx.rotate(Math.sin(t * 1.6) * .06);
  ell(ctx, 0, 0, 60, 52, C); ell(ctx, 50, 22, 50, 40, '#b197fc');
  circ(ctx, -10, -50, 14, D); circ(ctx, 30, -50, 14, D);
  circ(ctx, 6, -24, 10, '#fff'); circ(ctx, 8, -22, 6, '#111');
  ell(ctx, 62, 8, 6, 4, '#5f3dc4'); ell(ctx, 82, 12, 6, 4, '#5f3dc4');
  ctx.strokeStyle = '#5f3dc4'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(60, 32, 24, .2, PI - .4); ctx.stroke();
  circ(ctx, 30, 28, 9, 'rgba(255,120,160,.5)');
  ctx.restore(); ctx.restore();
}
function croc(ctx, x, y, s, t) {
  const C = '#40c057', D = '#2f9e44';
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 2, 150, 12, 'rgba(0,0,0,.18)');
  ctx.fillStyle = D; [-70, -30, 40, 80].forEach(lx => { rr(ctx, lx - 12, -30, 24, 32, 9); ctx.fill(); });
  ctx.beginPath(); ctx.moveTo(-200, -30); ctx.quadraticCurveTo(-120, -80, 0, -70); ctx.lineTo(0, -20); ctx.quadraticCurveTo(-120, -20, -200, -30); ctx.fillStyle = C; ctx.fill();
  ell(ctx, 10, -48, 100, 34, C);
  for (let i = 0; i < 7; i++) { ctx.fillStyle = D; ctx.beginPath(); ctx.moveTo(-120 + i * 30, -70 + i * .5); ctx.lineTo(-108 + i * 30, -90); ctx.lineTo(-96 + i * 30, -72); ctx.fill(); }
  const jaw = (Math.sin(t * 3) + 1) * .08;
  ctx.save(); ctx.translate(100, -50); ctx.rotate(-jaw); rr(ctx, 0, -26, 120, 26, 12); ctx.fillStyle = C; ctx.fill(); ctx.restore();
  ctx.save(); ctx.translate(100, -48); ctx.rotate(jaw); rr(ctx, 0, 0, 116, 20, 10); ctx.fillStyle = D; ctx.fill(); ctx.restore();
  ctx.fillStyle = '#fff'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(110 + i * 18, -50); ctx.lineTo(116 + i * 18, -40); ctx.lineTo(122 + i * 18, -50); ctx.fill(); }
  circ(ctx, 100, -82, 16, C); circ(ctx, 102, -84, 10, '#fff'); circ(ctx, 105, -84, 6, '#111');
  ctx.restore();
}
function giraffe(ctx, x, y, s, t) {
  const C = '#fcc419', SP = '#e8590c';
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 2, 70, 10, 'rgba(0,0,0,.18)');
  ctx.fillStyle = C; [-44, -20, 22, 46].forEach(lx => { ctx.fillRect(lx - 7, -110, 14, 110); });
  ell(ctx, 0, -126, 70, 38, C);
  ctx.save(); ctx.translate(46, -140); ctx.rotate(-.25 + Math.sin(t * 1.3) * .04);
  ctx.fillStyle = C; ctx.fillRect(-14, -190, 28, 200);
  [[0, -40], [-4, -100], [4, -150]].forEach(([a, b]) => ell(ctx, a, b, 9, 12, SP));
  ctx.translate(0, -200);
  ell(ctx, 18, 0, 40, 24, C); ell(ctx, 48, 6, 16, 14, '#ffe8a3');
  ctx.fillStyle = '#c2410c'; ctx.fillRect(-4, -40, 6, 26); ctx.fillRect(14, -42, 6, 26); circ(ctx, -1, -42, 6, '#c2410c'); circ(ctx, 17, -44, 6, '#c2410c');
  circ(ctx, 16, -6, 6, '#111'); circ(ctx, 18, -8, 2, '#fff');
  ctx.restore();
  [[-30, -130], [10, -140], [-2, -112], [30, -118]].forEach(([a, b]) => ell(ctx, a, b, 12, 9, SP));
  ctx.restore();
}
function guitar(ctx, x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = '#5c3d2e'; ctx.fillRect(-8, -200, 16, 150);
  ctx.fillStyle = '#343a40'; rr(ctx, -16, -236, 32, 42, 8); ctx.fill();
  circ(ctx, 0, 0, 64, '#e8590c'); circ(ctx, 0, -60, 48, '#e8590c');
  circ(ctx, 0, -10, 18, '#3b2a20'); ctx.fillStyle = '#3b2a20'; ctx.fillRect(-26, 30, 52, 10);
  ctx.strokeStyle = '#f1f3f5'; ctx.lineWidth = 1.5; for (let i = -1.5; i <= 1.5; i++) { ctx.beginPath(); ctx.moveTo(i * 4, -230); ctx.lineTo(i * 4, 34); ctx.stroke(); }
  ctx.restore();
}
function rocket(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const fl = 1 + Math.sin(t * 30) * .15;
  ell(ctx, 0, 70, 20, 50 * fl, '#ff922b'); ell(ctx, 0, 60, 11, 30 * fl, '#ffe066');
  ctx.fillStyle = '#e03131'; ctx.beginPath(); ctx.moveTo(-34, 30); ctx.lineTo(-60, 70); ctx.lineTo(-34, 60); ctx.fill();
  ctx.beginPath(); ctx.moveTo(34, 30); ctx.lineTo(60, 70); ctx.lineTo(34, 60); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, -110); ctx.quadraticCurveTo(46, -50, 36, 50); ctx.lineTo(-36, 50); ctx.quadraticCurveTo(-46, -50, 0, -110);
  ctx.fillStyle = '#f1f3f5'; ctx.fill();
  ctx.fillStyle = '#e03131'; ctx.beginPath(); ctx.moveTo(0, -110); ctx.quadraticCurveTo(26, -80, 30, -60); ctx.lineTo(-30, -60); ctx.quadraticCurveTo(-26, -80, 0, -110); ctx.fill();
  circ(ctx, 0, -20, 18, '#4dabf7', '#495057', 5); circ(ctx, -5, -25, 5, 'rgba(255,255,255,.8)');
  ctx.restore();
}
