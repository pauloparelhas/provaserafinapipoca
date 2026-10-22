/* cenas_his2.js — HIS3 video: mudou ou continuou, cada um ve de um jeito, carteiro, medico, fazenda. */

/* carimbo arredondado (entra com pop, nao pisca) */
function selo(ctx, s, x, y, cor, k, size = 40, rot = -.06) {
  if (k <= 0) return;
  popAt(ctx, k, x, y, () => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.font = `900 ${size}px ${FONT}`;
    const w = ctx.measureText(s).width + size * 1.2, h = size * 1.7;
    shadowOn(ctx, 12, 5, .3); rr(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fillStyle = cor; ctx.fill(); shadowOff(ctx);
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,.7)'; rr(ctx, -w / 2 + 6, -h / 2 + 6, w - 12, h - 12, h / 2 - 6); ctx.stroke();
    txt(ctx, s, 0, 2, size, '#fff'); ctx.restore();
  });
}
/* sinal de igual entre colunas */
function igual(ctx, x, y, k, cor = C_PERM) { if (k <= 0) return; popAt(ctx, k, x, y, () => { circ(ctx, x, y, 38, '#fff', cor, 5); ctx.fillStyle = cor; ctx.fillRect(x - 18, y - 12, 36, 8); ctx.fillRect(x - 18, y + 4, 36, 8); }); }

/* 6. MUDOU OU CONTINUOU */
SCENES.mudou = (ctx, lt, S) => {
  artBg(ctx, 'escola', lt, { cam: 900, pan: 10 });
  sceneTag(ctx, 'Mudou ou continuou?', ap(lt, .1, .4));
  const t1 = S.f(1) - .25, t2 = S.f(2) - .25;
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    const km = pop(lt, wF(S, 'mudança', 0) - .1), kp = pop(lt, wF(S, 'permanência', 0) - .1);
    board(ctx, 90, 130, 520, 360, km, 'rgba(255,253,245,.95)', C_MUD);
    board(ctx, 670, 130, 520, 360, kp, 'rgba(255,253,245,.95)', C_PERM);
    kw(ctx, 'MUDANÇA', 350, 210, 50, km, C_MUD, '#fff');
    kw(ctx, 'PERMANÊNCIA', 930, 210, 50, kp, C_PERM, '#fff');
    lines(ctx, 'o que ficou\ndiferente', 350, 340, 44, '#a33a06', ap(lt, wF(S, 'diferente', 0) - .3, .4));
    lines(ctx, 'o que continuou\nigual', 930, 340, 44, '#1e6b2c', ap(lt, wF(S, 'igual', 0) - .3, .4));
    ctx.restore();
  }
  const a1 = ph(lt, t1, t2), a2 = ph(lt, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    colVS(ctx, 110, 150, 420, 330, 'ANTES', C_ANTES);
    colVS(ctx, 750, 150, 420, 330, 'HOJE', C_HOJE);
    const kg = pop(lt, S.w('giz') - .2), kl = pop(lt, S.w('lousa') - .1);
    popAt(ctx, kg, 320, 300, () => icoGiz(ctx, 320, 290, 1.9));
    lab(ctx, 'quadro de giz', 320, 425, kg, '#7a4a0a', 34);
    popAt(ctx, kl, 960, 300, () => icoLousa(ctx, 960, 285, 1.9));
    lab(ctx, 'lousa digital', 960, 425, kl, '#1864ab', 34);
    arrowTo(ctx, 555, 315, 725, 315, C_MUD, 9, ap(lt, S.w('lousa') - .2, .4));
    selo(ctx, 'MUDANÇA', 640, 92, C_MUD, pop(lt, wF(S, 'mudança', 1) - .1), 40);
    ctx.restore();
  }
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    colVS(ctx, 110, 150, 420, 330, 'ANTES', C_ANTES);
    colVS(ctx, 750, 150, 420, 330, 'HOJE', C_HOJE);
    const kc = pop(lt, S.w('conversar') - .1), ke = pop(lt, S.w('ensinar') - .1);
    [[320, C_ANTES], [960, C_HOJE]].forEach(([x, c]) => {
      kw(ctx, 'conversar com os alunos', x, 250, 30, kc, '#fff', c, { border: c, minW: 340 });
      kw(ctx, 'ensinar com alegria', x, 340, 30, ke, '#fff', c, { border: c, minW: 340 });
      popAt(ctx, ke, x, 420, () => heart(ctx, x, 425, .7));
    });
    igual(ctx, 640, 300, pop(lt, wF(S, 'continuou', 2) - .1));
    selo(ctx, 'PERMANÊNCIA', 640, 92, C_PERM, pop(lt, wF(S, 'permanência', 2) - .1), 40);
    ctx.restore();
  }
  mor(ctx, 'lucia', 640, GROUND, lt, 1, 1.5, lt > t1 && S.talk(lt) > 0);
};

