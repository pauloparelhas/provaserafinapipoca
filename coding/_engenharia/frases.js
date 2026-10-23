/* frases.js — junta TODAS as frases fixas que a Fábrica fala, já cortadas em pedaços
   (o mesmo corte de js/voz.js), para o gera_audio.py gravar com Thalita e Antonio.
   Fontes: banco (missões, conceitos, peças, blocos, falas), perguntas da prova atual,
   textos literais em fala()/toast()/escolhe() e os blocos marcados com  falado  no js.
   Uso: node _engenharia/frases.js  -> escreve _engenharia/frases.json (português) e
   frases_en.json (o mesmo texto passado pelo dicionário banco/ingles_dic.js)  {chave: texto} */
var vm = require('vm'), fs = require('fs'), path = require('path');
var R = path.resolve(__dirname, '..');
var sb = { document: { write: function () {} } }; sb.window = sb; sb.globalThis = sb; vm.createContext(sb);
['banco/catalogo.js', 'banco/blocos.js', 'banco/missoes.js', 'banco/oficina.js', 'banco/provas.js', 'banco/ingles.js', 'banco/ingles_dic.js', 'js/voz.js'].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), sb, { filename: f });
});
var F = sb.FAB, P = F.PROVAS.lista[F.PROVAS.atual];
vm.runInContext(fs.readFileSync(path.resolve(R, P.arquivo), 'utf8'), sb, { filename: P.arquivo });

var textos = [];
function poe(t) { if (t) textos.push(t); }

/* 1. banco */
F.MISSOES.forEach(function (m) { poe(m.frase); });
poe('Missão cumprida!');
Object.keys(F.CONCEITOS).forEach(function (k) { var C = F.CONCEITOS[k]; poe(C.frase); poe(C.nome); poe('Você aprendeu: ' + C.nome + '.'); });
Object.keys(F.TIPOS).forEach(function (k) { poe(F.TIPOS[k].nome + '.'); });
Object.keys(F.NOME_OBJ || {}).forEach(function (k) { poe(F.NOME_OBJ[k] + '.'); });
[F.QUANDO, F.SE, F.FACA].forEach(function (D) { Object.keys(D).forEach(function (k) { poe(D[k].fala); }); });
(F.OPCOES.falas || []).forEach(poe);
F.NUMEROS_FALA.forEach(poe);
poe('Um ponto.'); for (var n = 0; n <= 300; n++) poe(n + ' pontos.');

/* 2. perguntas da prova atual (o que a Placa ? lê) */
var B = sb[P.global];
(B.ITENS || []).filter(P.filtro || function () { return true; }).forEach(function (it) { poe(it.p); it.o.forEach(poe); poe(it.ex); });
poe('Acertou!'); poe('A certa é:');

/* 3. literais no código */
var LIT = /'((?:[^'\\\n]|\\.)*)'/g;
function literais(trecho) { var r = [], m; LIT.lastIndex = 0; while ((m = LIT.exec(trecho))) r.push(m[1].replace(/\\'/g, "'").replace(/^[.\s]+/, '')); return r; }
function falavel(t) { return /[a-zà-ú]{2}/i.test(t) && !/[<>=#{}()]|^\.|^[a-z_]+$|\\u/.test(t) && /\s|[.!?]$/.test(t); }
fs.readdirSync(path.join(R, 'js')).filter(function (f) { return /\.js$/.test(f); }).forEach(function (f) {
  var src = fs.readFileSync(path.join(R, 'js', f), 'utf8');
  src.split('\n').forEach(function (L) {
    if (/\bfala\(|toast\(|escolhe\(|ajuda: '/.test(L)) literais(L).filter(falavel).forEach(poe);
  });
  var re = /\/\*\s*falado\s*\*\//g, m;
  while ((m = re.exec(src))) { var resto = src.slice(m.index), fim = resto.search(/\]\s*;|\}\s*;|\}\[/); literais(resto.slice(0, fim < 0 ? 400 : fim)).filter(falavel).forEach(poe); }
});

var out = {}, en = {};
F.pedacos(textos).forEach(function (p) { var k = F.chaveAudio(p); if (!out[k]) out[k] = p; });
textos.concat(['Oi! Eu sou a Thalita.', 'Oi! Eu sou o Antonio.']).forEach(function (t) {
  F.pedacosNaLingua(t, 'en').forEach(function (x) { if (x.l === 'en') { var k = F.chaveAudio(x.p); if (!en[k]) en[k] = x.p; } });
});
fs.writeFileSync(path.join(__dirname, 'frases.json'), JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(__dirname, 'frases_en.json'), JSON.stringify(en, null, 1));
console.log('frases: ' + Object.keys(out).length + ' pedaços em português, ' + Object.keys(en).length + ' em inglês');
