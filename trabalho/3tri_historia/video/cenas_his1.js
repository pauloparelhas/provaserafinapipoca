/* cenas_his1.js — HIS3 video: missao, fontes, quatro cartas, pegadinhas, escola. */

/* mapinha enrolado (pista "mapas") */
function mapinha(ctx, x, y, s) {
  icoBase(ctx, x, y, s, () => {
    rr(ctx, -46, -32, 92, 64, 4); ctx.fillStyle = '#f4e4c1'; ctx.fill(); ctx.strokeStyle = '#b08a4a'; ctx.lineWidth = 3; ctx.stroke();
    ctx.strokeStyle = '#1c7ed6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-36, 10); ctx.quadraticCurveTo(-10, -20, 10, 4); ctx.quadraticCurveTo(24, 18, 38, -10); ctx.stroke();
    ctx.strokeStyle = '#e03131'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(14, -18); ctx.lineTo(24, -8); ctx.moveTo(24, -18); ctx.lineTo(14, -8); ctx.stroke();
    ctx.setLineDash([4, 5]); ctx.strokeStyle = '#8d5a35'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-30, 22); ctx.lineTo(19, -13); ctx.stroke(); ctx.setLineDash([]);
  });
}
/* fileira de pistas do museu: [desenho, rotulo, palavra] */
function pistaCard(ctx, x, y, k, rot, fn, label, cor) {
  if (k <= 0) return;
  popAt(ctx, k, x, y, () => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    shadowOn(ctx, 12, 5, .25); rr(ctx, -84, -86, 168, 172, 18); ctx.fillStyle = '#fffdf5'; ctx.fill(); shadowOff(ctx);
    ctx.lineWidth = 5; ctx.strokeStyle = cor; ctx.stroke();
    fn(0, -16); txt(ctx, label, 0, 60, label.length > 8 ? 25 : 28, cor); ctx.restore();
  });
}

/* 1. A MISSAO */
SCENES.missao = (ctx, lt, S) => {
  artBg(ctx, 'museu', lt, { pan: 10 });
  sceneTag(ctx, 'A missão', ap(lt, .1, .4));
  const t1 = S.f(1) - .2, t2 = S.f(2) - .25;
  /* frase 0: o Museu e as pistas */
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    kw(ctx, 'Museu da Memória', 640, 130, 56, pop(lt, S.w('museu') - .1), '#7c2d12', '#fff');
    kw(ctx, 'pistas do passado', 640, 240, 44, pop(lt, S.w('pistas') - .1), '#fff3bf', '#7c2d12', { border: '#f59f00' });
    board(ctx, 200, 300, 880, 170, ap(lt, S.w('pistas') + .1, .4));
    [[3, 340], [5, 540], [4, 740], [1, 940]].forEach(([n, x], i) => { const k = pop(lt, S.w('pistas') + .2 + i * .18); popAt(ctx, k, x, 380, () => trilhaD(ctx, n, x, 380, 3.2, lt)); });
    ctx.restore();
  }
  /* frase 1: a Rainha Traca roendo tudo */
  const a1 = ph(lt, t1, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    kw(ctx, 'Rainha Traça', 930, 110, 46, pop(lt, S.w('rainha') - .1), '#5f3dc4', '#fff');
    const items = [['cartas', 'cartas', (x, y) => trilhaD(ctx, 3, x, y, 2.4, lt), '#3b82f6'],
      ['fotos', 'fotos', (x, y) => trilhaD(ctx, 5, x, y, 2.4, lt), '#f97316'],
      ['mapas', 'mapas', (x, y) => mapinha(ctx, x, y, 1.1), '#f97316'],
      ['brinquedos', 'brinquedos', (x, y) => icoBoneca(ctx, x, y, 1.1), '#22c55e']];
    items.forEach(([w, s, fn, c], i) => pistaCard(ctx, 130 + i * 175, 300, pop(lt, S.w(w) - .1), (i - 1.5) * .04, fn, s, c));
    const est = lt > S.w('roendo') - .1 && lt < S.w('roendo') + 1.6 ? 'write' : 'laugh';
    condeD(ctx, 1030, GROUND - 20, est, lt, 1.25);
    for (let i = 0; i < 3; i++) tracaD(ctx, 820 + i * 70 + Math.sin(lt * 1.3 + i * 2) * 24, 250 + i * 60 + Math.cos(lt * 1.7 + i) * 14, 1.6, lt + i, -1);
    ctx.restore();
  }
  /* frase 2: Tic chama os detetives */
  const a2 = ph(lt, t2);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    mor(ctx, 'tic', 330, GROUND, lt, 1, 2.1, talkIn(S, lt, t2));
    bubble(ctx, 330, 165, 'Trim!', pop(lt, S.w('trim') - .1), 330, 250, { size: 52, color: '#c92a2a' });
    kw(ctx, 'Eu sou o Tic', 330, 300, 34, pop(lt, S.w('tic') - .1), '#fff', '#23314f', { border: '#fab005' });
    const kd = pop(lt, S.w('detetives') - .1);
    kw(ctx, 'Detetives do Tempo!', 860, 170, 50, kd, '#e8590c', '#fff');
    popAt(ctx, kd, 860, GROUND, () => {
      hero(ctx, 'lia', 700, GROUND, 'cheer', lt, 1, 1.7); hero(ctx, 'theo', 810, GROUND, 'idle', lt + .3, 1, 1.7);
      hero(ctx, 'bia', 920, GROUND, 'cheer', lt + .6, -1, 1.7); hero(ctx, 'leo', 1030, GROUND, 'idle', lt + .2, -1, 1.7);
    });
    poderD(ctx, 'lupa', 860, 320, 2.2 * kd, lt);
    ctx.restore();
  }
};

