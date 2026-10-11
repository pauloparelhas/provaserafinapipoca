/* cenas_v2b.js — roteiro v2: 4 tabela, 5 parafrase, 6 parodia, 7 parafrase ou parodia. */

/* ---------- 4. OS ELEMENTOS NAS DUAS HISTORIAS ---------- */
SCENES.tabela = (ctx, lt, S) => {
  paperBg(ctx, '#fff9db', '#ffec99');
  const X0 = 50, XL = 250, XC = 735, X1 = 1230, Y0 = 82, YH = 158;
  const ROWS = [['Lugar', 'lugar', '#2f9e44', 158, 248], ['Magia', 'magia', '#ae3ec9', 248, 388], ['Problema', 'problema', '#e03131', 388, 478], ['Solução', 'solução', '#1c7ed6', 478, 572]];
  const tJ = S.f(2) - .2, colOn = [ap(lt, S.f(0) - .2, .4) * (1 - ap(lt, tJ, .4)), ap(lt, tJ, .4)];
  const kT = ap(lt, 0, .5);
  ctx.save(); ctx.globalAlpha *= kT;
  panel(ctx, X0, Y0, X1 - X0, 572 - Y0, '#ffffff', 22);
  [[XL, XC, '#fff5f5', 0], [XC, X1, '#ebfbee', 1]].forEach(([a, b, c, i]) => { if (colOn[i] > 0) { ctx.save(); ctx.globalAlpha *= colOn[i]; ctx.fillStyle = c; ctx.fillRect(a, YH, b - a, 572 - YH - 2); ctx.restore(); } });
  // cabecalhos
  rr(ctx, XL, Y0, XC - XL, YH - Y0, 0); ctx.fillStyle = '#c92a2a'; ctx.fill();
  rr(ctx, XC, Y0, X1 - XC, YH - Y0, 0); ctx.fillStyle = '#2f9e44'; ctx.fill();
  ctx.save(); ctx.beginPath(); rr(ctx, X0, Y0, X1 - X0, 572 - Y0, 22); ctx.clip();
  ctx.fillStyle = '#c92a2a'; ctx.fillRect(XL, Y0, XC - XL, YH - Y0); ctx.fillStyle = '#2f9e44'; ctx.fillRect(XC, Y0, X1 - XC, YH - Y0);
  ctx.fillStyle = '#495057'; ctx.fillRect(X0, Y0, XL - X0, YH - Y0); ctx.restore();
  txt(ctx, 'Elemento', (X0 + XL) / 2, (Y0 + YH) / 2 + 2, 26, '#fff');
  txt(ctx, 'Chapeuzinho Vermelho', (XL + XC) / 2 + 20, (Y0 + YH) / 2 + 2, 30, '#fff');
  txt(ctx, 'João e o pé de feijão', (XC + X1) / 2 + 20, (Y0 + YH) / 2 + 2, 30, '#fff');
  ctx.strokeStyle = '#dee2e6'; ctx.lineWidth = 3;
  ROWS.forEach(([, , , a]) => { ctx.beginPath(); ctx.moveTo(X0, a); ctx.lineTo(X1, a); ctx.stroke(); });
  [XL, XC].forEach(x => { ctx.beginPath(); ctx.moveTo(x, Y0); ctx.lineTo(x, 572); ctx.stroke(); });
  ctx.restore();
  ROWS.forEach(([lab, w, col, a, b]) => chip(ctx, lab, (X0 + XL) / 2, (a + b) / 2, 26, col, '#fff', pop(lt, S.w(w) - .1)));
  // celulas: [palavra-gatilho, n, coluna, linha, texto, icone]
  const cy = r => (ROWS[r][3] + ROWS[r][4]) / 2;
  const cell = (k, col, r, text, icon, dy = 0) => {
    const x = col ? XC : XL, y = cy(r) + dy;
    popAt(ctx, k, x + 60, y, () => { if (icon) icon(x + 60, y); txtWrap(ctx, text, x + 270, y, 340, 27, '#23314f', 'center', 800); });
  };
  cell(pop(lt, S.w('floresta')), 0, 0, 'a floresta', (x, y) => { tree(ctx, x, y + 34, .32); });
  cell(pop(lt, S.w('lobo')), 0, 1, 'um lobo que fala', (x, y) => { wolf(ctx, x - 10, y + 26, .32, { t: lt }); bubble(ctx, x + 28, y - 34, '...', 1, x + 10, y - 14, { size: 16 }); });
  cell(pop(lt, S.w('enganar')), 0, 2, 'o lobo enganar a menina', (x, y) => { circ(ctx, x, y, 28, '#e03131'); txt(ctx, '!', x, y + 2, 40, '#fff'); });
  cell(pop(lt, S.w('caçador')), 0, 3, 'o caçador salvar a menina e a vovó', (x, y) => hunter(ctx, x, y + 40, .34, {}));
  cell(pop(lt, S.w('joão') - .1), 1, 0, 'castelo nas nuvens', (x, y) => { cloud(ctx, x - 40, y + 22, .45, '#e7f5ff'); castle(ctx, x, y + 22, .14); });
  // magia do Joao: tres itens
  const mj = [['feijões', 'feijões mágicos', (x, y) => { for (let i = 0; i < 3; i++) bean(ctx, x - 16 + i * 16, y + (i % 2) * 6, .6, 0); }],
              ['galinha', 'galinha dos ovos de ouro', (x, y) => hen(ctx, x - 6, y + 22, .42, { egg: true, flip: true })],
              ['harpa', 'harpa que canta', (x, y) => { harp(ctx, x, y, .36); musicNote(ctx, x + 26, y - 6, .4, '#f59f00'); }]];
  mj.forEach(([w, text, icon], i) => {
    const y = cy(1) - 44 + i * 44, k = pop(lt, S.w(w));
    popAt(ctx, k, XC + 60, y, () => { icon(XC + 60, y); txt(ctx, text, XC + 270, y + 1, 25, '#23314f', 'center', 800); });
  });
  cell(pop(lt, S.w('fugir')), 1, 2, 'fugir do Gigante', (x, y) => giant(ctx, x, y + 38, .14, {}));
  cell(pop(lt, S.w('cortar')), 1, 3, 'cortar o pé de feijão', (x, y) => axe(ctx, x - 6, y - 26, .5, .4));
  bear(ctx, 1225, 660, .3, { t: lt, look: -1 });
  sceneTag(ctx, 'Os elementos nas duas histórias', ap(lt, .2), '#fff', 'rgba(60,40,10,.55)');
};

