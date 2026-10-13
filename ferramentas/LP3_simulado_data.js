/* ============================================================
   LP3_simulado_data.js — BANCO DO SIMULADO de Português · 3º tri · Y2
   AF de Língua Portuguesa em 14/10/2026.  (v2, 11/10/2026)

   POR QUE v2: a v1 (84 itens) cobrava sobretudo "lembrar o que aconteceu
   nas histórias". O roteiro v2 (trabalho/3tri_portugues/_roteiro.md,
   seções "Pistas do material da escola e PESO", "Contos de fadas COMO
   GÊNERO", "Paráfrase e paródia" e "Regra das perguntas") manda:
     · ortografia + plural + dicionário ........ ≈ 55%  (bloco A)
     · conto como gênero + paráfrase/paródia ... ≈ 35%  (bloco B)
     · invenções ................................ ≈ 10%  (bloco C)
     · enredo das histórias no máximo ~10%, e sempre a serviço de um
       elemento do gênero (lugar, magia, problema, solução).
   E manda imitar o jeito da professora (revisão do 2º tri): "COMPLETE AS
   PALAVRAS COM...", "COM SUAS PALAVRAS...", "ESCREVA...".

   FORMATO do OP_data.js, para o componente único OP_questao.js funcionar
   sem nenhuma mudança: id, eixo, origem, enun, texto[], quadro, pede,
   opts[{t, ok|no}], dica, truque, visual, porque, proximo.
   Campo extra (ignorado pelo componente): `tipo` = o tipo de enunciado,
   para o validador contar o banco.
   - Texto de prova (enun, pede, texto, quadro, alternativas) em CAIXA ALTA;
     dica, porque, `no` e proximo em letra normal: é a voz de quem ensina.
   - v3 (12/10): as lacunas de H, J/G, G/GU, C/QU e CH/NH/LH vivem
     DENTRO de um texto curto (como o "complete o texto com a pontuação"
     do material da escola), e não mais numa lista de palavras soltas.
   - v4 (12/10, pedido do Paulo): ortografia só no formato que a prova
     cobra — escrever/reconhecer a palavra certa. Saíram os pares de
     SENTIDO (MOLA × MOLHA, FILHA × FILA × FICHA), as de TEORIA ("o que o
     H faz", "U quietinho", "GIGANTE: as duas letras têm o mesmo som?",
     "por que QUEIJO tem QU", "CH, NH e LH são...") e a de classificar
     ("qual não começa com H"). Dica, truque, porque e fala de erro
     ficaram curtos: mostram a palavra certa, sem conversa de som.
   - Distrator INDEFENSÁVEL. Nos textos com lacunas, NENHUMA palavra
     preenchida com a letra errada forma outra palavra de verdade (JATO,
     NICHO, ORA, IENA, GANHO, TENHA, MINHO... ficaram de fora de propósito).
   - Vilão só o Lobo Mau; o Gigante nunca é rotulado (decisão de 11/10).
   - Nada do livro "Invenções" da escola (não foi fornecido).
   Validação: validador Node fora do projeto (ver relatório).
   ============================================================ */
window.LP3S = (function(){

/* ---------- AS 12 FAMÍLIAS ----------
   bloco A = ortografia/plural/dicionário · B = gênero/paráfrase/paródia ·
   C = invenções.  `cota` = quantas entram na "Prova inteira" (12):
   7 do bloco A + 4 do B + 1 do C — o mesmo peso do roteiro.          */
var FAMILIAS = [
  {k:'h',      bloco:'A', cota:1, nome:'Letra H',               cor:'#38bdf8',
   truque:'Com H: HOJE, HOMEM, HOTEL, HOSPITAL, HORTA. Sem H: OVO, UVA, ILHA, ESCOLA.'},
  {k:'jg',     bloco:'A', cota:1, nome:'J ou G',                cor:'#fbbf24',
   truque:'Com A, O e U, é J: JANELA, JOGO, CAJU. Com G: GELO, GIRAFA, GIGANTE. Com J: JEITO, JIPE, JILÓ.'},
  {k:'ggu',    bloco:'A', cota:1, nome:'G ou GU',               cor:'#fb923c',
   truque:'Só G: GATO, GORILA, LAGO. Com GU: FOGUETE, GUITARRA, ÁGUIA.'},
  {k:'cqu',    bloco:'A', cota:1, nome:'C ou QU',               cor:'#34d399',
   truque:'Só C: CASA, COPO, CAVALO. Com QU: QUEIJO, ESQUILO, MÁQUINA.'},
  {k:'dig',    bloco:'A', cota:1, nome:'CH · NH · LH',          cor:'#2dd4bf',
   truque:'CH: CHUVA, CACHORRO. NH: GALINHA, NINHO. LH: FOLHA, ABELHA.'},
  {k:'plural', bloco:'A', cota:1, nome:'Plural',                cor:'#f87171',
   truque:'Vogal: põe S. R ou Z: põe ES. ÃO vira ÕES. L vira IS. M vira NS.'},
  {k:'dic',    bloco:'A', cota:1, nome:'Dicionário',            cor:'#60a5fa',
   truque:'No dicionário vale a ordem do alfabeto. Primeira letra igual? Olhe a segunda.'},
  {k:'conto',  bloco:'B', cota:1, nome:'Conto de fadas',        cor:'#f472b6',
   truque:'Conto de fadas: história inventada e antiga. Começo (Era uma vez), meio (um problema), fim (o problema se resolve).'},
  {k:'leitura',bloco:'B', cota:1, nome:'Elementos do conto',    cor:'#e879f9',
   truque:'Procure no conto: o tempo (Era uma vez), o lugar, a magia, o problema e a solução.'},
  {k:'parafrase',bloco:'B',cota:1, nome:'Paráfrase',            cor:'#a78bfa',
   truque:'Paráfrase: as mesmas ideias com outras palavras. O sentido não muda.'},
  {k:'parodia',bloco:'B', cota:1, nome:'Paródia',               cor:'#c084fc',
   truque:'Paródia: imita o original e muda algo de propósito, quase sempre para ficar engraçado.'},
  {k:'invento',bloco:'C', cota:1, nome:'Invenções',             cor:'#facc15',
   truque:'Invenção: alguém criou, não existia antes. Descoberta: já existia, alguém achou.'}
];
/* (são 12 entradas porque "conto" e "leitura" são duas famílias do mesmo
   tema — gênero em si × achar os elementos num trecho; a cota de cada uma
   é 1, e o bloco B soma 4.) */

var SEP = ' · ';

/* Regras e falas padrão das listas de lacunas, por família. */
/* v3 (12/10): as lacunas deixam de ser LISTA de palavras soltas e passam a
   viver DENTRO de um texto curto, como no material da escola ("O diálogo
   abaixo está sem pontuação. Leia atentamente e complete o texto"). A
   criança lê o texto, entende as palavras e aplica a regra em cada lacuna. */
var LAC = {
  jg:  {enun:'LEIA O TEXTO E COMPLETE AS PALAVRAS COM J OU G:',
        dica:'Leia o texto inteiro primeiro. Depois lembre como cada palavra se escreve. Com A, O e U, é J.',
        proximo:'Com A, O e U, use J: JANELA, JOGO, CAJU.'},
  ggu: {enun:'LEIA O TEXTO E COMPLETE AS PALAVRAS COM G OU GU:',
        dica:'Leia o texto inteiro primeiro. Depois lembre como cada palavra se escreve.',
        proximo:'Lembre: GATO e GORILA, só G. FOGUETE e GUITARRA, com GU.'},
  cqu: {enun:'LEIA O TEXTO E COMPLETE AS PALAVRAS COM C OU QU:',
        dica:'Leia o texto inteiro primeiro. Depois lembre como cada palavra se escreve.',
        proximo:'Lembre: CASA e COPO, só C. QUEIJO e ESQUILO, com QU.'},
  dig: {enun:'LEIA O TEXTO E COMPLETE AS PALAVRAS COM CH, NH OU LH:',
        dica:'Leia o texto inteiro primeiro, para saber que palavra é. Depois lembre como ela se escreve.',
        proximo:'Descubra a palavra pelo texto e lembre como ela se escreve.'}
};

/* Texto com lacunas no formato da prova: o texto vai no quadro, com cada
   lacuna numerada; as alternativas são a SEQUÊNCIA de letras, na ordem.
   linhas : frases do texto; '[G]ELO' marca a letra que falta.
   erradas: 'J J J G' (uma por distrator, letras separadas por espaço).
   A fala de cada distrator aponta a palavra que ficou errada e mostra como
   ela ficaria — sempre uma palavra que NÃO existe (conferido à mão). */
var RE_LAC = /([A-ZÀ-Ú]*)\[([A-Z]+)\]([A-ZÀ-Ú]*)/g;
function lac(id, eixo, linhas, erradas, extra){
  var L = LAC[eixo], ws = [];
  linhas.forEach(function(l){ l.replace(RE_LAC, function(_,a,x,b){ ws.push({a:a, l:x, b:b}); return _; }); });
  var certa = ws.map(function(w){ return w.l; });
  var n = 0;
  var quadro = '<div class="lacs" style="display:block;text-align:left;line-height:2.2">' + linhas.map(function(l){
    return '<div>' + l.replace(RE_LAC, function(_,a,x,b){ n++;
      return '<span class="lac"><i>'+n+'</i>'+a+'<span class="lb"></span>'+b+'</span>'; }) + '</div>';
  }).join('') + '</div>';
  var opts = [{t:certa.join(SEP), ok:1}];
  erradas.forEach(function(e){
    var arr = e.split(' ');
    var fala = [];
    arr.forEach(function(l,i){
      if(l===certa[i]) return;
      var w = ws[i];
      fala.push('Na '+(i+1)+', com '+l+' fica '+w.a+l+w.b+', que não existe: o certo é '+w.a+w.l+w.b+'.');
    });
    opts.push({t:arr.join(SEP), no:fala.join(' ')});
  });
  var it = {
    id:id, eixo:eixo, tipo:'complete o texto',
    enun:L.enun, quadro:quadro,
    pede:'QUAIS LETRAS COMPLETAM AS LACUNAS 1 A '+ws.length+', NA ORDEM?',
    opts:opts, dica:L.dica,
    visual:linhas.map(function(l){ return '<p class="vx">'+l.replace(RE_LAC, function(_,a,x,b){
      return a+'<span class="mk">'+x+'</span>'+b; })+'</p>'; }).join(''),
    porque:'As palavras certas são: '+ws.map(function(w){ return w.a+w.l+w.b; }).join(', ')+'.',
    proximo:L.proximo,
    lacunas:ws
  };
  if(extra) for(var k in extra) it[k]=extra[k];
  return it;
}

/* Lacunas do H dentro de um texto: o H não tem som, então a pergunta é EM
   QUAIS palavras numeradas ele falta. '[H]OJE' = falta H; '[]OVO' = não tem. */
function nums(a){
  a = a.slice().sort(function(x,y){ return x-y; });
  if(a.length===1) return 'SÓ NA '+a[0];
  return 'NA '+a.slice(0,-1).join(', ')+' E '+a[a.length-1];
}
var RE_H = /\[(H?)\]([A-ZÀ-Ú]+)/g;
function hlac(id, linhas, erradas){
  var ws = [];
  linhas.forEach(function(l){ l.replace(RE_H, function(_,h,w){ ws.push({tem:!!h, w:w}); return _; }); });
  var certa = []; ws.forEach(function(w,i){ if(w.tem) certa.push(i+1); });
  var n = 0;
  var quadro = '<div class="lacs" style="display:block;text-align:left;line-height:2.2">' + linhas.map(function(l){
    return '<div>' + l.replace(RE_H, function(_,h,w){ n++;
      return '<span class="lac"><i>'+n+'</i><span class="lb"></span>'+w+'</span>'; }) + '</div>';
  }).join('') + '</div>';
  var opts = [{t:nums(certa), ok:1}];
  erradas.forEach(function(e){
    var fala = [];
    ws.forEach(function(w,i){
      var marcou = e.indexOf(i+1)>=0;
      if(w.tem && !marcou) fala.push('Faltou o H na '+(i+1)+': sem ele fica '+w.w+', que não existe; o certo é H'+w.w+'.');
      if(!w.tem && marcou) fala.push('A '+(i+1)+' não tem H: H'+w.w+' não existe; o certo é '+w.w+'.');
    });
    opts.push({t:nums(e), no:fala.join(' ')});
  });
  return {
    id:id, eixo:'h', tipo:'complete o texto',
    enun:'LEIA O TEXTO. ALGUMAS PALAVRAS NUMERADAS PERDERAM O H DO COMEÇO.', quadro:quadro,
    pede:'EM QUAIS PALAVRAS NUMERADAS FALTA O H?',
    opts:opts,
    dica:'Leia cada palavra numerada e lembre como ela aparece escrita nos livros.',
    visual:linhas.map(function(l){ return '<p class="vx">'+l.replace(RE_H, function(_,h,w){
      return (h?'<span class="mk">H</span>':'')+w; })+'</p>'; }).join(''),
    porque:'As palavras certas são: '+ws.map(function(w){ return (w.tem?'H':'')+w.w; }).join(', ')+'.',
    proximo:'Com H: HOJE, HOMEM, HOTEL, HOSPITAL, HORTA. Sem H: OVO, UVA, ILHA.',
    lacunas:ws.map(function(w){ return {a:'', l:w.tem?'H':'', b:w.w}; })
  };
}

/* "ESCREVA O PLURAL DE:" — pares [singular, plural]; erradas: objetos
   {posição: forma errada}, com 1 ou 2 trocas cada. A fala explica a regra
   da palavra que ficou errada, deduzida do final dela. */
function regraPlural(s){
  if(/ÃO$/.test(s)) return 'termina em ÃO, que vira ÕES';
  if(/[AEOU]L$/.test(s)) return 'termina em L, que vira IS';
  if(/M$/.test(s)) return 'termina em M, que vira NS';
  if(/[RZ]$/.test(s)) return 'termina em '+s.slice(-1)+', então ganha ES';
  return 'termina em vogal, então ganha só S';
}
function plu(id, pares, erradas, extra){
  var quadro = '<div class="lacs plu">' + pares.map(function(p,i){
    return '<span class="lac"><i>'+(i+1)+'</i>'+p[0]+'</span>';
  }).join('') + '</div>';
  var opts = [{t:pares.map(function(p){ return p[1]; }).join(SEP), ok:1}];
  erradas.forEach(function(e){
    var fala = [];
    var seq = pares.map(function(p,i){
      if(e[i]===undefined) return p[1];
      fala.push(e[i]+' não serve: '+p[0]+' '+regraPlural(p[0])+' e fica '+p[1]+'.');
      return e[i];
    });
    opts.push({t:seq.join(SEP), no:fala.join(' ')});
  });
  var it = {
    id:id, eixo:'plural', tipo:'escreva o plural',
    enun:'ESCREVA O PLURAL DE:', quadro:quadro,
    pede:'QUAL É O PLURAL DAS PALAVRAS, NA ORDEM?',
    opts:opts,
    dica:'Olhe como cada palavra TERMINA: vogal, R ou Z, ÃO, L ou M.',
    visual:'<div class="pcs">'+pares.map(function(p){
      return '<span class="pc">'+p[0]+' &rarr; <span class="mk">'+p[1]+'</span></span>'; }).join('')+'</div>',
    porque:pares.map(function(p){ return p[0]+' '+regraPlural(p[0])+': '+p[1]+'.'; }).join(' '),
    proximo:'Uma palavra de cada vez: olhe o final dela e aplique a regra.'
  };
  if(extra) for(var k in extra) it[k]=extra[k];
  return it;
}

/* textos de apoio (trechos NOVOS de contos, para achar os elementos) */
var TX_PEDRO = [
  'ERA UMA VEZ, NUM REINO MUITO DISTANTE,',
  'UM MENINO CHAMADO PEDRO.',
  'UM DIA, O RIO DO REINO SECOU,',
  'E TODOS FICARAM COM SEDE.',
  'UMA FADA DEU A PEDRO UMA CONCHA MÁGICA.',
  'PEDRO SOPROU A CONCHA, E A ÁGUA VOLTOU A CORRER.',
  'E TODOS VIVERAM FELIZES PARA SEMPRE.'
];
var TX_PORQ = [
  'ERA UMA VEZ TRÊS PORQUINHOS IRMÃOS.',
  'O PRIMEIRO FEZ UMA CASA DE PALHA,',
  'O SEGUNDO, UMA CASA DE MADEIRA,',
  'E O TERCEIRO, UMA CASA DE TIJOLOS.',
  'O LOBO MAU SOPROU E DERRUBOU AS CASAS DE PALHA E DE MADEIRA.',
  'OS TRÊS PORQUINHOS CORRERAM PARA A CASA DE TIJOLOS.',
  'O LOBO SOPROU, SOPROU, MAS A CASA NÃO CAIU.'
];
var TX_CIND = [
  'ERA UMA VEZ UMA MOÇA CHAMADA CINDERELA.',
  'ELA QUERIA MUITO IR AO BAILE DO CASTELO.',
  'UMA FADA MADRINHA APARECEU E, COM SUA VARINHA,',
  'TRANSFORMOU UMA ABÓBORA EM CARRUAGEM',
  'E O VESTIDO VELHO EM UM VESTIDO LINDO.',
  'MAS AVISOU: À MEIA-NOITE, O ENCANTO IA ACABAR.'
];
var TX_PARODIA = [
  'ERA UMA VEZ UMA MENINA CHAMADA CHAPEUZINHO AZUL.',
  'ELA FOI DE PATINETE LEVAR SANDUÍCHE PARA O VOVÔ.',
  'NO CAMINHO, ENCONTROU UM LOBO QUE SÓ COMIA SALADA.'
];
var TX_INVENTO = [
  'AS PESSOAS INVENTAM COISAS PARA RESOLVER PROBLEMAS',
  'E FACILITAR A VIDA. A LÂMPADA, POR EXEMPLO, ILUMINA A NOITE.',
  'JÁ O FOGO NÃO FOI INVENTADO: ELE JÁ EXISTIA NA NATUREZA.',
  'ENCONTRAR ALGO QUE JÁ EXISTIA É UMA DESCOBERTA.'
];

var ITENS = [];

/* =================== BLOCO A · LETRA H =================== */
ITENS.push(
hlac('SH1', ['OI, VOVÓ!','[H]OJE FUI AO [H]OSPITAL COM O PAPAI.','NA VOLTA, COMI UM []OVO E UMA []UVA.','BEIJOS DO PEDRO.'], [[1],[1,2,3,4],[2,4]]),
hlac('SH2', ['O [H]OMEM DO [H]OTEL MORA NUMA []ILHA.','ELE TEM UM []ELEFANTE DE BRINQUEDO','E UM [H]ELICÓPTERO DE VERDADE.'], [[1,2],[1,2,3,4,5],[2,5]]),
hlac('SH3', ['NA []ESCOLA, A PROFESSORA CONTOU','A [H]ISTÓRIA DE UM [H]ERÓI.','ELE PLANTOU UMA [H]ORTA','E GANHOU UM []ANEL DE PRESENTE.'], [[2,3],[1,2,3,4],[2,4,5]]),

{id:'SH4', eixo:'h', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'OVO', ok:1},
  {t:'HOVO', no:'OVO não tem H.'},
  {t:'OVU', no:'O certo é OVO.'},
  {t:'HOVU', no:'O certo é OVO, sem H.'}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se OVO, sem H.',
 proximo:'Sem H: OVO, UVA, ILHA, ESCOLA.'},

{id:'SH5', eixo:'h', tipo:'qual grupo',
 pede:'EM QUAL GRUPO TODAS AS PALAVRAS ESTÃO ESCRITAS CERTO?',
 opts:[
  {t:'HINO · HOMEM · HORTA', ok:1},
  {t:'INO · HOMEM · HORTA', no:'O certo é HINO, com H.'},
  {t:'HINO · OMEM · HORTA', no:'O certo é HOMEM, com H.'},
  {t:'HINO · HOMEM · ORTA', no:'O certo é HORTA, com H.'}
 ],
 dica:'Confira cada palavra do grupo.',
 porque:'Escreve-se HINO, HOMEM e HORTA, com H.',
 proximo:'Uma palavra errada já estraga o grupo.'},

{id:'SH6', eixo:'h', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'OJE', no:'O certo é HOJE, com H.'},
  {t:'HOJE', ok:1},
  {t:'HOGE', no:'O certo é HOJE, com J.'},
  {t:'OGE', no:'O certo é HOJE, com H e com J.'}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se HOJE, com H.',
 proximo:'Com H: HOJE, HOMEM, HOTEL, HOSPITAL, HORTA.'},

{id:'SH7', eixo:'h', tipo:'complete as palavras',
 enun:'COMPLETE A FRASE:',
 quadro:'O <span class="lb"></span>ELICÓPTERO POUSOU NO <span class="lb"></span>OSPITAL.',
 pede:'QUE LETRA FALTA NAS PALAVRAS DA FRASE?',
 opts:[
  {t:'H NAS DUAS PALAVRAS', ok:1},
  {t:'H SÓ NA PRIMEIRA', no:'O certo é HOSPITAL, com H.'},
  {t:'H SÓ NA SEGUNDA', no:'O certo é HELICÓPTERO, com H.'},
  {t:'NENHUMA: JÁ ESTÁ CERTO ASSIM', no:'O certo é HELICÓPTERO e HOSPITAL, com H.'}
 ],
 dica:'Lembre como as duas palavras se escrevem.',
 visual:'<p class="vx">O <span class="mk">H</span>ELICÓPTERO POUSOU NO <span class="mk">H</span>OSPITAL.</p>',
 porque:'Escreve-se HELICÓPTERO e HOSPITAL, com H.',
 proximo:'Antes de responder, escreva as palavras inteiras na cabeça.'},

{id:'SH8', eixo:'h', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'ISTÓRIA', no:'O certo é HISTÓRIA, com H.'},
  {t:'HISTÓRRIA', no:'O certo é HISTÓRIA, com um R só.'},
  {t:'HISTÓRIA', ok:1},
  {t:'ISTÓRRIA', no:'O certo é HISTÓRIA, com H e com um R só.'}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se HISTÓRIA, com H.',
 proximo:'Com H: HISTÓRIA, HERÓI, HINO, HIPOPÓTAMO.'},

