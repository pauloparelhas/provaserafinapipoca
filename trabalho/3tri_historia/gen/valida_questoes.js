// valida_questoes.js — PORTÃO de viabilidade das questões (critério: _processo/CRITERIO_QUESTOES.md).
// 1) Filtro automático de "cheiro de absurdo" (lista de piadas/anacronismos, distratores absolutos,
//    alternativa certa muito maior que as outras, alternativas repetidas).
// 2) Livro de aprovação: todo item do banco e toda tela de escolha das lições precisam ter APROVA no
//    trabalho/3tri_historia/_avaliacao_questoes.json com a impressão digital ATUAL (pergunta+alternativas).
//    Mudou o texto -> precisa reavaliar (agente avaliador-questoes).
// Uso: node valida_questoes.js <pasta ferramentas> [--grava]   (--grava: registra as impressões digitais
//      dos itens que o avaliador marcou APROVA/ADAPTA-aplicada; nunca aprova sozinho item novo)
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const DIR = path.resolve(process.argv[2]); const GRAVA = process.argv.includes('--grava');
const LIVRO = path.join(__dirname, '..', '_avaliacao_questoes.json');
global.window = {}; require(path.join(DIR, 'HIS3_banco.js')); require(path.join(DIR, 'HIS3_estudo_licoes.js'));
const fp = (p, o) => crypto.createHash('sha1').update(p + '||' + o.join('|')).digest('hex').slice(0, 12);
const puro = s => String(s).replace(/<img[^>]*>/g, '[foto] ').replace(/<[^>]+>/g, '').trim();
const itens = window.HIS3.ITENS.map(i => ({ id: i.id, p: i.p, o: i.o }));
window.HIS3_LICOES.forEach(l => l.telas.forEach((t, ti) => { if (t.tipo === 'escolha') t.itens.forEach((it, k) => {
  const op = it.op || t.op; itens.push({ id: it._id || ('L_' + l.k + '_' + ti + '_' + k), p: puro(t.pergunta) + ' :: ' + puro(it.m), o: [it.c].concat(op.filter(x => x !== it.c)) }); }); }));

/* ---- 1) cheiro de absurdo ---- */
const PIADA = /\b(bolo|paraquedas|foguete|dinossauro|unic[oó]rnio|m[aá]gica|feiti[cç]o|pombo|sinais? de fuma[cç]a|signo|t[eê]nis|pregui[cç]a|cor do c[eé]u|cansaram|tabuada|pizza|sorvete|videogame|desenho animado|super-?her[oó]i|fada|bruxa|drag[aã]o|avi[aã]o|navio pirata)\b/i;
const ABSOLUTO = /^(nada|nunca|nenhum[a]?|ningu[eé]m|proibid[oa]s?|n[aã]o existe|s[oó] enfeite|nada,? .*|jogar fora.*)$/i;
const cheiros = [];
itens.forEach(it => {
  const erradas = it.o.slice(1);
  erradas.forEach(e => { if (PIADA.test(e)) cheiros.push(it.id + ': distrator-piada/anacronismo "' + e + '"'); if (ABSOLUTO.test(e.trim())) cheiros.push(it.id + ': distrator absoluto "' + e + '"'); });
  if (new Set(it.o.map(x => x.toLowerCase())).size !== it.o.length) cheiros.push(it.id + ': alternativas repetidas');
  const lc = it.o[0].length, lm = Math.max(...erradas.map(e => e.length));
  if (lc > 18 && lc > 2.2 * lm) cheiros.push(it.id + ': certa muito maior que as erradas (' + lc + ' x ' + lm + ')');
});

/* ---- 2) livro de aprovação ---- */
let livro = {}; try { livro = JSON.parse(fs.readFileSync(LIVRO, 'utf8')); } catch (e) {}
const falta = [];
itens.forEach(it => { const f = fp(it.p, it.o), L = livro[it.id];
  if (GRAVA && L && L.decisao === 'APROVA') { L.fp = f; }
  else if (!L || L.decisao !== 'APROVA' || L.fp !== f) falta.push(it.id + (L ? ' (' + L.decisao + (L.fp && L.fp !== f ? ', texto mudou' : '') + ')' : ' (sem avaliação)')); });
if (GRAVA) fs.writeFileSync(LIVRO, JSON.stringify(livro, null, 1));
console.log('itens', itens.length, '| cheiros de absurdo', cheiros.length, '| sem aprovação', falta.length);
cheiros.slice(0, 40).forEach(c => console.log('  CHEIRO ' + c)); falta.slice(0, 40).forEach(c => console.log('  FALTA  ' + c));
const ok = !cheiros.length && !falta.length; console.log(ok ? 'QUESTÕES APROVADAS' : 'QUESTÕES REPROVADAS'); process.exit(ok ? 0 : 1);
