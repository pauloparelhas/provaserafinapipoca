/* extrai_escolhas.js — normaliza TODA escolha entre alternativas de TODOS os
   produtos de uma matéria num único JSON, para poder auditar item a item.

   "Escolha entre alternativas" = qualquer coisa em que a criança aponta uma
   opção e o produto diz certo/errado:
     · MC e multi (aventura, simulado, quiz do NLM)
     · V/F (simulado)
     · completar com banco de palavras (simulado)
     · ligar item→categoria (simulado)
     · classificar carta→coluna (Sort it!, Pop it!, sort da aventura)

   Saída: trabalho/<materia>/_escolhas.json
     [{id, produto, tipo, enunciado, correta[], distratores[], categorias[]}]

   Uso: node _processo/geracao/extrai_escolhas.js
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.resolve(__dirname, '..', '..');
const FER = path.join(RAIZ, 'ferramentas');
const OUT = path.join(RAIZ, 'trabalho', '2tri_geografia', '_escolhas.json');

const itens = [];
let n = 0;
const add = o => itens.push(Object.assign({ id: 'E' + (++n).toString().padStart(3, '0') }, o));
const limpa = s => String(s == null ? '' : s).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

/* ---------- helpers ---------- */
function inline(file, marca) {
  const html = fs.readFileSync(path.join(FER, file), 'utf8');
  const blocos = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  return blocos.find(b => b.includes(marca));
}
function roda(src, exporta) {
  const ctx = {
    console, window: {}, document: { getElementById: () => null, querySelectorAll: () => [] },
    SERA_ADV: { boot: () => {} }, say: () => {}, requestAnimationFrame: () => {}, localStorage: null,
    fetch: () => Promise.reject(), Promise, setTimeout: () => {}, addEventListener: () => {}
  };
  vm.createContext(ctx);
  vm.runInContext(src + '\n;this.__X={' + exporta + '};', ctx);
  return ctx.__X;
}

/* ---------- 1. GAMES (Sort it! + Pop it!) ---------- */
{
  const src = fs.readFileSync(path.join(FER, 'GEO2_data.js'), 'utf8');
  const { GAMES } = roda(src, 'GAMES');
  GAMES.forEach(g => {
    const cats = g.cols.map(c => limpa(c.en));
    g.cards.forEach(c => {
      const certa = g.cols.find(x => x.id === c.col);
      add({
        produto: 'Sort it! / Pop it!',
        origem: `GEO2_data.js · jogo "${g.key}"`,
        tipo: 'classificar',
        enunciado: `${limpa(g.en)} — onde entra "${limpa(c.en)}"?`,
        alvo: limpa(c.en),
        correta: [limpa(certa && certa.en)],
        distratores: cats.filter(x => x !== limpa(certa && certa.en)),
        categorias: cats
      });
    });
  });
}

/* ---------- 2. ADVENTURE ---------- */
{
  const src = inline('GEO2_aventura.html', 'var ADVENTURE=');
  const { ADVENTURE } = roda(src, 'ADVENTURE');
  ADVENTURE.phases.forEach(p => {
    (p.bank || []).forEach(it => {
      if (it.t === 'mc' || it.t === 'multi') {
        add({
          produto: 'Expedição Brasil',
          origem: `GEO2_aventura.html · fase ${p.id}`,
          tipo: it.t === 'multi' ? 'multipla' : 'mc',
          enunciado: limpa(it.q),
          correta: it.opts.filter(o => o.ok).map(o => limpa(o.en)),
          distratores: it.opts.filter(o => !o.ok).map(o => limpa(o.en)),
          categorias: it.opts.map(o => limpa(o.en))
        });
      } else if (it.t === 'sort') {
        const cats = it.buckets.map(b => limpa(b.en));
        it.items.forEach(x => {
          const certa = it.buckets.find(b => b.id === x.b);
          add({
            produto: 'Expedição Brasil',
            origem: `GEO2_aventura.html · fase ${p.id} (sort)`,
            tipo: 'classificar',
            enunciado: `${limpa(it.q)} — onde entra "${limpa(x.en)}"?`,
            alvo: limpa(x.en),
            correta: [limpa(certa && certa.en)],
            distratores: cats.filter(c => c !== limpa(certa && certa.en)),
            categorias: cats
          });
        });
      }
    });
  });
}