{id:'SH9', eixo:'h', tipo:'qual está escrita certo',
 pede:'QUAL FRASE ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'HOJE O HOMEM FOI AO HOTEL.', ok:1},
  {t:'OJE O HOMEM FOI AO HOTEL.', no:'O certo é HOJE, com H.'},
  {t:'HOJE O OMEM FOI AO HOTEL.', no:'O certo é HOMEM, com H.'},
  {t:'HOJE O HOMEM FOI AO OTEL.', no:'O certo é HOTEL, com H.'}
 ],
 dica:'Confira cada palavra da frase.',
 visual:'<p class="vx"><span class="mk">H</span>OJE O <span class="mk">H</span>OMEM FOI AO <span class="mk">H</span>OTEL.</p>',
 porque:'Escreve-se HOJE, HOMEM e HOTEL, com H.',
 proximo:'Frase inteira: confira palavra por palavra.'}
);

/* =================== BLOCO A · J OU G =================== */
ITENS.push(
lac('SJG1','jg', ['O [J]ACARÉ E A [G]IRAFA FORAM À FEIRA.','COMPRARAM LARAN[J]A, QUEI[J]O E [G]ELO.'], ['G G J J G','J J J J G','J G J J J']),
lac('SJG2','jg', ['O MÁ[G]ICO ABRIU O LIVRO NA PÁ[G]INA DOIS.','TIROU DE DENTRO UMA [J]OIA E UM [J]ABUTI!'], ['J G J J','G J J J','G G G J']),
lac('SJG3','jg', ['O [G]IGANTE ACORDOU COM FOME.','COMEU FEI[J]ÃO NUMA TI[G]ELA','E DEU UM BEI[J]O NA GALINHA.'], ['J J G J','G G G J','G J J J']),
lac('SJG4','jg', ['DE MANHÃ, O RELÓ[G]IO TOCOU.','O MENINO OLHOU PELA [J]ANELA E VIU UM [J]IPE.','QUE [G]ENTE ANIMADA NA RUA!'], ['J J J G','G G J G','G J G J']),
lac('SJG5','jg', ['O LEÃO BALANÇOU A [J]UBA.','O [G]IRASSOL ABRIU NO SOL.','A [G]ELADEIRA FICOU SEM SU[J]EIRA.'], ['G G G J','J J G J','J G J G']),

{id:'SJG6', eixo:'jg', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'GELADEIRA', ok:1},
  {t:'JELADEIRA', no:'O certo é GELADEIRA, com G.'},
  {t:'GELADERA', no:'O certo é GELADEIRA, com EI.'},
  {t:'JELADERA', no:'O certo é GELADEIRA, com G e com EI.'}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se GELADEIRA, com G.',
 proximo:'Com G: GELO, GELADEIRA, GIRAFA, GIGANTE.'},

{id:'SJG7', eixo:'jg', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'GEITO', no:'O certo é JEITO, com J.'},
  {t:'JEITU', no:'O certo é JEITO, com O no fim.'},
  {t:'GEITU', no:'O certo é JEITO, com J e com O no fim.'},
  {t:'JEITO', ok:1}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se JEITO, com J.',
 proximo:'Com J: JEITO, JIPE, JILÓ, CANJICA.'},

{id:'SJG8', eixo:'jg', tipo:'qual está escrita certo',
 pede:'EM QUAL GRUPO TODAS AS PALAVRAS ESTÃO ESCRITAS CERTO?',
 opts:[
  {t:'JACARÉ · GELO · JUBA', ok:1},
  {t:'GACARÉ · GELO · JUBA', no:'O certo é JACARÉ, com J.'},
  {t:'JACARÉ · JELO · JUBA', no:'O certo é GELO, com G.'},
  {t:'JACARÉ · GELO · GUBA', no:'O certo é JUBA, com J.'}
 ],
 dica:'Confira cada palavra do grupo.',
 porque:'Escreve-se JACARÉ e JUBA, com J, e GELO, com G.',
 proximo:'Uma palavra errada já estraga o grupo.'},

{id:'SJG9', eixo:'jg', tipo:'qual está escrita certo',
 pede:'QUAL FRASE ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'A GIRAFA COMEU JILÓ NA TIGELA.', ok:1},
  {t:'A JIRAFA COMEU JILÓ NA TIGELA.', no:'O certo é GIRAFA, com G.'},
  {t:'A GIRAFA COMEU GILÓ NA TIGELA.', no:'O certo é JILÓ, com J.'},
  {t:'A GIRAFA COMEU JILÓ NA TIJELA.', no:'O certo é TIGELA, com G.'}
 ],
 dica:'Confira cada palavra da frase.',
 visual:'<p class="vx">A <span class="mk">G</span>IRAFA COMEU <span class="mk">J</span>ILÓ NA TI<span class="mk">G</span>ELA.</p>',
 porque:'Escreve-se GIRAFA e TIGELA, com G, e JILÓ, com J.',
 proximo:'Frase inteira: confira palavra por palavra.'}
);

