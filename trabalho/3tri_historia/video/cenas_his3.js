/* cenas_his3.js — HIS3 video: profissoes, rios e patrimonio, linha do tempo, final. */

/* rio azul ondulado (faixa) */
function rioD(ctx, x0, x1, y, k = 1, lt = 0) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= clamp(k); ctx.strokeStyle = '#4dabf7'; ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.beginPath(); for (let x = x0; x <= x1; x += 6) { const yy = y + Math.sin(x / 26 + lt * .8) * 6; x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0 + 10; x <= x1 - 10; x += 6) { const yy = y - 2 + Math.sin(x / 26 + lt * .8) * 6; x === x0 + 10 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
  ctx.restore();
}

/* 11. PROFISSOES QUE SUMIRAM E QUE NASCERAM */
SCENES.profissoes = (ctx, lt, S) => {
  artBg(ctx, 'cidade', lt, { cam: 2400, pan: 12, dim: .12 });
  sceneTag(ctx, 'Profissões', ap(lt, .1, .4));
  const t1 = S.f(1) - .25, t2 = S.f(2) - .25;
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    board(ctx, 70, 110, 1140, 380);
    kw(ctx, 'acendedor de lampião', 380, 165, 38, pop(lt, S.w('acendedor') - .1), C_ANTES, '#fff');
    /* postes acesos um a um */
    const tp = S.w('postes');
    for (let i = 0; i < 3; i++) {
      const acesa = ap(lt, tp - .2 + i * .45, .4);
      icoLampiao(ctx, 200 + i * 150, 330, 1.25, acesa);
    }
    const ke = pop(lt, S.w('energia') - .1);
    kw(ctx, 'energia elétrica', 900, 165, 38, ke, '#fab005', '#3d2c00');
    popAt(ctx, ke, 900, 330, () => { icoLampiao(ctx, 830, 330, 1.25, 1, true); icoLampiao(ctx, 970, 330, 1.25, 1, true); });
    arrowTo(ctx, 600, 300, 720, 300, '#868e96', 7, ap(lt, S.w('energia') - .1, .3));
    const kd = pop(lt, S.w('desapareceu') - .1);
    if (kd > 0) { ctx.save(); ctx.globalAlpha *= clamp(kd); ctx.strokeStyle = 'rgba(201,42,42,.9)'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(165, 178); ctx.lineTo(595, 152); ctx.stroke(); ctx.restore(); }
    selo(ctx, 'profissão desapareceu', 380, 450, '#c92a2a', kd, 28, 0);
    ctx.restore();
  }
  const a1 = ph(lt, t1, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    board(ctx, 120, 120, 1040, 380);
    kw(ctx, 'profissões novas', 640, 180, 48, pop(lt, S.w('novas') - .1), C_HOJE, '#fff');
    const kd = pop(lt, S.w('desenvolvedor') - .1);
    popAt(ctx, kd, 420, 340, () => { icoCelular(ctx, 400, 340, 1.6, 'app'); icoTela(ctx, 560, 340, .9, () => { ctx.strokeStyle = '#1c7ed6'; ctx.lineWidth = 4; [-20, -4, 12].forEach((yy, i) => { ctx.beginPath(); ctx.moveTo(-44 + i * 10, yy); ctx.lineTo(30, yy); ctx.stroke(); }); }); });
    kw(ctx, 'desenvolvedor', 900, 300, 40, kd, '#fff', C_HOJE, { border: C_HOJE, minW: 360 });
    kw(ctx, 'de aplicativos', 900, 385, 40, pop(lt, S.w('aplicativos') - .1), '#fff', C_HOJE, { border: C_HOJE, minW: 360 });
    ctx.restore();
  }
  const a2 = ph(lt, t2);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    kw(ctx, 'Cada profissão tem suas ferramentas', 640, 112, 38, pop(lt, S.w('ferramentas') - .1), 'rgba(255,253,245,.96)', '#23314f');
    const kc = pop(lt, S.w('câmera') - .1), kf = pop(lt, S.w('fotógrafo') - .1), km = pop(lt, S.w('marreta') - .1), kp = pop(lt, S.w('pedreiro') - .1);
    board(ctx, 70, 170, 540, 330, kc, 'rgba(255,253,245,.95)', '#f97316');
    board(ctx, 670, 170, 540, 330, km, 'rgba(255,253,245,.95)', '#868e96');
    popAt(ctx, kc, 200, 320, () => icoCamera(ctx, 200, 310, 1.5)); lab(ctx, 'câmera de tripé', 200, 440, kc, '#c2410c', 26);
    arrowTo(ctx, 290, 320, 380, 320, '#f97316', 7, ap(lt, S.w('fotógrafo') - .1, .3));
    popAt(ctx, kf, 480, 440, () => mor(ctx, 'fotografo', 480, 420, lt, -1, 1.25, false)); kw(ctx, 'fotógrafo', 480, 470, 28, kf, '#f97316', '#fff');
    popAt(ctx, km, 770, 300, () => { icoMarreta(ctx, 760, 290, 1.1); icoColher(ctx, 870, 300, 1.1); });
    lab(ctx, 'marreta e colher', 815, 440, km, '#495057', 26);
    arrowTo(ctx, 930, 320, 1010, 320, '#868e96', 7, ap(lt, S.w('pedreiro') - .1, .3));
    popAt(ctx, kp, 1090, 300, () => poderD(ctx, 'capacete', 1090, 300, 2.6, lt)); kw(ctx, 'pedreiro', 1090, 470, 28, kp, '#495057', '#fff');
    ctx.restore();
  }
};

