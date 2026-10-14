// Gera ferramentas/ING3_simulado_data.js (formato do OP_questao.js) a partir do
// banco único ferramentas/ING3_banco.js. Rodar: node gen_simulado.js <pasta ferramentas>
// Inglês na frente, português atrás da bandeira (<span class="tr">).
const fs = require('fs'), path = require('path');
const DIR = process.argv[2]; global.window = {}; require(path.join(DIR, 'ING3_banco.js'));
const I = window.ING3;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tr = s => s ? ' <span class="tr">' + esc(s) + '</span>' : '';
const poema = (t, tit, aut) => {
  const est = String(t).split('\n\n').map(e => e.split('\n').map(esc).join('<br>'));
  return (tit ? '<b class="ptit">' + esc(tit) + '</b>' : '') + est.map(e => '<p class="pest">' + e + '</p>').join('') + (aut ? '<i class="paut">' + esc(aut) + '</i>' : '');
};
const COTA = { fairy: 3, realmb: 2, circle: 2, cause: 2, poem: 3 };
const FAMILIAS = Object.keys(I.TEMAS).map(k => ({ k, nome: I.TEMAS[k].nome, cor: I.TEMAS[k].cor, cota: COTA[k], bloco: (k === 'fairy' || k === 'poem' || k === 'cause') ? 'A' : 'B' }));
const ITENS = I.ITENS.map(it => {
  const q = { id: it.id, eixo: it.tema, origem: I.TEMAS[it.tema].nome, tipo: it.tipo };
  if (it.texto) {
    q.quadro = (it.titulo || it.autor)
      ? poema(it.texto, it.titulo, it.autor) + '<div class="tr">' + poema(it.texto_pt || '', it.titulo_pt, '') + '</div>'
      : '<p class="pest">' + esc(it.texto).replace(/\n/g, '<br>') + '</p>' + (it.texto_pt ? '<div class="tr">' + esc(it.texto_pt).replace(/\n/g, '<br>') + '</div>' : '');
  }
  q.pede = esc(it.p) + tr(it.p_pt);
  q.opts = it.o.map((o, i) => i === it.c ? { t: esc(o) + tr(it.o_pt[i]), ok: true } : { t: esc(o) + tr(it.o_pt[i]), no: 'The answer is: <b>' + esc(it.o[it.c]) + '</b>' + tr('A resposta é: ' + (it.o_pt[it.c] || it.o[it.c])) });
  q.dica = it.dica_en || it.dica;
  q.dicaHtml = esc(it.dica_en || it.dica) + (it.dica_en ? tr(it.dica) : '');
  q.truque = it.ex;
  q.truqueHtml = esc(it.ex) + tr(it.ex_pt);
  q.porque = '';
  q.visual = ''; q.proximo = '';
  return q;
});
const out = '/* ING3_simulado_data.js — GERADO por trabalho/3tri_ingles/gen/gen_simulado.js a partir de ING3_banco.js. Não editar à mão. */\nwindow.ING3S=' + JSON.stringify({ FAMILIAS, ITENS }) + ';\n';
fs.writeFileSync(path.join(DIR, 'ING3_simulado_data.js'), out);
console.log('itens', ITENS.length, 'familias', FAMILIAS.map(f => f.k + ':' + I.ITENS.filter(i => i.tema === f.k).length).join(' '));
