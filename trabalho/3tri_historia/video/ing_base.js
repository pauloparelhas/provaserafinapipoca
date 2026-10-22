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
  artBg(ctx, 'museu', lt, { pan: 14 });
  const k1 = pop(lt, .15, .6), k2 = pop(lt, .55, .6);
  board(ctx, 240, 100, 800, 250, clamp(lt / .4), 'rgba(255,253,245,.93)');
  popAt(ctx, k1, 640, 185, () => txtOut(ctx, 'Detetives do Tempo', 640, 185, 84, '#7c2d12', '#ffffff', 12));
  popAt(ctx, k2, 640, 285, () => txtOut(ctx, 'História · 3º trimestre', 640, 285, 48, '#2b2f6b', '#ffffff', 10));
  hero(ctx, 'lia', 250, GROUND, 'cheer', lt, 1, 1.7); hero(ctx, 'theo', 380, GROUND, 'idle', lt + .3, 1, 1.7);
  hero(ctx, 'bia', 900, GROUND, 'cheer', lt + .5, -1, 1.7); hero(ctx, 'leo', 1030, GROUND, 'idle', lt + .2, -1, 1.7);
  mor(ctx, 'tic', 640, GROUND, lt, 1, 1.6, false);
};

/* =====================================================================
   HIS3 — ajudantes do video de Historia (cartas, itens, icones simples)
   ===================================================================== */
const COR_F = { oral: '#a855f7', escrita: '#3b82f6', visual: '#f97316', material: '#22c55e' };
const C_ANTES = '#b7791f', C_HOJE = '#1c7ed6', C_MUD = '#e8590c', C_PERM = '#2f9e44';
function cartaD(ctx, tipo, x, y, s, lt, rot = 0) { withT(ctx, x, y, 1, rot, () => A.cartaFonte(ctx, tipo, 0, 0, s, lt)); }
function trilhaD(ctx, n, x, y, s, lt) { withT(ctx, x, y, s, 0, () => A.itemTrilha(ctx, n, lt)); }
function poderD(ctx, tipo, x, y, s, lt) { withT(ctx, x, y, s, 0, () => A.itemPoder(ctx, tipo, 0, 0, lt)); }
function tracaD(ctx, x, y, s, lt, dir = 1) { withT(ctx, x, y, s, 0, () => A.traca(ctx, 0, 0, lt, dir, true)); }
/* instante da palavra w DENTRO da frase fi (evita pegar a mesma palavra de outra frase) */
function W(S, w, fi, n = 0) {
  const hits = S.sc.palavras.filter(p => p.f === fi && p.w === w);
  if (!hits[n]) { const key = S.sc.id + ':' + w + '@' + fi; if (!MISSING.includes(key)) MISSING.push(key); return 1e9; }
  return hits[n].ini - S.sc.ini;
}
/* fala so dentro da janela [a,b) */
const talkIn = (S, lt, a, b = 1e9) => S.talk(lt) > 0 && lt >= a && lt < b;
/* coluna de comparacao: painel com aba colorida no topo */
function colVS(ctx, x, y, w, h, titulo, cor, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  board(ctx, x, y, w, h, 1, 'rgba(255,253,245,.95)', cor);
  ctx.font = `900 30px ${FONT}`; const tw = ctx.measureText(titulo).width + 56;
  shadowOn(ctx, 8, 3, .2); rr(ctx, x + w / 2 - tw / 2, y - 26, tw, 52, 26); ctx.fillStyle = cor; ctx.fill(); shadowOff(ctx);
  txt(ctx, titulo, x + w / 2, y + 1, 30, '#fff');
  ctx.restore();
}
/* rotulo embaixo de um icone */
function lab(ctx, s, x, y, k, cor = '#23314f', size = 28) { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(k); txt(ctx, s, x, y, size, cor, 'center', 900); ctx.restore(); }
function riscoX(ctx, x, y, s, k) { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(k); ctx.strokeStyle = 'rgba(224,49,49,.85)'; ctx.lineWidth = 10 * s; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - 40 * s, y - 40 * s); ctx.lineTo(x + 40 * s, y + 40 * s); ctx.moveTo(x + 40 * s, y - 40 * s); ctx.lineTo(x - 40 * s, y + 40 * s); ctx.stroke(); ctx.restore(); }

