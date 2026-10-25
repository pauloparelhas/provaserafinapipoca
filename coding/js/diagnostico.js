/* ============================================================
   diagnostico.js — o "olho de quem testa" do editor de fases.
   FAB.alcance(fase): por onde o herói consegue ir (busca na grade,
     generosa de propósito: só acusa o que não tem jeito). Conta andar,
     cair, pulo (~3 casinhas para cima, ~5 para o lado), mola, cipó,
     escada, água, cano em par, pena, cavalo, cogumelo do pulo, luva,
     cogumelo pequenino (portinha) e chave (porta).
   FAB.caminhoFase(fase): o caminho provável do começo até a bandeira
     (o "Ver a fase" segue este caminho).
   FAB.diagnostico(fase): lista de problemas graves
     {tipo, grupo, i, j, curto}  grupo: 'trava' | 'inutil' | 'excesso'.
     Texto de 2 a 4 palavras. Sem falso alarme nos jogos-modelo.
   Mesma lógica do portão _engenharia/gate/valida_banco.js (alcanca),
   com folga maior no pulo (o portão é mais rígido, o aviso não pode
   acusar à toa).
   ============================================================ */
(function () {
'use strict';
var FAB = window.FAB = window.FAB || {};

/* o que a criança lê no selo (e ouve no "ver") */
var CURTO = /* falado */ {
  chegar: 'Não dá para chegar', buraco: 'Buraco largo demais', parede: 'Parede alta demais', alto: 'Alto demais',
  porta: 'Porta sem chave', passar: 'Não dá para passar', cai: 'O herói cai',
  semComeco: 'Falta o começo', doisComecos: 'Dois começos', semBandeira: 'Falta a bandeira',
  moedaPresa: 'Moeda presa', pecaPresa: 'Peça presa', inimigoPreso: 'Inimigo preso', longe: 'Não dá para pegar',
  muito: 'Muita coisa aqui', inimigos: 'Muito inimigo junto'
};
var GRUPO = { chegar: 'trava', buraco: 'trava', parede: 'trava', alto: 'trava', porta: 'trava', passar: 'trava', cai: 'trava',
  semComeco: 'trava', doisComecos: 'trava', semBandeira: 'trava',
  moedaPresa: 'inutil', pecaPresa: 'inutil', inimigoPreso: 'inutil', longe: 'inutil', muito: 'excesso', inimigos: 'excesso' };
FAB.DIAG_CURTO = CURTO;

/* limites do "excesso" (medidos nos jogos-modelo e recheios: o mais cheio deles fica bem abaixo) */
var JAN = 20, JAN_ALTA = 12, LIM_COISAS = 14, JAN_INI = 10, LIM_INI = 4;

function letras() { var T = {}; Object.keys(FAB.TIPOS).forEach(function (t) { T[FAB.TIPOS[t].letra] = t; }); return T; }

/* fila de prioridade pequena (caminho mais barato) */
function Heap() { this.a = []; }
Heap.prototype.push = function (c, v) { var a = this.a; a.push([c, v]); var i = a.length - 1; while (i > 0) { var p = (i - 1) >> 1; if (a[p][0] <= a[i][0]) break; var t = a[p]; a[p] = a[i]; a[i] = t; i = p; } };
Heap.prototype.pop = function () {
  var a = this.a, top = a[0], last = a.pop();
  if (a.length) { a[0] = last; var i = 0; for (;;) { var l = 2 * i + 1, r = l + 1, m = i; if (l < a.length && a[l][0] < a[m][0]) m = l; if (r < a.length && a[r][0] < a[m][0]) m = r; if (m === i) break; var t = a[m]; a[m] = a[i]; a[i] = t; i = m; } }
  return top;
};

FAB.alcance = function (f) {
  var M = f.mapa, H = M.length, W = M[0].length, L = letras(), txt = M.join('');
  function tem(t) { return !!FAB.TIPOS[t] && txt.indexOf(FAB.TIPOS[t].letra) >= 0; }
  var pena = tem('pena'), cav = tem('cavalo'), cog = tem('cogumelo'), luva = tem('luva'), peq = tem('cogroxo'), chave = tem('chave');
  var S = pena ? 6 : cav ? 5 : cog ? 4 : 3, LD = cav ? 8 : pena ? 7 : cog ? 6 : 5;
  function tipo(x, y) { return (y < 0 || y >= H || x < 0 || x >= W) ? null : (L[M[y][x]] || null); }
  function cl(x, y) {
    if (x < 0 || x >= W) return 'solido'; if (y < 0 || y >= H) return null;
    var t = L[M[y][x]]; if (!t) return null; var T = FAB.TIPOS[t];
    if (T.rato) return peq ? null : 'solido';
    if (T.solidoAteAbrir) return chave ? null : 'solido';
    return T.classe;
  }
  function solido(x, y) { return cl(x, y) === 'solido'; }
  function agua(x, y) { var c = cl(x, y); return c === 'agua' || (!!f.nada && c !== 'solido' && cl(x, y - 1) === 'agua'); }
  function escada(x, y) { return cl(x, y) === 'escada'; }
  function livre(x, y) { return y >= 0 && y < H && x >= 0 && x < W && !solido(x, y); }
  function pe(x, y) { if (!livre(x, y)) return false; if (agua(x, y) || escada(x, y)) return true; var c = cl(x, y + 1); return c === 'solido' || c === 'nuvem' || c === 'escada'; }
  var tocado = new Uint8Array(W * H);
  function toca(x, y) { if (x >= 0 && x < W && y >= 0 && y < H) tocado[y * W + x] = 1; }
  function cai(x, y) { while (y < H && livre(x, y) && !pe(x, y)) { toca(x, y); y++; } return y < H && livre(x, y) ? [x, y] : null; }
  var ini = null, bandeiras = [], canos = [];
  for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
    var ch = M[y][x];
    if (ch === '@' && !ini) ini = [x, y];
    if (ch === 'F') bandeiras.push([x, y]);
    var t = L[ch];
    if (t && FAB.TIPOS[t].cano && !(y > 0 && L[M[y - 1][x]] && FAB.TIPOS[L[M[y - 1][x]]].cano)) canos.push([x, y - 1]);
  }
  var R = { W: W, H: H, ini: ini, bandeiras: bandeiras, chega: false, inicioOk: false, fim: null, custo: new Float64Array(W * H).fill(Infinity),
    pai: new Int32Array(W * H).fill(-1), visto: new Uint8Array(W * H), tocado: tocado, sobe: S, lado: LD,
    cl: cl, solido: solido, livre: livre, tipo: tipo };
  if (!ini) return R;
  var k0 = cai(ini[0], ini[1]); if (!k0) return R;
  R.inicioOk = true;
  var hp = new Heap();
  function poe(p, c, de) { if (!p) return; var k = p[1] * W + p[0]; if (c < R.custo[k]) { R.custo[k] = c; R.pai[k] = de; hp.push(c, k); } }
  poe(k0, 0, -1);
  while (hp.a.length) {
    var top = hp.pop(), k = top[1], c = top[0]; if (R.visto[k]) continue; R.visto[k] = 1;
    var px = k % W, py = (k / W) | 0;
    toca(px, py); toca(px, py - 1);
    if (M[py][px] === 'F' || (py > 0 && M[py - 1][px] === 'F')) { if (!R.chega) { R.chega = true; R.fim = [px, py]; } }
    for (var d = -1; d <= 1; d += 2) if (livre(px + d, py)) { var q = cai(px + d, py); if (q) poe(q, c + 1 + (q[1] - py) * .2, k); }   /* andar e cair */
    if (escada(px, py) || agua(px, py)) { if (livre(px, py - 1)) poe([px, py - 1], c + 1, k); if (livre(px, py + 1)) poe([px, py + 1], c + 1, k); }
    if (escada(px, py + 1)) poe([px, py + 1], c + 1, k);
    if (luva && (solido(px - 1, py) || solido(px + 1, py)) && livre(px, py - 1)) poe([px, py - 1], c + 1.5, k);   /* luva: gruda e sobe */
    var mola = tipo(px, py) === 'mola', s = mola ? Math.max(S, 8) : S, ld = mola ? Math.max(LD, 7) : LD;
    for (var dy = 0; dy <= s + 1; dy++) {                                                        /* pulo: sobe e vai para o lado (parede no caminho para) */
      if (!livre(px, py - dy)) break;
      for (var sd = -1; sd <= 1; sd += 2) for (var dx = (sd < 0 ? 0 : 1); dx <= ld; dx++) {
        var xx = px + sd * dx; if (!livre(xx, py - dy)) break;
        toca(xx, py - dy);
        if (dy > s) continue;
        var q2 = cai(xx, py - dy); if (q2) poe(q2, c + 1.5 + dx + dy * .8, k);
      }
    }
    for (var n = 0; n < canos.length; n++) if (canos[n][0] === px && canos[n][1] === py) { var o = canos[n ^ 1]; if (o && livre(o[0], o[1])) poe(o, c + 3, k); }
  }
  return R;
};

/* caminho do começo até a bandeira (ou até onde dá, e dali em linha reta até a bandeira) */
FAB.caminhoFase = function (f) {
  var A = FAB.alcance(f), W = A.W, cam = [];
  if (!A.ini) return [[0, A.H - 3], [W - 1, A.H - 3]];
  var alvo = A.bandeiras[0] || [W - 2, A.H - 3], fimK = -1;
  if (A.chega) fimK = A.fim[1] * W + A.fim[0];
  else {
    var melhor = Infinity;
    for (var k = 0; k < A.visto.length; k++) if (A.visto[k]) {
      var d = Math.abs(k % W - alvo[0]) + Math.abs(((k / W) | 0) - alvo[1]); if (d < melhor) { melhor = d; fimK = k; }
    }
  }
  for (var k2 = fimK; k2 >= 0; k2 = A.pai[k2]) cam.unshift([k2 % W, (k2 / W) | 0]);
  if (!cam.length) cam.push(A.ini.slice());
  if (!A.chega) cam.push(alvo.slice());
  return cam;
};

function sel(tipo, i, j, extra) { var s = { tipo: tipo, grupo: GRUPO[tipo], i: i, j: j, curto: CURTO[tipo] }; if (extra) for (var k in extra) s[k] = extra[k]; return s; }

/* onde a busca parou: buraco, parede, porta ou "alto demais" logo depois do ponto mais perto da bandeira */
function bloqueio(A, alvo) {
  var W = A.W, H = A.H, fk = -1, melhor = Infinity;
  for (var k = 0; k < A.visto.length; k++) if (A.visto[k]) {
    var d = Math.abs(k % W - alvo[0]) * 1 + Math.abs(((k / W) | 0) - alvo[1]) * 1.2; if (d < melhor) { melhor = d; fk = k; }
  }
  if (fk < 0) return null;
  var fx = fk % W, fy = (fk / W) | 0, sx = alvo[0] > fx ? 1 : -1;
  if (alvo[1] < fy - A.sobe && Math.abs(alvo[1] - fy) >= Math.abs(alvo[0] - fx)) return sel('alto', fx, Math.max(0, fy - A.sobe - 1));
  /* porta logo à frente, sem chave na fase */
  for (var a = 1; a <= 2; a++) { var t = A.tipo(fx + sx * a, fy); if (t && FAB.TIPOS[t].solidoAteAbrir) return sel('porta', fx + sx * a, fy); }
  /* buraco: colunas seguidas sem nada para pisar daqui para baixo */
  function chao(x) { for (var y = fy + 1; y < H; y++) { var c = A.cl(x, y); if (c === 'solido' || c === 'nuvem' || c === 'escada' || c === 'agua') return true; } return false; }
  var x0 = fx + sx; if (x0 >= 0 && x0 < W && A.livre(x0, fy) && !chao(x0)) {
    var x1 = x0; while (x1 + sx >= 0 && x1 + sx < W && !chao(x1 + sx)) x1 += sx;
    return sel('buraco', Math.round((x0 + x1) / 2), Math.min(H - 1, fy + 1));
  }
  /* parede: coluna sólida à frente, mais alta que o pulo */
  for (var b = 1; b <= 2; b++) {
    var cx = fx + sx * b; if (cx < 0 || cx >= W) break;
    if (A.solido(cx, fy)) { var top = fy; while (top - 1 >= 0 && A.solido(cx, top - 1)) top--; return sel(fy - top + 1 > A.sobe ? 'parede' : 'passar', cx, Math.max(0, top - 1)); }
  }
  return sel('passar', Math.max(0, Math.min(W - 1, fx + sx)), fy);
}

function agrupa(lista, raio) {   /* selos do mesmo tipo muito perto viram um só */
  var out = [];
  lista.forEach(function (s) { if (!out.some(function (o) { return o.tipo === s.tipo && Math.abs(o.i - s.i) <= raio && Math.abs(o.j - s.j) <= raio; })) out.push(s); });
  return out;
}

FAB.diagnostico = function (f) {
  var out = []; if (!f || !f.mapa || !f.mapa.length || !f.mapa[0].length) return out;
  var M = f.mapa, H = M.length, W = M[0].length, L = letras(), ini = [], band = [];
  for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) { if (M[y][x] === '@') ini.push([x, y]); if (M[y][x] === 'F') band.push([x, y]); }
  if (!ini.length) out.push(sel('semComeco', 1, Math.max(0, H - 3)));
  ini.slice(1).forEach(function (p) { out.push(sel('doisComecos', p[0], p[1])); });
  if (!band.length) out.push(sel('semBandeira', W - 2, Math.max(0, H - 3)));
  var A = ini.length ? FAB.alcance(f) : null;
  if (A && !A.inicioOk) out.push(sel('cai', ini[0][0], ini[0][1]));
  else if (A && band.length && !A.chega) {
    band.forEach(function (p) { out.push(sel('chegar', p[0], p[1])); });
    var b = bloqueio(A, band[0]); if (b) out.push(b);
  }
  /* peças presas no bloco e peças que não dá para pegar */
  function fechado(x, y) {
    function s(xx, yy) { if (xx < 0 || xx >= W) return true; if (yy < 0 || yy >= H) return false; var t = L[M[yy][xx]]; return !!t && FAB.TIPOS[t].classe === 'solido'; }
    return s(x - 1, y) && s(x + 1, y) && s(x, y - 1) && s(x, y + 1);
  }
  var presas = [], longe = [];
  for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
    var t = L[M[y][x]]; if (!t) continue; var T = FAB.TIPOS[t], c = T.classe;
    if (c === 'inimigo') { if (fechado(x, y)) presas.push(sel('inimigoPreso', x, y)); continue; }
    if (c !== 'item' && c !== 'montaria' && !(c === 'especial' && t !== 'bandeira' && !T.solidoAteAbrir)) continue;
    if (fechado(x, y)) { presas.push(sel(t === 'moeda' ? 'moedaPresa' : 'pecaPresa', x, y)); continue; }
    if (A && A.chega && !A.tocado[y * W + x]) longe.push(sel('longe', x, y));
  }
  out = out.concat(agrupa(presas, 2), agrupa(longe, 3));
  /* excesso: uma tela (~20 colunas) com coisa demais; inimigos demais juntos */
  var peso = new Float32Array(W * H), ini2 = new Uint8Array(W * H);
  for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
    var t2 = L[M[y][x]]; if (!t2 || t2 === 'inicio' || t2 === 'bandeira') continue; var c2 = FAB.TIPOS[t2].classe;
    if (c2 === 'item') peso[y * W + x] = (t2 === 'moeda' || t2 === 'cristal') ? 1 / 3 : 1;
    else if (c2 === 'inimigo') { peso[y * W + x] = 1; ini2[y * W + x] = 1; }
    else if (c2 === 'perigo') peso[y * W + x] = (x > 0 && M[y][x - 1] === M[y][x]) ? 0 : 1;   /* fileira de espinho ou lava conta uma vez */
    else if (c2 === 'especial' || c2 === 'montaria') peso[y * W + x] = 1;
  }
  function soma(arr, x0, y0, w, h) { var s = 0, cx = 0, cy = 0; for (var yy = y0; yy < Math.min(H, y0 + h); yy++) for (var xx = x0; xx < Math.min(W, x0 + w); xx++) { var v = arr[yy * W + xx]; if (v) { s += v; cx += xx * v; cy += yy * v; } } return { s: s, i: s ? Math.round(cx / s) : x0, j: s ? Math.round(cy / s) : y0 }; }
  var achados = [], hJan = Math.min(H, JAN_ALTA);
  for (var y0 = 0; y0 + hJan <= H; y0 += 3) {
    for (var x0 = 0; x0 < W; x0 += 2) {
      var r = soma(peso, x0, y0, Math.min(JAN, W), hJan); if (r.s > LIM_COISAS) achados.push(sel('muito', r.i, r.j, { n: r.s }));
      var r2 = soma(ini2, x0, y0, JAN_INI, hJan); if (r2.s >= LIM_INI) achados.push(sel('inimigos', r2.i, r2.j, { n: r2.s }));
    }
  }
  out = out.concat(agrupa(achados.filter(function (a) { return a.tipo === 'muito'; }), 12), agrupa(achados.filter(function (a) { return a.tipo === 'inimigos'; }), 8));
  return out;
};

