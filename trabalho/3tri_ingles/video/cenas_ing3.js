/* cenas_ing3.js — T3 circle story (If You Give a Mouse a Cookie); T4 cause and effect. */

function ellPt(cx, cy, rx, ry, a) { return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; }
function ring(ctx, cx, cy, rx, ry, k, col = 'rgba(255,255,255,.85)', lw = 8) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.setLineDash([2, 18]);
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, -PI / 2, -PI / 2 + TAU * clamp(k)); ctx.stroke(); ctx.restore();
}

/* 10. CIRCLE STORY */
SCENES.circle = (ctx, lt, S) => {
  artBg(ctx, 'nuvens', lt, { pan: 10 });
  sceneTag(ctx, 'Circle story', ap(lt, .1, .4));
  const cx = 640, cy = 320, rx = 330, ry = 190;
  ring(ctx, cx, cy, rx, ry, ap(lt, .3, 1.6), 'rgba(28,126,214,.75)', 9);
  kw(ctx, 'circle story', cx, 285, 48, pop(lt, S.w('circle') - .1), '#1c7ed6', '#fff');
  kw(ctx, 'the same place, or the same thing', cx, 360, 26, pop(lt, S.w('same') - .1), '#fff', '#1864ab', { border: '#74c0fc' });
  /* acontecimentos no meio do caminho */
  const kE = S.w('events') - .1;
  for (let i = 0; i < 6; i++) {
    const a = -PI / 2 + (i + 1) * TAU / 7, [x, y] = ellPt(cx, cy, rx, ry, a), k = pop(lt, kE + i * .14);
    popAt(ctx, k, x, y, () => { circ(ctx, x, y, 24, '#ffd43b', '#e67700', 4); txt(ctx, String(i + 1), x, y + 1, 26, '#7a4a00'); });
  }
  kw(ctx, 'many events in the middle', cx, 432, 26, pop(lt, S.w('events') - .1), '#fff3bf', '#7a4a00', { border: '#fab005' });
  /* o mesmo lugar: comeca e termina no topo */
  const [tx, ty] = ellPt(cx, cy, rx, ry, -PI / 2);
  kw(ctx, 'beginning', tx - 120, ty, 30, pop(lt, S.w('begins') - .1), '#d3f9d8', '#2b8a3e', { border: '#40c057', minW: 200 });
  kw(ctx, 'end', tx + 110, ty, 30, pop(lt, S.w('ends') - .1), '#ffe3e3', '#c92a2a', { border: '#fa5252', minW: 120 });
  circ(ctx, tx, ty, 16 * pop(lt, S.w('begins') - .1), '#2f9e44', '#fff', 4);
  /* o Pip da a volta e volta ao comeco */
  const t0 = S.w('comes') - .2, t1 = S.w('beginning', 1) - .2;
  let q = -1;
  if (lt > t0 && lt < t0 + 3) q = (lt - t0) / 3;
  else if (lt > t1 && lt < t1 + 4) q = (lt - t1) / 4;
  if (q >= 0) {
    const a = -PI / 2 + TAU * easeInOut(q), [x, y] = ellPt(cx, cy, rx, ry, a);
    pipD(ctx, x, y + 28, 'fly', lt, Math.cos(a + PI / 2) >= 0 ? 1 : -1, .95);
  }
  if (q < 0 && lt > t0 + 3) { /* depois da volta: brilho no topo */
    for (let i = 0; i < 5; i++) { const a = lt * 3 + i * TAU / 5; sparkle(ctx, tx + Math.cos(a) * 34, ty + Math.sin(a) * 26, 8, '#ffd43b', a); }
  }
};

