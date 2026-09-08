/* ============================================================
   valida_op_data.js — gate determinístico do banco da Olimpíada.

   Roda com: node _processo/geracao/valida_op_data.js

   O que ele prova (não "confere no olho"):
     1. estrutura: 4 alternativas, exatamente 1 certa, campos obrigatórios
     2. cotas: cada família tem itens para montar o simulado de 15 duas
        vezes seguidas sem repetir — senão a criança reencontra a mesma
        pergunta na segunda rodada
     3. os cartões apontam para itens que existem
     4. a questão do CÓDIGO decodifica mesmo: aplica a tabela do quadro
        à sequência e compara o resultado com o gabarito. E exige que a
        tabela esteja EMBARALHADA — se a linha de baixo, lida da esquerda
        para a direita, já der a frase, a questão não treina nada (foi o
        que a auditoria de 08/09 pegou).
     5. `acende` aponta para linhas que existem no texto do item
   ============================================================ */
'use strict';
var path = require('path');
global.window = {};
require(path.join(__dirname, '..', '..', 'ferramentas', 'OP_data.js'));
var OP = global.window.OP;

var falhas = [];
function reprova(m){ falhas.push(m); }
function limpa(s){
  return String(s).replace(/&Oacute;/g,'Ó').replace(/&Eacute;/g,'É').replace(/&Aacute;/g,'Á')
    .replace(/&Ccedil;/g,'Ç').replace(/&Atilde;/g,'Ã').replace(/&[a-z]+;/gi,'').trim();
}

/* ---- 1. estrutura ---- */
var OBRIG = ['id','eixo','origem','pede','opts','dica','truque','visual','porque','proximo'];
OP.ITENS.forEach(function(it){
  OBRIG.forEach(function(c){ if(!it[c]) reprova(it.id+': falta o campo '+c); });
  if(!it.opts || it.opts.length!==4) reprova(it.id+': tem '+(it.opts?it.opts.length:0)+' alternativas (a prova tem 4)');
  var certas=(it.opts||[]).filter(function(o){ return o.ok; }).length;
  if(certas!==1) reprova(it.id+': tem '+certas+' alternativas certas');
  (it.opts||[]).forEach(function(o,i){
    if(!o.ok && !o.no) reprova(it.id+': a alternativa errada "'+o.t+'" não tem comentário');
  });
  if(it.acende) it.acende.forEach(function(n){
    if(!it.texto || n>=it.texto.length) reprova(it.id+': acende aponta para a linha '+n+', que não existe');
  });
  if(!OP.FAMILIAS.filter(function(f){ return f.k===it.eixo; }).length) reprova(it.id+': eixo desconhecido "'+it.eixo+'"');
});

/* ---- 2. cotas para duas rodadas sem repetir ---- */
OP.FAMILIAS.forEach(function(f){
  if(!f.cota) return;
  var n=OP.ITENS.filter(function(i){ return i.eixo===f.k; }).length;
  if(n < f.cota) reprova('família '+f.k+': cota '+f.cota+' mas só '+n+' itens — o simulado não fecha');
  else if(n < f.cota*2) console.log('  aviso: família '+f.k+' tem '+n+' itens para cota '+f.cota+
                                    ' — a segunda rodada vai repetir alguma');
});

/* ---- 3. cartões ---- */
OP.CARTOES.forEach(function(c){
  ['exemplo','agora'].forEach(function(campo){
    if(c[campo] && !OP.acha(c[campo])) reprova('cartão '+c.k+': '+campo+' aponta para '+c[campo]+', que não existe');
  });
  if(!c.truque) reprova('cartão '+c.k+': sem truque');
});

/* ---- 4. a questão do código tem de decodificar ---- */
OP.ITENS.filter(function(i){ return i.eixo==='codigo'; }).forEach(function(it){
  var trs=(it.quadro||'').match(/<tr>[\s\S]*?<\/tr>/g);
  if(!trs || trs.length<2){ reprova(it.id+': questão de código sem tabela'); return; }
  var celulas=trs.map(function(tr){
    return (tr.match(/<td>(.*?)<\/td>/g)||[]).map(function(td){ return limpa(td.replace(/<\/?td>/g,'')); });
  });
  var simbolos=celulas[0], silabas=celulas[1];
  if(simbolos.length!==silabas.length){ reprova(it.id+': a tabela tem símbolos e sílabas em número diferente'); return; }
  var mapa={}; simbolos.forEach(function(s,i){ mapa[s]=silabas[i]; });

  var m=(it.quadro||'').match(/<div class="seq">(.*?)<\/div>/);
  if(!m){ reprova(it.id+': questão de código sem a sequência a decodificar'); return; }
  var seq=limpa(m[1]).split(/\s+/).filter(Boolean);
  var semPar=seq.filter(function(s){ return !mapa[s]; });
  if(semPar.length){ reprova(it.id+': '+semPar.length+' símbolo(s) da sequência não estão na tabela'); return; }

  var decodificado=seq.map(function(s){ return mapa[s]; }).join('').replace(/\s/g,'');
  var gabarito=limpa(it.opts.filter(function(o){ return o.ok; })[0].t).replace(/[\s.]/g,'');
  if(decodificado.toUpperCase()!==gabarito.toUpperCase())
    reprova(it.id+': a sequência decodifica em "'+decodificado+'" mas o gabarito é "'+gabarito+'"');

  /* a tabela tem de estar embaralhada: ler a linha de baixo não pode dar a frase */
  var emOrdem=silabas.join('').replace(/\s/g,'').toUpperCase();
  if(gabarito.toUpperCase().indexOf(emOrdem.slice(0,12))===0)
    reprova(it.id+': a tabela está na ordem da frase — dá para responder lendo a linha de baixo, sem olhar um símbolo');
});

console.log('\nitens: '+OP.ITENS.length+' · famílias: '+OP.FAMILIAS.length+' · cartões: '+OP.CARTOES.length);
console.log(falhas.length ? 'REPROVADO:\n  '+falhas.join('\n  ') : 'BANCO OK: 0 problemas');
process.exit(falhas.length ? 1 : 0);
