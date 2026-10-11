/* lib.js — utilidades de desenho do video LP3 (canvas 1280x720).
   Tudo desenhado por codigo: nada de imagem baixada, nada de emoji. */
const W = 1280, H = 720;
const FONT = '"Segoe UI", "Nunito", Arial, sans-serif';
const PI = Math.PI, TAU = Math.PI * 2;

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const easeOut = k => 1 - Math.pow(1 - clamp(k), 3);
const easeInOut = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const easeBack = k => { k = clamp(k); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
/* progresso de entrada: 0 antes de t0, 1 depois de t0+d */
const ap = (lt, t0, d = 0.5) => clamp((lt - t0) / d);
const pop = (lt, t0, d = 0.45) => (lt < t0 ? 0 : easeBack((lt - t0) / d));

function rr(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function circ(ctx, x, y, r, fill, stroke, lw) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.lineWidth = lw || 3; ctx.strokeStyle = stroke; ctx.stroke(); }
}
function ell(ctx, x, y, rx, ry, fill, rot = 0) {
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, TAU); ctx.fillStyle = fill; ctx.fill();
}
function grad(ctx, y0, y1, stops) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c));
  return g;
}
function sky(ctx, top, bottom) { ctx.fillStyle = grad(ctx, 0, H, [top, bottom]); ctx.fillRect(0, 0, W, H); }
function withT(ctx, x, y, s, rot, fn) {
  ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore();
}
/* escala com "pop" a partir de um ponto */
function popAt(ctx, k, x, y, fn) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= clamp(k * 1.6); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-x, -y); fn(); ctx.restore();
}
function shadowOn(ctx, blur = 18, oy = 6, a = .28) { ctx.shadowColor = `rgba(0,0,0,${a})`; ctx.shadowBlur = blur; ctx.shadowOffsetY = oy; }
function shadowOff(ctx) { ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; }

/* ---------- texto ---------- */
function txt(ctx, s, x, y, size, color, align = 'center', weight = 900) {
  ctx.font = `${weight} ${size}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  ctx.fillStyle = color; ctx.fillText(s, x, y);
}
function txtOut(ctx, s, x, y, size, color, outline, lw = 8, align = 'center') {
  ctx.font = `900 ${size}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round'; ctx.lineWidth = lw; ctx.strokeStyle = outline; ctx.strokeText(s, x, y);
  ctx.fillStyle = color; ctx.fillText(s, x, y);
}
/* Palavra com destaque. Marcacao:
   (x) = letra muda, esmaecida     {x} = letra quietinha, riscada
   [x] = destaque cor 1            <x> = destaque cor 2 */