/* ---- icones (centro em x,y; ~100px de lado com s=1) ---- */
function icoBase(ctx, x, y, s, fn) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; fn(); ctx.restore(); }
function icoGiz(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  rr(ctx, -62, -42, 124, 84, 6); ctx.fillStyle = '#8d5a35'; ctx.fill(); rr(ctx, -54, -35, 108, 66, 3); ctx.fillStyle = '#2f6b4a'; ctx.fill();
  txt(ctx, 'A B C', 0, -12, 22, 'rgba(255,255,255,.9)'); txt(ctx, '1 + 2', 0, 14, 18, 'rgba(255,255,255,.75)');
  ctx.fillStyle = '#fff'; ctx.fillRect(30, 36, 16, 5); }); }
function icoLousa(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  rr(ctx, -64, -44, 128, 84, 8); ctx.fillStyle = '#212529'; ctx.fill(); rr(ctx, -57, -37, 114, 70, 4); ctx.fillStyle = '#1971c2'; ctx.fill();
  [['#ffd43b', -34], ['#69db7c', 0], ['#ff8787', 34]].forEach(([c, dx]) => { rr(ctx, dx - 14, -22, 28, 24, 6); ctx.fillStyle = c; ctx.fill(); });
  rr(ctx, -40, 10, 80, 10, 5); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fill(); ctx.fillStyle = '#495057'; ctx.fillRect(-6, 40, 12, 14); ctx.fillRect(-22, 52, 44, 6); }); }
function icoCelular(ctx, x, y, s, tela = 'msg') { icoBase(ctx, x, y, s, () => {
  rr(ctx, -30, -54, 60, 108, 12); ctx.fillStyle = '#343a40'; ctx.fill(); rr(ctx, -25, -45, 50, 86, 6); ctx.fillStyle = '#e7f5ff'; ctx.fill();
  circ(ctx, 0, 47, 4, '#868e96');
  if (tela === 'msg') { rr(ctx, -18, -20, 36, 26, 3); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#1c7ed6'; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-18, -20); ctx.lineTo(0, -4); ctx.lineTo(18, -20); ctx.stroke(); }
  else if (tela === 'chuva') { cloud(ctx, -10, -14, .22, '#74c0fc'); ctx.strokeStyle = '#1c7ed6'; ctx.lineWidth = 3; [-12, 0, 12].forEach(dx => { ctx.beginPath(); ctx.moveTo(dx, 2); ctx.lineTo(dx - 4, 14); ctx.stroke(); }); }
  else if (tela === 'video') { circ(ctx, 0, -12, 11, '#fcdcc4'); rr(ctx, -15, 2, 30, 20, 8); ctx.fillStyle = '#4dabf7'; ctx.fill(); circ(ctx, -4, -14, 1.8, '#222'); circ(ctx, 4, -14, 1.8, '#222'); }
  else if (tela === 'exame') { ctx.strokeStyle = '#e03131'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-8, 0); ctx.lineTo(-3, -16); ctx.lineTo(4, 14); ctx.lineTo(9, 0); ctx.lineTo(20, 0); ctx.stroke(); }
  else if (tela === 'app') { ['#ff6b6b', '#ffd43b', '#69db7c', '#4dabf7', '#da77f2', '#ffa94d'].forEach((c, i) => { rr(ctx, -19 + (i % 3) * 14, -30 + Math.floor(i / 3) * 16, 11, 11, 3); ctx.fillStyle = c; ctx.fill(); }); }
  else if (tela === 'foto') { ctx.fillStyle = '#a5d8ff'; ctx.fillRect(-20, -30, 40, 44); circ(ctx, 8, -18, 5, '#ffd43b'); ctx.fillStyle = '#40c057'; ctx.beginPath(); ctx.moveTo(-20, 14); ctx.lineTo(-6, -6); ctx.lineTo(4, 6); ctx.lineTo(12, -2); ctx.lineTo(20, 14); ctx.fill(); }
  else if (tela === 'rede') { heart(ctx, -8, -16, .3, '#f06595'); rr(ctx, -18, 4, 36, 10, 5); ctx.fillStyle = '#74c0fc'; ctx.fill(); rr(ctx, -18, 18, 26, 8, 4); ctx.fillStyle = '#b2f2bb'; ctx.fill(); circ(ctx, 12, -24, 7, '#ffa94d'); } }); }