/* =================== BLOCO A · G OU GU =================== */
ITENS.push(
lac('SGG1','ggu', ['NA FESTA JUNINA, TEVE FO[GU]EIRA E FO[GU]ETE.','O [G]ATO DORMIU PERTO DO LA[G]O.'], ['G GU G G','GU G G G','GU GU GU G']),
lac('SGG2','ggu', ['A Á[GU]IA VOOU SOBRE A MAN[GU]EIRA.','LÁ EMBAIXO, UM [G]ORILA TOCAVA [GU]ITARRA.'], ['G GU G GU','GU GU GU GU','GU GU G G']),
lac('SGG3','ggu', ['A [G]ALINHA ACHOU UMA A[G]ULHA NO [G]ALHO.','A PRE[GU]IÇA NEM ACORDOU.'], ['GU G G GU','G G G G','G GU G GU']),
lac('SGG4','ggu', ['AS FORMIGAS SAÍRAM DO FORMI[GU]EIRO.','SUBIRAM NO [GU]INDASTE E NA [G]OLA DA CAMISA.','DEPOIS, BRINCARAM DE BOLINHA DE [G]UDE.'], ['G GU G G','GU G G G','GU GU GU G']),

{id:'SGG5', eixo:'ggu', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'GUITARRA', ok:1},
  {t:'GITARRA', no:'O certo é GUITARRA, com GU.'},
  {t:'GUITARA', no:'O certo é GUITARRA, com RR.'},
  {t:'GITARA', no:'O certo é GUITARRA, com GU e com RR.'}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se GUITARRA, com GU.',
 proximo:'Com GU: GUITARRA, FOGUETE, ÁGUIA, MANGUEIRA.'},

{id:'SGG6', eixo:'ggu', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'FOGEIRA', no:'O certo é FOGUEIRA, com GU.'},
  {t:'FOGUEIRA', ok:1},
  {t:'FOGUERA', no:'O certo é FOGUEIRA, com EI.'},
  {t:'FOGERA', no:'O certo é FOGUEIRA, com GU e com EI.'}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se FOGUEIRA, com GU.',
 proximo:'Com GU: FOGUEIRA, FOGUETE, GUERRA, PREGUIÇA.'},

{id:'SGG7', eixo:'ggu', tipo:'qual está escrita certo',
 pede:'QUAL FRASE ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'A ÁGIA VOOU PERTO DO FOGUETE.', no:'O certo é ÁGUIA, com GU.'},
  {t:'A ÁGUIA VOOU PERTO DO FOGETE.', no:'O certo é FOGUETE, com GU.'},
  {t:'A ÁGUIA VOOU PERTO DO FOGUETE.', ok:1},
  {t:'A ÁGIA VOOU PERTO DO FOGETE.', no:'O certo é ÁGUIA e FOGUETE, com GU.'}
 ],
 dica:'Confira cada palavra da frase.',
 visual:'<p class="vx">A Á<span class="mk">GU</span>IA VOOU PERTO DO FO<span class="mk">GU</span>ETE.</p>',
 porque:'Escreve-se ÁGUIA e FOGUETE, com GU.',
 proximo:'Frase inteira: confira palavra por palavra.'},

{id:'SGG8', eixo:'ggu', tipo:'qual está escrita errado',
 enun:'LEIA A FRASE:', quadro:'NA FESTA TEVE FOGUEIRA, PIPOCA E GITARRA.',
 pede:'QUAL PALAVRA DA FRASE ESTÁ ESCRITA ERRADO?',
 opts:[
  {t:'FESTA', no:'FESTA está certa.'},
  {t:'FOGUEIRA', no:'FOGUEIRA está certa.'},
  {t:'PIPOCA', no:'PIPOCA está certa.'},
  {t:'GITARRA', ok:1}
 ],
 dica:'Leia cada palavra com calma. Uma está escrita errado.',
 visual:'<p class="vx">O certo é G<span class="mk">U</span>ITARRA.</p>',
 porque:'O certo é GUITARRA, com GU.',
 proximo:'Leia a frase palavra por palavra.'}
);

/* =================== BLOCO A · C OU QU =================== */
ITENS.push(
lac('SCQ1','cqu', ['O ES[QU]ILO MORA NA ÁRVORE, PERTO DA [C]ASA.','ELE GUARDA NOZES NUM [C]OPO E ADORA [QU]EIJO.'], ['C C C QU','QU QU C QU','QU C C C']),
lac('SCQ2','cqu', ['O MOS[QU]ITO PICOU O [C]AVALO.','O PERI[QU]ITO RIU, E A [C]ORUJA TAMBÉM.'], ['C C QU C','QU QU QU C','QU C C C']),
lac('SCQ3','cqu', ['A MÁ[QU]INA FEZ SUCO DE CA[QU]I.','O SUCO FICOU [QU]ENTE, MAS O [C]OELHO GOSTOU.'], ['C QU QU C','QU C QU C','QU QU QU QU']),
lac('SCQ4','cqu', ['NO VERÃO, A VOVÓ USA UM LE[QU]E.','ELA DORME NUMA [C]AMA AZUL,','COME [QU]IABO NO ALMOÇO E BEBE [C]AFÉ.'], ['C C QU C','QU QU QU C','QU C C C']),

{id:'SCQ5', eixo:'cqu', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'MOSCITO', no:'O certo é MOSQUITO, com QU.'},
  {t:'MOSQUITO', ok:1},
  {t:'MOSQITO', no:'O certo é MOSQUITO: faltou o U.'},
  {t:'MOSCUITO', no:'O certo é MOSQUITO, com QU.'}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se MOSQUITO, com QU.',
 proximo:'Com QU: MOSQUITO, ESQUILO, MÁQUINA, PERIQUITO.'},

{id:'SCQ6', eixo:'cqu', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'CEIJO', no:'O certo é QUEIJO, com QU.'},
  {t:'QEIJO', no:'O certo é QUEIJO: faltou o U.'},
  {t:'QUEIGO', no:'O certo é QUEIJO, com J.'},
  {t:'QUEIJO', ok:1}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se QUEIJO, com QU e com J.',
 proximo:'Com QU: QUEIJO, QUENTE, LEQUE, QUIABO.'},

{id:'SCQ7', eixo:'cqu', tipo:'qual está escrita certo',
 pede:'EM QUAL GRUPO TODAS AS PALAVRAS ESTÃO ESCRITAS CERTO?',
 opts:[
  {t:'CASA · QUIABO · CUBO', ok:1},
  {t:'QUASA · QUIABO · CUBO', no:'O certo é CASA, só com C.'},
  {t:'CASA · CIABO · CUBO', no:'O certo é QUIABO, com QU.'},
  {t:'CASA · QUIABO · QUUBO', no:'O certo é CUBO, só com C.'}
 ],
 dica:'Confira cada palavra do grupo.',
 porque:'Escreve-se CASA e CUBO, com C, e QUIABO, com QU.',
 proximo:'Uma palavra errada já estraga o grupo.'},

{id:'SCQ8', eixo:'cqu', tipo:'qual está escrita errado',
 enun:'LEIA A FRASE:', quadro:'O PERIQUITO E O CAVALO COMERAM CIABO.',
 pede:'QUAL PALAVRA DA FRASE ESTÁ ESCRITA ERRADO?',
 opts:[
  {t:'PERIQUITO', no:'PERIQUITO está certa.'},
  {t:'CIABO', ok:1},
  {t:'CAVALO', no:'CAVALO está certa.'},
  {t:'COMERAM', no:'COMERAM está certa.'}
 ],
 dica:'Leia cada palavra com calma. Uma está escrita errado.',
 visual:'<p class="vx">O certo é <span class="mk">QU</span>IABO.</p>',
 porque:'O certo é QUIABO, com QU.',
 proximo:'Leia a frase palavra por palavra.'}
);

/* =================== BLOCO A · CH, NH, LH =================== */
ITENS.push(
lac('SDG1','dig', ['A [CH]UVA CAIU NO QUINTAL.','A GALI[NH]A CORREU PARA O NI[NH]O,','E A ABE[LH]A SE ESCONDEU NA FLOR.'], ['NH NH NH LH','CH LH NH LH','CH NH NH NH']),
lac('SDG2','dig', ['O CA[CH]ORRO ACHOU UMA FO[LH]A NO CAMI[NH]O.','DEPOIS, CORREU PARA A COZI[NH]A.'], ['NH LH NH NH','CH NH NH NH','CH LH LH NH']),
lac('SDG3','dig', ['A OVE[LH]A E O COE[LH]O DORMIRAM NA PA[LH]A.','DE MANHÃ, TOMARAM BA[NH]O.'], ['NH LH LH NH','LH LH CH NH','LH LH LH LH']),
lac('SDG4','dig', ['A ARA[NH]A SUBIU NO [CH]INELO DO MENINO.','ELE GUARDOU O DI[NH]EIRO E ABRIU BEM O O[LH]O.'], ['LH CH NH LH','NH LH NH LH','NH CH NH NH']),

/* v4: SDG5 e SDG6 eram MOLA × MOLHA e "ANA É ___ DA DONA ROSA" (FILHA ×
   FILA × FICHA): todas as opções existiam e a pergunta virava de sentido.
   Agora é completar a palavra, como a prova cobra. */
{id:'SDG5', eixo:'dig', tipo:'complete a palavra',
 enun:'COMPLETE A PALAVRA:',
 quadro:'A GALI<span class="lb"></span>A BOTOU UM OVO.',
 pede:'QUE LETRAS COMPLETAM A PALAVRA?',
 opts:[
  {t:'LH', no:'GALILHA não existe: o certo é GALINHA.'},
  {t:'NH', ok:1},
  {t:'CH', no:'GALICHA não existe: o certo é GALINHA.'}
 ],
 dica:'Leia a palavra inteira e lembre como ela se escreve.',
 visual:'<p class="vx">A GALI<span class="mk">NH</span>A BOTOU UM OVO.</p>',
 porque:'Escreve-se GALINHA, com NH.',
 proximo:'Com NH: GALINHA, NINHO, CAMINHO, ARANHA.'},

{id:'SDG6', eixo:'dig', tipo:'complete a palavra',
 enun:'COMPLETE A PALAVRA:',
 quadro:'O CA<span class="lb"></span>ORRO LATIU PARA O CARTEIRO.',
 pede:'QUE LETRAS COMPLETAM A PALAVRA?',
 opts:[
  {t:'NH', no:'CANHORRO não existe: o certo é CACHORRO.'},
  {t:'LH', no:'CALHORRO não existe: o certo é CACHORRO.'},
  {t:'CH', ok:1}
 ],
 dica:'Leia a palavra inteira e lembre como ela se escreve.',
 visual:'<p class="vx">O CA<span class="mk">CH</span>ORRO LATIU PARA O CARTEIRO.</p>',
 porque:'Escreve-se CACHORRO, com CH.',
 proximo:'Com CH: CACHORRO, CHUVA, CHAVE, CHINELO.'},

{id:'SDG7', eixo:'dig', tipo:'complete a palavra',
 enun:'COMPLETE A PALAVRA:',
 quadro:'A OVE<span class="lb"></span>A DORMIU NO PASTO.',
 pede:'QUE LETRAS COMPLETAM A PALAVRA?',
 opts:[
  {t:'LH', ok:1},
  {t:'NH', no:'OVENHA não existe: o certo é OVELHA.'},
  {t:'CH', no:'OVECHA não existe: o certo é OVELHA.'}
 ],
 dica:'Leia a palavra inteira e lembre como ela se escreve.',
 visual:'<p class="vx">A OVE<span class="mk">LH</span>A DORMIU NO PASTO.</p>',
 porque:'Escreve-se OVELHA, com LH.',
 proximo:'Com LH: OVELHA, FOLHA, ABELHA, COELHO.'},

{id:'SDG8', eixo:'dig', tipo:'qual está escrita certo',
 pede:'QUAL PALAVRA ESTÁ ESCRITA CERTO?',
 opts:[
  {t:'COENHO', no:'O certo é COELHO, com LH.'},
  {t:'COELIO', no:'O certo é COELHO, com LH.'},
  {t:'COELHO', ok:1},
  {t:'COELO', no:'O certo é COELHO: faltou o H.'}
 ],
 dica:'Leia as quatro com calma. Só uma está escrita certo.',
 porque:'Escreve-se COELHO, com LH.',
 proximo:'Com LH: COELHO, FOLHA, ABELHA, OVELHA.'}
);