function parseRich(spec) {
  const out = []; const re = /\(([^)]*)\)|\{([^}]*)\}|\[([^\]]*)\]|<([^>]*)>|([^({[<]+)/g; let m;
  while ((m = re.exec(spec))) {
    if (m[1] !== undefined) out.push([m[1], 'mute']);
    else if (m[2] !== undefined) out.push([m[2], 'quiet']);
    else if (m[3] !== undefined) out.push([m[3], 'hl']);
    else if (m[4] !== undefined) out.push([m[4], 'hl2']);
    else out.push([m[5], 'n']);
  }
  return out;
}
function richWidth(ctx, spec, size) {
  ctx.font = `900 ${size}px ${FONT}`;
  return parseRich(spec).reduce((a, [s]) => a + ctx.measureText(s).width, 0);
}
function rich(ctx, spec, x, y, size, o = {}) {
  const parts = parseRich(spec);
  const col = o.color || '#23314f', hl = o.hl || '#e8590c', hl2 = o.hl2 || '#1c7ed6';
  ctx.font = `900 ${size}px ${FONT}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  const tw = parts.reduce((a, [s]) => a + ctx.measureText(s).width, 0);
  let cx = o.align === 'left' ? x : o.align === 'right' ? x - tw : x - tw / 2;
  const a0 = ctx.globalAlpha;
  for (const [s, k] of parts) {
    const w = ctx.measureText(s).width;
    ctx.save();
    if (k === 'mute') { ctx.globalAlpha *= .28; ctx.fillStyle = col; }
    else if (k === 'quiet') { ctx.globalAlpha *= .6; ctx.fillStyle = '#868e96'; }
    else if (k === 'hl') ctx.fillStyle = hl;
    else if (k === 'hl2') ctx.fillStyle = hl2;
    else ctx.fillStyle = col;
    if (o.outline) { ctx.lineJoin = 'round'; ctx.lineWidth = o.outlineW || 8; ctx.strokeStyle = o.outline; ctx.strokeText(s, cx, y); }
    ctx.fillText(s, cx, y);
    if (k === 'quiet') { // risquinho na letra quieta
      ctx.globalAlpha = a0 * .9; ctx.strokeStyle = '#e03131'; ctx.lineWidth = Math.max(3, size * .07); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx + w * .1, y + size * .28); ctx.lineTo(cx + w * .9, y - size * .3); ctx.stroke();
    }
    if (k === 'mute' && o.muteDot) { ctx.globalAlpha = a0 * .8; circ(ctx, cx + w / 2, y + size * .62, size * .06, '#adb5bd'); }
    ctx.restore();
    cx += w;
  }
  return tw;
}
/* cartao com palavra rica, centrado em (x,y) */
function wordCard(ctx, spec, x, y, size, k, o = {}) {
  if (k <= 0) return;
  const pad = size * .45, tw = richWidth(ctx, spec, size);
  const w = Math.max(o.minW || 0, tw + pad * 2), h = size * 1.55;
  popAt(ctx, k, x, y, () => {
    shadowOn(ctx, 16, 6, .25); rr(ctx, x - w / 2, y - h / 2, w, h, h * .3);
    ctx.fillStyle = o.bg || '#ffffff'; ctx.fill(); shadowOff(ctx);
    if (o.border) { ctx.lineWidth = 4; ctx.strokeStyle = o.border; ctx.stroke(); }
    rich(ctx, spec, x, y + size * .04, size, o);
  });
}
function chip(ctx, s, x, y, size, bg, fg, k = 1) {
  if (k <= 0) return;
  ctx.font = `900 ${size}px ${FONT}`; const w = ctx.measureText(s).width + size * 1.1, h = size * 1.6;
  popAt(ctx, k, x, y, () => {
    shadowOn(ctx, 10, 4, .22); rr(ctx, x - w / 2, y - h / 2, w, h, h / 2); ctx.fillStyle = bg; ctx.fill(); shadowOff(ctx);
    txt(ctx, s, x, y + 1, size, fg);
  });
}
/* folha de bordo (simplificada, 11 pontas) */
function mapleLeaf(ctx, x, y, s, fill) {
  const pts = [[0,-1],[.18,-.55],[.42,-.7],[.36,-.3],[.78,-.42],[.62,-.08],[.85,.05],[.42,.22],[.48,.42],[.08,.3],[.06,.75],[-.06,.75],[-.08,.3],[-.48,.42],[-.42,.22],[-.85,.05],[-.62,-.08],[-.78,-.42],[-.36,-.3],[-.42,-.7],[-.18,-.55]];
  ctx.beginPath(); pts.forEach(([a, b], i) => i ? ctx.lineTo(x + a * s, y + b * s) : ctx.moveTo(x + a * s, y + b * s));
  ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
}
/* estrelinha magica */
function sparkle(ctx, x, y, r, col, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rr2 = i % 2 ? r * .32 : r; const a = i * PI / 4; ctx.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore();
}
function star5(ctx, x, y, r, col) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, q = i % 2 ? r * .45 : r; ctx.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill();
}
function cloud(ctx, x, y, s, col = '#ffffff', a = 1) {
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath();
  [[0, 0, 40], [38, -14, 46], [82, 0, 38], [40, 14, 36], [-30, 8, 28], [112, 10, 26]].forEach(([dx, dy, r]) => {
    ctx.moveTo(x + dx * s + r * s, y + dy * s); ctx.arc(x + dx * s, y + dy * s, r * s, 0, TAU);
  });
  ctx.fill(); ctx.restore();
}
function tree(ctx, x, y, s, c1 = '#2f9e44', c2 = '#2b8a3e', trunk = '#8d5a35') {
  ctx.fillStyle = trunk; rr(ctx, x - 12 * s, y - 70 * s, 24 * s, 72 * s, 6 * s); ctx.fill();
  circ(ctx, x, y - 120 * s, 58 * s, c2); circ(ctx, x - 40 * s, y - 92 * s, 42 * s, c1);
  circ(ctx, x + 42 * s, y - 94 * s, 44 * s, c1); circ(ctx, x + 4 * s, y - 150 * s, 44 * s, c1);
  circ(ctx, x - 14 * s, y - 160 * s, 16 * s, 'rgba(255,255,255,.12)');
}
function pine(ctx, x, y, s, col = '#1b6e3a') {
  ctx.fillStyle = '#6b4226'; ctx.fillRect(x - 8 * s, y - 30 * s, 16 * s, 30 * s);
  for (let i = 0; i < 3; i++) {
    const yy = y - 30 * s - i * 50 * s, w = (70 - i * 16) * s;
    ctx.beginPath(); ctx.moveTo(x - w, yy); ctx.lineTo(x + w, yy); ctx.lineTo(x, yy - 90 * s); ctx.closePath();
    ctx.fillStyle = col; ctx.fill();
  }
}
function grassHill(ctx, y, col, amp = 20, ph = 0) {
  ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 20) ctx.lineTo(x, y + Math.sin(x / 160 + ph) * amp);
  ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
}
/* titulo da cena (canto superior esquerdo) */
function sceneTag(ctx, s, k, col = '#ffffff', bg = 'rgba(20,24,48,.55)') {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= clamp(k);
  ctx.font = `900 26px ${FONT}`; const w = ctx.measureText(s).width + 40;
  rr(ctx, 24, 20 - (1 - k) * 20, w, 46, 23); ctx.fillStyle = bg; ctx.fill();
  txt(ctx, s, 24 + w / 2, 44 - (1 - k) * 20, 26, col);
  ctx.restore();
}