function icoBolsa(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.strokeStyle = '#6b3f1d'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-36, -10); ctx.quadraticCurveTo(0, -80, 36, -10); ctx.stroke();
  rr(ctx, -46, -14, 92, 62, 10); ctx.fillStyle = '#a0662f'; ctx.fill(); rr(ctx, -46, -14, 92, 26, 10); ctx.fillStyle = '#8a5428'; ctx.fill();
  rr(ctx, -30, 20, 34, 22, 2); ctx.fillStyle = '#fff8e6'; ctx.fill(); circ(ctx, 0, 12, 5, '#ffd43b'); }); }
function icoMoto(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  [-40, 40].forEach(wx => { circ(ctx, wx, 20, 22, '#343a40'); circ(ctx, wx, 20, 9, '#adb5bd'); });
  ctx.fillStyle = '#e8590c'; ctx.beginPath(); ctx.moveTo(-40, 14); ctx.lineTo(-18, -14); ctx.lineTo(24, -14); ctx.lineTo(40, 14); ctx.closePath(); ctx.fill();
  rr(ctx, -30, -24, 40, 12, 6); ctx.fillStyle = '#212529'; ctx.fill(); ctx.strokeStyle = '#495057'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(24, -14); ctx.lineTo(30, -40); ctx.lineTo(42, -42); ctx.stroke();
  rr(ctx, -56, -16, 26, 22, 4); ctx.fillStyle = '#ffd43b'; ctx.fill(); }); }
function icoEstetoscopio(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-28, -46); ctx.quadraticCurveTo(-34, 10, 0, 14); ctx.quadraticCurveTo(34, 10, 28, -46); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 14); ctx.quadraticCurveTo(4, 40, 26, 40); ctx.stroke(); circ(ctx, 34, 40, 13, '#ced4da', '#495057', 5);
  circ(ctx, -28, -48, 5, '#212529'); circ(ctx, 28, -48, 5, '#212529'); }); }
function icoTermometro(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  rr(ctx, -9, -54, 18, 92, 9); ctx.fillStyle = '#f8f9fa'; ctx.fill(); ctx.strokeStyle = '#868e96'; ctx.lineWidth = 3; ctx.stroke();
  circ(ctx, 0, 42, 15, '#adb5bd', '#868e96', 3); ctx.fillStyle = '#adb5bd'; ctx.fillRect(-3, -30, 6, 70);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = '#495057'; ctx.fillRect(5, -44 + i * 12, 6, 2); } }); }
function icoPapel(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  rr(ctx, -36, -48, 72, 96, 4); ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.strokeStyle = '#ced4da'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = '#74c0fc'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-26, -30 + i * 13); ctx.lineTo(i === 5 ? 0 : 26, -30 + i * 13); ctx.stroke(); }
  ctx.save(); ctx.translate(30, 18); ctx.rotate(-.7); rr(ctx, -5, -40, 10, 56, 3); ctx.fillStyle = '#1c7ed6'; ctx.fill(); ctx.fillStyle = '#212529'; ctx.beginPath(); ctx.moveTo(-5, 16); ctx.lineTo(5, 16); ctx.lineTo(0, 28); ctx.fill(); ctx.restore(); }); }
