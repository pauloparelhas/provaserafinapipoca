/* props3.js — objetos novos do roteiro v2 (genero, elementos, parodia, dicionario, invencoes)
   e ajudantes de layout. Tudo desenhado por codigo. */

/* texto em varias linhas, quebrando por largura; devolve altura usada */
function txtWrap(ctx, s, x, y, maxW, size, color, align = 'center', weight = 800, lh = 1.22) {
  ctx.font = `${weight} ${size}px ${FONT}`;
  const words = s.split(' '), lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur);
  const y0 = y - (lines.length - 1) * size * lh / 2;
  lines.forEach((l, i) => txt(ctx, l, x, y0 + i * size * lh, size, color, align, weight));
  return lines.length * size * lh;
}
/* painel branco arredondado com sombra */
function panel(ctx, x, y, w, h, bg = '#ffffff', r = 24, border) {
  shadowOn(ctx, 18, 6, .22); rr(ctx, x, y, w, h, r); ctx.fillStyle = bg; ctx.fill(); shadowOff(ctx);
  if (border) { ctx.lineWidth = 4; ctx.strokeStyle = border; ctx.stroke(); }
}
/* duas palavras ligadas por um "=" que se forma (sinonimos) */
function synLink(ctx, a, b, cx, y, size, ka, kb, col = '#2f9e44') {
  const wa = richWidth(ctx, a, size) + size * .9, wb = richWidth(ctx, b, size) + size * .9, gap = 70;
  const x0 = cx - (wa + wb + gap) / 2, xa = x0 + wa / 2, xb = x0 + wa + gap + wb / 2;
  wordCard(ctx, a, xa, y, size, ka, { color: '#23314f' });
  if (kb > 0) {
    const g = easeOut(kb), xl = x0 + wa + 4, xr = x0 + wa + gap - 4;
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(xl, y - 7); ctx.lineTo(lerp(xl, xr, g), y - 7); ctx.moveTo(xr, y + 7); ctx.lineTo(lerp(xr, xl, g), y + 7); ctx.stroke(); ctx.restore();
  }
  wordCard(ctx, b, xb, y, size, kb, { color: col });
}
function musicNote(ctx, x, y, s, col, dbl) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 0, 14, 10, col, -.4); ctx.fillStyle = col; ctx.fillRect(10, -52, 5, 52);
  if (dbl) { ell(ctx, 40, -8, 14, 10, col, -.4); ctx.fillRect(50, -60, 5, 52); ctx.beginPath(); ctx.moveTo(10, -52); ctx.lineTo(55, -60); ctx.lineTo(55, -48); ctx.lineTo(10, -40); ctx.fill(); }
  else { ctx.beginPath(); ctx.moveTo(15, -52); ctx.quadraticCurveTo(36, -40, 28, -18); ctx.quadraticCurveTo(30, -36, 15, -38); ctx.fill(); }
  ctx.restore();
}
function pig(ctx, x, y, s, o = {}) {
  const P = '#faa2c1', D = '#f06595', t = o.t || 0;
  ctx.save(); ctx.translate(x, y + Math.sin(t * 3 + (o.ph || 0)) * 2); ctx.scale(s, s);
  ell(ctx, 0, 2, 40, 8, 'rgba(0,0,0,.18)');
  ctx.fillStyle = D; rr(ctx, -26, -26, 14, 26, 6); ctx.fill(); rr(ctx, 12, -26, 14, 26, 6); ctx.fill();
  ell(ctx, 0, -48, 40, 34, P);
  ctx.fillStyle = D; ctx.beginPath(); ctx.moveTo(-30, -96); ctx.lineTo(-30, -122); ctx.lineTo(-10, -104); ctx.fill();
  ctx.beginPath(); ctx.moveTo(30, -96); ctx.lineTo(30, -122); ctx.lineTo(10, -104); ctx.fill();
  circ(ctx, 0, -92, 32, P);
  ell(ctx, 0, -84, 15, 11, D); circ(ctx, -5, -84, 3, '#a61e4d'); circ(ctx, 5, -84, 3, '#a61e4d');
  circ(ctx, -12, -102, 4, '#222'); circ(ctx, 12, -102, 4, '#222');
  ctx.strokeStyle = '#a61e4d'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, -72, 6, .3, PI - .3); ctx.stroke();
  ctx.restore();
}
/* casa de chocolate: tablete com quadradinhos e telhado de calda */
function chocHouse(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#7b4a2a'; rr(ctx, -70, -110, 140, 110, 6); ctx.fill();
  ctx.strokeStyle = '#5c3416'; ctx.lineWidth = 4;
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-70 + i * 35, -110); ctx.lineTo(-70 + i * 35, 0); ctx.stroke(); }
  for (let j = 1; j < 3; j++) { ctx.beginPath(); ctx.moveTo(-70, -110 + j * 37); ctx.lineTo(70, -110 + j * 37); ctx.stroke(); }
  ctx.fillStyle = '#4a2a14'; ctx.beginPath(); ctx.moveTo(-88, -104); ctx.lineTo(0, -180); ctx.lineTo(88, -104); ctx.fill();
  ctx.fillStyle = '#fff0f6'; ctx.beginPath(); ctx.moveTo(-88, -104);
  for (let i = 0; i <= 8; i++) { const xx = -88 + i * 22; ctx.lineTo(xx, -104 + (i % 2 ? 16 : 4)); }
  ctx.lineTo(88, -112); ctx.lineTo(-88, -112); ctx.fill();
  ctx.fillStyle = '#c08a4a'; rr(ctx, -16, -58, 32, 58, 14); ctx.fill();
  [[-50, -126, '#ff6b6b'], [0, -150, '#ffd43b'], [44, -128, '#69db7c']].forEach(([a, b, c]) => circ(ctx, a, b, 7, c));
  ctx.restore();
}
function hourglass(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#8d5a35'; rr(ctx, -46, -70, 92, 12, 5); ctx.fill(); rr(ctx, -46, 58, 92, 12, 5); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-36, -58); ctx.lineTo(36, -58); ctx.lineTo(4, 0); ctx.lineTo(36, 58); ctx.lineTo(-36, 58); ctx.lineTo(-4, 0); ctx.closePath();
  ctx.fillStyle = 'rgba(208,235,255,.7)'; ctx.fill(); ctx.strokeStyle = '#74c0fc'; ctx.lineWidth = 3; ctx.stroke();
  const k = (t * .25) % 1;
  ctx.fillStyle = '#fab005'; ctx.beginPath(); ctx.moveTo(-26 * (1 - k), -40 * (1 - k) - 4); ctx.lineTo(26 * (1 - k), -40 * (1 - k) - 4); ctx.lineTo(0, -2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-30, 58); ctx.lineTo(30, 58); ctx.lineTo(0, 58 - 40 * k - 6); ctx.fill();
  ctx.fillRect(-1.5, -2, 3, 58);
  ctx.restore();
}
function wand(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.5); ctx.scale(s, s);
  ctx.fillStyle = '#5f3dc4'; rr(ctx, -5, -10, 10, 90, 4); ctx.fill();
  star5(ctx, 0, -26, 26, '#ffd43b');
  for (let i = 0; i < 3; i++) sparkle(ctx, Math.cos(t * 3 + i * 2) * 40, -30 + Math.sin(t * 3 + i * 2) * 30, 8, '#f783ac', t + i);
  ctx.restore();
}
function witchHat(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 0, 60, 14, '#3b2b5c');
  ctx.fillStyle = '#4c3a8c'; ctx.beginPath(); ctx.moveTo(-36, -4); ctx.quadraticCurveTo(-10, -60, 20, -96); ctx.quadraticCurveTo(10, -50, 36, -4); ctx.fill();
  ctx.fillStyle = '#ae3ec9'; ctx.fillRect(-36, -18, 72, 12);
  ctx.restore();
}
function slipper(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(116,192,252,.95)';
  ctx.beginPath(); ctx.moveTo(-50, -36); ctx.lineTo(-44, -2); ctx.quadraticCurveTo(0, 2, 54, 10);
  ctx.quadraticCurveTo(58, -8, 34, -12); ctx.quadraticCurveTo(4, -14, -26, -34); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-48, -2); ctx.lineTo(-38, -2); ctx.lineTo(-40, 28); ctx.lineTo(-44, 28); ctx.closePath(); ctx.fill(); ctx.stroke();
  ell(ctx, 10, -6, 16, 4, 'rgba(255,255,255,.6)', .15);
  sparkle(ctx, 30, -34, 9, '#fcc419', 0); sparkle(ctx, -14, -46, 6, '#fcc419', .5);
  ctx.restore();
}
function apple(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, -12, 0, 26, '#e03131'); circ(ctx, 12, 0, 26, '#e03131');
  ctx.fillStyle = '#5c3d2e'; ctx.fillRect(-2, -34, 4, 14); ell(ctx, 12, -30, 12, 6, '#40c057', -.4);
  ell(ctx, -16, -10, 6, 9, 'rgba(255,255,255,.5)', -.3);
  ctx.restore();
}
/* capa de livro de conto: cor + desenho simples + titulo embaixo */
function storyCover(ctx, x, y, w, h, col, title, draw, k) {
  if (k <= 0) return;
  popAt(ctx, k, x, y, () => {
    shadowOn(ctx, 16, 6, .3); rr(ctx, x - w / 2, y - h / 2, w, h, 12); ctx.fillStyle = col; ctx.fill(); shadowOff(ctx);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(x - w / 2, y - h / 2, 12, h);
    rr(ctx, x - w / 2 + 22, y - h / 2 + 14, w - 36, h * .58, 10); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fill();
    draw(x + 6, y - h / 2 + 14 + h * .29);
    txtWrap(ctx, title, x + 6, y + h * .3, w - 30, 19, '#ffffff', 'center', 900, 1.1);
  });
}
function mango(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.3);
  ctx.beginPath(); ctx.moveTo(0, -50); ctx.bezierCurveTo(46, -46, 52, 40, 4, 52); ctx.bezierCurveTo(-40, 56, -44, -10, 0, -50);
  const g = ctx.createLinearGradient(-40, 0, 40, 0); g.addColorStop(0, '#ffd43b'); g.addColorStop(1, '#f76707'); ctx.fillStyle = g; ctx.fill();
  ell(ctx, 6, -54, 16, 7, '#40c057', .4); ell(ctx, -14, -18, 7, 14, 'rgba(255,255,255,.45)', .3);
  ctx.restore();
}
/* camiseta com a MANGA destacada */
function shirt(ctx, x, y, s, hl) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#4dabf7'; ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(40, -50); ctx.lineTo(40, 50); ctx.lineTo(-40, 50); ctx.fill();
  ctx.fillStyle = hl > 0 ? mixHex('#4dabf7', '#e8590c', clamp(hl)) : '#4dabf7';
  ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(-74, -20); ctx.lineTo(-56, 2); ctx.lineTo(-40, -12); ctx.fill();
  ctx.fillStyle = '#4dabf7'; ctx.beginPath(); ctx.moveTo(40, -50); ctx.lineTo(74, -20); ctx.lineTo(56, 2); ctx.lineTo(40, -12); ctx.fill();
  ctx.fillStyle = '#e7f5ff'; ctx.beginPath(); ctx.arc(0, -50, 14, 0, PI); ctx.fill();
  ctx.restore();
}
function paw(ctx, x, y, s, col = '#5c3d2e') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(ctx, 0, 6, 14, 12, col); circ(ctx, -14, -10, 6, col); circ(ctx, -5, -18, 6, col); circ(ctx, 6, -18, 6, col); circ(ctx, 15, -10, 6, col);
  ctx.restore();
}
function magnifier(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#5c3d2e'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(34, 34); ctx.lineTo(76, 76); ctx.stroke();
  circ(ctx, 0, 0, 46, 'rgba(208,235,255,.45)', '#495057', 9);
  ell(ctx, -16, -16, 9, 14, 'rgba(255,255,255,.7)', .6);
  ctx.restore();
}
function harp(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#f59f00'; ctx.lineWidth = 10; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-30, 50); ctx.lineTo(-30, -50); ctx.quadraticCurveTo(10, -70, 34, -30); ctx.lineTo(34, 50); ctx.lineTo(-30, 50); ctx.stroke();
  ctx.strokeStyle = '#fff3bf'; ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-18 + i * 11, -44 + i * 3); ctx.lineTo(-18 + i * 11, 46); ctx.stroke(); }
  ctx.restore();
}
/* placa com seta (signpost). dir = -1 esquerda, 1 direita */
function arrowBoard(ctx, x, y, w, h, dir, col, label, k) {
  if (k <= 0) return;
  popAt(ctx, k, x, y, () => {
    shadowOn(ctx, 14, 6, .3); ctx.beginPath();
    const x0 = x - w / 2, x1 = x + w / 2, tip = 34;
    if (dir > 0) { ctx.moveTo(x0, y - h / 2); ctx.lineTo(x1 - tip, y - h / 2); ctx.lineTo(x1, y); ctx.lineTo(x1 - tip, y + h / 2); ctx.lineTo(x0, y + h / 2); }
    else { ctx.moveTo(x1, y - h / 2); ctx.lineTo(x0 + tip, y - h / 2); ctx.lineTo(x0, y); ctx.lineTo(x0 + tip, y + h / 2); ctx.lineTo(x1, y + h / 2); }
    ctx.closePath(); ctx.fillStyle = col; ctx.fill(); shadowOff(ctx);
    txt(ctx, label, x + dir * 10, y + 2, 40, '#ffffff');
  });
}
