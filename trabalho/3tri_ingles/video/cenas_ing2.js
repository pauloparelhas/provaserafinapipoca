/* cenas_ing2.js — T1 magic, threes and sevens, lesson; T2 real or make-believe. */

/* 6. MAGIC */
SCENES.magic = (ctx, lt, S) => {
  artBg(ctx, 'bosque', lt, { cam: 900 });
  sceneTag(ctx, 'Magic', ap(lt, .1, .4));
  const tB = S.f(2) - .25;
  for (let i = 0; i < 14; i++) { const q = (lt * .25 + i / 14) % 1; sparkle(ctx, (i * 97 + lt * 10) % W, 560 - q * 480, 6 + (i % 3) * 3, ['#ffd43b', '#fff', '#da77f2'][i % 3], lt + i); }
  const aA = ph(lt, 0, tB);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    popAt(ctx, pop(lt, S.w('magic') - .1, .6), 640, 130, () => txtOut(ctx, 'magic', 640, 130, 96, '#ae3ec9', '#fff', 14));
    kw(ctx, 'spells', 330, 260, 40, pop(lt, S.w('spells') - .1), '#f3d9fa', '#862e9c', { border: '#da77f2', minW: 230 });
    kw(ctx, 'enchantments', 640, 260, 40, pop(lt, S.w('enchantments') - .1), '#e5dbff', '#5f3dc4', { border: '#9775fa', minW: 230 });
    kw(ctx, 'curses', 950, 260, 40, pop(lt, S.w('curses') - .1), '#ffe3e3', '#c92a2a', { border: '#ff8787', minW: 230 });
    mor(ctx, 'godmother', 230, GROUND, lt, 1, 1.4, false);
    condeD(ctx, 1060, GROUND, lt > S.w('curses') - .1 ? 'write' : 'idle', lt, 1.3);
    ctx.restore();
  }
  const aB = ph(lt, tB);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    kw(ctx, 'magical objects', 640, 110, 50, pop(lt, S.w('objects') - .1), '#ae3ec9', '#fff');
    board(ctx, 150, 170, 980, 300);
    const kwd = pop(lt, S.w('wand') - .1), kb = pop(lt, S.w('books') - .1), kf = pop(lt, S.w('foods') - .1);
    popAt(ctx, kwd, 330, 320, () => withT(ctx, 330, 330, 1.5, -.3, () => wand(ctx, 0, 0, 1, lt)));
    kw(ctx, 'a wand', 330, 425, 34, kwd, '#fff', '#5f3dc4', { border: '#9775fa', minW: 190 });
    popAt(ctx, kb, 640, 300, () => { openBook(ctx, 640, 300, 210, 110, { cover: '#5f3dc4' }); sparkle(ctx, 700, 240, 12, '#ffd43b', lt); });
    kw(ctx, 'books', 640, 425, 34, kb, '#fff', '#5f3dc4', { border: '#9775fa', minW: 190 });
    popAt(ctx, kf, 950, 310, () => { apple(ctx, 905, 310, 1.1); cookie(ctx, 1000, 315, 34); });
    kw(ctx, 'foods', 950, 425, 34, kf, '#fff', '#5f3dc4', { border: '#9775fa', minW: 190 });
    ctx.restore();
  }
};

/* 7. THREES AND SEVENS */
SCENES.numbers = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt, { cam: 2000 });
  sceneTag(ctx, 'Special numbers', ap(lt, .1, .4));
  const kS = pop(lt, S.w('special') - .1);
  const pulse = lt > S.f(3) ? 1 + .06 * Math.sin((lt - S.f(3)) * 8) : 1;
  popAt(ctx, kS * pulse, 640, 100, () => kw(ctx, 'special numbers', 640, 100, 46, 1, '#fcc419', '#5c3d00'));
  board(ctx, 70, 150, 1140, 360, ap(lt, .3, .4));
  const k3 = pop(lt, S.w('three') - .1, .6), k7 = pop(lt, S.w('seven') - .1, .6);
  popAt(ctx, k3, 330, 235, () => txtOut(ctx, '3', 330, 235, 140, '#e8590c', '#fff', 14));
  popAt(ctx, k7, 920, 235, () => txtOut(ctx, '7', 920, 235, 140, '#1c7ed6', '#fff', 14));
  const kp = ap(lt, S.w('pigs') - .5, .5), kd = ap(lt, S.w('dwarfs') - .5, .5);
  for (let i = 0; i < 3; i++) popAt(ctx, clamp(kp * 3 - i), 230 + i * 100, 455, () => pig(ctx, 230 + i * 100, 455, .62, { t: lt, ph: i }));
  lines(ctx, 'three little pigs', 330, 485, 28, '#e8590c', kp, 900);
  for (let i = 0; i < 7; i++) popAt(ctx, clamp(kd * 7 - i), 710 + i * 70, 450, () => dwarf(ctx, 710 + i * 70, 450, .95, ['#e03131', '#f08c00', '#fab005', '#2f9e44', '#1c7ed6', '#7048e8', '#c2255c'][i]));
  lines(ctx, 'seven dwarfs', 920, 485, 28, '#1c7ed6', kd, 900);
  if (lt > S.f(3)) for (let i = 0; i < 6; i++) { const a = lt * 2 + i * TAU / 6; sparkle(ctx, 330 + Math.cos(a) * 95, 235 + Math.sin(a) * 75, 10, '#ffd43b', a); sparkle(ctx, 920 + Math.cos(a) * 95, 235 + Math.sin(a) * 75, 10, '#ffd43b', a); }
};

