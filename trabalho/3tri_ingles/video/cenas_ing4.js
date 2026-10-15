/* cenas_ing4.js — T5 poetry x poem, elements of a poem, rhyme/rhythm/imagery; recap. */

function bracket(ctx, x, y0, y1, k, col = '#7048e8') {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= clamp(k); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const m = (y0 + y1) / 2; ctx.beginPath(); ctx.moveTo(x, y0); ctx.quadraticCurveTo(x + 16, y0, x + 16, y0 + 14); ctx.lineTo(x + 16, m - 10);
  ctx.quadraticCurveTo(x + 16, m, x + 28, m); ctx.quadraticCurveTo(x + 16, m, x + 16, m + 10); ctx.lineTo(x + 16, y1 - 14); ctx.quadraticCurveTo(x + 16, y1, x, y1); ctx.stroke();
  ctx.restore();
}
function thought(ctx, x, y, w, h, k) {
  if (k <= 0) return;
  popAt(ctx, k, x, y, () => {
    shadowOn(ctx, 18, 6, .25); ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, TAU); ctx.fill();
    for (let i = 0; i < 10; i++) { const a = i * TAU / 10; circ(ctx, x + Math.cos(a) * w * .47, y + Math.sin(a) * h * .45, h * .2, '#fff'); }
    circ(ctx, x - w * .42, y + h * .62, 16, '#fff'); circ(ctx, x - w * .52, y + h * .82, 9, '#fff'); shadowOff(ctx);
  });
}

/* 14. POETRY AND POEM */
SCENES.poetry = (ctx, lt, S) => {
  artBg(ctx, 'biblioteca', lt, { pan: 6 });
  sceneTag(ctx, 'Poetry and poem', ap(lt, .1, .4));
  const k1 = pop(lt, S.w('poetry') - .1), k2 = pop(lt, S.w('poem') - .1);
  popAt(ctx, k1, 340, 320, () => {
    board(ctx, 90, 95, 500, 450, 1, 'rgba(243,240,255,.95)', '#9775fa');
    kw(ctx, 'poetry', 340, 150, 52, 1, '#7048e8', '#fff');
    mor(ctx, 'bard', 300, 470, lt, 1, 1.35, S.talk(lt) > 0 && lt < S.f(1));
    for (let i = 0; i < 4; i++) musicNote(ctx, 410 + i * 40, 300 - ((lt * 30 + i * 25) % 90), .6, ['#7048e8', '#e64980', '#1c7ed6', '#2f9e44'][i], i % 2);
    for (let i = 0; i < 5; i++) sparkle(ctx, 140 + i * 95, 230 + (i % 2) * 30, 9, '#fab005', lt + i);
  });
  kw(ctx, 'the full art', 340, 510, 34, pop(lt, S.w('art') - .1), '#fff', '#5f3dc4', { border: '#9775fa' });
  popAt(ctx, k2, 940, 320, () => {
    board(ctx, 690, 95, 500, 450, 1, 'rgba(255,250,240,.96)', '#fab005');
    kw(ctx, 'poem', 940, 150, 52, 1, '#e67700', '#fff');
    withT(ctx, 940, 330, 1, -.04, () => {
      shadowOn(ctx, 12, 4, .2); rr(ctx, -130, -110, 260, 230, 10); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx);
      ctx.fillStyle = '#495057'; ctx.fillRect(-60, -88, 120, 12);
      [[-80, 70], [-80, 90], [-80, 60], [-80, 84], [-80, 66], [-80, 92]].forEach(([x0, w], i) => { ctx.fillStyle = '#adb5bd'; ctx.fillRect(x0, -50 + i * 26 + (i > 2 ? 18 : 0), w + 40, 9); });
    });
  });
  kw(ctx, 'the text, on the paper', 940, 510, 32, pop(lt, S.w('text') - .1), '#fff', '#a35200', { border: '#fab005' });
};

