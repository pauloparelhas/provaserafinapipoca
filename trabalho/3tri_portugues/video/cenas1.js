/* cenas1.js — titulo, contos de fadas, Chapeuzinho. */

function bubble(ctx, x, y, s, k, tx, ty, o = {}) {
  if (k <= 0) return;
  const size = o.size || 30; ctx.font = `900 ${size}px ${FONT}`;
  const lines = s.split('\n'), w = Math.max(...lines.map(l => ctx.measureText(l).width)) + size * 1.2, h = lines.length * size * 1.2 + size * .8;
  popAt(ctx, k, tx, ty, () => {
    shadowOn(ctx, 14, 5, .25);
    ctx.beginPath(); rr(ctx, x - w / 2, y - h / 2, w, h, 22); ctx.fillStyle = o.bg || '#fff'; ctx.fill(); shadowOff(ctx);
    ctx.beginPath(); const bx = clamp(tx, x - w / 2 + 30, x + w / 2 - 30), by = ty < y ? y - h / 2 : y + h / 2;
    ctx.moveTo(bx - 16, by); ctx.lineTo(tx, ty); ctx.lineTo(bx + 16, by); ctx.fill();
    lines.forEach((l, i) => txt(ctx, l, x, y - h / 2 + size * .4 + size * 1.2 * (i + .5) + 2, size, o.color || '#23314f'));
  });
}
function lady(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ell(ctx, 0, 2, 40, 9, 'rgba(0,0,0,.2)');
  ctx.beginPath(); ctx.moveTo(-22, -128); ctx.lineTo(22, -128); ctx.lineTo(40, 0); ctx.lineTo(-40, 0); ctx.closePath(); ctx.fillStyle = o.dress || '#ae3ec9'; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillRect(-26, -88, 52, 34);
  circ(ctx, 0, -152, 27, '#f6d2ad');
  const hair = o.hair || '#5c3d2e';
  ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, -158, 28, PI, TAU); ctx.fill(); circ(ctx, 0, -186, 13, hair);
  circ(ctx, -9, -150, 3.4, '#222'); circ(ctx, 9, -150, 3.4, '#222');
  if (o.old) { circ(ctx, -9, -150, 8, null, '#c8a24a', 2.5); circ(ctx, 9, -150, 8, null, '#c8a24a', 2.5); }
  ctx.strokeStyle = '#a3402f'; ctx.lineWidth = 2.6; ctx.beginPath();
  if (o.angry) { ctx.moveTo(-7, -136); ctx.quadraticCurveTo(0, -142, 7, -136); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = '#333'; ctx.beginPath(); ctx.moveTo(-16, -162); ctx.lineTo(-4, -158); ctx.moveTo(16, -162); ctx.lineTo(4, -158); ctx.stroke(); }
  else { ctx.arc(0, -142, 6, .3, PI - .3); ctx.stroke(); }
  ctx.restore();
}
function nightSky(ctx, t, a = '#1b1f4b', b = '#5b3f8c') {
  sky(ctx, a, b);
  for (let i = 0; i < 70; i++) {
    const x = (i * 197.3) % W, y = (i * 83.7) % 420, tw = .5 + .5 * Math.sin(t * 2 + i);
    circ(ctx, x, y, 1.2 + (i % 3) * .6, `rgba(255,255,230,${.35 + .5 * tw})`);
  }
}