/* 11. IF YOU GIVE A MOUSE A COOKIE */
const MOUSE_EV = [['cookie', 1], ['milk', 0], ['straw', 0], ['napkin', 0], ['mirror', 0], ['scissors', 0], ['broom', 0], ['nap', 0], ['story', 2], ['drawing', 0], ['pen', 0], ['tape', 0], ['milk', 1]];
SCENES.mouse = (ctx, lt, S) => {
  artBg(ctx, 'biscoito', lt, { fb: 'biblioteca', pan: 6 });
  sceneTag(ctx, 'If You Give a Mouse a Cookie', ap(lt, .1, .4));
  const tB = S.f(1) - .3;
  const aA = ph(lt, 0, tB);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    const k = pop(lt, .2, .6);
    popAt(ctx, k, 560, 310, () => {
      shadowOn(ctx, 22, 8, .35); rr(ctx, 370, 90, 380, 450, 20); ctx.fillStyle = '#4dabf7'; ctx.fill(); shadowOff(ctx);
      rr(ctx, 370, 90, 30, 450, 10); ctx.fillStyle = '#1c7ed6'; ctx.fill();
      rr(ctx, 418, 112, 312, 120, 14); ctx.fillStyle = '#fffaf0'; ctx.fill();
      lines(ctx, 'If You Give a Mouse\na Cookie', 574, 172, 29, '#c92a2a');
      mor(ctx, 'mouse', 560, 470, lt, 1, 1.45, false); cookie(ctx, 660, 400, 34);
      txt(ctx, 'Laura Numeroff', 574, 512, 26, '#fff', 'center', 900);
    });
    kw(ctx, 'a circle story', 970, 300, 40, pop(lt, S.w('circle') - .1), '#1c7ed6', '#fff');
    kw(ctx, 'by Laura Numeroff', 970, 380, 28, pop(lt, S.w('laura') - .1), '#fff', '#1864ab', { border: '#74c0fc' });
    ctx.restore();
  }
  const aB = ph(lt, tB);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    const cx = 640, cy = 322, rx = 480, ry = 210, n = MOUSE_EV.length;
    ctx.save(); ctx.globalAlpha *= .85; rr(ctx, 120, 95, 1040, 460, 40); ctx.fillStyle = 'rgba(255,250,240,.82)'; ctx.fill(); ctx.restore();
    const T = MOUSE_EV.map(([w, i]) => S.w(w, i) - .1);
    const tEnd = S.w('cookie', 2) - .1;
    /* ligacoes */
    for (let i = 0; i < n; i++) {
      const a0 = -PI / 2 + i * TAU / n, a1 = -PI / 2 + (i + 1) * TAU / n, k = ap(lt, i + 1 < n ? T[i + 1] - .1 : tEnd - .1, .4);
      if (k <= 0) continue;
      const [x0, y0] = ellPt(cx, cy, rx, ry, a0 + .12), [x1, y1] = ellPt(cx, cy, rx, ry, a1 - .12);
      arrowTo(ctx, x0, y0, x1, y1, i + 1 < n ? '#e8590c' : '#2f9e44', 5, k);
    }
    let cur = -1; T.forEach((t, i) => { if (lt >= t) cur = i; }); if (lt >= tEnd) cur = 0;
    for (let i = 0; i < n; i++) {
      const a = -PI / 2 + i * TAU / n, [x, y] = ellPt(cx, cy, rx, ry, a), k = pop(lt, T[i]);
      if (i === 0) {
        const glow = lt >= tEnd ? 1 + .08 * Math.sin((lt - tEnd) * 8) : 1;
        popAt(ctx, k * glow, x, y, () => { circ(ctx, x, y, 46, cur === 0 ? '#ffd43b' : '#fff', '#e67700', 5); cookie(ctx, x, y, 34); });
        kw(ctx, 'cookie', x + 120, y, 28, k, cur === 0 ? '#ffd43b' : '#fff', '#7a4a00', { border: '#e67700' });
      } else kw(ctx, MOUSE_EV[i][0], x, y, 26, k, cur === i ? '#ffd43b' : '#fff', '#23314f', { border: cur === i ? '#e67700' : '#adb5bd', minW: 96 });
    }
    mor(ctx, 'mouse', 640, 470, lt, 1, 1.5, S.talk(lt) > 0);
    kw(ctx, 'starts with a cookie', 640, 200, 26, pop(lt, S.w('starts') - .1) * (lt < S.f(2) - .2 ? 1 : 0), '#d3f9d8', '#2b8a3e', { border: '#40c057' });
    kw(ctx, 'ends with a cookie again!', 640, 200, 26, pop(lt, S.w('ends') - .1), '#ffe3e3', '#c92a2a', { border: '#fa5252' });
    ctx.restore();
  }
};

/* 12. CAUSE AND EFFECT */
function domino(ctx, x, y, ang, col) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); rr(ctx, -9, -64, 18, 64, 4); ctx.fillStyle = col; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.stroke(); circ(ctx, 0, -46, 3, '#fff'); circ(ctx, 0, -18, 3, '#fff'); ctx.restore();
}
SCENES.cause = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt, { cam: 4200 });
  sceneTag(ctx, 'Cause and effect', ap(lt, .1, .4));
  const kc = pop(lt, S.w('cause') - .1), ke = pop(lt, S.w('effect') - .1);
  board(ctx, 90, 120, 480, 280, clamp(kc), 'rgba(255,244,230,.95)', '#fd7e14');
  board(ctx, 710, 120, 480, 280, clamp(ke), 'rgba(231,245,255,.95)', '#339af0');
  kw(ctx, 'CAUSE', 330, 170, 46, kc, '#fd7e14', '#fff');
  kw(ctx, 'EFFECT', 950, 170, 46, ke, '#339af0', '#fff');
  arrowTo(ctx, 590, 260, 690, 260, '#495057', 9, ap(lt, S.w('makes') - .1, .5));
  const ki = pop(lt, S.w('if') - .1, .6), kt = pop(lt, S.w('then') - .1, .6);
  popAt(ctx, ki, 330, 290, () => txtOut(ctx, 'If…', 330, 290, 96, '#d9480f', '#fff', 10));
  popAt(ctx, kt, 950, 290, () => txtOut(ctx, 'Then…', 950, 290, 96, '#1864ab', '#fff', 10));
  const k1 = pop(lt, S.w('first') - .1), k2 = pop(lt, S.w('then', 1) - .1);
  popAt(ctx, k1, 140, 140, () => { circ(ctx, 140, 140, 32, '#d9480f', '#fff', 5); txt(ctx, '1', 140, 142, 36, '#fff'); });
  popAt(ctx, k2, 760, 140, () => { circ(ctx, 760, 140, 32, '#1864ab', '#fff', 5); txt(ctx, '2', 760, 142, 36, '#fff'); });
  /* dominos: uma coisa faz a outra acontecer */
  const td = S.w('makes') - .1, cols = ['#fd7e14', '#fab005', '#40c057', '#339af0', '#7048e8', '#e64980'];
  board(ctx, 380, 420, 520, 130, ap(lt, .4, .4), 'rgba(255,255,255,.85)');
  for (let i = 0; i < 6; i++) {
    const k = clamp((lt - td - i * .22) / .3), ang = easeOut(k) * (i < 5 ? .62 : 1.2);
    domino(ctx, 450 + i * 72, 532, ang * ap(lt, .4, .4), cols[i]);
  }
};