/* 15. ELEMENTS OF A POEM */
SCENES.elements = (ctx, lt, S) => {
  artBg(ctx, 'biblioteca', lt, { pan: 6, dim: .25 });
  sceneTag(ctx, 'Elements of a poem', ap(lt, .1, .4));
  const kP = pop(lt, S.w('look') - .1, .6);
  const kT = ap(lt, S.w('title') - .1, .4), kA = ap(lt, S.w('author') - .1, .4);
  const tL = S.w('line') - .1, tF = S.w('four') - .1, tS = S.w('stanza') - .1, tS2 = S.w('stanzas') - .1;
  const lineHl = [0, 1, 2, 3].map(i => lt < tS ? ap(lt, tL + i * .45, .25) : clamp(1 - (lt - tS) / .4));
  popAt(ctx, kP, 370, 330, () => poemPaper(ctx, lt, 1, { titleHl: kT > .5, authHl: kA > .5, lineHl }));
  /* numeros das linhas */
  for (let i = 0; i < 4; i++) { const k = pop(lt, tF + i * .2); popAt(ctx, k, 150, POEM_Y[i], () => { circ(ctx, 150, POEM_Y[i], 17, '#e8590c'); txt(ctx, String(i + 1), 150, POEM_Y[i] + 1, 20, '#fff'); }); }
  bracket(ctx, 600, POEM_Y[0] - 26, POEM_Y[1] + 26, ap(lt, tS, .4)); bracket(ctx, 600, POEM_Y[2] - 26, POEM_Y[3] + 26, ap(lt, tS2, .4), '#1c7ed6');
  const tB = S.f(6) - .3, aL = ph(lt, 0, tB);
  if (aL > 0) {
    ctx.save(); ctx.globalAlpha *= aL;
    board(ctx, 760, 100, 470, 420, ap(lt, S.w('title') - .3, .4), 'rgba(20,16,40,.55)');
    kw(ctx, 'title', 880, 152, 36, pop(lt, S.w('title') - .1), '#e8590c', '#fff', { minW: 170 });
    arrowTo(ctx, 790, 152, 545, 152, '#e8590c', 6, kT);
    kw(ctx, 'author', 880, 222, 36, pop(lt, S.w('author') - .1), '#7048e8', '#fff', { minW: 170 });
    arrowTo(ctx, 790, 216, 500, 204, '#7048e8', 6, kA);
    kw(ctx, 'line', 880, 300, 36, pop(lt, tL), '#fff3bf', '#a35200', { border: '#fab005', minW: 170 });
    kw(ctx, '4 lines', 1090, 300, 36, pop(lt, tF), '#e8590c', '#fff');
    kw(ctx, 'stanza', 880, 385, 36, pop(lt, tS), '#e5dbff', '#5f3dc4', { border: '#9775fa', minW: 170 });
    kw(ctx, 'a group of lines', 1095, 385, 26, pop(lt, S.w('group') - .1), '#fff', '#5f3dc4', { border: '#9775fa' });
    kw(ctx, '2 stanzas', 940, 470, 36, pop(lt, tS2), '#7048e8', '#fff');
    ctx.restore();
  }
  const aB = ph(lt, tB);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    board(ctx, 690, 110, 520, 420, 1, 'rgba(255,253,245,.96)', '#495057');
    lines(ctx, 'the poem', 950, 158, 26, '#5c677d', 1, 800);
    txt(ctx, 'animals', 950, 205, 50, '#23314f');
    txt(ctx, 'by Brian Bilston', 950, 260, 30, '#5c677d', 'center', 800);
    const k31 = pop(lt, S.w('thirty-one') - .1), k8 = pop(lt, S.w('eight') - .1);
    popAt(ctx, k31, 830, 390, () => { txtOut(ctx, '31', 830, 375, 96, '#e8590c', '#fff', 10); txt(ctx, 'lines', 830, 450, 34, '#a35200'); });
    popAt(ctx, k8, 1070, 390, () => { txtOut(ctx, '8', 1070, 375, 96, '#7048e8', '#fff', 10); txt(ctx, 'stanzas', 1070, 450, 34, '#5f3dc4'); });
    ctx.restore();
  }
};

