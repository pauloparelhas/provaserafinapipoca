/* cenas4.js — invencoes, CA/QUE, CH/NH/LH, plural, fecho. */

function arrowR(ctx, x, y, k, col = '#868e96') {
  if (k <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(k); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - 22, y); ctx.lineTo(x + 18, y); ctx.moveTo(x + 6, y - 12); ctx.lineTo(x + 20, y); ctx.lineTo(x + 6, y + 12); ctx.stroke(); ctx.restore();
}
function pair(ctx, a, b, cx, y, size, k1, k2, o = {}) {
  const wa = richWidth(ctx, a, size) + size * .9, wb = richWidth(ctx, b, size) + size * .9, gap = 64;
  const tot = wa + wb + gap, x0 = cx - tot / 2;
  wordCard(ctx, a, x0 + wa / 2, y, size, k1, o);
  arrowR(ctx, x0 + wa + gap / 2, y, k2);
  wordCard(ctx, b, x0 + wa + gap + wb / 2, y, size, k2, o);
}

/* ---------- 9. INVENCOES ---------- */
SCENES.invent = (ctx, lt, S) => {
  sky(ctx, '#f3d9b1', '#e9c08a');
  ctx.save(); ctx.globalAlpha = .18; for (let x = 40; x < W; x += 48) for (let y = 40; y < 400; y += 48) circ(ctx, x, y, 4, '#7c4a1e'); ctx.restore();
  ctx.fillStyle = '#9c6b3e'; ctx.fillRect(0, 400, W, 22); ctx.fillStyle = grad(ctx, 422, H, ['#7c4a1e', '#5c3416']); ctx.fillRect(0, 422, W, 300);
  const desc = ap(lt, S.f(4) - .3, .6), dim = 1 - .8 * desc;
  chip(ctx, 'invenção: criada por pessoas, não existia antes', 640, 100, 28, '#e8590c', '#fff', pop(lt, S.w('invenção')) * dim);
  chip(ctx, 'inventor: quem inventa', 640, 165, 26, '#1c7ed6', '#fff', pop(lt, S.w('inventor')) * dim);
  ctx.save(); ctx.globalAlpha *= dim;
  const it = [['roda', 250], ['lâmpada', 510], ['telefone', 770], ['avião', 1030]];
  it.forEach(([w, x], i) => {
    const k = pop(lt, S.w(w));
    if (k <= 0) return;
    popAt(ctx, k, x, 320, () => {
      if (i === 0) wheel(ctx, x + (1 - clamp(ap(lt, S.w(w), 1))) * -200, 330, 62, lt * 2.4);
      if (i === 1) bulb(ctx, x, 320, .95, ap(lt, S.w(w) + .3, .4) * (.85 + .15 * Math.sin(lt * 6)));
      if (i === 2) phone(ctx, x, 330, .9);
      if (i === 3) { const fly = ap(lt, S.w('aviação') - .6, 2.4); plane14bis(ctx, x - 40 + Math.sin(fly * PI) * 0, 320 - Math.sin(fly * PI) * 70, 1.0, lt); }
    });
    txt(ctx, w, x, 470, 34, '#fff3bf');
  });
  ctx.restore();
  // Santos Dumont
  const sd = pop(lt, S.w('santos')) * (1 - desc);
  popAt(ctx, sd, 640, 528, () => {
    shadowOn(ctx); rr(ctx, 330, 497, 620, 62, 31); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx);
    txt(ctx, 'Santos Dumont, brasileiro: pai da aviação', 640, 529, 27, '#5c3416');
  });
  chip(ctx, '14-Bis', 1030, 225, 24, '#2f9e44', '#fff', pop(lt, S.w('aviação')) * dim);
  // descoberta
  popAt(ctx, easeBack(desc), 640, 300, () => {
    shadowOn(ctx, 24, 8, .3); rr(ctx, 250, 140, 780, 330, 36); ctx.fillStyle = '#fffaf0'; ctx.fill(); shadowOff(ctx);
    fire(ctx, 400, 400, 1, lt);
    txt(ctx, 'descoberta', 740, 230, 54, '#c92a2a');
    txt(ctx, 'encontrar algo', 740, 300, 32, '#5c3416', 'center', 800);
    txt(ctx, 'que já existia', 740, 345, 32, '#5c3416', 'center', 800);
    chip(ctx, 'o fogo', 740, 415, 28, '#e8590c', '#fff', pop(lt, S.w('fogo')));
  });
  bear(ctx, 80, 612, .45, { t: lt, look: 1, jump: Math.max(0, Math.sin(clamp((lt - S.w('lâmpada') - .3) / .5) * PI)) });
  sceneTag(ctx, 'Invenções e descobertas', ap(lt, .2));
};

