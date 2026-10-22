/* ing_base.js — ajudantes do video ING3 sobre a ARTE DO JOGO (window.ARTE, logica 960x540).
   O video e 1280x720: o cenario e desenhado com escala 4/3; personagens recebem a escala direto. */
const A = window.ARTE, K43 = 4 / 3;
const GROUND = 587;               /* pes dos personagens (chao do jogo y=440 * 4/3) */

/* janela de visibilidade com fade: entra em [a,a+d], sai em [b,b+d] */
const ph = (lt, a, b = 1e9, d = .35) => clamp((lt - a) / d) * clamp((b + d - lt) / d);   /* sai em [b, b+d]: cruza com a fase seguinte, sem quadro vazio */

function artBg(ctx, cena, lt, o = {}) {
  const nome = (A.CENAS && A.CENAS[cena]) ? cena : (o.fb || 'pradaria');
  const cam = (o.cam || 0) + lt * (o.pan == null ? 16 : o.pan);
  ctx.save(); ctx.scale(K43, K43);
  try {
    A.ceu(ctx, nome, lt); A.longe(ctx, nome, cam * .15, lt); A.perto(ctx, nome, cam * .45, lt);
    if (nome !== 'biblioteca' && o.chao !== false) A.chao(ctx, { x: -20, y: 440, w: 1000, h: 100 }, nome);
  } catch (e) { ctx.fillStyle = '#5b8cc9'; ctx.fillRect(0, 0, 960, 540); }
  ctx.restore();
  if (o.dim) { ctx.fillStyle = `rgba(10,12,30,${o.dim})`; ctx.fillRect(0, 0, W, H); }
}
function hero(ctx, quem, x, y, est, lt, dir = 1, s = 1.6, look) { A.heroi(ctx, x, y, est, lt, dir, s, quem, look); }
function pipD(ctx, x, y, est, lt, dir = 1, s = 1.6) { A.pip(ctx, x, y, est, lt, dir, s); }
function mor(ctx, tipo, x, y, lt, dir = 1, s = 1.4, talk = false) { withT(ctx, x, y, s, 0, () => A.morador(ctx, tipo, 0, 0, lt, dir, talk)); }
function condeD(ctx, x, y, est, lt, s = 1.2) { withT(ctx, x, y, s, 0, () => A.conde(ctx, 0, 0, est, lt)); }
function cookie(ctx, x, y, r, bite) { A.biscoito(ctx, x, y, r, bite); }

