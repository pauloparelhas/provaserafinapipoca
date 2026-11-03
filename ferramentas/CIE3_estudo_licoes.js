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
 bounce:{cor:'#eab308',pt:'quicar',def:'to go up and down after hitting a surface',defp:'subir e descer depois de bater numa superfície',ex:[['obj-bounce-soccer-ball','soccer ball','bola de futebol'],['obj-bounce-tennis-ball','tennis ball','bola de tênis'],['obj-bounce-basketball','basketball','bola de basquete']]},
 fly:{cor:'#0ea5e9',pt:'voar',def:'to move through the air',defp:'mover-se pelo ar',ex:[['obj-fly-airplane','airplane','avião'],['obj-fly-balloon','hot air balloon','balão de ar quente'],['obj-fly-kite','kite','pipa']]},
 roll:{cor:'#ec4899',pt:'rolar',def:'to move by turning over and over',defp:'mover-se virando e virando',ex:[['obj-roll-wheel','wheel','roda'],['obj-roll-can','can','lata'],['obj-roll-beach-ball','beach ball','bola de praia']]},
 slide:{cor:'#8b5cf6',pt:'deslizar',def:'to move smoothly along a surface',defp:'mover-se suavemente sobre uma superfície',ex:[['obj-slide-slide','slide','escorregador'],['obj-slide-ice-cube','ice cube','cubo de gelo'],['obj-slide-book','book','livro']]},
 spin:{cor:'#f97316',pt:'girar',def:'to turn around and around',defp:'dar voltas e voltas',ex:[['obj-spin-pinwheel','pinwheel','cata-vento'],['obj-spin-fan','fan','ventilador'],['obj-spin-top','top','pião']]},
 swing:{cor:'#22c55e',pt:'balançar',def:'to move back and forth like a pendulum',defp:'ir e voltar como um pêndulo',ex:[['obj-swing-swing','swing','balanço'],['obj-swing-plant','hanging plant','planta pendurada'],['obj-swing-door','door','porta']]}
};
function mov(k){
  var v=MOV[k];
  return caixa(k+tr(v.pt),'<p>'+v.def+tr(v.defp)+'</p><div style="height:8px"></div>'+grade(3,v.ex),v.cor)+esp();
}
var OP_MOV=['bounce','fly','roll','slide','spin','swing'];
function ITM(k,i,d){ return {m:foto(MOV[k].ex[i][0]), c:k, d:d}; }

function P(pede,pt,resp,rpt){ return '<li>'+pede+tr(pt)+'<br><b class="resp">'+resp+'</b>'+(rpt?tr(rpt):'')+'</li>'; }
function naProva(fig_,itens){ return (fig_?'<img class="fescb" src="media/cie3/'+fig_+'.jpg" alt="">':'')+'<ol class="naprova">'+itens.join('')+'</ol>'; }
return [

/* ===================== 1. POSITION: IN, ON, UNDER, INSIDE ===================== */
{k:'pos1', tema:'position', nome:'Position: in, on, under, inside', nome_pt:'Posição: dentro, sobre, embaixo', cor:'#f472b6', quem:'Pin',
 treino:[], telas:[
 {tipo:'texto', tit:'Where is it?',
  fala:'Twister the tornado blew everything away! To find it all, we start with where things are. In, on, under, inside.',
  html:grade(2,[['prep-in','The teddy bear is <b>in</b> the box.','O ursinho está dentro da caixa.'],['prep-on','The apple is <b>on</b> the book.','A maçã está sobre o livro.'],['prep-under','The ball is <b>under</b> the table.','A bola está embaixo da mesa.'],['prep-inside','The fish is <b>inside</b> the bowl.','O peixe está dentro do aquário.']])},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('prep-under',[P('Look at the picture. Where is the ball?','Olhe a figura. Onde está a bola?','under the table','embaixo da mesa'),P('Complete: The apple is ___ the book.','Complete: A maçã está ___ o livro.','on','sobre'),P('Which sentence is right? The fish is on the bowl. / The fish is inside the bowl.','Qual frase está certa?','The fish is inside the bowl.','O peixe está dentro do aquário.')])}
]},

