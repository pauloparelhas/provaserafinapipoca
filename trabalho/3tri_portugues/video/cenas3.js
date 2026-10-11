/* cenas3.js — letra H, J/G, G/GU, dicionario. */

/* desenha uma fileira de cartoes centrada em cx; ks[i] = progresso de cada cartao */
function cardRow(ctx, specs, cx, y, size, ks, o = {}) {
  const gap = o.gap || 26, pad = size * .45;
  const ws = specs.map(s => richWidth(ctx, s, size) + pad * 2);
  let x = cx - (ws.reduce((a, b) => a + b, 0) + gap * (specs.length - 1)) / 2;
  const centers = [];
  specs.forEach((s, i) => { const c = x + ws[i] / 2; centers.push(c); wordCard(ctx, s, c, y, size, ks[i], o); x += ws[i] + gap; });
  return centers;
}
function paperBg(ctx, a, b) {
  sky(ctx, a, b);
  ctx.save(); ctx.globalAlpha = .07; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
  for (let y = 40; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.restore();
}
function muteIcon(ctx, x, y, s, k) {
  popAt(ctx, k, x, y, () => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = '#495057'; ctx.fillRect(-40, -16, 22, 32); ctx.beginPath(); ctx.moveTo(-18, -16); ctx.lineTo(8, -38); ctx.lineTo(8, 38); ctx.lineTo(-18, 16); ctx.fill();
    ctx.strokeStyle = '#e03131'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(20, -18); ctx.lineTo(52, 18); ctx.moveTo(52, -18); ctx.lineTo(20, 18); ctx.stroke();
    ctx.restore();
  });
}

/* ---------- 5. LETRA H ---------- */
SCENES.letraH = (ctx, lt, S) => {
  sky(ctx, '#d0ebff', '#fff9db');
  for (let i = 0; i < 3; i++) cloud(ctx, 300 + i * 380 + lt * 7, 120 + (i % 2) * 40, .7, '#fff', .9);
  helicopter(ctx, lerp(-200, 1500, (lt / S.dur)), 105, .45, lt);
  ctx.fillStyle = '#b2f2bb'; ctx.fillRect(0, 560, W, 160);
  ell(ctx, 1110, 590, 200, 40, '#74c0fc');
  const hk = pop(lt, S.w('agá'), .6);
  popAt(ctx, hk, 230, 280, () => {
    shadowOn(ctx, 20, 8, .25); rr(ctx, 120, 170, 220, 220, 40); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx);
    txt(ctx, 'H', 230, 285, 190, '#e8590c');
  });
  muteIcon(ctx, 230, 450, 1, pop(lt, S.w('som')));
  chip(ctx, 'não faz som', 230, 520, 26, '#e03131', '#fff', pop(lt, S.w('nenhum')));
  const words = ['(h)oje', '(h)ora', '(h)omem', '(h)ipopótamo', '(h)elicóptero', '(h)ospital', '(h)istória'];
  const keys = ['hoje', 'hora', 'homem', 'hipopótamo', 'helicóptero', 'hospital', 'história'];
  const fade = 1 - ap(lt, S.f(3) - .3, .5);
  ctx.save(); ctx.globalAlpha *= fade;
  cardRow(ctx, words.slice(0, 4), 790, 230, 44, keys.slice(0, 4).map(k => pop(lt, S.w(k))), { muteDot: true });
  cardRow(ctx, words.slice(4), 790, 340, 44, keys.slice(4).map(k => pop(lt, S.w(k))), { muteDot: true });
  ctx.restore();
  // fala x escreve
  const fk = pop(lt, S.w('ôje')), ek = pop(lt, S.w('escreve'));
  popAt(ctx, fk, 640, 300, () => {
    shadowOn(ctx); rr(ctx, 470, 200, 340, 200, 30); ctx.fillStyle = '#f1f3f5'; ctx.fill(); shadowOff(ctx);
    txt(ctx, 'a gente fala', 640, 240, 28, '#868e96', 'center', 800); txt(ctx, '“oje”', 640, 320, 76, '#868e96');
  });
  popAt(ctx, ek, 1000, 300, () => {
    shadowOn(ctx); rr(ctx, 830, 200, 340, 200, 30); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#e8590c'; ctx.stroke(); shadowOff(ctx);
    txt(ctx, 'e escreve', 1000, 240, 28, '#e8590c', 'center', 800); rich(ctx, '[H]OJE', 1000, 320, 76, { color: '#23314f' });
  });
  const hp = pop(lt, S.w('hipopótamo'));
  popAt(ctx, hp, 1110, 600, () => hippo(ctx, 1060, 600, .62, lt));
  bear(ctx, 470, 612, .5, { t: lt, look: 1, jump: Math.max(0, Math.sin(clamp((lt - S.w('hoje', 1)) / .5) * PI)) });
  sceneTag(ctx, 'Letra H', ap(lt, .2));
};