/* 16. RHYME, RHYTHM, IMAGERY */
SCENES.rhyme = (ctx, lt, S) => {
  artBg(ctx, 'biblioteca', lt, { pan: 6, dim: .25 });
  sceneTag(ctx, 'Rhyme, rhythm, imagery', ap(lt, .1, .4));
  const t2 = S.f(2) - .3, t5 = S.f(5) - .3;
  const kR = ap(lt, S.w('cat') - .1, .5);
  const beats = [S.w('have'), S.w('cat', 1), S.w('sleeps'), S.w('hat', 1)].map(t => t - .05);
  const lineHl = [0, 1, 2, 3].map(i => i === 0 ? ph(lt, beats[0] - .2, S.w('she') - .1, .2) : i === 1 ? ph(lt, S.w('she') - .1, S.fe(4) + .3, .2) : 0);
  poemPaper(ctx, lt, ap(lt, .2, .5), { rhyme: kR, lineHl });
  board(ctx, 680, 92, 500, 470, ap(lt, .3, .5), 'rgba(20,16,40,.6)');
  /* RHYME */
  const a1 = ph(lt, 0, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    kw(ctx, 'rhyme', 930, 140, 54, pop(lt, S.w('rhyme') - .1), '#e8590c', '#fff');
    wrapC(ctx, 'words that sound the same at the end of the lines', 930, 240, 480, 32, '#fff', clamp(pop(lt, S.w('sound') - .1)));
    kw(ctx, 'cat  —  hat', 930, 360, 42, pop(lt, S.w('cat') - .1), '#fff4e6', '#d9480f', { border: '#ff922b', minW: 300 });
    kw(ctx, 'sun  —  run', 930, 450, 42, pop(lt, S.w('sun') - .1), '#e7f5ff', '#1864ab', { border: '#4dabf7', minW: 300 });
    ctx.restore();
  }
  /* RHYTHM */
  const a2 = ph(lt, t2, t5);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    kw(ctx, 'rhythm', 930, 140, 54, pop(lt, S.w('rhythm') - .1), '#2f9e44', '#fff');
    wrapC(ctx, 'a beat, or a pattern', 930, 225, 480, 34, '#fff', clamp(pop(lt, S.w('beat') - .1)));
    const kS = pop(lt, S.w('song') - .1);
    popAt(ctx, kS, 930, 295, () => { kw(ctx, 'like a song', 930, 295, 32, 1, '#d3f9d8', '#2b8a3e', { border: '#40c057' }); musicNote(ctx, 1110, 285 + Math.sin(lt * 4) * 6, .7, '#2f9e44'); musicNote(ctx, 750, 290 + Math.cos(lt * 4) * 6, .6, '#e64980', true); });
    const kB = ap(lt, S.w('listen') - .1, .4);
    if (kB > 0) {
      ctx.save(); ctx.globalAlpha *= kB;
      beats.forEach((t, i) => {
        const on = lt >= t, bump = on ? 1 + .35 * Math.max(0, 1 - (lt - t) / .25) : 1;
        circ(ctx, 795 + i * 90, 420, 28 * bump, on ? '#40c057' : 'rgba(255,255,255,.5)', '#fff', 4);
      });
      lines(ctx, 'clap the beat!', 930, 490, 28, '#fff', 1, 900);
      ctx.restore();
    }
    ctx.restore();
  }
  /* IMAGERY */
  const a3 = ph(lt, t5);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    kw(ctx, 'imagery', 930, 140, 54, pop(lt, S.w('imagery') - .1), '#7048e8', '#fff');
    wrapC(ctx, 'pictures in our minds', 930, 222, 480, 34, '#fff', clamp(pop(lt, S.w('pictures') - .1)));
    thought(ctx, 950, 395, 380, 210, pop(lt, S.w('minds') - .1, .6));
    const kc = pop(lt, S.w('little') - .1), ks = pop(lt, S.w('yellow') - .1);
    popAt(ctx, ks, 1030, 370, () => sunD(ctx, 1030, 370, 52, lt));
    popAt(ctx, kc, 880, 470, () => catD(ctx, 880, 475, 1.05, '#212529'));
    ctx.restore();
  }
};