/* ===================== 2. POSITION: BEHIND, BETWEEN, ... E A CENA ===================== */
{k:'pos2', tema:'position', nome:'Position: behind, between, near and more', nome_pt:'Posição: atrás, entre, perto e mais', cor:'#f472b6', quem:'Pin',
 treino:[], telas:[
 {tipo:'texto', tit:'Behind, in front of, between, next to',
  fala:'The boy is behind the tree. The dog is in front of the chair. The teddy bear is between the two plants. The clock is next to the lamp.',
  html:grade(2,[['prep-behind','The boy is <b>behind</b> the tree.','O menino está atrás da árvore.'],['prep-in-front-of','The dog is <b>in front of</b> the chair.','O cachorro está na frente da cadeira.'],['prep-between','The teddy bear is <b>between</b> the two plants.','O ursinho está entre as duas plantas.'],['prep-next-to','The clock is <b>next to</b> the lamp.','O relógio está ao lado do abajur.']])},
 {tipo:'texto', tit:'Near, far from, above, below, over',
  fala:'The tree is near the house. The tree is far from the house. The lamp is above the table. The cat is below the shelf. A bird is flying over the trees.',
  html:grade(2,[['prep-near','The tree is <b>near</b> the house.','A árvore está perto da casa.'],['prep-far-from','The tree is <b>far from</b> the house.','A árvore está longe da casa.'],['prep-above','The lamp is <b>above</b> the table.','A luminária está acima da mesa.'],['prep-below','The cat is <b>below</b> the shelf.','O gato está abaixo da prateleira.']])+
   R('A bird is flying <b>over</b> the trees.','Um pássaro está voando por cima das árvores.')},
{tipo:'texto', tit:'In the room', fala:'There is some pizza in the box. There is a guitar between the lamp and the plant. There are two dogs under the table. There is a window behind the sofa.',
  html:fig('room')+caixa('In the room'+tr('Na sala'),'<p>pizza <b>in</b> the box · guitar <b>between</b> the lamp and the plant · two dogs <b>under</b> the table · window <b>behind</b> the sofa · racket <b>next to</b> the bag · cheese <b>on</b> the plate · rug <b>in front of</b> the sofa · lamp <b>under</b> the shelf · trophy <b>between</b> the books · picture <b>on</b> the wall · bird <b>over</b> the trees · two fish <b>in</b> the bowl'+tr('pizza dentro da caixa · violão entre o abajur e a planta · dois cachorros embaixo da mesa · janela atrás do sofá · raquete ao lado da mochila · queijo sobre o prato · tapete na frente do sofá · abajur embaixo da prateleira · troféu entre os livros · quadro na parede · pássaro por cima das árvores · dois peixes no aquário')+'</p>')},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('room',[P('Use the words in the box: behind, next to, in front of, over, in, on, between, under. There is a guitar ___ the lamp and the plant.','Use as palavras da caixa. Tem um violão ___ o abajur e a planta.','between','entre'),P('There is a racket ___ the bag.','Tem uma raquete ___ a mochila.','next to','ao lado de'),P('There is a picture ___ the wall.','Tem um quadro ___ a parede.','on','na')])}
]},

/* ===================== 3. DIRECTIONS AND MAPS ===================== */
{k:'dir', tema:'directions', nome:'Directions and maps', nome_pt:'Direções e mapas', cor:'#fb7185', quem:'Pin',
 treino:[], telas:[
 {tipo:'texto', tit:'Reading a map',
  fala:'When we read maps we need to pay a lot of attention to the details and to the path, the way we are going. We might get lost if we run or don’t pay attention.',
  html:R('The red <b>pin</b> marks a place on the map.','O pino vermelho marca um lugar no mapa.')+R('When we read maps we need to <b>pay a lot of attention</b> to the <b>details</b> and to the <b>path</b>, the way we are going.','Quando lemos mapas, precisamos prestar muita atenção aos detalhes e ao caminho que estamos seguindo.')+
   R('We might get <b>lost</b> if we run or don’t pay attention.','Podemos nos perder se corrermos ou não prestarmos atenção.')},
 {tipo:'texto', tit:'Left and right on the map',
  fala:'Look at the map of the school. Left and right are the sides of the person looking at the map. The Auditorium is between A section and B section. A section is on the left. B section is on the right.',
  html:fig('map-school')+
   passos([{t:'&larr; left'+tr('esquerda')},{t:'right &rarr;'+tr('direita')}])+
   R('Left and right: the sides of the person <b>looking at the map</b>.','Esquerda e direita: os lados de quem olha o mapa.')+
   R('The Auditorium is <b>between</b> A section and B section.','O Auditório fica entre a seção A e a seção B.')},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('map-school',[P('Look at the map. What is between A section and B section?','Olhe o mapa. O que há entre a seção A e a B?','the Auditorium','o auditório'),P('Is B section on the left or on the right of the Auditorium?','A seção B fica à esquerda ou à direita do auditório?','on the right','à direita'),P('When we read maps, we need to pay attention to the details and the ___.','Ao ler mapas, prestamos atenção nos detalhes e no ___.','path','caminho'),P('True or false: we might get lost if we run.','Verdadeiro ou falso: podemos nos perder se corrermos.','True','Verdadeiro')])}
]},

