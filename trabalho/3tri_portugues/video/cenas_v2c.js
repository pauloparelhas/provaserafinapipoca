/* cenas_v2c.js — roteiro v2: 8 letra H, 9 J ou G, 10 G ou GU, 11 C ou QU.
   Marcacao das palavras (lib.js/rich): (x) muda/esmaecida, {x} quietinha riscada, [x] cor 1, <x> cor 2. */

/* fileira de cartoes que entram no ritmo da fala: words = [spec, palavra-falada, n] */
function flowRow(ctx, S, lt, words, cx, y, size, o = {}) {
  return cardRow(ctx, words.map(w => w[0]), cx, y, size, words.map(w => pop(lt, S.w(w[1], w[2] || 0) - .05)), o);
}

/* ---------- 8. LETRA H ---------- */
SCENES.letraH = (ctx, lt, S) => {
  sky(ctx, '#d0ebff', '#fff9db');
  for (let i = 0; i < 3; i++) cloud(ctx, 300 + i * 380 + lt * 7, 120 + (i % 2) * 40, .6, '#fff', .8);
  helicopter(ctx, lerp(-200, 1500, lt / S.dur), 92, .3, lt);
  ctx.fillStyle = '#b2f2bb'; ctx.fillRect(0, 590, W, 130);
  const hk = pop(lt, S.w('agá') - .1, .6);
  popAt(ctx, hk, 170, 250, () => {
    shadowOn(ctx, 20, 8, .25); rr(ctx, 70, 150, 200, 200, 36); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx);
    txt(ctx, 'H', 170, 256, 170, '#e8590c');
  });
  muteIcon(ctx, 170, 410, .9, pop(lt, S.w('som')));
  chip(ctx, 'não faz som', 170, 478, 24, '#e03131', '#fff', pop(lt, S.w('nenhum')));
  chip(ctx, 'mas é escrito', 170, 538, 24, '#e8590c', '#fff', pop(lt, S.w('escrito')));
  const W9 = [['hoje'], ['homem'], ['hotel'], ['hospital'], ['hipopótamo'], ['helicóptero'], ['história'], ['horta'], ['herói']];
  W9.forEach(([w], i) => {
    const x = 515 + (i % 3) * 300, y = 165 + Math.floor(i / 3) * 92;
    wordCard(ctx, '(h)' + w.slice(1), x, y, 40, pop(lt, S.w(w) - .05), { muteDot: true, minW: 250 });
  });
  const ksem = pop(lt, S.w('ovo') - .15);
  chip(ctx, 'sem H', 430, 478, 26, '#2f9e44', '#fff', ksem);
  flowRow(ctx, S, lt, [['ovo', 'ovo'], ['uva', 'uva'], ['ilha', 'ilha'], ['escola', 'escola']], 815, 478, 38, { color: '#2b8a3e' });
  // risco "H?" sobre a fileira sem H
  const kNo = pop(lt, S.w('agá', 2) - .1);
  popAt(ctx, kNo, 815, 545, () => { rich(ctx, 'não têm H', 815, 548, 28, { color: '#2b8a3e' }); });
  bear(ctx, 1210, 650, .36, { t: lt, look: -1, jump: Math.max(0, Math.sin(clamp((lt - S.w('hoje')) / .5) * PI)) });
  sceneTag(ctx, 'Letra H', ap(lt, .2));
};