/* ---------- 5. PARAFRASE ---------- */
SCENES.parafrase = (ctx, lt, S) => {
  sky(ctx, '#e6fcf5', '#c3fae8');
  const kD = pop(lt, S.w('paráfrase') - .1);
  popAt(ctx, kD, 640, 112, () => {
    panel(ctx, 140, 78, 1000, 70, '#ffffff', 35);
    txt(ctx, 'PARÁFRASE', 290, 114, 38, '#0c8599');
  });
  chip(ctx, 'com as suas palavras', 625, 113, 26, '#0c8599', '#fff', pop(lt, S.w('suas')));
  chip(ctx, 'sem mudar o sentido', 940, 113, 26, '#e8590c', '#fff', pop(lt, S.w('sentido')));
  chip(ctx, 'sinônimos = palavras que querem dizer a mesma coisa', 640, 188, 25, '#5f3dc4', '#fff', pop(lt, S.w('sinônimos')));
  synLink(ctx, 'menina', 'garota', 340, 262, 34, pop(lt, S.w('menina')), pop(lt, S.w('garota')));
  synLink(ctx, 'vovó', 'avó', 940, 262, 34, pop(lt, S.w('vovó')), pop(lt, S.w('avó')));
  synLink(ctx, 'floresta', 'mata', 340, 340, 34, pop(lt, S.w('floresta')), pop(lt, S.w('mata')));
  synLink(ctx, 'doces', 'guloseimas', 940, 340, 34, pop(lt, S.w('doces')), pop(lt, S.w('guloseimas')));
  // as duas frases
  const kO = pop(lt, S.f(3) - .1), kP = pop(lt, S.f(4) + .3);
  chip(ctx, 'original', 120, 432, 22, '#868e96', '#fff', kO);
  wordCard(ctx, '[Chapeuzinho] levou [doces] para a [vovó].', 540, 432, 32, kO, { hl: '#e8590c', minW: 740 });
  chip(ctx, 'paráfrase', 120, 512, 22, '#0c8599', '#fff', kP);
  wordCard(ctx, 'A <garota> levou <guloseimas> para a <avó>.', 540, 512, 32, kP, { hl2: '#2f9e44', minW: 740 });
  const kM = pop(lt, S.w('mudaram')), kI = pop(lt, S.w('igual'));
  chip(ctx, 'mudaram as palavras', 1090, 432, 24, '#e8590c', '#fff', kM);
  popAt(ctx, kI, 1090, 512, () => { panel(ctx, 960, 482, 260, 60, '#ffffff', 30, '#2f9e44'); checkMark(ctx, 996, 512, .62, '#2f9e44'); txt(ctx, 'sentido igual', 1105, 513, 25, '#2f9e44'); });
  // ligacoes palavra a palavra entre as frases
  if (kP > 0 && lt > S.f(4) + .6) {
    ctx.save(); ctx.globalAlpha *= ap(lt, S.f(4) + .6, .5) * .55; ctx.strokeStyle = '#2f9e44'; ctx.lineWidth = 3; ctx.setLineDash([6, 6]);
    ctx.font = `900 32px ${FONT}`;
    const L = (s1, pre1, s2, pre2) => {
      const t1 = '[Chapeuzinho] levou [doces] para a [vovó].', t2 = 'A <garota> levou <guloseimas> para a <avó>.';
      const w1 = Math.max(740, richWidth(ctx, t1, 32) + 28.8), w2 = Math.max(740, richWidth(ctx, t2, 32) + 28.8);
      const x1 = 540 - richWidth(ctx, t1, 32) / 2 + richWidth(ctx, pre1, 32) + richWidth(ctx, s1, 32) / 2;
      const x2 = 540 - richWidth(ctx, t2, 32) / 2 + richWidth(ctx, pre2, 32) + richWidth(ctx, s2, 32) / 2;
      ctx.beginPath(); ctx.moveTo(x1, 456); ctx.lineTo(x2, 488); ctx.stroke(); return w1 + w2;
    };
    L('Chapeuzinho', '', 'A garota', '');
    L('doces', 'Chapeuzinho levou ', 'guloseimas', 'A garota levou ');
    L('vovó', 'Chapeuzinho levou doces para a ', 'avó', 'A garota levou guloseimas para a ');
    ctx.restore();
  }
  bear(ctx, 1222, 665, .3, { t: lt, look: -1 });
  sceneTag(ctx, 'Paráfrase', ap(lt, .2));
};

