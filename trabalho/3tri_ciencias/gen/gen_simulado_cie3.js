// Gera ferramentas/CIE3_simulado_data.js (formato do OP_questao.js) a partir do
// banco único ferramentas/CIE3_banco.js. Rodar: node gen_simulado_cie3.js <pasta ferramentas>
// Inglês na frente, português atrás da bandeira (<span class="tr">).
const fs = require('fs'), path = require('path');
const DIR = process.argv[2]; global.window = {}; require(path.join(DIR, 'CIE3_banco.js'));
const I = window.CIE3;
if (!process.argv.includes('--sem-portao')) { const r = require('child_process').spawnSync('node', [path.join(__dirname, 'valida_questoes.js'), DIR], { encoding: 'utf8' }); if (r.status !== 0) { console.log(r.stdout); console.error('SIMULADO NAO GERADO: questoes sem aprovacao.'); process.exit(1); } }
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tr = s => s ? ' <span class="tr">' + esc(s) + '</span>' : '';
const poema = (t, tit, aut) => {
  const est = String(t).split('\n\n').map(e => e.split('\n').map(esc).join('<br>'));
  return (tit ? '<b class="ptit">' + esc(tit) + '</b>' : '') + est.map(e => '<p class="pest">' + e + '</p>').join('') + (aut ? '<i class="paut">' + esc(aut) + '</i>' : '');
};
const COTA = { position: 3, directions: 2, perspective: 1, forces: 2, objects: 2, animals: 1, pushpull: 3 };
const FAMILIAS = Object.keys(I.TEMAS).map(k => ({ k, nome: I.TEMAS[k].nome, cor: I.TEMAS[k].cor, cota: COTA[k], bloco: (k === 'position' || k === 'objects' || k === 'pushpull') ? 'A' : 'B' }));
const ITENS = I.ITENS.map(it => {
  const q = { id: it.id, eixo: it.tema, origem: I.TEMAS[it.tema].nome, tipo: it.tipo };
  if (it.img) { q.quadro = '<img class="fotofonte" src="' + it.img + '" alt="">'; q.semSoPergunta = true; }
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
const out = '/* CIE3_simulado_data.js — GERADO por trabalho/3tri_ciencias/gen/gen_simulado_cie3.js a partir de CIE3_banco.js. Não editar à mão. */\nwindow.CIE3S=' + JSON.stringify({ FAMILIAS, ITENS }) + ';\n';
fs.writeFileSync(path.join(DIR, 'CIE3_simulado_data.js'), out);
console.log('itens', ITENS.length, 'familias', FAMILIAS.map(f => f.k + ':' + I.ITENS.filter(i => i.tema === f.k).length).join(' '));
