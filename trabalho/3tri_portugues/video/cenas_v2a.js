/* cenas_v2a.js — roteiro v2: abertura, 1 genero, 2 comeco/meio/fim, 3 elementos. */

function cozyRoom(ctx, lt) {
  sky(ctx, '#f8e1c4', '#efc595');
  ctx.save(); ctx.globalAlpha = .18; for (let i = 0; i < 16; i++) { ctx.fillStyle = '#fff'; ctx.fillRect(i * 86, 0, 36, 520); } ctx.restore();
  // janela com noite
  rr(ctx, 70, 70, 200, 170, 12); ctx.fillStyle = '#2b2f6b'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#8d5a35'; ctx.stroke();
  for (let i = 0; i < 9; i++) circ(ctx, 90 + (i * 53) % 170, 90 + (i * 37) % 130, 2.2, `rgba(255,255,220,${.5 + .5 * Math.sin(lt * 2 + i)})`);
  circ(ctx, 225, 110, 20, '#fff3bf');
  ctx.beginPath(); ctx.moveTo(170, 70); ctx.lineTo(170, 240); ctx.moveTo(70, 155); ctx.lineTo(270, 155); ctx.stroke();
  ctx.fillStyle = grad(ctx, 520, H, ['#b07a4a', '#8a5a33']); ctx.fillRect(0, 520, W, 200);
  ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(0, 540 + i * 14); ctx.lineTo(W, 540 + i * 14); ctx.stroke(); }
}
function crown(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#fcc419'; ctx.beginPath(); ctx.moveTo(-40, 24); ctx.lineTo(-44, -22); ctx.lineTo(-20, 0); ctx.lineTo(0, -32); ctx.lineTo(20, 0); ctx.lineTo(44, -22); ctx.lineTo(40, 24); ctx.closePath(); ctx.fill();
  circ(ctx, -20, 12, 5, '#e03131'); circ(ctx, 0, 12, 5, '#1c7ed6'); circ(ctx, 20, 12, 5, '#2f9e44');
  ctx.restore();
}
function heart(ctx, x, y, s, col = '#f06595') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(0, 26); ctx.bezierCurveTo(-46, -6, -24, -44, 0, -20); ctx.bezierCurveTo(24, -44, 46, -6, 0, 26); ctx.fill(); ctx.restore();
}
function checkMark(ctx, x, y, s, col = '#2f9e44') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(ctx, 0, 0, 34, col);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-15, 1); ctx.lineTo(-4, 13); ctx.lineTo(17, -12); ctx.stroke(); ctx.restore();
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
  const k1 = pop(lt, .15, .6), k2 = pop(lt, .5, .6), k3 = pop(lt, .8, .6);
  popAt(ctx, k1, 540, 210, () => txtOut(ctx, 'Português', 540, 210, 120, '#c92a2a', '#ffffff', 16));
  popAt(ctx, k2, 540, 330, () => txtOut(ctx, 'Contos de fadas, paráfrase, paródia', 540, 330, 50, '#2b2f6b', '#ffffff', 12));
  popAt(ctx, k3, 540, 400, () => txtOut(ctx, 'e ortografia', 540, 400, 50, '#2b2f6b', '#ffffff', 12));
  bear(ctx, 1110, 620, 1.0, { t: lt, wave: ap(lt, .4, .5) });
};