/* =================== BLOCO A · PLURAL =================== */
ITENS.push(
plu('SPL1', [['FLOR','FLORES'],['AVIÃO','AVIÕES'],['ANIMAL','ANIMAIS']], [{0:'FLORS'},{1:'AVIÃOS'},{2:'ANIMALS'}]),
plu('SPL2', [['CASA','CASAS'],['LUZ','LUZES'],['HOMEM','HOMENS'],['BALÃO','BALÕES']], [{1:'LUZS'},{2:'HOMEMS'},{3:'BALÃOS'}]),
plu('SPL3', [['MAR','MARES'],['JORNAL','JORNAIS'],['NUVEM','NUVENS'],['LOBO','LOBOS']], [{0:'MARS'},{1:'JORNALS'},{2:'NUVEMS',3:'LOBOES'}]),
plu('SPL4', [['COLHER','COLHERES'],['LIMÃO','LIMÕES'],['VARAL','VARAIS']], [{0:'COLHERS'},{1:'LIMÃOS'},{2:'VARALES'}]),
plu('SPL5', [['NARIZ','NARIZES'],['TREM','TRENS'],['OVO','OVOS'],['LEÃO','LEÕES']], [{0:'NARIZS'},{1:'TREMS'},{2:'OVOES',3:'LEÃOS'}]),

{id:'SPL6', eixo:'plural', tipo:'escreva o plural',
 pede:'QUAL É O PLURAL DE "O PORQUINHO"?',
 opts:[
  {t:'OS PORQUINHOS', ok:1},
  {t:'O PORQUINHOS', no:'O artigo também vai para o plural: O vira OS.'},
  {t:'OS PORQUINHO', no:'A palavra PORQUINHO também tem de ir para o plural.'},
  {t:'OS PORQUINHOES', no:'PORQUINHO termina em vogal: ganha só S.'}
 ],
 dica:'As DUAS palavras vão para o plural.',
 visual:'<div class="pcs"><span class="pc">O</span><span class="arw">&rarr;</span><span class="pc hit">OS</span></div><div class="pcs"><span class="pc">PORQUINHO</span><span class="arw">&rarr;</span><span class="pc hit">PORQUINHOS</span></div>',
 porque:'O artigo vai junto: O vira OS. E PORQUINHO termina em vogal, ganha S: OS PORQUINHOS.',
 proximo:'Plural com artigo: mude as DUAS palavras.'},

{id:'SPL7', eixo:'plural', tipo:'escreva o plural',
 enun:'COMPLETE A FRASE COM O PLURAL DE BOTÃO:', quadro:'A CAMISA TEM CINCO <span class="lb lbw"></span>.',
 pede:'QUAL PALAVRA COMPLETA A FRASE?',
 opts:[
  {t:'BOTÃOS', no:'BOTÃO termina em ÃO, que vira ÕES: BOTÕES.'},
  {t:'BOTÕS', no:'Faltou o E: BOTÕES.'},
  {t:'BOTÕES', ok:1},
  {t:'BOTÕIS', no:'O certo é BOTÕES, com ES no fim.'}
 ],
 dica:'São cinco. Olhe como BOTÃO termina.',
 visual:'<div class="pcs"><span class="pc">BOTÃO</span><span class="arw">&rarr;</span><span class="pc hit">BOTÕES</span></div>',
 porque:'BOTÃO → BOTÕES: ÃO vira ÕES.',
 proximo:'Uma palavra de cada vez: olhe o final dela e aplique a regra.'},

{id:'SPL8', eixo:'plural', tipo:'escreva o plural',
 pede:'QUAL É O PLURAL DE "A NUVEM"?',
 opts:[
  {t:'A NUVENS', no:'O artigo também vai para o plural: A vira AS.'},
  {t:'AS NUVEMS', no:'Terminou em M, o M vira N: NUVENS.'},
  {t:'AS NUVENS', ok:1},
  {t:'AS NUVEM', no:'A palavra NUVEM também tem de ir para o plural.'}
 ],
 dica:'As DUAS palavras vão para o plural. NUVEM termina em M.',
 visual:'<div class="pcs"><span class="pc">A</span><span class="arw">&rarr;</span><span class="pc hit">AS</span></div><div class="pcs"><span class="pc">NUVEM</span><span class="arw">&rarr;</span><span class="pc hit">NUVENS</span></div>',
 porque:'A vira AS, e o M vira NS: AS NUVENS.',
 proximo:'Plural com artigo: mude as DUAS palavras.'},

{id:'SPL9', eixo:'plural', tipo:'escreva o plural',
 pede:'QUAL É O PLURAL DE ANZOL?',
 opts:[
  {t:'ANZÓIS', ok:1},
  {t:'ANZOLS', no:'Terminou em L, não se põe S: o L vira IS.'},
  {t:'ANZOLES', no:'ES é para R e Z. ANZOL termina em L.'},
  {t:'ANZÕES', no:'ÕES é para palavras que terminam em ÃO. ANZOL termina em L.'}
 ],
 dica:'ANZOL termina em L.',
 visual:'<div class="pcs"><span class="pc">ANZO<span class="mk">L</span></span><span class="arw">&rarr;</span><span class="pc">ANZÓ<span class="mk">IS</span></span></div>',
 porque:'Terminou em OL, o L vira IS: ANZOL, ANZÓIS.',
 proximo:'L no fim? Troque o L por IS.'}
);

/* =================== BLOCO A · DICIONÁRIO =================== */
ITENS.push(
{id:'SDC1', eixo:'dic', tipo:'ordem alfabética',
 pede:'QUAL GRUPO ESTÁ EM ORDEM ALFABÉTICA?',
 opts:[
  {t:'BALA · BOLA · BULE', ok:1},
  {t:'BOLA · BALA · BULE', no:'BALA vem antes de BOLA: na 2ª letra, A vem antes de O.'},
  {t:'BULE · BOLA · BALA', no:'Está ao contrário: U vem depois de O, que vem depois de A.'},
  {t:'BALA · BULE · BOLA', no:'BOLA vem antes de BULE: na 2ª letra, O vem antes de U.'}
 ],
 dica:'As três começam com B. Olhe a SEGUNDA letra: A, O, U.',
 visual:'<div class="pcs"><span class="pc">B<span class="mk">A</span>LA</span><span class="pc">B<span class="mk">O</span>LA</span><span class="pc">B<span class="mk">U</span>LE</span></div>',
 porque:'Primeira letra igual (B), então vale a segunda: A, O, U. BALA, BOLA, BULE.',
 proximo:'Primeira letra igual? Compare a segunda.'},

{id:'SDC2', eixo:'dic', tipo:'qual vem primeiro',
 pede:'QUAL PALAVRA VEM PRIMEIRO NO DICIONÁRIO?',
 opts:[
  {t:'CAVALO', no:'CASA e CAVALO começam com CA. Na 3ª letra, S vem antes de V: CASA vem antes.'},
  {t:'COPO', no:'CO vem depois de CA: CASA e CAVALO vêm antes.'},
  {t:'CASA', ok:1},
  {t:'CUBO', no:'Em CUBO, a 2ª letra é U, que vem depois de A e de O.'}
 ],
 dica:'Todas começam com C. Olhe a 2ª letra; se empatar, olhe a 3ª.',
 visual:'<div class="pcs"><span class="pc">CA<span class="mk">S</span>A</span><span class="pc">CA<span class="mk">V</span>ALO</span><span class="pc">C<span class="mk">O</span>PO</span><span class="pc">C<span class="mk">U</span>BO</span></div>',
 porque:'Na 2ª letra, A vem antes de O e de U. Entre CASA e CAVALO, a 3ª letra decide: S vem antes de V.',
 proximo:'Empatou? Ande uma letra para a direita e compare de novo.'},

{id:'SDC3', eixo:'dic', tipo:'qual vem primeiro',
 pede:'QUAL PALAVRA VEM PRIMEIRO NO DICIONÁRIO?',
 opts:[
  {t:'JANELA', no:'JA de novo: na 3ª letra, N vem depois de B e de C.'},
  {t:'JACARÉ', no:'JACARÉ e JABUTI começam com JA. Na 3ª letra, B vem antes de C.'},
  {t:'JOGO', no:'JO vem depois de JA.'},
  {t:'JABUTI', ok:1}
 ],
 dica:'Três começam com JA. Olhe a 3ª letra: B, C ou N?',
 visual:'<div class="pcs"><span class="pc">JA<span class="mk">B</span>UTI</span><span class="pc">JA<span class="mk">C</span>ARÉ</span><span class="pc">JA<span class="mk">N</span>ELA</span><span class="pc">J<span class="mk">O</span>GO</span></div>',
 porque:'JABUTI, JACARÉ e JANELA empatam em JA; na 3ª letra, B vem antes de C e de N. JOGO fica por último.',
 proximo:'Empatou? Ande uma letra para a direita e compare de novo.'},

{id:'SDC4', eixo:'dic', tipo:'ordem alfabética',
 pede:'QUAL GRUPO ESTÁ EM ORDEM ALFABÉTICA?',
 opts:[
  {t:'CASA · CAMA · CAVALO', no:'CAMA vem antes de CASA: na 3ª letra, M vem antes de S.'},
  {t:'CAMA · CASA · CAVALO', ok:1},
  {t:'CAVALO · CASA · CAMA', no:'Está ao contrário: V vem depois de S, que vem depois de M.'},
  {t:'CAMA · CAVALO · CASA', no:'CASA vem antes de CAVALO: na 3ª letra, S vem antes de V.'}
 ],
 dica:'As três começam com CA. Olhe a TERCEIRA letra: M, S, V.',
 visual:'<div class="pcs"><span class="pc">CA<span class="mk">M</span>A</span><span class="pc">CA<span class="mk">S</span>A</span><span class="pc">CA<span class="mk">V</span>ALO</span></div>',
 porque:'CA empata nas três; a 3ª letra decide: M, S, V. CAMA, CASA, CAVALO.',
 proximo:'Empatou na 1ª e na 2ª? Olhe a 3ª.'},

{id:'SDC5', eixo:'dic', tipo:'significados',
 enun:'NO DICIONÁRIO, A PALAVRA MANGA TEM DOIS SIGNIFICADOS: UMA FRUTA E UMA PARTE DA ROUPA.',
 pede:'EM QUAL FRASE MANGA É PARTE DA ROUPA?',
 opts:[
  {t:'A MANGA DA MINHA CAMISA RASGOU.', ok:1},
  {t:'COMI UMA MANGA BEM DOCE.', no:'Aqui a manga se come: é a fruta.'},
  {t:'O SUCO DE MANGA ESTAVA GELADO.', no:'Suco de manga é feito da fruta.'},
  {t:'A MANGA CAIU DO PÉ.', no:'A manga que cai do pé é a fruta.'}
 ],
 dica:'Procure a frase que fala de roupa.',
 porque:'Na frase da camisa, MANGA é a parte que cobre o braço. Nas outras, é a fruta.',
 proximo:'Palavra com dois significados: leia a frase toda para saber qual vale.'},

{id:'SDC6', eixo:'dic', tipo:'significados',
 enun:'NO DICIONÁRIO, A PALAVRA PENA TEM DOIS SIGNIFICADOS: O QUE COBRE AS AVES E SENTIR DÓ.',
 pede:'EM QUAL FRASE PENA QUER DIZER SENTIR DÓ?',
 opts:[
  {t:'O PASSARINHO PERDEU UMA PENA.', no:'Aqui é a pena da ave.'},
  {t:'TIVE PENA DO CACHORRINHO MOLHADO.', ok:1},
  {t:'A PENA DO PAVÃO É COLORIDA.', no:'Aqui é a pena da ave.'},
  {t:'ACHEI UMA PENA BRANCA NO CHÃO.', no:'Uma pena que se acha no chão é a pena de ave.'}
 ],
 dica:'Procure a frase que fala de um sentimento.',
 porque:'"Tive pena do cachorrinho" quer dizer: senti dó dele. Nas outras, é a pena das aves.',
 proximo:'Palavra com dois significados: leia a frase toda para saber qual vale.'},

{id:'SDC7', eixo:'dic', tipo:'para que serve',
 pede:'NO DICIONÁRIO, A PALAVRA EXPLICADA COM O SEU SIGNIFICADO SE CHAMA...',
 opts:[
  {t:'VERBETE', ok:1},
  {t:'PARÁGRAFO', no:'Parágrafo é um pedaço de um texto, que começa um pouco para dentro.'},
  {t:'RIMA', no:'Rima é quando palavras terminam com o mesmo som.'},
  {t:'PERSONAGEM', no:'Personagem é quem participa de uma história.'}
 ],
 dica:'É uma palavra que começa com V.',
 porque:'Cada palavra explicada no dicionário, com seu significado, é um VERBETE.',
 proximo:'Dicionário: verbetes em ordem alfabética.'},

{id:'SDC8', eixo:'dic', tipo:'para que serve',
 pede:'AS PALAVRAS-GUIA, NO ALTO DA PÁGINA DO DICIONÁRIO, MOSTRAM...',
 opts:[
  {t:'AS PALAVRAS MAIS DIFÍCEIS DA PÁGINA.', no:'As palavras-guia não escolhem as difíceis: mostram onde a página começa e termina.'},
  {t:'A PRIMEIRA E A ÚLTIMA PALAVRA DA PÁGINA.', ok:1},
  {t:'O NOME DE QUEM FEZ O DICIONÁRIO.', no:'O nome de quem fez fica na capa, não no alto de cada página.'},
  {t:'SÓ AS PALAVRAS QUE COMEÇAM COM A.', no:'Cada página tem as suas palavras-guia, com qualquer letra.'}
 ],
 dica:'Elas servem para achar a página certa mais depressa.',
 porque:'As palavras-guia mostram a primeira e a última palavra da página. Assim se sabe se a palavra procurada está ali.',
 proximo:'Para achar uma palavra, compare com as palavras-guia do alto da página.'},

{id:'SDC9', eixo:'dic', tipo:'para que serve',
 pede:'PARA QUE SERVE O DICIONÁRIO?',
 opts:[
  {t:'PARA LER UM CONTO DE FADAS DO COMEÇO AO FIM.', no:'Conto de fadas se lê num livro de histórias. O dicionário explica palavras.'},
  {t:'PARA APRENDER A FAZER CONTAS DE MAIS.', no:'Contas são de Matemática. O dicionário explica palavras.'},
  {t:'PARA DESCOBRIR O SIGNIFICADO E A ESCRITA CERTA DAS PALAVRAS.', ok:1},
  {t:'PARA SABER AS NOTÍCIAS DO DIA.', no:'Notícias saem no jornal. O dicionário explica palavras.'}
 ],
 dica:'O que a gente procura no dicionário quando não conhece uma palavra?',
 porque:'O dicionário mostra o significado das palavras e como se escreve cada uma.',
 proximo:'Dicionário = significado + escrita certa.'},

{id:'SDC10', eixo:'dic', tipo:'ordem alfabética',
 pede:'QUAL GRUPO ESTÁ EM ORDEM ALFABÉTICA?',
 opts:[
  {t:'ABELHA · BOLA · COELHO · GIRAFA', ok:1},
  {t:'BOLA · ABELHA · COELHO · GIRAFA', no:'A vem antes de B: ABELHA vem antes de BOLA.'},
  {t:'ABELHA · COELHO · BOLA · GIRAFA', no:'B vem antes de C: BOLA vem antes de COELHO.'},
  {t:'ABELHA · BOLA · GIRAFA · COELHO', no:'C vem antes de G: COELHO vem antes de GIRAFA.'}
 ],
 dica:'Olhe só a primeira letra de cada palavra: A, B, C, G.',
 visual:'<div class="pcs"><span class="pc"><span class="mk">A</span>BELHA</span><span class="pc"><span class="mk">B</span>OLA</span><span class="pc"><span class="mk">C</span>OELHO</span><span class="pc"><span class="mk">G</span>IRAFA</span></div>',
 porque:'Na ordem do alfabeto: A, B, C, G. ABELHA, BOLA, COELHO, GIRAFA.',
 proximo:'Cante o alfabeto e ponha cada palavra no seu lugar.'}
);