/* 2. O QUE SAO FONTES HISTORICAS */
SCENES.fontes = (ctx, lt, S) => {
  artBg(ctx, 'museu', lt, { cam: 700, pan: 10 });
  sceneTag(ctx, 'Fontes históricas', ap(lt, .1, .4));
  const t1 = S.f(1) - .2, t2 = S.f(2) - .25;
  kw(ctx, 'Fontes históricas', 640, 110, 56, pop(lt, S.w('fontes') - .1), '#7c2d12', '#fff');
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    board(ctx, 120, 175, 1040, 330);
    const V = [['ver', 'ver', icoOlho, '#f97316'], ['ouvir', 'ouvir', icoOrelha, '#a855f7'], ['tocar', 'tocar', icoMao, '#22c55e'], ['ler', 'ler', icoLivro, '#3b82f6']];
    V.forEach(([w, s, fn, c], i) => {
      const x = 250 + i * 260, k = pop(lt, S.w(w) - .1);
      popAt(ctx, k, x, 300, () => { circ(ctx, x, 290, 72, '#fff', c, 6); fn(ctx, x, 290, 1.05); });
      kw(ctx, s, x, 420, 38, k, c, '#fff', { minW: 150 });
    });
    lab(ctx, 'para aprender sobre outras épocas', 640, 478, ap(lt, S.w('épocas') - .2, .4), '#5c3d00', 30);
    ctx.restore();
  }
  const a1 = ph(lt, t1, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    kw(ctx, 'pistas do passado', 640, 215, 46, pop(lt, S.w('pistas') - .1), '#fff3bf', '#7c2d12', { border: '#f59f00' });
    const kr = ap(lt, S.w('redor') - .3, .6);
    board(ctx, 150, 280, 980, 250, ap(lt, S.w('pistas') + .2, .4));
    [[1, 300, 440], [3, 470, 440], [4, 640, 440], [5, 810, 440], [7, 980, 440]].forEach(([n, x, y], i) => {
      const k = pop(lt, S.w('pistas') + .3 + i * .2); popAt(ctx, k, x, y, () => trilhaD(ctx, n, x, y, 2.2, lt));
    });
    if (kr > 0) { ctx.save(); ctx.globalAlpha *= kr; txt(ctx, 'Tudo pode contar uma história!', 640, 330, 40, '#2b2f6b'); ctx.restore(); }
    ctx.restore();
  }
  const a2 = ph(lt, t2);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    const P = [['observa', 'observa', '#f97316'], ['pergunta', 'pergunta', '#a855f7'], ['compara', 'compara', '#2f9e44']];
    P.forEach(([w, s, c], i) => {
      const x = 480 + i * 280, k = pop(lt, S.w(w) - .1);
      kw(ctx, (i + 1) + '. ' + s, x, 260, 40, k, '#fff', c, { border: c, minW: 230 });
      if (i) arrowTo(ctx, x - 280 + 125, 260, x - 125, 260, '#868e96', 6, ap(lt, S.w(w) - .1, .3));
    });
    hero(ctx, 'lia', 190, GROUND, 'idle', lt, 1, 1.9);
    poderD(ctx, 'lupa', 260, 430 + Math.sin(lt * 2) * 6, 2.4, lt);
    kw(ctx, 'O detetive...', 640, 380, 36, pop(lt, S.w('detetive') - .1), 'rgba(255,253,245,.95)', '#23314f');
    ctx.restore();
  }
};