/* 12. RIOS ANTIGOS E PATRIMONIO */
SCENES.rios = (ctx, lt, S) => {
  artBg(ctx, 'rios', lt, { pan: 10 });
  sceneTag(ctx, 'Rios antigos e patrimônio', ap(lt, .1, .4));
  const t1 = S.f(1) - .25, t2 = S.f(2) - .25;
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    kw(ctx, 'cidades perto dos rios', 640, 110, 44, pop(lt, S.w('rios') - .1), '#1864ab', '#fff');
    const R = [['nilo', 'egito', 'Rio Nilo', 'Egito', icoPiramide], ['tigre', 'mesopotâmia', 'Tigre e Eufrates', 'Mesopotâmia', icoZigurate], ['amarelo', 'china', 'Rio Amarelo', 'China', icoPagode]];
    R.forEach(([w, w2, s, p, fn], i) => {
      const x = 240 + i * 400, k = pop(lt, S.w(w) - .2), k2 = pop(lt, S.w(w2) - .1);
      board(ctx, x - 180, 170, 360, 330, k, 'rgba(255,253,245,.95)', '#4dabf7');
      popAt(ctx, k, x, 280, () => { fn(ctx, x, 270, 1.3); rioD(ctx, x - 140, x + 140, 345, 1, lt); });
      kw(ctx, s, x, 405, 30, k, '#4dabf7', '#fff', { minW: 260 });
      lab(ctx, p, x, 465, k2, '#7a4a0a', 34);
    });
    ctx.restore();
  }
  const a1 = ph(lt, t1, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    board(ctx, 190, 150, 900, 330);
    kw(ctx, 'Patrimônio', 640, 230, 64, pop(lt, wF(S, 'patrimônio', 1) - .1), '#ae3ec9', '#fff');
    wrapC(ctx, 'o que é importante para a memória de um povo', 640, 370, 760, 42, '#23314f', ap(lt, S.w('importante') - .2, .4));
    ctx.restore();
  }
  const a2 = ph(lt, t2);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    const CM = '#0c8599', CI = '#ae3ec9';
    const km = pop(lt, S.w('material') - .1), ki = pop(lt, S.w('imaterial') - .1);
    colVS(ctx, 70, 150, 540, 350, 'Patrimônio material', CM, ap(lt, S.w('museus') - .3, .4));
    colVS(ctx, 670, 150, 540, 350, 'Patrimônio imaterial', CI, ap(lt, S.w('capoeira') - .3, .4));
    const k1 = pop(lt, S.w('museus') - .1), k2 = pop(lt, S.w('estátuas') - .1), k3 = pop(lt, S.w('capoeira') - .1), k4 = pop(lt, S.w('festa') - .1);
    popAt(ctx, k1, 210, 300, () => icoMuseu(ctx, 210, 300, 1.35)); lab(ctx, 'museus', 210, 400, k1, CM, 30);
    popAt(ctx, k2, 470, 300, () => icoEstatua(ctx, 470, 300, 1.3)); lab(ctx, 'estátuas', 470, 400, k2, CM, 30);
    popAt(ctx, k3, 810, 300, () => icoBerimbau(ctx, 790, 300, 1.2)); lab(ctx, 'capoeira', 810, 400, k3, CI, 30);
    popAt(ctx, k4, 1070, 300, () => icoJunina(ctx, 1070, 300, 1.15)); lab(ctx, 'festa junina', 1070, 400, k4, CI, 30);
    ctx.restore();
  }
};