/* 17. REMEMBER! */
function pairBoard(ctx, lt, a, L, R) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  board(ctx, 70, 95, 540, 440, 1, L.bg, L.bd); board(ctx, 670, 95, 540, 440, 1, R.bg, R.bd);
  kw(ctx, L.t, 340, 160, 50, L.k, L.c, '#fff'); kw(ctx, R.t, 940, 160, 50, R.k, R.c, '#fff');
  if (L.k > 0) L.draw(ctx, lt, L.k); if (R.k > 0) R.draw(ctx, lt, R.k);
  wrapC(ctx, L.d, 340, 470, 480, 32, L.dc, clamp(L.k)); wrapC(ctx, R.d, 940, 470, 480, 32, R.dc, clamp(R.k));
  ctx.restore();
}
const GREEN = { bg: 'rgba(235,251,238,.95)', bd: '#40c057', c: '#2f9e44', dc: '#2b8a3e' };
const PURP = { bg: 'rgba(243,240,255,.95)', bd: '#9775fa', c: '#7048e8', dc: '#5f3dc4' };
const ORNG = { bg: 'rgba(255,244,230,.95)', bd: '#fd7e14', c: '#fd7e14', dc: '#9c3600' };
const BLUE = { bg: 'rgba(231,245,255,.95)', bd: '#339af0', c: '#339af0', dc: '#0b4f8a' };
function miniLines(ctx, x, y, n, hl, gap) {
  for (let i = 0; i < n; i++) { const yy = y + i * 34 + (gap && i >= 2 ? 22 : 0); rr(ctx, x - 120, yy - 7, 240, 14, 7); ctx.fillStyle = hl.includes(i) ? '#fab005' : '#ced4da'; ctx.fill(); }
}
SCENES.recap = (ctx, lt, S) => {
  artBg(ctx, 'estadio', lt, { fb: 'vila', pan: 10 });
  sceneTag(ctx, 'Remember!', ap(lt, .1, .4));
  const T = [0, 1, 2, 3, 4].map(i => i ? S.f(i) - .3 : 0), E = [1, 2, 3, 4].map(i => S.f(i) - .3).concat([1e9]);
  pairBoard(ctx, lt, ph(lt, T[0], E[0]),
    Object.assign({ t: 'line', k: pop(lt, S.w('line') - .1), d: 'one line', draw: (c) => miniLines(c, 340, 270, 4, [1], false) }, ORNG),
    Object.assign({ t: 'stanza', k: pop(lt, S.w('stanza') - .1), d: 'a group of lines', draw: (c) => { miniLines(c, 940, 255, 4, [0, 1], true); bracket(c, 1075, 240, 304, 1); } }, PURP));
  pairBoard(ctx, lt, ph(lt, T[1], E[1]),
    Object.assign({ t: 'rhyme', k: pop(lt, S.w('rhyme') - .1), d: 'the same sound at the end', draw: (c) => kw(c, 'cat  —  hat', 340, 300, 44, 1, '#fff4e6', '#d9480f', { border: '#ff922b' }) }, ORNG),
    Object.assign({ t: 'rhythm', k: pop(lt, S.w('rhythm') - .1), d: 'the beat', draw: (c, t) => { for (let i = 0; i < 4; i++) { const on = Math.floor(t * 2.5) % 4 === i; circ(c, 805 + i * 90, 300, on ? 34 : 26, on ? '#40c057' : '#b2f2bb', '#fff', 4); } } }, GREEN));
  pairBoard(ctx, lt, ph(lt, T[2], E[2]),
    Object.assign({ t: 'If…', k: pop(lt, S.w('if') - .1), d: 'is the cause', draw: (c) => kw(c, 'CAUSE', 340, 300, 46, 1, '#fff', '#d9480f', { border: '#fd7e14' }) }, ORNG),
    Object.assign({ t: 'Then…', k: pop(lt, S.w('then') - .1), d: 'is the effect', draw: (c) => kw(c, 'EFFECT', 940, 300, 46, 1, '#fff', '#1864ab', { border: '#339af0' }) }, BLUE));
  pairBoard(ctx, lt, ph(lt, T[3], E[3]),
    Object.assign({ t: 'a dragon', k: pop(lt, S.w('dragon') - .1), d: 'make-believe', draw: (c, t) => pipD(c, 340, 400, 'idle', t, 1, 2.1) }, PURP),
    Object.assign({ t: 'the sun', k: pop(lt, S.w('sun') - .1), d: 'real', draw: (c, t) => sunD(c, 940, 310, 62, t) }, GREEN));
  const a5 = ph(lt, T[4]);
  if (a5 > 0) {
    ctx.save(); ctx.globalAlpha *= a5;
    const kh = pop(lt, S.w('happily') - .1, .6), ke = pop(lt, S.w('end', 1) - .1, .7);
    popAt(ctx, kh, 640, 160, () => { board(ctx, 250, 95, 780, 130); lines(ctx, 'And they all lived\nhappily ever after.', 640, 160, 40, '#c2255c'); });
    popAt(ctx, ke, 640, 320, () => txtOut(ctx, 'The End', 640, 320, 110, '#7048e8', '#fff', 14));
    hero(ctx, 'lia', 300, GROUND, 'cheer', lt, 1, 1.9); hero(ctx, 'theo', 470, GROUND, 'cheer', lt + .3, 1, 1.9);
    hero(ctx, 'bia', 820, GROUND, 'cheer', lt + .6, -1, 1.9); pipD(ctx, 1000, 470 + Math.sin(lt * 2) * 8, 'fly', lt, -1, 1.7);
    confetti(ctx, lt, 46, ke);
    ctx.restore();
  }
};