function icoBoi(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.fillStyle = '#8d5a35'; [-34, -20, 20, 34].forEach(lx => ctx.fillRect(lx - 5, 4, 10, 34)); ell(ctx, 0, -6, 52, 28, '#a0662f');
  ell(ctx, 56, -22, 20, 17, '#a0662f'); ell(ctx, 66, -14, 10, 8, '#e0a96d'); circ(ctx, 56, -28, 3, '#222');
  ctx.strokeStyle = '#f1f3f5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(46, -36); ctx.quadraticCurveTo(40, -52, 50, -56); ctx.moveTo(62, -36); ctx.quadraticCurveTo(70, -52, 62, -58); ctx.stroke(); }); }
function icoArado(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.strokeStyle = '#6b3f1d'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-50, -40); ctx.lineTo(10, 20); ctx.lineTo(50, 20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-50, -40); ctx.lineTo(-62, -30); ctx.stroke();
  ctx.fillStyle = '#868e96'; ctx.beginPath(); ctx.moveTo(4, 14); ctx.lineTo(30, 22); ctx.lineTo(4, 36); ctx.closePath(); ctx.fill(); }); }
function icoTrator(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  rr(ctx, -50, -20, 80, 34, 6); ctx.fillStyle = '#2f9e44'; ctx.fill(); rr(ctx, -40, -58, 40, 40, 6); ctx.fillStyle = '#2b8a3e'; ctx.fill();
  rr(ctx, -34, -52, 28, 24, 3); ctx.fillStyle = '#d0ebff'; ctx.fill(); ctx.fillStyle = '#495057'; ctx.fillRect(16, -46, 8, 28);
  circ(ctx, -28, 20, 28, '#343a40'); circ(ctx, -28, 20, 12, '#ffd43b'); circ(ctx, 34, 28, 18, '#343a40'); circ(ctx, 34, 28, 8, '#ffd43b'); }); }
function icoLampiao(ctx, x, y, s, acesa = 1, eletrico = false) { icoBase(ctx, x, y, s, () => {
  ctx.fillStyle = '#343a40'; ctx.fillRect(-5, -60, 10, 130); ctx.fillRect(-18, 64, 36, 8);
  if (acesa > 0) { ctx.save(); ctx.globalAlpha *= .45 * acesa; circ(ctx, 0, -80, 42, eletrico ? '#fff3bf' : '#ffd8a8'); ctx.restore(); }
  if (eletrico) { ctx.fillStyle = '#495057'; ctx.beginPath(); ctx.moveTo(-22, -84); ctx.lineTo(22, -84); ctx.lineTo(12, -96); ctx.lineTo(-12, -96); ctx.fill(); ell(ctx, 0, -78, 12, 8, acesa > 0 ? '#fff9db' : '#dee2e6'); }
  else { rr(ctx, -16, -100, 32, 40, 4); ctx.fillStyle = 'rgba(255,248,230,.85)'; ctx.fill(); ctx.strokeStyle = '#343a40'; ctx.lineWidth = 4; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-20, -100); ctx.lineTo(0, -116); ctx.lineTo(20, -100); ctx.closePath(); ctx.fillStyle = '#343a40'; ctx.fill();
    if (acesa > 0) { ctx.save(); ctx.globalAlpha *= clamp(acesa); ctx.fillStyle = '#f76707'; ctx.beginPath(); ctx.moveTo(0, -92); ctx.quadraticCurveTo(8, -76, 0, -68); ctx.quadraticCurveTo(-8, -76, 0, -92); ctx.fill(); ctx.restore(); } } }); }
