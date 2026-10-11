/* cenas_v2d.js — roteiro v2: 12 CH/NH/LH, 13 plural, 14 dicionario, 15 invencoes e descobertas. */

/* ---------- 12. CH, NH, LH ---------- */
SCENES.digrafo = (ctx, lt, S) => {
  sky(ctx, '#fff0f6', '#e5dbff');
  const pairs = ap(lt, S.f(4) - .3, .6), dim = 1 - .93 * pairs;
  chip(ctx, 'duas letras, um som só', 640, 92, 28, '#5f3dc4', '#fff', pop(lt, S.w('duas') - .1) * dim);
  const cols = [
    ['CH', 'cê', 260, '#e8590c', ['[ch]ave', '[ch]uva', '[ch]apéu', '[ch]ocolate'], ['chave', 'chuva', 'chapéu', 'chocolate'], (x, y) => key(ctx, x + 14, y, .8, -.3)],
    ['NH', 'ene', 640, '#1c7ed6', ['ni[nh]o', 'gali[nh]a', 'ba[nh]o', 'cami[nh]o'], ['ninho', 'galinha', 'banho', 'caminho'], (x, y) => nest(ctx, x, y + 18, .75)],
    ['LH', 'éle', 1020, '#2f9e44', ['fo[lh]a', 'coe[lh]o', 'abe[lh]a', 'o[lh]o'], ['folha', 'coelho', 'abelha', 'olho'], (x, y) => leafIcon(ctx, x, y, .6, .5)],
  ];
  ctx.save(); ctx.globalAlpha *= dim;
  cols.forEach(([dg, cue, x, col, ws, keys, icon]) => {
    const k = pop(lt, S.w(cue) - .1);
    popAt(ctx, k, x, 170, () => { shadowOn(ctx, 12, 5, .2); rr(ctx, x - 80, 135, 160, 72, 24); ctx.fillStyle = col; ctx.fill(); shadowOff(ctx); txt(ctx, dg, x, 173, 52, '#fff'); });
    popAt(ctx, pop(lt, S.w(keys[0])), x, 255, () => icon(x, 255));
    ws.forEach((w, i) => wordCard(ctx, w, x, 330 + i * 64, 32, pop(lt, S.w(keys[i]) - .05), { hl: col, minW: 210 }));
  });
  ctx.restore();
  if (pairs > 0) {
    ctx.save(); ctx.globalAlpha *= pairs;
    txtOut(ctx, 'Uma letra muda tudo!', 640, 140, 46, '#5f3dc4', '#fff', 10);
    ctx.restore();
    pair(ctx, 'mola', 'mo[lh]a', 640, 250, 46, pop(lt, S.w('mola')), pop(lt, S.w('molha')), { hl: '#2f9e44' });
    pair(ctx, 'fila', 'fi[lh]a', 640, 355, 46, pop(lt, S.w('fila')), pop(lt, S.w('filha')), { hl: '#2f9e44' });
    pair(ctx, 'sono', 'so[nh]o', 640, 460, 46, pop(lt, S.w('sono')), pop(lt, S.w('sonho')), { hl: '#1c7ed6' });
  }
  bear(ctx, 1215, 655, .34, { t: lt, look: -1, wave: ap(lt, S.w('tudo'), .4) * (1 - ap(lt, S.w('tudo') + 1.5, .4)) });
  sceneTag(ctx, 'CH, NH, LH', ap(lt, .2));
};

