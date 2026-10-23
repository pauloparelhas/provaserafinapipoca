/* valida_banco.js — portão do banco da Fábrica (sem navegador).
   Confere: sprites 16×16 só com letras da paleta; letras de mapa únicas; mapas de 12 linhas
   iguais com 1 começo e ≥1 bandeira; regras-modelo só com blocos que existem; missões com id
   único e conceito conhecido; peças da oficina com sprite. Uso: node valida_banco.js */
var vm = require('vm'), fs = require('fs'), path = require('path');
var R = path.resolve(__dirname, '..', '..');
var sb = { document: { write: function () {} } }; sb.window = sb; vm.createContext(sb);
['banco/catalogo.js', 'banco/blocos.js', 'banco/missoes.js', 'banco/oficina.js', 'banco/provas.js'].forEach(function (f) {
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
    if (f.mapa.length !== 12) e(m + ' fase ' + i + ': ' + f.mapa.length + ' linhas (precisa 12)');
    var w = f.mapa[0].length, txt = f.mapa.join('');
    f.mapa.forEach(function (l, j) { if (l.length !== w) e(m + ' fase ' + i + ' linha ' + j + ' com largura diferente');
      for (var c of l) if (c !== '.' && !letras[c]) e(m + ': letra desconhecida "' + c + '"'); });
    if ((txt.match(/@/g) || []).length !== 1) e(m + ' fase ' + i + ': precisa de 1 começo (@)');
    if (!/F/.test(txt)) e(m + ' fase ' + i + ': sem bandeira');
    if (!F.CENARIOS[f.cenario]) e(m + ': cenário desconhecido ' + f.cenario);
  });
});
F.REGRAS_PADRAO.forEach(function (r, i) {
  if (!F.QUANDO[r.quando.t]) e('regra ' + i + ': QUANDO desconhecido ' + r.quando.t);
  if (r.se && !F.SE[r.se.t]) e('regra ' + i + ': SE desconhecido ' + r.se.t);
  r.faca.forEach(function (a) { if (!F.FACA[a.t]) e('regra ' + i + ': FAÇA desconhecido ' + a.t); });
});
[F.QUANDO, F.SE, F.FACA].forEach(function (D) { Object.keys(D).forEach(function (k) {
  if (D[k].param && !F.OPCOES[D[k].param]) e('bloco ' + k + ': opções ' + D[k].param + ' não existem');
  if (D[k].icone && !F.ICONES[D[k].icone]) e('bloco ' + k + ': ícone ' + D[k].icone + ' não existe');
  if (!F.CONCEITOS[D[k].conceito]) e('bloco ' + k + ': conceito ' + D[k].conceito + ' não existe'); }); });
Object.keys(F.OPCOES).forEach(function (o) { if (/^obj/.test(o)) F.OPCOES[o].forEach(function (t) { if (t !== 'inimigo' && !F.TIPOS[t]) e('opção ' + o + ': peça ' + t + ' não existe'); }); });
var ids = {};
F.MISSOES.forEach(function (m) {
  if (ids[m.id]) e('missão repetida ' + m.id); ids[m.id] = 1;
  if (!F.CONCEITOS[m.conceito]) e('missão ' + m.id + ': conceito ' + m.conceito);
  if (['painel', 'ideia', 'pixel', 'fases', 'regras', 'testar', 'diario', 'robo', 'missoes', 'jogar'].indexOf(m.onde) < 0) e('missão ' + m.id + ': tela ' + m.onde);
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