/* =================== BLOCO B · CONTO DE FADAS (o gênero) =================== */
ITENS.push(
{id:'SCO1', eixo:'conto', tipo:'qual é um conto',
 pede:'QUAL DESTES É UM CONTO DE FADAS?',
 opts:[
  {t:'CINDERELA', ok:1},
  {t:'RECEITA DE BOLO DE CENOURA', no:'Receita ensina a fazer uma comida. Não conta história.'},
  {t:'NOTÍCIA DO JORNAL DE HOJE', no:'Notícia conta o que aconteceu de verdade. Conto de fadas é inventado.'},
  {t:'LISTA DE COMPRAS DO MERCADO', no:'Lista de compras só lembra o que comprar. Não conta história.'}
 ],
 dica:'Procure a história com fada, magia e "Era uma vez".',
 porque:'Cinderela é um conto de fadas, como Chapeuzinho Vermelho, João e o pé de feijão e Os Três Porquinhos.',
 proximo:'Conto de fadas conta uma história inventada, com magia.'},

{id:'SCO2', eixo:'conto', tipo:'qual é um conto',
 pede:'QUAL DESTES COMEÇOS É DE UM CONTO DE FADAS?',
 opts:[
  {t:'ERA UMA VEZ UM REI QUE MORAVA NUM CASTELO.', ok:1},
  {t:'HOJE CHOVEU MUITO NA CIDADE E AS RUAS FICARAM CHEIAS DE ÁGUA.', no:'Isso é notícia: conta uma coisa que aconteceu de verdade, hoje.'},
  {t:'PARA FAZER O BOLO, MISTURE A FARINHA COM OS OVOS.', no:'Isso é receita: ensina a fazer um bolo.'},
  {t:'QUERIDA VOVÓ, ESTOU COM SAUDADE. UM BEIJO!', no:'Isso é um bilhete para a vovó. Não é história.'}
 ],
 dica:'Procure o jeito mais famoso de começar uma história de fadas.',
 visual:'<div class="pcs"><span class="pc hit">ERA UMA VEZ...</span><span class="arw">&rarr;</span><span class="pc hit">conto de fadas</span></div>',
 porque:'"Era uma vez..." é o começo dos contos de fadas. As outras são notícia, receita e bilhete.',
 proximo:'Procure as marcas do conto: Era uma vez, reino, castelo, magia.'},

{id:'SCO3', eixo:'conto', tipo:'elemento do conto',
 quadro:'E VIVERAM <span class="lb lbw"></span> PARA SEMPRE.',
 pede:'QUE PALAVRA COMPLETA O FINAL MAIS CONHECIDO DOS CONTOS DE FADAS?',
 opts:[
  {t:'TRISTES', no:'Conto de fadas costuma ter final feliz.'},
  {t:'FELIZES', ok:1},
  {t:'CANSADOS', no:'Ninguém termina um conto de fadas assim. O final conhecido é feliz.'},
  {t:'BRAVOS', no:'Ninguém termina um conto de fadas bravo. O final conhecido é feliz.'}
 ],
 dica:'O final dos contos de fadas costuma ser bom.',
 porque:'O final mais conhecido dos contos de fadas é: "e viveram felizes para sempre".',
 proximo:'Lembre: começo = Era uma vez; fim = felizes para sempre.'},

{id:'SCO4', eixo:'conto', tipo:'com suas palavras',
 pede:'COM SUAS PALAVRAS: O QUE É UM CONTO DE FADAS? MARQUE A MELHOR RESPOSTA.',
 opts:[
  {t:'UMA HISTÓRIA INVENTADA E MUITO ANTIGA, QUE AS PESSOAS CONTAVAM UMAS PARA AS OUTRAS.', ok:1},
  {t:'UMA NOTÍCIA QUE CONTA O QUE ACONTECEU ONTEM NA CIDADE.', no:'Notícia conta fato de verdade. Conto de fadas é inventado.'},
  {t:'UM TEXTO QUE ENSINA A FAZER UMA COMIDA.', no:'Texto que ensina a fazer comida é receita.'},
  {t:'UMA HISTÓRIA DE VERDADE SOBRE A VIDA DE UMA PESSOA FAMOSA.', no:'Conto de fadas não é de verdade: é inventado.'}
 ],
 dica:'Conto de fadas é de verdade ou inventado? É novo ou antigo?',
 porque:'Conto de fadas é uma história inventada, bem antiga, que passou de pessoa para pessoa até ser escrita nos livros.',
 proximo:'Inventada + antiga + contada de geração em geração.'},

{id:'SCO5', eixo:'conto', tipo:'começo, meio e fim',
 pede:'NO MEIO DE UM CONTO DE FADAS, O QUE COSTUMA ACONTECER?',
 opts:[
  {t:'OS PERSONAGENS VIVEM FELIZES PARA SEMPRE.', no:'Isso é o FIM do conto.'},
  {t:'APARECE UM PROBLEMA OU UM PERIGO.', ok:1},
  {t:'A HISTÓRIA COMEÇA COM "ERA UMA VEZ".', no:'Isso é o COMEÇO do conto.'},
  {t:'APARECE UMA LISTA DE PALAVRAS EM ORDEM ALFABÉTICA.', no:'Lista em ordem alfabética é coisa de dicionário.'}
 ],
 dica:'Começo: Era uma vez. Fim: felizes para sempre. E o meio?',
 visual:'<div class="pcs"><span class="pc">COMEÇO: ERA UMA VEZ</span><span class="arw">&rarr;</span><span class="pc hit">MEIO: UM PROBLEMA</span><span class="arw">&rarr;</span><span class="pc">FIM: O PROBLEMA SE RESOLVE</span></div>',
 porque:'No meio do conto aparece um problema ou um perigo. No fim, ele é resolvido.',
 proximo:'Começo, meio e fim: apresentação, problema, solução.'},

{id:'SCO6', eixo:'conto', tipo:'começo, meio e fim',
 pede:'QUAL É A ORDEM CERTA DE UM CONTO DE FADAS?',
 opts:[
  {t:'ERA UMA VEZ → APARECE UM PROBLEMA → O PROBLEMA É RESOLVIDO', ok:1},
  {t:'APARECE UM PROBLEMA → ERA UMA VEZ → O PROBLEMA É RESOLVIDO', no:'"Era uma vez" é o começo: vem antes de tudo.'},
  {t:'O PROBLEMA É RESOLVIDO → APARECE UM PROBLEMA → ERA UMA VEZ', no:'Está de trás para a frente.'},
  {t:'ERA UMA VEZ → O PROBLEMA É RESOLVIDO → APARECE UM PROBLEMA', no:'Não dá para resolver um problema que ainda não apareceu.'}
 ],
 dica:'Primeiro se conhece a história; depois vem o problema; por fim...',
 porque:'Começo (Era uma vez), meio (aparece um problema), fim (o problema é resolvido).',
 proximo:'Começo, meio e fim: apresentação, problema, solução.'},

{id:'SCO7', eixo:'conto', tipo:'elemento do conto',
 pede:'O QUE "ERA UMA VEZ" MOSTRA SOBRE O TEMPO DA HISTÓRIA?',
 opts:[
  {t:'QUE ACONTECEU ONTEM.', no:'Ontem é um dia que a gente sabe qual foi. "Era uma vez" não diz quando.'},
  {t:'QUE VAI ACONTECER AMANHÃ.', no:'"Era" fala do passado, não do futuro.'},
  {t:'QUE FOI HÁ MUITO TEMPO, E NÃO SE SABE QUANDO.', ok:1},
  {t:'QUE ACONTECEU NA SEMANA PASSADA.', no:'Semana passada é um tempo certo. "Era uma vez" não diz quando.'}
 ],
 dica:'Dá para saber o dia em que a história aconteceu?',
 porque:'"Era uma vez" e "Há muito tempo" mostram um tempo antigo, que não se sabe quando foi.',
 proximo:'O tempo do conto de fadas: há muito tempo, sem data.'},

{id:'SCO8', eixo:'conto', tipo:'elemento do conto',
 pede:'QUAL DESTES LUGARES APARECE MUITO NOS CONTOS DE FADAS?',
 opts:[
  {t:'O SUPERMERCADO', no:'Supermercado é lugar de hoje, da cidade. Não é lugar de conto de fadas.'},
  {t:'O AEROPORTO', no:'Aeroporto é lugar de hoje. Não é lugar de conto de fadas.'},
  {t:'A ESTAÇÃO DE METRÔ', no:'Metrô é lugar de hoje. Não é lugar de conto de fadas.'},
  {t:'O CASTELO DE UM REINO', ok:1}
 ],
 dica:'Lembre dos contos: onde mora o rei? Onde fica o Gigante?',
 porque:'Os contos de fadas acontecem em reinos, castelos, florestas e aldeias.',
 proximo:'Lugares do conto: reino, castelo, floresta, aldeia.'},

{id:'SCO9', eixo:'conto', tipo:'elemento do conto',
 pede:'COMO OS CONTOS DE FADAS CHEGARAM ATÉ HOJE?',
 opts:[
  {t:'FORAM ESCRITOS NO ANO PASSADO.', no:'Os contos de fadas são muito antigos.'},
  {t:'APARECERAM PRIMEIRO NA TELEVISÃO.', no:'Eles existem muito antes da televisão.'},
  {t:'AS PESSOAS CONTAVAM UMAS PARA AS OUTRAS E, DEPOIS, ELES FORAM ESCRITOS EM LIVROS.', ok:1},
  {t:'SAÍRAM COMO NOTÍCIA NO JORNAL.', no:'Notícia conta fatos de verdade. Conto de fadas é inventado.'}
 ],
 dica:'Pense em avó contando história para o neto.',
 porque:'Os contos passaram de geração em geração, de boca em boca, até serem escritos nos livros.',
 proximo:'Conto de fadas: antigo, contado de pessoa para pessoa.'},

{id:'SCO10', eixo:'conto', tipo:'elemento do conto',
 pede:'NA HISTÓRIA "CHAPEUZINHO VERMELHO", QUEM É O VILÃO?',
 opts:[
  {t:'O CAÇADOR', no:'O caçador não faz maldade: ele salva a Chapeuzinho e a vovó.'},
  {t:'A VOVÓ', no:'A vovó estava doente, em casa. Ela não faz maldade com ninguém.'},
  {t:'O LOBO MAU', ok:1},
  {t:'A MÃE', no:'A mãe mandou a cesta e deu um conselho. Ela não faz maldade.'}
 ],
 dica:'Vilão é quem faz maldade na história. Quem enganou a Chapeuzinho?',
 visual:'<div class="pcs"><span class="pc">HEROÍNA</span><span class="arw">&rarr;</span><span class="pc">CHAPEUZINHO</span></div><div class="pcs"><span class="pc hit">VILÃO</span><span class="arw">&rarr;</span><span class="pc hit">LOBO MAU</span></div>',
 porque:'Chapeuzinho é a heroína. O Lobo Mau enganou a menina e se disfarçou de vovó: ele é o vilão.',
 proximo:'Personagens do conto: herói, vilão, ajudantes e seres mágicos.'}
);

