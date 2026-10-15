/* cenas_ing1.js — T1 fairy tales: o que e, characters, good/bad/helper, settings, once upon a time. */

/* 1. WHAT IS A FAIRY TALE */
SCENES.ft = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt);
  sceneTag(ctx, 'Fairy tales', ap(lt, .1, .4));
  board(ctx, 190, 95, 900, 400, ap(lt, .2, .4));
  const a = ap(lt, .2, .4);
  if (a > 0) {
    ctx.save(); ctx.globalAlpha *= a;
    kw(ctx, 'fairy tale', 640, 165, 60, pop(lt, S.w('fairy') - .1), '#7048e8', '#fff');
    kw(ctx, 'a make-believe story', 640, 262, 40, pop(lt, S.w('make-believe') - .1), '#fff3bf', '#5f3dc4', { border: '#fab005' });
    const ks = [pop(lt, S.w('beginning') - .1), pop(lt, S.w('middle') - .1), pop(lt, S.w('end') - .1)];
    const xs = [380, 640, 900];
    ['beginning', 'middle', 'end'].forEach((s, i) => kw(ctx, s, xs[i], 405, 36, ks[i], ['#d3f9d8', '#fff3bf', '#ffe3e3'][i], ['#2b8a3e', '#e67700', '#c92a2a'][i], { minW: 210 }));
    arrowTo(ctx, 492, 405, 528, 405, '#868e96', 6, ks[1]); arrowTo(ctx, 752, 405, 788, 405, '#868e96', 6, ks[2]);
    ctx.restore();
  }
  hero(ctx, 'lia', 110, GROUND, S.talk(lt) ? 'idle' : 'idle', lt, 1, 1.6);
  pipD(ctx, 1170, GROUND, 'idle', lt, -1, 1.5);
};

/* 2. CHARACTERS */
SCENES.chars = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt, { cam: 600 });
  sceneTag(ctx, 'Characters', ap(lt, .1, .4));
  kw(ctx, 'characters', 640, 70, 44, pop(lt, S.w('characters') - .1), '#e8590c', '#fff');
  const tB = S.f(2) - .25, tC = S.f(3) - .25;
  /* A: royalty */
  const aA = ph(lt, 0, tB);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    board(ctx, 70, 120, 1140, 330);
    kw(ctx, 'royalty', 640, 170, 46, pop(lt, S.w('royalty') - .1), '#fcc419', '#5c3d00');
    const it = [['king', 'king'], ['queen', 'queen'], ['prince', 'prince'], ['princess', 'princess'], ['knight', 'knight']];
    it.forEach(([w, s], i) => {
      const x = 180 + i * 230, k = pop(lt, S.w(w) - .1);
      popAt(ctx, k, x, 300, () => {
        if (w === 'knight') shield(ctx, x, 290, 1.25);
        else crown(ctx, x, 300, w === 'king' || w === 'queen' ? 1.25 : .9);
      });
      kw(ctx, s, x, 390, 34, k, '#fff', '#23314f', { border: '#fcc419', minW: 170 });
    });
    ctx.restore();
  }
  /* B: magical creatures */
  const aB = ph(lt, tB, tC);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    board(ctx, 120, 125, 1040, 250);
    kw(ctx, 'magical creatures', 640, 190, 46, pop(lt, S.w('magical') - .1), '#7048e8', '#fff');
    const kf = pop(lt, S.w('fairies') - .1), kd = pop(lt, S.w('dragons') - .1), ko = pop(lt, S.w('ogres') - .1);
    kw(ctx, 'fairies', 300, 320, 36, kf, '#fff', '#862e9c', { border: '#da77f2', minW: 190 });
    kw(ctx, 'dragons', 640, 320, 36, kd, '#fff', '#2b8a3e', { border: '#69db7c', minW: 190 });
    kw(ctx, 'ogres', 980, 320, 36, ko, '#fff', '#5c940d', { border: '#a9e34b', minW: 190 });
    popAt(ctx, kf, 300, GROUND, () => mor(ctx, 'godmother', 300, GROUND, lt, 1, 1.25, false));
    popAt(ctx, kd, 640, GROUND, () => pipD(ctx, 640, GROUND, 'idle', lt, 1, 1.9));
    popAt(ctx, ko, 980, GROUND, () => withT(ctx, 980, GROUND, .55, 0, () => giant(ctx, 0, 0, 1, { t: lt })));
    ctx.restore();
  }
  /* C: talking animals */
  const aC = ph(lt, tC);
  if (aC > 0) {
    ctx.save(); ctx.globalAlpha *= aC;
    kw(ctx, 'talking animals', 640, 190, 52, pop(lt, S.w('talking') - .1), '#2f9e44', '#fff');
    const k = pop(lt, S.w('animals') - .1);
    popAt(ctx, k, 470, GROUND, () => mor(ctx, 'owl', 470, GROUND, lt, 1, 1.5, true));
    popAt(ctx, k, 810, GROUND, () => mor(ctx, 'mouse', 810, GROUND, lt + .4, -1, 1.6, true));
    bubble(ctx, 330, 300, 'Hello!', k, 430, 380, { size: 34, color: '#2b8a3e' });
    bubble(ctx, 960, 300, 'Hi!', k, 830, 390, { size: 34, color: '#2b8a3e' });
    ctx.restore();
  }
};