/* ---------- 6. PARODIA ---------- */
SCENES.parodia = (ctx, lt, S) => {
  const tB = S.f(2) - .3, kB = easeInOut(ap(lt, tB, .6));
  sky(ctx, '#fff0f6', '#ffdeeb');
  const kD = pop(lt, S.w('paródia') - .1);
  popAt(ctx, kD, 640, 112, () => { panel(ctx, 110, 78, 1060, 70, '#ffffff', 35); txt(ctx, 'PARÓDIA', 240, 114, 38, '#c2255c'); });
  chip(ctx, 'imitar um texto conhecido', 520, 113, 24, '#7048e8', '#fff', pop(lt, S.w('imitar')));
  chip(ctx, 'mudar de propósito', 840, 113, 24, '#e8590c', '#fff', pop(lt, S.w('propósito')));
  chip(ctx, 'engraçado', 1060, 113, 24, '#2f9e44', '#fff', pop(lt, S.w('engraçado')));
  if (kB < 1) {
    ctx.save(); ctx.globalAlpha *= 1 - kB;
    ctx.fillStyle = '#b2f2bb'; ctx.fillRect(0, 520, W, 200);
    for (let i = 0; i < 3; i++) {
      const x = 300 + i * 340;
      popAt(ctx, pop(lt, S.w('casas') + i * .15, .5), x, 440, () => chocHouse(ctx, x, 530, 1.05));
      popAt(ctx, pop(lt, S.w('porquinhos') + i * .12), x + 115, 520, () => pig(ctx, x + 115, 540, .75, { t: lt, ph: i }));
    }
    chip(ctx, 'casas de CHOCOLATE!', 640, 230, 34, '#7b4a2a', '#fff', pop(lt, S.w('chocolate')));
    ctx.restore();
  }
  if (kB > 0) {
    ctx.save(); ctx.globalAlpha *= kB;
    chip(ctx, 'paródia de música', 230, 205, 26, '#c2255c', '#fff', pop(lt, S.w('música')));
    chip(ctx, 'a mesma melodia', 640, 205, 26, '#1c7ed6', '#fff', pop(lt, S.w('melodia')));
    chip(ctx, 'com a letra nova', 1040, 205, 26, '#e8590c', '#fff', pop(lt, S.w('letra')));
    // a mesma melodia: as mesmas notas nas duas linhas
    const NOTES = [0, 1, 2, 1, 3, 2, 0, 1];
    const line = (y, k, label, labCol, text, txtCol, kt) => {
      if (k <= 0) return;
      popAt(ctx, k, 640, y, () => {
        panel(ctx, 70, y - 64, 1140, 128, '#ffffff', 26);
        ctx.strokeStyle = '#dee2e6'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(230, y - 50 + i * 9); ctx.lineTo(1190, y - 50 + i * 9); ctx.stroke(); }
        NOTES.forEach((n, i) => musicNote(ctx, 270 + i * 118, y - 18 - n * 8 + Math.sin(lt * 6 + i) * 2, .5, '#1c7ed6', i % 3 === 2));
        chip(ctx, label, 145, y, 20, labCol, '#fff', 1);
        if (kt > 0) popAt(ctx, kt, 710, y + 28, () => txtWrap(ctx, text, 710, y + 28, 940, 30, txtCol, 'center', 900));
      });
    };
    line(345, pop(lt, S.w('melodia') - .1), 'original', '#868e96', 'Atirei o pau no gato', '#495057', pop(lt, S.w('atirei') - .1));
    withT(ctx, 640, 425, 1.3, PI / 2, () => arrowR(ctx, 0, 0, ap(lt, S.w('virou') - .1, .4), '#c2255c'));
    line(505, pop(lt, S.w('letra') - .1), 'paródia', '#c2255c', 'Não atire o pau no gato, porque isso não se faz.', '#c2255c', pop(lt, S.f(4) - .1));
    ctx.restore();
  }
  bear(ctx, 1222, 665, .3, { t: lt, look: -1 });
  sceneTag(ctx, 'Paródia', ap(lt, .2));
};