/* painel translucido para o "quadro" de palavras */
function board(ctx, x, y, w, h, a = 1, bg = 'rgba(255,253,245,.93)', bd) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; shadowOn(ctx, 22, 8, .28); rr(ctx, x, y, w, h, 26); ctx.fillStyle = bg; ctx.fill(); shadowOff(ctx);
  if (bd) { ctx.lineWidth = 5; ctx.strokeStyle = bd; ctx.stroke(); }
  ctx.restore();
}
/* palavra-chave grande num cartao colorido (pop) */
function kw(ctx, s, x, y, size, k, bg = '#ffffff', fg = '#23314f', o = {}) {
  if (k <= 0) return;
  ctx.font = `900 ${size}px ${FONT}`;
  const w = Math.max(o.minW || 0, ctx.measureText(s).width + size * 1.0), h = size * 1.55;
  popAt(ctx, k, x, y, () => {
    shadowOn(ctx, 14, 5, .25); rr(ctx, x - w / 2, y - h / 2, w, h, h * .32); ctx.fillStyle = bg; ctx.fill(); shadowOff(ctx);
    if (o.border) { ctx.lineWidth = 4; ctx.strokeStyle = o.border; ctx.stroke(); }
    txt(ctx, s, x, y + 1, size, fg);
  });
  return w;
}
/* texto multilinha centrado ("\n") */
function lines(ctx, s, x, y, size, color, a = 1, weight = 900, lh = 1.2) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  const L = s.split('\n'); L.forEach((l, i) => txt(ctx, l, x, y + (i - (L.length - 1) / 2) * size * lh, size, color, 'center', weight));
  ctx.restore();
}
/* quebra automatica centrada; devolve n de linhas */
function wrapC(ctx, s, x, y, maxW, size, color, a = 1, weight = 900, lh = 1.22) {
  ctx.font = `${weight} ${size}px ${FONT}`;
  const words = s.split(' '), L = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { L.push(cur); cur = w; } else cur = t; }
  if (cur) L.push(cur);
  lines(ctx, L.join('\n'), x, y, size, color, a, weight, lh); return L.length;
}
function arrowTo(ctx, x0, y0, x1, y1, col = '#e8590c', lw = 7, k = 1) {
  if (k <= 0) return;
  const xe = lerp(x0, x1, k), ye = lerp(y0, y1, k), a = Math.atan2(ye - y0, xe - x0);
  ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(xe - Math.cos(a) * lw, ye - Math.sin(a) * lw); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xe, ye); ctx.lineTo(xe - Math.cos(a - .5) * lw * 3, ye - Math.sin(a - .5) * lw * 3);
  ctx.lineTo(xe - Math.cos(a + .5) * lw * 3, ye - Math.sin(a + .5) * lw * 3); ctx.closePath(); ctx.fill(); ctx.restore();
}
function sunD(ctx, x, y, r, t = 0) {
  ctx.save(); ctx.strokeStyle = '#fab005'; ctx.lineWidth = r * .14; ctx.lineCap = 'round';
  for (let i = 0; i < 10; i++) { const a = i * TAU / 10 + t * .4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 1.25, y + Math.sin(a) * r * 1.25); ctx.lineTo(x + Math.cos(a) * r * 1.6, y + Math.sin(a) * r * 1.6); ctx.stroke(); }
  circ(ctx, x, y, r, '#ffd43b', '#f59f00', r * .08); ctx.restore();
}
function dogD(ctx, x, y, s, t = 0) {   /* cachorrinho simples, pes em (x,y) */
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const B = '#c47f3c', D = '#7a4a1e';
  ctx.strokeStyle = D; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-30, -38); ctx.quadraticCurveTo(-46, -50 + Math.sin(t * 8) * 6, -44, -62); ctx.stroke();
  ctx.fillStyle = B; [-22, -10, 14, 26].forEach(lx => { rr(ctx, lx - 4, -26, 9, 26, 4); ctx.fill(); });
  ell(ctx, 0, -36, 36, 18, B);
  circ(ctx, 34, -58, 18, B); ell(ctx, 50, -52, 11, 8, '#e0a96d'); circ(ctx, 59, -55, 4, '#222');
  ell(ctx, 26, -62, 7, 14, D, -.5); circ(ctx, 38, -63, 3, '#222');
  ctx.restore();
}
function catD(ctx, x, y, s, col = '#222') {  /* gatinho sentado, pes em (x,y) */
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
  ell(ctx, 0, -26, 22, 26, col); circ(ctx, 0, -62, 17, col);
  ctx.beginPath(); ctx.moveTo(-15, -70); ctx.lineTo(-12, -90); ctx.lineTo(-2, -76); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(15, -70); ctx.lineTo(12, -90); ctx.lineTo(2, -76); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(18, -8); ctx.quadraticCurveTo(44, -10, 38, -40); ctx.stroke();
  circ(ctx, -6, -64, 3.4, '#ffd43b'); circ(ctx, 6, -64, 3.4, '#ffd43b');
  ctx.restore();
}
function dwarf(ctx, x, y, s, col = '#e03131') {   /* anaozinho: gorro, barba */
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(ctx, -16, -40, 32, 40, 10); ctx.fillStyle = '#5c7cfa'; ctx.fill();
  circ(ctx, 0, -52, 15, '#fcdcc4');
  ctx.beginPath(); ctx.moveTo(-14, -48); ctx.quadraticCurveTo(0, -18, 14, -48); ctx.closePath(); ctx.fillStyle = '#f1f3f5'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-16, -58); ctx.lineTo(4, -92); ctx.lineTo(16, -58); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  circ(ctx, -5, -56, 2, '#222'); circ(ctx, 5, -56, 2, '#222'); circ(ctx, 0, -51, 3, '#f59f8b');
  ctx.restore();
}
function donutD(ctx, x, y, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.arc(x, y, r * .38, 0, TAU, true); ctx.fillStyle = '#d9a066'; ctx.fill('evenodd');
  ctx.beginPath(); ctx.arc(x, y - r * .05, r * .9, 0, TAU); ctx.arc(x, y - r * .05, r * .42, 0, TAU, true); ctx.fillStyle = '#f783ac'; ctx.fill('evenodd');
  const sp = ['#ffd43b', '#74c0fc', '#fff', '#69db7c'];
  for (let i = 0; i < 12; i++) { const a = i * TAU / 12 + .3, rr2 = r * (i % 2 ? .58 : .74); ctx.save(); ctx.translate(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2); ctx.rotate(a * 2); ctx.fillStyle = sp[i % 4]; ctx.fillRect(-r * .09, -r * .03, r * .18, r * .06); ctx.restore(); }
  ctx.restore();
}
function pokeball(ctx, x, y, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, PI, TAU); ctx.closePath(); ctx.fillStyle = '#e03131'; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, r, 0, PI); ctx.closePath(); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.lineWidth = r * .12; ctx.strokeStyle = '#222'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.stroke();
  circ(ctx, x, y, r * .3, '#fff', '#222', r * .12); ctx.restore();
}
function shield(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-26, -30); ctx.lineTo(26, -30); ctx.lineTo(24, 4); ctx.quadraticCurveTo(14, 26, 0, 34); ctx.quadraticCurveTo(-14, 26, -24, 4); ctx.closePath();
  ctx.fillStyle = '#868e96'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#495057'; ctx.stroke();
  ctx.fillStyle = '#e03131'; ctx.fillRect(-4, -24, 8, 50); ctx.fillRect(-20, -8, 40, 8);
  ctx.restore();
}
function confetti(ctx, lt, n = 40, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  const C = ['#ff6b6b', '#ffd43b', '#69db7c', '#4dabf7', '#da77f2'];
  for (let i = 0; i < n; i++) {
    const x = (i * 131.7) % W, y = ((lt * 120 + i * 71) % 760) - 30;
    ctx.save(); ctx.translate(x + Math.sin(lt * 2 + i) * 20, y); ctx.rotate(lt * 3 + i); ctx.fillStyle = C[i % 5]; ctx.fillRect(-6, -3, 12, 7); ctx.restore();
  }
  ctx.restore();
}
/* papel do poema "My Cat" (original). o = {hl: realce de rima, beat: k, lineNo:k, stz:k} */
const POEM = { x: 110, y: 92, w: 520, h: 470 };
const POEM_L = [ ['I have a ', 'cat', ','], ['She sleeps in my ', 'hat', '.'], ['She plays in the ', 'sun', ','], ['Then off she will ', 'run', '!'] ];
const POEM_Y = [272, 322, 418, 468];
function poemPaper(ctx, lt, a = 1, o = {}) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  const { x, y, w, h } = POEM;
  shadowOn(ctx, 22, 8, .3); rr(ctx, x, y, w, h, 18); ctx.fillStyle = '#fffaf0'; ctx.fill(); shadowOff(ctx);
  ctx.strokeStyle = 'rgba(28,126,214,.16)'; ctx.lineWidth = 2;
  for (let yy = y + 60; yy < y + h - 10; yy += 48) { ctx.beginPath(); ctx.moveTo(x + 20, yy + 16); ctx.lineTo(x + w - 20, yy + 16); ctx.stroke(); }
  const cx = x + w / 2;
  txt(ctx, 'My Cat', cx, 152, 50, o.titleHl ? '#e8590c' : '#23314f');
  txt(ctx, 'by Lia', cx, 204, 30, o.authHl ? '#7048e8' : '#5c677d', 'center', 800);
  POEM_L.forEach((L, i) => {
    ctx.font = `800 34px ${FONT}`;
    const full = L.join(''), tw = ctx.measureText(full).width; let xx = cx - tw / 2;
    const yy = POEM_Y[i];
    if (o.lineHl != null && o.lineHl[i] > 0) { ctx.save(); ctx.globalAlpha *= o.lineHl[i]; rr(ctx, cx - tw / 2 - 14, yy - 22, tw + 28, 44, 12); ctx.fillStyle = 'rgba(255,212,59,.45)'; ctx.fill(); ctx.restore(); }
    L.forEach((part, j) => {
      const pw = ctx.measureText(part).width;
      let col = '#23314f';
      if (j === 1 && o.rhyme) col = i < 2 ? `rgba(232,89,12,${.35 + .65 * o.rhyme})` : `rgba(28,126,214,${.35 + .65 * o.rhyme})`;
      if (j === 1 && o.rhyme) { ctx.save(); ctx.globalAlpha *= o.rhyme; rr(ctx, xx - 4, yy - 21, pw + 8, 42, 10); ctx.fillStyle = i < 2 ? 'rgba(255,192,120,.45)' : 'rgba(116,192,252,.45)'; ctx.fill(); ctx.restore(); }
      txt(ctx, part, xx, yy, 34, j === 1 && o.rhyme ? (i < 2 ? '#d9480f' : '#1864ab') : col, 'left', 800); xx += pw;
    });
  });
  ctx.restore();
}

/* ---------- ABERTURA ---------- */
SCENES.titulo = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt, { pan: 20 });
  const k1 = pop(lt, .15, .6), k2 = pop(lt, .55, .6);
  board(ctx, 240, 120, 800, 250, clamp(lt / .4), 'rgba(255,253,245,.9)');
  popAt(ctx, k1, 640, 200, () => txtOut(ctx, 'English', 640, 200, 112, '#c92a2a', '#ffffff', 14));
  popAt(ctx, k2, 640, 305, () => txtOut(ctx, 'Fairy tales, stories and poems', 640, 305, 46, '#2b2f6b', '#ffffff', 10));
  hero(ctx, 'lia', 330, GROUND, 'cheer', lt, 1, 1.7); hero(ctx, 'theo', 470, GROUND, 'idle', lt + .3, 1, 1.7);
  hero(ctx, 'bia', 820, GROUND, 'cheer', lt + .5, -1, 1.7);
  pipD(ctx, 1010, 470 + Math.sin(lt * 2) * 8, 'fly', lt, -1, 1.6);
};