/* 3. GOOD, BAD AND A SPECIAL HELPER */
SCENES.goodbad = (ctx, lt, S) => {
  artBg(ctx, 'bosque', lt);
  sceneTag(ctx, 'Good and bad', ap(lt, .1, .4));
  const tB = S.f(2) - .25;
  const aA = ph(lt, 0, tB);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    const kg = pop(lt, S.w('good') - .1), kb = pop(lt, S.w('bad') - .1);
    kw(ctx, 'good character', 330, 140, 40, kg, '#d3f9d8', '#2b8a3e', { border: '#40c057' });
    kw(ctx, 'bad character', 950, 140, 40, kb, '#ffe3e3', '#c92a2a', { border: '#fa5252' });
    popAt(ctx, kg, 330, GROUND, () => hero(ctx, 'bia', 330, GROUND, 'cheer', lt, 1, 2.1));
    popAt(ctx, kb, 950, GROUND, () => condeD(ctx, 950, GROUND, 'laugh', lt, 1.5));
    const kc = pop(lt, S.w('cinderella') - .1);
    kw(ctx, 'Cinderella', 330, 235, 36, kc, '#e7f5ff', '#1864ab', { border: '#74c0fc' });
    popAt(ctx, kc, 520, 360, () => slipper(ctx, 520, 360, 1.1));
    if (kc > 0) popAt(ctx, kc, 470, 360, () => checkMark(ctx, 610, 300, .8));
    ctx.restore();
  }
  const aB = ph(lt, tB);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    kw(ctx, 'a special helper', 640, 110, 52, pop(lt, S.w('special') - .1), '#fcc419', '#5c3d00');
    const it = [['fairy', 'a fairy', '#862e9c'], ['godmother', 'a godmother', '#5f3dc4'], ['wizard', 'a wizard', '#1864ab'], ['elf', 'an elf', '#2b8a3e']];
    it.forEach(([w, s, c], i) => kw(ctx, s, 190 + i * 300, 215, 34, pop(lt, S.w(w, w === 'fairy' ? 1 : 0) - .1), '#fff', c, { border: c, minW: 220 }));
    const kh = ap(lt, S.w('helps') - .2, .6);
    mor(ctx, 'godmother', 560, GROUND, lt, 1, 1.5, S.talk(lt) > 0 && lt > S.f(3));
    hero(ctx, 'theo', 300, GROUND, 'idle', lt, 1, 1.8);
    hero(ctx, 'bia', 860, GROUND, kh > .5 ? 'cheer' : 'idle', lt, -1, 1.9);
    kw(ctx, 'Cinderella', 860, 330, 30, pop(lt, S.w('cinderella', 1) - .1), '#e7f5ff', '#1864ab', { border: '#74c0fc' });
    if (kh > 0) {
      ctx.save(); ctx.globalAlpha *= kh;
      for (let i = 0; i < 9; i++) { const q = (lt * .7 + i / 9) % 1; sparkle(ctx, lerp(620, 840, q), 420 - Math.sin(q * PI) * 110, 9 + (i % 3) * 3, ['#ffd43b', '#fff', '#da77f2'][i % 3], lt * 2 + i); }
      ctx.restore();
    }
  }
};

