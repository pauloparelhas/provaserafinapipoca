/* cenas2.js — Joao e o pe de feijao; parafrase e parodia. */

function mixHex(a, b, k) {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], k)).toString(16).padStart(2, '0')).join('');
}
function cloudPlatform(ctx, x0, x1, y, t) {
  for (let x = x0; x <= x1; x += 70) circ(ctx, x, y + Math.sin(x * .03) * 8, 56, '#ffffff');
  for (let x = x0 + 35; x <= x1; x += 90) circ(ctx, x, y - 30 + Math.sin(x) * 6, 44, '#f1f3f5');
  for (let x = x0 + 20; x <= x1; x += 60) circ(ctx, x, y + 30, 40, '#ffffff');
}

/* ---------- 3. JOAO E O PE DE FEIJAO ---------- */
SCENES.joao = (ctx, lt, S) => {
  const tN = S.w('noite'), tUp0 = S.w('nasceu'), tUp1 = S.w('nuvens') + .6, tTop = S.f(3);
  const tDn = S.w('desceu'), tAxe = S.w('machado'), tFall = S.w('caiu');
  const grow = easeInOut(ap(lt, tUp0 - .2, tUp1 - tUp0 + .2));
  const camUp = easeInOut(ap(lt, tUp0 + .2, tUp1 - tUp0 + .9)) * (1 - easeInOut(ap(lt, tDn - .3, 1.8)));
  const camY = -660 * camUp;
  const night = ap(lt, tN - .4, .7) * (1 - ap(lt, tTop - .6, 1.2));
  sky(ctx, mixHex('#74c0fc', '#1b1f4b', night), mixHex('#e7f5ff', '#5b3f8c', night));
  if (night > 0) { ctx.save(); ctx.globalAlpha = night; for (let i = 0; i < 60; i++) circ(ctx, (i * 211.7) % W, (i * 71.3) % 520, 1.5 + (i % 3) * .5, '#fffbe6'); circ(ctx, 1100, 110, 46, '#fff3bf'); circ(ctx, 1120, 98, 40, mixHex('#74c0fc', '#1b1f4b', night)); ctx.restore(); }
  sceneTag(ctx, 'João e o pé de feijão', ap(lt, .2));
  ctx.save(); ctx.translate(0, -camY);
  // nuvens do alto
  for (let i = 0; i < 5; i++) cloud(ctx, 80 + i * 280, -150 - (i % 2) * 120, .8, '#fff', .85);
  cloudPlatform(ctx, 560, 1300, -380, lt);
  castle(ctx, 1040, -390, .62);
  // chao
  for (let i = 0; i < 4; i++) cloud(ctx, 100 + i * 330 + lt * 6, 120 + (i % 2) * 50, .7, '#fff', .9 - night * .5);
  ctx.fillStyle = mixHex('#69db7c', '#2b5e3b', night); ctx.fillRect(0, 560, W, 900);
  ctx.fillStyle = mixHex('#8ce99a', '#356e47', night); ctx.beginPath(); ctx.moveTo(0, 560); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 556 + Math.sin(x / 90) * 6); ctx.lineTo(W, 600); ctx.lineTo(0, 600); ctx.fill();
  cottage(ctx, 250, 562, .9);
  // pe de feijao (cai no fim, levando o gigante)
  const fall = Math.pow(ap(lt, tFall - .25, 1.3), 2) * 1.5;
  ctx.save(); ctx.translate(640, 560); ctx.rotate(fall); ctx.translate(-640, -560);
  beanstalk(ctx, 640, 566, grow * 960, lt);
  const gk = ap(lt, tDn - .2, tAxe - tDn + .4);
  if (gk > 0) giant(ctx, 720, lerp(-560, 330, easeOut(gk)), .55, { shout: lt > tFall - .2 });
  ctx.restore();
  // feijoes jogados pela janela
  const jk = ap(lt, S.w('jogou'), .9);
  if (jk > 0 && grow < .05) for (let i = 0; i < 3; i++) bean(ctx, lerp(300, 620 + i * 22, jk), 440 - Math.sin(jk * PI) * 120 + jk * 110, .8, 1);
  // personagens no chao
  const cowGo = ap(lt, S.w('feijões') - .2, 2.2);
  if (cowGo < 1) cow(ctx, lerp(780, 1420, easeInOut(cowGo)), 600, .9, { flip: cowGo > 0 ? false : true });
  const jNoChao = lt < tTop - .2 || lt > tDn;
  if (jNoChao) {
    const chop = lt > tAxe - .4 && lt < tFall + .6;
    boy(ctx, chop ? 560 : 500, 600, 1, { t: lt, armUp2: chop });
    if (chop) axe(ctx, 586, 500, .7, -1.2 + Math.abs(Math.sin((lt - tAxe) * 7)) * 1.1);
    const bk = pop(lt, S.w('feijões')) * (1 - ap(lt, S.w('jogou') - .6, .3));
    for (let i = 0; i < 3; i++) bean(ctx, 470 + i * 26, 430 - i % 2 * 10, .9 * bk, bk);
  }
  const mk = pop(lt, S.f(1)) * (1 - ap(lt, S.f(2) + .5, .4)) + pop(lt, tFall + .9);
  if (mk > 0) lady(ctx, 380, 600, 1, { angry: lt < S.f(2) + 1, dress: '#f783ac' });
  // no alto
  if (lt > tTop - .4 && lt < tDn + .5) {
    const up = pop(lt, S.w('joão', 1) - .2);
    popAt(ctx, up, 760, -390, () => boy(ctx, 760, -390, 1, { t: lt, armUp: lt > S.w('levou') }));
    const hk = pop(lt, S.w('galinha'));
    popAt(ctx, hk, 860, -390, () => hen(ctx, 860, -390, 1.1, { egg: lt > S.w('ouro') - .2, flip: true }));
    if (lt > S.w('ouro')) for (let i = 0; i < 3; i++) sparkle(ctx, 840 + i * 30, -470 - i * 18, 10, '#fcc419', lt * 3 + i);
  }
  if (lt > tFall) for (let i = 0; i < 8; i++) { const k = ap(lt, tFall + .6 + i * .05, .8); if (k > 0 && k < 1) { ctx.globalAlpha = 1 - k; circ(ctx, 900 + i * 40, 560 - k * 40 - (i % 3) * 10, 20 + k * 30, '#dee2e6'); ctx.globalAlpha = 1; } }
  ctx.restore();
  bear(ctx, 105, 615 - camY, .55, { t: lt, look: 1, jump: Math.max(0, Math.sin(clamp((lt - tFall - .8) / .5) * PI)) });
};