/* ---------- 6. J OU G ---------- */
SCENES.jg = (ctx, lt, S) => {
  paperBg(ctx, '#fff4e6', '#ffe8cc');
  const OR = '#e8590c', BL = '#1c7ed6';
  popAt(ctx, pop(lt, S.w('jota')), 330, 120, () => { circ(ctx, 330, 120, 66, '#fff'); txt(ctx, 'J', 330, 126, 100, OR); });
  popAt(ctx, pop(lt, S.w('gê')), 950, 120, () => { circ(ctx, 950, 120, 66, '#fff'); txt(ctx, 'G', 950, 126, 100, BL); });
  chip(ctx, 'som de jê', 640, 120, 32, '#5f3dc4', '#fff', pop(lt, S.w('jê')));
  chip(ctx, 'com A, O, U → sempre J', 330, 215, 26, OR, '#fff', pop(lt, S.w('sempre')));
  cardRow(ctx, ['[j]acaré', '[j]ogo', 'ca[j]u'], 330, 292, 42, [pop(lt, S.w('jacaré')), pop(lt, S.w('jogo')), pop(lt, S.w('caju'))], { hl: OR });
  const ck = pop(lt, S.w('jacaré')) * (1 - ap(lt, S.f(2) - .3, .5));
  if (ck > 0) { ctx.save(); ctx.globalAlpha *= clamp(ck); croc(ctx, 900, 330, .62, lt); ctx.restore(); }
  chip(ctx, 'com E, I → J ou G', 640, 385, 28, '#5f3dc4', '#fff', pop(lt, S.w('pode', 1)));
  cardRow(ctx, ['[j]eito', '[j]ipe'], 330, 470, 42, [pop(lt, S.w('jeito')), pop(lt, S.w('jipe'))], { hl: OR });
  cardRow(ctx, ['<g>elo', '<g>irafa'], 900, 470, 42, [pop(lt, S.w('gelo')), pop(lt, S.w('girafa'))], { hl2: BL });
  const gk = pop(lt, S.w('girafa'));
  popAt(ctx, gk, 1170, 600, () => giraffe(ctx, 1150, 605, .62, lt));
  chip(ctx, 'decore palavra por palavra', 640, 556, 26, '#2f9e44', '#fff', pop(lt, S.w('palavra')));
  bear(ctx, 95, 612, .48, { t: lt, look: 1, wave: ap(lt, S.w('palavra'), .4) });
  sceneTag(ctx, 'J ou G', ap(lt, .2));
};

/* ---------- 7. G OU GU ---------- */
SCENES.ggu = (ctx, lt, S) => {
  paperBg(ctx, '#e7f5ff', '#d0ebff');
  const OR = '#e8590c', BL = '#1c7ed6';
  const dim = 1 - .8 * ap(lt, S.f(4) - .2, .5);
  ctx.save(); ctx.globalAlpha *= dim;
  const c1 = cardRow(ctx, ['[g]ato', '[g]orila', 'a[g]ulha'], 640, 160, 40, [pop(lt, S.w('gato')), pop(lt, S.w('gorila')), pop(lt, S.w('agulha'))], { hl: OR });
  ['GA', 'GO', 'GU'].forEach((g, i) => chip(ctx, g, c1[i], 228, 26, OR, '#fff', pop(lt, S.w(['gá', 'gô', 'gu'][i]))));
  const qk = pop(lt, S.w('quietinho'));
  popAt(ctx, qk, 640, 300, () => {
    shadowOn(ctx, 10, 4, .2); rr(ctx, 330, 270, 620, 60, 30); ctx.fillStyle = '#5f3dc4'; ctx.fill(); shadowOff(ctx);
    rich(ctx, 'antes de E e I: G{U} — o U fica quietinho', 640, 301, 28, { color: '#ffffff' });
  });
  cardRow(ctx, ['[g]{u}erra', 'fo[g]{u}ete', '[g]{u}itarra', 'á[g]{u}ia'], 600, 380, 40, [pop(lt, S.w('guerra')), pop(lt, S.w('foguete')), pop(lt, S.w('guitarra')), pop(lt, S.w('águia'))], { hl: OR });
  chip(ctx, 'GE, GI = som de jê', 360, 480, 26, BL, '#fff', pop(lt, S.w('jê')));
  cardRow(ctx, ['<g>elo', '<g>irafa'], 760, 480, 40, [pop(lt, S.w('gelo')), pop(lt, S.w('girafa'))], { hl2: BL });
  ctx.restore();
  // objetos
  const rk = ap(lt, S.w('foguete') - .2, 3.5);
  if (rk > 0 && rk < 1) rocket(ctx, 1190, lerp(600, -180, easeInOut(rk)), .5, lt);
  const gk = pop(lt, S.w('guitarra'));
  popAt(ctx, gk, 1110, 520, () => guitar(ctx, 1110, 540, .5, .5 + Math.sin(lt * 3) * .05));
  // GIGANTE
  const gg = pop(lt, S.w('gigante'), .6);
  popAt(ctx, gg, 640, 320, () => {
    shadowOn(ctx, 24, 8, .3); rr(ctx, 300, 215, 680, 220, 36); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx);
    const x0 = 640 - richWidth(ctx, 'GIGANTE', 110) / 2;
    rich(ctx, '<GI>[GAN]TE', 640, 300, 110, { hl: OR, hl2: BL });
    ctx.font = `900 110px ${FONT}`; const wGI = ctx.measureText('GI').width, wGAN = ctx.measureText('GAN').width;
    chip(ctx, 'GI = jê', x0 + wGI / 2, 398, 26, BL, '#fff', pop(lt, S.w('gi', 1)));
    chip(ctx, 'GAN = guê', x0 + wGI + wGAN / 2, 398, 26, OR, '#fff', pop(lt, S.w('gã')));
  });
  bear(ctx, 95, 612, .48, { t: lt, look: 1, jump: Math.max(0, Math.sin(clamp((lt - S.w('dois')) / .5) * PI)) });
  sceneTag(ctx, 'G ou GU', ap(lt, .2));
};

