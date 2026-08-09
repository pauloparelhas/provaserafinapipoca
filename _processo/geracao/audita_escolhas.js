/* audita_escolhas.js — GATE de legitimidade de toda escolha entre alternativas.
   =========================================================================
   REGRA (definida pelo Paulo em 09/08/2026):
     Toda vez que um produto pede para a criança ESCOLHER entre alternativas,
     (a) a alternativa correta tem de estar SUPORTADA pelo material, e
     (b) tem de ser INEQUÍVOCO que cada uma das outras está errada e jamais
         poderia ser a resposta.
   Item que falha em (b) simula um conhecimento que a prova não cobraria e
   ensina a criança a errar. É defeito, não "questão difícil".

   Esta é a camada DETERMINÍSTICA (grátis, roda sempre). Ela não julga
   semântica — ela pega as três formas estruturais de o item ser ilegítimo:

     R1 FUSÃO      — o item opõe duas categorias que o material define na
                     MESMA frase (ver `fusoes_proibidas`). A frase é que funde
                     os conceitos; a criança que escolhe "a outra" tem razão.
     R2 SEM LASTRO — o alvo do item não aparece em lugar nenhum do material.
                     Conteúdo inventado, ainda que plausível.
     R3 DOIS DONOS — o alvo pertence a MAIS DE UMA das categorias oferecidas
                     (ex.: "frevo" é dança E música; "festa da uva" é SE e S).
                     Dois gabaritos certos.

   O julgamento fino ("é inequívoco?") fica para a camada Opus/Fable, que lê
   este relatório e as evidências. Ver `_AUDITORIA_ESCOLHAS.md`.

   Uso: node _processo/geracao/audita_escolhas.js [--so-falhas]
*/
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const TRAB = path.join(RAIZ, 'trabalho', '2tri_geografia');
const itens = JSON.parse(fs.readFileSync(path.join(TRAB, '_escolhas.json'), 'utf8'));
const EV = JSON.parse(fs.readFileSync(path.join(TRAB, '_evidencias.json'), 'utf8'));
const soFalhas = process.argv.includes('--so-falhas');

/* ---------- normalização ---------- */
const norm = s => String(s || '')
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '')
  .replace(/[^a-z0-9\s-]/g, ' ')
  .replace(/\s+/g, ' ').trim();

/* corpus de tudo que o material diz (para R2) */
const CORPUS = norm([
  JSON.stringify(EV.definicoes), JSON.stringify(EV.regioes),
  JSON.stringify(EV.tradicoes_costumes), JSON.stringify(EV.atividades),
  JSON.stringify(EV.fusoes_proibidas),
  fs.readFileSync(path.join(TRAB, '_roteiro.md'), 'utf8')
].join(' '));

/* índice termo -> categorias donas (para R3) */
const DONOS = {};
function dono(termo, categoria) {
  const k = norm(termo);
  if (!k) return;
  (DONOS[k] = DONOS[k] || new Set()).add(categoria);
}
Object.entries(EV.regioes).forEach(([reg, o]) => {
  if (reg.startsWith('_')) return;
  Object.entries(o).forEach(([tipo, lista]) => lista.forEach(t => dono(t, reg)));
});
EV.tradicoes_costumes.forEach(t => { if (t.regiao) dono(t.nome, t.regiao); });

/* fusões proibidas: par de categorias -> motivo */
const FUS = EV.fusoes_proibidas.map(f => ({
  set: new Set(f.categorias.map(norm)), f
}));

/* frases que pertencem EXCLUSIVAMENTE a uma categoria (definições do glossário).
   É o que salva um item de fusão: se o alvo está na lista `exclusivo` da
   categoria correta, ele NÃO pode ser lido como a outra — mesmo que as duas
   categorias apareçam juntas no material. Sem isso a regra R1 é cega e
   reprova até "passa de pais para filhos", que é inequívoco. */
const EXCLUSIVO = {};
EV.definicoes.forEach(d => { EXCLUSIVO[norm(d.categoria)] = (d.exclusivo || []).map(norm); });
function exclusivoDe(catCorreta, alvo) {
  const a = norm(alvo);
  if (!a) return false;
  const lista = Object.entries(EXCLUSIVO)
    .filter(([cat]) => norm(catCorreta).includes(cat) || cat.includes(norm(catCorreta)))
    .flatMap(([, v]) => v);
  return lista.some(frase => a.includes(frase) || frase.includes(a));
}

/* palavras que sozinhas não provam nada (evita falso positivo em R2) */
const VAZIAS = new Set(['verdadeiro', 'falso', 'norte', 'nordeste', 'centro-oeste', 'centro oeste', 'sudeste', 'sul']);

const falhas = [];
function reprova(it, regra, detalhe) {
  falhas.push({ id: it.id, regra, produto: it.produto, origem: it.origem, enunciado: it.enunciado, detalhe });
}

