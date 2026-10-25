/* valida_banco.js — portão do banco da Fábrica (sem navegador).
   Confere: sprites 16×16 só com letras da paleta; letras de mapa únicas; mapas de 12 a 48 linhas
   (largura 20 a 160, todas iguais) com 1 começo e ≥1 bandeira; os 6 modelos antigos com o mapa
   idêntico ao de antes (impressão digital); bandeira ALCANÇÁVEL a partir do começo (busca na grade:
   andar, pular ~3 casinhas para cima e ~4 para o lado, cair, cipó, água, cano em par, pena e cavalo);
   regras-modelo e regras dos pacotes só com blocos e opções que existem; bloco novo com "requer"
   de peça que existe; missões com id único e conceito conhecido; peças da oficina com sprite.
   Uso: node valida_banco.js */
var vm = require('vm'), fs = require('fs'), path = require('path');
var R = path.resolve(__dirname, '..', '..');
var sb = { document: { write: function () {} } }; sb.window = sb; vm.createContext(sb);
['banco/catalogo.js', 'banco/blocos.js', 'banco/missoes.js', 'banco/oficina.js', 'banco/provas.js', 'banco/fase_recheio.js', 'js/diagnostico.js'].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), sb, { filename: f });
});
var F = sb.FAB, erros = [];
function e(m) { erros.push(m); }

Object.keys(F.SPRITES).forEach(function (k) {
  var s = F.SPRITES[k]; if (!s.quadros || !s.quadros.length) return e('sprite sem quadros: ' + k);
  s.quadros.forEach(function (q, i) {
    if (q.length !== 16) e(k + ' quadro ' + i + ': ' + q.length + ' linhas');
    q.forEach(function (l, j) { if (l.length !== 16) e(k + ' q' + i + ' linha ' + j + ': ' + l.length + ' colunas');
      for (var c of l) if (!(c in F.PALETA)) e(k + ': cor fora da paleta "' + c + '"'); });
  });
});
var letras = {};
Object.keys(F.TIPOS).forEach(function (t) {
  var T = F.TIPOS[t];
  if (letras[T.letra]) e('letra repetida "' + T.letra + '": ' + letras[T.letra] + ' e ' + t); letras[T.letra] = t;
  if (T.letra === '.' || T.letra.length !== 1) e('letra inválida em ' + t);
  if (T.skin && !F.SPRITES[T.skin]) e('tipo ' + t + ' sem sprite ' + T.skin);
});
Object.keys(F.MODELOS).forEach(function (m) {
  F.MODELOS[m].fases.forEach(function (f, i) {
    if (f.mapa.length < 12 || f.mapa.length > 48) e(m + ' fase ' + i + ': ' + f.mapa.length + ' linhas (precisa de 12 a 48)');
    var w = f.mapa[0].length, txt = f.mapa.join('');
    if (w < 20 || w > 160) e(m + ' fase ' + i + ': largura ' + w + ' (precisa de 20 a 160)');
    if (f.formato && !(F.FORMATOS || []).some(function (x) { return x.id === f.formato; })) e(m + ' fase ' + i + ': formato desconhecido ' + f.formato);
    if (!F.MODELOS[m].bugs && !alcanca(f)) e(m + ' fase ' + i + ': a bandeira não dá para alcançar a partir do começo');
    f.mapa.forEach(function (l, j) { if (l.length !== w) e(m + ' fase ' + i + ' linha ' + j + ' com largura diferente');
      for (var c of l) if (c !== '.' && !letras[c]) e(m + ': letra desconhecida "' + c + '"'); });
    if ((txt.match(/@/g) || []).length !== 1) e(m + ' fase ' + i + ': precisa de 1 começo (@)');
    if (!/F/.test(txt)) e(m + ' fase ' + i + ': sem bandeira');
    if (!F.CENARIOS[f.cenario]) e(m + ': cenário desconhecido ' + f.cenario);
  });
});
/* os modelos antigos não mudam (o mapa tem a mesma impressão digital de 23/10/2026) */
function digital(s) { var x = 5381; for (var i = 0; i < s.length; i++) x = ((x * 33) ^ s.charCodeAt(i)) >>> 0; return x.toString(36); }
var ANTIGOS = { primeiro: '7tucwg', vazio: 'pke4dr', castelo: '1uqik1f', quebrado: 'ho0f00', neve: '1oz57oz', corrida: '1ne3ncq' };
Object.keys(ANTIGOS).forEach(function (m) {
  if (!F.MODELOS[m]) return e('modelo antigo sumiu: ' + m);
  if (digital(JSON.stringify(F.MODELOS[m].fases.map(function (f) { return f.mapa; }))) !== ANTIGOS[m]) e('o mapa do modelo antigo "' + m + '" mudou');
});
/* regra com bloco e opção que existem (regras-modelo e regras que nascem com as peças) */
function confereRegra(r, onde) {
  if (!F.QUANDO[r.quando.t]) return e(onde + ': QUANDO desconhecido ' + r.quando.t);
  if (r.quando.obj && F.OPCOES[F.QUANDO[r.quando.t].param].indexOf(r.quando.obj) < 0) e(onde + ': peça ' + r.quando.obj + ' fora das opções de ' + r.quando.t);
  if (r.se && !F.SE[r.se.t]) e(onde + ': SE desconhecido ' + r.se.t);
  r.faca.forEach(function (a) {
    var D = F.FACA[a.t]; if (!D) return e(onde + ': FAÇA desconhecido ' + a.t);
    if (a.v !== undefined && D.param && F.OPCOES[D.param].indexOf(a.v) < 0) e(onde + ': opção "' + a.v + '" não existe em ' + D.param);
  });
  if (r.faca.length > 3) e(onde + ': mais de 3 ações');
}
F.REGRAS_PADRAO.forEach(function (r, i) { confereRegra(r, 'regra ' + i); });
Object.keys(F.PACOTES || {}).forEach(function (k) {
  if (k !== '@nada' && !F.TIPOS[k]) e('pacote de peça que não existe: ' + k);
  F.PACOTES[k].forEach(function (r, i) { confereRegra(r, 'pacote ' + k + ' regra ' + i); });
});
[F.QUANDO, F.SE, F.FACA].forEach(function (D) { Object.keys(D).forEach(function (k) {
  (D[k].requer || []).forEach(function (q) { if (q !== '@nada' && !F.TIPOS[q]) e('bloco ' + k + ': requer peça que não existe ' + q); }); }); });
