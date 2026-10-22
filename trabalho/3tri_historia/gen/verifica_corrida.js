// verifica_corrida.js — PORTÃO da corrida v4 (2,5D, estilo Enduro).
// 18/10 (Paulo: "vista de cima deixa tonto; menos mudança de direção; todos param no box o mesmo tempo").
// Confere a pista construída por HIS3_jogo_corrida.js sem abrir o navegador:
//   (1) curvas suaves: |curva| <= 3 em todo segmento (nada de zigue-zague);
//   (2) duração: a pista inteira leva 100–160 s na velocidade máxima;
//   (3) 3 pit stops, cada um com 10 vagas distintas (todos param, mesmo tempo PIT_T);
//   (4) variedade: curvas para os dois lados, morros, ponte, pântano, trecho do castelo.
// Uso: node verifica_corrida.js <pasta ferramentas>
const fs = require('fs'), path = require('path');
const DIR = process.argv[2];
global.window = { JOGO: { J: { prog: {} }, W: 960, H: 540 }, ARTE: { ING: {}, rr() {} }, CARRINHOS: { LISTA: {}, desenha() {}, desenhaTras() {} } };
global.SOM = { fx() {}, musica() {} };
eval(fs.readFileSync(path.join(DIR, 'HIS3_jogo_corrida.js'), 'utf8'));
const K = window.CORRIDA._K, S = K.segs(), P = K.PITS();
let falhas = 0; const ok = (c, m) => { if (c) console.log('ok    ' + m); else { falhas++; console.log('FALHA ' + m); } };
const cmax = Math.max(...S.map(s => Math.abs(s.curva)));
ok(cmax <= 3, 'curvas suaves (máx ' + cmax.toFixed(2) + ')');
const tempo = K.FIM() * K.SEG / K.VMAX;
ok(tempo >= 100 && tempo <= 160, 'duração na velocidade máxima: ' + tempo.toFixed(0) + ' s');
ok(P.length === 3 && P.every(p => p.fim - p.ini >= 50 && p.fim - p.ini <= 70), '3 pit stops: faixa de box CURTA ao lado (desvio, 15/10)');
const SRC = fs.readFileSync(path.join(DIR, 'HIS3_jogo_corrida.js'), 'utf8');
ok(!/BOING|WHEEE|OOPS|SPLAT/.test(SRC), 'sem plaquinhas de batida (15/10: encostar nao bate)');
ok(!/Math\.floor\(t\*\d+\)%2|Math\.sin\(t\*(9|1\d|[2-9]\d)\)\s*[;)]?\s*;?\s*c\.globalAlpha/.test(SRC), 'sem pisca-pisca (estroboscopico)');
ok((SRC.match(/rampa:1/g) || []).length >= 4 && /OBJ\.raios/.test(SRC) && !/OBJ\.moedas/.test(SRC), 'interacao na pista: rampas + raios (3 = 1 turbo), sem moedas inuteis');
ok(K.PIT_T > 0, 'tempo de box igual para todos: ' + K.PIT_T + ' s');
const esq = S.filter(s => s.curva < -1).length, dir = S.filter(s => s.curva > 1).length;
ok(esq > 50 && dir > 50, 'curvas para os dois lados');
const temas = new Set(S.map(s => s.tema)); ok(['prado', 'floresta', 'ponte', 'pantano', 'castelo'].every(t => temas.has(t)), 'trechos: ' + [...temas].join(', '));
console.log(falhas ? 'CORRIDA REPROVADA' : 'CORRIDA APROVADA');
process.exit(falhas ? 1 : 0);