/* ============ BLOCO B · ELEMENTOS DO CONTO num trecho ============ */
ITENS.push(
{id:'SLE1', eixo:'leitura', tipo:'trecho de conto', enun:'LEIA O TRECHO:', texto:TX_PEDRO,
 pede:'EM QUE LUGAR A HISTÓRIA ACONTECE?',
 opts:[
  {t:'NUMA CIDADE GRANDE', no:'O texto não fala em cidade. Leia a primeira linha.'},
  {t:'NUM REINO MUITO DISTANTE', ok:1},
  {t:'NA ESCOLA DE PEDRO', no:'O texto não fala em escola.'},
  {t:'NO FUNDO DO MAR', no:'O texto não fala em mar. A concha veio da fada.'}
 ],
 dica:'O lugar aparece logo na primeira linha.',
 visual:'<p class="vx">ERA UMA VEZ, <span class="mk">NUM REINO MUITO DISTANTE</span>,</p>',
 porque:'"Era uma vez, num reino muito distante": o lugar é um reino.',
 proximo:'O lugar costuma aparecer no começo, junto com "Era uma vez".'},

{id:'SLE2', eixo:'leitura', tipo:'trecho de conto', enun:'LEIA O TRECHO:', texto:TX_PEDRO,
 pede:'QUAL É O PROBLEMA DA HISTÓRIA?',
 opts:[
  {t:'O RIO DO REINO SECOU.', ok:1},
  {t:'PEDRO SOPROU A CONCHA.', no:'Soprar a concha é a SOLUÇÃO: foi assim que a água voltou.'},
  {t:'UMA FADA APARECEU.', no:'A fada ajudou: ela não é o problema.'},
  {t:'TODOS VIVERAM FELIZES.', no:'Isso é o final feliz, quando o problema já acabou.'}
 ],
 dica:'O problema é a coisa ruim que acontece no meio.',
 visual:'<p class="vx">UM DIA, <span class="mk">O RIO DO REINO SECOU</span>, E TODOS FICARAM COM SEDE.</p>',
 porque:'O rio secou e todos ficaram com sede: esse é o problema. A concha mágica é a solução.',
 proximo:'Problema = a coisa ruim. Solução = como ela acaba.'},

{id:'SLE3', eixo:'leitura', tipo:'trecho de conto', enun:'LEIA O TRECHO:', texto:TX_PEDRO,
 pede:'QUAL É O OBJETO MÁGICO DESSA HISTÓRIA?',
 opts:[
  {t:'O RIO', no:'O rio é comum, existe de verdade.'},
  {t:'A CONCHA', ok:1},
  {t:'O REINO', no:'O reino é o lugar da história, não um objeto mágico.'},
  {t:'A ÁGUA', no:'A água é comum. O que tinha magia era o que fez a água voltar.'}
 ],
 dica:'Procure a palavra MÁGICA no texto.',
 visual:'<p class="vx">UMA FADA DEU A PEDRO UMA <span class="mk">CONCHA MÁGICA</span>.</p>',
 porque:'A fada deu a Pedro uma concha mágica: soprou, e a água voltou. Concha comum não faz isso.',
 proximo:'Magia é o que não acontece de verdade.'},

{id:'SLE4', eixo:'leitura', tipo:'trecho de conto', enun:'LEIA O TRECHO:', texto:TX_PEDRO,
 pede:'COMO O PROBLEMA FOI RESOLVIDO?',
 opts:[
  {t:'CHOVEU MUITO NO REINO.', no:'O texto não fala em chuva.'},
  {t:'PEDRO FOI MORAR EM OUTRO REINO.', no:'Pedro não foi embora. Leia a 6ª linha.'},
  {t:'PEDRO SOPROU A CONCHA, E A ÁGUA VOLTOU.', ok:1},
  {t:'O REI MANDOU CAVAR UM POÇO.', no:'O texto não fala em rei nem em poço.'}
 ],
 dica:'Leia a linha que vem logo depois da fada.',
 visual:'<p class="vx"><span class="mk">PEDRO SOPROU A CONCHA, E A ÁGUA VOLTOU A CORRER.</span></p>',
 porque:'Pedro soprou a concha mágica e a água voltou: essa é a solução do problema.',
 proximo:'A solução vem depois do problema e antes do final feliz.'},

{id:'SLE5', eixo:'leitura', tipo:'trecho de conto', enun:'LEIA O TRECHO:', texto:TX_PEDRO,
 pede:'QUAL PARTE DO TEXTO MOSTRA O TEMPO DO CONTO DE FADAS?',
 opts:[
  {t:'ERA UMA VEZ', ok:1},
  {t:'E TODOS FICARAM COM SEDE', no:'Isso fala do problema, não do tempo.'},
  {t:'A ÁGUA VOLTOU A CORRER', no:'Isso fala da solução, não do tempo.'},
  {t:'UM MENINO CHAMADO PEDRO', no:'Isso apresenta o personagem, não o tempo.'}
 ],
 dica:'É o jeito mais famoso de começar um conto.',
 porque:'"Era uma vez" mostra um tempo antigo, que não se sabe quando foi.',
 proximo:'Tempo do conto: Era uma vez, há muito tempo.'},

{id:'SLE6', eixo:'leitura', tipo:'trecho de conto', enun:'LEIA O TRECHO:', texto:TX_PORQ,
 pede:'QUAL É O PROBLEMA NESSE TRECHO?',
 opts:[
  {t:'OS PORQUINHOS ERAM IRMÃOS.', no:'Ser irmãos não é um problema: é só a apresentação dos personagens.'},
  {t:'O LOBO MAU DERRUBA AS CASAS COM SOPROS.', ok:1},
  {t:'O TERCEIRO PORQUINHO FEZ UMA CASA DE TIJOLOS.', no:'A casa de tijolos é o que SALVA os porquinhos.'},
  {t:'OS PORQUINHOS GOSTAVAM DE BRINCAR.', no:'O texto não fala em brincadeira.'}
 ],
 dica:'O problema é a coisa ruim que acontece.',
 porque:'O Lobo Mau sopra e derruba as casas de palha e de madeira: esse é o perigo da história.',
 proximo:'Problema = a coisa ruim. Solução = como ela acaba.'},

{id:'SLE7', eixo:'leitura', tipo:'trecho de conto', enun:'LEIA O TRECHO:', texto:TX_PORQ,
 pede:'O QUE PROTEGEU OS PORQUINHOS NO FIM DO TRECHO?',
 opts:[
  {t:'A CASA DE PALHA', no:'A casa de palha o lobo derrubou.'},
  {t:'A CASA DE MADEIRA', no:'A casa de madeira o lobo também derrubou.'},
  {t:'UMA FADA MADRINHA', no:'Não aparece fada nesse trecho.'},
  {t:'A CASA DE TIJOLOS', ok:1}
 ],
 dica:'Leia a última linha: qual casa não caiu?',
 visual:'<p class="vx">O LOBO SOPROU, SOPROU, MAS <span class="mk">A CASA NÃO CAIU</span>.</p>',
 porque:'Os três correram para a casa de tijolos, e ela não caiu com os sopros.',
 proximo:'Para achar a solução, procure o que fez o perigo parar.'},

{id:'SLE8', eixo:'leitura', tipo:'trecho de conto', enun:'LEIA O TRECHO:', texto:TX_CIND,
 pede:'QUAL MAGIA ACONTECE NESSE TRECHO?',
 opts:[
  {t:'CINDERELA QUERIA IR AO BAILE.', no:'Querer ir a um baile é coisa de verdade. Não é magia.'},
  {t:'UMA ABÓBORA VIROU CARRUAGEM.', ok:1},
  {t:'O BAILE ERA NO CASTELO.', no:'Isso fala do lugar, não de magia.'},
  {t:'A FADA DEU UM AVISO.', no:'Avisar não é magia. A magia foi o que a varinha fez.'}
 ],
 dica:'O que a varinha da fada fez?',
 visual:'<p class="vx">TRANSFORMOU UMA <span class="mk">ABÓBORA EM CARRUAGEM</span></p>',
 porque:'Abóbora não vira carruagem de verdade: isso é magia da fada madrinha.',
 proximo:'Magia é o que não acontece de verdade.'},

{id:'SLE9', eixo:'leitura', tipo:'elemento nas histórias',
 pede:'EM "CHAPEUZINHO VERMELHO", QUAL É O LUGAR ONDE A MENINA ENCONTRA O LOBO?',
 opts:[
  {t:'O CASTELO', no:'O castelo é de outra história, a de João.'},
  {t:'A FLORESTA', ok:1},
  {t:'A PRAIA', no:'Não tem praia na história da Chapeuzinho.'},
  {t:'A ESCOLA', no:'Não tem escola na história da Chapeuzinho.'}
 ],
 dica:'Por onde a menina passava a caminho da casa da vovó?',
 porque:'Chapeuzinho encontra o lobo na floresta, a caminho da casa da vovó.',
 proximo:'Lugares de Chapeuzinho: floresta e casa da vovó.'},

{id:'SLE10', eixo:'leitura', tipo:'elemento nas histórias',
 pede:'EM "JOÃO E O PÉ DE FEIJÃO", QUAL É A MAGIA QUE FAZ A HISTÓRIA ACONTECER?',
 opts:[
  {t:'A CESTA DE DOCES', no:'A cesta é de Chapeuzinho Vermelho, e não é mágica.'},
  {t:'A CAPA VERMELHA', no:'A capa é de Chapeuzinho Vermelho, e não é mágica.'},
  {t:'A CASA DE TIJOLOS', no:'A casa de tijolos é dos Três Porquinhos, e não é mágica.'},
  {t:'OS FEIJÕES MÁGICOS', ok:1}
 ],
 dica:'Do que nasceu o pé de feijão gigante?',
 porque:'Os feijões mágicos viram um pé de feijão até as nuvens. Também são mágicas a galinha dos ovos de ouro e a harpa que canta.',
 proximo:'Separe as histórias: cada uma tem a sua magia.'},

{id:'SLE11', eixo:'leitura', tipo:'elemento nas histórias',
 pede:'EM "CHAPEUZINHO VERMELHO", COMO O PROBLEMA É RESOLVIDO?',
 opts:[
  {t:'O CAÇADOR SALVA A MENINA E A VOVÓ.', ok:1},
  {t:'A MENINA CORTA UM PÉ DE FEIJÃO.', no:'Cortar o pé de feijão é de outra história, a de João.'},
  {t:'UMA FADA TRANSFORMA O LOBO EM SAPO.', no:'Não tem fada na história da Chapeuzinho.'},
  {t:'O LOBO FICA AMIGO DE TODOS.', no:'O lobo não vira amigo: quem resolve é o caçador.'}
 ],
 dica:'Quem ouviu o barulho e entrou na casa da vovó?',
 porque:'O problema é o lobo enganar a menina e a vovó; a solução é o caçador, que salva as duas.',
 proximo:'Problema = a coisa ruim. Solução = quem ou o que acaba com ela.'}
);