/* 3. AS 4 CARTAS DE FONTE */
const CARTAS4 = [
  { t: 'oral', nome: 'Fonte oral', sub: 'alguém conta', subW: 'conta', ex: [['relatos', 'relatos'], ['histórias', 'histórias contadas']] },
  { t: 'escrita', nome: 'Fonte escrita', sub: 'alguém escreveu', subW: 'escreveu', ex: [['diários', 'diários'], ['leis', 'leis'], ['jornais', 'jornais'], ['cartas', 'cartas']] },
  { t: 'visual', nome: 'Fonte visual', sub: 'a gente vê uma imagem', subW: 'imagem', ex: [['pinturas', 'pinturas'], ['fotografias', 'fotografias'], ['mapas', 'mapas']] },
  { t: 'material', nome: 'Fonte material', sub: 'a gente toca um objeto', subW: 'objeto', ex: [['brinquedos', 'brinquedos'], ['roupas', 'roupas'], ['construções', 'construções'], ['utensílios', 'utensílios']] },
];
SCENES.quatro = (ctx, lt, S) => {
  artBg(ctx, 'casa', lt, { pan: 8 });
  sceneTag(ctx, 'As 4 cartas', ap(lt, .1, .4));
  const fe = S.fe(3), ends = [S.f(1) - .25, S.f(2) - .25, S.f(3) - .25, fe + .05];
  const af = easeInOut(ap(lt, fe + .1, .7));          /* final: leque vai para o centro */
  CARTAS4.forEach((C, i) => {
    const a = ph(lt, i ? ends[i - 1] : 0, ends[i]);
    if (a <= 0) return;
    const cor = COR_F[C.t];
    ctx.save(); ctx.globalAlpha *= a;
    board(ctx, 450, 120, 770, 400, 1, 'rgba(255,253,245,.95)', cor);
    kw(ctx, C.nome, 835, 185, 52, pop(lt, S.f(i) + .05), cor, '#fff');
    lab(ctx, C.sub, 835, 272, ap(lt, S.w(C.subW) - .2, .4), '#23314f', 40);
    const n = C.ex.length, cols = n > 2 ? 2 : n;
    C.ex.forEach(([w, s], j) => {
      const cx = cols === 1 ? 835 : 835 + ((j % cols) - .5) * 340, cy = (n > 2 ? 370 : 390) + Math.floor(j / cols) * 84;
      kw(ctx, s, cx, cy, 34, pop(lt, S.w(w) - .1), '#fff', cor, { border: cor, minW: 290 });
    });
    ctx.restore();
  });
  /* leque das cartas ja apresentadas; a carta da vez fica grande na frente */
  let cur = -1; for (let i = 0; i < 4; i++) if (lt >= S.f(i) - .3) cur = i;
  const ord = [0, 1, 2, 3].filter(j => j !== cur).concat(cur >= 0 ? [cur] : []);
  ord.forEach(j => {
    const k = pop(lt, S.f(j) - .3, .55); if (k <= 0) return;
    const big = j === cur ? 1 - af : 0;
    const fx = lerp(230 + (j - 1.5) * 52, 640 + (j - 1.5) * 200, af), fy = lerp(360 + Math.abs(j - 1.5) * 12, 330 + Math.abs(j - 1.5) * 20, af);
    const x = lerp(fx, 250, big), y = lerp(fy, 300, big), sc = lerp(lerp(2.5, 3.4, af), 3.7, big), rot = lerp((j - 1.5) * lerp(.2, .12, af), 0, big);
    popAt(ctx, k, x, y, () => cartaD(ctx, CARTAS4[j].t, x, y, sc, lt, rot));
  });
  mor(ctx, 'tic', 85, GROUND, lt, 1, 1.3, S.talk(lt) > 0);
};

