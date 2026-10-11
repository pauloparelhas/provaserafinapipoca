/* props2.js — objetos (invencoes, CA/QUE, digrafos, plural, paródia). */

function wheel(ctx, x, y, r, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  circ(ctx, 0, 0, r, '#8d5a35'); circ(ctx, 0, 0, r * .78, '#d9a066');
  ctx.strokeStyle = '#8d5a35'; ctx.lineWidth = r * .1;
  for (let i = 0; i < 6; i++) { const a = i * PI / 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r * .8, Math.sin(a) * r * .8); ctx.stroke(); }
  circ(ctx, 0, 0, r * .18, '#5c3d2e');
  ctx.restore();
}
function bulb(ctx, x, y, s, glow) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glow > 0) {
    ctx.globalAlpha = glow * .5; circ(ctx, 0, -20, 90, '#fff3bf'); ctx.globalAlpha = glow;
    ctx.strokeStyle = '#ffd43b'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) { const a = -PI / 2 + (i - 3.5) * .38; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 70, -20 + Math.sin(a) * 70); ctx.lineTo(Math.cos(a) * 92, -20 + Math.sin(a) * 92); ctx.stroke(); }
    ctx.globalAlpha = 1;
  }
  circ(ctx, 0, -20, 50, glow > .3 ? '#ffe066' : '#e9ecef');
  ctx.fillStyle = glow > .3 ? '#ffe066' : '#e9ecef'; ctx.beginPath(); ctx.moveTo(-26, 20); ctx.lineTo(26, 20); ctx.lineTo(18, 40); ctx.lineTo(-18, 40); ctx.fill();
  ctx.fillStyle = '#868e96'; for (let i = 0; i < 3; i++) rr(ctx, -20, 40 + i * 11, 40, 9, 4), ctx.fill();
  ctx.strokeStyle = '#e8590c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-10, 20); ctx.lineTo(-6, -20); ctx.lineTo(0, -8); ctx.lineTo(6, -20); ctx.lineTo(10, 20); ctx.stroke();
  circ(ctx, -18, -40, 9, 'rgba(255,255,255,.7)');
  ctx.restore();
}
function phone(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#e03131'; rr(ctx, -70, -20, 140, 80, 20); ctx.fill();
  ctx.fillStyle = '#c92a2a'; rr(ctx, -80, -60, 160, 34, 17); ctx.fill();
  ell(ctx, -70, -44, 22, 26, '#c92a2a'); ell(ctx, 70, -44, 22, 26, '#c92a2a');
  circ(ctx, 0, 20, 30, '#f8f9fa'); circ(ctx, 0, 20, 12, '#e03131');
  for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * TAU / 12; circ(ctx, Math.cos(a) * 21, 20 + Math.sin(a) * 21, 4, '#adb5bd'); }
  ctx.restore();
}
/* 14-Bis: pato-caixa, asas de caixa atras, "canard" na frente */
function plane14bis(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 2) * .04);
  const pano = '#fff9db', var_ = '#8d5a35';
  ctx.strokeStyle = var_; ctx.lineWidth = 4;
  for (const cx0 of [-90, 30]) {
    ctx.fillStyle = pano; ctx.fillRect(cx0, -40, 60, 16); ctx.fillRect(cx0, 24, 60, 16);
    ctx.strokeRect(cx0, -40, 60, 16); ctx.strokeRect(cx0, 24, 60, 16);
    for (let i = 0; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(cx0 + i * 30, -24); ctx.lineTo(cx0 + i * 30, 24); ctx.stroke(); }
  }
  ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.stroke();
  ctx.fillStyle = pano; ctx.fillRect(-30, -6, 60, 12); ctx.strokeRect(-30, -6, 60, 12);
  ctx.fillStyle = pano; rr(ctx, 120, -22, 46, 44, 4); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(90, 0); ctx.lineTo(120, 0); ctx.stroke();
  ctx.fillStyle = '#495057'; ell(ctx, -98, 0, 5, 28 * Math.abs(Math.sin(t * 35)) + 3, 'rgba(73,80,87,.8)');
  circ(ctx, 0, -14, 8, '#f1c7a1'); ctx.fillStyle = '#343a40'; ctx.fillRect(-9, -26, 18, 6);
  ctx.restore();
}
function fire(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#8d5a35'; ctx.save(); ctx.rotate(.3); rr(ctx, -60, -8, 120, 16, 8); ctx.fill(); ctx.restore();
  ctx.save(); ctx.rotate(-.3); rr(ctx, -60, -8, 120, 16, 8); ctx.fill(); ctx.restore();
  const f = (h, w, col, ph) => { const hh = h * (1 + Math.sin(t * 9 + ph) * .1); ctx.beginPath(); ctx.moveTo(-w, -4); ctx.quadraticCurveTo(-w, -hh * .5, 0, -hh); ctx.quadraticCurveTo(w, -hh * .5, w, -4); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
  f(130, 46, '#f03e3e', 0); f(100, 34, '#ff922b', 1.3); f(64, 20, '#ffe066', 2.1);
  ctx.restore();
}
function cheese(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-80, 30); ctx.lineTo(80, 30); ctx.lineTo(80, -20); ctx.lineTo(-60, -50); ctx.closePath(); ctx.fillStyle = '#ffd43b'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-60, -50); ctx.lineTo(80, -20); ctx.lineTo(80, -34); ctx.lineTo(-40, -62); ctx.closePath(); ctx.fillStyle = '#fff3bf'; ctx.fill();
  [[-30, 0, 10], [20, 10, 13], [54, -6, 7], [-56, 18, 6]].forEach(([a, b, r]) => circ(ctx, a, b, r, '#fab005'));
  ctx.restore();
}
function squirrel(ctx, x, y, s, t) {
  const C = '#d9773b', D = '#b35c24';
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.translate(-40, -50); ctx.rotate(Math.sin(t * 2.5) * .08);
  ctx.beginPath(); ctx.moveTo(0, 30); ctx.quadraticCurveTo(-70, 10, -40, -80); ctx.quadraticCurveTo(-10, -120, 20, -90); ctx.quadraticCurveTo(-20, -50, 10, 20); ctx.fillStyle = D; ctx.fill(); ctx.restore();
  ell(ctx, 0, -40, 34, 40, C); ell(ctx, 6, -32, 18, 26, '#ffe8cc');
  circ(ctx, 14, -90, 28, C); ctx.fillStyle = C; ctx.beginPath(); ctx.moveTo(0, -110); ctx.lineTo(4, -132); ctx.lineTo(16, -112); ctx.fill();
  ell(ctx, 34, -84, 12, 9, '#ffe8cc'); circ(ctx, 44, -86, 4, '#111'); circ(ctx, 22, -96, 5, '#111'); circ(ctx, 23.5, -97.5, 1.7, '#fff');
  ell(ctx, 24, -54, 10, 12, '#8d5a35'); ctx.fillStyle = '#5c3d2e'; ctx.fillRect(18, -66, 12, 5);
  ell(ctx, -10, -2, 14, 6, D); ell(ctx, 18, -2, 14, 6, D);
  ctx.restore();
}
function key(ctx, x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  circ(ctx, -50, 0, 32, '#fcc419'); circ(ctx, -50, 0, 14, 'rgba(0,0,0,0)'); ctx.globalCompositeOperation = 'destination-out'; circ(ctx, -50, 0, 13, '#000'); ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#fcc419'; ctx.fillRect(-22, -9, 100, 18); ctx.fillRect(50, 9, 12, 20); ctx.fillRect(68, 9, 10, 14);
  ctx.restore();
}
function nest(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, -10, 40, 16, '#e9ecef'); ell(ctx, -18, -18, 15, 19, '#a5d8ff'); ell(ctx, 16, -18, 15, 19, '#e7f5ff'); ell(ctx, 0, -14, 15, 19, '#d0ebff');
  ctx.beginPath(); ctx.ellipse(0, 0, 84, 34, 0, 0, PI); ctx.fillStyle = '#a9743b'; ctx.fill();
  ctx.strokeStyle = '#7c522a'; ctx.lineWidth = 4;
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-80 + i * 18, 4 + (i % 2) * 6); ctx.quadraticCurveTo(-60 + i * 18, 26, -40 + i * 18, 6); ctx.stroke(); }
  ctx.restore();
}
function leafIcon(ctx, x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, 60); ctx.quadraticCurveTo(-70, 0, 0, -70); ctx.quadraticCurveTo(70, 0, 0, 60); ctx.fillStyle = '#51cf66'; ctx.fill();
  ctx.strokeStyle = '#2b8a3e'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 80); ctx.lineTo(0, -58); ctx.stroke();
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0, 30 - i * 24); ctx.lineTo(-26, 14 - i * 24); ctx.moveTo(0, 30 - i * 24); ctx.lineTo(26, 14 - i * 24); ctx.stroke(); }
  ctx.restore();
}
function balloon(ctx, x, y, s, col, t, ph = 0) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 2 + ph) * 6); ctx.scale(s, s); ctx.rotate(Math.sin(t * 1.4 + ph) * .06);
  ctx.strokeStyle = 'rgba(80,80,80,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 48); ctx.quadraticCurveTo(10, 90, -4, 130); ctx.stroke();
  ell(ctx, 0, 0, 36, 46, col); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-6, 52); ctx.lineTo(6, 52); ctx.lineTo(0, 44); ctx.fill();
  ell(ctx, -12, -16, 8, 13, 'rgba(255,255,255,.55)', -.4);
  ctx.restore();
}
function bike(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const wx of [-50, 50]) {
    circ(ctx, wx, -30, 30, null, '#343a40', 6);
    ctx.save(); ctx.translate(wx, -30); ctx.rotate(t * 6); ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) { ctx.rotate(PI / 4); ctx.beginPath(); ctx.moveTo(-28, 0); ctx.lineTo(28, 0); ctx.stroke(); } ctx.restore();
  }
  ctx.strokeStyle = '#2f9e44'; ctx.lineWidth = 7; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-50, -30); ctx.lineTo(-10, -30); ctx.lineTo(34, -76); ctx.lineTo(50, -30); ctx.moveTo(-10, -30); ctx.lineTo(-24, -76); ctx.lineTo(34, -76); ctx.stroke();
  ctx.fillStyle = '#343a40'; rr(ctx, -38, -84, 30, 9, 4); ctx.fill();
  ctx.beginPath(); ctx.moveTo(34, -76); ctx.lineTo(30, -98); ctx.lineTo(44, -100); ctx.stroke();
  ctx.restore();
}
function pizza(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, 0, 0, 40, '#e9a24b'); circ(ctx, 0, 0, 33, '#ffd43b');
  [[-12, -10], [14, -14], [4, 12], [-16, 14], [18, 10]].forEach(([a, b]) => circ(ctx, a, b, 6, '#e03131'));
  ctx.restore();
}
function cup(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, -60); ctx.lineTo(40, -60); ctx.lineTo(30, 40); ctx.lineTo(-30, 40); ctx.closePath();
  ctx.fillStyle = 'rgba(165,216,255,.55)'; ctx.fill(); ctx.strokeStyle = '#74c0fc'; ctx.lineWidth = 5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-36, -20); ctx.lineTo(36, -20); ctx.lineTo(30, 40); ctx.lineTo(-30, 40); ctx.closePath(); ctx.fillStyle = 'rgba(77,171,247,.6)'; ctx.fill();
  ctx.restore();
}
function cube(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#ff6b6b'; ctx.fillRect(-40, -30, 70, 70);
  ctx.fillStyle = '#ffa8a8'; ctx.beginPath(); ctx.moveTo(-40, -30); ctx.lineTo(-14, -56); ctx.lineTo(56, -56); ctx.lineTo(30, -30); ctx.fill();
  ctx.fillStyle = '#e03131'; ctx.beginPath(); ctx.moveTo(30, -30); ctx.lineTo(56, -56); ctx.lineTo(56, 14); ctx.lineTo(30, 40); ctx.fill();
  ctx.restore();
}
function smallHouse(ctx, x, y, s, col = '#ffd8a8', roof = '#e8590c') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = col; ctx.fillRect(-40, -50, 80, 50);
  ctx.fillStyle = roof; ctx.beginPath(); ctx.moveTo(-52, -48); ctx.lineTo(0, -92); ctx.lineTo(52, -48); ctx.fill();
  ctx.fillStyle = '#8d5a35'; ctx.fillRect(-10, -30, 20, 30); ctx.fillStyle = '#74c0fc'; ctx.fillRect(16, -38, 16, 14);
  ctx.restore();
}
function rainCloud(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#4dabf7'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) { const yy = ((t * 120 + i * 37) % 80); ctx.beginPath(); ctx.moveTo(-50 + i * 20, 20 + yy); ctx.lineTo(-56 + i * 20, 36 + yy); ctx.stroke(); }
  cloud(ctx, -50, 0, .8, '#ced4da');
  ctx.restore();
}
function hat(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 0, 80, 20, '#e8590c'); ctx.fillStyle = '#e8590c'; rr(ctx, -42, -60, 84, 62, 22); ctx.fill();
  ctx.fillStyle = '#5f3dc4'; ctx.fillRect(-42, -18, 84, 14);
  ctx.restore();
}