/* ---------- 13. PLURAL ---------- */
SCENES.plural = (ctx, lt, S) => {
  sky(ctx, '#e3fafc', '#fff4e6');
  const OR = '#e8590c', BL = '#1c7ed6';
  chip(ctx, 'plural = mais de um', 640, 88, 30, '#5f3dc4', '#fff', pop(lt, S.w('mais') - .1));
  const rows = [
    ['vogal: + S', '#2f9e44', 1, [['casa', 'casa[s]', 'casa', 'casas', 0], ['lobo', 'lobo[s]', 'lobo', 'lobos', 0]]],
    ['R, Z: + ES', OR, 2, [['flo<r>', 'flor[es]', 'flor', 'flores', 0], ['lu<z>', 'luz[es]', 'luz', 'luzes', 0]]],
    ['ÃO → ÕES', BL, 3, [['avi<ão>', 'avi[ões]', 'avião', 'aviões', 0], ['bal<ão>', 'bal[ões]', 'balão', 'balões', 0]]],
    ['AL → AIS', '#ae3ec9', 4, [['anim<al>', 'anim[ais]', 'animal', 'animais', 0], ['jorn<al>', 'jorn[ais]', 'jornal', 'jornais', 0]]],
    ['M → NS', '#e64980', 5, [['home<m>', 'home[ns]', 'homem', 'homens', 0], ['nuve<m>', 'nuve[ns]', 'nuvem', 'nuvens', 0]]],
    ['o artigo', '#5c7cfa', 6, [['<o> lobo', '[os] lobo[s]', 'lobo', 'lobos', 1], ['<a> casa', '[as] casa[s]', 'casa', 'casas', 1]]],
  ];
  rows.forEach(([rule, col, fi, ps], r) => {
    const y = 162 + r * 74, k = pop(lt, S.f(fi) - .15);
    if (k > 0) { ctx.save(); ctx.globalAlpha *= clamp(k) * .5; rr(ctx, 40, y - 32, 1200, 64, 32); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
    chip(ctx, rule, 165, y, 25, col, '#fff', k);
    ps.forEach(([a, b, wa, wb, n], j) => pair(ctx, a, b, 560 + j * 420, y, 30, pop(lt, S.w(wa, n) - .05), pop(lt, S.w(wb, n) - .05), { hl: OR, hl2: '#1c7ed6' }));
  });
  bear(ctx, 1215, 655, .34, { t: lt, look: -1, jump: Math.max(0, Math.sin(clamp((lt - S.w('casas')) / .5) * PI)) });
  sceneTag(ctx, 'Plural', ap(lt, .2));
};

/* ---------- 14. DICIONARIO ---------- */
SCENES.dicio = (ctx, lt, S) => {
  sky(ctx, '#3b5bdb', '#748ffc');
  const ak = S.w('alfabética'), AB = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 26; i++) {
    const k = pop(lt, ak - .4 + i * .05, .35), x = 190 + i * 36.5;
    popAt(ctx, k, x, 100, () => { circ(ctx, x, 100, 16, i === 1 || i === 2 ? '#ffd43b' : '#fff'); txt(ctx, AB[i], x, 101, 20, '#364fc7'); });
  }
  openBook(ctx, 640, 375, 1000, 400, { cover: '#c92a2a' });
  // palavras-guia no alto da pagina
  const pg = ap(lt, S.w('palavras-guia') - .2, .4);
  ctx.save(); ctx.font = `italic 800 22px ${FONT}`; ctx.fillStyle = pg > 0 ? '#e8590c' : '#adb5bd'; ctx.textBaseline = 'middle';
  ctx.textAlign = 'left'; ctx.fillText('bala', 175, 200); ctx.textAlign = 'right'; ctx.fillText('cavalo', 610, 200); ctx.restore();
  if (pg > 0) { ctx.save(); ctx.globalAlpha = pg; ctx.strokeStyle = '#e8590c'; ctx.lineWidth = 4; rr(ctx, 162, 182, 70, 36, 10); ctx.stroke(); rr(ctx, 532, 182, 90, 36, 10); ctx.stroke();
    txt(ctx, 'palavras-guia', 385, 200, 22, '#e8590c', 'center', 900); ctx.restore(); }
  ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(165, 222); ctx.lineTo(615, 222); ctx.stroke();
  const ents = [['b[a]la', 'bala'], ['b[o]la', 'bola'], ['b[u]le', 'bule'], ['ca<m>a', 'cama'], ['ca<s>a', 'casa'], ['ca<v>alo', 'cavalo']];
  ents.forEach(([sp, key], i) => {
    const y = 262 + i * 52, k = pop(lt, S.w(key) - .05);
    popAt(ctx, k, 220, y, () => rich(ctx, sp, 200, y, 36, { align: 'left', hl: '#e8590c', hl2: '#1c7ed6', color: '#1c2a4f' }));
  });
  const k2 = pop(lt, S.w('segunda') - .1), k3 = pop(lt, S.w('terceira') - .1);
  if (k2 > 0 && lt < S.f(3)) { ctx.save(); ctx.globalAlpha *= clamp(k2) * (1 - ap(lt, S.f(2), .3)); ctx.strokeStyle = '#e8590c'; ctx.lineWidth = 4; rr(ctx, 218, 240, 30, 150, 10); ctx.stroke(); ctx.restore(); }
  if (k3 > 0 && lt < S.f(3) + .5) { ctx.save(); ctx.globalAlpha *= clamp(k3) * (1 - ap(lt, S.f(3), .4)); ctx.strokeStyle = '#1c7ed6'; ctx.lineWidth = 4; rr(ctx, 238, 396, 34, 150, 10); ctx.stroke(); ctx.restore(); }
  // pagina direita
  chip(ctx, '1ª letra igual? olhe a 2ª', 895, 215, 24, '#e8590c', '#fff', k2);
  chip(ctx, '2ª letra igual? olhe a 3ª', 895, 268, 24, '#1c7ed6', '#fff', k3);
  const vb = ap(lt, S.w('verbete') - .2, .4), sig = S.f(5);
  if (vb > 0) {
    ctx.save(); ctx.globalAlpha *= vb;
    ctx.strokeStyle = '#2f9e44'; ctx.lineWidth = 4; ctx.setLineDash([12, 8]); rr(ctx, 672, 306, 448, 248, 16); ctx.stroke(); ctx.setLineDash([]);
    chip(ctx, 'verbete', 1060, 306, 20, '#2f9e44', '#fff', 1);
    txt(ctx, 'manga', 700, 345, 40, '#1c2a4f', 'left', 900);
    const lines = 1 - ap(lt, sig, .4);
    if (lines > 0) { ctx.save(); ctx.globalAlpha *= lines; ctx.strokeStyle = 'rgba(60,40,30,.25)'; ctx.lineWidth = 4;
      for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(702, 400 + i * 34); ctx.lineTo(1080 - (i === 3 ? 140 : 0), 400 + i * 34); ctx.stroke(); } ctx.restore(); }
    ctx.restore();
  }
  const kf = pop(lt, S.w('fruta') - .1), kc = pop(lt, S.w('camisa') - .1);
  popAt(ctx, kf, 785, 450, () => { mango(ctx, 785, 445, .8); txt(ctx, '1. fruta', 785, 520, 26, '#e8590c'); });
  popAt(ctx, kc, 990, 450, () => { shirt(ctx, 990, 445, .8, ap(lt, S.w('parte') - .1, .4)); txt(ctx, '2. parte da camisa', 990, 520, 24, '#1c7ed6'); });
  const km = pop(lt, S.w('significado') - .1);
  chip(ctx, 'mais de um significado', 895, 380, 22, '#5f3dc4', '#fff', km * (1 - ap(lt, S.w('fruta') - .3, .3)));
  bear(ctx, 1215, 150, .3, { t: lt, look: -1 });
  sceneTag(ctx, 'Dicionário', ap(lt, .2));
};