(F.FORMATOS || []).forEach(function (fo) { if (fo.modelo && !F.MODELOS[fo.modelo]) e('formato ' + fo.id + ': modelo ' + fo.modelo + ' não existe'); });
[F.QUANDO, F.SE, F.FACA].forEach(function (D) { Object.keys(D).forEach(function (k) {
  if (D[k].param && !F.OPCOES[D[k].param]) e('bloco ' + k + ': opções ' + D[k].param + ' não existem');
  if (D[k].icone && !F.ICONES[D[k].icone]) e('bloco ' + k + ': ícone ' + D[k].icone + ' não existe');
  if (!F.CONCEITOS[D[k].conceito]) e('bloco ' + k + ': conceito ' + D[k].conceito + ' não existe'); }); });
Object.keys(F.OPCOES).forEach(function (o) { if (/^obj/.test(o)) F.OPCOES[o].forEach(function (t) { if (t !== 'inimigo' && !F.TIPOS[t]) e('opção ' + o + ': peça ' + t + ' não existe'); }); });
/* ALCANCE: dá para ir do começo até uma bandeira? (busca na grade, generosa: só pega fase sem saída) */
function alcanca(f) {
  var M = f.mapa, H = M.length, W = M[0].length, T = {};
  Object.keys(F.TIPOS).forEach(function (t) { T[F.TIPOS[t].letra] = F.TIPOS[t]; });
  var txt = M.join(''), pena = /w/.test(txt), cav = /K/.test(txt), sobe = pena ? 6 : cav ? 4 : 3, lado = cav ? 7 : 4;
  function cl(x, y) { if (x < 0 || x >= W) return 'solido'; if (y < 0 || y >= H) return null; var t = T[M[y][x]]; return t ? t.classe : null; }
  function solido(x, y) { var c = cl(x, y); return c === 'solido'; }
  function agua(x, y) { return cl(x, y) === 'agua' || (f.nada && cl(x, y) !== 'solido' && cl(x, y - 1) === 'agua'); }
  function escada(x, y) { return cl(x, y) === 'escada'; }
  function livre(x, y) { return y >= 0 && y < H && x >= 0 && x < W && !solido(x, y); }
  function pe(x, y) { if (!livre(x, y)) return false; if (agua(x, y) || escada(x, y)) return true; var c = cl(x, y + 1); return c === 'solido' || c === 'nuvem' || c === 'escada'; }
  function cai(x, y) { while (y < H && livre(x, y) && !pe(x, y)) y++; return y < H && livre(x, y) ? [x, y] : null; }
  var ini = null, canos = [];
  for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
    if (M[y][x] === '@') ini = [x, y];
    if (T[M[y][x]] && T[M[y][x]].cano && !(y > 0 && T[M[y - 1][x]] && T[M[y - 1][x]].cano)) canos.push([x, y - 1]);
  }
  if (!ini) return false;
  var visto = {}, fila = [], k0 = cai(ini[0], ini[1]); if (!k0) return false;
  function poe(p) { if (!p) return; var k = p[0] + ',' + p[1]; if (visto[k]) return; visto[k] = 1; fila.push(p); }
  poe(k0);
  while (fila.length) {
    var p = fila.shift(), px = p[0], py = p[1];
    if (M[py][px] === 'F') return true;
    if (py > 0 && M[py - 1][px] === 'F') return true;
    for (var d = -1; d <= 1; d += 2) if (livre(px + d, py)) poe(cai(px + d, py));                       /* andar (e cair da beirada) */
    if (escada(px, py) || agua(px, py)) { if (livre(px, py - 1)) poe([px, py - 1]); if (livre(px, py + 1)) poe([px, py + 1]); }   /* subir, descer, nadar */
    if (escada(px, py + 1)) poe([px, py + 1]);
    for (var dy = 0; dy <= sobe; dy++) {                                                                  /* pulo: sobe e vai para o lado */
      if (!livre(px, py - dy)) break;
      for (var dx = -lado; dx <= lado; dx++) { var q = cai(px + dx, py - dy); if (q && livre(px + dx, py - dy)) poe(q); }
    }
    canos.forEach(function (c, i) { if (c[0] === px && c[1] === py) { var o = canos[i ^ 1]; if (o) poe(o); } });   /* cano em par */
  }
  return false;
}
/* fase Reta nova e recheios (24/10): 100 a 160 colunas, bandeira alcançável; e os AVISOS do editor
   (js/diagnostico.js) não acusam nada nos jogos-modelo, nos recheios nem nos formatos (sem falso alarme) */