/* 13. IF... THEN... */
function juiceD(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-28, -44); ctx.lineTo(28, -44); ctx.lineTo(22, 40); ctx.lineTo(-22, 40); ctx.closePath(); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-25, -20); ctx.lineTo(25, -20); ctx.lineTo(22, 40); ctx.lineTo(-22, 40); ctx.closePath(); ctx.fillStyle = '#ff922b'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = '#adb5bd'; ctx.beginPath(); ctx.moveTo(-28, -44); ctx.lineTo(-22, 40); ctx.lineTo(22, 40); ctx.lineTo(28, -44); ctx.stroke();
  ctx.strokeStyle = '#e03131'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(8, -10); ctx.lineTo(20, -66); ctx.stroke();
  circ(ctx, 30, -40, 13, '#fab005'); ctx.restore();
}
const IFTHEN = [
  ['If Ash goes on adventure…', 'Then he will find many Pokémon to catch.',
    (ctx, lt) => { hero(ctx, 'theo', 300, 205, 'walk', lt, 1, 1.15); ctx.strokeStyle = '#8d5a35'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(360, 205); ctx.lineTo(360, 120); ctx.stroke(); kw(ctx, 'adventure', 410, 128, 20, 1, '#fff3bf', '#7a4a00'); },
    (ctx, lt) => { for (let i = 0; i < 3; i++) pokeball(ctx, 880 + i * 70, 160 + Math.sin(lt * 4 + i) * 6, 26); }],
  ['If Cinderella goes to the ball…', 'Then she will lose one of her slippers.',
    (ctx, lt) => { withT(ctx, 330, 210, 1, 0, () => castle(ctx, 0, 0, .22)); musicNote(ctx, 430, 120 + Math.sin(lt * 3) * 6, .8, '#7048e8'); musicNote(ctx, 230, 140 + Math.cos(lt * 3) * 6, .7, '#e64980', true); },
    (ctx, lt) => { slipper(ctx, 950, 165, 1.1); }],
  ['If you read books every day…', 'Then you will be more intelligent and learn new things.',
    (ctx, lt) => { openBook(ctx, 330, 160, 220, 100, { cover: '#2f9e44' }); },
    (ctx, lt) => { withT(ctx, 950, 170, .75, 0, () => bulb(ctx, 0, 0, 1, .6 + .4 * Math.sin(lt * 4))); }],
  ['If you give a dog a donut…', 'Then he\'ll want to drink some juice.',
    (ctx, lt) => { dogD(ctx, 290, 210, 1.15, lt); donutD(ctx, 420, 160, 36); },
    (ctx, lt) => { juiceD(ctx, 950, 170, 1.05); }],
];
SCENES.ifthen = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt, { cam: 5000, dim: .1 });
  sceneTag(ctx, 'If… Then…', ap(lt, .1, .4));
  IFTHEN.forEach(([c, e, ic, ie], i) => {
    const t0 = i === 0 ? 0 : S.f(2 * i) - .25, t1 = i < 3 ? S.f(2 * i + 2) - .05 : 1e9;
    const a = ph(lt, t0, t1);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    const kc = pop(lt, S.f(2 * i) - .15), ke = pop(lt, S.f(2 * i + 1) - .15);
    popAt(ctx, kc, 330, 330, () => {
      board(ctx, 70, 85, 520, 445, 1, 'rgba(255,244,230,.95)', '#fd7e14');
      ic(ctx, lt); kw(ctx, 'CAUSE', 330, 265, 30, 1, '#fd7e14', '#fff');
      wrapC(ctx, c, 330, 400, 460, 38, '#9c3600');
    });
    arrowTo(ctx, 600, 330, 680, 330, '#495057', 9, ap(lt, S.f(2 * i + 1) - .2, .4));
    popAt(ctx, ke, 950, 330, () => {
      board(ctx, 690, 85, 520, 445, 1, 'rgba(231,245,255,.95)', '#339af0');
      ie(ctx, lt); kw(ctx, 'EFFECT', 950, 265, 30, 1, '#339af0', '#fff');
      wrapC(ctx, e, 950, 400, 460, 38, '#0b4f8a');
    });
    for (let j = 0; j < 4; j++) circ(ctx, 595 + j * 30, 555, 8, j === i ? '#ffd43b' : 'rgba(255,255,255,.6)');
    ctx.restore();
  });
};
