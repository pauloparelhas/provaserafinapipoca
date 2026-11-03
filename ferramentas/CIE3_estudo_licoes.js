/* ============================================================
   CIE3_estudo_licoes.js — as 8 LIÇÕES da teoria de Science Y2,
   3º trimestre (Unit 3: Position and Motion). Universo Motion Rangers.
   Formato do ING3_estudo_licoes.js + o que o HIS3 acrescentou:
   personagem que fala em cada lição (falaper) e foto em tela e em escolha.

   Fonte única: trabalho/3tri_ciencias/_roteiro.md. Personagens e cores:
   trabalho/3tri_ciencias/BIBLIA_CIE3.md.
   Tudo visível em INGLÊS; português só em <span class="tr"> (a bandeira
   liga body.show-tr). `fala` só em inglês.

   Lição: {k, tema, nome, nome_pt, cor, quem, treino:[[temas,n,tipo],...], telas:[...]}
     tema: position | directions | perspective | forces | objects | animals | pushpull
     tipo do treino: rapida | conceito | leitura
   Tipos de telinha usados: texto · palavras · revela · escolha · completa · liga
   Nos campos que passam por W() (escolha.m/cheia, completa.m/cheia, palavras)
   NÃO há ( ) [ ] { } nem _ fora da lacuna. Opções são texto puro em inglês
   (o motor compara textContent com `c`). O texto de `liga` é falado inteiro:
   sem .tr. A bandeira da lacuna traz "…", nunca a resposta.
   A escolha troca o conteúdo do .alvo por `cheia` ao responder: por isso
   `cheia` repete a figura (função Q).
   push-door.jpg traz a palavra PUSH: só em tela de teoria, nunca em escolha.
   ============================================================ */
