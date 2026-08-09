/* validate_geo.js — gate determinístico dos bancos de dados de Geografia.
   Verifica GAMES (dragdrop/popit) e ADVENTURE (aventura):
   integridade referencial, itens órfãos, gabaritos, mínimos e duplicatas. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DIR = String.raw`C:\Users\paulo\OneDrive\td junto outlook hotmail\MAPLE BEAR\provas\ferramentas`;
let err = 0, warn = 0;
const E = m => { err++; console.log('  ERRO  ' + m); };
const W = m => { warn++; console.log('  aviso ' + m); };

/* ---------- 1. GEO2_data.js (GAMES) ---------- */
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'GEO2_data.js'), 'utf8') + '\n;this.GAMES=GAMES;', ctx);
const GAMES = ctx.GAMES;
console.log(`\n== GEO2_data.js: ${GAMES.length} jogos ==`);
const keys = new Set();
GAMES.forEach((g, i) => {
  const tag = `jogo ${i + 1} (${g.key})`;
  if (keys.has(g.key)) E(`${tag}: key duplicada`); keys.add(g.key);
  ['en', 'pt', 'info', 'infopt', 'tip', 'tippt', 'emo'].forEach(k => {
    if (!g[k] && g[k] !== '') E(`${tag}: falta campo ${k}`);
  });
  if (!g.cols || g.cols.length < 2) E(`${tag}: precisa de >=2 colunas`);
  const colIds = new Set(g.cols.map(c => c.id));
  g.cols.forEach(c => { if (!c.en || !c.emo || !c.co) E(`${tag}: coluna ${c.id} incompleta`); });
  if (!g.cards || g.cards.length < 6) E(`${tag}: precisa de >=6 cartas (tem ${g.cards ? g.cards.length : 0})`);
  const seen = new Set();
  g.cards.forEach(c => {
    if (!colIds.has(c.col)) E(`${tag}: carta "${c.en}" aponta para coluna inexistente "${c.col}"`);
    if (seen.has(c.en)) E(`${tag}: carta duplicada "${c.en}"`); seen.add(c.en);
    if (typeof c.pt !== 'string') E(`${tag}: carta "${c.en}" sem campo pt (dica)`);
  });
  /* toda coluna tem de receber ao menos 1 carta (senao o Pop it! gera rodada vazia) */
  g.cols.forEach(c => {
    const n = g.cards.filter(x => x.col === c.id).length;
    if (n === 0) E(`${tag}: coluna "${c.en}" sem nenhuma carta (Pop it! quebraria)`);
    else if (n === 1) W(`${tag}: coluna "${c.en}" com 1 carta só`);
  });
  console.log(`   ${g.key}: ${g.cols.length} colunas · ${g.cards.length} cartas`);
});

/* ---------- 2. ADVENTURE (dentro do GEO2_aventura.html) ---------- */
const html = fs.readFileSync(path.join(DIR, 'GEO2_aventura.html'), 'utf8');
const blocks = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
const advSrc = blocks.find(b => b.includes('var ADVENTURE='));
if (!advSrc) { E('ADVENTURE nao encontrado no GEO2_aventura.html'); process.exit(1); }
const ctx2 = {
  window: {}, document: { getElementById: () => null }, console,
  SERA_ADV: { boot: () => {} }, say: () => {}, requestAnimationFrame: () => {}
};
vm.createContext(ctx2);
vm.runInContext(advSrc + '\n;this.ADVENTURE=ADVENTURE;', ctx2);
const A = ctx2.ADVENTURE;
console.log(`\n== ADVENTURE "${A.title}": ${A.phases.length} fases ==`);
const ids = new Set(A.phases.map(p => p.id));
let totalQ = 0;
A.phases.forEach(p => {
  const tag = `fase ${p.id}`;
  if (!p.icon || !p.name) E(`${tag}: falta icon/name`);
  if (p.boss) {
    if (!p.from || !p.from.length) E(`${tag}: chefe sem 'from'`);
    p.from.forEach(f => { if (!ids.has(f)) E(`${tag}: from aponta para fase inexistente "${f}"`); });
    const disp = p.from.reduce((s, f) => s + (A.phases.find(x => x.id === f).bank || []).length, 0);
    if (disp < (p.count || 4)) E(`${tag}: pede ${p.count} itens mas as fases-fonte so tem ${disp}`);
    console.log(`   ${p.id} CHEFE: ${p.count} perguntas de [${p.from.join(', ')}]`);
    return;
  }
  if (!p.anchor) E(`${tag}: sem frase-ancora (nao gera emblema na celebracao)`);
  if (!p.lesson || !p.lesson.lines || p.lesson.lines.length < 2) E(`${tag}: licao com menos de 2 linhas`);
  (p.lesson.lines || []).forEach((l, i) => {
    if (l.length !== 3) E(`${tag}: linha ${i + 1} da licao precisa de [emoji, texto, dica]`);
  });
  if (!p.bank || p.bank.length < (p.pick || 3)) E(`${tag}: banco menor que pick`);
  if (p.bank && p.bank.length < 6) W(`${tag}: banco com ${p.bank.length} itens (<6, repete rapido)`);
  const qs = new Set();
  (p.bank || []).forEach(it => {
    totalQ++;
    if (!it.q) E(`${tag}: item sem enunciado`);
    if (qs.has(it.q)) E(`${tag}: enunciado duplicado "${it.q}"`); qs.add(it.q);
    if (it.t === 'mc') {
      const ok = (it.opts || []).filter(o => o.ok).length;
      if (ok !== 1) E(`${tag}: MC "${it.q}" tem ${ok} respostas corretas (precisa de exatamente 1)`);
      if ((it.opts || []).length < 3) E(`${tag}: MC "${it.q}" com menos de 3 opcoes`);
    } else if (it.t === 'multi') {
      const ok = (it.opts || []).filter(o => o.ok).length;
      if (ok < 1) E(`${tag}: multi "${it.q}" sem resposta correta`);
      if ((it.opts || []).length < 2) E(`${tag}: multi "${it.q}" com menos de 2 opcoes`);
    } else if (it.t === 'sort') {
      const bids = new Set((it.buckets || []).map(b => b.id));
      if (bids.size < 2) E(`${tag}: sort "${it.q}" com menos de 2 baldes`);
      (it.items || []).forEach(x => {
        if (!bids.has(x.b)) E(`${tag}: sort "${it.q}" item "${x.en}" aponta para balde inexistente "${x.b}"`);
      });
      if ((it.items || []).length < (it.pick || 4)) E(`${tag}: sort "${it.q}" tem menos itens que pick`);
      bids.forEach(b => {
        if (!(it.items || []).some(x => x.b === b)) W(`${tag}: sort "${it.q}" balde "${b}" sem item`);
      });
    } else E(`${tag}: tipo desconhecido "${it.t}"`);
    /* opcoes duplicadas dentro do mesmo item */
    if (it.opts) {
      const s = new Set();
      it.opts.forEach(o => { if (s.has(o.en)) E(`${tag}: "${it.q}" opcao repetida "${o.en}"`); s.add(o.en); });
    }
  });
  console.log(`   ${p.id}: ${p.bank.length} itens · pick ${p.pick || 3}`);
});
console.log(`\n   total de perguntas na aventura: ${totalQ}`);
console.log(`\n${err ? 'FALHOU' : 'PASSOU'} — ${err} erro(s), ${warn} aviso(s)\n`);
process.exit(err ? 1 : 0);
