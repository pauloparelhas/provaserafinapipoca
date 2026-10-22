// Gera ferramentas/HIS3_simulado_data.js (formato do OP_questao.js) a partir do
// banco único ferramentas/HIS3_banco.js. Rodar: node gen_simulado_his3.js <pasta ferramentas>
// PT puro: enunciado e alternativas em CAIXA ALTA (como a folha da prova da escola);
// dica, explicação e "a resposta é" em letra normal (voz de quem ensina).
const fs = require('fs'), path = require('path');
const DIR = process.argv[2]; global.window = {}; require(path.join(DIR, 'HIS3_banco.js'));
const I = window.HIS3;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const UP = s => esc(String(s).toLocaleUpperCase('pt-BR'));
/* rodada de 15 com o peso do roteiro v1.1: U3 ≈ 50% (fontes+escola+olhar), U4 ≈ 33%, mundo e base 1 cada */
const COTA = { fontes: 5, escola: 2, olhar: 1, mundo: 1, profissoes: 5, tempo: 1 };
const BLOCO = { fontes: 'A', escola: 'A', profissoes: 'A', olhar: 'B', mundo: 'B', tempo: 'B' };
const FAMILIAS = Object.keys(I.TEMAS).map(k => ({ k, nome: I.TEMAS[k].nome, cor: I.TEMAS[k].cor, cota: COTA[k], bloco: BLOCO[k] }));
const ITENS = I.ITENS.map(it => {
  const q = { id: it.id, eixo: it.tema, origem: I.TEMAS[it.tema].nome, tipo: it.tipo };
  if (it.img) q.quadro = '<img class="fotofonte" src="' + it.img + '" alt="foto da aula">';
  q.pede = UP(it.p);
  q.opts = it.o.map((o, i) => i === it.c ? { t: UP(o), ok: true } : { t: UP(o), no: 'A resposta é: <b>' + esc(it.o[it.c]) + '</b>' });
  q.dica = it.dica; q.dicaHtml = esc(it.dica);
  q.truque = it.ex; q.truqueHtml = esc(it.ex);
  q.porque = ''; q.visual = ''; q.proximo = '';
  return q;
});
const out = '/* HIS3_simulado_data.js — GERADO por trabalho/3tri_historia/gen/gen_simulado_his3.js a partir de HIS3_banco.js. Não editar à mão. */\nwindow.HIS3S=' + JSON.stringify({ FAMILIAS, ITENS }) + ';\n';
fs.writeFileSync(path.join(DIR, 'HIS3_simulado_data.js'), out);
console.log('itens', ITENS.length, 'familias', FAMILIAS.map(f => f.k + ':' + I.ITENS.filter(i => i.tema === f.k).length).join(' '));