/* ---------- 3. SIMULADO ---------- */
{
  const src = inline('GEO2_simulado.html', 'const MC =');
  const B = roda(src.split('/* ================= ENGINE')[0], 'MC,VF,FILL,MATCH,ORDER');
  B.MC.forEach(q => add({
    produto: 'Simulado', origem: `GEO2_simulado.html · MC (${q.th})`, tipo: 'mc',
    enunciado: limpa(q.en),
    correta: q.opts.filter(o => o[1] === 1).map(o => limpa(o[0])),
    distratores: q.opts.filter(o => o[1] !== 1).map(o => limpa(o[0])),
    categorias: q.opts.map(o => limpa(o[0]))
  }));
  B.VF.forEach(q => add({
    produto: 'Simulado', origem: `GEO2_simulado.html · V/F (${q.th})`, tipo: 'vf',
    enunciado: limpa(q.en),
    correta: [q.ans ? 'Verdadeiro' : 'Falso'],
    distratores: [q.ans ? 'Falso' : 'Verdadeiro'],
    categorias: ['Verdadeiro', 'Falso']
  }));
  B.FILL.forEach(q => add({
    produto: 'Simulado', origem: `GEO2_simulado.html · completar (${q.th})`, tipo: 'completar',
    enunciado: `${limpa(q.pre)} _____ ${limpa(q.post)}`,
    correta: [limpa(q.ans)],
    distratores: (q.bank || []).map(limpa),
    categorias: [limpa(q.ans)].concat((q.bank || []).map(limpa))
  }));
  B.MATCH.forEach(q => {
    const cats = q.cats.map(c => limpa(c[0]));
    q.items.forEach(x => add({
      produto: 'Simulado', origem: `GEO2_simulado.html · ligar (${q.th})`, tipo: 'classificar',
      enunciado: `${limpa(q.t)} — onde entra "${limpa(x[0])}"?`,
      alvo: limpa(x[0]),
      correta: [cats[x[2]]],
      distratores: cats.filter((_, i) => i !== x[2]),
      categorias: cats
    }));
  });
}

/* ---------- 4. QUIZ DO NOTEBOOKLM ---------- */
{
  const j = JSON.parse(fs.readFileSync(path.join(FER, 'media', 'quiz_geo2_nlm.json'), 'utf8'));
  j.questions.forEach(q => add({
    produto: 'Quiz explicado (NLM)', origem: 'media/quiz_geo2_nlm.json', tipo: 'mc',
    enunciado: limpa(q.question),
    correta: q.answerOptions.filter(o => o.isCorrect).map(o => limpa(o.text)),
    distratores: q.answerOptions.filter(o => !o.isCorrect).map(o => limpa(o.text)),
    categorias: q.answerOptions.map(o => limpa(o.text))
  }));
}

fs.writeFileSync(OUT, JSON.stringify(itens, null, 2), 'utf8');

const porProduto = {}, porTipo = {};
itens.forEach(i => { porProduto[i.produto] = (porProduto[i.produto] || 0) + 1; porTipo[i.tipo] = (porTipo[i.tipo] || 0) + 1; });
console.log(`escolhas extraidas: ${itens.length}  ->  ${path.relative(RAIZ, OUT)}\n`);
console.log('por produto:'); Object.entries(porProduto).forEach(([k, v]) => console.log(`   ${String(v).padStart(4)}  ${k}`));
console.log('por tipo:');    Object.entries(porTipo).forEach(([k, v]) => console.log(`   ${String(v).padStart(4)}  ${k}`));