/* ---------- 10. CA CO CU / QUE QUI ---------- */
SCENES.caque = (ctx, lt, S) => {
  sky(ctx, '#d3f9d8', '#fff9db');
  pine(ctx, 60, 600, .9, '#40c057'); pine(ctx, 1240, 600, 1, '#2f9e44');
  ctx.fillStyle = '#b2f2bb'; ctx.fillRect(0, 590, W, 130);
  const OR = '#e8590c';
  const c1 = cardRow(ctx, ['[c]asa', '[c]opo', '[c]ubo'], 560, 150, 42, [pop(lt, S.w('casa')), pop(lt, S.w('copo')), pop(lt, S.w('cubo'))], { hl: OR });
  ['CA', 'CO', 'CU'].forEach((g, i) => chip(ctx, g, c1[i], 222, 26, OR, '#fff', pop(lt, S.w(['cá', 'cô', 'cu'][i]))));
  popAt(ctx, pop(lt, S.w('casa')), 1010, 175, () => smallHouse(ctx, 1010, 205, .9));
  popAt(ctx, pop(lt, S.w('copo')), 1120, 175, () => cup(ctx, 1120, 180, .6));
  popAt(ctx, pop(lt, S.w('cubo')), 1220, 175, () => cube(ctx, 1215, 180, .7));
  const qk = pop(lt, S.w('quietinho'));
  popAt(ctx, qk, 640, 300, () => {
    shadowOn(ctx, 10, 4, .2); rr(ctx, 320, 270, 640, 60, 30); ctx.fillStyle = '#5f3dc4'; ctx.fill(); shadowOff(ctx);
    rich(ctx, 'antes de E e I: Q{U} — o U fica quietinho', 640, 301, 28, { color: '#ffffff' });
  });
  cardRow(ctx, ['[q]{u}eijo', '[q]{u}iabo', 'es[q]{u}ilo', 'má[q]{u}ina'], 560, 390, 42, [pop(lt, S.w('queijo')), pop(lt, S.w('quiabo')), pop(lt, S.w('esquilo')), pop(lt, S.w('máquina'))], { hl: OR });
  popAt(ctx, pop(lt, S.w('queijo')), 1000, 540, () => cheese(ctx, 1000, 545, .75));
  popAt(ctx, pop(lt, S.w('esquilo')), 1150, 600, () => squirrel(ctx, 1150, 600, .9, lt));
  bear(ctx, 170, 612, .48, { t: lt, look: 1 });
  sceneTag(ctx, 'CA, CO, CU · QUE, QUI', ap(lt, .2));
};