/* 7. CADA UM VE DE UM JEITO */
SCENES.olhar = (ctx, lt, S) => {
  artBg(ctx, 'museu', lt, { cam: 1500, pan: 10 });
  sceneTag(ctx, 'Cada um vê de um jeito', ap(lt, .1, .4));
  const t1 = S.f(1) - .25, t2 = S.f(2) - .25, t3 = S.f(3) - .25;
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    const kf = pop(lt, wF(S, 'fonte', 0) - .1);
    popAt(ctx, kf, 640, 300, () => moldura(ctx, 640, 300, 260, 200, () => { ctx.fillStyle = '#a5d8ff'; ctx.fillRect(510, 200, 260, 200); sunD(ctx, 700, 250, 18, lt); ctx.fillStyle = '#69db7c'; ctx.beginPath(); ctx.moveTo(510, 400); ctx.quadraticCurveTo(600, 300, 770, 380); ctx.lineTo(770, 400); ctx.fill(); smallHouse(ctx, 590, 375, .5); }));
    const T = [['alguém', 'alguém', 300, 190], ['tempo', 'um tempo', 980, 190], ['lugar', 'um lugar', 300, 420], ['objetivo', 'um objetivo', 980, 420]];
    T.forEach(([w, s, x, y]) => {
      const k = pop(lt, wF(S, w, 0) - .1);
      kw(ctx, s, x, y, 40, k, '#fff', '#5f3dc4', { border: '#9775fa', minW: 260 });
      arrowTo(ctx, x + (x < 640 ? 140 : -140), y, x < 640 ? 500 : 780, y < 300 ? 250 : 350, '#9775fa', 5, ap(lt, wF(S, w, 0), .3));
    });
    lab(ctx, 'Toda fonte foi criada por...', 640, 110, ap(lt, .3, .4), '#fff', 38);
    ctx.restore();
  }
  const a1 = ph(lt, t1, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    const Q = [['quem', 'Quem produziu?', '#e8590c'], ['para', 'Para quem foi feita?', '#1c7ed6'], ['qual', 'Qual era o objetivo?', '#2f9e44']];
    Q.forEach(([w, s, c], i) => kw(ctx, s, 760, 190 + i * 115, 44, pop(lt, wF(S, w, 1) - .1), '#fff', c, { border: c, minW: 560 }));
    hero(ctx, 'theo', 230, GROUND, 'idle', lt, 1, 2);
    poderD(ctx, 'lupa', 310, 400 + Math.sin(lt * 2) * 6, 2.6, lt);
    ctx.restore();
  }
  const a2 = ph(lt, t2, t3);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    const ka = pop(lt, S.w('anúncio') - .1);
    popAt(ctx, ka, 400, 300, () => icoAnuncio(ctx, 400, 300, 1.9));
    kw(ctx, 'anúncio', 820, 180, 40, ka, '#fff', '#e8590c', { border: '#ffa94d', minW: 300 });
    kw(ctx, 'propaganda', 820, 270, 40, pop(lt, S.w('propaganda') - .1), '#fff', '#e8590c', { border: '#ffa94d', minW: 300 });
    kw(ctx, 'servem para VENDER', 820, 400, 46, pop(lt, S.w('vender') - .1), '#e8590c', '#fff');
    ctx.restore();
  }
  const a3 = ph(lt, t3);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    const kj = pop(lt, S.w('jeito') - .2);
    [['lia', 170, '#f97316'], ['bia', 330, '#a855f7'], ['leo', 490, '#3b82f6']].forEach(([q, x, c], i) => {
      hero(ctx, q, x, GROUND, 'idle', lt + i * .4, 1, 1.5);
      popAt(ctx, kj, x, 375, () => { circ(ctx, x, 375, 42, '#fff', c, 5); icoOlho(ctx, x, 375, .75); });
    });
    kw(ctx, 'Cada pessoa olha de um jeito', 640, 120, 40, pop(lt, S.w('cada') - .1), 'rgba(255,253,245,.95)', '#23314f');
    const kc = pop(lt, S.w('compara') - .1);
    board(ctx, 640, 190, 580, 330, kc, 'rgba(255,253,245,.95)', '#2f9e44');
    kw(ctx, 'o historiador compara', 930, 240, 34, kc, '#2f9e44', '#fff');
    ['escrita', 'visual', 'oral'].forEach((t, i) => popAt(ctx, pop(lt, S.w('várias') - .1 + i * .15), 760 + i * 170, 390, () => cartaD(ctx, t, 760 + i * 170, 390, 2.3, lt)));
    ctx.restore();
  }
};

