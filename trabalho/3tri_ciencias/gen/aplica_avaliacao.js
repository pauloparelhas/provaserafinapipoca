// Aplica avaliacao/resultado*.json aos banco/*.json (EXCLUI tira, ADAPTA troca) e grava o livro _avaliacao_questoes.json.
// Item de licao (id L_*) so entra no livro; correcao de licao e feita no proprio CIE3_estudo_licoes.js.
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..'), AV = path.join(raiz, 'avaliacao'), B = path.join(raiz, 'banco'), LV = path.join(raiz, '_avaliacao_questoes.json');
let livro = {}; try { livro = JSON.parse(fs.readFileSync(LV, 'utf8')); } catch (e) {}
const R = {}; fs.readdirSync(AV).filter(f => /^resultado.*\.json$/.test(f)).sort().forEach(f => JSON.parse(fs.readFileSync(path.join(AV, f), 'utf8')).forEach(r => { R[r.id] = r; }));
const n = { APROVA: 0, ADAPTA: 0, EXCLUI: 0, sem: 0 }; const idsBanco = new Set();
fs.readdirSync(B).filter(f => /^T.*\.json$/.test(f)).forEach(f => {
  const p = path.join(B, f); const saida = [];
  JSON.parse(fs.readFileSync(p, 'utf8')).forEach(it => {
    idsBanco.add(it.id); const r = R[it.id];
    if (!r) { n.sem++; console.log('SEM AVALIACAO', it.id); saida.push(it); return; }
    const d = r.decisao.toUpperCase(); n[d]++;
    if (d === 'EXCLUI') { livro[it.id] = { decisao: 'EXCLUI', regras: r.regras, motivo: r.motivo }; return; }
    if (d === 'ADAPTA') {
      ['p', 'p_pt', 'o', 'o_pt', 'ex', 'ex_pt', 'dica', 'dica_en'].forEach(k => { if (r[k] !== undefined) it[k] = r[k]; });
      if (it.o.length !== it.o_pt.length) console.log('o_pt DESALINHADO', it.id);
    }
    livro[it.id] = { decisao: 'APROVA' };
    saida.push(it);
  });
  fs.writeFileSync(p, JSON.stringify(saida, null, 1));
});
Object.values(R).filter(r => /^L_/.test(r.id)).forEach(r => { if (r.decisao.toUpperCase() === 'APROVA') livro[r.id] = { decisao: 'APROVA' }; else console.log('LICAO A CORRIGIR', r.id, r.decisao, r.motivo || ''); });
fs.writeFileSync(LV, JSON.stringify(livro, null, 1));
console.log(JSON.stringify(n));