/* ---------- 7. PARAFRASE OU PARODIA? ---------- */
SCENES.pp = (ctx, lt, S) => {
  sky(ctx, '#d0ebff', '#fff9db');
  for (let i = 0; i < 3; i++) cloud(ctx, 150 + i * 420 + lt * 6, 90 + (i % 2) * 30, .6, '#fff', .9);
  grassHill(ctx, 560, '#8ce99a', 14, 0);
  ctx.fillStyle = '#e9c46a'; ctx.beginPath(); ctx.moveTo(560, H); ctx.lineTo(620, 560); ctx.lineTo(660, 560); ctx.lineTo(720, H); ctx.fill();
  // poste
  ctx.fillStyle = '#8d5a35'; rr(ctx, 628, 250, 24, 330, 8); ctx.fill();
  const kQ = pop(lt, S.w('pergunte') - .2);
  popAt(ctx, kQ, 640, 200, () => { panel(ctx, 470, 170, 340, 64, '#5f3dc4', 32); txt(ctx, 'Pergunte:', 640, 203, 32, '#fff'); });
  // lado da parafrase
  const k1 = pop(lt, S.w('sentido') - .1), k1b = pop(lt, S.w('paráfrase') - .1);
  popAt(ctx, k1, 300, 300, () => { panel(ctx, 70, 262, 460, 76, '#ffffff', 26, '#0c8599'); txt(ctx, 'O sentido ficou igual?', 300, 301, 30, '#0c8599'); });
  arrowBoard(ctx, 470, 400, 300, 80, -1, '#0c8599', 'PARÁFRASE', k1b);
  // lado da parodia
  const k2 = pop(lt, S.w('mudou') - .1), k2b = pop(lt, S.w('paródia') - .1);
  popAt(ctx, k2, 980, 300, () => { panel(ctx, 760, 248, 450, 104, '#ffffff', 26, '#c2255c');
    txt(ctx, 'Mudou de propósito,', 985, 283, 29, '#c2255c'); txt(ctx, 'imitando o original?', 985, 320, 29, '#c2255c'); });
  arrowBoard(ctx, 810, 490, 300, 80, 1, '#c2255c', 'PARÓDIA', k2b);
  bear(ctx, 330, 640, .5, { t: lt, look: 1, jump: Math.max(0, Math.sin(clamp((lt - S.w('paráfrase')) / .5) * PI)) });
  sceneTag(ctx, 'Paráfrase ou paródia?', ap(lt, .2));
};
