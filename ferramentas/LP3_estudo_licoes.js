/* ============================================================
   LP3_estudo_licoes.js — as 12 LIÇÕES do estudo (LP3_estudo.html).

   Fonte única: trabalho/3tri_portugues/_roteiro.md. Nada de fato do
   livro "Invenções" da escola (não foi fornecido). Respeitadas as notas
   "Evitar como pergunta": sempre "o caçador"; nada do que o lobo fez
   com a vovó em detalhe; nada de fala exata do gigante nem de quantas
   vezes João subiu; nada de plural em ÃES/ÃOS.

   Tipos de telinha (o motor desenha cada um):
     texto       html livre
     palavras    regra + palavras-exemplo tocáveis (lidas pela Thalita)
     revela      cartões "toque para ver"
     personagens figurinhas com nome e uma linha
     quadrinhos  cenas desenhadas em SVG (LP3_arte.js) + legenda
     dialogo     as falas da Chapeuzinho; tocar mostra a resposta do lobo
     ordena      tocar nos quadros na ordem da história
     escolha     uma palavra por vez, com resposta e explicação
     pares       MOLA → MOLHA
   Marcação das palavras: [X] destaca, {U} U quietinho, (H) H mudo,
   _ buraco a completar; "PALAVRA|SÍ-LA-BAS" mostra a separação.
   ============================================================ */
window.LP3_LICOES = (function(){
'use strict';
function W(s){ return String(s).replace(/\[([^\]]+)\]/g,'<span class="hl">$1</span>')
  .replace(/\{([^}]+)\}/g,'<span class="qt">$1</span>').replace(/\(([^)]+)\)/g,'<span class="mudo">$1</span>'); }
function limpo(s){ return String(s).replace(/[\[\]{}()]/g,''); }
/* fileira de palavras tocáveis para usar dentro de html livre */
function P(lista, grandes){
  return '<div class="pals'+(grandes?' grandes':'')+'">'+lista.map(function(p){
    var m=p.split('|');
    return '<button class="pal" data-f="'+limpo(m[0]).replace(/→/g,',')+'">'+W(m[0])+(m[1]?'<small class="sil">'+m[1]+'</small>':'')+'</button>';
  }).join('')+'</div>';
}
function R(t){ return '<div class="regra">'+t+'</div>'; }
function caixa(t,corpo){ return '<div class="caixa"><h3>'+t+'</h3>'+corpo+'</div>'; }