/* ---------- 8. DICIONARIO ---------- */
SCENES.dicio = (ctx, lt, S) => {
  sky(ctx, '#3b5bdb', '#748ffc');
  ctx.save(); ctx.globalAlpha = .12; for (let i = 0; i < 14; i++) { ctx.fillStyle = '#fff'; rr(ctx, i * 100 + 10, 600, 60, 120, 6); ctx.fill(); } ctx.restore();
  // alfabeto
  const ak = S.w('alfabética');
  const AB = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 26; i++) {
    const k = pop(lt, ak - .3 + i * .05, .35);
    popAt(ctx, k, 190 + i * 36.5, 95, () => { circ(ctx, 190 + i * 36.5, 95, 16, i === 1 ? '#ffd43b' : '#fff'); txt(ctx, AB[i], 190 + i * 36.5, 96, 20, '#364fc7'); });
  }
  openBook(ctx, 640, 360, 980, 420, { cover: '#c92a2a' });
  // palavras-guia
  const pg = ap(lt, S.w('palavras-guia') - .2, .4);
  ctx.save(); ctx.font = `italic 800 22px ${FONT}`; ctx.fillStyle = pg > 0 ? '#e8590c' : '#adb5bd'; ctx.textBaseline = 'middle';
  ctx.textAlign = 'left'; ctx.fillText('bala', 190, 180); ctx.textAlign = 'right'; ctx.fillText('bule', 600, 180); ctx.restore();
  if (pg > 0) { ctx.save(); ctx.globalAlpha = pg; ctx.strokeStyle = '#e8590c'; ctx.lineWidth = 4; rr(ctx, 176, 162, 72, 36, 10); ctx.stroke(); rr(ctx, 538, 162, 76, 36, 10); ctx.stroke();
    txt(ctx, 'palavras-guia', 395, 180, 22, '#e8590c', 'center', 900); ctx.restore(); }
  ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(180, 202); ctx.lineTo(610, 202); ctx.stroke();
  const sig = ap(lt, S.w('significado') - .1, .5);
  const ents = [['b[a]la', 'doce pequeno.', 'bala'], ['b[o]la', 'objeto redondo de brincar.', 'bola'], ['b[u]le', 'vasilha de servir chá.', 'bule']];
  ents.forEach(([sp, def, key], i) => {
    const y = 250 + i * 95, k = pop(lt, S.w(key));
    popAt(ctx, k, 200, y, () => {
      rich(ctx, sp, 200, y, 46, { align: 'left', hl: '#e8590c', color: '#1c2a4f' });
      if (sig > 0) { ctx.save(); ctx.globalAlpha *= sig; txt(ctx, def, 200, y + 40, 22, '#495057', 'left', 700); ctx.restore(); }
    });
  });
  const vb = ap(lt, S.w('verbete') - .2, .4);
  if (vb > 0) { ctx.save(); ctx.globalAlpha = vb; ctx.strokeStyle = '#2f9e44'; ctx.lineWidth = 5; ctx.setLineDash([12, 8]); rr(ctx, 184, 312, 420, 86, 14); ctx.stroke(); ctx.restore(); }
  // pagina direita: as ideias
  chip(ctx, 'ordem alfabética: A, B, C...', 900, 190, 25, '#364fc7', '#fff', pop(lt, ak));
  chip(ctx, 'mesma 1ª letra? olhe a 2ª', 900, 255, 25, '#e8590c', '#fff', pop(lt, S.w('segunda')));
  chip(ctx, 'mostra o significado', 900, 320, 25, '#5f3dc4', '#fff', pop(lt, S.w('significado')));
  chip(ctx, 'e como se escreve', 900, 385, 25, '#5f3dc4', '#fff', pop(lt, S.w('escreve')));
  chip(ctx, 'verbete = palavra explicada', 900, 450, 25, '#2f9e44', '#fff', pop(lt, S.w('verbete')));
  chip(ctx, 'palavras-guia: 1ª e última', 900, 515, 25, '#e8590c', '#fff', pop(lt, S.w('palavras-guia')));
  bear(ctx, 70, 615, .42, { t: lt, look: 1 });
  sceneTag(ctx, 'Dicionário', ap(lt, .2));
};
