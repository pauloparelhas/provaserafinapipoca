// aplica_avaliacao.js — aplica o veredito do avaliador de questões (avaliacao/resultado*.json):
//   EXCLUI -> o item sai do banco / da tela;  ADAPTA -> pergunta e alternativas trocadas;  APROVA -> fica.
// Grava o bloco REVISÃO dentro de HIS3_banco.js e de HIS3_estudo_licoes.js (entre marcadores, regerável)
// e o livro trabalho/3tri_historia/_avaliacao_questoes.json (decisão por id; a impressão digital é gravada
// depois pelo valida_questoes.js --grava, só para itens aprovados).
// Uso: node aplica_avaliacao.js <pasta ferramentas> [resultadoN.json ...]  (sem lista: todos os resultado*.json)
const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2]);
const AV = path.join(__dirname, '..', 'avaliacao'), LIVRO = path.join(__dirname, '..', '_avaliacao_questoes.json');
const arqs = process.argv.slice(3).length ? process.argv.slice(3) : fs.readdirSync(AV).filter(f => /^resultado.*\.json$/.test(f)).sort();
let livro = {}; try { livro = JSON.parse(fs.readFileSync(LIVRO, 'utf8')); } catch (e) {}
const RB = {}, RL = {}; /* revisões do banco e das lições */
try { const s = fs.readFileSync(path.join(DIR, 'HIS3_banco.js'), 'utf8'); const m = s.match(/\/\*REVISAO-INICIO\*\/var REVISAO=([\s\S]*?);\/\*REVISAO-FIM\*\//); if (m) Object.assign(RB, JSON.parse(m[1])); } catch (e) {}
try { const s = fs.readFileSync(path.join(DIR, 'HIS3_estudo_licoes.js'), 'utf8'); const m = s.match(/\/\*REVISAO-INICIO\*\/var REVISAO_L=([\s\S]*?);\/\*REVISAO-FIM\*\//); if (m) Object.assign(RL, JSON.parse(m[1])); } catch (e) {}
let n = { APROVA: 0, ADAPTA: 0, EXCLUI: 0 };
arqs.forEach(a => {
  JSON.parse(fs.readFileSync(path.join(AV, a), 'utf8')).forEach(r => {
    const d = String(r.decisao || '').toUpperCase(); n[d] = (n[d] || 0) + 1;
    const ehL = /^L_/.test(r.id), R = ehL ? RL : RB;
    if (d === 'EXCLUI') { R[r.id] = null; livro[r.id] = { decisao: 'EXCLUI', regras: r.regras || [], motivo: r.motivo || '' }; }
    else if (d === 'ADAPTA') { R[r.id] = ehL ? Object.assign({ m: r.p || r.item, o: r.o }, r.pergunta ? { q: r.pergunta } : {}, r.d ? { d: r.d } : {}) : Object.assign({ p: r.p, o: r.o }, r.ex ? { ex: r.ex } : {}, r.dica ? { dica: r.dica } : {}); livro[r.id] = { decisao: 'ADAPTA', regras: r.regras || [], motivo: r.motivo || '' }; }
    else if (d === 'APROVA') { if (!livro[r.id] || livro[r.id].decisao !== 'APROVA') livro[r.id] = { decisao: 'APROVA' };
      /* aprovada com o texto atual, mas com explicação/dica novas: grava também */
      if (r.p && r.o) { if (ehL) R[r.id] = Object.assign({ m: r.p, o: r.o }, r.pergunta ? { q: r.pergunta } : {}, r.d ? { d: r.d } : {});
        else R[r.id] = Object.assign({ p: r.p, o: r.o }, r.ex ? { ex: r.ex } : {}, r.dica ? { dica: r.dica } : {}); } }
  });
});
function grava(arq, nome, obj, aplica) {
  const p = path.join(DIR, arq); let s = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const bloco = '/*REVISAO-INICIO*/var ' + nome + '=' + JSON.stringify(obj) + ';/*REVISAO-FIM*/\n' + aplica + '\n';
  const re = /\/\*REVISAO-INICIO\*\/[\s\S]*?\/\*REVISAO-FIM\*\/\n[^\n]*\n/;
  if (re.test(s)) s = s.replace(re, bloco);
  else if (arq === 'HIS3_banco.js') { const k = 'function embaralha(a){'; const i = s.lastIndexOf(k); if (i < 0) throw new Error('marcador banco');
    s = s.slice(0, i) + '/* REVISÃO do avaliador de questões (_processo/CRITERIO_QUESTOES.md): null = excluída, objeto = adaptada */\n' + bloco + s.slice(i); }
  else { const k1 = "'use strict';\n", i1 = s.indexOf(k1); const k2 = '\n];\n})();', i2 = s.lastIndexOf(k2); if (i1 < 0 || i2 < 0) throw new Error('marcador lições');
    s = s.slice(0, i1 + k1.length) + '/* REVISÃO do avaliador de questões (_processo/CRITERIO_QUESTOES.md), aplicada nas telas de escolha */\n' + bloco +
      'function REVISA_L(l){ l.telas.forEach(function(t,ti){ if(t.tipo!=="escolha") return; t.itens=t.itens.map(function(it,k){ var id="L_"+l.k+"_"+ti+"_"+k, r=REVISAO_L[id]; if(r===null) return null; it=Object.assign({},it,{_id:id}); if(r){ it.m=r.m||it.m; it.c=r.o[0]; it.op=r.o.slice(); if(r.q) t.pergunta=r.q; if(r.d) it.d=r.d; } return it; }).filter(Boolean); }); return true; }\n' +
      s.slice(i1 + k1.length, i2) + '\n].filter(REVISA_L);\n})();' + s.slice(i2 + k2.length); }
  fs.writeFileSync(p, s);
}
grava('HIS3_banco.js', 'REVISAO', RB, 'ITENS=ITENS.filter(function(i){ return REVISAO[i.id]!==null; }).map(function(i){ var r=REVISAO[i.id]; return r?Object.assign({},i,{p:r.p,o:r.o,c:0},r.ex?{ex:r.ex}:{},r.dica?{dica:r.dica}:{}):i; });');
grava('HIS3_estudo_licoes.js', 'REVISAO_L', RL, '/* (aplicada em REVISA_L) */');
fs.writeFileSync(LIVRO, JSON.stringify(livro, null, 1));
console.log('aplicado:', JSON.stringify(n), '| banco revisões', Object.keys(RB).length, '| lições revisões', Object.keys(RL).length);