function icoCamera(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.strokeStyle = '#6b3f1d'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(-30, 56); ctx.moveTo(0, -6); ctx.lineTo(30, 56); ctx.moveTo(0, -6); ctx.lineTo(0, 56); ctx.stroke();
  rr(ctx, -34, -46, 56, 42, 4); ctx.fillStyle = '#5c3d2e'; ctx.fill(); ctx.fillStyle = '#343a40'; ctx.beginPath(); ctx.moveTo(22, -36); ctx.lineTo(44, -44); ctx.lineTo(44, -6); ctx.lineTo(22, -14); ctx.fill();
  ctx.fillStyle = '#212529'; ctx.fillRect(-46, -40, 12, 30); }); }
function icoMarreta(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.save(); ctx.rotate(-.5); rr(ctx, -5, -20, 10, 76, 4); ctx.fillStyle = '#c47f3c'; ctx.fill(); rr(ctx, -26, -44, 52, 28, 5); ctx.fillStyle = '#495057'; ctx.fill(); ctx.restore(); }); }
function icoColher(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.save(); ctx.rotate(.5); ctx.fillStyle = '#adb5bd'; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(24, 4); ctx.lineTo(-24, 4); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0, 22); ctx.stroke(); rr(ctx, -6, 20, 12, 34, 5); ctx.fillStyle = '#c47f3c'; ctx.fill(); ctx.restore(); }); }
function icoFotoAntiga(ctx, x, y, s, n = 5) { icoBase(ctx, x, y, s, () => {
  rr(ctx, -64, -46, 128, 92, 4); ctx.fillStyle = '#f1e3c6'; ctx.fill(); ctx.fillStyle = '#c9a777'; ctx.fillRect(-56, -38, 112, 76);
  for (let i = 0; i < n; i++) { const fx = -44 + i * (88 / (n - 1)); circ(ctx, fx, -8, 9, '#8a6a46'); rr(ctx, fx - 10, 2, 20, 28, 6); ctx.fillStyle = '#6e5232'; ctx.fill(); } }); }
function icoCaderno(ctx, x, y, s, cor = '#e8590c') { icoBase(ctx, x, y, s, () => {
  rr(ctx, -38, -50, 76, 100, 6); ctx.fillStyle = cor; ctx.fill(); rr(ctx, -24, -30, 48, 22, 3); ctx.fillStyle = '#fff'; ctx.fill();
  for (let i = 0; i < 7; i++) circ(ctx, -38, -40 + i * 13, 4, '#dee2e6'); }); }
function icoBoletim(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  rr(ctx, -36, -48, 72, 96, 4); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#ced4da'; ctx.lineWidth = 2; ctx.stroke();
  txt(ctx, 'NOTAS', 0, -32, 14, '#1864ab'); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#dee2e6'; ctx.fillRect(-26, -16 + i * 16, 34, 6); txt(ctx, ['A', 'B', 'A', 'A'][i], 20, -13 + i * 16, 13, '#2f9e44'); } }); }
function icoBilhete(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.save(); ctx.rotate(-.08); rr(ctx, -42, -32, 84, 64, 4); ctx.fillStyle = '#fff3bf'; ctx.fill();
  ctx.strokeStyle = '#e67700'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-30, -14 + i * 14); ctx.lineTo(i === 2 ? 4 : 30, -14 + i * 14); ctx.stroke(); }
  circ(ctx, 0, -34, 6, '#e03131'); ctx.restore(); }); }
function icoUniforme(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-20, -44); ctx.lineTo(-54, -24); ctx.lineTo(-42, 0); ctx.lineTo(-30, -8); ctx.lineTo(-30, 44); ctx.lineTo(30, 44); ctx.lineTo(30, -8); ctx.lineTo(42, 0); ctx.lineTo(54, -24); ctx.lineTo(20, -44); ctx.quadraticCurveTo(0, -30, -20, -44); ctx.fill();
  ctx.strokeStyle = '#1c7ed6'; ctx.lineWidth = 4; ctx.stroke(); mapleLeaf(ctx, 14, -14, 10, '#e03131'); ctx.fillStyle = '#1c7ed6'; ctx.fillRect(-30, 34, 60, 10); }); }
