/* cenas_cie.js — video CIE3: as figuras reais dos slides, grandes; a frase do slide vai na legenda.
   Uma cena por capitulo; o visual muda frase a frase, conforme timeline.js (campo fig).
   Sem texto escrito no codigo: tudo vem de roteiro_frases.py. */
const IMG = {};
window.IMGS_PRONTAS = Promise.all(Object.keys(window.IMGS).map(k => new Promise((ok, no) => {
  const im = new Image(); im.onload = () => { IMG[k] = im; ok(); }; im.onerror = () => no(new Error('img ' + k)); im.src = window.IMGS[k];
})));
const COR = { open: '#ef4444', position: '#f472b6', room: '#f472b6', maps: '#fb7185', persp: '#fbbf24', forces: '#38bdf8', moves: '#a78bfa', dirs: '#a78bfa', body: '#34d399', push: '#f97316', end: '#38bdf8' };
const AREA = { x: 36, y: 86, w: 1208, h: 478 };

function fundo(ctx, cor) {
  ctx.fillStyle = '#12102a'; ctx.fillRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, cor + '55'); g.addColorStop(.6, cor + '12'); g.addColorStop(1, '#12102a00');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
/* desenha a imagem inteira (sem corte) dentro da caixa; devolve a transformacao para os aneis */
function foto(ctx, it, bx, by, bw, bh, aceso, cor, al) {
  const im = IMG[it.n]; if (!im) { MISSING.push('img:' + it.n); return null; }
  const c = it.crop || [5, 5, im.width - 10, im.height - 10];   /* 5 px: tira o fio escuro do recorte */
  const k = Math.min(bw / c[2], bh / c[3]), dw = c[2] * k, dh = c[3] * k, dx = al === 'r' ? bx + bw - dw : al === 'l' ? bx : bx + (bw - dw) / 2, dy = by + (bh - dh) / 2;
  shadowOn(ctx, 18, 6, .35); rr(ctx, dx - 8, dy - 8, dw + 16, dh + 16, 16); ctx.fillStyle = '#fff'; ctx.fill(); shadowOff(ctx);
  if (aceso) { ctx.lineWidth = 7; ctx.strokeStyle = cor; rr(ctx, dx - 8, dy - 8, dw + 16, dh + 16, 16); ctx.stroke(); }
  ctx.save(); rr(ctx, dx, dy, dw, dh, 10); ctx.clip(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(im, c[0], c[1], c[2], c[3], dx, dy, dw, dh); ctx.restore();
  return { k, dx, dy, c, dw, dh };
}
function anel(ctx, T, r, lt) {
  const x = T.dx + (r.x - T.c[0]) * T.k, y = T.dy + (r.y - T.c[1]) * T.k, R = r.r * T.k * (1 + .035 * Math.sin(lt * 4));
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.stroke();
  ctx.lineWidth = 6; ctx.strokeStyle = '#e11d48'; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.stroke(); ctx.restore();
  if (r.label) chip(ctx, r.label, x, y - R - 6 < T.dy + 22 ? y + R + 6 : y - R - 6, 30, '#e11d48', '#fff');
}
function chave(fig) { return JSON.stringify([fig.kw, (fig.imgs || []).map(i => [i.n, i.crop, i.label]), fig.words]); }

function visual(ctx, fig, lt, S, fi, cor) {
  if (fig.kw) {
    ctx.font = `900 34px ${FONT}`; const tw = ctx.measureText(fig.kw).width + 44, cx = Math.max(W / 2, W - 36 - tw / 2 - 0);
    rr(ctx, cx - tw / 2, 18, tw, 54, 27); ctx.fillStyle = fig.cor || cor; ctx.fill(); txt(ctx, fig.kw, cx, 46, 34, '#14122c');
  }
  if (fig.words) {
    const ws = fig.words, n = ws.length, cw = (AREA.w - 40 * (n - 1)) / n, yc = AREA.y + AREA.h / 2 - 10;
    ws.forEach((s, i) => {
      const x = AREA.x + i * (cw + 40); shadowOn(ctx, 18, 6, .35); rr(ctx, x, yc - 120, cw, 240, 28); ctx.fillStyle = i ? (fig.cor || cor) : '#fff'; ctx.fill(); shadowOff(ctx);
      let sz = 84; ctx.font = `900 ${sz}px ${FONT}`; while (ctx.measureText(s).width > cw - 50 && sz > 36) { sz -= 4; ctx.font = `900 ${sz}px ${FONT}`; }
      txt(ctx, s, x + cw / 2, yc + 4, sz, '#14122c');
    });
    return;
  }
  const its = fig.imgs, n = its.length;
  const pal = S.sc.palavras.filter(p => p.f === fi);
  /* o edge-tts as vezes nao manda o fim da frase ("...and a door swing"): sem a palavra, acende logo depois da ultima ouvida */
  const quando = w => { if (!w) return 1e9; const h = pal.find(p => p.w === w); return h ? h.ini - S.sc.ini : (pal.length ? pal[pal.length - 1].fim - S.sc.ini + .3 : S.f(fi)); };
  if (n === 1) {
    const T = foto(ctx, its[0], AREA.x, AREA.y, AREA.w, AREA.h);
    if (T) fig.rings.forEach(r => anel(ctx, T, r, lt));
    return;
  }
  if (n === 4) {
    const g = 22, cw = (AREA.w - g) / 2, ch = (AREA.h - g) / 2;
    its.forEach((it, i) => foto(ctx, it, AREA.x + (i % 2) * (cw + g), AREA.y + (i >> 1) * (ch + g), cw, ch, false, null, i % 2 ? 'l' : 'r'));
    return;
  }
  const g = 28, cw = (AREA.w - g * (n - 1)) / n, lb = 52;
  its.forEach((it, i) => {
    const x = AREA.x + i * (cw + g), ac = lt >= quando(it.w) - .02;
    foto(ctx, it, x, AREA.y, cw, AREA.h - lb, ac, fig.cor);
    if (it.label) txt(ctx, it.label, x + cw / 2, AREA.y + AREA.h - 18, 34, ac ? (fig.cor || '#ffd43b') : '#fff');
  });
}

function cena(cid) {
  return (ctx, lt, S) => {
    const cor = COR[cid]; fundo(ctx, cor);
    const fr = S.sc.frases; let i = 0;
    for (let k = 0; k < fr.length; k++) if (lt >= S.f(k) - .12) i = k;
    const T0 = S.f(i) - .12, a = i > 0 && chave(fr[i].fig) !== chave(fr[i - 1].fig) ? clamp((lt - T0) / .28) : 1;
    if (a < 1) { ctx.save(); ctx.globalAlpha = 1 - a; visual(ctx, fr[i - 1].fig, lt, S, i - 1, cor); ctx.restore(); }
    ctx.save(); ctx.globalAlpha = a; visual(ctx, fr[i].fig, lt, S, i, cor); ctx.restore();
    sceneTag(ctx, S.sc.nome, ap(lt, 0, .4));
  };
}
TL.cenas.forEach(c => { SCENES[c.id] = cena(c.id); });

SCENES.titulo = (ctx, lt) => {
  fundo(ctx, '#38bdf8');
  const k = ap(lt, 0, .5), [a, b] = TL.titulo.split(': ');
  ctx.save(); ctx.globalAlpha = k;
  txt(ctx, a, W / 2, 110, 58, '#7dd3fc'); txt(ctx, b, W / 2, 190, 86, '#fff');
  const n = TL.capa.length, g = 20, cw = (1180 - g * (n - 1)) / n;
  TL.capa.forEach((nm, i) => foto(ctx, { n: nm }, 50 + i * (cw + g), 290, cw, 300));
  ctx.restore();
};