/* 4. PEGADINHAS */
function regra(ctx, x, y, w, s, cor, k) {   /* faixa "= TIPO" */
  if (k <= 0) return;
  popAt(ctx, k, x, y, () => { shadowOn(ctx, 10, 4, .25); rr(ctx, x - w / 2, y - 30, w, 60, 30); ctx.fillStyle = cor; ctx.fill(); shadowOff(ctx); txt(ctx, s, x, y + 1, 34, '#fff'); });
}
SCENES.pegadinhas = (ctx, lt, S) => {
  artBg(ctx, 'casa', lt, { cam: 900, pan: 8 });
  sceneTag(ctx, 'Cuidado com as pegadinhas!', ap(lt, .1, .4));
  const t1 = S.f(1) - .25, t2 = S.f(2) - .25;
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    colVS(ctx, 110, 130, 480, 380, 'Foto da boneca', COR_F.visual);
    colVS(ctx, 690, 130, 480, 380, 'Boneca de verdade', COR_F.material);
    const kf = pop(lt, S.w('foto') - .1), kb = pop(lt, S.w('boneca', 1) - .1);
    popAt(ctx, kf, 270, 300, () => moldura(ctx, 270, 300, 170, 200, () => { ctx.fillStyle = '#ffe3ec'; ctx.fillRect(170, 190, 200, 220); icoBoneca(ctx, 270, 300, 1.2); }));
    popAt(ctx, kf, 470, 300, () => cartaD(ctx, 'visual', 470, 300, 2.4, lt));
    popAt(ctx, kb, 850, 300, () => icoBoneca(ctx, 850, 300, 1.9));
    popAt(ctx, kb, 1050, 300, () => cartaD(ctx, 'material', 1050, 300, 2.4, lt));
    regra(ctx, 350, 455, 300, 'é VISUAL', COR_F.visual, pop(lt, S.w('visual') - .1));
    regra(ctx, 930, 455, 320, 'é MATERIAL', COR_F.material, pop(lt, S.w('material') - .1));
    ctx.restore();
  }
  const a1 = ph(lt, t1, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    board(ctx, 190, 120, 900, 400);
    const kv = pop(lt, S.w('vídeo') - .1);
    popAt(ctx, kv, 460, 300, () => icoTela(ctx, 460, 290, 2, () => {
      circ(ctx, 0, -12, 16, '#fcdcc4'); ell(ctx, 0, -24, 18, 10, '#8d5530'); rr(ctx, -22, 6, 44, 30, 12); ctx.fillStyle = '#a855f7'; ctx.fill();
      circ(ctx, -5, -12, 2, '#222'); circ(ctx, 5, -12, 2, '#222'); ell(ctx, 0, -4, 4, 2 + S.talk(lt) * 3, '#c2255c');
      txt(ctx, 'blá blá', 40, -24, 11, '#5f3dc4');
    }));
    kw(ctx, 'vídeo', 460, 175, 36, kv, '#fff', '#23314f', { border: '#adb5bd' });
    const ko = pop(lt, S.w('oral') - .1);
    popAt(ctx, ko, 830, 290, () => cartaD(ctx, 'oral', 830, 290, 2.8, lt));
    arrowTo(ctx, 620, 290, 730, 290, COR_F.oral, 8, ap(lt, S.w('oral') - .1, .3));
    regra(ctx, 640, 460, 560, 'continua ORAL!', COR_F.oral, pop(lt, S.w('continua') - .1));
    ctx.restore();
  }
  const a2 = ph(lt, t2);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    mor(ctx, 'vovo', 640, GROUND, lt, 1, 1.9, lt > S.w('contou') - .1 && S.talk(lt) > 0);
    const ke = pop(lt, wF(S, 'carta', 2) - .1), ko = pop(lt, wF(S, 'contou', 2) - .1);
    board(ctx, 90, 130, 380, 330, ke, 'rgba(255,253,245,.95)', COR_F.escrita);
    popAt(ctx, ke, 200, 260, () => trilhaD(ctx, 3, 200, 250, 3.2, lt));
    popAt(ctx, ke, 370, 260, () => cartaD(ctx, 'escrita', 370, 260, 2.2, lt));
    lab(ctx, 'escreveu', 280, 375, ke, COR_F.escrita, 36);
    regra(ctx, 280, 430, 260, 'ESCRITA', COR_F.escrita, pop(lt, wF(S, 'escrita', 2) - .1));
    board(ctx, 810, 130, 380, 330, ko, 'rgba(255,253,245,.95)', COR_F.oral);
    bubble(ctx, 920, 245, 'Era uma\nvez...', ko, 840, 330, { size: 28, color: '#5f3dc4' });
    popAt(ctx, ko, 1100, 260, () => cartaD(ctx, 'oral', 1100, 260, 2.2, lt));
    lab(ctx, 'contou falando', 1000, 375, ko, COR_F.oral, 34);
    regra(ctx, 1000, 430, 220, 'ORAL', COR_F.oral, pop(lt, wF(S, 'oral', 2) - .1));
    ctx.restore();
  }
};