/* =================== BLOCO B · PARÁFRASE =================== */
ITENS.push(
{id:'SPF1', eixo:'parafrase', tipo:'com suas palavras',
 pede:'COM SUAS PALAVRAS: O QUE É UMA PARÁFRASE? MARQUE A MELHOR RESPOSTA.',
 opts:[
  {t:'MUDAR A HISTÓRIA DE PROPÓSITO PARA FICAR ENGRAÇADA.', no:'Isso é PARÓDIA. Na paráfrase, o sentido não muda.'},
  {t:'CONTAR O MESMO TEXTO COM OUTRAS PALAVRAS, SEM MUDAR O SENTIDO.', ok:1},
  {t:'COPIAR O TEXTO IGUALZINHO, PALAVRA POR PALAVRA.', no:'Copiar não é paráfrase: na paráfrase as palavras mudam.'},
  {t:'INVENTAR UMA HISTÓRIA NOVA, COM OUTROS PERSONAGENS.', no:'Na paráfrase a história é a mesma: só as palavras mudam.'}
 ],
 dica:'Na paráfrase, o que muda: as palavras ou o que acontece?',
 porque:'Paráfrase é recontar com as suas palavras, sem mudar o sentido.',
 proximo:'Paráfrase: palavras novas, sentido igual.'},

{id:'SPF2', eixo:'parafrase', tipo:'qual é a paráfrase',
 enun:'LEIA A FRASE:', quadro:'CHAPEUZINHO LEVOU DOCES PARA A VOVÓ.',
 pede:'QUAL FRASE É UMA PARÁFRASE DESSA?',
 opts:[
  {t:'CHAPEUZINHO LEVOU PIZZA PARA O VOVÔ.', no:'Aqui o sentido mudou de propósito (pizza, vovô): isso é paródia.'},
  {t:'A VOVÓ LEVOU DOCES PARA CHAPEUZINHO.', no:'O sentido mudou: agora é a vovó quem leva os doces.'},
  {t:'A GAROTA LEVOU GULOSEIMAS PARA A AVÓ.', ok:1},
  {t:'CHAPEUZINHO COMEU OS DOCES DA VOVÓ.', no:'O sentido mudou: levar não é o mesmo que comer.'}
 ],
 dica:'Procure a frase que conta a MESMA coisa com OUTRAS palavras.',
 visual:'<div class="pcs"><span class="pc">CHAPEUZINHO</span><span class="arw">=</span><span class="pc hit">A GAROTA</span></div><div class="pcs"><span class="pc">DOCES</span><span class="arw">=</span><span class="pc hit">GULOSEIMAS</span></div><div class="pcs"><span class="pc">VOVÓ</span><span class="arw">=</span><span class="pc hit">AVÓ</span></div>',
 porque:'Chapeuzinho virou "a garota", doces viraram "guloseimas", vovó virou "avó". As palavras mudaram; o sentido ficou igual.',
 proximo:'Paráfrase: troque palavras por sinônimos e não mude o que acontece.'},

{id:'SPF3', eixo:'parafrase', tipo:'qual é a paráfrase',
 enun:'LEIA A FRASE:', quadro:'O LOBO ERA GRANDE E ESTAVA BRAVO.',
 pede:'QUAL FRASE É UMA PARÁFRASE DESSA?',
 opts:[
  {t:'O LOBO ERA ENORME E ESTAVA ZANGADO.', ok:1},
  {t:'O LOBO ERA PEQUENO E ESTAVA ALEGRE.', no:'Pequeno e alegre são o contrário de grande e bravo: o sentido mudou.'},
  {t:'O LOBO ERA GRANDE E ESTAVA CONTENTE.', no:'Contente é o contrário de bravo: o sentido mudou.'},
  {t:'A MENINA ERA GRANDE E ESTAVA BRAVA.', no:'Mudou o personagem: agora é a menina, não o lobo.'}
 ],
 dica:'Procure palavras que querem dizer o mesmo que GRANDE e BRAVO.',
 visual:'<div class="pcs"><span class="pc">GRANDE</span><span class="arw">=</span><span class="pc hit">ENORME</span></div><div class="pcs"><span class="pc">BRAVO</span><span class="arw">=</span><span class="pc hit">ZANGADO</span></div>',
 porque:'Grande = enorme; bravo = zangado. Trocaram as palavras por sinônimos e o sentido ficou igual.',
 proximo:'Sinônimos: palavras diferentes que querem dizer a mesma coisa.'},

{id:'SPF4', eixo:'parafrase', tipo:'sinônimo',
 pede:'QUAL PALAVRA QUER DIZER O MESMO QUE FLORESTA?',
 opts:[
  {t:'PRAIA', no:'Praia é areia e mar. Floresta é cheia de árvores.'},
  {t:'CIDADE', no:'Cidade tem casas e ruas. Floresta é cheia de árvores.'},
  {t:'DESERTO', no:'Deserto quase não tem árvores. Floresta é cheia delas.'},
  {t:'MATA', ok:1}
 ],
 dica:'Um lugar cheio de árvores, onde a Chapeuzinho encontrou o lobo.',
 porque:'Floresta e mata são sinônimos: querem dizer a mesma coisa.',
 proximo:'Sinônimo é a palavra que pode entrar no lugar da outra sem mudar o sentido.'},

{id:'SPF5', eixo:'parafrase', tipo:'sinônimo',
 pede:'QUAL PALAVRA QUER DIZER O MESMO QUE MENINA?',
 opts:[
  {t:'GAROTA', ok:1},
  {t:'SENHORA', no:'Senhora é uma mulher mais velha. Menina é criança.'},
  {t:'MENINO', no:'Menino é o masculino de menina, não o mesmo sentido.'},
  {t:'VOVÓ', no:'Vovó é a mãe do pai ou da mãe. Menina é criança.'}
 ],
 dica:'Uma palavra que serve para a Chapeuzinho.',
 porque:'Menina e garota são sinônimos.',
 proximo:'Sinônimo é a palavra que pode entrar no lugar da outra sem mudar o sentido.'},

{id:'SPF6', eixo:'parafrase', tipo:'sinônimo',
 enun:'LEIA A FRASE:', quadro:'JOÃO FICOU <u>COM MEDO</u> QUANDO O GIGANTE ACORDOU.',
 pede:'QUE PALAVRA PODE ENTRAR NO LUGAR DE "COM MEDO" SEM MUDAR O SENTIDO?',
 opts:[
  {t:'CORAJOSO', no:'Corajoso é quem NÃO tem medo: o sentido mudaria.'},
  {t:'ASSUSTADO', ok:1},
  {t:'ALEGRE', no:'Alegre não quer dizer com medo: o sentido mudaria.'},
  {t:'CALMO', no:'Calmo é o contrário de assustado: o sentido mudaria.'}
 ],
 dica:'Leia a frase com cada palavra no lugar de COM MEDO.',
 porque:'"João ficou assustado" quer dizer o mesmo que "João ficou com medo".',
 proximo:'Teste o sinônimo dentro da frase: o sentido tem de continuar igual.'},

{id:'SPF7', eixo:'parafrase', tipo:'regra',
 pede:'NUMA PARÁFRASE, O QUE MUDA E O QUE FICA IGUAL?',
 opts:[
  {t:'MUDA O SENTIDO; AS PALAVRAS FICAM IGUAIS.', no:'É o contrário: as palavras mudam e o sentido fica.'},
  {t:'MUDA TUDO: AS PALAVRAS E O SENTIDO.', no:'Se o sentido muda, já não é paráfrase.'},
  {t:'NÃO MUDA NADA: É UMA CÓPIA.', no:'Cópia não é paráfrase: na paráfrase as palavras mudam.'},
  {t:'MUDAM AS PALAVRAS; O SENTIDO FICA IGUAL.', ok:1}
 ],
 dica:'Paráfrase = contar com as SUAS palavras.',
 porque:'Na paráfrase trocam-se as palavras, mas o sentido do texto continua o mesmo.',
 proximo:'Paráfrase: palavras novas, sentido igual.'},

{id:'SPF8', eixo:'parafrase', tipo:'qual é a paráfrase',
 enun:'LEIA A FRASE:', quadro:'O MENINO SUBIU NO PÉ DE FEIJÃO ATÉ AS NUVENS.',
 pede:'QUAL FRASE CONTA A MESMA COISA COM OUTRAS PALAVRAS?',
 opts:[
  {t:'O MENINO DESCEU DO PÉ DE FEIJÃO ATÉ O CHÃO.', no:'Subir e descer são o contrário: o sentido mudou.'},
  {t:'O MENINO SUBIU NO PÉ DE PIPOCA ATÉ A LUA.', no:'Mudou de propósito (pipoca, lua): isso é paródia.'},
  {t:'O GAROTO ESCALOU O PÉ DE FEIJÃO ATÉ AS NUVENS.', ok:1},
  {t:'O GIGANTE SUBIU NO PÉ DE FEIJÃO ATÉ AS NUVENS.', no:'Mudou o personagem: agora quem sobe é o Gigante.'}
 ],
 dica:'Procure a frase em que só as palavras mudaram.',
 visual:'<div class="pcs"><span class="pc">O MENINO</span><span class="arw">=</span><span class="pc hit">O GAROTO</span></div><div class="pcs"><span class="pc">SUBIU</span><span class="arw">=</span><span class="pc hit">ESCALOU</span></div>',
 porque:'Menino = garoto; subiu = escalou. O que acontece é o mesmo: é paráfrase.',
 proximo:'Se mudou o que acontece, não é paráfrase.'},

{id:'SPF9', eixo:'parafrase', tipo:'paráfrase ou paródia',
 enun:'COMPARE:', quadro:'ORIGINAL: JOÃO TROCOU A VACA POR FEIJÕES MÁGICOS.<div class="sep"></div>NOVO: O MENINO DEU A VACA EM TROCA DE UNS FEIJÕES MÁGICOS.',
 pede:'O TEXTO NOVO É...',
 opts:[
  {t:'UMA PARÁFRASE, PORQUE CONTA A MESMA COISA COM OUTRAS PALAVRAS.', ok:1},
  {t:'UMA PARÓDIA, PORQUE MUDOU O QUE ACONTECE NA HISTÓRIA.', no:'Nada mudou no que acontece: a vaca continua sendo trocada por feijões mágicos.'},
  {t:'UMA PARÓDIA, PORQUE FICOU ENGRAÇADO.', no:'O texto novo não mudou nada de propósito, e não tem nada engraçado nele.'},
  {t:'UM VERBETE DE DICIONÁRIO.', no:'Verbete é a palavra explicada no dicionário. Aqui é um pedaço de história.'}
 ],
 dica:'Compare as duas frases: o que acontece mudou?',
 visual:'<div class="pcs"><span class="pc">JOÃO</span><span class="arw">=</span><span class="pc hit">O MENINO</span></div><div class="pcs"><span class="pc">TROCOU A VACA POR</span><span class="arw">=</span><span class="pc hit">DEU A VACA EM TROCA DE</span></div>',
 porque:'Mudaram só as palavras. O que acontece é o mesmo. Isso é paráfrase.',
 proximo:'Pergunte sempre: o sentido ficou igual? Então é paráfrase.'}
);

/* =================== BLOCO B · PARÓDIA =================== */
ITENS.push(
{id:'SPD1', eixo:'parodia', tipo:'com suas palavras',
 pede:'COM SUAS PALAVRAS: O QUE É UMA PARÓDIA? MARQUE A MELHOR RESPOSTA.',
 opts:[
  {t:'IMITAR UM TEXTO CONHECIDO E MUDAR ALGUMA COISA DE PROPÓSITO, MUITAS VEZES PARA FICAR ENGRAÇADO.', ok:1},
  {t:'CONTAR O MESMO TEXTO COM OUTRAS PALAVRAS, SEM MUDAR O SENTIDO.', no:'Isso é PARÁFRASE. Na paródia, alguma coisa muda de propósito.'},
  {t:'COPIAR O TEXTO SEM MUDAR NADA.', no:'Na paródia alguma coisa muda de propósito.'},
  {t:'EXPLICAR O SIGNIFICADO DE UMA PALAVRA.', no:'Isso é o que o dicionário faz.'}
 ],
 dica:'Na paródia, alguma coisa muda de propósito.',
 porque:'Paródia imita um texto conhecido e muda alguma coisa de propósito. Ainda dá para reconhecer o original.',
 proximo:'Paródia: imita + muda de propósito.'},

{id:'SPD2', eixo:'parodia', tipo:'o que mudou na paródia', enun:'LEIA O TEXTO:', texto:TX_PARODIA,
 pede:'ESSE TEXTO É UMA PARÓDIA DE QUAL HISTÓRIA?',
 opts:[
  {t:'JOÃO E O PÉ DE FEIJÃO', no:'No texto não tem vaca, feijão nem Gigante.'},
  {t:'CHAPEUZINHO VERMELHO', ok:1},
  {t:'OS TRÊS PORQUINHOS', no:'No texto não tem porquinhos.'},
  {t:'NENHUMA, PORQUE NÃO DÁ PARA RECONHECER', no:'Na paródia sempre dá para reconhecer o original: menina chamada Chapeuzinho, lobo e visita a alguém da família.'}
 ],
 dica:'Uma menina com "Chapeuzinho" no nome e um lobo no caminho... lembra qual história?',
 visual:'<p class="vx"><span class="mk">CHAPEUZINHO</span> AZUL · <span class="mk">LOBO</span> · LEVAR COMIDA PARA O <span class="mk">VOVÔ</span></p>',
 porque:'A menina se chama Chapeuzinho, encontra um lobo no caminho e leva comida para o vovô: dá para reconhecer Chapeuzinho Vermelho.',
 proximo:'Paródia imita o original: o que ficou igual é a pista da história original.'},

{id:'SPD3', eixo:'parodia', tipo:'o que mudou na paródia', enun:'LEIA O TEXTO:', texto:TX_PARODIA,
 pede:'O QUE MUDOU EM RELAÇÃO À HISTÓRIA ORIGINAL?',
 opts:[
  {t:'NADA MUDOU: É A MESMA HISTÓRIA.', no:'Mudou muita coisa: a cor do nome, a comida e quem recebe a visita.'},
  {t:'SÓ MUDOU O LUGAR: AGORA É NUM CASTELO.', no:'O texto não fala em castelo.'},
  {t:'A COR DO NOME, A COMIDA E QUEM RECEBE A VISITA.', ok:1},
  {t:'SÓ MUDOU O NOME DO LOBO.', no:'O lobo nem tem nome no texto. O que mudou foi a cor, a comida e quem recebe a visita.'}
 ],
 dica:'Compare com o original: capuz vermelho, doces, vovó.',
 visual:'<div class="pcs"><span class="pc">VERMELHO</span><span class="arw">&rarr;</span><span class="pc bad">AZUL</span></div><div class="pcs"><span class="pc">DOCES</span><span class="arw">&rarr;</span><span class="pc bad">SANDUÍCHE</span></div><div class="pcs"><span class="pc">VOVÓ</span><span class="arw">&rarr;</span><span class="pc bad">VOVÔ</span></div>',
 porque:'Vermelho virou azul, os doces viraram sanduíche e a vovó virou o vovô: mudanças de propósito. É uma paródia.',
 proximo:'Para achar o que mudou, ponha o original do lado e compare pedaço por pedaço.'},

{id:'SPD4', eixo:'parodia', tipo:'qual é a paródia',
 pede:'QUAL FRASE É UMA PARÓDIA DE "JOÃO E O PÉ DE FEIJÃO"?',
 opts:[
  {t:'O MENINO TROCOU A VACA POR FEIJÕES MÁGICOS.', no:'Aqui nada mudou no que acontece: só trocou João por "o menino". É paráfrase.'},
  {t:'JOÃO E A MÃE ERAM POBRES E SÓ TINHAM UMA VACA.', no:'Isso é a própria história original, sem mudança.'},
  {t:'JOÃO TROCOU A VACA POR SEMENTES DE PIPOCA, E O PÉ DE PIPOCA ESTOUROU ATÉ O CÉU.', ok:1},
  {t:'A GAROTA LEVOU GULOSEIMAS PARA A AVÓ.', no:'Essa frase é da história da Chapeuzinho, não da de João.'}
 ],
 dica:'Paródia muda alguma coisa de propósito, e ainda dá para reconhecer o original.',
 visual:'<div class="pcs"><span class="pc">FEIJÕES MÁGICOS</span><span class="arw">&rarr;</span><span class="pc bad">SEMENTES DE PIPOCA</span></div>',
 porque:'O feijão virou pipoca, de propósito e de um jeito engraçado, mas ainda dá para reconhecer a história de João. É paródia.',
 proximo:'Paródia = imita + muda de propósito. Se só trocou palavras, é paráfrase.'},

{id:'SPD5', eixo:'parodia', tipo:'paródia de música',
 enun:'LEIA:', quadro:'MÚSICA ORIGINAL: CIRANDA, CIRANDINHA, VAMOS TODOS CIRANDAR.<div class="sep"></div>PARÓDIA: CIRANDA, CIRANDINHA, VAMOS TODOS ESTUDAR!',
 pede:'NESSA PARÓDIA DE MÚSICA, O QUE FICOU IGUAL?',
 opts:[
  {t:'A LETRA: NENHUMA PALAVRA MUDOU.', no:'A letra mudou: "cirandar" virou "estudar".'},
  {t:'A MELODIA: CANTA-SE DO MESMO JEITO.', ok:1},
  {t:'NADA: NÃO DÁ PARA RECONHECER A MÚSICA ORIGINAL.', no:'Dá para reconhecer: é a mesma música, cantada do mesmo jeito.'},
  {t:'A MÚSICA: AGORA É OUTRA CANTIGA, A "BORBOLETINHA".', no:'Não virou outra cantiga: dá para reconhecer a "Ciranda, cirandinha", cantada do mesmo jeito.'}
 ],
 dica:'Cante as duas. O jeito de cantar muda?',
 porque:'Na paródia de música, a melodia continua a mesma e a letra muda.',
 proximo:'Paródia de música: mesma melodia, letra nova.'},

{id:'SPD6', eixo:'parodia', tipo:'paródia de música',
 enun:'LEIA:', quadro:'MÚSICA ORIGINAL: CIRANDA, CIRANDINHA, VAMOS TODOS CIRANDAR.<div class="sep"></div>PARÓDIA: CIRANDA, CIRANDINHA, VAMOS TODOS ESTUDAR!',
 pede:'O QUE MUDOU NESTA PARÓDIA?',
 opts:[
  {t:'A MELODIA: AGORA SE CANTA DE OUTRO JEITO.', no:'A melodia é a mesma. O que mudou foi a letra.'},
  {t:'VIROU OUTRA MÚSICA: "PARABÉNS A VOCÊ".', no:'Continua sendo a "Ciranda, cirandinha": a melodia é a mesma.'},
  {t:'NADA MUDOU.', no:'Mudou a letra: "cirandar" virou "estudar".'},
  {t:'A LETRA: "CIRANDAR" VIROU "ESTUDAR".', ok:1}
 ],
 dica:'Compare as palavras das duas.',
 porque:'A letra mudou de propósito: "cirandar" virou "estudar". A melodia é a mesma.',
 proximo:'Paródia de música: mesma melodia, letra nova.'},

{id:'SPD7', eixo:'parodia', tipo:'paráfrase ou paródia',
 enun:'COMPARE:', quadro:'ORIGINAL: OS TRÊS PORQUINHOS FIZERAM CASAS DE PALHA, DE MADEIRA E DE TIJOLOS.<div class="sep"></div>NOVO: OS TRÊS PORQUINHOS FIZERAM CASAS DE CHOCOLATE, DE BISCOITO E DE BOLO.',
 pede:'O TEXTO NOVO É...',
 opts:[
  {t:'UMA PARÁFRASE, PORQUE CONTA A MESMA COISA COM OUTRAS PALAVRAS.', no:'Não é a mesma coisa: casa de chocolate é diferente de casa de tijolos.'},
  {t:'UMA PARÓDIA, PORQUE IMITA O ORIGINAL E MUDA DE PROPÓSITO AS CASAS.', ok:1},
  {t:'UMA CÓPIA DO ORIGINAL, SEM NENHUMA MUDANÇA.', no:'Mudou o material das três casas.'},
  {t:'UM TEXTO QUE NÃO TEM NADA A VER COM OS TRÊS PORQUINHOS.', no:'Tem tudo a ver: são os mesmos três porquinhos fazendo casas.'}
 ],
 dica:'O material das casas ficou igual?',
 visual:'<div class="pcs"><span class="pc">PALHA, MADEIRA, TIJOLOS</span><span class="arw">&rarr;</span><span class="pc bad">CHOCOLATE, BISCOITO, BOLO</span></div>',
 porque:'Dá para reconhecer os três porquinhos, mas as casas mudaram de propósito, de um jeito engraçado: é paródia.',
 proximo:'O sentido mudou de propósito, imitando o original? Paródia.'},

{id:'SPD8', eixo:'parodia', tipo:'qual é a paródia',
 pede:'QUAL FRASE É UMA PARÓDIA DE "E VIVERAM FELIZES PARA SEMPRE"?',
 opts:[
  {t:'E FORAM FELIZES PARA SEMPRE.', no:'Aqui o sentido é o mesmo: é paráfrase.'},
  {t:'E VIVERAM FELIZES PARA SEMPRE.', no:'Essa é a frase original, sem mudança.'},
  {t:'E TODOS FICARAM CONTENTES PARA SEMPRE.', no:'Contente = feliz: o sentido é o mesmo. É paráfrase.'},
  {t:'E VIVERAM COMENDO PIZZA PARA SEMPRE.', ok:1}
 ],
 dica:'Procure a que imita a frase e muda algo de propósito, de um jeito engraçado.',
 porque:'"Comendo pizza para sempre" imita a frase famosa e muda de propósito, para ficar engraçado: é paródia.',
 proximo:'Mesmo sentido = paráfrase. Mudou de propósito, imitando = paródia.'},

{id:'SPD9', eixo:'parodia', tipo:'paráfrase ou paródia',
 pede:'COMO SABER SE UM TEXTO É PARÁFRASE OU PARÓDIA?',
 opts:[
  {t:'SE O SENTIDO FICOU IGUAL, É PARÁFRASE; SE MUDOU DE PROPÓSITO, IMITANDO O ORIGINAL, É PARÓDIA.', ok:1},
  {t:'SE O SENTIDO FICOU IGUAL, É PARÓDIA; SE MUDOU DE PROPÓSITO, É PARÁFRASE.', no:'Está trocado: sentido igual é paráfrase.'},
  {t:'SE O TEXTO É COMPRIDO, É PARÁFRASE; SE É CURTO, É PARÓDIA.', no:'O tamanho não decide. O que decide é se o sentido mudou.'},
  {t:'SE TEM DESENHO, É PARÓDIA; SE NÃO TEM, É PARÁFRASE.', no:'Desenho não decide. O que decide é se o sentido mudou.'}
 ],
 dica:'A pergunta-chave é: o sentido mudou?',
 porque:'Teste rápido: sentido igual → paráfrase. Mudou de propósito, imitando o original → paródia.',
 proximo:'Sempre pergunte: o sentido mudou?'}
);