return [

/* ===================== 1. CONTOS DE FADAS ===================== */
{k:'conto', tema:'conto', nome:'Contos de fadas', telas:[
 {tipo:'texto', tit:'O que é um conto de fadas?',
  fala:'Conto de fadas é uma história inventada, contada de geração em geração. Quase sempre começa com: Era uma vez. E termina com: e viveram felizes para sempre.',
  html:R('Conto de fadas é uma <b>história inventada</b>, contada de geração em geração: os avós contaram para os pais, e os pais contam para os filhos.')+
   '<div class="dupla">'+caixa('Como começa','<p class="frase">“Era uma vez...”</p>')+
   caixa('Como termina','<p class="frase">“...e viveram felizes para sempre.”</p>')+'</div>'+
   R('<b>Chapeuzinho Vermelho</b>, <b>João e o pé de feijão</b> e <b>Os Três Porquinhos</b> são contos de fadas.')},
 {tipo:'revela', tit:'O que tem num conto de fadas', regra:'Toque em cada cartão para ver.',
  cartoes:[
   {f:'Começo', fig:'livro', b:'“Era uma vez...”'},
   {f:'Mocinho', fig:'chapeu', b:'O herói da história: Chapeuzinho, João.'},
   {f:'Vilão', fig:'lobo', fundo:'#fee2e2', b:'Quem faz maldade: o Lobo Mau, o Gigante.'},
   {f:'Lugar', fig:'castelo', b:'Floresta, castelo, casa da vovó, a terra no alto das nuvens.'},
   {f:'Magia', fig:'feijoes', b:'Feijões mágicos, galinha dos ovos de ouro, harpa que canta, lobo que fala.'},
   {f:'Problema e solução', fig:'machado', b:'Acontece um perigo, e alguém resolve.'},
   {f:'Final feliz', fig:'coracao', b:'“...e viveram felizes para sempre.”'}
  ]},
 {tipo:'escolha', tit:'Mocinho ou vilão?', pergunta:'Esse personagem é mocinho ou vilão?', rotulo:'Personagem', medio:true,
  op:['Mocinho','Vilão'], itens:[
   {m:'CHAPEUZINHO VERMELHO', c:'Mocinho', d:'Chapeuzinho é a mocinha da história.'},
   {m:'LOBO MAU', c:'Vilão', d:'O Lobo Mau engana a Chapeuzinho: é o vilão.'},
   {m:'JOÃO', c:'Mocinho', d:'João é o herói da sua história.'},
   {m:'GIGANTE', c:'Vilão', d:'O Gigante do castelo é o vilão da história do João.'}
  ]},
 {tipo:'escolha', tit:'É mágico?', pergunta:'Isso é mágico ou é comum?', rotulo:'Coisa', medio:true,
  op:['Mágico','Comum'], itens:[
   {m:'FEIJÕES MÁGICOS', c:'Mágico', d:'Deles nasceu um pé de feijão até as nuvens.'},
   {m:'HARPA QUE CANTA', c:'Mágico', d:'Harpa de verdade não canta sozinha.'},
   {m:'LOBO QUE FALA', c:'Mágico', d:'Lobo de verdade não fala. No conto, fala.'},
   {m:'GALINHA DOS OVOS DE OURO', c:'Mágico', d:'Galinha de verdade não bota ovo de ouro.'},
   {m:'CESTA DE DOCES', c:'Comum', d:'Uma cesta de doces existe de verdade.'},
   {m:'MACHADO', c:'Comum', d:'O machado é uma ferramenta comum.'}
  ]}
]},

/* ===================== 2. CHAPEUZINHO VERMELHO ===================== */
{k:'chapeu', tema:'chapeu', nome:'Chapeuzinho Vermelho', telas:[
 {tipo:'personagens', tit:'Quem está na história', figs:[
   {k:'chapeu', nome:'Chapeuzinho Vermelho', desc:'usava uma capa com capuz vermelho; por isso o nome'},
   {k:'mae', nome:'A mãe', desc:'mandou a cesta de doces e deu um conselho'},
   {k:'vovo', nome:'A vovó', desc:'estava doente, em casa'},
   {k:'lobo', nome:'O Lobo Mau', desc:'o vilão: enganou a menina', vilao:true, fundo:'#fee2e2'},
   {k:'cacador', nome:'O caçador', desc:'ouviu, entrou e salvou as duas'}
  ]},
 {tipo:'quadrinhos', tit:'A história · parte 1',
  fala:'Uma menina usava uma capa com capuz vermelho. Por isso, a chamavam de Chapeuzinho Vermelho. A mãe pediu que ela levasse uma cesta com doces para a vovó, que estava doente. A mãe avisou: não saia do caminho e não converse com estranhos! Na floresta, Chapeuzinho encontrou o Lobo Mau e contou aonde ia.',
  quadros:[
   {n:1, cena:'ch1', cap:'Uma menina usava uma capa com <b>capuz vermelho</b>. Por isso, a chamavam de Chapeuzinho Vermelho.'},
   {n:2, cena:'ch2', cap:'A mãe pediu que ela levasse uma <b>cesta com doces</b> para a vovó, que estava doente.'},
   {n:3, cena:'ch3', cap:'A mãe avisou: <b>não saia do caminho</b> e não converse com estranhos!'},
   {n:4, cena:'ch4', cap:'Na floresta, Chapeuzinho encontrou o <b>Lobo Mau</b> e contou aonde ia.'}
  ],
  depois:'O conselho da mãe: não sair do caminho e não conversar com estranhos.'},
 {tipo:'quadrinhos', tit:'A história · parte 2',
  fala:'O lobo foi por um atalho e chegou antes na casa da vovó. O lobo se disfarçou de vovó e deitou na cama. Chapeuzinho chegou e disse: Vovó, que olhos grandes você tem! Um caçador ouviu, entrou e salvou Chapeuzinho e a vovó.',
  quadros:[
   {n:5, cena:'ch5', cap:'O lobo foi por um <b>atalho</b> e chegou antes na casa da vovó.'},
   {n:6, cena:'ch6', cap:'O lobo se <b>disfarçou de vovó</b> e deitou na cama.'},
   {n:7, cena:'ch7', cap:'Chapeuzinho chegou e disse: “Vovó, que <b>olhos grandes</b> você tem!”'},
   {n:8, cena:'ch8', cap:'Um <b>caçador</b> ouviu, entrou e salvou Chapeuzinho e a vovó.'}
  ]},
 {tipo:'dialogo', tit:'Que olhos grandes!', cena:'ch7',
  regra:'Toque na fala da Chapeuzinho para ver o que o lobo respondeu.',
  fala:'Vovó, que olhos grandes você tem! É para te ver melhor! Que orelhas grandes! É para te ouvir melhor! Que boca grande! É para te comer!',
  falas:[
   {p:'— Vovó, que <b>olhos</b> grandes você tem!', r:'— É para te <b>ver</b> melhor!'},
   {p:'— Que <b>orelhas</b> grandes!', r:'— É para te <b>ouvir</b> melhor!'},
   {p:'— Que <b>boca</b> grande!', r:'— É para te <b>comer</b>!'}
  ]},
 {tipo:'ordena', tit:'Ponha a história em ordem', regra:'Toque nos quadros na ordem em que tudo aconteceu.',
  fala:'Toque nos quadros na ordem em que tudo aconteceu.',
  quadros:[
   {cena:'ch2', cap:'A mãe dá a cesta.'},
   {cena:'ch4', cap:'O lobo aparece na floresta.'},
   {cena:'ch6', cap:'O lobo deita na cama, vestido de vovó.'},
   {cena:'ch8', cap:'O caçador salva as duas.'}
  ]}
]},

/* ===================== 3. JOÃO E O PÉ DE FEIJÃO ===================== */
{k:'joao', tema:'joao', nome:'João e o pé de feijão', telas:[
 {tipo:'personagens', tit:'Quem está na história', figs:[
   {k:'joao', nome:'João', desc:'trocou a vaca por feijões mágicos'},
   {k:'mae', nome:'A mãe', desc:'ficou brava e jogou os feijões pela janela'},
   {k:'vaca', nome:'A vaca', desc:'era tudo o que a família tinha'},
   {k:'gigante', nome:'O Gigante', desc:'o vilão: morava num castelo nas nuvens', vilao:true, fundo:'#fee2e2'}
  ]},
 {tipo:'revela', tit:'Os objetos mágicos', regra:'Na história do João tem magia. Toque para ver.',
  cartoes:[
   {f:'Feijões mágicos', fig:'feijoes', b:'A mãe jogou pela janela e, de noite, nasceu um pé de feijão gigante.'},
   {f:'Galinha dos ovos de ouro', fig:'galinha', b:'João levou do castelo do Gigante.'},
   {f:'Harpa mágica', fig:'harpa', b:'Depois, João levou também a harpa.'}
  ]},
 {tipo:'quadrinhos', tit:'A história · parte 1',
  fala:'João e a mãe eram pobres. Só tinham uma vaca. A mãe mandou vender a vaca. João trocou a vaca por feijões mágicos. A mãe ficou brava e jogou os feijões pela janela.',
  quadros:[
   {n:1, cena:'jo1', cap:'João e a mãe eram pobres. Só tinham uma <b>vaca</b>.'},
   {n:2, cena:'jo2', cap:'A mãe mandou vender a vaca. João trocou a vaca por <b>feijões mágicos</b>.'},
   {n:3, cena:'jo3', cap:'A mãe ficou brava e <b>jogou os feijões pela janela</b>.'}
  ]},
 {tipo:'quadrinhos', tit:'A história · parte 2',
  fala:'De noite, nasceu um pé de feijão gigante, que subia até as nuvens. João subiu e achou o castelo do Gigante. João levou a galinha dos ovos de ouro e, depois, a harpa mágica.',
  quadros:[
   {n:4, cena:'jo4', cap:'De noite, nasceu um <b>pé de feijão gigante</b>, que subia até as nuvens.'},
   {n:5, cena:'jo5', cap:'João subiu e achou o <b>castelo do Gigante</b>.'},
   {n:6, cena:'jo6', cap:'João levou a <b>galinha dos ovos de ouro</b> e, depois, a <b>harpa mágica</b>.'}
  ]},
 {tipo:'quadrinhos', tit:'A história · parte 3',
  fala:'O Gigante acordou e desceu atrás dele. João pegou o machado e cortou o pé de feijão. O Gigante caiu. João e a mãe viveram felizes, sem passar necessidade.',
  quadros:[
   {n:7, cena:'jo7', cap:'O Gigante acordou e <b>desceu atrás dele</b>.'},
   {n:8, cena:'jo8', cap:'João pegou o <b>machado</b> e cortou o pé de feijão. O Gigante caiu.'},
   {n:9, cena:'jo9', cap:'João e a mãe viveram <b>felizes</b>, sem passar necessidade.'}
  ]},
 {tipo:'ordena', tit:'Ponha a história em ordem', regra:'Toque nos quadros na ordem em que tudo aconteceu.',
  fala:'Toque nos quadros na ordem em que tudo aconteceu.',
  quadros:[
   {cena:'jo2', cap:'João troca a vaca por feijões.'},
   {cena:'jo4', cap:'Nasce o pé de feijão.'},
   {cena:'jo6', cap:'João leva a galinha dos ovos de ouro.'},
   {cena:'jo8', cap:'João corta o pé de feijão.'}
  ]}
]},

/* ===================== 4. PARÁFRASE E PARÓDIA ===================== */
{k:'parodia', tema:'parodia', nome:'Paráfrase e paródia', telas:[
 {tipo:'texto', tit:'Paráfrase: outras palavras',
  fala:'Paráfrase é contar a mesma história com outras palavras. Nada muda no que acontece. Original: Chapeuzinho levou doces para a vovó. Paráfrase: A menina da capa vermelha foi entregar guloseimas à avó.',
  html:R('<b>Paráfrase</b> é contar a <b>mesma história</b> com <b>outras palavras</b>. Nada muda no que acontece.')+
   '<div class="dupla">'+caixa('Original','<p class="frase"><span class="troca">Chapeuzinho</span> levou <span class="troca">doces</span> para a <span class="troca">vovó</span>.</p>')+
   caixa('Paráfrase','<p class="frase">A <span class="troca">menina da capa vermelha</span> foi entregar <span class="troca">guloseimas</span> à <span class="troca">avó</span>.</p>')+'</div>'+
   R('Guloseimas são doces. Mudaram as palavras, mas a história é a mesma.')},
 {tipo:'texto', tit:'Paródia: muda de propósito',
  fala:'Paródia imita a história e muda alguma coisa de propósito, muitas vezes para ficar engraçada. E ainda dá para reconhecer a original. Chapeuzinho Verde foi de bicicleta levar pizza para o vovô, e o lobo era vegetariano.',
  html:R('<b>Paródia</b> <b>imita</b> a história e <b>muda alguma coisa de propósito</b>: o personagem, a cor, o lugar, o final. Muitas vezes, fica engraçada. E ainda dá para reconhecer a original.')+
   '<div class="dupla">'+caixa('Paródia da Chapeuzinho','<p class="frase">Chapeuzinho <span class="muda">Verde</span> foi <span class="muda">de bicicleta</span> levar <span class="muda">pizza</span> para o <span class="muda">vovô</span>, e o lobo era <span class="muda">vegetariano</span>.</p>')+
   caixa('Paródia do João','<p class="frase">João trocou a vaca por <span class="muda">sementes de pipoca</span>, e o <span class="muda">pé de pipoca estourou até o céu</span>.</p>')+'</div>'},
 {tipo:'texto', tit:'A pergunta que resolve',
  fala:'Mudou o que acontece? Não: é paráfrase. Sim, de propósito: é paródia.',
  html:'<div class="chave"><div><span class="tag">Pergunte</span><span>Mudou o que acontece na história?</span></div>'+
   '<div><span class="tag">Não</span><span>É <b>paráfrase</b>: mesma história, outras palavras.</span></div>'+
   '<div><span class="tag">Sim</span><span>É <b>paródia</b>: imita e muda de propósito.</span></div></div>'},
 {tipo:'escolha', tit:'Paráfrase ou paródia?', pergunta:'Mudou o que acontece na história?', rotulo:'Frase', proxRot:'Próxima frase', frase:true,
  op:['Paráfrase','Paródia'], itens:[
   {m:'A menina da capa vermelha foi entregar guloseimas à avó.', c:'Paráfrase', d:'Mesma história, outras palavras.'},
   {m:'Chapeuzinho Verde foi de bicicleta levar pizza para o vovô, e o lobo era vegetariano.', c:'Paródia', d:'Mudaram a cor, a comida, quem recebe a visita e o lobo.'},
   {m:'João trocou a vaca por sementes de pipoca, e o pé de pipoca estourou até o céu.', c:'Paródia', d:'O feijão virou pipoca: mudou de propósito.'},
   {m:'O menino deu a vaca e ganhou feijões mágicos.', c:'Paráfrase', d:'É o que acontece na história do João, com outras palavras.'},
   {m:'O lobo correu por um caminho mais curto e chegou primeiro à casa da avó.', c:'Paráfrase', d:'Atalho é um caminho mais curto. Nada mudou.'},
   {m:'O Gigante desceu atrás de João, escorregou numa casca de banana e virou amigo dele.', c:'Paródia', d:'O final mudou de propósito, para ficar engraçado.'}
  ]}
]},

/* ===================== 5. LETRA H ===================== */
{k:'h', tema:'h', nome:'Letra H', telas:[
 {tipo:'palavras', tit:'O H que não faz som', grandes:true,
  fala:'Algumas palavras começam com H. O H do começo não tem som, mas é escrito mesmo assim. Hoje. Hora. Homem. Falamos oje, mas escrevemos hoje, com H.',
  regra:'Algumas palavras começam com <b>H</b>. O H do começo <b>não tem som</b>, mas é escrito mesmo assim.',
  pals:['(H)OJE','(H)ORA','(H)OMEM'],
  depois:'Falamos “oje”, escrevemos <b>HOJE</b>. Falamos “ora”, escrevemos <b>HORA</b> (a do relógio).'},
 {tipo:'palavras', tit:'Palavras com H', regra:'Toque numa palavra: o H fica quietinho.',
  fala:'Hotel, hospital, hipopótamo, helicóptero, história, horta, hino, herói, hélice, hiena, hortelã, harpa, higiene, humano.',
  pals:['(H)OTEL','(H)OSPITAL','(H)IPOPÓTAMO','(H)ELICÓPTERO','(H)ISTÓRIA','(H)ORTA','(H)INO','(H)ERÓI','(H)ÉLICE','(H)IENA','(H)ORTELÃ','(H)ARPA','(H)IGIENE','(H)UMANO']},
 {tipo:'escolha', tit:'Tem H ou não tem?', pergunta:'Como começa esta palavra?', op:['H','Sem H'], itens:[
   {m:'_OJE', cheia:'(H)OJE', c:'H', d:'HOJE começa com H, mesmo sem som.'},
   {m:'_OVO', cheia:'OVO', c:'Sem H', d:'OVO começa direto com a vogal O.'},
   {m:'_OSPITAL', cheia:'(H)OSPITAL', c:'H', d:'HOSPITAL se escreve com H.'},
   {m:'_UVA', cheia:'UVA', c:'Sem H', d:'UVA começa direto com a vogal U.'},
   {m:'_ELICÓPTERO', cheia:'(H)ELICÓPTERO', c:'H', d:'HELICÓPTERO se escreve com H.'},
   {m:'_ILHA', cheia:'ILHA', c:'Sem H', d:'ILHA começa direto com a vogal I.'},
   {m:'_ORTA', cheia:'(H)ORTA', c:'H', d:'HORTA se escreve com H.'},
   {m:'_ESCOLA', cheia:'ESCOLA', c:'Sem H', d:'ESCOLA começa direto com a vogal E.'}
  ]}
]},

/* ===================== 6. J OU G ===================== */
{k:'jg', tema:'jg', nome:'J ou G', telas:[
 {tipo:'palavras', tit:'JA, JO, JU: sempre J',
  fala:'O som de jê pode ser escrito com J ou com G. Com A, O e U, é sempre J: janela, jacaré, jogo, joia, caju, juba, laranja, feijão.',
  regra:'O som de <b>jê</b> pode ser escrito com <b>J</b> ou com <b>G</b>. Com <b>A</b>, <b>O</b> e <b>U</b>, é <b>sempre J</b>: JA, JO, JU.',
  pals:['[JA]NELA','[JA]CARÉ','[JO]GO','[JO]IA','CA[JU]','[JU]BA','LARAN[JA]','FEI[J]ÃO'],
  depois:'Cuidado: <b>GA</b>, <b>GO</b>, <b>GU</b> fazem outro som, o de guê (gato, gorila).'},
 {tipo:'texto', tit:'JE e JI ou GE e GI?',
  fala:'Com E e I, os dois existem. Aí é preciso lembrar como a palavra se escreve. Com J: jeito, jiló, jipe, canjica, berinjela, sujeira. Com G: gelo, gente, geladeira, girafa, gigante, girassol, mágico, página, relógio, tigela.',
  html:R('Com <b>E</b> e <b>I</b>, os dois existem. Aí é preciso <b>lembrar como a palavra se escreve</b>.')+
   '<div class="dupla">'+caixa('Com J',P(['[JE]ITO','[JI]LÓ','[JI]PE','CAN[JI]CA','BERIN[JE]LA','SU[JE]IRA']))+
   caixa('Com G',P(['[GE]LO','[GE]NTE','[GE]LADEIRA','[GI]RAFA','[GI]GANTE','[GI]RASSOL','MÁ[GI]CO','PÁ[GI]NA','RELÓ[GI]O','TI[GE]LA']))+'</div>'},
 {tipo:'escolha', tit:'J ou G?', pergunta:'Qual letra completa a palavra?', op:['J','G'], itens:[
   {m:'_ACARÉ', cheia:'[J]ACARÉ', c:'J', d:'JA: sempre J.'},
   {m:'CA_U', cheia:'CA[J]U', c:'J', d:'JU: sempre J.'},
   {m:'_IRAFA', cheia:'[G]IRAFA', c:'G', d:'GIRAFA se escreve com G.'},
   {m:'_ELO', cheia:'[G]ELO', c:'G', d:'GELO se escreve com G.'},
   {m:'_IPE', cheia:'[J]IPE', c:'J', d:'JIPE se escreve com J.'},
   {m:'LARAN_A', cheia:'LARAN[J]A', c:'J', d:'JA: sempre J.'},
   {m:'MÁ_ICO', cheia:'MÁ[G]ICO', c:'G', d:'MÁGICO se escreve com G.'},
   {m:'_ANELA', cheia:'[J]ANELA', c:'J', d:'JA: sempre J.'}
  ]}
]},

/* ===================== 7. G OU GU ===================== */
{k:'ggu', tema:'ggu', nome:'G ou GU', telas:[
 {tipo:'palavras', tit:'GA, GO, GU',
  fala:'Com A, O e U, o som de guê é só o G: gato, galinha, galho, gorila, fogo, lago, gude, agulha.',
  regra:'Com <b>A</b>, <b>O</b> e <b>U</b>, o som de <b>guê</b> é só o <b>G</b>: GA, GO, GU.',
  pals:['[GA]TO','[GA]LINHA','[GA]LHO','[GO]RILA','FO[GO]','LA[GO]','[GU]DE','A[GU]LHA']},
 {tipo:'palavras', tit:'GUE, GUI: o U quietinho',
  fala:'Antes de E e I, para fazer o som de guê, entra um U que não se fala: guerra, foguete, fogueira, mangueira, formigueiro, guitarra, águia, guindaste, preguiça.',
  regra:'Antes de <b>E</b> e <b>I</b>, para fazer o som de guê, entra um <b>U</b> que <b>não se fala</b>: GUE, GUI.',
  pals:['[G{U}E]RRA','FO[G{U}E]TE','FO[G{U}E]IRA','MAN[G{U}E]IRA','FORMI[G{U}E]IRO','[G{U}I]TARRA','Á[G{U}I]A','[G{U}I]NDASTE','PRE[G{U}I]ÇA']},
 {tipo:'texto', tit:'GE e GI × GUE e GUI',
  fala:'Sem o U, GE e GI fazem som de jê: gelo, girafa. Com o U, GUE e GUI fazem som de guê: guerra, guitarra. Gigante tem os dois: GI, com som de jê, e GAN, com som de guê.',
  html:'<div class="dupla">'+caixa('Sem U: som de jê',P(['[GE]LO','[GI]RAFA']))+caixa('Com U: som de guê',P(['[G{U}E]RRA','[G{U}I]TARRA']))+'</div>'+
   R('Palavra que tem os dois: <b>GIGANTE</b>.')+P(['[GI]GANTE|GI tem som de jê','GI[GAN]TE|GAN tem som de guê'])},
 {tipo:'escolha', tit:'G ou GU?', pergunta:'O que completa a palavra?', op:['G','GU'], itens:[
   {m:'_ATO', cheia:'[G]ATO', c:'G', d:'GA: só o G.'},
   {m:'FO_ETE', cheia:'FO[G{U}]ETE', c:'GU', d:'GUE: o U fica quietinho.'},
   {m:'_ITARRA', cheia:'[G{U}]ITARRA', c:'GU', d:'GUI: o U fica quietinho.'},
   {m:'_ORILA', cheia:'[G]ORILA', c:'G', d:'GO: só o G.'},
   {m:'MAN_EIRA', cheia:'MAN[G{U}]EIRA', c:'GU', d:'GUE: o U fica quietinho.'},
   {m:'Á_IA', cheia:'Á[G{U}]IA', c:'GU', d:'GUI: o U fica quietinho.'},
   {m:'LA_O', cheia:'LA[G]O', c:'G', d:'GO: só o G.'},
   {m:'_ALINHA', cheia:'[G]ALINHA', c:'G', d:'GA: só o G.'}
  ]}
]},

/* ===================== 8. DICIONÁRIO ===================== */
{k:'dic', tema:'dic', nome:'Dicionário', telas:[
 {tipo:'texto', tit:'Ordem alfabética',
  fala:'No dicionário, as palavras estão em ordem alfabética, a ordem do alfabeto. O alfabeto tem 26 letras. Palavra com A vem antes de palavra com B, e assim por diante.',
  html:R('No dicionário, as palavras estão em <b>ordem alfabética</b>: a ordem do alfabeto, que tem <b>26 letras</b>.')+
   '<div class="abc">'+'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(l){ return '<span>'+l+'</span>'; }).join('')+'</div>'+
   R('Palavra com <b>A</b> vem antes de palavra com <b>B</b>, e assim por diante.')},
 {tipo:'texto', tit:'Primeira letra igual? Olhe a segunda!',
  fala:'Se as palavras começam com a mesma letra, olhe a segunda letra. Bala, bola, bule: A, O, U. Se a segunda também for igual, olhe a terceira: casa vem antes de cavalo, porque S vem antes de V.',
  html:R('Se as palavras começam com a <b>mesma letra</b>, olhe a <b>2ª letra</b>.')+
   P(['B[A]LA','B[O]LA','B[U]LE'],true)+
   R('A, O, U: é a ordem do alfabeto. Então fica: BALA, BOLA, BULE.')+
   R('A 2ª também é igual? Olhe a <b>3ª</b>: CA<b>S</b>A vem antes de CA<b>V</b>ALO, porque S vem antes de V.')},
 {tipo:'texto', tit:'Verbete e palavras-guia',
  fala:'O dicionário mostra o significado da palavra e a escrita certa. Cada palavra explicada é um verbete. No alto da página, as palavras-guia mostram a primeira e a última palavra daquela página.',
  html:R('O dicionário mostra o <b>significado</b> da palavra e a <b>escrita certa</b>.')+
   '<div class="pagdic"><div class="guias"><span>BALA</span><em>palavras-guia</em><span>BULE</span></div>'+
   '<p><b>bala</b> doce pequeno, que se chupa.</p>'+
   '<p class="verb"><b>bola</b> objeto redondo, usado para brincar e jogar.<em>verbete</em></p>'+
   '<p><b>bule</b> vasilha com bico, usada para servir chá ou café.</p></div>'+
   R('<b>Verbete</b>: cada palavra explicada, com o seu significado.')+
   R('<b>Palavras-guia</b>: no alto da página, a primeira e a última palavra daquela página.')},
 {tipo:'escolha', tit:'Qual vem primeiro?', pergunta:'Toque na palavra que vem primeiro no dicionário.', rotulo:'Rodada', proxRot:'Próxima rodada',
  itens:[
   {m:'', op:['LOBO','GATO','URSO'], c:'GATO', d:'G vem antes de L, e L vem antes de U.'},
   {m:'', op:['BOLA','BULE','BALA'], c:'BALA', d:'Mesma 1ª letra: olhe a 2ª. A vem antes de O e de U.'},
   {m:'', op:['COPO','CUBO','CASA'], c:'CASA', d:'CA, CO, CU: o A vem primeiro.'},
   {m:'', op:['CAVALO','CASA'], c:'CASA', d:'CAS e CAV: o S vem antes do V.'},
   {m:'', op:['ZEBRA','MAPA','ABELHA'], c:'ABELHA', d:'A é a primeira letra do alfabeto.'}
  ]}
]},

/* ===================== 9. INVENÇÕES E DESCOBERTAS ===================== */
{k:'invento', tema:'invento', nome:'Invenções e descobertas', telas:[
 {tipo:'personagens', tit:'Invenção', compacto:true,
  fala:'Invenção é algo que as pessoas criaram e que não existia antes: a roda, a lâmpada, o telefone, o avião, a bicicleta, o relógio. Também são invenções o computador e a geladeira.',
  regra:'<b>Invenção</b> é algo que <b>as pessoas criaram</b> e que <b>não existia antes</b>.',
  figs:[
   {k:'roda', nome:'A roda'},
   {k:'lampada', nome:'A lâmpada'},
   {k:'telefone', nome:'O telefone'},
   {k:'aviao', nome:'O avião'},
   {k:'bicicleta', nome:'A bicicleta'},
   {k:'relogio', nome:'O relógio'}
  ],
  depois:'Também são invenções: o computador e a geladeira.'},
 {tipo:'personagens', tit:'Descoberta', compacto:true,
  fala:'Descoberta é encontrar algo que já existia na natureza: o fogo, uma planta nova, um animal nunca visto. O fogo não foi inventado: ele já existia, e alguém descobriu.',
  regra:'<b>Descoberta</b> é <b>encontrar</b> algo que <b>já existia</b> na natureza.',
  figs:[
   {k:'fogo', nome:'O fogo', fundo:'#fef3c7'},
   {k:'planta', nome:'Uma planta nova', fundo:'#dcfce7'},
   {k:'bicho', nome:'Um animal nunca visto', fundo:'#e0f2fe'}
  ],
  depois:'O fogo <b>não foi inventado</b>: ele já existia. Alguém descobriu.'},
 {tipo:'personagens', tit:'Quem inventa: o inventor',
  fala:'Quem inventa é o inventor. O brasileiro Santos Dumont é conhecido como o pai da aviação. Ele criou o 14-Bis. Uma invenção resolve um problema e facilita a vida: a lâmpada ilumina a noite.',
  regra:'Quem inventa é o <b>inventor</b>.',
  figs:[{k:'catorzebis', nome:'Santos Dumont', desc:'brasileiro, conhecido como o pai da aviação; criou o 14-Bis', fundo:'#e0f2fe'}],
  depois:'Uma invenção <b>resolve um problema</b> e facilita a vida: a lâmpada ilumina a noite.'},
 {tipo:'escolha', tit:'Invenção ou descoberta?', pergunta:'Alguém criou ou alguém achou?', rotulo:'Coisa', medio:true,
  op:['Invenção','Descoberta'], itens:[
   {m:'A LÂMPADA', c:'Invenção', d:'Pessoas criaram a lâmpada. Ela não existia antes.'},
   {m:'O FOGO', c:'Descoberta', d:'O fogo já existia na natureza.'},
   {m:'A RODA', c:'Invenção', d:'A roda foi criada pelas pessoas.'},
   {m:'UMA PLANTA NOVA NA FLORESTA', c:'Descoberta', d:'A planta já estava lá. Alguém achou.'},
   {m:'O AVIÃO', c:'Invenção', d:'Santos Dumont é conhecido como o pai da aviação.'},
   {m:'UM ANIMAL NUNCA VISTO', c:'Descoberta', d:'O animal já existia. Alguém encontrou.'},
   {m:'A BICICLETA', c:'Invenção', d:'A bicicleta foi criada pelas pessoas.'}
  ]}
]},

/* ===================== 10. CA CO CU · QUE QUI ===================== */
{k:'cqu', tema:'cqu', nome:'CA CO CU · QUE QUI', telas:[
 {tipo:'palavras', tit:'CA, CO, CU',
  fala:'Com A, O e U, o som de quê é só o C: casa, cavalo, cama, caju, copo, coelho, coruja, cubo, cutia, cuca.',
  regra:'Com <b>A</b>, <b>O</b> e <b>U</b>, o som de <b>quê</b> é só o <b>C</b>: CA, CO, CU.',
  pals:['[CA]SA','[CA]VALO','[CA]MA','[CA]JU','[CO]PO','[CO]ELHO','[CO]RUJA','[CU]BO','[CU]TIA','[CU]CA']},
 {tipo:'palavras', tit:'QUE, QUI: o U quietinho',
  fala:'Antes de E e I, o som de quê se escreve com QU, e o U não se fala: queijo, quente, leque, moleque, quiabo, quilo, esquilo, periquito, máquina, mosquito, caqui.',
  regra:'Antes de <b>E</b> e <b>I</b>, o som de quê se escreve com <b>QU</b>. O <b>U</b> não se fala: QUE, QUI.',
  pals:['[Q{U}E]IJO','[Q{U}E]NTE','LE[Q{U}E]','MOLE[Q{U}E]','[Q{U}I]ABO','[Q{U}I]LO','ES[Q{U}I]LO','PERI[Q{U}I]TO','MÁ[Q{U}I]NA','MOS[Q{U}I]TO','CA[Q{U}I]']},
 {tipo:'escolha', tit:'C ou QU?', pergunta:'O que completa a palavra?', op:['C','QU'], itens:[
   {m:'_ASA', cheia:'[C]ASA', c:'C', d:'CA: só o C.'},
   {m:'_EIJO', cheia:'[Q{U}]EIJO', c:'QU', d:'QUE: o U fica quietinho.'},
   {m:'ES_ILO', cheia:'ES[Q{U}]ILO', c:'QU', d:'QUI: o U fica quietinho.'},
   {m:'_OPO', cheia:'[C]OPO', c:'C', d:'CO: só o C.'},
   {m:'MOS_ITO', cheia:'MOS[Q{U}]ITO', c:'QU', d:'QUI: o U fica quietinho.'},
   {m:'_UBO', cheia:'[C]UBO', c:'C', d:'CU: só o C.'},
   {m:'_IABO', cheia:'[Q{U}]IABO', c:'QU', d:'QUI: o U fica quietinho.'},
   {m:'LE_E', cheia:'LE[Q{U}]E', c:'QU', d:'QUE: o U fica quietinho.'}
  ]}
]},

/* ===================== 11. CH · NH · LH ===================== */
{k:'dig', tema:'dig', nome:'CH · NH · LH', telas:[
 {tipo:'palavras', tit:'Duas letras, um som só',
  fala:'CH, NH e LH são duas letras que fazem um som só. Chave, chuva, chapéu, chocolate. Ninho, galinha, banho, aranha. Folha, coelho, abelha, olho.',
  regra:'<b>CH</b>, <b>NH</b> e <b>LH</b> são <b>duas letras</b> que fazem <b>um som só</b>.',
  pals:['[CH]AVE','[CH]UVA','[CH]APÉU','[CH]OCOLATE','NI[NH]O','GALI[NH]A','BA[NH]O','ARA[NH]A','FO[LH]A','COE[LH]O','ABE[LH]A','O[LH]O'],
  depois:'E <b>CHAPEUZINHO</b> tem dois: CH no começo e NH no fim!'},
 {tipo:'pares', tit:'Uma letrinha muda tudo', regra:'Toque em cada par: entra um H e a palavra vira outra.',
  fala:'Mola, molha. Fila, filha. Mina, minha. Sono, sonho. Cala, calha.',
  pares:[['MOLA','MO[LH]A'],['FILA','FI[LH]A'],['MINA','MI[NH]A'],['SONO','SO[NH]O'],['CALA','CA[LH]A']]},
 {tipo:'escolha', tit:'CH, NH ou LH?', pergunta:'Qual dupla completa a palavra?', op:['CH','NH','LH'], itens:[
   {m:'_AVE', cheia:'[CH]AVE', c:'CH', d:'CHAVE, de abrir a porta.'},
   {m:'NI_O', cheia:'NI[NH]O', c:'NH', d:'NINHO, a casa do passarinho.'},
   {m:'FO_A', cheia:'FO[LH]A', c:'LH', d:'FOLHA, da árvore.'},
   {m:'GALI_A', cheia:'GALI[NH]A', c:'NH', d:'GALINHA, a dos ovos de ouro.'},
   {m:'_UVA', cheia:'[CH]UVA', c:'CH', d:'CHUVA, que cai das nuvens.'},
   {m:'COE_O', cheia:'COE[LH]O', c:'LH', d:'COELHO, o bicho de orelha comprida.'},
   {m:'ARA_A', cheia:'ARA[NH]A', c:'NH', d:'ARANHA, a que faz teia.'},
   {m:'MI_O', cheia:'MI[LH]O', c:'LH', d:'MILHO, o da pipoca.'}
  ]}
]},

/* ===================== 12. PLURAL ===================== */
{k:'plural', tema:'plural', nome:'Plural', telas:[
 {tipo:'palavras', tit:'Mais de um: plural',
  fala:'Plural é quando tem mais de um. Uma casa, duas casas. Quando a palavra termina em vogal, é só pôr S: casas, lobos, ovos, porquinhos.',
  regra:'<b>Plural</b> é quando tem <b>mais de um</b>: uma casa, duas casas. Terminou em vogal? É só pôr <b>S</b>.',
  pals:['CASA → CASA[S]','LOBO → LOBO[S]','OVO → OVO[S]','PORQUINHO → PORQUINHO[S]']},
 {tipo:'palavras', tit:'Termina em R ou Z: ES',
  fala:'Terminou em R ou Z, põe ES: flores, colheres, mares, luzes, narizes.',
  regra:'Terminou em <b>R</b> ou <b>Z</b>? Põe <b>ES</b>.',
  pals:['FLOR → FLOR[ES]','COLHER → COLHER[ES]','MAR → MAR[ES]','LUZ → LUZ[ES]','NARIZ → NARIZ[ES]']},
 {tipo:'palavras', tit:'Termina em ÃO: ÕES',
  fala:'Terminou em ÃO, vira ÕES: aviões, balões, botões, limões, leões.',
  regra:'Terminou em <b>ÃO</b>? Vira <b>ÕES</b>.',
  pals:['AVIÃO → AVI[ÕES]','BALÃO → BAL[ÕES]','BOTÃO → BOT[ÕES]','LIMÃO → LIM[ÕES]','LEÃO → LE[ÕES]']},
 {tipo:'texto', tit:'Termina em L ou em M',
  fala:'Terminou em L, vira IS: animais, jornais, varais, anzóis. Terminou em M, vira NS: homens, nuvens, trens.',
  html:'<div class="dupla">'+caixa('L vira IS',P(['ANIMAL → ANIMA[IS]','JORNAL → JORNA[IS]','VARAL → VARA[IS]','ANZOL → ANZÓ[IS]']))+
   caixa('M vira NS',P(['HOMEM → HOME[NS]','NUVEM → NUVE[NS]','TREM → TRE[NS]']))+'</div>'},
 {tipo:'palavras', tit:'O artigo vai junto',
  fala:'O artigo também vai para o plural: o lobo, os lobos. A casa, as casas.',
  regra:'O artigo também vai para o plural: <b>O</b> vira <b>OS</b>, <b>A</b> vira <b>AS</b>.',
  pals:['[O] LOBO → [OS] LOBOS','[A] CASA → [AS] CASAS']},
 {tipo:'escolha', tit:'Monte o plural', pergunta:'Toque no final certo.', op:['S','ES','ÕES','IS','NS'], itens:[
   {m:'CASA → _', cheia:'CASA → CASA[S]', c:'S', d:'Terminou em vogal: põe S.'},
   {m:'FLOR → _', cheia:'FLOR → FLOR[ES]', c:'ES', d:'Terminou em R: põe ES.'},
   {m:'LUZ → _', cheia:'LUZ → LUZ[ES]', c:'ES', d:'Terminou em Z: põe ES.'},
   {m:'BALÃO → _', cheia:'BALÃO → BAL[ÕES]', c:'ÕES', d:'ÃO vira ÕES.'},
   {m:'ANIMAL → _', cheia:'ANIMAL → ANIMA[IS]', c:'IS', d:'O L vira IS.'},
   {m:'NUVEM → _', cheia:'NUVEM → NUVE[NS]', c:'NS', d:'O M vira NS.'},
   {m:'LIMÃO → _', cheia:'LIMÃO → LIM[ÕES]', c:'ÕES', d:'ÃO vira ÕES.'},
   {m:'HOMEM → _', cheia:'HOMEM → HOME[NS]', c:'NS', d:'O M vira NS.'}
  ]}
]}

];
})();