function icoTrofeu(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.strokeStyle = '#f59f00'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(-30, -24, 14, PI * .5, PI * 1.5); ctx.moveTo(30, -38); ctx.arc(30, -24, 14, -PI * .5, PI * .5); ctx.stroke();
  ctx.fillStyle = '#fcc419'; ctx.beginPath(); ctx.moveTo(-30, -44); ctx.lineTo(30, -44); ctx.quadraticCurveTo(28, 0, 0, 6); ctx.quadraticCurveTo(-28, 0, -30, -44); ctx.fill();
  ctx.fillRect(-6, 4, 12, 22); rr(ctx, -26, 26, 52, 16, 3); ctx.fillStyle = '#8d5a35'; ctx.fill(); star5(ctx, 0, -22, 11, '#fff3bf'); }); }
function icoBoneca(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.fillStyle = '#f783ac'; ctx.beginPath(); ctx.moveTo(-10, -14); ctx.lineTo(10, -14); ctx.lineTo(28, 40); ctx.lineTo(-28, 40); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fcdcc4'; ctx.fillRect(-14, 40, 8, 14); ctx.fillRect(6, 40, 8, 14);
  ell(ctx, 0, -32, 22, 24, '#8d5530'); circ(ctx, 0, -30, 17, '#fcdcc4'); circ(ctx, -6, -32, 2.4, '#222'); circ(ctx, 6, -32, 2.4, '#222');
  ctx.strokeStyle = '#c2255c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -25, 5, .2, PI - .2); ctx.stroke(); circ(ctx, 18, -44, 6, '#ffd43b'); }); }
/* moldura de quadro com conteudo recortado */
function moldura(ctx, x, y, w, h, fn, cor = '#b07a3a') { ctx.save(); shadowOn(ctx, 12, 4, .25); rr(ctx, x - w / 2, y - h / 2, w, h, 6); ctx.fillStyle = cor; ctx.fill(); shadowOff(ctx);
  rr(ctx, x - w / 2 + 10, y - h / 2 + 10, w - 20, h - 20, 3); ctx.fillStyle = '#fff8e6'; ctx.fill(); ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 + 10, y - h / 2 + 10, w - 20, h - 20); ctx.clip(); fn(); ctx.restore(); ctx.restore(); }
function icoTela(ctx, x, y, s, fn) { icoBase(ctx, x, y, s, () => { rr(ctx, -70, -48, 140, 92, 8); ctx.fillStyle = '#343a40'; ctx.fill(); rr(ctx, -62, -40, 124, 76, 4); ctx.fillStyle = '#d0ebff'; ctx.fill();
  ctx.fillStyle = '#495057'; ctx.fillRect(-8, 44, 16, 12); ctx.fillRect(-28, 54, 56, 6); if (fn) fn(); }); }
function icoMuseu(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.fillStyle = '#e9ecef'; ctx.beginPath(); ctx.moveTo(-70, -30); ctx.lineTo(0, -66); ctx.lineTo(70, -30); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 3; ctx.stroke();
  for (let i = 0; i < 5; i++) { ctx.fillStyle = '#f8f9fa'; ctx.fillRect(-56 + i * 26, -26, 14, 60); }
  ctx.fillStyle = '#ced4da'; ctx.fillRect(-72, 34, 144, 12); }); }
function icoEstatua(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.fillStyle = '#adb5bd'; rr(ctx, -34, 30, 68, 24, 3); ctx.fill(); ctx.fillStyle = '#ced4da';
  circ(ctx, 0, -46, 13, '#ced4da'); ctx.fillStyle = '#ced4da'; rr(ctx, -16, -32, 32, 62, 8); ctx.fill(); ctx.save(); ctx.translate(14, -26); ctx.rotate(-.9); rr(ctx, -5, -34, 10, 36, 5); ctx.fill(); ctx.restore(); }); }
