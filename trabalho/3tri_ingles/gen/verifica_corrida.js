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
// 18/10: o voo da rampa é por DISTÂNCIA (K.pouso): cobre o último obstáculo + 20% do vão

function bloqueado(s, x, modo) {
  const P = pista(s);
  if (P.pz) return false; // trecho do box: o kart é guiado
  if (x < Math.max(26, P.l - 34) || x > Math.min(934, P.r + 34)) return true;
  if (P.ag && (x < P.l + 4 || x > P.r - 4)) return true;
  if (modo === 3 && (x < P.l + hw + 10 || x > P.r - hw - 10)) return true; // 18/10: com 10 px de margem
  for (const o of OB) {
    if (o.s < s - 120) continue; if (o.s > s + 120) break;
    const ox = pista(o.s).c + o.off, dx = Math.abs(ox - x), ds = Math.abs(o.s - s);
    if (o.tipo === 'cone' && dx < hw + 9 && ds < hh + 9) return true;
    if (o.tipo === 'pedra' && dx < hw + o.r - 2 && ds < hh + o.r - 2) return true;
    if (o.tipo === 'oleo' && dx < hw + o.w / 2 - 10 && ds < hh + o.h / 2 - 10) return true;
    if (modo >= 2 && o.tipo === 'lama' && dx < hw + o.w / 2 - 10 && ds < hh + o.h / 2 - 10) {
      // coberta pelo voo da rampa?
      const rampa = OB.find(r => r.tipo === 'rampa' && o.s > r.s && o.s + o.h / 2 + 18 < K.pouso(r) - 50);
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
// 18/10 (revisão): checagens que o DP sozinho deixava passar
const Tf = K.S(K.T_FIM);
// (4) fileiras seguidas de cones/pedras: |Δx| <= 0,45·VLAT·(Δt-0,6) + 2·folga
const filas = []; OB.forEach(o => { if (o.gap === undefined) return; const f = filas[filas.length - 1]; if (f && Math.abs(f.s - o.s) < 1) return; filas.push({ s: o.s, gap: o.gap, tipo: o.tipo }); });
for (let i = 1; i < filas.length; i++) { const a = filas[i - 1], b = filas[i], dt = (b.s - a.s) / K.V0; if (dt > 3) continue;
  const tol = (a.tipo === 'cone' ? 58 - 9 : 72 - 15) - hw, dx = Math.abs((pista(b.s).c + b.gap) - (pista(a.s).c + a.gap)), lim = 0.45 * K.VLAT * (dt - 0.6) + 2 * tol;
  if (dx > lim) { falhas++; console.log('FALHA fileira em t=' + (b.s / K.V0).toFixed(1) + ': precisa ' + dx.toFixed(0) + ' px, alcançável ' + lim.toFixed(0)); } }
console.log('ok    ' + filas.length + ' fileiras checadas pela fórmula');
// (5) curvas exigem direção: kart parado no meio sai do asfalto em >= 4 trechos; e nenhuma curva pede mais que 0,6·VLAT
let trechos = 0, fora = false, maxv = 0;
for (let s = 0; s < Tf; s += 8) { const P = pista(s); const out = !P.pz && !P.ag && (480 < P.l + hw || 480 > P.r - hw); if (out && !fora) trechos++; fora = out; if (s > 0) maxv = Math.max(maxv, Math.abs(P.c - pista(s - 8).c) / (8 / K.V0)); }
if (trechos < 4) { falhas++; console.log('FALHA curvas fracas: kart sem virar sai do asfalto só em ' + trechos + ' trechos'); } else console.log('ok    curvas pedem direção (' + trechos + ' trechos)');
if (maxv > 0.6 * K.VLAT) { falhas++; console.log('FALHA curva rápida demais: ' + maxv.toFixed(0) + ' px/s'); } else console.log('ok    curva mais rápida pede ' + (maxv / K.VLAT * 100).toFixed(0) + '% da velocidade lateral');
// (6) kart pequeno
if (34 * K.KS > 30 || 34 * K.KS > 0.1 * K.LARG + 0.5) { falhas++; console.log('FALHA kart grande: ' + (34 * K.KS).toFixed(1) + ' px'); } else console.log('ok    kart de ' + (34 * K.KS).toFixed(1) + ' px numa pista de ' + K.LARG);
// (7) rampa: largura e pouso
OB.filter(o => o.tipo === 'rampa').forEach(r => { const fim = Math.max(...OB.filter(q => q !== r && q.s > r.s && q.s < r.s + 900 && q.tipo === 'lama').map(q => q.s + q.h / 2)); const pz = K.pouso(r);
  if (r.w < K.LARG - 40 || pz < fim + 60) { falhas++; console.log('FALHA rampa em t=' + (r.s / K.V0).toFixed(1)); } else console.log('ok    rampa cobre a lama com ' + (pz - fim).toFixed(0) + ' px de folga'); });
[[1, 'sem bater (cones, pedras, óleo, ponte)'], [2, 'sem lama fora do voo da rampa'], [3, 'sem sair do asfalto']].forEach(([m, nome]) => {
  const p = anda(m);
  if (p === null) console.log('ok    ' + nome);
  else { falhas++; console.log('FALHA ' + nome + ' — impossível em t = ' + (p / K.V0).toFixed(1) + ' s (s = ' + p + ')'); }
});
console.log(falhas ? 'CORRIDA COM TRECHO IMPOSSÍVEL' : 'CORRIDA SEM TRECHO IMPOSSÍVEL');
process.exit(falhas ? 1 : 0);