/* ---------- 11. CH, NH, LH ---------- */
SCENES.digrafo = (ctx, lt, S) => {
  sky(ctx, '#fff0f6', '#e5dbff');
  const pairs = ap(lt, S.f(4) - .3, .6), dim = 1 - .93 * pairs;
  chip(ctx, 'duas letras, um som só', 640, 75, 28, '#5f3dc4', '#fff', pop(lt, S.w('duplas')) * dim);
  const cols = [
    ['CH', 'cê', 260, '#e8590c', ['[ch]ave', '[ch]uva', '[ch]apéu'], ['chave', 'chuva', 'chapéu'], (x, y) => key(ctx, x + 14, y, .9, -.3)],
    ['NH', 'ene', 640, '#1c7ed6', ['ni[nh]o', 'gali[nh]a', 'cami[nh]o'], ['ninho', 'galinha', 'caminho'], (x, y) => nest(ctx, x, y + 20, .85)],
    ['LH', 'éle', 1020, '#2f9e44', ['fo[lh]a', 'coe[lh]o', 'o[lh]o'], ['folha', 'coelho', 'olho'], (x, y) => leafIcon(ctx, x, y, .7, .5)],
  ];
  ctx.save(); ctx.globalAlpha *= dim;
  cols.forEach(([dg, cue, x, col, ws, keys, icon]) => {
    const k = pop(lt, S.w(cue));
    popAt(ctx, k, x, 160, () => { shadowOn(ctx, 12, 5, .2); rr(ctx, x - 80, 120, 160, 80, 24); ctx.fillStyle = col; ctx.fill(); shadowOff(ctx); txt(ctx, dg, x, 162, 56, '#fff'); });
    popAt(ctx, pop(lt, S.w(keys[0])), x, 260, () => icon(x, 260));
    ws.forEach((w, i) => wordCard(ctx, w, x, 360 + i * 76, 36, pop(lt, S.w(keys[i])), { hl: col, minW: 200 }));
  });
  ctx.restore();
  if (pairs > 0) {
    txtOut(ctx, 'Uma letrinha muda tudo!', 640, 130, 46, '#5f3dc4', '#fff', 10);
    pair(ctx, 'mola', 'mo[lh]a', 640, 245, 46, pop(lt, S.w('mola')), pop(lt, S.w('molha')), { hl: '#2f9e44' });
    pair(ctx, 'fila', 'fi[lh]a', 640, 350, 46, pop(lt, S.w('fila')), pop(lt, S.w('filha')), { hl: '#2f9e44' });
    pair(ctx, 'sono', 'so[nh]o', 640, 455, 46, pop(lt, S.w('sono')), pop(lt, S.w('sonho')), { hl: '#1c7ed6' });
  }
  bear(ctx, 90, 612, .45, { t: lt, look: 1, wave: ap(lt, S.w('tudo'), .4) * (1 - ap(lt, S.w('tudo') + 1.5, .4)) });
  sceneTag(ctx, 'CH, NH, LH', ap(lt, .2));
};