/* 5. A ESCOLA TEM HISTORIA */
SCENES.escola = (ctx, lt, S) => {
  artBg(ctx, 'escola', lt, { pan: 12 });
  sceneTag(ctx, 'A escola tem história', ap(lt, .1, .4));
  const t1 = S.f(1) - .25, t2 = S.f(2) - .25, t3 = S.f(3) - .25;
  mor(ctx, 'lucia', 120, GROUND, lt, 1, 1.6, false);
  const a0 = ph(lt, 0, t1);
  if (a0 > 0) {
    ctx.save(); ctx.globalAlpha *= a0;
    board(ctx, 250, 90, 900, 270, ap(lt, .3, .4));
    kw(ctx, 'A escola tem história', 680, 150, 54, pop(lt, S.w('escola') - .1), '#c92a2a', '#fff');
    [['acontecimentos', 'acontecimentos', '#e8590c'], ['pessoas', 'pessoas', '#1c7ed6'], ['mudanças', 'mudanças', '#2f9e44']]
      .forEach(([w, s, c], i) => kw(ctx, s, 680 + (i - 1) * 330, 290, 36, pop(lt, S.w(w) - .1), '#fff', c, { border: c, minW: 280 }));
    ctx.restore();
  }
  const a1 = ph(lt, t1, t2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    board(ctx, 250, 90, 970, 440);
    kw(ctx, 'guardam pistas', 735, 92, 34, pop(lt, S.w('pistas') - .1), '#f59f00', '#fff');
    const IT = [['fotos', 'fotos antigas', (x, y) => icoFotoAntiga(ctx, x, y, 1.05)], ['cadernos', 'cadernos', (x, y) => icoCaderno(ctx, x, y, 1)],
      ['boletins', 'boletins', (x, y) => icoBoletim(ctx, x, y, 1)], ['bilhetes', 'bilhetes', (x, y) => icoBilhete(ctx, x, y, 1.1)],
      ['uniformes', 'uniformes', (x, y) => icoUniforme(ctx, x, y, 1)], ['troféus', 'troféus', (x, y) => icoTrofeu(ctx, x, y, 1.05)]];
    IT.forEach(([w, s, fn], i) => {
      const x = 420 + (i % 3) * 315, y = 210 + Math.floor(i / 3) * 190, k = pop(lt, S.w(w) - .1);
      popAt(ctx, k, x, y, () => fn(x, y));
      lab(ctx, s, x, y + 78, k, '#23314f', 30);
    });
    ctx.restore();
  }
  const a2 = ph(lt, t2, t3);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    board(ctx, 300, 200, 920, 330);
    kw(ctx, 'documentos da vida escolar', 690, 140, 44, pop(lt, S.w('documentos') - .1), '#1c7ed6', '#fff');
    popAt(ctx, pop(lt, S.w('documentos')), 470, 300, () => { icoCaderno(ctx, 420, 300, 1.2, '#7048e8'); icoBoletim(ctx, 530, 300, 1.2); });
    lab(ctx, 'mostram como era...', 920, 230, ap(lt, S.w('mostram') - .2, .4), '#23314f', 32);
    [['ensino', 'o ensino'], ['regras', 'as regras'], ['dia', 'o dia a dia']].forEach(([w, s], i) =>
      kw(ctx, s, 920, 300 + i * 78, 34, pop(lt, S.w(w) - .1), '#fff', '#1864ab', { border: '#74c0fc', minW: 260 }));
    ctx.restore();
  }
  const a3 = ph(lt, t3);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    board(ctx, 290, 130, 920, 390);
    const kg = pop(lt, S.w('guardar') - .1);
    popAt(ctx, kg, 500, 400, () => {
      ctx.save(); ctx.translate(500, 330); ctx.rotate(-.35); rr(ctx, -110, -70, 220, 70, 12); ctx.fillStyle = '#8a5428'; ctx.fill(); ctx.restore();
      trilhaD(ctx, 5, 450, 320, 2.3, lt); trilhaD(ctx, 4, 510, 305, 2.2, lt); trilhaD(ctx, 3, 565, 322, 2.2, lt);
      rr(ctx, 390, 330, 220, 130, 14); ctx.fillStyle = '#a0662f'; ctx.fill(); ctx.fillStyle = '#8a5428'; ctx.fillRect(390, 380, 220, 14);
      rr(ctx, 488, 372, 24, 30, 5); ctx.fillStyle = '#fcc419'; ctx.fill();
    });
    kw(ctx, 'Guardar documentos', 900, 220, 40, kg, '#fff', '#7c2d12', { border: '#f59f00' });
    const km = pop(lt, S.w('memórias') - .1);
    kw(ctx, 'preserva memórias', 900, 330, 46, km, '#2f9e44', '#fff');
    popAt(ctx, km, 900, 430, () => { heart(ctx, 850, 435, .8); heart(ctx, 950, 435, .8, '#ff8787'); });
    ctx.restore();
  }
};