/* ---------- 4. PARAFRASE E PARODIA ---------- */
function paperCard(ctx, lines, x, y, size, k, col = '#23314f', bg = '#fffaf0') {
  if (k <= 0) return;
  ctx.font = `800 ${size}px ${FONT}`;
  const w = Math.max(...lines.map(l => ctx.measureText(l).width)) + 44, h = lines.length * size * 1.3 + 28;
  popAt(ctx, k, x, y, () => {
    shadowOn(ctx, 14, 5, .3); rr(ctx, x - w / 2, y - h / 2, w, h, 16); ctx.fillStyle = bg; ctx.fill(); shadowOff(ctx);
    lines.forEach((l, i) => txt(ctx, l, x, y - h / 2 + 14 + size * 1.3 * (i + .5) + 1, size, col, 'center', 800));
  });
}
SCENES.parodia = (ctx, lt, S) => {
  sky(ctx, '#2b1d4a', '#4a2c6b');
  // luz de palco
  ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#fff3bf';
  for (const lx of [360, 920]) { ctx.beginPath(); ctx.moveTo(lx - 30, 0); ctx.lineTo(lx + 30, 0); ctx.lineTo(lx + 240, 600); ctx.lineTo(lx - 240, 600); ctx.fill(); }
  ctx.restore();
  ctx.fillStyle = grad(ctx, 540, H, ['#a0663a', '#6e4224']); ctx.fillRect(0, 540, W, 180);
  ctx.strokeStyle = 'rgba(0,0,0,.15)'; ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(i * 100, 540); ctx.lineTo(i * 100 - 60, H); ctx.stroke(); }
  // mascaras
  const mk = pop(lt, .6);
  popAt(ctx, mk, 640, 150, () => { mask(ctx, 600, 150, .55, true, '#ffd43b'); mask(ctx, 690, 165, .5, false, '#74c0fc'); });
  // PARAFRASE (esquerda)
  const kP = pop(lt, S.w('paráfrase')), hlP = ap(lt, S.w('paráfrase', 1) - .1, .4);
  popAt(ctx, kP, 340, 120, () => {
    txtOut(ctx, 'PARÁFRASE', 340, 112, 50, '#ffd43b', '#3b2060', 10);
    txt(ctx, 'outras palavras, mesma história', 340, 162, 24, '#fff3bf', 'center', 800);
  });
  paperCard(ctx, ['A menina da capa vermelha foi', 'levar guloseimas para a avó.'], 340, 262, 25, pop(lt, S.f(1)));
  chip(ctx, '= mesma história', 340, 345, 24, '#2f9e44', '#fff', pop(lt, S.w('mesma', 1)) * (1 - ap(lt, S.w('paráfrase', 1) - .3, .2)));
  girl(ctx, 340, 560, .95, { t: lt });
  // PARODIA (direita)
  const kR = pop(lt, S.w('paródia'));
  popAt(ctx, kR, 940, 120, () => {
    txtOut(ctx, 'PARÓDIA', 940, 112, 50, '#69db7c', '#3b2060', 10);
    txt(ctx, 'muda de propósito, fica engraçada', 940, 162, 24, '#d3f9d8', 'center', 800);
  });
  paperCard(ctx, ['Chapeuzinho Verde foi de bicicleta', 'levar pizza para o vovô!'], 940, 262, 25, pop(lt, S.f(3)));
  if (kR > 0) {
    const green = ap(lt, S.w('verde'), .6), bk = ap(lt, S.w('bicicleta') - .1, .5), ride = Math.sin(lt * 1.5) * 20 * bk;
    ctx.save(); ctx.globalAlpha *= clamp(kR);
    if (bk > 0) { ctx.save(); ctx.globalAlpha *= bk; bike(ctx, 940 + ride, 570, 1, lt * bk); ctx.restore(); }
    girl(ctx, 940 + ride - 6 * bk, 570 - 60 * bk, .9, { t: lt, cape: mixHex('#d62828', '#2f9e44', green), capeD: mixHex('#a61e1e', '#237032', green), basket: false });
    const pk = pop(lt, S.w('pizza'));
    popAt(ctx, pk, 1040 + ride, 470, () => pizza(ctx, 1040 + ride, 470, .9));
    ctx.restore();
  }
  // pergunta final
  const qk = pop(lt, S.w('mudou'));
  popAt(ctx, qk, 640, 470, () => { shadowOn(ctx); rr(ctx, 495, 440, 290, 60, 30); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx); txt(ctx, 'Mudou a história?', 640, 471, 29, '#3b2060'); });
  const sk = pop(lt, S.w('paródia', 1)), nk = pop(lt, S.w('paráfrase', 1) - .1);
  chip(ctx, 'SIM → paródia', 940, 345, 28, '#2f9e44', '#fff', sk);
  chip(ctx, 'NÃO → paráfrase', 340, 345, 28, '#f08c00', '#fff', nk);
  for (const [k, x, c] of [[sk, 940, '#69db7c'], [hlP, 340, '#ffd43b']]) if (k > 0) {
    ctx.save(); ctx.globalAlpha = clamp(k) * (.6 + .4 * Math.sin(lt * 6)); ctx.strokeStyle = c; ctx.lineWidth = 6;
    rr(ctx, x - 245, 72, 490, 520, 30); ctx.stroke(); ctx.restore();
  }
  curtains(ctx, ap(lt, 0, 1.4));
  bear(ctx, 640, 612, .45, { t: lt, look: lt > S.f(4) ? 1 : -1, wave: ap(lt, S.w('engraçada'), .4) * (1 - ap(lt, S.f(3), .4)) });
  sceneTag(ctx, 'Paráfrase e paródia', ap(lt, .2));
};