function icoBerimbau(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.strokeStyle = '#8d5a35'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(70, 0, 80, PI * .72, PI * 1.28); ctx.stroke();
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(70 + Math.cos(PI * .72) * 80, Math.sin(PI * .72) * 80); ctx.lineTo(70 + Math.cos(PI * 1.28) * 80, Math.sin(PI * 1.28) * 80); ctx.stroke();
  circ(ctx, 8, 30, 18, '#e0a96d', '#8d5a35', 4); }); }
function icoJunina(ctx, x, y, s) { icoBase(ctx, x, y, s, () => {
  ctx.strokeStyle = '#495057'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-70, -50); ctx.quadraticCurveTo(0, -24, 70, -50); ctx.stroke();
  const C = ['#e03131', '#fab005', '#1c7ed6', '#2f9e44', '#e8590c', '#ae3ec9'];
  for (let i = 0; i < 6; i++) { const u = (i + .5) / 6, bx = -70 + u * 140, by = -50 + Math.sin(u * PI) * 13; ctx.fillStyle = C[i]; ctx.beginPath(); ctx.moveTo(bx - 9, by); ctx.lineTo(bx + 9, by); ctx.lineTo(bx + 9, by + 20); ctx.lineTo(bx, by + 13); ctx.lineTo(bx - 9, by + 20); ctx.fill(); }
  ctx.fillStyle = '#8d5a35'; [-1, 1].forEach(d => { ctx.save(); ctx.translate(0, 44); ctx.rotate(d * .5); ctx.fillRect(-30, -5, 60, 10); ctx.restore(); });
  ctx.fillStyle = '#f76707'; ctx.beginPath(); ctx.moveTo(-20, 40); ctx.quadraticCurveTo(-18, 6, 0, -6); ctx.quadraticCurveTo(18, 6, 20, 40); ctx.fill();
  ctx.fillStyle = '#ffd43b'; ctx.beginPath(); ctx.moveTo(-10, 40); ctx.quadraticCurveTo(-8, 18, 0, 10); ctx.quadraticCurveTo(8, 18, 10, 40); ctx.fill(); }); }
function icoPiramide(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { ctx.fillStyle = '#e0b878'; ctx.beginPath(); ctx.moveTo(-50, 30); ctx.lineTo(0, -40); ctx.lineTo(50, 30); ctx.fill(); ctx.fillStyle = '#c99a5a'; ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(50, 30); ctx.lineTo(14, 30); ctx.fill(); }); }
function icoZigurate(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { ['#c99a5a', '#d6aa6a', '#e0b878'].forEach((c, k) => { ctx.fillStyle = c; ctx.fillRect(-48 + k * 14, 30 - (k + 1) * 22, 96 - k * 28, 22); }); ctx.fillStyle = '#8d5a35'; ctx.fillRect(-6, 8, 12, 22); }); }
function icoPagode(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { for (let k = 0; k < 3; k++) { const w = 50 - k * 12, yy = 30 - k * 24; ctx.fillStyle = '#c92a2a'; ctx.fillRect(-w * .6, yy - 18, w * 1.2, 18); ctx.fillStyle = '#2b8a3e'; ctx.beginPath(); ctx.moveTo(-w, yy - 16); ctx.lineTo(w, yy - 16); ctx.lineTo(w * .6, yy - 26); ctx.lineTo(-w * .6, yy - 26); ctx.fill(); } }); }
function icoRelogio(ctx, x, y, r, t = 0) { ctx.save(); circ(ctx, x, y, r, '#fff', '#495057', r * .1); for (let i = 0; i < 12; i++) { const a = i * TAU / 12; ctx.fillStyle = '#495057'; ctx.fillRect(x + Math.cos(a) * r * .78 - 2, y + Math.sin(a) * r * .78 - 2, 4, 4); }
  ctx.strokeStyle = '#212529'; ctx.lineCap = 'round'; ctx.lineWidth = r * .09; const a1 = t * .5 - PI / 2, a2 = t * .05 - PI / 2;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a1) * r * .7, y + Math.sin(a1) * r * .7); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a2) * r * .45, y + Math.sin(a2) * r * .45); ctx.stroke(); circ(ctx, x, y, r * .08, '#e03131'); ctx.restore(); }