/* 8. SEU FRANCISCO, O CARTEIRO */
SCENES.carteiro = (ctx, lt, S) => {
  artBg(ctx, 'cidade', lt, { pan: 12 });
  sceneTag(ctx, 'Seu Francisco, o carteiro', ap(lt, .1, .4));
  const t3 = S.f(3) - .25;
  board(ctx, 60, 110, 1160, 300, ap(lt, .3, .4));
  const st = [
    [S.w('pé') - .3, 'a pé', (x, y) => { icoBolsa(ctx, x, y + 5, 1.15); }, C_ANTES],
    [S.w('bicicleta') - .1, 'bicicleta', (x, y) => bike(ctx, x, y + 60, .95, lt * .5), '#7a4a0a'],
    [S.w('moto') - .1, 'moto', (x, y) => icoMoto(ctx, x, y + 10, 1.25), '#c2410c'],
    [S.w('celular') - .1, 'celular', (x, y) => icoCelular(ctx, x, y, 1.1, 'msg'), C_HOJE]];
  st.forEach(([t0, s, fn, c], i) => {
    const x = 200 + i * 293, k = pop(lt, t0);
    popAt(ctx, k, x, 240, () => fn(x, 240));
    kw(ctx, s, x, 360, 32, k, c, '#fff', { minW: 170 });
    if (i) arrowTo(ctx, x - 293 + 95, 240, x - 95, 240, '#868e96', 6, ap(lt, t0, .3));
  });
  chip(ctx, 'ANTES', 200, 112, 24, C_ANTES, '#fff', pop(lt, S.w('pé') - .3));
  chip(ctx, 'HOJE', 1079, 112, 24, C_HOJE, '#fff', pop(lt, S.w('hoje') - .1));
  chip(ctx, 'chega em segundos!', 1060, 450, 26, C_HOJE, '#fff', pop(lt, S.w('segundos') - .2) * (1 - ap(lt, t3, .3)));
  const a3 = ap(lt, t3, .4);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    selo(ctx, 'A profissão continua!', 600, 470, C_PERM, pop(lt, S.w('continua') - .1), 36, 0);
    selo(ctx, 'de um jeito diferente', 1010, 470, C_MUD, pop(lt, wF(S, 'diferente', 3) - .1), 30, 0);
    ctx.restore();
  }
  mor(ctx, 'francisco', 160, GROUND, lt, 1, 1.5, S.talk(lt) > 0);
};