(F.RECHEIOS || []).forEach(function (r) {
  var w = r.mapa[0].length;
  if (r.mapa.some(function (l) { return l.length !== w; })) e('recheio ' + r.id + ': linhas com largura diferente');
  if ((r.mapa.join('').match(/@/g) || []).length !== 1 || !/F/.test(r.mapa.join(''))) e('recheio ' + r.id + ': precisa de 1 começo e bandeira');
  if (r.antigo) return;
  if (w < 100 || w > 160) e('recheio ' + r.id + ': largura ' + w + ' (fase nova tem de ter 100 a 160)');
  if (!alcanca({ mapa: r.mapa })) e('recheio ' + r.id + ': a bandeira não dá para alcançar');
});
var reta = F.faseDoFormato('reta', 1); if (reta.mapa[0].length < 100 || reta.mapa[0].length > 160) e('fase Reta nova: largura ' + reta.mapa[0].length + ' (100 a 160)');
var semAlarme = [];
Object.keys(F.MODELOS).forEach(function (m) { if (!F.MODELOS[m].bugs) F.MODELOS[m].fases.forEach(function (f, i) { semAlarme.push(['modelo ' + m + ' fase ' + i, f]); }); });
(F.RECHEIOS || []).forEach(function (r) { if (!r.antigo) semAlarme.push(['recheio ' + r.id, { mapa: r.mapa, cenario: 'dia' }]); });
F.FORMATOS.forEach(function (fo) { semAlarme.push(['formato ' + fo.id, F.faseDoFormato(fo.id, 1)]); });
semAlarme.forEach(function (x) { var d = F.diagnostico(x[1]); if (d.length) e('aviso falso no ' + x[0] + ': ' + d.map(function (s) { return s.curto + ' (' + s.i + ',' + s.j + ')'; }).join('; ')); });
var ids = {};
F.MISSOES.forEach(function (m) {
  if (ids[m.id]) e('missão repetida ' + m.id); ids[m.id] = 1;
  if (!F.CONCEITOS[m.conceito]) e('missão ' + m.id + ': conceito ' + m.conceito);
  if (['painel', 'ideia', 'pixel', 'fases', 'regras', 'testar', 'diario', 'robo', 'missoes', 'jogar', 'jeito'].indexOf(m.onde) < 0) e('missão ' + m.id + ': tela ' + m.onde);
  if (m.frase.split(/\s+/).length > 16) e('missão ' + m.id + ': frase longa demais para 7 anos');
});
/* filtro de palavras impróprias nos textos que a criança lê (nomes, falas, entregas do robô) */
var PROIBIDAS = /(mata|matar|morte|morre|morrer|sangue|arma|faca|tiro|bomba|idiota|burr[ao]|feio|odeio|demônio|diabo)/i;
var textos = [].concat(F.OPCOES.falas, Object.keys(F.SPRITES).map(function (k) { return F.SPRITES[k].nome; }),
  Object.keys(F.TIPOS).map(function (k) { return F.TIPOS[k].nome; }), Object.keys(F.ENTREGAS || {}).map(function (k) { return F.ENTREGAS[k]; }),
  F.MISSOES.map(function (m) { return m.frase; }));
textos.forEach(function (t) { if (PROIBIDAS.test(t || '')) e('texto impróprio: "' + t + '"'); });
var P = F.PROVAS.lista[F.PROVAS.atual];
if (!P) e('prova atual sem cadastro'); else if (!fs.existsSync(path.resolve(R, P.arquivo))) e('banco da prova não existe: ' + P.arquivo);
console.log(erros.length ? 'BANCO REPROVADO:\n- ' + erros.join('\n- ') : 'BANCO OK: ' + Object.keys(F.SPRITES).length + ' sprites, ' + Object.keys(F.TIPOS).length + ' peças, ' +
  Object.keys(F.QUANDO).length + '/' + Object.keys(F.SE).length + '/' + Object.keys(F.FACA).length + ' blocos, ' + F.MISSOES.length + ' missões, prova ' + F.PROVAS.atual);
process.exit(erros.length ? 1 : 0);