/* ---------- 12. PLURAL ---------- */
SCENES.plural = (ctx, lt, S) => {
  sky(ctx, '#e3fafc', '#fff4e6');
  const OR = '#e8590c', BL = '#1c7ed6';
  const intro = 1 - ap(lt, S.f(1) - .4, .6);
  if (intro > 0) {
    ctx.save(); ctx.globalAlpha *= intro;
    const k1 = pop(lt, S.w('casa')), k2 = pop(lt, S.w('casas'));
    popAt(ctx, k1, 330, 330, () => { smallHouse(ctx, 330, 360, 1.6); });
    wordCard(ctx, '[uma] casa', 330, 440, 40, k1, { hl: OR });
    popAt(ctx, k2, 880, 330, () => { smallHouse(ctx, 800, 360, 1.6, '#d0bfff', '#7048e8'); smallHouse(ctx, 960, 360, 1.6, '#a5d8ff', '#1c7ed6'); });
    wordCard(ctx, '[duas] casa[s]', 880, 440, 40, k2, { hl: OR });
    arrowR(ctx, 590, 330, k2);
    chip(ctx, 'plural = mais de um', 640, 540, 30, '#5f3dc4', '#fff', pop(lt, S.w('plural')));
    const cols = ['#ff6b6b', '#ffd43b', '#69db7c', '#4dabf7', '#da77f2', '#ff922b'];
    const nb = 1 + Math.floor(5 * ap(lt, S.w('casas'), 1.2));
    for (let i = 0; i < nb; i++) balloon(ctx, 560 + (i % 3) * 70, 130 + Math.floor(i / 3) * 30 - (i % 2) * 20, .7, cols[i], lt, i);
    ctx.restore();
  }
  if (intro < 1) {
    ctx.save(); ctx.globalAlpha *= 1 - intro;
    const rows = [
      ['+ S', '#2f9e44', 1, [['lobo', 'lobo[s]', 'lobo', 'lobos']]],
      ['R, Z → ES', OR, 2, [['flo<r>', 'flor[es]', 'flor', 'flores'], ['lu<z>', 'luz[es]', 'luz', 'luzes']]],
      ['ÃO → ÕES', BL, 3, [['avi<ão>', 'avi[ões]', 'avião', 'aviões'], ['bal<ão>', 'bal[ões]', 'balão', 'balões']]],
      ['L → IS', '#ae3ec9', 4, [['anima<l>', 'anima[is]', 'animal', 'animais']]],
      ['M → NS', '#e64980', 5, [['home<m>', 'home[ns]', 'homem', 'homens']]],
      ['artigo', '#5c7cfa', 6, [['[o] lobo', '[os] lobo[s]', 'lobo', 'lobos']]],
    ];
    rows.forEach(([rule, col, fi, ps], r) => {
      const y = 112 + r * 80, k = pop(lt, S.f(fi) - .1);
      chip(ctx, rule, 175, y, 26, col, '#fff', k);
      ps.forEach(([a, b, wa, wb], j) => {
        const n = fi === 6 ? 1 : 0;
        pair(ctx, a, b, ps.length === 1 ? 640 : 520 + j * 400, y, 32, pop(lt, S.w(wa, n)), pop(lt, S.w(wb, n)), { hl: OR, hl2: BL });
      });
    });
    ctx.restore();
  }
  bear(ctx, 1190, 612, .45, { t: lt, look: -1, jump: Math.max(0, Math.sin(clamp((lt - S.w('casas')) / .5) * PI)) });
  sceneTag(ctx, 'Plural', ap(lt, .2));
};

/* ---------- 13. FECHO ---------- */
SCENES.fecho = (ctx, lt, S) => {
  nightSky(ctx, lt, '#24215c', '#7048a8');
  grassHill(ctx, 600, '#2b6a4a', 10, lt * .1);
  const items = [['Era uma vez', 'era', 0, '#7048e8'], ['H mudo', 'agá', 0, '#e8590c'], ['J e G', 'jota', 0, '#f08c00'],
    ['G e GU', 'gê', 1, '#1c7ed6'], ['dicionário', 'dicionário', 0, '#c92a2a'], ['invenções', 'invenções', 0, '#2f9e44'],
    ['CA e QUE', 'cá', 0, '#e64980'], ['CH · NH · LH', 'cê', 0, '#5f3dc4'], ['plural', 'plural', 0, '#0c8599']];
  const end = ap(lt, S.f(2) - .3, .6);
  items.forEach(([s, w, n, col], i) => {
    const x = 340 + (i % 3) * 300, y = 150 + Math.floor(i / 3) * 95;
    chip(ctx, s, x, y - end * 30, 32, col, '#fff', pop(lt, S.w(w, n)));
  });
  popAt(ctx, pop(lt, S.w('viveram'), .7), 640, 480, () => {
    ctx.font = `italic 700 50px Georgia, serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = 10; ctx.strokeStyle = '#24215c'; ctx.strokeText('...e viveram felizes para sempre.', 600, 480);
    ctx.fillStyle = '#ffe066'; ctx.fillText('...e viveram felizes para sempre.', 600, 480);
  });
  if (end > 0) for (let i = 0; i < 14; i++) {
    const a = i * TAU / 14 + lt * .4, r = 300 + Math.sin(lt * 2 + i) * 20;
    sparkle(ctx, 640 + Math.cos(a) * r * 1.4, 400 + Math.sin(a) * r * .6, 9 + (i % 3) * 3, i % 2 ? '#ffe066' : '#f783ac', lt * 2 + i);
  }
  bear(ctx, 1195, 612, .58, { t: lt, look: -1, wave: ap(lt, S.w('viveram'), .4) });
  sceneTag(ctx, 'Tudo junto', ap(lt, .2));
};
