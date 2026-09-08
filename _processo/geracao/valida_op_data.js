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
  return String(s)
    /* entidades numéricas (&#9650;) são como os símbolos dos códigos são
       escritos no banco — sem decodificar, o gate lia tudo como vazio e
       "provava" que nenhuma alternativa fecha */
    .replace(/&#(\d+);/g, function(_,n){ return String.fromCodePoint(parseInt(n,10)); })
    .replace(/&#x([0-9a-f]+);/gi, function(_,n){ return String.fromCodePoint(parseInt(n,16)); })
    .replace(/&Oacute;/g,'Ó').replace(/&Eacute;/g,'É').replace(/&Aacute;/g,'Á')
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

/* ---- 1b. toda figura citada tem de existir no disco ----
   Imagem que não carrega vira questão sem enunciado, e em silêncio: o
   navegador não avisa. Como as figuras são recortadas de PDF por um
   script à parte, o caminho pode desencontrar do banco a qualquer
   mudança de nome. */
var fs=require('fs'), pathmod=require('path');
var DIR_FERR=pathmod.join(__dirname,'..','..','ferramentas');
function conferAcaminho(id, campo, caminho){
  if(!caminho) return;
  if(!fs.existsSync(pathmod.join(DIR_FERR, caminho)))
    reprova(id+': '+campo+' aponta para "'+caminho+'", que não existe em ferramentas/');
}
OP.ITENS.forEach(function(it){
  conferAcaminho(it.id,'figura',it.figura);
  (it.opts||[]).forEach(function(o,i){ conferAcaminho(it.id,'imagem da alternativa '+(i+1),o.img); });
  if(it.figura && !it.figuraAlt) console.log('  aviso: '+it.id+' tem figura sem figuraAlt (descrição para quem não vê a imagem)');
  /* numa questão cujas alternativas são desenhos, ou todas têm imagem ou
     nenhuma tem — meia dúzia de imagem e meia de texto confunde */
  var comImg=(it.opts||[]).filter(function(o){ return o.img; }).length;
  if(comImg && comImg!==(it.opts||[]).length)
    reprova(it.id+': '+comImg+' de '+it.opts.length+' alternativas têm imagem; ou todas ou nenhuma');
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

/* ---- 4. a questão do código tem de decodificar de verdade ----
   Existem DOIS formatos de código nas provas, e o gate precisa ler os dois.
   Ler só um reprovaria o que está certo — e, pior, aprovaria calado um erro
   no formato que ele não entende:

   (a) tabela de DUAS linhas: símbolos em cima, sílabas embaixo, mais uma
       sequência de símbolos. É a de 2025 (1ª fase, Q15).
   (b) tabela de PARES "escrita normal / escrita cifrada", de onde se deduz
       um mapa de letra para letra que depois se aplica à frase. É a do
       Opezino, de 2023 (2ª fase, Q15).

   Nos dois casos o teste é o mesmo: decodificar e comparar com o gabarito. */
function soLetras(s){ return s.toUpperCase().replace(/[^A-ZÁÂÃÀÉÊÍÓÔÕÚÇ]/g,''); }

OP.ITENS.filter(function(i){ return i.eixo==='codigo'; }).forEach(function(it){
  /* ---- formato (c): a questao pede o caminho INVERSO — escrever uma
     palavra no codigo, em vez de ler uma frase. Aqui a prova se faz com
     `chave` (simbolo -> letra) e `alvo` (a palavra pedida): aplica-se a
     chave a cada alternativa e confere-se que so a marcada como certa
     produz o alvo. ---- */
  if(it.chave && it.alvo){
    var certas=[], todas=[];
    it.opts.forEach(function(o){
      var simbolos=limpa(o.t).split(/\s+/).filter(Boolean);
      var palavra=simbolos.map(function(s){ return it.chave[s]||'?'; }).join('');
      todas.push(palavra);
      if(palavra.toUpperCase()===it.alvo.toUpperCase()) certas.push(o);
    });
    if(certas.length!==1)
      reprova(it.id+': '+certas.length+' alternativas produzem "'+it.alvo+'" (li: '+todas.join(', ')+')');
    else if(!certas[0].ok)
      reprova(it.id+': a alternativa que produz "'+it.alvo+'" não é a marcada como certa (li: '+todas.join(', ')+')');
    if(todas.some(function(p){ return p.indexOf('?')>=0; }))
      reprova(it.id+': alguma alternativa usa símbolo que não está na chave (li: '+todas.join(', ')+')');
    return;
  }
  var trs=(it.quadro||'').match(/<tr>[\s\S]*?<\/tr>/g);
  var m=(it.quadro||'').match(/<div class="seq">([\s\S]*?)<\/div>/);
  if(!trs || !m) return;            /* item de código sem tabela+sequência: nada a provar */
  var celulas=trs.map(function(tr){
    return (tr.match(/<td>([\s\S]*?)<\/td>/g)||[]).map(function(td){ return limpa(td.replace(/<\/?td>/g,'')); });
  });
  var gabarito=limpa(it.opts.filter(function(o){ return o.ok; })[0].t);

  if(trs.length===2 && celulas[0].length===celulas[1].length && celulas[0].length>2){
    /* ---- formato (a): símbolo -> sílaba ---- */
    var simbolos=celulas[0], silabas=celulas[1], mapa={};
    simbolos.forEach(function(s,i){ mapa[s]=silabas[i]; });
    var seq=limpa(m[1]).split(/\s+/).filter(Boolean);
    var semPar=seq.filter(function(s){ return !mapa[s]; });
    if(semPar.length){ reprova(it.id+': '+semPar.length+' símbolo(s) da sequência não estão na tabela ('+semPar.join(' ')+')'); return; }
    var saiu=seq.map(function(s){ return mapa[s]; }).join('').replace(/\s/g,'');
    var alvoA=gabarito.replace(/[\s.]/g,'');
    if(saiu.toUpperCase()!==alvoA.toUpperCase())
      reprova(it.id+': a sequência decodifica em "'+saiu+'" mas o gabarito é "'+alvoA+'"');
    var emOrdem=silabas.join('').replace(/\s/g,'').toUpperCase();
    if(alvoA.toUpperCase().indexOf(emOrdem.slice(0,12))===0)
      reprova(it.id+': a tabela está na ordem da frase — dá para responder lendo a linha de baixo, sem olhar um símbolo');
    return;
  }

  if(trs.length>=3){
    /* ---- formato (b): pares palavra normal / palavra cifrada ---- */
    var pares=celulas.slice(1).filter(function(l){ return l.length===2; });
    if(!pares.length){ reprova(it.id+': tabela de código em formato que o gate não reconhece'); return; }
    var letra={}, conflito=null;
    pares.forEach(function(par){
      var a=soLetras(par[0]), b=soLetras(par[1]);
      if(a.length!==b.length){ conflito=conflito||('o par '+par[0]+'/'+par[1]+' tem tamanhos diferentes'); return; }
      for(var i=0;i<a.length;i++){
        if(letra[a[i]] && letra[a[i]]!==b[i]) conflito=conflito||('a letra '+a[i]+' vira '+letra[a[i]]+' e também '+b[i]);
        letra[a[i]]=b[i];
      }
    });
    if(conflito){ reprova(it.id+': a cifra da tabela não fecha — '+conflito); return; }
    var inverso={}; Object.keys(letra).forEach(function(k){ inverso[letra[k]]=k; });
    var desconhecidas=[];
    var decifrada=limpa(m[1]).split('').map(function(ch){
      var C=ch.toUpperCase();
      if(!/[A-ZÁÂÃÀÉÊÍÓÔÕÚÇ]/.test(C)) return ch;
      if(inverso[C]) return inverso[C];
      desconhecidas.push(C); return '?';
    }).join('');
    /* A comparação é por PALAVRA, e não caractere a caractere, por dois
       motivos legítimos: (1) a alternativa certa completa a frase do
       enunciado ("podemos dizer que ele: ACHA A LÍNGUA…"), então ela tem
       palavras a mais; (2) as vogais acentuadas da frase não aparecem na
       tabela de exemplos e saem como '?'. O que se exige é que toda
       palavra cheia decifrada esteja no gabarito. */
    function semAcento(s){
      return s.toUpperCase()
        .replace(/[ÁÂÃÀ]/g,'A').replace(/[ÉÊ]/g,'E').replace(/[Í]/g,'I')
        .replace(/[ÓÔÕ]/g,'O').replace(/[Ú]/g,'U').replace(/[Ç]/g,'C');
    }
    var alvo=semAcento(gabarito).replace(/[^A-Z ]/g,' ');
    var palavras=semAcento(decifrada).replace(/[^A-Z? ]/g,' ').split(/\s+/)
                   .filter(function(w){ return w.length>=3 && w.indexOf('?')<0; });
    var fora=palavras.filter(function(w){ return alvo.indexOf(w)<0; });
    if(!palavras.length){
      reprova(it.id+': não consegui decifrar nenhuma palavra inteira da frase');
    }else if(fora.length){
      reprova(it.id+': a frase decifra em "'+decifrada.trim()+'"; a(s) palavra(s) '+fora.join(', ')+
              ' não aparecem no gabarito "'+gabarito+'"');
    }else if(desconhecidas.length){
      console.log('  aviso: '+it.id+' — a frase usa '+Array.from(new Set(desconhecidas)).join(' ')+
                  ', letras que a tabela de exemplos não mostra; as '+palavras.length+
                  ' palavras inteiras decifram certo ("'+decifrada.trim()+'")');
    }
  }
});

console.log('\nitens: '+OP.ITENS.length+' · famílias: '+OP.FAMILIAS.length+' · cartões: '+OP.CARTOES.length);
console.log(falhas.length ? 'REPROVADO:\n  '+falhas.join('\n  ') : 'BANCO OK: 0 problemas');
process.exit(falhas.length ? 1 : 0);