/* ---------- ABERTURA ---------- */
SCENES.titulo = (ctx, lt, S) => {
  sky(ctx, '#ffd6e0', '#fff1c1');
  for (let i = 0; i < 4; i++) cloud(ctx, ((i * 360 + lt * 22) % (W + 300)) - 150, 90 + (i % 2) * 70, .9 + (i % 2) * .3, '#fff', .9);
  grassHill(ctx, 560, '#8ce99a', 18, 0); grassHill(ctx, 600, '#69db7c', 14, 2);
  for (let i = 0; i < 12; i++) {
    const x = (i * 113 + Math.sin(lt + i) * 30) % W, y = ((lt * 60 + i * 97) % 760) - 40;
    ctx.save(); ctx.globalAlpha = .8; withT(ctx, x, y, 1, lt + i, () => mapleLeaf(ctx, 0, 0, 14, i % 2 ? '#e03131' : '#f08c00')); ctx.restore();
  }
  const k1 = pop(lt, .15, .6), k2 = pop(lt, .55, .6);
  popAt(ctx, k1, 560, 250, () => txtOut(ctx, 'Português', 560, 250, 120, '#c92a2a', '#ffffff', 16));
  popAt(ctx, k2, 560, 370, () => txtOut(ctx, '— Era uma vez e Invenções', 560, 370, 54, '#2b2f6b', '#ffffff', 12));
  bear(ctx, 1080, 620, 1.05, { t: lt, wave: ap(lt, .4, .5) });
};

/* ---------- 1. CONTOS DE FADAS ---------- */
SCENES.conto = (ctx, lt, S) => {
  nightSky(ctx, lt, '#24215c', '#7048a8');
  grassHill(ctx, 600, '#2b6a4a', 10, lt * .1);
  sceneTag(ctx, 'Contos de fadas', ap(lt, .2));
  const bk = easeOut(ap(lt, 0, .8));
  ctx.save(); ctx.globalAlpha = bk; ctx.translate(0, (1 - bk) * 40);
  openBook(ctx, 680, 320, 860, 420);
  // pagina esquerda
  chip(ctx, 'começo', 470, 165, 22, '#7048e8', '#fff', pop(lt, S.w('era')));
  popAt(ctx, pop(lt, S.w('era'), .7), 470, 245, () => {
    ctx.font = `italic 700 52px Georgia, serif`; ctx.textAlign = 'center'; ctx.fillStyle = '#5f3dc4'; ctx.fillText('Era uma vez...', 470, 252);
  });
  ctx.strokeStyle = 'rgba(95,61,196,.25)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(320, 300); ctx.lineTo(620, 300); ctx.stroke();
  chip(ctx, 'final', 470, 360, 22, '#e64980', '#fff', pop(lt, S.w('final')));
  popAt(ctx, pop(lt, S.w('viveram'), .7), 470, 430, () => {
    ctx.font = `italic 700 32px Georgia, serif`; ctx.textAlign = 'center'; ctx.fillStyle = '#c2255c';
    ctx.fillText('...e viveram felizes', 470, 420); ctx.fillText('para sempre.', 470, 460);
  });
  // pagina direita: elementos do conto
  const cells = [
    ['mocinho', 'mocinho', (x, y) => girl(ctx, x, y + 34, .5, { t: lt })],
    ['vilão', 'vilão', (x, y) => wolf(ctx, x - 20, y + 30, .42, { t: lt })],
    ['floresta', 'lugar', (x, y) => { tree(ctx, x - 34, y + 30, .38); castle(ctx, x + 30, y + 30, .2); }],
    ['magia', 'magia', (x, y) => { for (let i = 0; i < 5; i++) sparkle(ctx, x + Math.cos(lt * 2 + i * 1.26) * 30, y - 10 + Math.sin(lt * 2 + i * 1.26) * 22, 10 + (i % 2) * 6, i % 2 ? '#fcc419' : '#be4bdb', lt + i); star5(ctx, x, y - 10, 20, '#fab005'); }],
    ['problema', 'problema', (x, y) => { circ(ctx, x, y - 6, 34, '#ff6b6b'); txt(ctx, '!', x, y - 4, 48, '#fff'); }],
    ['final', 'final feliz', (x, y) => { const p = 1 + Math.sin(lt * 5) * .06; withT(ctx, x, y - 6, p, 0, () => { ctx.fillStyle = '#f06595'; ctx.beginPath(); ctx.moveTo(0, 26); ctx.bezierCurveTo(-46, -6, -24, -44, 0, -20); ctx.bezierCurveTo(24, -44, 46, -6, 0, 26); ctx.fill(); }); }],
  ];
  cells.forEach(([wd, label, draw], i) => {
    const cx = 790 + (i % 2) * 190, cy = 170 + Math.floor(i / 2) * 120, k = pop(lt, S.w(wd));
    popAt(ctx, k, cx, cy, () => { draw(cx, cy); txt(ctx, label, cx, cy + 50, 24, '#3b2f6b'); });
  });
  ctx.restore();
  bear(ctx, 130, 600, .72, { t: lt, talk: S.talk(lt) * .0, look: 1, wave: ap(lt, S.w('viveram'), .4) * (1 - ap(lt, S.w('sempre') + 1.2, .4)) });
};