/* ---------- 9. J OU G ---------- */
SCENES.jg = (ctx, lt, S) => {
  paperBg(ctx, '#fff4e6', '#ffe8cc');
  const OR = '#e8590c', BL = '#1c7ed6';
  popAt(ctx, pop(lt, S.w('jota')), 400, 112, () => { circ(ctx, 400, 112, 50, '#fff'); txt(ctx, 'J', 400, 117, 76, OR); });
  popAt(ctx, pop(lt, S.w('gê')), 880, 112, () => { circ(ctx, 880, 112, 50, '#fff'); txt(ctx, 'G', 880, 117, 76, BL); });
  chip(ctx, 'som de jê', 640, 112, 30, '#5f3dc4', '#fff', pop(lt, S.w('jê')));
  chip(ctx, 'com A, O, U: sempre J', 640, 198, 26, OR, '#fff', pop(lt, S.w('sempre')));
  flowRow(ctx, S, lt, [['[j]anela', 'janela'], ['[j]acaré', 'jacaré'], ['[j]oia', 'joia'], ['ca[j]u', 'caju'], ['laran[j]a', 'laranja'], ['fei[j]ão', 'feijão']], 640, 268, 34, { hl: OR });
  chip(ctx, 'com E, I: J ou G', 640, 345, 26, '#5f3dc4', '#fff', pop(lt, S.w('pode', 1)));
  const kJ = pop(lt, S.w('jeito') - .15), kG = pop(lt, S.w('gelo') - .15);
  popAt(ctx, kJ, 150, 418, () => { circ(ctx, 150, 418, 32, OR); txt(ctx, 'J', 150, 421, 40, '#fff'); });
  flowRow(ctx, S, lt, [['[j]eito', 'jeito'], ['[j]iló', 'jiló'], ['[j]ipe', 'jipe']], 520, 418, 34, { hl: OR });
  popAt(ctx, kG, 150, 496, () => { circ(ctx, 150, 496, 32, BL); txt(ctx, 'G', 150, 499, 40, '#fff'); });
  flowRow(ctx, S, lt, [['<g>elo', 'gelo'], ['<g>ente', 'gente'], ['<g>irafa', 'girafa'], ['<g>igante', 'gigante'], ['má<g>ico', 'mágico']], 640, 496, 34, { hl2: BL });
  const gk = pop(lt, S.w('girafa'));
  popAt(ctx, gk, 1150, 430, () => giraffe(ctx, 1160, 470, .38, lt));
  chip(ctx, 'palavra por palavra', 640, 565, 26, '#2f9e44', '#fff', pop(lt, S.w('palavra') - .1));
  bear(ctx, 1215, 655, .34, { t: lt, look: -1, wave: ap(lt, S.w('palavra'), .4) });
  sceneTag(ctx, 'J ou G', ap(lt, .2));
};

/* ---------- 10. G OU GU ---------- */
SCENES.ggu = (ctx, lt, S) => {
  paperBg(ctx, '#e7f5ff', '#d0ebff');
  const OR = '#e8590c', BL = '#1c7ed6';
  const tG = S.f(4) - .2, dim = 1 - .82 * ap(lt, tG, .5);
  ctx.save(); ctx.globalAlpha *= dim;
  flowRow(ctx, S, lt, [['[g]ato', 'gato'], ['[g]alinha', 'galinha'], ['[g]orila', 'gorila'], ['fo[g]o', 'fogo']], 640, 140, 38, { hl: OR });
  chip(ctx, 'G com A, O, U: som de guê', 640, 218, 26, OR, '#fff', pop(lt, S.w('guê') - .1));
  const qk = pop(lt, S.w('quietinho') - .1);
  popAt(ctx, qk, 640, 295, () => {
    shadowOn(ctx, 10, 4, .2); rr(ctx, 320, 266, 640, 60, 30); ctx.fillStyle = '#5f3dc4'; ctx.fill(); shadowOff(ctx);
    rich(ctx, 'antes de E e I: G{U}  (o U fica quietinho)', 640, 297, 27, { color: '#ffffff' });
  });
  flowRow(ctx, S, lt, [['[g]{u}erra', 'guerra'], ['fo[g]{u}ete', 'foguete'], ['fo[g]{u}eira', 'fogueira'], ['[g]{u}itarra', 'guitarra'], ['á[g]{u}ia', 'águia']], 640, 380, 38, { hl: OR });
  chip(ctx, 'sem o U: GE, GI = som de jê', 400, 470, 26, BL, '#fff', pop(lt, S.w('jê') - .1));
  flowRow(ctx, S, lt, [['<g>elo', 'gelo'], ['<g>irafa', 'girafa']], 850, 470, 38, { hl2: BL });
  ctx.restore();
  const rk = ap(lt, S.w('foguete') - .2, 3.2);
  if (rk > 0 && rk < 1) rocket(ctx, 1225, lerp(620, -160, easeInOut(rk)), .32, lt);
  // GIGANTE: os dois sons
  const gg = pop(lt, tG + .1, .6);
  popAt(ctx, gg, 640, 320, () => {
    shadowOn(ctx, 24, 8, .3); rr(ctx, 300, 200, 680, 250, 36); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx);
    const x0 = 640 - richWidth(ctx, 'GIGANTE', 110) / 2;
    rich(ctx, '<GI>[GAN]TE', 640, 300, 110, { hl: OR, hl2: BL });
    ctx.font = `900 110px ${FONT}`; const wGI = ctx.measureText('GI').width, wGAN = ctx.measureText('GAN').width;
    chip(ctx, 'GI = som de jê', x0 + wGI / 2, 405, 24, BL, '#fff', pop(lt, S.w('dois') - .1));
    chip(ctx, 'GAN = som de guê', x0 + wGI + wGAN / 2 + 40, 405, 24, OR, '#fff', pop(lt, S.w('sons') - .1));
  });
  bear(ctx, 1215, 655, .34, { t: lt, look: -1, jump: Math.max(0, Math.sin(clamp((lt - S.w('sons')) / .5) * PI)) });
  sceneTag(ctx, 'G ou GU', ap(lt, .2));
};