/* 9. DOUTOR JOAO, O MEDICO */
SCENES.joao = (ctx, lt, S) => {
  artBg(ctx, 'cidade', lt, { cam: 1200, pan: 12 });
  sceneTag(ctx, 'Doutor João, o médico', ap(lt, .1, .4));
  const t2 = S.f(2) - .25;
  colVS(ctx, 70, 140, 540, 360, 'ANTES', C_ANTES, ap(lt, .3, .4));
  colVS(ctx, 670, 140, 540, 360, 'HOJE', C_HOJE, ap(lt, S.w('hoje') - .3, .4));
  const ke = pop(lt, S.w('estetoscópio') - .1), kt = pop(lt, S.w('termômetro') - .1), kp = pop(lt, S.w('papel') - .1);
  popAt(ctx, ke, 170, 270, () => icoEstetoscopio(ctx, 170, 265, 1.2)); lab(ctx, 'estetoscópio', 165, 360, ke, '#7a4a0a', 24);
  popAt(ctx, kt, 340, 270, () => icoTermometro(ctx, 340, 262, 1.1)); lab(ctx, 'termômetro', 340, 360, kt, '#7a4a0a', 24);
  popAt(ctx, kp, 510, 270, () => icoPapel(ctx, 510, 265, 1.05)); lines(ctx, 'papel e\ncaneta', 510, 372, 24, '#7a4a0a', clamp(kp));
  const kd = pop(lt, S.w('dias') - .1);
  popAt(ctx, kd, 260, 435, () => icoRelogio(ctx, 230, 435, 30, lt * 6));
  lab(ctx, 'exames: dias', 370, 435, kd, '#c92a2a', 30);
  const kc = pop(lt, S.w('celular') - .1), kv = pop(lt, S.w('vídeo') - .1);
  popAt(ctx, kc, 830, 290, () => icoCelular(ctx, 830, 285, 1.5, 'exame')); lines(ctx, 'exame no\ncelular', 830, 430, 28, '#1864ab', clamp(kc));
  popAt(ctx, kv, 1060, 290, () => icoCelular(ctx, 1060, 285, 1.5, 'video')); lines(ctx, 'consulta\npor vídeo', 1060, 430, 28, '#1864ab', clamp(kv));
  arrowTo(ctx, 600, 300, 690, 300, C_MUD, 8, ap(lt, S.w('hoje') - .1, .3));
  const a2 = ap(lt, t2, .4);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    ctx.fillStyle = 'rgba(10,12,30,.35)'; ctx.fillRect(0, 0, W, H);
    board(ctx, 290, 110, 700, 300, 1, 'rgba(255,253,245,.97)', C_PERM);
    kw(ctx, 'cuidado com cada paciente', 640, 180, 40, pop(lt, S.w('cuidado') - .1), '#fff', '#1e6b2c', { border: C_PERM });
    popAt(ctx, pop(lt, S.w('paciente') - .1), 640, 270, () => heart(ctx, 640, 270, 1.1, '#f06595'));
    selo(ctx, 'continua igual', 640, 350, C_PERM, pop(lt, S.w('igual') - .1), 34, 0);
    ctx.restore();
  }
  mor(ctx, 'joao', 640, GROUND, lt, 1, 1.5, S.talk(lt) > 0);
};