/* =================== BLOCO C · INVENÇÕES =================== */
ITENS.push(
{id:'SIN1', eixo:'invento', tipo:'com suas palavras',
 pede:'COM SUAS PALAVRAS: O QUE É UMA INVENÇÃO? MARQUE A MELHOR RESPOSTA.',
 opts:[
  {t:'ALGO QUE JÁ EXISTIA NA NATUREZA E ALGUÉM ENCONTROU.', no:'Isso é DESCOBERTA. Invenção é algo que não existia antes.'},
  {t:'ALGO QUE AS PESSOAS CRIARAM E QUE NÃO EXISTIA ANTES.', ok:1},
  {t:'UMA HISTÓRIA QUE COMEÇA COM "ERA UMA VEZ".', no:'Isso é conto de fadas.'},
  {t:'UMA PALAVRA EXPLICADA NO DICIONÁRIO.', no:'Isso é verbete.'}
 ],
 dica:'A lâmpada não existia na natureza. Alguém...',
 porque:'Invenção é algo criado pelas pessoas, que não existia antes: a roda, a lâmpada, o telefone.',
 proximo:'Invenção: criada. Descoberta: encontrada.'},

{id:'SIN2', eixo:'invento', tipo:'invenção ou descoberta',
 pede:'QUAL DESTES É UMA INVENÇÃO?',
 opts:[
  {t:'O SOL', no:'O sol sempre existiu. Ninguém inventou o sol.'},
  {t:'A CHUVA', no:'A chuva é da natureza. Ninguém inventou a chuva.'},
  {t:'A LÂMPADA', ok:1},
  {t:'O RIO', no:'O rio é da natureza. Ninguém inventou o rio.'}
 ],
 dica:'Qual deles foi feito por pessoas?',
 porque:'A lâmpada foi criada por pessoas. Sol, chuva e rio são da natureza.',
 proximo:'Foi feito por gente e não existia antes? Invenção.'},

{id:'SIN3', eixo:'invento', tipo:'invenção ou descoberta',
 pede:'QUAL DESTES FOI UMA DESCOBERTA, E NÃO UMA INVENÇÃO?',
 opts:[
  {t:'A BICICLETA', no:'A bicicleta foi criada por pessoas: é invenção.'},
  {t:'O TELEFONE', no:'O telefone foi criado por pessoas: é invenção.'},
  {t:'O AVIÃO', no:'O avião foi criado por pessoas: é invenção.'},
  {t:'O FOGO', ok:1}
 ],
 dica:'Qual deles já existia na natureza?',
 porque:'O fogo já existia na natureza: as pessoas o descobriram. Bicicleta, telefone e avião foram inventados.',
 proximo:'Já existia? Descoberta. Não existia? Invenção.'},

{id:'SIN4', eixo:'invento', tipo:'conceito',
 pede:'QUEM INVENTA ALGUMA COISA É CHAMADO DE...',
 opts:[
  {t:'INVENTOR', ok:1},
  {t:'PERSONAGEM', no:'Personagem é quem participa de uma história.'},
  {t:'LEITOR', no:'Leitor é quem lê.'},
  {t:'VERBETE', no:'Verbete é a palavra explicada no dicionário.'}
 ],
 dica:'Inventa... inven...',
 porque:'Quem inventa é o INVENTOR.',
 proximo:'Inventar → invenção → inventor.'},

{id:'SIN5', eixo:'invento', tipo:'conceito',
 pede:'O BRASILEIRO SANTOS DUMONT É CONHECIDO COMO...',
 opts:[
  {t:'O PAI DA AVIAÇÃO', ok:1},
  {t:'O DESCOBRIDOR DO FOGO', no:'O fogo foi descoberto há muitíssimo tempo, e ninguém sabe por quem.'},
  {t:'O AUTOR DE CHAPEUZINHO VERMELHO', no:'Chapeuzinho é um conto antigo, contado de geração em geração.'},
  {t:'O INVENTOR DO DICIONÁRIO', no:'Santos Dumont é lembrado pelo avião 14-Bis.'}
 ],
 dica:'Ele criou o 14-Bis, que voava.',
 porque:'Santos Dumont, brasileiro, é conhecido como o pai da aviação: ele criou o 14-Bis.',
 proximo:'Santos Dumont → avião → pai da aviação.'},

{id:'SIN6', eixo:'invento', tipo:'para que serve',
 pede:'PARA QUE SERVEM AS INVENÇÕES?',
 opts:[
  {t:'PARA RESOLVER PROBLEMAS E FACILITAR A VIDA DAS PESSOAS.', ok:1},
  {t:'PARA ENFEITAR OS CONTOS DE FADAS.', no:'Invenções são usadas na vida real, não só nas histórias.'},
  {t:'PARA FICAR GUARDADAS, SEM USO.', no:'Invenção é feita para ser usada.'},
  {t:'PARA EXPLICAR O SIGNIFICADO DAS PALAVRAS.', no:'Isso é o que o dicionário faz.'}
 ],
 dica:'Pense na lâmpada: o que ela resolve?',
 porque:'As invenções resolvem problemas e facilitam a vida: a lâmpada ilumina a noite, a geladeira guarda a comida.',
 proximo:'Toda invenção resolve algum problema.'},

{id:'SIN7', eixo:'invento', tipo:'para que serve',
 pede:'QUAL INVENÇÃO AJUDA A FALAR COM QUEM ESTÁ LONGE?',
 opts:[
  {t:'A RODA', no:'A roda ajuda a levar coisas, mas não a falar.'},
  {t:'O TELEFONE', ok:1},
  {t:'A GELADEIRA', no:'A geladeira guarda os alimentos gelados.'},
  {t:'A LÂMPADA', no:'A lâmpada ilumina.'}
 ],
 dica:'Alô? Quem fala?',
 porque:'O telefone foi inventado para as pessoas conversarem mesmo estando longe.',
 proximo:'Pense no problema que cada invenção resolve.'},

{id:'SIN8', eixo:'invento', tipo:'para que serve',
 pede:'QUAL INVENÇÃO MANTÉM OS ALIMENTOS GELADOS?',
 opts:[
  {t:'O RELÓGIO', no:'O relógio mostra as horas.'},
  {t:'A BICICLETA', no:'A bicicleta serve para andar.'},
  {t:'A GELADEIRA', ok:1},
  {t:'O AVIÃO', no:'O avião leva as pessoas pelo ar.'}
 ],
 dica:'Onde fica o leite na sua casa?',
 porque:'A geladeira mantém os alimentos gelados e conservados.',
 proximo:'Pense no problema que cada invenção resolve.'},

{id:'SIN9', eixo:'invento', tipo:'invenção ou descoberta',
 pede:'ENCONTRAR UM ANIMAL QUE NINGUÉM CONHECIA É...',
 opts:[
  {t:'UMA INVENÇÃO, PORQUE O ANIMAL FOI CRIADO POR PESSOAS.', no:'Ninguém criou o animal: ele já existia na natureza.'},
  {t:'UMA DESCOBERTA, PORQUE O ANIMAL JÁ EXISTIA.', ok:1},
  {t:'UMA PARÓDIA, PORQUE O ANIMAL É ENGRAÇADO.', no:'Paródia é um texto que imita outro.'},
  {t:'UM VERBETE, PORQUE O ANIMAL TEM NOME.', no:'Verbete é a palavra explicada no dicionário.'}
 ],
 dica:'O animal já existia antes de alguém achar?',
 porque:'O animal já vivia na natureza; alguém só o encontrou. Isso é descoberta.',
 proximo:'Já existia? Descoberta.'},

{id:'SIN10', eixo:'invento', tipo:'trecho', enun:'LEIA O TEXTO:', texto:TX_INVENTO,
 pede:'SEGUNDO O TEXTO, POR QUE O FOGO NÃO É UMA INVENÇÃO?',
 opts:[
  {t:'PORQUE ELE ILUMINA A NOITE.', no:'Quem ilumina a noite, no texto, é a lâmpada.'},
  {t:'PORQUE ELE JÁ EXISTIA NA NATUREZA.', ok:1},
  {t:'PORQUE ELE RESOLVE PROBLEMAS.', no:'Resolver problemas é o que o texto diz das invenções.'},
  {t:'PORQUE ELE É MUITO QUENTE.', no:'O texto não fala do calor do fogo.'}
 ],
 dica:'Leia a terceira linha.',
 visual:'<p class="vx">JÁ O FOGO NÃO FOI INVENTADO: <span class="mk">ELE JÁ EXISTIA NA NATUREZA</span>.</p>',
 porque:'O texto diz que o fogo já existia na natureza. Encontrar algo que já existia é descoberta.',
 proximo:'A resposta mora no texto: ache a linha com a palavra da pergunta.'}
);

/* truque e origem vêm da família: a frase do truque é IDÊNTICA em todo
   item da família, e a origem é o nome do conteúdo na tela. */
var FAM={}; FAMILIAS.forEach(function(f){ FAM[f.k]=f; });
ITENS.forEach(function(i){
  i.truque = FAM[i.eixo].truque;
  i.origem = 'Português · ' + FAM[i.eixo].nome;
});

return { FAMILIAS: FAMILIAS, ITENS: ITENS,
         acha: function(id){ return ITENS.filter(function(x){ return x.id===id; })[0]||null; } };
})();