/* 8. A LESSON */
SCENES.lesson = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt, { cam: 2600 });
  sceneTag(ctx, 'A lesson', ap(lt, .1, .4));
  const kl = pop(lt, S.w('lesson') - .1), km = pop(lt, S.w('moral') - .1);
  kw(ctx, 'a lesson', 430, 120, 48, kl, '#d3f9d8', '#2b8a3e', { border: '#40c057' });
  if (km > 0) txtOut(ctx, 'or', 640, 120, 34, '#2b8a3e', '#fff', 7);
  kw(ctx, 'a moral', 850, 120, 48, km, '#d3f9d8', '#2b8a3e', { border: '#40c057' });
  const kk = pop(lt, S.w('kind') - .1, .6);
  popAt(ctx, kk, 640, 290, () => { board(ctx, 400, 215, 480, 150); heart(ctx, 500, 290, 1.1); txt(ctx, 'be kind', 690, 292, 64, '#c2255c'); });
  hero(ctx, 'lia', 470, GROUND, kk > .5 ? 'cheer' : 'idle', lt, 1, 1.8);
  hero(ctx, 'theo', 810, GROUND, kk > .5 ? 'cheer' : 'idle', lt + .3, -1, 1.8);
  if (kk > 0) for (let i = 0; i < 5; i++) { const q = (lt * .5 + i / 5) % 1; ctx.save(); ctx.globalAlpha *= (1 - q) * kk; heart(ctx, 600 + i * 22 + Math.sin(lt * 3 + i) * 10, 470 - q * 120, .35, i % 2 ? '#ff8787' : '#f06595'); ctx.restore(); }
};