/* ---------- 11. C OU QU ---------- */
SCENES.caque = (ctx, lt, S) => {
  sky(ctx, '#d3f9d8', '#fff9db');
  ctx.fillStyle = '#b2f2bb'; ctx.fillRect(0, 590, W, 130);
  const OR = '#e8590c';
  const c1 = flowRow(ctx, S, lt, [['[c]asa', 'casa'], ['[c]avalo', 'cavalo'], ['[c]opo', 'copo'], ['[c]oelho', 'coelho'], ['[c]ubo', 'cubo']], 640, 135, 38, { hl: OR });
  popAt(ctx, pop(lt, S.w('casa')), c1[0], 225, () => smallHouse(ctx, c1[0], 255, .62));
  popAt(ctx, pop(lt, S.w('copo')), c1[2], 225, () => cup(ctx, c1[2], 225, .45));
  popAt(ctx, pop(lt, S.w('cubo')), c1[4], 225, () => cube(ctx, c1[4] - 6, 228, .55));
  chip(ctx, 'C com A, O, U', 640, 300, 28, OR, '#fff', pop(lt, S.w('cê') - .1));
  const qk = pop(lt, S.w('quê') - .1);
  popAt(ctx, qk, 640, 372, () => {
    shadowOn(ctx, 10, 4, .2); rr(ctx, 370, 343, 540, 60, 30); ctx.fillStyle = '#5f3dc4'; ctx.fill(); shadowOff(ctx);
    rich(ctx, 'antes de E e I: Q{U}', 640, 374, 30, { color: '#ffffff' });
  });
  const c2 = flowRow(ctx, S, lt, [['[q]{u}eijo', 'queijo'], ['[q]{u}ente', 'quente'], ['[q]{u}iabo', 'quiabo'], ['es[q]{u}ilo', 'esquilo'], ['má[q]{u}ina', 'máquina'], ['mos[q]{u}ito', 'mosquito']], 640, 455, 34, { hl: OR });
  popAt(ctx, pop(lt, S.w('queijo')), c2[0], 535, () => cheese(ctx, c2[0], 540, .5));
  popAt(ctx, pop(lt, S.w('esquilo')), c2[3], 540, () => squirrel(ctx, c2[3] - 10, 590, .55, lt));
  bear(ctx, 1215, 655, .34, { t: lt, look: -1 });
  sceneTag(ctx, 'C ou QU', ap(lt, .2));
};
