/* validate_geo_sim.js — gate determinístico do banco do simulado de Geografia.
   Verifica MC/VF/FILL/MATCH/ORDER/OPEN + THEMES + TH_WEIGHT:
   gabarito único, distratores repetidos, tema inexistente, itens órfãos,
   cobertura mínima por tema e termos proibidos por ambiguidade (roteiro §7). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DIR = path.resolve(__dirname, '..', '..', 'ferramentas');
const html = fs.readFileSync(path.join(DIR, 'GEO2_simulado.html'), 'utf8');
const blocks = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
const src = blocks.find(b => b.includes('const MC ='));
if (!src) { console.log('ERRO: banco nao encontrado'); process.exit(1); }
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(src.split('/* ================= ENGINE')[0] +
  '\n;this.B={MC,VF,FILL,MATCH,ORDER,OPEN,THEMES,TH_WEIGHT};', ctx);
const { MC, VF, FILL, MATCH, ORDER, OPEN, THEMES, TH_WEIGHT } = ctx.B;

let err = 0, warn = 0;
const E = m => { err++; console.log('  ERRO  ' + m); };
const W = m => { warn++; console.log('  aviso ' + m); };
const THS = new Set(THEMES.map(t => t.k));
const count = {}; THS.forEach(k => count[k] = 0);
const strip = s => String(s).replace(/<[^>]*>/g, '');

function th(it, tag) {
  if (!THS.has(it.th)) E(`${tag}: tema inexistente "${it.th}"`);
  else count[it.th]++;
}

/* proibicoes de ambiguidade — roteiro §7 */
const PROIBIDO = [
  { re: /^Festa do Divino$/i, why: 'aparece no Norte E no Centro-Oeste' },
  { re: /^festa da uva$/i, why: 'aparece no Sudeste (Jundiai) E no Sul' },
  { re: /^sertanejo$/i, why: 'Centro-Oeste (sertanejo) x Sul (sertanejo universitario)' },
  { re: /^carnaval$/i, why: 'Salvador (NE), Rio (SE) e Olinda (NE)' },
  { re: /^xote$/i, why: 'Nordeste (musica) x Sul (xote gaucho)' },
];
function checkAmb(txt, tag) {
  const t = strip(txt).replace(/[.?!]$/, '').trim();
  PROIBIDO.forEach(p => { if (p.re.test(t)) E(`${tag}: termo ambiguo isolado "${t}" — ${p.why}`); });
}

console.log('\n== MC (multipla escolha): ' + MC.length + ' ==');
const qs = new Set();
MC.forEach((it, i) => {
  const tag = `MC#${i + 1}`;
  th(it, tag);
  if (!it.en) E(`${tag}: sem enunciado`);
  if (qs.has(it.en)) E(`${tag}: enunciado duplicado`); qs.add(it.en);
  const ok = it.opts.filter(o => o[1] === 1).length;
  if (ok !== 1) E(`${tag}: ${ok} alternativas corretas (precisa de 1) — "${strip(it.en)}"`);
  if (it.opts.length < 3) E(`${tag}: menos de 3 alternativas`);
  const seen = new Set();
  it.opts.forEach(o => {
    if (seen.has(o[0])) E(`${tag}: alternativa repetida "${o[0]}"`); seen.add(o[0]);
    if (!o[0]) E(`${tag}: alternativa vazia`);
    checkAmb(o[0], tag + ' (alternativa)');
  });
});

console.log('== VF (verdadeiro/falso): ' + VF.length + ' ==');
const vfs = new Set();
VF.forEach((it, i) => {
  const tag = `VF#${i + 1}`;
  th(it, tag);
  if (typeof it.ans !== 'boolean') E(`${tag}: campo ans precisa ser true/false`);
  if (vfs.has(it.en)) E(`${tag}: afirmacao duplicada`); vfs.add(it.en);
});
const nT = VF.filter(v => v.ans).length;
if (nT / VF.length > 0.75 || nT / VF.length < 0.25)
  W(`VF desequilibrado: ${nT} verdadeiras de ${VF.length} (a crianca aprende a chutar)`);

console.log('== FILL (completar): ' + FILL.length + ' ==');
FILL.forEach((it, i) => {
  const tag = `FILL#${i + 1}`;
  th(it, tag);
  if (!it.ans) E(`${tag}: sem resposta`);
  if (!it.bank || !it.bank.length) E(`${tag}: sem distratores`);
  if ((it.bank || []).includes(it.ans)) E(`${tag}: a resposta "${it.ans}" tambem esta no banco de distratores`);
  const s = new Set(it.bank);
  if (s.size !== (it.bank || []).length) E(`${tag}: distrator repetido`);
  checkAmb(it.ans, tag);
});

console.log('== MATCH (ligar): ' + MATCH.length + ' ==');
MATCH.forEach((it, i) => {
  const tag = `MATCH#${i + 1}`;
  th(it, tag);
  if (!it.cats || it.cats.length < 2) E(`${tag}: menos de 2 categorias`);
  if (!it.items || it.items.length < 2) E(`${tag}: menos de 2 itens`);
  const used = new Set();
  (it.items || []).forEach(x => {
    if (x[2] == null || x[2] < 0 || x[2] >= it.cats.length)
      E(`${tag}: item "${x[0]}" aponta para categoria inexistente (${x[2]})`);
    else used.add(x[2]);
  });
  it.cats.forEach((c, k) => { if (!used.has(k)) W(`${tag}: categoria "${c[0]}" sem item`); });
});

console.log('== ORDER (ordenar): ' + ORDER.length + ' ==');
ORDER.forEach((it, i) => {
  const tag = `ORDER#${i + 1}`;
  th(it, tag);
  if (!it.items || it.items.length < 3) E(`${tag}: precisa de >=3 itens`);
  if (new Set(it.items).size !== it.items.length) E(`${tag}: item repetido (ordem ficaria ambigua)`);
});

console.log('== OPEN (resposta aberta): ' + OPEN.length + ' ==');
OPEN.forEach((it, i) => {
  const tag = `OPEN#${i + 1}`;
  th(it, tag);
  if (!it.men) E(`${tag}: sem resposta-modelo (a crianca nao consegue se autocorrigir)`);
});

console.log('\n== cobertura por tema ==');
let totalQ = 0;
THEMES.forEach(t => {
  totalQ += count[t.k];
  const w = TH_WEIGHT[t.k];
  if (w == null) E(`tema "${t.k}" sem peso em TH_WEIGHT`);
  if (count[t.k] < 8) E(`tema "${t.k}" com so ${count[t.k]} questoes (minimo 8 — nao sustenta uma rodada)`);
  console.log(`   ${t.k.padEnd(12)} ${String(count[t.k]).padStart(3)} questoes · peso ${w}`);
});
Object.keys(TH_WEIGHT).forEach(k => { if (!THS.has(k)) E(`TH_WEIGHT tem peso para tema inexistente "${k}"`); });
console.log(`   TOTAL        ${totalQ} questoes`);

console.log(`\n${err ? 'FALHOU' : 'PASSOU'} — ${err} erro(s), ${warn} aviso(s)\n`);
process.exit(err ? 1 : 0);