/* 13. A LINHA DO TEMPO */
SCENES.tempo = (ctx, lt, S) => {
  artBg(ctx, 'linha', lt, { pan: 10 });
  sceneTag(ctx, 'A linha do tempo', ap(lt, .1, .4));
  const t1 = S.f(1) - .25;
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    board(ctx, 40, 110, 1200, 400);
    kw(ctx, 'os registros, na ordem', 640, 150, 36, pop(lt, S.w('registros') - .1), '#5f3dc4', '#fff');
    const R = [['jornal', 'jornal', x => trilhaD(ctx, 1, x, 300, 2.6, lt)], ['carta', 'carta', x => trilhaD(ctx, 3, x, 300, 2.6, lt)],
      ['diário', 'diário', x => trilhaD(ctx, 4, x, 300, 2.6, lt)], ['álbum', 'álbum de fotos', x => trilhaD(ctx, 5, x, 300, 2.6, lt)],
      ['digital', 'foto digital', x => icoCelular(ctx, x, 300, 1.05, 'foto')], ['redes', 'redes sociais', x => icoCelular(ctx, x, 300, 1.05, 'rede')]];
    const xs = R.map((_, i) => 145 + i * 198);
    const tA = S.w('jornal') - .2, tB = S.w('redes');
    /* seta da linha do tempo crescendo da esquerda para a direita */
    const kL = clamp((lt - tA) / Math.max(.5, tB - tA));
    if (lt > tA) arrowTo(ctx, 80, 420, lerp(110, 1210, kL), 420, '#5f3dc4', 8, 1);
    R.forEach(([w, s, fn], i) => {
      const k = pop(lt, S.w(w) - .1);
      popAt(ctx, k, xs[i], 300, () => fn(xs[i]));
      if (k > 0) circ(ctx, xs[i], 420, 11 * clamp(k), '#fff', '#5f3dc4', 5);
      lab(ctx, s, xs[i], 470, k, '#23314f', s.length > 10 ? 22 : 26);
      chip(ctx, String(i + 1), xs[i], 210, 22, '#5f3dc4', '#fff', k);
    });
    chip(ctx, 'ANTES', 120, 160, 22, C_ANTES, '#fff', pop(lt, S.w('jornal') - .1));
    chip(ctx, 'HOJE', 1160, 160, 22, C_HOJE, '#fff', pop(lt, S.w('redes') - .1));
    ctx.restore();
  }
  const a1 = ph(lt, t1);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    const kr = pop(lt, S.w('relógio') - .1);
    board(ctx, 380, 110, 520, 330, kr);
    popAt(ctx, kr, 640, 230, () => icoRelogio(ctx, 640, 230, 80, lt * 3));
    kw(ctx, 'igual para todos', 640, 375, 40, pop(lt, S.w('todos') - .1), '#1c7ed6', '#fff');
    const ks = pop(lt, S.w('sente') - .1);
    hero(ctx, 'bia', 220, GROUND, ks > 0 ? 'cheer' : 'idle', lt, 1, 1.7);
    hero(ctx, 'theo', 1060, GROUND, 'idle', lt, -1, 1.7);
    bubble(ctx, 220, 260, 'Passou\nrapidinho!', ks, 220, 360, { size: 30, color: '#c2255c' });
    bubble(ctx, 1060, 260, 'Demorou\ntanto...', ks, 1060, 360, { size: 30, color: '#1864ab' });
    kw(ctx, 'cada um sente de um jeito', 640, 490, 34, pop(lt, S.w('jeito') - .1), '#fff', '#5f3dc4', { border: '#9775fa' });
    ctx.restore();
  }
};

