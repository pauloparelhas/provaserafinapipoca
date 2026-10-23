/* seguranca.js — portão de segurança parental da Fábrica (sem navegador).
   Reprova se: faltar a trava de conexões (CSP) no index.html; algum arquivo do módulo apontar
   para endereço de fora (http/https); o código usar canal de rede ou de código vindo de fora
   (fetch, XMLHttpRequest, WebSocket, EventSource, sendBeacon, eval, new Function, window.open,
   iframe, postMessage). Vale para coding/ e para o serafina-core que ele carrega.
   Uso: node _engenharia/gate/seguranca.js */
var fs = require('fs'), path = require('path');
var R = path.resolve(__dirname, '..', '..'), erros = [];
var html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
var csp = (/http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(html) || [])[1] || '';
if (!csp) erros.push('index.html sem Content-Security-Policy');
var NUVEM = 'https://fabrica-mariana-nuvem.pauloparelhas.workers.dev';
if (!/connect-src ([^;]+);/.test(csp) || /connect-src ([^;]+);/.exec(csp)[1].trim() !== NUVEM) erros.push('CSP: connect-src tem de ser só a nuvem da família');
["frame-src 'none'", "object-src 'none'", "form-action 'none'", "default-src 'self'"].forEach(function (d) { if (csp.indexOf(d) < 0) erros.push('CSP sem ' + d); });
if ((csp.match(/https?:\/\/[^\s;]+/g) || []).some(function (u) { return u !== NUVEM; })) erros.push('CSP libera endereço de fora');
var arquivos = ['index.html', path.join('..', 'ferramentas', 'serafina-core.js')];
(/arquivo: '([^']+)'/g.exec(fs.readFileSync(path.join(R, 'banco', 'provas.js'), 'utf8')) || []).slice(1).forEach(function (a) { arquivos.push(a); });   /* o banco da prova atual também */
['js', 'banco'].forEach(function (d) { fs.readdirSync(path.join(R, d)).forEach(function (f) { if (/\.js$/.test(f)) arquivos.push(path.join(d, f)); }); });
var PROIBIDO = /\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon|\beval\s*\(|new\s+Function\s*\(|window\.open\s*\(|<iframe|postMessage\s*\(|importScripts/;
arquivos.forEach(function (f) {
  var s = fs.readFileSync(path.join(R, f), 'utf8').replace(/http:\/\/www\.w3\.org\/2000\/svg/g, '');
  var nuvem = f === path.join('js', 'nuvem.js');   /* o único arquivo que fala com a nuvem da família */
  (s.match(/https?:\/\/[^\s'"<>);]+/g) || []).forEach(function (u) { if (u !== NUVEM || (!nuvem && f !== 'index.html')) erros.push(f + ': endereço de fora ' + u); });
  var p = PROIBIDO.exec(nuvem ? s.replace(/\bfetch\(URL_N/g, '') : s); if (p) erros.push(f + ': usa ' + p[0]);
});
console.log(erros.length ? 'SEGURANÇA REPROVADA:\n- ' + erros.join('\n- ') : 'SEGURANÇA OK: ' + arquivos.length + ' arquivos, sem endereço de fora, sem canal de rede, conexões travadas (CSP)');
process.exit(erros.length ? 1 : 0);