/* ---------- 1. O QUE E CONTO DE FADAS ---------- */
SCENES.genero = (ctx, lt, S) => {
  cozyRoom(ctx, lt);
  const tB = S.f(2) - .3, kB = easeInOut(ap(lt, tB, .6));
  // avo e neto (ficam a cena toda, encolhem um pouco na fase B)
  const ax = lerp(330, 150, kB), sc = lerp(1.25, 1.0, kB);
  lady(ctx, ax, 600, sc, { hair: '#dee2e6', dress: '#9775fa', old: true });
  boy(ctx, ax + 150 * sc, 600, .82 * sc, { t: lt });
  // fase A: definicao
  if (kB < 1) {
    ctx.save(); ctx.globalAlpha *= 1 - kB;
    const kI = pop(lt, S.w('inventada') - .1), kA = pop(lt, S.w('antiga') - .1);
    popAt(ctx, kI, 860, 130, () => { panel(ctx, 640, 92, 440, 76, '#fff', 38); txt(ctx, 'história inventada', 860, 131, 38, '#7048e8'); });
    popAt(ctx, kA, 860, 225, () => { panel(ctx, 680, 190, 360, 72, '#fff', 36); hourglass(ctx, 730, 226, .42, lt); txt(ctx, 'bem antiga', 890, 227, 36, '#c2410c'); });
    // de avo para neto: fala que passa
    const kV = ap(lt, S.w('avó') - .2, .5), kN = ap(lt, S.w('neto') - .1, .8);
    if (kV > 0) {
      bubble(ctx, 470, 255, 'Era uma vez...', pop(lt, S.w('contavam') - .1), 380, 380, { size: 30, color: '#5f3dc4' });
      ctx.save(); ctx.globalAlpha *= clamp(kV); ctx.setLineDash([14, 10]); ctx.lineDashOffset = -lt * 40; ctx.strokeStyle = '#e8590c'; ctx.lineWidth = 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(380, 330); ctx.quadraticCurveTo(470, 290, lerp(380, 540, kN), lerp(330, 390, kN)); ctx.stroke(); ctx.restore();
      chip(ctx, 'de avó para neto', 860, 320, 30, '#e8590c', '#fff', pop(lt, S.w('avó')));
    }
    // escrita nos livros
    const kL = pop(lt, S.w('escrita') - .1, .6);
    if (kL > 0) popAt(ctx, kL, 870, 450, () => {
      openBook(ctx, 870, 450, 380, 170, { cover: '#8c2f39' });
      ctx.strokeStyle = 'rgba(60,40,30,.35)'; ctx.lineWidth = 3;
      for (let i = 0; i < 5; i++) for (const sx of [700, 885]) { ctx.beginPath(); ctx.moveTo(sx, 395 + i * 24); ctx.lineTo(sx + 150 - (i === 4 ? 60 : 0), 395 + i * 24); ctx.stroke(); }
      chip(ctx, 'escrita nos livros', 870, 560, 26, '#8c2f39', '#fff', 1);
    });
    ctx.restore();
  }
  // fase B: as capas
  if (kB > 0) {
    ctx.save(); ctx.globalAlpha *= kB;
    const covers = [
      ['chapeuzinho', '#c92a2a', 'Chapeuzinho Vermelho', (x, y) => girl(ctx, x, y + 52, .5, { t: lt, basket: false })],
      ['joão', '#2f9e44', 'João e o pé de feijão', (x, y) => withT(ctx, x, y + 58, .42, 0, () => beanstalk(ctx, 0, 0, 260, lt))],
      ['porquinhos', '#e64980', 'Os Três Porquinhos', (x, y) => { for (let i = -1; i <= 1; i++) pig(ctx, x + i * 34, y + 52, .36, { t: lt, ph: i }); }],
      ['cinderela', '#1c7ed6', 'Cinderela', (x, y) => slipper(ctx, x, y + 6, .95)],
      ['branca', '#7048e8', 'Branca de Neve', (x, y) => apple(ctx, x, y + 8, 1.15)],
    ];
    covers.forEach(([w, col, title, draw], i) => storyCover(ctx, 470 + i * 178, 290, 160, 230, col, title, draw, pop(lt, S.w(w) - .1)));
    chip(ctx, 'são contos de fadas', 820, 470, 32, '#5f3dc4', '#fff', pop(lt, S.w('são') - .1));
    ctx.restore();
  }
  bear(ctx, 1190, 615, .45, { t: lt, look: -1 });
  sceneTag(ctx, 'O que é conto de fadas', ap(lt, .2), '#fff', 'rgba(60,30,20,.55)');
};