/* 14. VOCE FAZ HISTORIA */
SCENES.final = (ctx, lt, S) => {
  artBg(ctx, 'museu', lt, { cam: 300, pan: 10 });
  const t1 = S.f(1) - .25;
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    board(ctx, 120, 110, 1040, 320);
    const kh = pop(lt, S.w('hoje') - .1), ka = pop(lt, S.w('amanhã') - .1);
    kw(ctx, 'HOJE', 330, 165, 44, kh, C_HOJE, '#fff');
    popAt(ctx, kh, 330, 290, () => { icoCaderno(ctx, 280, 290, 1.1, '#f06595'); icoCelular(ctx, 390, 290, 1, 'foto'); });
    lab(ctx, 'o que você faz', 330, 395, kh, '#1864ab', 32);
    arrowTo(ctx, 480, 290, 760, 290, '#e8590c', 10, ap(lt, S.w('fonte') - .2, .5));
    kw(ctx, 'AMANHÃ', 950, 165, 44, ka, C_ANTES, '#fff');
    ['oral', 'escrita', 'visual', 'material'].forEach((t, i) => popAt(ctx, ka, 950, 290, () => cartaD(ctx, t, 950 + (i - 1.5) * 70, 290 + Math.abs(i - 1.5) * 8, 1.8, lt, (i - 1.5) * .14)));
    lab(ctx, 'fonte histórica', 950, 395, pop(lt, S.w('histórica') - .1), '#7c2d12', 34);
    ctx.restore();
  }
  const a1 = ph(lt, t1);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    const kv = pop(lt, S.w('viemos') - .1), kp = pop(lt, S.w('boa') - .1);
    kw(ctx, 'de onde viemos', 360, 120, 34, kv, '#fff', C_ANTES, { border: C_ANTES });
    kw(ctx, 'para onde vamos', 920, 120, 34, pop(lt, S.w('vamos') - .1), '#fff', C_HOJE, { border: C_HOJE });
    arrowTo(ctx, 520, 120, 760, 120, '#868e96', 7, ap(lt, S.w('viemos'), .4));
    board(ctx, 290, 175, 700, 150, kp, 'rgba(255,253,245,.95)');
    popAt(ctx, kp, 640, 250, () => txtOut(ctx, 'Boa prova, detetive!', 640, 250, 64, '#c92a2a', '#fff', 10));
    confetti(ctx, lt - S.w('boa'), 30, ap(lt, S.w('boa'), .6));
    hero(ctx, 'lia', 250, GROUND, kp > 0 ? 'cheer' : 'idle', lt, 1, 1.6); hero(ctx, 'theo', 380, GROUND, 'idle', lt + .3, 1, 1.6);
    hero(ctx, 'bia', 900, GROUND, kp > 0 ? 'cheer' : 'idle', lt + .5, -1, 1.6); hero(ctx, 'leo', 1030, GROUND, 'idle', lt + .2, -1, 1.6);
    poderD(ctx, 'lupa', 470, 430, 2, lt);
    ctx.restore();
  }
  mor(ctx, 'tic', 640, GROUND, lt, 1, 1.6, S.talk(lt) > 0);
};