/* 10. SEU PEDRO E A FAZENDA */
function barraca(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { ctx.fillStyle = '#c47f3c'; ctx.beginPath(); ctx.moveTo(-50, 30); ctx.lineTo(0, -44); ctx.lineTo(50, 30); ctx.fill(); ctx.fillStyle = '#6b3f1d'; ctx.beginPath(); ctx.moveTo(-12, 30); ctx.lineTo(0, 0); ctx.lineTo(12, 30); ctx.fill(); ctx.strokeStyle = '#6b3f1d'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -52); ctx.lineTo(0, -44); ctx.lineTo(8, -54); ctx.stroke(); }); }
function plantinha(ctx, x, y, s) { icoBase(ctx, x, y, s, () => { ctx.fillStyle = '#8d5a35'; ell(ctx, 0, 30, 56, 12, '#8d5a35'); for (let i = -1; i <= 1; i++) { ctx.strokeStyle = '#2f9e44'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(i * 30, 26); ctx.lineTo(i * 30, -20); ctx.stroke(); ell(ctx, i * 30 - 10, -6, 12, 6, '#40c057', -.5); ell(ctx, i * 30 + 10, -16, 12, 6, '#40c057', .5); ell(ctx, i * 30, -28, 6, 12, '#fcc419'); } }); }
SCENES.fazenda = (ctx, lt, S) => {
  artBg(ctx, 'fazenda', lt, { pan: 12 });
  sceneTag(ctx, 'Seu Pedro e a fazenda', ap(lt, .1, .4));
  const t2 = S.f(2) - .25;
  const a01 = ph(lt, 0, t2);
  if (a01 > 0) {
    ctx.save(); ctx.globalAlpha *= a01;
    colVS(ctx, 70, 140, 540, 340, 'ANTES', C_ANTES, ap(lt, .3, .4));
    colVS(ctx, 670, 140, 540, 340, 'HOJE', C_HOJE, ap(lt, S.w('tratores') - .3, .4));
    const ka = pop(lt, S.w('arado') - .1), kb = pop(lt, S.w('bois') - .1);
    popAt(ctx, kb, 230, 290, () => icoBoi(ctx, 220, 290, 1.4));
    popAt(ctx, ka, 470, 290, () => icoArado(ctx, 470, 290, 1.3));
    lab(ctx, 'bois', 230, 400, kb, '#7a4a0a', 32); lab(ctx, 'arado', 470, 400, ka, '#7a4a0a', 32);
    const kt = pop(lt, S.w('tratores') - .1), kc = pop(lt, S.w('celular') - .1);
    popAt(ctx, kt, 820, 290, () => icoTrator(ctx, 820, 280, 1.4)); lab(ctx, 'trator', 820, 400, kt, '#1864ab', 32);
    popAt(ctx, kc, 1060, 290, () => icoCelular(ctx, 1060, 280, 1.4, 'chuva')); lab(ctx, 'vai chover?', 1060, 400, pop(lt, S.w('chover') - .1), '#1864ab', 30);
    arrowTo(ctx, 600, 290, 690, 290, C_MUD, 8, ap(lt, S.w('tratores') - .1, .3));
    ctx.restore();
  }
  const a2 = ph(lt, t2);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    board(ctx, 50, 140, 1060, 330);
    chip(ctx, 'Lá atrás...', 580, 140, 30, '#7c2d12', '#fff', pop(lt, t2 + .3));
    const kn = pop(lt, S.w('nômades') - .1), kg = pop(lt, S.w('agricultura') - .1), kc = pop(lt, S.w('cidades') - .1);
    popAt(ctx, kn, 220, 290, () => { barraca(ctx, 180, 280, 1.2); hero(ctx, 'leo', 280, 330, 'walk', lt, 1, 1.05); });
    kw(ctx, 'nômades', 220, 410, 36, kn, '#c47f3c', '#fff', { minW: 250 });
    popAt(ctx, kg, 580, 290, () => plantinha(ctx, 580, 280, 1.5));
    kw(ctx, 'agricultura', 580, 410, 36, kg, '#2f9e44', '#fff', { minW: 250 });
    popAt(ctx, kc, 930, 300, () => { smallHouse(ctx, 870, 330, .7); smallHouse(ctx, 940, 320, .85, '#d0ebff', '#1c7ed6'); smallHouse(ctx, 1000, 330, .7, '#fff3bf', '#c92a2a'); });
    kw(ctx, 'primeiras cidades', 930, 410, 32, kc, '#1c7ed6', '#fff', { minW: 250 });
    arrowTo(ctx, 350, 290, 470, 290, '#868e96', 7, ap(lt, S.w('agricultura') - .1, .3));
    arrowTo(ctx, 690, 290, 810, 290, '#868e96', 7, ap(lt, S.w('cidades') - .1, .3));
    ctx.restore();
  }
  const pxx = lerp(640, 1195, easeInOut(ap(lt, t2 - .2, .8)));
  mor(ctx, 'pedro', pxx, GROUND, lt, -1, 1.5, S.talk(lt) > 0);
};