/* 9. REAL OR MAKE-BELIEVE */
function tallBed(ctx, x, y, s) {   /* cama alta: da para ver o que esta debaixo */
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#8d5a35'; rr(ctx, -215, -250, 26, 252, 8); ctx.fill(); rr(ctx, 189, -190, 26, 192, 8); ctx.fill();
  ctx.fillStyle = '#a9713f'; ctx.fillRect(-195, -150, 390, 22);
  ctx.fillStyle = '#fff'; rr(ctx, -192, -182, 120, 36, 14); ctx.fill();
  ctx.fillStyle = '#e599f7'; rr(ctx, -110, -190, 300, 46, 18); ctx.fill();
  for (let i = 0; i < 6; i++) circ(ctx, -85 + i * 48, -167, 6, 'rgba(255,255,255,.55)');
  ctx.restore();
}
function realPanels(ctx, lt, S, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  board(ctx, 40, 82, 580, 480, 1, 'rgba(235,251,238,.95)', '#40c057');
  board(ctx, 660, 82, 580, 480, ap(lt, S.w('make-believe') - .3, .4), 'rgba(243,240,255,.95)', '#9775fa');
  ctx.restore();
}
SCENES.real = (ctx, lt, S) => {
  artBg(ctx, 'vila', lt, { cam: 3200, dim: .15 });
  const t2 = S.f(6) - .3;
  const a1 = ph(lt, 0, t2);
  if (a1 > 0) {
    realPanels(ctx, lt, S, a1);
    ctx.save(); ctx.globalAlpha *= a1;
    kw(ctx, 'REAL', 330, 128, 48, pop(lt, .2), '#2f9e44', '#fff');
    kw(ctx, 'really exists', 330, 200, 30, pop(lt, S.w('exists') - .1), '#fff', '#2b8a3e', { border: '#69db7c' });
    kw(ctx, 'can really happen', 330, 255, 30, pop(lt, S.w('happen') - .1), '#fff', '#2b8a3e', { border: '#69db7c' });
    [['see', 190], ['touch', 330], ['true', 470]].forEach(([w, x]) => kw(ctx, w, x, 315, 28, pop(lt, S.w(w) - .1), '#d3f9d8', '#2b8a3e', { minW: 110 }));
    const kD = pop(lt, S.w('dog') - .1), kT = pop(lt, S.w('tree') - .1), kS = pop(lt, S.w('school') - .1), kU = pop(lt, S.w('sun') - .1);
    popAt(ctx, kD, 115, 470, () => dogD(ctx, 105, 470, .95, lt));
    popAt(ctx, kT, 255, 470, () => tree(ctx, 255, 475, .55));
    popAt(ctx, kS, 395, 470, () => { smallHouse(ctx, 395, 470, .62, '#fff3bf', '#e8590c'); ctx.strokeStyle = '#495057'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(395, 395); ctx.lineTo(395, 365); ctx.stroke(); ctx.fillStyle = '#e03131'; ctx.fillRect(395, 365, 22, 13); });
    popAt(ctx, kU, 535, 420, () => sunD(ctx, 535, 420, 30, lt));
    [['a dog', 115, kD], ['a tree', 255, kT], ['the school', 395, kS], ['the sun', 535, kU]].forEach(([s, x, k]) => lines(ctx, s, x, 518, 23, '#2b8a3e', clamp(k)));
    /* make-believe */
    kw(ctx, 'MAKE-BELIEVE', 950, 128, 44, pop(lt, S.w('make-believe') - .1), '#7048e8', '#fff');
    kw(ctx, 'not real or true', 950, 200, 30, pop(lt, S.w('not') - .1), '#fff', '#5f3dc4', { border: '#b197fc' });
    kw(ctx, 'cannot really happen', 950, 255, 30, pop(lt, S.w('cannot') - .1), '#fff', '#5f3dc4', { border: '#b197fc' });
    kw(ctx, 'imagined', 845, 315, 28, pop(lt, S.w('imagined') - .1), '#e5dbff', '#5f3dc4', { minW: 150 });
    kw(ctx, 'invented', 1055, 315, 28, pop(lt, S.w('invented') - .1), '#e5dbff', '#5f3dc4', { minW: 150 });
    const kH = pop(lt, S.w('superheroes') - .1), kA = pop(lt, S.w('talking') - .1), kC = pop(lt, S.w('cinderella') - .1), kF = pop(lt, S.w('fairy') - .1);
    popAt(ctx, kH, 735, 450, () => hero(ctx, 'lia', 740, 470, 'fly', lt, 1, .95, { capa: '#e03131' }));
    popAt(ctx, kA, 875, 480, () => mor(ctx, 'owl', 875, 482, lt, 1, .75, true));
    popAt(ctx, kC, 1015, 440, () => slipper(ctx, 1015, 445, .9));
    popAt(ctx, kF, 1155, 430, () => storyCover(ctx, 1155, 425, 82, 104, '#c2255c', 'Fairy tales', (x, y) => crown(ctx, x, y - 6, .45), 1));
    [['super-\nheroes', 735, kH], ['talking\nanimals', 875, kA], ['Cinderella', 1015, kC], ['fairy\ntales', 1155, kF]].forEach(([s, x, k]) => lines(ctx, s, x, 524, 21, '#5f3dc4', clamp(k), 900, 1.1));
    ctx.restore();
  }
  const a2 = ph(lt, t2);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    board(ctx, 40, 82, 580, 480, 1, 'rgba(235,251,238,.95)', '#40c057');
    board(ctx, 660, 82, 580, 480, 1, 'rgba(243,240,255,.95)', '#9775fa');
    kw(ctx, 'REAL', 330, 128, 48, 1, '#2f9e44', '#fff');
    const kr = pop(lt, S.w('alligator') - .1, .6);
    popAt(ctx, kr, 330, 400, () => {
      ell(ctx, 330, 440, 230, 50, '#4dabf7'); ell(ctx, 330, 432, 200, 34, '#74c0fc');
      croc(ctx, 330, 430, .52, lt);
    });
    kw(ctx, 'an alligator', 330, 515, 30, kr, '#fff', '#2b8a3e', { border: '#69db7c' });
    const km = pop(lt, S.w('alligator', 1) - .1, .6);
    kw(ctx, 'MAKE-BELIEVE', 950, 128, 44, pop(lt, S.w('make-believe', 2) - .1), '#7048e8', '#fff');
    popAt(ctx, km, 950, 420, () => {
      croc(ctx, 965, 470, .42, lt);
      tallBed(ctx, 950, 470, 1);
      bubble(ctx, 990, 385, 'Hello!', 1, 1035, 445, { size: 30, color: '#5f3dc4' });
    });
    kw(ctx, 'an alligator that talks', 950, 515, 26, km, '#fff', '#5f3dc4', { border: '#b197fc' });
    ctx.restore();
  }
};