/* ===================== 4. CHANGING PERSPECTIVE ===================== */
{k:'persp', tema:'perspective', nome:'Changing perspective', nome_pt:'Mudando a perspectiva', cor:'#fbbf24', quem:'Gigi',
 treino:[], telas:[
 {tipo:'texto', tit:'Where are you looking from?',
  fala:'Gigi, the giraffe painter, says: We can see many things from different positions, and our perspective changes depending on where we are looking from.',
  html:R('We can see many things from <b>different</b> positions, and our perspective changes depending on <b>where</b> we are looking from.','Podemos ver muitas coisas de posições diferentes, e nossa perspectiva muda dependendo de ONDE estamos olhando.')},
 {tipo:'texto', tit:'The Eiffel Tower',
  fala:'The Eiffel Tower, seen from the front, from the top, from the side and from the bottom. It is the same tower.',
  html:grade(2,[['view-front','seen from the <b>front</b>','vista de frente'],['view-top','seen from the <b>top</b>','vista de cima'],['view-side','seen from the <b>side</b>','vista de lado'],['view-bottom','seen from the <b>bottom</b>','vista de baixo']])+
   R('The same tower. A different view!','A mesma torre. Uma vista diferente!')},
 {tipo:'texto', tit:'One object, three shadows',
  fala:'This is one object. It makes a different shadow on each side: a triangle, a rectangle and a circle.',
  html:fig('view-shadow',300)+
   R('<b>One</b> object. A different shadow on each side: <b>triangle</b>, <b>rectangle</b>, <b>circle</b>.','Um só objeto. Uma sombra diferente de cada lado: triângulo, retângulo, círculo.')},
 {tipo:'texto', tit:'A different view',
  fala:'People are not right or wrong. They just have a different view of things.',
  html:fig('view-giraffe',240)+R('“People are not right or wrong. They just have a different view of things.”','As pessoas não estão certas nem erradas; elas só têm uma visão diferente das coisas.')},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('view-bottom',[P('Look at the picture. The tower is seen from the ___.','Olhe a figura. A torre é vista de ___.','bottom','baixo'),P('Our perspective changes depending on ___ we are looking from.','Nossa perspectiva muda dependendo de ___ estamos olhando.','where','onde'),P('Complete: People are not right or wrong. They just have a different ___ of things.','As pessoas não estão certas nem erradas; só têm outra ___ das coisas.','view','visão')])}
]},

