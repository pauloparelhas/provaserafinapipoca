// verifica_corrida.js — PORTÃO da corrida v3 (reino 3, "The Soapbox Rally").
// 18/10 (Paulo: "o percurso só vai pra cima, não tem evolução… nada pode ser impossível"). Confere a PISTA
// construída por ING3_jogo_corrida.js (sem abrir o navegador):
//   (1) nenhum trecho encosta noutro (a pista não se cruza nem se sobrepõe);
//   (2) raio mínimo >= 160 px e meia-largura >= 70 (ponte) / 100 (resto);
//   (3) variedade: >= 2 grampos, >= 2 chicanes, >= 2 saltos, 3 pits, >= 4 curvas para cada lado, ponte, pântano;
//   (4) a rampa leva o carrinho até depois do riacho mesmo chegando devagar (voo por distância);
//   (5) moedas: <= 70, todas na linha ideal (<= 30 px);
//   (6) o carrinho cabe: kart (48x28) <= 15% da largura da pista.
// Uso: node verifica_corrida.js <pasta ferramentas>
const fs = require('fs'), path = require('path');
const DIR = process.argv[2];
global.window = { JOGO: { J: { prog: {} }, W: 960, H: 540 }, ARTE: { ING: {}, rr() {} }, CARRINHOS: { LISTA: {}, desenha() {} } };
global.SOM = { fx() {}, musica() {} };
eval(fs.readFileSync(path.join(DIR, 'ING3_jogo_corrida.js'), 'utf8'));
const K = window.CORRIDA._K, T = K.TRK(), O = K.OBJ();
let falhas = 0; const ok = (c, msg) => { if (c) console.log('ok    ' + msg); else { falhas++; console.log('FALHA ' + msg); } };
// (1) sobreposição
let pior = 1e9, onde = null;
for (let i = 0; i < T.n; i += 4) for (let j = i + 140; j < T.n; j += 4) { const d = Math.hypot(T.x[i] - T.x[j], T.y[i] - T.y[j]) - T.hw[i] - T.hw[j]; if (d < pior) { pior = d; onde = [T.s[i], T.s[j]]; } }
ok(pior > 40, 'trechos separados (menor folga ' + Math.round(pior) + ' px entre s=' + onde.map(Math.round).join(' e ') + ')');
// (2) raio e largura
let kmax = 0, hwmin = 1e9, hwmin2 = 1e9; for (let i = 0; i < T.n; i++) { kmax = Math.max(kmax, Math.abs(T.k[i])); if (T.tag[i].ponte) hwmin = Math.min(hwmin, T.hw[i]); else hwmin2 = Math.min(hwmin2, T.hw[i]); }
ok(1 / kmax >= 160, 'raio mínimo ' + Math.round(1 / kmax) + ' px');
ok(hwmin >= 70 && hwmin2 >= 70, 'meia-largura mínima: ponte ' + hwmin + ', resto ' + Math.round(hwmin2));
// (3) variedade
const tr = K.TRECHOS, tg = x => x[x.length - 1];
const grampos = new Set(), chicanes = new Set(); let esq = 0, dir = 0;
tr.forEach((x, i) => { if (x[0] === 'arco') { if (x[1] < 0) esq++; else dir++; } if (tg(x).grampo) grampos.add(i); });
let nChic = 0; for (let i = 0; i < tr.length; i++) if (tg(tr[i]).chicane && !(i > 0 && tg(tr[i - 1]).chicane)) nChic++;
ok(grampos.size >= 2, grampos.size + ' grampos'); ok(nChic >= 2, nChic + ' chicanes'); ok(esq >= 4 && dir >= 4, esq + ' curvas à esquerda e ' + dir + ' à direita');
ok(K.RAMPAS().length >= 2 && K.RIACHOS().length >= 2, K.RAMPAS().length + ' saltos'); ok(K.PIT_S().filter(Boolean).length === 3, '3 pit stops');
ok(tr.some(x => tg(x).ponte) && tr.some(x => tg(x).lama), 'ponte e pântano');
// (4) rampa: voo = (fim do riacho - decolagem + 60) / v; chegando a 200 px/s cobre o riacho
K.RAMPAS().forEach((rp, k) => { const rc = K.RIACHOS().filter(r => r.s0 >= rp.s1 - 4)[0]; const pouso = rp.s + (rc.s1 - rp.s + 60); ok(pouso > rc.s1 + 40, 'rampa ' + (k + 1) + ': pousa ' + Math.round(pouso - rc.s1) + ' px depois do riacho'); });
// (5) moedas
const longe = O.moedas.filter(m => { const i = Math.round(m.s / K.PASSO); return Math.abs(m.d - T.linha[i]) > 30; });
ok(O.moedas.length <= 70 && longe.length === 0, O.moedas.length + ' moedas, todas na linha ideal');
// (6) tamanho do carrinho
const hwTip = Math.max(...Array.from(T.hw)); ok(28 / (2 * hwTip) <= .15, 'carrinho = ' + Math.round(28 / (2 * hwTip) * 100) + '% da largura da pista (fora da ponte)');
console.log('pista: ' + Math.round(T.L) + ' px, ' + tr.length + ' trechos');
console.log(falhas ? 'CORRIDA REPROVADA' : 'CORRIDA APROVADA');
process.exit(falhas ? 1 : 0);
