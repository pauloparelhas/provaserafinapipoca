// verifica_corrida.js — PORTÃO da corrida (reino 3): nenhum trecho impossível.
// Paulo (17/10): "tem uns ziguezagues que são impossíveis de transpor". Este script percorre a pista
// inteira com programação dinâmica: em cada passo de 8 px o kart pode desviar no máximo 60 % da
// velocidade lateral real (folga para a criança), e verifica que existe um caminho
//   (1) sem bater em cone, pedra ou óleo e sem cair da ponte  (obrigatório: senão FALHA);
//   (2) idem, também sem pisar na lama, salvo no voo da rampa (obrigatório);
//   (3) idem, sem sair do asfalto (as curvas cabem na pista; obrigatório).
// Uso: node verifica_corrida.js <pasta ferramentas>
const fs = require('fs'), path = require('path');
const DIR = process.argv[2];
global.window = { JOGO: { J: { prog: {} }, W: 960, H: 540 }, ARTE: { ING: {} } };
global.SOM = { fx() {}, musica() {} };
eval(fs.readFileSync(path.join(DIR, 'ING3_jogo_corrida.js'), 'utf8'));
const C = window.CORRIDA, K = C._K, OB = C._OB(), pista = C._pista;
const PASSO = 8, DX = 3, NX = Math.floor(960 / DX) + 1;
const hw = 17 * K.KS, hh = 30 * K.KS;
const passoLat = K.VLAT * 0.6 * PASSO / K.V0; // px por passo
const cel = Math.max(1, Math.round(passoLat / DX)); // 2 células = 6 px por passo = 60 % de VLAT
const FIM = K.S(178);
const AR = 1.9 * K.V0; // duração do voo da rampa em px (R.arDur)

function bloqueado(s, x, modo) {
  const P = pista(s);
  if (P.pz) return false; // trecho do box: o kart é guiado
  if (x < Math.max(26, P.l - 34) || x > Math.min(934, P.r + 34)) return true;
  if (P.ag && (x < P.l + 4 || x > P.r - 4)) return true;
  if (modo === 3 && (x < P.l + hw || x > P.r - hw)) return true;
  for (const o of OB) {
    if (o.s < s - 120) continue; if (o.s > s + 120) break;
    const ox = pista(o.s).c + o.off, dx = Math.abs(ox - x), ds = Math.abs(o.s - s);
    if (o.tipo === 'cone' && dx < hw + 9 && ds < hh + 9) return true;
    if (o.tipo === 'pedra' && dx < hw + o.r - 2 && ds < hh + o.r - 2) return true;
    if (o.tipo === 'oleo' && dx < hw + o.w / 2 - 10 && ds < hh + o.h / 2 - 10) return true;
    if (modo >= 2 && o.tipo === 'lama' && dx < hw + o.w / 2 - 10 && ds < hh + o.h / 2 - 10) {
      // coberta pelo voo da rampa?
      const rampa = OB.find(r => r.tipo === 'rampa' && o.s > r.s && o.s - r.s < AR + 40);
      if (!rampa) return true;
    }
  }
  return false;
}
function anda(modo) {
  let viv = new Uint8Array(NX); viv[Math.round(480 / DX)] = 1;
  let pior = null;
  for (let s = 0; s < FIM; s += PASSO) {
    const nv = new Uint8Array(NX); let algum = false;
    for (let i = 0; i < NX; i++) if (viv[i]) for (let d = -cel; d <= cel; d++) { const j = i + d; if (j < 0 || j >= NX || nv[j]) continue; if (!bloqueado(s, j * DX, modo)) { nv[j] = 1; algum = true; } }
    if (!algum) { pior = s; break; }
    // na entrada do box o kart é colocado no box: reabre a pista inteira
    if (pista(s).pz) { for (let i = 0; i < NX; i++) nv[i] = bloqueado(s, i * DX, modo) ? 0 : 1; }
    viv = nv;
  }
  return pior;
}
let falhas = 0;
[[1, 'sem bater (cones, pedras, óleo, ponte)'], [2, 'sem lama fora do voo da rampa'], [3, 'sem sair do asfalto']].forEach(([m, nome]) => {
  const p = anda(m);
  if (p === null) console.log('ok    ' + nome);
  else { falhas++; console.log('FALHA ' + nome + ' — impossível em t = ' + (p / K.V0).toFixed(1) + ' s (s = ' + p + ')'); }
});
console.log(falhas ? 'CORRIDA COM TRECHO IMPOSSÍVEL' : 'CORRIDA SEM TRECHO IMPOSSÍVEL');
process.exit(falhas ? 1 : 0);