/* ---------- 2. CHAPEUZINHO VERMELHO ---------- */
function forest(ctx, lt) {
  sky(ctx, '#a5d8ff', '#e7f5ff');
  cloud(ctx, 200 + lt * 8, 90, .8); cloud(ctx, 820 + lt * 5, 70, .7);
  grassHill(ctx, 380, '#8ce99a', 24, 1);
  for (let i = 0; i < 9; i++) pine(ctx, 40 + i * 150, 420 + (i % 2) * 14, .7 + (i % 3) * .1, i % 2 ? '#2b8a3e' : '#237032');
  grassHill(ctx, 470, '#69db7c', 10, 3);
  // caminho
  ctx.fillStyle = '#e9c46a'; ctx.beginPath(); ctx.moveTo(0, 560); ctx.quadraticCurveTo(640, 470, W, 540); ctx.lineTo(W, 600); ctx.quadraticCurveTo(640, 530, 0, 620); ctx.fill();
  ctx.fillStyle = '#51cf66'; ctx.fillRect(0, 610, W, 110);
}
SCENES.chapeu = (ctx, lt, S) => {
  const tIn = S.f(4) - .35, kIn = easeInOut(ap(lt, tIn, .7));
  // --- floresta ---
  if (kIn < 1) {
    ctx.save(); ctx.globalAlpha = 1 - kIn;
    forest(ctx, lt);
    cottage(ctx, 110, 560, .7);
    bubble(ctx, 250, 230, 'Não saia\ndo caminho!', pop(lt, S.w('avisou')) * (1 - ap(lt, S.f(2), .3)), 140, 380, { size: 28 });
    tree(ctx, 1010, 560, 1.1, '#37b24d', '#2f9e44');
    const gx = lerp(250, 620, easeInOut(ap(lt, .4, S.fe(0) - .4)));
    const walking = lt < S.fe(0) || (lt > S.f(2) - 1 && lt < S.f(3));
    const gx2 = gx + 120 * easeInOut(ap(lt, S.f(2) - .8, 2.2));
    girl(ctx, gx2, 580, 1.05, { t: lt, walk: walking });
    chip(ctx, 'vovó doente', 860, 200, 26, '#fff', '#c92a2a', pop(lt, S.w('vovó')) * (1 - ap(lt, S.f(1), .3)));
    // lobo
    const wIn = pop(lt, S.w('lobo')), run = ap(lt, S.w('correu'), 2.0);
    if (wIn > 0) {
      const wx = lerp(1000, 1500, easeInOut(run)) , wy = 560 - (1 - clamp(wIn)) * 30;
      ctx.save(); ctx.globalAlpha *= clamp(wIn * 1.5); wolf(ctx, wx, wy, .95, { t: lt, run: run > 0 && run < 1, flip: false }); ctx.restore();
      tree(ctx, 1110, 600, .7, '#2f9e44', '#2b8a3e');
    }
    bear(ctx, 1185, 610, .5, { t: lt, look: -1, jump: Math.max(0, Math.sin(clamp((lt - S.w('lobo')) / .5) * PI)) });
    // atalho tracejado
    const ak = ap(lt, S.w('atalho') - .2, .8);
    if (ak > 0 && lt < tIn + .7) {
      ctx.save(); ctx.setLineDash([18, 14]); ctx.lineDashOffset = -lt * 40; ctx.strokeStyle = '#e8590c'; ctx.lineWidth = 7; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(1000, 520); ctx.quadraticCurveTo(1130, 470, lerp(1000, 1270, ak), 430); ctx.stroke(); ctx.restore();
      chip(ctx, 'atalho', 1130, 420, 26, '#e8590c', '#fff', pop(lt, S.w('atalho')));
    }
    ctx.restore();
  }
  // --- casa da vovo ---
  if (kIn > 0) {
    ctx.save(); ctx.globalAlpha = kIn;
    sky(ctx, '#ffe8cc', '#ffd8a8');
    ctx.fillStyle = '#e8a87c'; ctx.fillRect(0, 470, W, 250);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; for (let i = 0; i < 16; i++) ctx.fillRect(i * 86, 0, 40, 470);
    rr(ctx, 930, 90, 200, 160, 10); ctx.fillStyle = '#a5d8ff'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#8d5a35'; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(1030, 90); ctx.lineTo(1030, 250); ctx.moveTo(930, 170); ctx.lineTo(1130, 170); ctx.stroke();
    const out = ap(lt, S.w('caçador') + .2, .9);
    bed(ctx, 640, 540, 1);
    const eyes = 1 + .9 * easeBack(ap(lt, S.w('olhos'), .5)) * (1 - ap(lt, S.w('boca') - .4, .4) * .5);
    const mouth = easeBack(ap(lt, S.w('boca'), .4)) * .55 + ap(lt, S.w('comer'), .3) * .45;
    ctx.save(); ctx.translate(lerp(0, 700, easeInOut(out)), 0); ctx.globalAlpha *= 1 - out;
    wolfFace(ctx, 560, 380, .95, { eyes, mouth, ear: 1 });
    ctx.restore();
    const gk = ap(lt, tIn + .3, .6);
    girl(ctx, lerp(150, 220, gk), 600, 1.15, { t: lt });
    bubble(ctx, 330, 160, 'Que olhos grandes!', pop(lt, S.w('olhos') - .4) * (1 - ap(lt, S.f(7) - .2, .3)), 230, 400, { size: 30 });
    bubble(ctx, 820, 150, 'É para te ver melhor!', pop(lt, S.f(6)) * (1 - ap(lt, S.f(7) - .2, .3)), 640, 290, { size: 30 });
    bubble(ctx, 330, 160, 'Que boca grande!', pop(lt, S.f(7)) * (1 - ap(lt, S.w('caçador'), .3)), 230, 400, { size: 30 });
    bubble(ctx, 820, 150, 'É para te devorar!', pop(lt, S.f(8)) * (1 - ap(lt, S.w('caçador'), .3)), 640, 290, { size: 34, color: '#c92a2a' });
    bear(ctx, 1190, 615, .48, { t: lt, look: -1, jump: Math.max(0, Math.sin(clamp((lt - S.w('comer')) / .5) * PI)), wave: ap(lt, S.w('salvou'), .4) });
    const hk = ap(lt, S.w('caçador') - .2, .8);
    if (hk > 0) {
      hunter(ctx, lerp(1400, 950, easeOut(hk)), 610, 1.05, { flip: true });
      ctx.save(); ctx.globalAlpha *= ap(lt, S.w('salvou') - .3, .5); lady(ctx, 600, 600, 1.1, { hair: '#dee2e6', dress: '#9775fa', old: true }); ctx.restore();
      for (let i = 0; i < 4; i++) { const k = ap(lt, S.w('salvou') + i * .15, .5); if (k > 0) sparkle(ctx, 300 + i * 70, 300 - k * 60, 14, '#f06595', lt * 2 + i); }
    }
    ctx.restore();
  }
  sceneTag(ctx, 'Chapeuzinho Vermelho', ap(lt, .2), '#fff', 'rgba(20,24,48,.55)');
};