/* ===================== 5. WIND AND WATER ===================== */
{k:'forcas', tema:'forces', nome:'Wind and water: helpful and harmful', nome_pt:'Vento e água: úteis e perigosos', cor:'#38bdf8', quem:'Breezy and Drop',
 treino:[], telas:[
 {tipo:'texto', tit:'Two natural forces',
  fala:'Breezy and Drop say: Wind and water are two natural forces that exist in nature, and they can be helpful and harmful to us.',
  html:R('Wind and water are two <b>natural forces</b> that exist in nature, and they can be <b>helpful</b> and <b>harmful</b> to us.','Vento e água são duas forças naturais que existem na natureza, e podem ser úteis e prejudiciais para nós.')},
 {tipo:'texto', tit:'Helpful',
  fala:'Helpful: water the plants, water to make energy, wind to make energy, wind that spreads the seeds.',
  html:grade(2,[['help-water-plants','water the plants','regar as plantas'],['help-water-energy','water to make energy','água para fazer energia'],['help-wind-energy','wind to make energy','vento para fazer energia'],['help-wind-seeds','wind that spreads the seeds','vento que espalha as sementes']])},
 {tipo:'texto', tit:'Harmful',
  fala:'Harmful: tsunami, heavy rain and floods, tornado, strong winds.',
  html:grade(2,[['harm-tsunami','tsunami','tsunami'],['harm-floods','heavy rain and floods','chuva forte e enchentes'],['harm-tornado','tornado','tornado'],['harm-winds','strong winds','ventos fortes']])},
 {tipo:'texto', tit:'What wind and water do',
  fala:'Wind is air in motion. Wind moves sand and makes dunes. It fills the sails of boats and turns wind turbines. Water is always moving. Rivers flow downhill. Water wears rock away. Water makes energy, carries boats and waters the fields.',
  html:caixa('Wind'+tr('Vento'),'<p>Wind is <b>air in motion</b>.'+tr('Vento é ar em movimento.')+'<br>It moves <b>sand</b> and makes <b>dunes</b>.'+tr('Move a areia e faz dunas.')+'<br>It fills <b>sails</b> and turns <b>wind turbines</b>.'+tr('Enche as velas e gira as turbinas.')+'</p>')+esp()+
   caixa('Water'+tr('Água'),'<p>Water is <b>always moving</b>. Rivers flow <b>downhill</b>.'+tr('A água está sempre em movimento. Os rios descem.')+'<br>It wears <b>rock</b> away.'+tr('Desgasta a pedra.')+'<br>It makes <b>energy</b>, carries <b>boats</b> and waters the <b>fields</b>.'+tr('Faz energia, leva barcos e rega os campos.')+'</p>')},
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
  html:R('Things move in different <b>directions</b>.','As coisas se movem em direções diferentes.')+
   passos([{t:'back and forth'+tr('para a frente e para trás')},{t:'up and down'+tr('para cima e para baixo')},{t:'round and round'+tr('em voltas')}])+
   R('Things move at different <b>speeds</b>: <b>slow</b> or <b>fast</b>.','As coisas se movem em velocidades diferentes: devagar ou rápido.')},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('obj-spin-top',[P('Look at the picture. How does the top move?','Olhe a figura. Como o pião se move?','It spins.','Ele gira.'),P('Complete: To ___ means to go up and down after hitting a surface.','Complete: ___ é subir e descer depois de bater numa superfície.','bounce','quicar'),P('Match: wheel, kite, door → roll, fly, swing.','Ligue: roda, pipa, porta → rolar, voar, balançar.','wheel: roll · kite: fly · door: swing','roda: rola · pipa: voa · porta: balança'),P('Things can move slow or ___.','As coisas podem se mover devagar ou ___.','fast','rápido')])}
]},

/* ===================== 7. ANIMALS AND BODY ===================== */
{k:'animais', tema:'animals', nome:'Movement of animals and of our body', nome_pt:'Movimento dos animais e do corpo', cor:'#34d399', quem:'Paws',
 treino:[], telas:[
 {tipo:'texto', tit:'Movements of the body and the hand',
  fala:'Body: swim, climb, play, walk, pick, sit. Hand: touch, lift, point, write, grab, push.',
  html:'<img class="fescb" src="media/cie3/orig/corpo-mao.jpg" alt="">'+
   caixa('My body'+tr('Meu corpo'),'<p><b>swim, climb, play, walk, pick, sit</b>'+tr('nadar, subir, brincar, andar, colher, sentar')+'</p>')+esp()+caixa('My hand'+tr('Minha mão'),'<p><b>touch, lift, point, write, grab, push</b>'+tr('tocar, levantar, apontar, escrever, agarrar, empurrar')+'</p>')},
 {tipo:'texto', tit:'How animals move',
  fala:'A fish swims. A bird flies. A monkey climbs. A dog walks and runs. A kangaroo and a frog jump. A snake crawls on the ground.',
  html:caixa('Animals'+tr('Animais'),'<p>A fish <b>swims</b>.'+tr('O peixe nada.')+'<br>A bird <b>flies</b>.'+tr('O pássaro voa.')+'<br>A monkey <b>climbs</b>.'+tr('O macaco escala.')+'<br>A dog <b>walks</b> and <b>runs</b>.'+tr('O cachorro anda e corre.')+'<br>A kangaroo and a frog <b>jump</b>.'+tr('O canguru e o sapo pulam.')+'<br>A snake <b>crawls</b> on the ground.'+tr('A cobra rasteja no chão.')+'</p>')},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva(null,[P('Make a list of movements you can do with your body.','Faça uma lista de movimentos que você faz com o corpo.','swim, climb, play, walk, pick, sit','nadar, subir, brincar, andar, colher, sentar'),P('Make a list of movements you can do with your hand.','Faça uma lista de movimentos que você faz com a mão.','touch, lift, point, write, grab, push','tocar, levantar, apontar, escrever, agarrar, empurrar'),P('How does a fish move? How does a bird move?','Como o peixe se move? E o pássaro?','A fish swims. A bird flies.','O peixe nada. O pássaro voa.')])}
]},