function icoOlho(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(0, -36, 40, 0); ctx.quadraticCurveTo(0, 36, -40, 0); ctx.fill(); ctx.strokeStyle = '#23314f'; ctx.lineWidth = 4; ctx.stroke(); circ(ctx, 0, 0, 14, '#1c7ed6'); circ(ctx, 0, 0, 6, '#111'); circ(ctx, 4, -4, 3, '#fff'); }); }
function icoOrelha(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { ctx.fillStyle = '#f4b183'; ctx.beginPath(); ctx.moveTo(-6, 36); ctx.quadraticCurveTo(-30, 30, -26, 0); ctx.quadraticCurveTo(-24, -38, 4, -38); ctx.quadraticCurveTo(30, -36, 26, -6); ctx.quadraticCurveTo(22, 14, 6, 20); ctx.quadraticCurveTo(4, 36, -6, 36); ctx.fill();
  ctx.strokeStyle = '#c47f3c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(2, -8, 13, PI * 1.1, PI * 2.3); ctx.stroke(); ctx.strokeStyle = '#a855f7'; [1, 2].forEach(k => { ctx.beginPath(); ctx.arc(30, -6, 10 + k * 10, -.6, .6); ctx.stroke(); }); }); }
function icoMao(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { ctx.fillStyle = '#f4b183'; rr(ctx, -24, -6, 48, 46, 16); ctx.fill(); [-18, -6, 6, 18].forEach((fx, i) => { rr(ctx, fx - 6, -40 + Math.abs(i - 1.5) * 6, 12, 44, 6); ctx.fill(); });
  ctx.save(); ctx.translate(-26, 10); ctx.rotate(-.7); rr(ctx, -6, -24, 12, 30, 6); ctx.fill(); ctx.restore(); }); }
function icoLivro(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { ctx.fillStyle = '#1c7ed6'; ctx.beginPath(); ctx.moveTo(0, -24); ctx.quadraticCurveTo(-30, -38, -54, -28); ctx.lineTo(-54, 32); ctx.quadraticCurveTo(-30, 22, 0, 36); ctx.quadraticCurveTo(30, 22, 54, 32); ctx.lineTo(54, -28); ctx.quadraticCurveTo(30, -38, 0, -24); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, -20); ctx.quadraticCurveTo(-26, -32, -48, -24); ctx.lineTo(-48, 26); ctx.quadraticCurveTo(-26, 18, 0, 30); ctx.quadraticCurveTo(26, 18, 48, 26); ctx.lineTo(48, -24); ctx.quadraticCurveTo(26, -32, 0, -20); ctx.fill();
  ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40, -12 + i * 10); ctx.lineTo(-8, -8 + i * 10); ctx.moveTo(8, -8 + i * 10); ctx.lineTo(40, -12 + i * 10); ctx.stroke(); } }); }
function icoAnuncio(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { rr(ctx, -70, -60, 140, 120, 10); ctx.fillStyle = '#fff3bf'; ctx.fill(); ctx.strokeStyle = '#e8590c'; ctx.lineWidth = 6; ctx.stroke();
  txt(ctx, 'COMPRE', 0, -32, 26, '#e8590c'); txt(ctx, 'JÁ!', 0, -2, 30, '#c92a2a'); star5(ctx, 0, 34, 20, '#fcc419'); }); }