window.CIE3_LICOES = (function(){
'use strict';
function tr(pt){ return ' <span class="tr">'+pt+'</span>'; }
function R(en,pt){ return '<div class="regra">'+en+(pt?tr(pt):'')+'</div>'; }
function caixa(t,corpo,cor){ return '<div class="caixa"'+(cor?' style="border-color:'+cor+'"':'')+'><h3'+(cor?' style="color:'+cor+'"':'')+'>'+t+'</h3>'+corpo+'</div>'; }
function esp(){ return '<div style="height:10px"></div>'; }
function fala(quem,t){ return '<div class="falaper"><b>'+quem+'</b><span>'+t+'</span></div>'; }
/* figura de pergunta: sem legenda que entregue a resposta */
function foto(n,leg){ return '<img class="fesc" src="media/cie3/'+n+'.jpg" alt="picture"> '+(leg||''); }
/* figura de tela de teoria */
function fig(n,larg){ return '<img src="media/cie3/'+n+'.jpg" alt="'+n.replace(/-/g,' ')+'" style="display:block;width:100%;max-width:'+(larg||360)+'px;margin:0 auto 10px;border-radius:10px">'; }
/* grade de figuras com legenda: itens [figura, inglês, português] */
function grade(cols,itens){
  return '<div style="display:grid;grid-template-columns:repeat('+cols+',1fr);gap:8px;margin:0 0 10px">'+itens.map(function(i){
    return '<div style="font-weight:800;line-height:1.25;text-align:center"><img src="media/cie3/'+i[0]+'.jpg" alt="'+i[0].replace(/-/g,' ')+'" style="display:block;width:100%;border-radius:10px;margin-bottom:4px">'+i[1]+(i[2]?tr(i[2]):'')+'</div>';
  }).join('')+'</div>';
}
function passos(lista){
  return '<div class="passos'+(lista.length>3?' vert':'')+'">'+lista.map(function(p,i){
    return (i?'<span class="pseta" aria-hidden="true">&rsaquo;</span>':'')+
      '<div class="passo"><b>'+p.t+'</b>'+(p.s?'<span>'+p.s+'</span>':'')+'</div>';
  }).join('')+'</div>';
}
/* lacuna: frase com _, resposta c, erradas, retorno, bandeira com … e a palavra que entra nela */
function Q(n,frase,c,erradas,d,ptm,ptw){
  var f=n?foto(n):'';
  return {m:f+frase+(ptm?tr(ptm):''), cheia:f+frase.replace('_','<b>'+c+'</b>')+(ptm?tr(ptm.replace('…',ptw).replace(/\bd (as?|os?)\b/g,'d$1')):''),
    op:[c].concat(erradas), c:c, d:d};
}
/* completa não embaralha as opções: alterna a posição da certa */
var nc=0;
function C(frase,c,erradas,ptm,ptw){ var it=Q(null,frase,c,erradas,'',ptm,ptw); if(nc++%2) it.op=it.op.slice().reverse(); return it; }
/* os 6 movimentos, com as cores fixas da bíblia e a definição exata do slide */
var MOV={
 bounce:{cor:'#eab308',pt:'quicar',def:'to go <span class="dest">up and down</span> after hitting a <span class="dest">surface</span>',defp:'subir e descer depois de bater numa superfície',ex:[['obj-bounce-soccer-ball','soccer ball','bola de futebol'],['obj-bounce-tennis-ball','tennis ball','bola de tênis'],['obj-bounce-basketball','basketball','bola de basquete']]},
 fly:{cor:'#0ea5e9',pt:'voar',def:'to move through the <span class="dest">air</span>',defp:'mover-se pelo ar',ex:[['obj-fly-airplane','airplane','avião'],['obj-fly-balloon','hot air balloon','balão de ar quente'],['obj-fly-kite','kite','pipa']]},
 roll:{cor:'#ec4899',pt:'rolar',def:'to move by <span class="dest">turning over and over</span>',defp:'mover-se virando e virando',ex:[['obj-roll-wheel','wheel','roda'],['obj-roll-can','can','lata'],['obj-roll-beach-ball','beach ball','bola de praia']]},
 slide:{cor:'#8b5cf6',pt:'deslizar',def:'to move <span class="dest">smoothly</span> along a <span class="dest">surface</span>',defp:'mover-se suavemente sobre uma superfície',ex:[['obj-slide-slide','slide','escorregador'],['obj-slide-ice-cube','ice cube','cubo de gelo'],['obj-slide-book','book','livro']]},
 spin:{cor:'#f97316',pt:'girar',def:'to turn <span class="dest">around and around</span>',defp:'dar voltas e voltas',ex:[['obj-spin-pinwheel','pinwheel','cata-vento'],['obj-spin-fan','fan','ventilador'],['obj-spin-top','top','pião']]},
 swing:{cor:'#22c55e',pt:'balançar',def:'to move <span class="dest">back and forth</span> like a <span class="dest">pendulum</span>',defp:'ir e voltar como um pêndulo',ex:[['obj-swing-swing','swing','balanço'],['obj-swing-plant','hanging plant','planta pendurada'],['obj-swing-door','door','porta']]}
};
function mov(k){
  var v=MOV[k];
  return caixa('Motion Star'+tr('Estrela do movimento'),'<p><b>'+k+'</b>: '+v.def+tr(v.pt+': '+v.defp)+'</p><div style="height:8px"></div>'+grade(3,v.ex),v.cor)+esp();
}
var OP_MOV=['bounce','fly','roll','slide','spin','swing'];
function ITM(k,i,d){ return {m:foto(MOV[k].ex[i][0]), c:k, d:d}; }

function P(pede,pt,resp,rpt,f){ return '<li>'+(f?'<img class="fescb" src="media/cie3/'+f+'.jpg" alt="picture" style="max-width:220px">':'')+pede+tr(pt)+'<br><b class="resp">'+resp+'</b>'+(rpt?tr(rpt):'')+'</li>'; }
function naProva(fig_,itens){ return (fig_?'<img class="fescb" src="media/cie3/'+fig_+'.jpg" alt="">':'')+'<ol class="naprova">'+itens.join('')+'</ol>'; }
return [

/* ===================== 1. POSITION: IN, ON, UNDER, INSIDE ===================== */
{k:'pos1', tema:'position', nome:'Position: in, on, under, inside', nome_pt:'Posição: dentro, sobre, embaixo', cor:'#f472b6', quem:'Pin',
 treino:[], telas:[
 {tipo:'texto', tit:'Where is it?',
  fala:'Twister the tornado blew everything away! To find it all, we start with where things are. In, on, under, inside.',
  html:grade(2,[['prep-in','The teddy bear is <b>in</b> the box.','O ursinho está dentro da caixa.'],['prep-on','The apple is <b>on</b> the book.','A maçã está sobre o livro.'],['prep-under','The ball is <b>under</b> the table.','A bola está embaixo da mesa.'],['prep-inside','The fish is <b>inside</b> the bowl.','O peixe está dentro do aquário.']])},
 {tipo:'arrasta', tit:'Put the word on the picture', fala:'Drag each one to the right place.', cols:3, regra:'Drag each word to its picture.', regra_pt:'Arraste cada palavra para a sua figura.', caixas:[{k:'in',t:'',img:'prep-in'},{k:'on',t:'',img:'prep-on'},{k:'under',t:'',img:'prep-under'}], itens:[{c:'in',t:'in'},{c:'on',t:'on'},{c:'under',t:'under'}]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva(null,[P('Look at the picture. Where is the ball?','Olhe a figura. Onde está a bola?','under the table','embaixo da mesa','prep-under'),P('Look at the picture. Complete: The apple is ___ the book.','Olhe a figura. Complete: A maçã está ___ o livro.','on','sobre','prep-on'),P('Look at the picture. Which sentence is right? The fish is on the bowl. / The fish is inside the bowl.','Olhe a figura. Qual frase está certa?','The fish is inside the bowl.','O peixe está dentro do aquário.','prep-inside')])}
]},

/* ===================== 2. POSITION: BEHIND, BETWEEN, ... E A CENA ===================== */
{k:'pos2', tema:'position', nome:'Position: behind, between, near and more', nome_pt:'Posição: atrás, entre, perto e mais', cor:'#f472b6', quem:'Pin',
 treino:[], telas:[
 {tipo:'texto', tit:'Where is it?',
  fala:'The boy is behind the tree. The dog is in front of the chair. The teddy bear is between the two plants. The clock is next to the lamp.',
  html:grade(2,[['prep-behind','The boy is <b>behind</b> the tree.','O menino está atrás da árvore.'],['prep-in-front-of','The dog is <b>in front of</b> the chair.','O cachorro está na frente da cadeira.'],['prep-between','The teddy bear is <b>between</b> the two plants.','O ursinho está entre as duas plantas.'],['prep-next-to','The clock is <b>next to</b> the lamp.','O relógio está ao lado do abajur.']])},
 {tipo:'texto', tit:'Where is it?',
  fala:'The tree is near the house. The tree is far from the house. The lamp is above the table. The cat is below the shelf.',
  html:grade(2,[['prep-near','The tree is <b>near</b> the house.','A árvore está perto da casa.'],['prep-far-from','The tree is <b>far from</b> the house.','A árvore está longe da casa.'],['prep-above','The lamp is <b>above</b> the table.','A luminária está acima da mesa.'],['prep-below','The cat is <b>below</b> the shelf.','O gato está abaixo da prateleira.']])},
{tipo:'texto', tit:'In the room', fala:'There is some pizza in the box. There is a guitar between the lamp and the plant. There are two dogs under the table. There is a window behind the sofa.',
  html:fig('room')+caixa('In the room'+tr('Na sala'),'<p class="linhas">There is some pizza <b>in</b> the box.'+tr('Tem pizza dentro da caixa.')+'<br>There is a guitar <b>between</b> the lamp and the plant.'+tr('Tem um violão entre o abajur e a planta.')+'<br>There are two dogs <b>under</b> the table.'+tr('Tem dois cachorros embaixo da mesa.')+'<br>There is a window <b>behind</b> the sofa.'+tr('Tem uma janela atrás do sofá.')+'<br>There is a racket <b>next to</b> the bag.'+tr('Tem uma raquete ao lado da mochila.')+'<br>There is some cheese <b>on</b> the plate.'+tr('Tem queijo sobre o prato.')+'<br>There is a rug <b>in front of</b> the sofa.'+tr('Tem um tapete na frente do sofá.')+'<br>There is a lamp <b>under</b> the shelf.'+tr('Tem um abajur embaixo da prateleira.')+'<br>There is a trophy <b>between</b> the books.'+tr('Tem um troféu entre os livros.')+'<br>There is a picture <b>on</b> the wall.'+tr('Tem um quadro na parede.')+'<br>There is a bird flying <b>over</b> the trees.'+tr('Tem um pássaro voando por cima das árvores.')+'<br>There are two fish <b>in</b> the bowl.'+tr('Tem dois peixes no aquário.')+'</p>')},
 {tipo:'arrasta', tit:'Put the word on the picture', fala:'Drag each one to the right place.', cols:2, regra:'Drag each word to its picture.', regra_pt:'Arraste cada palavra para a sua figura.', caixas:[{k:'behind',t:'',img:'prep-behind'},{k:'in-front-of',t:'',img:'prep-in-front-of'},{k:'between',t:'',img:'prep-between'},{k:'far-from',t:'',img:'prep-far-from'}], itens:[{c:'behind',t:'behind'},{c:'in-front-of',t:'in front of'},{c:'between',t:'between'},{c:'far-from',t:'far from'}]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('room',[P('Use the words in the box: behind, next to, in front of, over, in, on, between, under. There is a guitar ___ the lamp and the plant.','Use as palavras da caixa. Tem um violão ___ o abajur e a planta.','between','entre'),P('There is a racket ___ the bag.','Tem uma raquete ___ mochila.','next to','ao lado da'),P('There is a picture ___ the wall.','Tem um quadro ___ parede.','on','na')])}
]},

/* ===================== 3. DIRECTIONS AND MAPS ===================== */
{k:'dir', tema:'directions', nome:'Directions and maps', nome_pt:'Direções e mapas', cor:'#fb7185', quem:'Pin',
 treino:[], telas:[
 {tipo:'texto', tit:'Reading a map',
  fala:'When we read maps we need to pay a lot of attention to the details and to the path, the way we are going. We might get lost if we run or don’t pay attention.',
  html:R('The red <span class="dest">pin</span> marks a <span class="dest">place</span> on the map.','O pino vermelho marca um lugar no mapa.')+R('When we read maps we need to <span class="dest">pay a lot of attention</span> to the <span class="dest">details</span> and to the <span class="dest">path</span>, the way we are going.','Quando lemos mapas, precisamos prestar muita atenção aos detalhes e ao caminho que estamos seguindo.')+
   R('We might get <span class="dest">lost</span> if we <span class="dest">run</span> or <span class="dest">don’t pay attention</span>.','Podemos nos perder se corrermos ou não prestarmos atenção.')},
 {tipo:'texto', tit:'Left and right on the map',
  fala:'Look at the map of the school. Left and right are the sides of the person looking at the map. The Auditorium is between A section and B section. A section is on the left. B section is on the right.',
  html:fig('map-school')+
   passos([{t:'&larr; left'+tr('esquerda')},{t:'right &rarr;'+tr('direita')}])+
   R('Left and right: the sides of the <span class="dest">person looking at the map</span>.','Esquerda e direita: os lados de quem olha o mapa.')+
   R('The Auditorium is <b>between</b> A section and B section.','O Auditório fica entre a seção A e a seção B.')},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('map-school',[P('Look at the map. What is between A section and B section?','Olhe o mapa. O que há entre a seção A e a B?','the Auditorium','o auditório'),P('Is B section on the left or on the right of the Auditorium?','A seção B fica à esquerda ou à direita do auditório?','on the right','à direita'),P('When we read maps, we need to pay attention to the details and the ___.','Ao ler mapas, prestamos atenção nos detalhes e no ___.','path','caminho'),P('True or false: we might get lost if we run.','Verdadeiro ou falso: podemos nos perder se corrermos.','True','Verdadeiro')])}
]},

/* ===================== 4. CHANGING PERSPECTIVE ===================== */
{k:'persp', tema:'perspective', nome:'Changing perspective', nome_pt:'Mudando a perspectiva', cor:'#fbbf24', quem:'Gigi',
 treino:[], telas:[
 {tipo:'texto', tit:'Where are you looking from?',
  fala:'Gigi, the giraffe painter, says: We can see many things from different positions, and our perspective changes depending on where we are looking from.',
  html:R('We can see many things from <span class="dest">different positions</span>, and our <span class="dest">perspective</span> changes depending on <span class="dest">where we are looking from</span>.','Podemos ver muitas coisas de posições diferentes, e nossa perspectiva muda dependendo de onde estamos olhando.')},
 {tipo:'texto', tit:'The Eiffel Tower',
  fala:'The Eiffel Tower, seen from the front, from the top, from the side and from the bottom. It is the same tower.',
  html:grade(2,[['view-front','seen from the <b>front</b>','vista de frente'],['view-top','seen from the <b>top</b>','vista de cima'],['view-side','seen from the <b>side</b>','vista de lado'],['view-bottom','seen from the <b>bottom</b>','vista de baixo']])+
   R('The same tower. A different view!','A mesma torre. Uma vista diferente!')},
 {tipo:'texto', tit:'One object, three shadows',
  fala:'This is one object. It makes a different shadow on each side: a triangle, a rectangle and a circle.',
  html:fig('view-shadow',300)+
   R('One object. A different shadow on each side.','Um só objeto. Uma sombra diferente de cada lado.')+caixa('The shadows'+tr('As sombras'),'<p class="linhas">On the left wall: a <b>triangle</b>.'+tr('Na parede da esquerda: um triângulo.')+'<br>On the right wall: a <b>rectangle</b>.'+tr('Na parede da direita: um retângulo.')+'<br>On the floor: a <b>circle</b>.'+tr('No chão: um círculo.')+'</p>')},
 {tipo:'texto', tit:'A different view',
  fala:'The giraffe and the woman look at the painting from different positions. People are not right or wrong. They just have a different view of things.',
  html:fig('view-giraffe',240)+R('The giraffe and the woman look at the painting from <span class="dest">different positions</span>.','A girafa e a mulher olham o quadro de posições diferentes.')+R('“People are not right or wrong. They just have a <span class="dest">different view</span> of things.”','As pessoas não estão certas nem erradas; elas só têm uma visão diferente das coisas.')},
 {tipo:'arrasta', tit:'Where are you looking from?', fala:'Drag each one to the right place.', cols:3, regra:'Drag each label to its picture.', regra_pt:'Arraste cada etiqueta para a sua figura.', caixas:[{k:'front',t:'',img:'view-front'},{k:'top',t:'',img:'view-top'},{k:'bottom',t:'',img:'view-bottom'}], itens:[{c:'front',t:'from the front'},{c:'top',t:'from the top'},{c:'bottom',t:'from the bottom'}]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('view-bottom',[P('Look at the picture. The tower is seen from the ___.','Olhe a figura. A torre é vista de ___.','bottom','baixo'),P('Our ___ changes depending on where we are looking from.','Nossa ___ muda dependendo de onde estamos olhando.','perspective','perspectiva'),P(fig('view-giraffe',200)+'The giraffe and the woman look at the painting from different positions. Complete: People are not right or wrong. They just have a different ___ of things.','A girafa e a mulher olham o quadro de posições diferentes. Complete: as pessoas não estão certas nem erradas; elas só têm uma ___ diferente das coisas.','view','visão')])}
]},

/* ===================== 5. WIND AND WATER ===================== */
{k:'forcas', tema:'forces', nome:'Wind and water: helpful and harmful', nome_pt:'Vento e água: úteis e prejudiciais', cor:'#38bdf8', quem:'Breezy and Drop',
 treino:[], telas:[
 {tipo:'texto', tit:'Two natural forces',
  fala:'Breezy and Drop say: Wind and water are two natural forces that exist in nature, and they can be helpful and harmful to us.',
  html:R('Wind and water are two <span class="dest">natural forces</span> that exist in nature, and they can be <span class="dest">helpful</span> and <span class="dest">harmful</span> to us.','Vento e água são duas forças naturais que existem na natureza, e podem ser úteis e prejudiciais para nós.')},
 {tipo:'texto', tit:'Helpful',
  fala:'Helpful: water the plants, water to make energy, wind to make energy, wind that spreads the seeds.',
  html:grade(2,[['help-water-plants','water the plants','regar as plantas'],['help-water-energy','water to make energy','água para fazer energia'],['help-wind-energy','wind to make energy','vento para fazer energia'],['help-wind-seeds','wind that spreads the seeds','vento que espalha as sementes']])},
 {tipo:'texto', tit:'Harmful',
  fala:'Harmful: tsunami, heavy rain and floods, tornado, strong winds.',
  html:grade(2,[['harm-tsunami','tsunami','tsunami'],['harm-floods','heavy rain and floods','chuva forte e enchentes'],['harm-tornado','tornado','tornado'],['harm-winds','strong winds','ventos fortes']])},
 {tipo:'texto', tit:'What wind and water do',
  fala:'Wind is air in motion. It fills the sails of boats and turns wind turbines. Water makes energy, carries boats and waters the plants.',
  html:caixa('Wind'+tr('Vento'),'<p>Wind is <span class="dest">air in motion</span>.'+tr('Vento é ar em movimento.')+'<br>It fills <span class="dest">sails</span> and turns <span class="dest">wind turbines</span>.'+tr('Enche as velas e gira as turbinas.')+'</p>')+esp()+
   caixa('Water'+tr('Água'),'<p>Water makes <span class="dest">energy</span>, carries <span class="dest">boats</span> and waters the <span class="dest">plants</span>.'+tr('A água faz energia, leva barcos e rega as plantas.')+'</p>')},
 {tipo:'arrasta', tit:'Helpful or harmful?', fala:'Drag each one to the right place.', cols:2, caixas:[{k:'help',t:'Helpful',cor:'#22c55e'},{k:'harm',t:'Harmful',cor:'#ef4444'}], itens:[{c:'help',img:'help-water-plants'},{c:'help',img:'help-water-energy'},{c:'help',img:'help-wind-energy'},{c:'help',img:'help-wind-seeds'},{c:'harm',img:'harm-tsunami'},{c:'harm',img:'harm-floods'},{c:'harm',img:'harm-tornado'},{c:'harm',img:'harm-winds'}]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('harm-floods',[P('Wind and water are two ___ forces.','Vento e água são duas forças ___.','natural','naturais'),P('Look at the picture. Is it helpful or harmful?','Olhe a figura. Ajuda ou prejudica?','harmful','prejudica')])}
]},

/* ===================== 6. MOVEMENT OF OBJECTS ===================== */
{k:'objetos', tema:'objects', nome:'Movement of objects', nome_pt:'Movimento dos objetos', cor:'#a78bfa', quem:'Boing',
 treino:[], telas:[
 {tipo:'texto', tit:'Bounce and fly',
  fala:'Six Motion Stars, one for each movement! Bounce: to go up and down after hitting a surface. Fly: to move through the air.',
  html:mov('bounce')+mov('fly')},
 {tipo:'texto', tit:'Roll and slide',
  fala:'Roll: to move by turning over and over. Slide: to move smoothly along a surface.',
  html:mov('roll')+mov('slide')},
 {tipo:'texto', tit:'Spin and swing',
  fala:'Spin: to turn around and around. Swing: to move back and forth like a pendulum.',
  html:mov('spin')+mov('swing')},
{tipo:'texto', tit:'Directions and speed',
  fala:'Things move in different directions: back and forth, up and down, round and round. Things move at different speeds: slow or fast.',
  html:R('Things move in different <span class="dest">directions</span>.','As coisas se movem em direções diferentes.')+
   passos([{t:'back and forth'+tr('para a frente e para trás')},{t:'up and down'+tr('para cima e para baixo')},{t:'round and round'+tr('em voltas')}])+
   R('Things move at different <span class="dest">speeds</span>: <span class="dest">slow</span> or <span class="dest">fast</span>.','As coisas se movem em velocidades diferentes: devagar ou rápido.')},
 {tipo:'arrasta', tit:'How does it move?', fala:'Drag each one to the right place.', cols:3, caixas:[{k:'bounce',t:'bounce',cor:'#eab308'},{k:'fly',t:'fly',cor:'#0ea5e9'},{k:'roll',t:'roll',cor:'#ec4899'},{k:'slide',t:'slide',cor:'#8b5cf6'},{k:'spin',t:'spin',cor:'#f97316'},{k:'swing',t:'swing',cor:'#22c55e'}], itens:[{c:'bounce',img:'obj-bounce-basketball'},{c:'fly',img:'obj-fly-kite'},{c:'roll',img:'obj-roll-wheel'},{c:'slide',img:'obj-slide-ice-cube'},{c:'spin',img:'obj-spin-top'},{c:'swing',img:'obj-swing-swing'}]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('obj-spin-top',[P('Look at the picture. How does the top move?','Olhe a figura. Como o pião se move?','It spins.','Ele gira.'),P('Complete: To ___ means to go up and down after hitting a surface.','Complete: ___ é subir e descer depois de bater numa superfície.','bounce','quicar'),P('Match: wheel, kite, door → roll, fly, swing.','Ligue: roda, pipa, porta → rolar, voar, balançar.','wheel: roll · kite: fly · door: swing','roda: rola · pipa: voa · porta: balança'),P('Things can move slow or ___.','As coisas podem se mover devagar ou ___.','fast','rápido')])}
]},

/* ===================== 7. ANIMALS AND BODY ===================== */
{k:'animais', tema:'animals', nome:'Movement of animals and of our body', nome_pt:'Movimento dos animais e do corpo', cor:'#34d399', quem:'Paws',
 treino:[], telas:[
 {tipo:'texto', tit:'Movements of the body and the hand',
  fala:'Body: swim, climb, play, walk, pick, sit. Hand: touch, lift, point, write, grab, push.',
  html:'<img class="fescb" src="media/cie3/orig/corpo-mao.jpg" alt="">'+
   caixa('My body'+tr('Meu corpo'),'<p>swim, climb, play, walk, pick, sit'+tr('nadar, subir, brincar, andar, colher, sentar')+'</p>')+esp()+caixa('My hand'+tr('Minha mão'),'<p>touch, lift, point, write, grab, push'+tr('tocar, levantar, apontar, escrever, agarrar, empurrar')+'</p>')},
 {tipo:'texto', tit:'How animals move',
  fala:'A fish swims. A bird flies. A monkey climbs. A dog walks and runs. A kangaroo and a frog jump. A snake crawls on the ground.',
  html:caixa('Animals'+tr('Animais'),'<p>A fish <b>swims</b>.'+tr('O peixe nada.')+'<br>A bird <b>flies</b>.'+tr('O pássaro voa.')+'<br>A monkey <b>climbs</b>.'+tr('O macaco escala.')+'<br>A dog <b>walks</b> and <b>runs</b>.'+tr('O cachorro anda e corre.')+'<br>A kangaroo and a frog <b>jump</b>.'+tr('O canguru e o sapo pulam.')+'<br>A snake <b>crawls</b> on the ground.'+tr('A cobra rasteja no chão.')+'</p>')},
 {tipo:'arrasta', tit:'My body or my hand?', fala:'Drag each one to the right place.', cols:2, caixas:[{k:'body',t:'My body',cor:'#34d399'},{k:'hand',t:'My hand',cor:'#38bdf8'}], itens:[{c:'body',t:'swim'},{c:'body',t:'climb'},{c:'body',t:'walk'},{c:'body',t:'sit'},{c:'hand',t:'touch'},{c:'hand',t:'write'},{c:'hand',t:'grab'},{c:'hand',t:'point'}]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva(null,[P('Make a list of movements you can do with your body.','Faça uma lista de movimentos que você faz com o corpo.','swim, climb, play, walk, pick, sit','nadar, subir, brincar, andar, colher, sentar'),P('Make a list of movements you can do with your hand.','Faça uma lista de movimentos que você faz com a mão.','touch, lift, point, write, grab, push','tocar, levantar, apontar, escrever, agarrar, empurrar'),P('How does a fish move? How does a bird move?','Como o peixe se move? E o pássaro?','A fish swims. A bird flies.','O peixe nada. O pássaro voa.')])}
]},

/* ===================== 8. PUSH OR PULL ===================== */
{k:'pushpull', tema:'pushpull', nome:'Push or pull', nome_pt:'Empurrar ou puxar', cor:'#f97316', quem:'Max',
 treino:[], telas:[
 {tipo:'texto', tit:'Push or pull?',
  fala:'A push is when I use a <span class="dest">force</span> to move something away from me. A pull is when I use a <span class="dest">force</span> to move something closer to me.',
  html:   R('A <span class="dest">push</span> is when I use a <span class="dest">force</span> to move something <b>away from me</b>.','Push é quando uso uma força para mover algo para longe de mim.')+
   R('A <span class="dest">pull</span> is when I use a <span class="dest">force</span> to move something <b>closer to me</b>.','Pull é quando uso uma força para trazer algo para perto de mim.')},
 {tipo:'arrasta', tit:'Away or closer?', fala:'Drag each one to the right place.', cols:2, regra:'Drag each one to push or to pull.', regra_pt:'Arraste cada um para push ou para pull.', caixas:[{k:'push',t:'Push',img:'push-box',cor:'#f97316'},{k:'pull',t:'Pull',img:'pull-wagon',cor:'#38bdf8'}], itens:[{c:'push',t:'away from me'},{c:'pull',t:'closer to me'}]},
 {tipo:'texto', tit:'Push',
  fala:'Push: riding a bike, pushing a box, pushing a door, kicking a ball.',
  html:grade(2,[['push-bike','riding a bike','andar de bicicleta'],['push-box','pushing a box','empurrar uma caixa'],['push-door','pushing a door','empurrar uma porta'],['push-ball','kicking a ball','chutar uma bola']])+
   R('Push: <b>away from me</b>.','Push = empurrar: para longe de mim.')},
 {tipo:'texto', tit:'Pull',
  fala:'Pull: tug of war with a rope, pulling a wagon, opening a drawer, fishing with a rod.',
  html:grade(2,[['pull-rope','tug of war with a rope','cabo de guerra com corda'],['pull-wagon','pulling a wagon','puxar um carrinho'],['pull-drawer','opening a drawer','abrir uma gaveta'],['pull-fish','fishing with a rod','pescar com vara']])+
   R('Pull: <b>closer to me</b>.','Pull = puxar: para perto de mim.')},
 {tipo:'texto', tit:'More examples',
  fala:'A push or a pull can make things move from one place to another. There are two types of force: push and pull. Push and pull are opposite forces. Push: a shopping trolley, a volleyball, the golfer hitting the ball. Pull: pulling the rope of a kite, picking fruit and vegetables from the plant.',
  html:R('A <span class="dest">push</span> or a <span class="dest">pull</span> can make things <span class="dest">move</span> from one place to another.','Empurrar ou puxar pode fazer as coisas irem de um lugar para outro.')+
   R('Two types of force: <span class="dest">push</span> and <span class="dest">pull</span>. They are <span class="dest">opposite</span> forces.','Dois tipos de força: push e pull. São forças opostas.')+
   caixa('Push'+tr('Empurrar'),'<p>a shopping trolley'+tr('carrinho de compras')+'<br>a volleyball'+tr('bola de vôlei')+'<br>the golfer hitting the ball'+tr('o golfista batendo na bola')+'</p>','#f97316')+esp()+
   caixa('Pull'+tr('Puxar'),'<p>pulling the rope of a kite'+tr('puxar a linha da pipa')+'<br>picking fruit and vegetables from the plant'+tr('colher frutas e verduras da planta')+'</p>','#f97316')},
 {tipo:'arrasta', tit:'Push or pull?', fala:'Drag each one to the right place.', cols:2, caixas:[{k:'push',t:'Push',cor:'#f97316'},{k:'pull',t:'Pull',cor:'#38bdf8'}], itens:[{c:'push',img:'push-bike'},{c:'push',img:'push-box'},{c:'push',img:'push-ball'},{c:'pull',img:'pull-rope'},{c:'pull',img:'pull-wagon'},{c:'pull',img:'pull-drawer'},{c:'pull',img:'pull-fish'}]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('pull-wagon',[P('Look at the picture. Is it a push or a pull?','Olhe a figura. É push ou pull?','a pull','puxar'),P('Complete: A push is when I use a <span class="dest">force</span> to move something ___ from me.','Complete: push é usar força para mover algo ___ de mim.','away','para longe'),P('Complete: A pull is when I use a <span class="dest">force</span> to move something ___ to me.','Complete: pull é usar força para mover algo ___ de mim.','closer','para perto')])}
]}

];
})();