/* ---------- 15. INVENCOES E DESCOBERTAS ---------- */
SCENES.invent = (ctx, lt, S) => {
  sky(ctx, '#f3d9b1', '#e9c08a');
  ctx.save(); ctx.globalAlpha = .18; for (let x = 40; x < W; x += 48) for (let y = 40; y < 400; y += 48) circ(ctx, x, y, 4, '#7c4a1e'); ctx.restore();
  ctx.fillStyle = '#9c6b3e'; ctx.fillRect(0, 400, W, 22); ctx.fillStyle = grad(ctx, 422, H, ['#7c4a1e', '#5c3416']); ctx.fillRect(0, 422, W, 300);
  const desc = ap(lt, S.f(4) - .3, .6), dim = 1 - .82 * desc;
  chip(ctx, 'invenção: criada por pessoas, não existia antes', 640, 98, 28, '#e8590c', '#fff', pop(lt, S.w('invenção') - .1) * dim);
  chip(ctx, 'inventor: quem inventa', 640, 158, 26, '#1c7ed6', '#fff', pop(lt, S.w('inventor') - .1) * dim);
  ctx.save(); ctx.globalAlpha *= dim;
  const it = [['roda', 170], ['lâmpada', 410], ['telefone', 650], ['bicicleta', 890], ['avião', 1120]];
  it.forEach(([w, x], i) => {
    const k = pop(lt, S.w(w) - .05);
    if (k <= 0) return;
    popAt(ctx, k, x, 310, () => {
      if (i === 0) wheel(ctx, x, 320, 58, lt * 2.4);
      if (i === 1) bulb(ctx, x, 320, .85, ap(lt, S.w(w) + .3, .4) * (.85 + .15 * Math.sin(lt * 6)));
      if (i === 2) phone(ctx, x, 325, .8);
      if (i === 3) bike(ctx, x, 375, 1.0, lt);
      if (i === 4) { const fly = ap(lt, S.w('aviação') - .6, 2.4); plane14bis(ctx, x - 20, 315 - Math.sin(fly * PI) * 50, .82, lt); }
    });
    txt(ctx, w, x, 450, 32, '#fff3bf');
  });
  ctx.restore();
  chip(ctx, '14-Bis', 1120, 230, 22, '#2f9e44', '#fff', pop(lt, S.w('aviação')) * dim);
  const sd = pop(lt, S.w('santos') - .1) * (1 - desc);
  popAt(ctx, sd, 640, 532, () => {
    shadowOn(ctx); rr(ctx, 300, 500, 680, 62, 31); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx);
    txt(ctx, 'Santos Dumont, brasileiro: pai da aviação', 640, 532, 27, '#5c3416');
  });
  // descoberta
  popAt(ctx, easeBack(desc), 640, 330, () => {
    shadowOn(ctx, 24, 8, .3); rr(ctx, 200, 110, 880, 460, 36); ctx.fillStyle = '#fffaf0'; ctx.fill(); shadowOff(ctx);
    txt(ctx, 'descoberta', 640, 170, 54, '#c92a2a');
    txt(ctx, 'encontrar algo que já existia', 640, 232, 32, '#5c3416', 'center', 800);
    const its = [['fogo', 'o fogo', 380, (x, y) => fire(ctx, x, y + 50, .75, lt)],
                 ['planta', 'uma planta nova', 640, (x, y) => leafIcon(ctx, x, y, .85, .3)],
                 ['animal', 'um animal que ninguém conhecia', 900, (x, y) => { paw(ctx, x - 40, y + 30, 1); paw(ctx, x + 10, y + 50, 1); magnifier(ctx, x + 10, y - 10, .75); }]];
    its.forEach(([w, lab, x, draw]) => { const k = pop(lt, S.w(w) - .1);
      popAt(ctx, k, x, 360, () => { draw(x, 350); txtWrap(ctx, lab, x, 500, 240, 26, '#c2410c', 'center', 900); }); });
  });
  bear(ctx, 52, 400, .3, { t: lt, look: 1, jump: Math.max(0, Math.sin(clamp((lt - S.w('lâmpada') - .3) / .5) * PI)) });
  sceneTag(ctx, 'Invenções e descobertas', ap(lt, .2));
};