/* ---------- 2. COMECO, MEIO E FIM ---------- */
SCENES.cmf = (ctx, lt, S) => {
  sky(ctx, '#e7f5ff', '#fff4e6');
  const cols = [['COMEÇO', 'começo', '#7048e8', 1], ['MEIO', 'meio', '#e8590c', 2], ['FIM', 'fim', '#2f9e44', 3]];
  cols.forEach(([lab, w, col, fi], i) => {
    const x = 225 + i * 415, k = pop(lt, S.w(w) - .05, .55);
    const on = ap(lt, S.f(fi) - .2, .4) * (fi < 3 ? 1 - ap(lt, S.f(fi + 1) - .2, .4) : 1);
    popAt(ctx, k, x, 330, () => {
      panel(ctx, x - 185, 110, 370, 450, '#ffffff', 28);
      if (on > 0) { ctx.save(); ctx.globalAlpha *= on; ctx.lineWidth = 8; ctx.strokeStyle = col; rr(ctx, x - 185, 110, 370, 450, 28); ctx.stroke(); ctx.restore(); }
      rr(ctx, x - 185, 110, 370, 70, 28); ctx.fillStyle = col; ctx.fill(); ctx.fillRect(x - 185, 150, 370, 30);
      txt(ctx, lab, x, 147, 40, '#fff');
    });
    if (i < 2) arrowR(ctx, x + 207, 330, k, '#868e96');
  });
  // comeco
  const x1 = 225;
  popAt(ctx, pop(lt, S.w('era') - .1, .6), x1, 225, () => { ctx.font = 'italic 700 40px Georgia, serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#5f3dc4'; ctx.fillText('Era uma vez...', x1, 228); });
  popAt(ctx, pop(lt, S.w('personagens')), x1 - 75, 430, () => { girl(ctx, x1 - 80, 450, .85, { t: lt }); });
  chip(ctx, 'personagens', x1 - 80, 500, 22, '#7048e8', '#fff', pop(lt, S.w('personagens')));
  popAt(ctx, pop(lt, S.w('lugar')), x1 + 85, 430, () => { tree(ctx, x1 + 85, 452, .62); });
  chip(ctx, 'lugar', x1 + 85, 500, 22, '#2f9e44', '#fff', pop(lt, S.w('lugar')));
  // meio
  const x2 = 640, kP = pop(lt, S.w('problema') - .1);
  popAt(ctx, kP, x2, 300, () => {
    wolf(ctx, x2 - 30, 430, .78, { t: lt });
    circ(ctx, x2 + 110, 250, 40, '#e03131'); txt(ctx, '!', x2 + 110, 253, 56, '#fff');
  });
  chip(ctx, 'um problema', x2, 500, 26, '#e8590c', '#fff', kP);
  // fim
  const x3 = 1055, kR = pop(lt, S.w('resolvido') - .1);
  popAt(ctx, kR, x3, 260, () => { checkMark(ctx, x3, 255, 1.3); txt(ctx, 'resolvido', x3, 325, 30, '#2f9e44'); });
  const kV = pop(lt, S.w('viveram') - .1, .6);
  popAt(ctx, kV, x3, 430, () => {
    heart(ctx, x3, 395, 1.0 + Math.sin(lt * 5) * .05);
    ctx.font = 'italic 700 27px Georgia, serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#c2255c';
    ctx.fillText('...e viveram felizes', x3, 465); ctx.fillText('para sempre.', x3, 500);
  });
  bear(ctx, 1210, 640, .34, { t: lt, look: -1 });
  sceneTag(ctx, 'Começo, meio e fim', ap(lt, .2));
};