/* 4. SETTINGS */
SCENES.settings = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt, { cam: 1300 });
  sceneTag(ctx, 'Settings', ap(lt, .1, .4));
  kw(ctx, 'Where?', 330, 120, 48, pop(lt, S.w('where') - .1), '#fff', '#1864ab', { border: '#4dabf7' });
  kw(ctx, 'setting', 640, 120, 52, pop(lt, S.w('setting') - .1), '#1c7ed6', '#fff');
  arrowTo(ctx, 440, 120, 520, 120, '#4dabf7', 6, ap(lt, S.w('setting') - .1, .4));
  const tB = S.f(1) - .2;
  const aB = ph(lt, tB);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    board(ctx, 70, 175, 1140, 300);
    kw(ctx, 'a kingdom', 640, 220, 40, pop(lt, S.w('kingdom') - .1), '#fcc419', '#5c3d00');
    const kc = pop(lt, S.w('castle') - .1), kf = pop(lt, S.w('forest') - .1), kv = pop(lt, S.w('village') - .1), kh = pop(lt, S.w('house') - .1);
    popAt(ctx, kc, 230, 405, () => withT(ctx, 230, 405, 1, 0, () => castle(ctx, 0, 0, .3)));
    kw(ctx, 'castle', 230, 438, 30, kc, '#fff', '#5f3dc4', { border: '#9775fa', minW: 150 });
    popAt(ctx, kf, 500, 420, () => { pine(ctx, 460, 410, .6, '#2b8a3e'); pine(ctx, 540, 410, .7, '#2f9e44'); tree(ctx, 500, 412, .5); });
    kw(ctx, 'forest', 500, 438, 30, kf, '#fff', '#2b8a3e', { border: '#69db7c', minW: 150 });
    popAt(ctx, kv, 780, 420, () => { smallHouse(ctx, 730, 405, .5); smallHouse(ctx, 790, 405, .6, '#d0ebff', '#1c7ed6'); smallHouse(ctx, 850, 405, .5, '#fff3bf', '#c92a2a'); });
    kw(ctx, 'village', 790, 438, 30, kv, '#fff', '#e8590c', { border: '#ffa94d', minW: 150 });
    popAt(ctx, kh, 1060, 405, () => withT(ctx, 1060, 405, 1, 0, () => cottage(ctx, 0, 0, .32)));
    kw(ctx, 'or a house', 1060, 438, 30, kh, '#fff', '#c92a2a', { border: '#ff8787', minW: 150 });
    ctx.restore();
  }
  { const a = 1 - aB; if (a > 0) { ctx.save(); ctx.globalAlpha *= a; hero(ctx, 'theo', 120 + lt * 30, GROUND, 'walk', lt, 1, 1.5); ctx.restore(); } }
};

/* 5. ONCE UPON A TIME / HAPPILY EVER AFTER */
SCENES.events = (ctx, lt, S) => {
  artBg(ctx, 'biblioteca', lt, { pan: 6 });
  sceneTag(ctx, 'Story events', ap(lt, .1, .4));
  const kb = pop(lt, S.w('beginning') - .1), ke = pop(lt, S.w('ending') - .1);
  kw(ctx, 'special beginning', 380, 110, 36, kb, '#d3f9d8', '#2b8a3e', { border: '#40c057' });
  kw(ctx, 'special ending', 900, 110, 36, ke, '#ffe3e3', '#c92a2a', { border: '#fa5252' });
  const kB = ap(lt, .3, .6);
  if (kB > 0) {
    ctx.save(); ctx.globalAlpha *= kB;
    openBook(ctx, 640, 330, 900, 300, { cover: '#8c2f39' });
    const k1 = ap(lt, S.w('once') - .1, .5), k2 = ap(lt, S.w('happily') - .1, .5);
    lines(ctx, 'Once upon\na time…', 418, 320, 52, '#5f3dc4', k1);
    lines(ctx, 'And they lived\nhappily ever after.', 862, 320, 44, '#c2255c', k2);
    if (k1 > 0) for (let i = 0; i < 4; i++) sparkle(ctx, 270 + i * 95, 210 + (i % 2) * 230, 10 * k1, '#fab005', lt + i);
    if (k2 > 0) { heart(ctx, 760, 445, .55 * k2); heart(ctx, 1010, 445, .55 * k2, '#ff8787'); }
    ctx.restore();
  }
  hero(ctx, 'lia', 92, GROUND, 'idle', lt, 1, 1.5); hero(ctx, 'bia', 1190, GROUND, ke > 0 ? 'cheer' : 'idle', lt, -1, 1.5);
};