/* ===================== 8. PUSH OR PULL ===================== */
{k:'pushpull', tema:'pushpull', nome:'Push or pull', nome_pt:'Empurrar ou puxar', cor:'#f97316', quem:'Max',
 treino:[], telas:[
 {tipo:'texto', tit:'Push or pull?',
  fala:'A push is when I use a force to move something away from me. A pull is when I use a force to move something closer to me.',
  html:R('<b>push</b> · <b>pull</b>','push = empurrar · pull = puxar')+
   R('A <b>push</b> is when I use a force to move something <b>away from me</b>.','Push é quando uso uma força para mover algo para longe de mim.')+
   R('A <b>pull</b> is when I use a force to move something <b>closer to me</b>.','Pull é quando uso uma força para trazer algo para perto de mim.')},
 {tipo:'texto', tit:'Push',
  fala:'Push: riding a bike, pushing a box, pushing a door, kicking a ball. They move away from me.',
  html:grade(2,[['push-bike','riding a bike','andar de bicicleta'],['push-box','pushing a box','empurrar uma caixa'],['push-door','pushing a door','empurrar uma porta'],['push-ball','kicking a ball','chutar uma bola']])+
   R('<b>Push</b>: away from me.','Push = empurrar: para longe de mim.')},
 {tipo:'texto', tit:'Pull',
  fala:'Pull: tug of war with a rope, pulling a wagon, opening a drawer, fishing with a rod. They move closer to me.',
  html:grade(2,[['pull-rope','tug of war with a rope','cabo de guerra com corda'],['pull-wagon','pulling a wagon','puxar um carrinho'],['pull-drawer','opening a drawer','abrir uma gaveta'],['pull-fish','fishing with a rod','pescar com vara']])+
   R('<b>Pull</b>: closer to me.','Pull = puxar: para perto de mim.')},
 {tipo:'texto', tit:'More examples',
  fala:'Force makes things move from one place to another. There are two types of force: push and pull. Push and pull are opposite forces. Push: a shopping trolley, a volleyball, playing the piano, the golfer hitting the ball. Pull: holding the rope of a kite, picking fruit and vegetables from the plant.',
  html:R('<b>Force</b> makes things move from one place to another.','A força faz as coisas irem de um lugar para outro.')+
   R('Two types of force: <b>push</b> and <b>pull</b>. They are <b>opposite</b> forces.','Dois tipos de força: push e pull. São forças opostas.')+
   caixa('Push'+tr('Empurrar'),'<p>a shopping trolley'+tr('carrinho de compras')+'<br>a volleyball'+tr('bola de vôlei')+'<br>playing the piano'+tr('tocar piano')+'<br>the golfer hitting the ball'+tr('o golfista batendo na bola')+'</p>','#f97316')+esp()+
   caixa('Pull'+tr('Puxar'),'<p>holding the rope of a kite'+tr('segurar a linha da pipa')+'<br>picking fruit and vegetables from the plant'+tr('colher frutas e verduras da planta')+'</p>','#f97316')},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('pull-wagon',[P('Look at the picture. Is it a push or a pull?','Olhe a figura. É push ou pull?','a pull','puxar'),P('Complete: A push is when I use a force to move something ___ from me.','Complete: push é usar força para mover algo ___ de mim.','away','para longe'),P('Complete: A pull is when I use a force to move something ___ to me.','Complete: pull é usar força para mover algo ___ de mim.','closer','para perto')])}
]}

];
})();