/* ---------- 3. OS ELEMENTOS ---------- */
SCENES.elem = (ctx, lt, S) => {
  nightSky(ctx, lt, '#24215c', '#7048a8');
  const P = [['TEMPO', 'tempo', '#f08c00'], ['LUGAR', 'lugar', '#2f9e44'], ['PERSONAGENS', 'personagens', '#1c7ed6'], ['MAGIA', 'magia', '#ae3ec9']];
  const X = [170, 480, 790, 1100];
  P.forEach(([lab, w, col], i) => {
    const k = pop(lt, S.w(w) - .15, .55), x = X[i];
    popAt(ctx, k, x, 330, () => {
      panel(ctx, x - 145, 95, 290, 470, '#fffaf0', 26);
      rr(ctx, x - 145, 95, 290, 62, 26); ctx.fillStyle = col; ctx.fill(); ctx.fillRect(x - 145, 130, 290, 27);
      txt(ctx, lab, x, 128, lab.length > 8 ? 28 : 34, '#fff');
    });
  });
  // tempo
  let x = X[0];
  popAt(ctx, pop(lt, S.w('tempo')), x, 250, () => hourglass(ctx, x, 255, 1.0, lt));
  popAt(ctx, pop(lt, S.w('era')), x, 380, () => { ctx.font = 'italic 700 30px Georgia, serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#5f3dc4'; ctx.fillText('Era uma vez...', x, 385); });
  popAt(ctx, pop(lt, S.w('há')), x, 450, () => { ctx.font = 'italic 700 27px Georgia, serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#5f3dc4'; ctx.fillText('Há muito tempo...', x, 455); });
  // lugar
  x = X[1];
  [['reino', (a, b) => crown(ctx, a, b, .9)], ['castelo', (a, b) => castle(ctx, a, b + 40, .2)], ['floresta', (a, b) => { tree(ctx, a - 16, b + 40, .3); tree(ctx, a + 18, b + 44, .26); }]]
    .forEach(([w, draw], i) => { const y = 225 + i * 115, k = pop(lt, S.w(w));
      popAt(ctx, k, x, y, () => { draw(x - 70, y); txt(ctx, w, x + 50, y + 4, 32, '#23314f'); }); });
  // personagens
  x = X[2];
  const pers = [
    ['herói', 'herói', -68, 224, (a, b) => boy(ctx, a, b + 30, .42, { t: lt })],
    ['vilão', 'vilão', 68, 224, (a, b) => wolf(ctx, a - 8, b + 26, .34, { t: lt })],
    ['fadas', 'fadas', -68, 360, (a, b) => wand(ctx, a + 6, b - 10, .6, lt)],
    ['bruxas', 'bruxas', 68, 360, (a, b) => witchHat(ctx, a, b + 22, .62)],
    ['gigantes', 'gigantes', -68, 480, (a, b) => giant(ctx, a, b + 30, .13, {})],
    ['animais', 'animais que falam', 68, 480, (a, b) => { pig(ctx, a - 8, b + 30, .5, { t: lt }); bubble(ctx, a + 32, b - 32, '...', 1, a + 10, b - 10, { size: 16 }); }],
  ];
  pers.forEach(([w, lab, dx, y, draw]) => {
    const k = pop(lt, S.w(w));
    popAt(ctx, k, x + dx, y, () => { draw(x + dx, y - 22); txtWrap(ctx, lab, x + dx, y + 36, 130, lab.length > 10 ? 18 : 22, '#23314f', 'center', 900, 1.05); });
  });
  const kS = pop(lt, S.w('seres'));
  if (kS > 0) { ctx.save(); ctx.globalAlpha *= clamp(kS); ctx.strokeStyle = 'rgba(28,126,214,.35)'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); rr(ctx, x - 138, 282, 276, 274, 18); ctx.stroke(); ctx.restore();
    chip(ctx, 'seres mágicos', x, 284, 18, '#1c7ed6', '#fff', kS); }
  // magia
  x = X[3];
  const kM = pop(lt, S.w('magia'));
  popAt(ctx, kM, x, 330, () => {
    wand(ctx, x, 330, 1.6, lt);
    for (let i = 0; i < 7; i++) sparkle(ctx, x + Math.cos(lt * 1.5 + i * .9) * 100, 330 + Math.sin(lt * 1.5 + i * .9) * 150, 9 + (i % 3) * 4, i % 2 ? '#fcc419' : '#be4bdb', lt + i);
    txt(ctx, 'sempre tem!', x, 520, 30, '#ae3ec9');
  });
  bear(ctx, 1220, 660, .3, { t: lt, look: -1 });
  sceneTag(ctx, 'Os elementos', ap(lt, .2));
};