itens.forEach(it => {
  const cats = (it.categorias || []).map(norm).filter(Boolean);

  /* R1 — o item opõe categorias que o material funde na mesma frase.
     SALVA-CONDUTO: se o alvo do item for uma frase EXCLUSIVA da categoria
     correta (lista `exclusivo` do glossário), o item é inequívoco e passa —
     "passa de pais para filhos" só pode ser tradição, ainda que tradição e
     migração apareçam juntas no texto. Reprova só quando o alvo vem da
     PRÓPRIA frase fundida, que é onde a criança pode defender a outra. */
  FUS.forEach(({ set, f }) => {
    const presentes = cats.filter(c => [...set].some(s => c.includes(s) || s.includes(c)));
    const distintas = new Set(presentes.map(p => [...set].find(s => p.includes(s) || s.includes(p))));
    if (distintas.size < 2) return;
    const salvo = it.alvo
      ? it.correta.some(c => exclusivoDe(c, it.alvo))
      : it.correta.some(c => exclusivoDe(c, it.enunciado));
    if (!salvo) {
      reprova(it, 'R1-FUSAO',
        `opõe [${f.categorias.join(' × ')}] e o alvo "${it.alvo || it.enunciado}" NÃO é frase exclusiva de "${it.correta.join('/')}" — vem da frase que funde os dois (${f.id}). A criança que marcar a outra tem argumento.`);
    }
  });

  /* R2 — o alvo do item não existe no material */
  if (it.alvo) {
    const a = norm(it.alvo);
    if (a && !VAZIAS.has(a) && !CORPUS.includes(a)) {
      /* tenta por palavras significativas antes de reprovar */
      const toks = a.split(' ').filter(w => w.length > 3);
      const achou = toks.length && toks.every(w => CORPUS.includes(w));
      if (!achou) reprova(it, 'R2-SEM-LASTRO', `"${it.alvo}" não aparece no material — conteúdo inventado`);
    }
  }

  /* R3 — o alvo pertence a mais de uma categoria OFERECIDA no próprio item */
  if (it.alvo) {
    const donos = DONOS[norm(it.alvo)];
    if (donos && donos.size > 1) {
      const oferecidas = [...donos].filter(d => cats.some(c => c.includes(norm(d)) || norm(d).includes(c)));
      if (oferecidas.length > 1) {
        reprova(it, 'R3-DOIS-DONOS',
          `"${it.alvo}" pertence a ${oferecidas.join(' E ')} no material — as duas estão entre as alternativas, então há dois gabaritos certos`);
      }
    }
  }

  /* R3b — a mesma alternativa aparece duas vezes (gabarito duplicado por texto) */
  const vistos = new Set();
  cats.forEach(c => { if (vistos.has(c)) reprova(it, 'R3b-ALT-REPETIDA', `alternativa "${c}" aparece duas vezes`); vistos.add(c); });

  /* R4 — MC sem exatamente uma correta */
  if (it.tipo === 'mc' && it.correta.length !== 1) {
    reprova(it, 'R4-GABARITO', `MC com ${it.correta.length} corretas`);
  }

  /* R5 — COBRABILIDADE: o item treina algo que a prova nunca pediria?
     Regra do Paulo (09/08): treinar o que nao cai cria frustracao e sugere
     incapacidade — a crianca erra uma coisa que jamais seria cobrada. */
  const texto = norm([it.enunciado, it.alvo, (it.categorias || []).join(' ')].join(' '));
  const marca = (EV.escopo_cobravel.marcadores_fora || []).find(m => texto.includes(norm(m)));
  if (marca) {
    reprova(it, 'R5-NAO-COBRAVEL',
      `fala de "${marca}" — é metodologia da aula, não conteúdo de Geografia. A prova não pergunta o enunciado da atividade que a própria criança fez.`);
  }
});

/* ---------- relatório ---------- */
const porRegra = {};
falhas.forEach(f => (porRegra[f.regra] = porRegra[f.regra] || []).push(f));

console.log(`\n=== AUDITORIA DE ESCOLHAS — ${itens.length} itens em 4 produtos ===\n`);
if (!falhas.length) {
  console.log('PASSOU — nenhuma falha estrutural.\n');
} else {
  Object.entries(porRegra).forEach(([regra, lista]) => {
    console.log(`── ${regra} — ${lista.length} item(ns)`);
    lista.forEach(f => {
      console.log(`   ${f.id} [${f.produto}] ${f.enunciado.slice(0, 92)}`);
      if (!soFalhas) console.log(`        ${f.detalhe.slice(0, 190)}`);
    });
    console.log();
  });
  console.log(`REPROVADOS: ${new Set(falhas.map(f => f.id)).size} de ${itens.length} itens\n`);
}

fs.writeFileSync(path.join(TRAB, '_auditoria_escolhas.json'),
  JSON.stringify({ total: itens.length, reprovados: [...new Set(falhas.map(f => f.id))].length, falhas }, null, 2), 'utf8');

process.exit(falhas.length ? 1 : 0);