/* medida que o portão e o teste usam: a "coisa por tela" mais alta da fase */
FAB.diagnostico.medidas = function (f) {
  var M = f.mapa, H = M.length, W = M[0].length, L = letras(), maxC = 0, maxI = 0, hJan = Math.min(H, JAN_ALTA);
  var save = []; FAB.diagnostico.LIMITES = { JAN: JAN, LIM_COISAS: LIM_COISAS, JAN_INI: JAN_INI, LIM_INI: LIM_INI };
  for (var y0 = 0; y0 + hJan <= H; y0 += 3) for (var x0 = 0; x0 < W; x0 += 2) {
    var s = 0, si = 0;
    for (var y = y0; y < y0 + hJan; y++) for (var x = x0; x < Math.min(W, x0 + JAN); x++) {
      var t = L[M[y][x]]; if (!t || t === 'inicio' || t === 'bandeira') continue; var c = FAB.TIPOS[t].classe;
      if (c === 'item') s += (t === 'moeda' || t === 'cristal') ? 1 / 3 : 1;
      else if (c === 'inimigo') { s += 1; if (x < x0 + JAN_INI) si++; }
      else if (c === 'perigo') s += (x > 0 && M[y][x - 1] === M[y][x]) ? 0 : 1;
      else if (c === 'especial' || c === 'montaria') s += 1;
    }
    if (s > maxC) maxC = s; if (si > maxI) maxI = si;
  }
  return { coisas: Math.round(maxC * 10) / 10, inimigos: maxI };
};
})();
