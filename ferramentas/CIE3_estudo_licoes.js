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
 treino:[[['position'],5]], telas:[
 {tipo:'texto', tit:'Where is it?',
  fala:'Pin, the red pin of the map, says: Twister the tornado blew everything away! To find it all, we start with where things are. In, on, under, inside.',
  html:fala('Pin, the red map pin','Twister the tornado blew everything away! Let’s start with <b>where</b> things are.'+tr('O tornado Twister espalhou tudo! Vamos começar por ONDE as coisas estão.'))+
   grade(2,[['prep-in','The teddy bear is <b>in</b> the box.','O ursinho está dentro da caixa.'],['prep-on','The apple is <b>on</b> the book.','A maçã está sobre o livro.'],['prep-under','The ball is <b>under</b> the table.','A bola está embaixo da mesa.'],['prep-inside','The fish is <b>inside</b> the bowl.','O peixe está dentro do aquário.']])},
 {tipo:'completa', tit:'Read and complete', fala:'Read and complete.', regra:'in · on · under · inside',
  itens:[
   C('The bear is _ the box.','in',['on','under'],'O urso está … a caixa.','dentro d'),
   C('The apple is _ the book.','on',['in','under'],'A maçã está … o livro.','sobre'),
   C('The ball is _ the table.','under',['on','in'],'A bola está … a mesa.','embaixo d'),
   C('The fish is _ the bowl.','inside',['on','under'],'O peixe está … o aquário.','dentro d')
  ]},
 {tipo:'texto', tit:'Watch out!',
  fala:'In and inside are very close: the thing is within something. On: on top of it, touching it. Under: lower than it.',
  html:fala('Pin','Don’t mix them up!'+tr('Não confunda!'))+
   caixa('in · inside','<p>Very close: the thing is within something.'+tr('Muito parecidos: a coisa está dentro de algo.')+'</p>')+esp()+
   caixa('on × under','<p><b>on</b>: on top, touching it.'+tr('sobre: em cima, encostado.')+'<br><b>under</b>: lower than it.'+tr('embaixo: mais baixo que ele.')+'</p>')},
 {tipo:'escolha', tit:'Where is it?', fala:'Where is it? Look at the picture and complete.', pergunta:'Look at the picture. Which word completes it?'+tr('Olhe a figura. Qual palavra completa?'),
  frase:true, itens:[
   Q('prep-in','The teddy bear is _ the box.','in',['on','under'],'The bear is in the box.'+tr('O ursinho está dentro da caixa.'),'O ursinho está … a caixa.','dentro d'),
   Q('prep-on','The apple is _ the book.','on',['in','under'],'The apple is on the book.'+tr('A maçã está sobre o livro.'),'A maçã está … o livro.','sobre'),
   Q('prep-under','The ball is _ the table.','under',['on','in'],'The ball is under the table.'+tr('A bola está embaixo da mesa.'),'A bola está … a mesa.','embaixo d'),
   Q('prep-inside','The fish is _ the bowl.','inside',['on','under'],'The fish is inside the bowl.'+tr('O peixe está dentro do aquário.'),'O peixe está … o aquário.','dentro d')
  ]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('prep-under',[P('Look at the picture. Where is the ball?','Olhe a figura. Onde está a bola?','under the table','embaixo da mesa'),P('Complete: The apple is ___ the book.','Complete: A maçã está ___ o livro.','on','sobre'),P('Which sentence is right? The fish is on the bowl. / The fish is inside the bowl.','Qual frase está certa?','The fish is inside the bowl.','O peixe está dentro do aquário.')])}
]},

/* ===================== 2. POSITION: BEHIND, BETWEEN, ... E A CENA ===================== */
{k:'pos2', tema:'position', nome:'Position: behind, between, near and more', nome_pt:'Posição: atrás, entre, perto e mais', cor:'#f472b6', quem:'Pin',
 treino:[[['position'],5]], telas:[
 {tipo:'texto', tit:'Behind, in front of, between, next to',
  fala:'Pin says: The boy is behind the tree. The dog is in front of the chair. The teddy bear is between the two plants. The clock is next to the lamp.',
  html:fala('Pin','More words for <b>where</b>!'+tr('Mais palavras para ONDE!'))+
   grade(2,[['prep-behind','The boy is <b>behind</b> the tree.','O menino está atrás da árvore.'],['prep-in-front-of','The dog is <b>in front of</b> the chair.','O cachorro está na frente da cadeira.'],['prep-between','The teddy bear is <b>between</b> the two plants.','O ursinho está entre as duas plantas.'],['prep-next-to','The clock is <b>next to</b> the lamp.','O relógio está ao lado do abajur.']])},
 {tipo:'texto', tit:'Near, far from, above, below, over',
  fala:'The tree is near the house. The tree is far from the house. The lamp is above the table. The cat is below the shelf. A bird is flying over the trees.',
  html:grade(2,[['prep-near','The tree is <b>near</b> the house.','A árvore está perto da casa.'],['prep-far-from','The tree is <b>far from</b> the house.','A árvore está longe da casa.'],['prep-above','The lamp is <b>above</b> the table.','A luminária está acima da mesa.'],['prep-below','The cat is <b>below</b> the shelf.','O gato está abaixo da prateleira.']])+
   R('A bird is flying <b>over</b> the trees.','Um pássaro está voando por cima das árvores.')},
 {tipo:'texto', tit:'Watch out!',
  fala:'On means touching. Above and over mean higher, not touching. Under the table, below the shelf: both are lower. Next to is right beside it. Near is close. Far from is not close. Behind is at the back. In front of is at the front.',
  html:fala('Pin','These pairs trick us!'+tr('Estes pares enganam!'))+
   caixa('on × above × over','<p><b>on</b>: touching.'+tr('sobre: encostado.')+'<br><b>above, over</b>: higher, not touching.'+tr('acima, por cima: mais alto, sem encostar.')+'</p>')+esp()+
   caixa('under × below','<p>under the table · below the shelf: lower.'+tr('embaixo da mesa · abaixo da prateleira: mais baixo.')+'</p>')+esp()+
   caixa('next to × near × far from','<p><b>next to</b>: right beside it. <b>near</b>: close. <b>far from</b>: not close.'+tr('ao lado: colado. perto: próximo. longe: não está próximo.')+'</p>')+esp()+
   caixa('behind × in front of','<p>at the back × at the front'+tr('atrás × na frente')+'</p>')},
 {tipo:'escolha', tit:'Where is it?', fala:'Where is it? Look at the picture and complete.', pergunta:'Look at the picture. Which word completes it?'+tr('Olhe a figura. Qual palavra completa?'),
  frase:true, itens:[
   Q('prep-behind','The boy is _ the tree.','behind',['in front of','above'],'He is at the back of the tree.'+tr('Ele está atrás da árvore.'),'O menino está … a árvore.','atrás d'),
   Q('prep-in-front-of','The dog is _ the chair.','in front of',['behind','on'],'The dog is at the front of the chair.'+tr('O cachorro está na frente da cadeira.'),'O cachorro está … a cadeira.','na frente d'),
   Q('prep-between','The teddy bear is _ the two plants.','between',['on','under'],'There is a plant on each side.'+tr('Tem uma planta de cada lado.'),'O ursinho está … as duas plantas.','entre'),
   Q('prep-next-to','The clock is _ the lamp.','next to',['far from','in'],'It is right beside the lamp.'+tr('Está colado ao abajur.'),'O relógio está … o abajur.','ao lado d'),
   Q('prep-near','The tree is _ the house.','near',['far from','under'],'The tree is close to the house.'+tr('A árvore está perto da casa.'),'A árvore está … a casa.','perto d'),
   Q('prep-far-from','The tree is _ the house.','far from',['near','next to'],'Look at the long arrow.'+tr('Olhe a seta comprida.'),'A árvore está … a casa.','longe d'),
   Q('prep-above','The lamp is _ the table.','above',['on','under'],'It is higher and does not touch the table.'+tr('Está mais alto e não encosta na mesa.'),'A luminária está … a mesa.','acima d'),
   Q('prep-below','The cat is _ the shelf.','below',['on','above'],'The cat is lower than the shelf.'+tr('O gato está mais baixo que a prateleira.'),'O gato está … a prateleira.','abaixo d')
  ]},
 {tipo:'texto', tit:'Look at the room',
  fala:'Look at the room. There are many things in it. Where is the pizza? Where is the guitar? Where are the two dogs? Let’s find out.',
  html:fig('room')+fala('Pin','Look at everything in this room. <b>Where</b> is each thing?'+tr('Olhe tudo nesta sala. ONDE está cada coisa?'))},
 {tipo:'escolha', tit:'In the room', fala:'Look at the room and complete.', pergunta:'Look at the room. Which word completes it?'+tr('Olhe a sala. Qual palavra completa?'),
  frase:true, itens:[
   Q('room','The pizza is _ the box.','in',['under','behind'],'Pizza in the box.'+tr('A pizza está dentro da caixa.'),'A pizza está … a caixa.','dentro d'),
   Q('room','The guitar is _ the lamp and the plant.','between',['on','under'],'Lamp, guitar, plant.'+tr('Abajur, violão, planta.'),'O violão está … o abajur e a planta.','entre'),
   Q('room','The two dogs are _ the table.','under',['on','behind'],'The two dogs are under the table.'+tr('Os dois cachorros estão embaixo da mesa.'),'Os dois cachorros estão … a mesa.','embaixo d'),
   Q('room','The window is _ the sofa.','behind',['on','under'],'The sofa is at the front; the window is at the back.'+tr('O sofá está na frente; a janela, atrás.'),'A janela está … o sofá.','atrás d'),
   Q('room','The racket is _ the bag.','next to',['in','on'],'They are side by side.'+tr('Estão lado a lado.'),'A raquete está … a mochila.','ao lado d'),
   Q('room','The cheese is _ the plate.','on',['under','behind'],'The cheese touches the plate.'+tr('O queijo encosta no prato.'),'O queijo está … o prato.','sobre'),
   Q('room','The rug is _ the sofa.','in front of',['behind','on'],'The rug is at the front of the sofa.'+tr('O tapete está na frente do sofá.'),'O tapete está … o sofá.','na frente d'),
   Q('room','The lamp is _ the shelf.','under',['on','in'],'The shelf is higher than the lamp.'+tr('A prateleira está mais alta que o abajur.'),'O abajur está … a prateleira.','embaixo d'),
   Q('room','The trophy is _ the books.','between',['under','behind'],'There are books on each side.'+tr('Tem livros de cada lado.'),'O troféu está … os livros.','entre'),
   Q('room','The picture is _ the wall.','on',['under','in'],'The picture touches the wall.'+tr('O quadro encosta na parede.'),'O quadro está … parede.','na'),
   Q('room','The bird is flying _ the trees.','over',['under','in'],'It flies higher than the trees.'+tr('Voa mais alto que as árvores.'),'O pássaro está voando … as árvores.','por cima d'),
   Q('room','The two fish are _ the bowl.','in',['on','under'],'The fish are in the water, in the bowl.'+tr('Os peixes estão na água, no aquário.'),'Os dois peixes estão … o aquário.','dentro d')
  ]},
 {tipo:'completa', tit:'Touching or not?', fala:'Read and complete.', regra:'on × above × over · near × far from · behind × in front of',
  itens:[
   C('The lamp does not touch the table. It is _ the table.','above',['on'],'A luminária não encosta na mesa. Ela está … a mesa.','acima d'),
   C('The apple touches the book. It is _ the book.','on',['above'],'A maçã encosta no livro. Ela está … o livro.','sobre'),
   C('The bird does not touch the trees. It flies _ the trees.','over',['on'],'O pássaro não encosta nas árvores. Ele voa … as árvores.','por cima d'),
   C('The tree is not close to the house. It is _ the house.','far from',['near'],'A árvore não está perto da casa. Ela está … a casa.','longe d'),
   C('The window is at the back of the sofa. It is _ the sofa.','behind',['in front of'],'A janela está na parte de trás do sofá. Ela está … o sofá.','atrás d')
  ]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('room',[P('Use the words in the box: behind, next to, in front of, over, in, on, between, under. There is a guitar ___ the lamp and the plant.','Use as palavras da caixa. Tem um violão ___ o abajur e a planta.','between','entre'),P('There is a racket ___ the bag.','Tem uma raquete ___ a mochila.','next to','ao lado de'),P('There is a picture ___ the wall.','Tem um quadro ___ a parede.','on','na')])}
]},

/* ===================== 3. DIRECTIONS AND MAPS ===================== */
{k:'dir', tema:'directions', nome:'Directions and maps', nome_pt:'Direções e mapas', cor:'#fb7185', quem:'Pin',
 treino:[[['directions'],5]], telas:[
 {tipo:'texto', tit:'I mark a place',
  fala:'Pin says: I am the red pin. I mark a place on the map. There are many maps: a city map on a phone, a GPS route, a map of a city like São Paulo, and a map of the school.',
  html:fala('Pin','I am the <b>red pin</b>: I mark a place on the map!'+tr('Eu sou o pino vermelho: marco um lugar no mapa!'))+
   caixa('Types of map'+tr('Tipos de mapa'),'<p>• a city map on a phone'+tr('mapa da cidade no celular')+'<br>• a GPS route'+tr('rota de GPS')+'<br>• a map of a city: São Paulo'+tr('mapa de uma cidade: São Paulo')+'<br>• a map of the school'+tr('mapa da escola')+'</p>')},
 {tipo:'texto', tit:'Reading a map',
  fala:'When we read maps we need to pay a lot of attention to the details and to the path, the way we are going. We might get lost if we run or don’t pay attention.',
  html:R('When we read maps we need to <b>pay a lot of attention</b> to the <b>details</b> and to the <b>path</b>, the way we are going.','Quando lemos mapas, precisamos prestar muita atenção aos detalhes e ao caminho que estamos seguindo.')+
   R('We might get <b>lost</b> if we run or don’t pay attention.','Podemos nos perder se corrermos ou não prestarmos atenção.')},
 {tipo:'texto', tit:'Left and right on the map',
  fala:'Look at the map of the school. Left and right are the sides of the person looking at the map. The Auditorium is between A section and B section. A section is on the left. B section is on the right.',
  html:fig('map-school')+
   passos([{t:'&larr; left'+tr('esquerda')},{t:'right &rarr;'+tr('direita')}])+
   R('Left and right: the sides of the person <b>looking at the map</b>.','Esquerda e direita: os lados de quem olha o mapa.')+
   R('The Auditorium is <b>between</b> A section and B section.','O Auditório fica entre a seção A e a seção B.')},
 {tipo:'escolha', tit:'The school map', fala:'Look at the school map and complete.', pergunta:'Look at the map. Which word completes it?'+tr('Olhe o mapa. Qual palavra completa?'),
  frase:true, itens:[
   Q('map-school','The Auditorium is _ A section and B section.','between',['under','behind'],'A section, Auditorium, B section.'+tr('Seção A, Auditório, seção B.'),'O Auditório fica … a seção A e a seção B.','entre'),
   Q('map-school','A section is on the _ of the Auditorium.','left',['right'],'Look at the map: A section is on the left.'+tr('Olhe o mapa: a seção A fica à esquerda.'),'A seção A fica à … do Auditório.','esquerda'),
   Q('map-school','B section is on the _ of the Auditorium.','right',['left'],'Look at the map: B section is on the right.'+tr('Olhe o mapa: a seção B fica à direita.'),'A seção B fica à … do Auditório.','direita'),
   Q('map-school','At the top of the map, Gym/Court 1 is on the _.','right',['left'],'Gym/Court 1: top right.'+tr('Em cima, à direita.'),'Em cima, o Ginásio 1 fica à ….','direita'),
   Q('map-school','At the top of the map, Gym/Court 2 is on the _.','left',['right'],'Gym/Court 2: top left.'+tr('Em cima, à esquerda.'),'Em cima, o Ginásio 2 fica à ….','esquerda'),
   Q('map-school','C section is _ Gym/Court 2 and Gym/Court 1.','between',['under','behind'],'There is a gym on each side.'+tr('Tem um ginásio de cada lado.'),'A seção C fica … o Ginásio 2 e o Ginásio 1.','entre'),
   Q('map-school','On the map, the Treehouse and Trix are _ the Patio.','above',['below'],'They are higher on the map.'+tr('Estão mais acima no mapa.'),'No mapa, a Casa da Árvore e a Trix ficam … o pátio.','acima d'),
   Q('map-school','On the map, the Drive is _ the Entrance.','below',['above'],'The Drive is at the bottom of everything.'+tr('A Drive fica embaixo de tudo.'),'No mapa, a Drive fica … a Entrada.','abaixo d')
  ]},
 {tipo:'completa', tit:'Don’t get lost!', fala:'Read and complete.', regra:'Reading a map'+tr('Lendo um mapa'),
  itens:[
   C('We might get _ if we run or don’t pay attention.','lost',['found'],'Podemos nos … se corrermos ou não prestarmos atenção.','perder'),
   C('When we read maps we need to pay a lot of _ to the details.','attention',['speed'],'Ao ler mapas, precisamos prestar muita … aos detalhes.','atenção'),
   C('We pay attention to the path, the _ we are going.','way',['map'],'Prestamos atenção ao caminho, o … que seguimos.','caminho'),
   C('The red pin marks a _ on the map.','place',['path'],'O pino vermelho marca um … no mapa.','lugar')
  ]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('map-school',[P('Look at the map. What is between A section and B section?','Olhe o mapa. O que há entre a seção A e a B?','the Auditorium','o auditório'),P('Is B section on the left or on the right of the Auditorium?','A seção B fica à esquerda ou à direita do auditório?','on the right','à direita'),P('When we read maps, we need to pay attention to the details and the ___.','Ao ler mapas, prestamos atenção nos detalhes e no ___.','path','caminho'),P('True or false: we might get lost if we run.','Verdadeiro ou falso: podemos nos perder se corrermos.','True','Verdadeiro')])}
]},

/* ===================== 4. CHANGING PERSPECTIVE ===================== */
{k:'persp', tema:'perspective', nome:'Changing perspective', nome_pt:'Mudando a perspectiva', cor:'#fbbf24', quem:'Gigi',
 treino:[[['perspective'],5]], telas:[
 {tipo:'texto', tit:'Where are you looking from?',
  fala:'Gigi, the giraffe painter, says: We can see many things from different positions, and our perspective changes depending on where we are looking from.',
  html:fala('Gigi, the giraffe painter','I am very tall. I see things from up here!'+tr('Sou muito alta. Vejo as coisas daqui de cima!'))+
   R('We can see many things from <b>different</b> positions, and our perspective changes depending on <b>where</b> we are looking from.','Podemos ver muitas coisas de posições diferentes, e nossa perspectiva muda dependendo de ONDE estamos olhando.')},
 {tipo:'texto', tit:'The Eiffel Tower',
  fala:'The Eiffel Tower, seen from the front, from the top, from the side and from the bottom. It is the same tower.',
  html:grade(2,[['view-front','seen from the <b>front</b>','vista de frente'],['view-top','seen from the <b>top</b>','vista de cima'],['view-side','seen from the <b>side</b>','vista de lado'],['view-bottom','seen from the <b>bottom</b>','vista de baixo']])+
   R('The same tower. A different view!','A mesma torre. Uma vista diferente!')},
 {tipo:'texto', tit:'One object, three shadows',
  fala:'This is one object. It makes a different shadow on each side: a triangle, a rectangle and a circle.',
  html:fig('view-shadow',300)+
   R('<b>One</b> object. A different shadow on each side: <b>triangle</b>, <b>rectangle</b>, <b>circle</b>.','Um só objeto. Uma sombra diferente de cada lado: triângulo, retângulo, círculo.')},
 {tipo:'texto', tit:'Gigi’s words',
  fala:'Gigi says: People are not right or wrong. They just have a different view of things.',
  html:fig('view-giraffe',240)+
   fala('Gigi','“People are not right or wrong. They just have a different view of things.”'+tr('“As pessoas não estão certas nem erradas. Elas só têm uma visão diferente das coisas.”'))},
 {tipo:'escolha', tit:'Seen from where?', fala:'Seen from where? Look at the picture and complete.', pergunta:'Look at the picture. Which word completes it?'+tr('Olhe a figura. Qual palavra completa?'),
  frase:true, itens:[
   Q('view-front','Seen from the _.','front',['top','bottom'],'We stand on the grass and look at the tower.'+tr('Estamos na grama, olhando para a torre.'),'Vista de ….','frente'),
   Q('view-top','Seen from the _.','top',['bottom','front'],'We look down from the tower.'+tr('Olhamos para baixo, de cima da torre.'),'Vista de ….','cima'),
   Q('view-side','Seen from the _.','side',['bottom'],'We see the whole tower from one side, with the city around it.'+tr('Vemos a torre inteira de um lado, com a cidade em volta.'),'Vista de ….','lado'),
   Q('view-bottom','Seen from the _.','bottom',['top','side'],'We look up from under the tower.'+tr('Olhamos para cima, debaixo da torre.'),'Vista de ….','baixo'),
   Q('view-shadow','The shadow on the left wall is a _.','triangle',['rectangle','circle'],'Left wall: a triangle.'+tr('Parede da esquerda: triângulo.'),'A sombra na parede da esquerda é um ….','triângulo'),
   Q('view-shadow','The shadow on the right wall is a _.','rectangle',['triangle','circle'],'Right wall: a rectangle.'+tr('Parede da direita: retângulo.'),'A sombra na parede da direita é um ….','retângulo'),
   Q('view-shadow','The shadow on the floor is a _.','circle',['triangle','rectangle'],'Floor: a circle.'+tr('Chão: círculo.'),'A sombra no chão é um ….','círculo')
  ]},
 {tipo:'completa', tit:'Gigi’s rule', fala:'Read and complete.', regra:'Different positions, different views.'+tr('Posições diferentes, vistas diferentes.'),
  itens:[
   C('Our perspective changes depending on _ we are looking from.','where',['when'],'Nossa perspectiva muda dependendo de … estamos olhando.','onde'),
   C('We can see many things from _ positions.','different',['the same'],'Podemos ver muitas coisas de posições ….','diferentes'),
   C('People are not right or _.','wrong',['left'],'As pessoas não estão certas nem ….','erradas'),
   C('They just have a different _ of things.','view',['shadow'],'Elas só têm uma … diferente das coisas.','visão')
  ]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('view-bottom',[P('Look at the picture. The tower is seen from the ___.','Olhe a figura. A torre é vista de ___.','bottom','baixo'),P('Our perspective changes depending on ___ we are looking from.','Nossa perspectiva muda dependendo de ___ estamos olhando.','where','onde'),P('Complete: People are not right or wrong. They just have a different ___ of things.','As pessoas não estão certas nem erradas; só têm outra ___ das coisas.','view','visão')])}
]},

/* ===================== 5. WIND AND WATER ===================== */
{k:'forcas', tema:'forces', nome:'Wind and water: helpful and harmful', nome_pt:'Vento e água: úteis e perigosos', cor:'#38bdf8', quem:'Breezy and Drop',
 treino:[[['forces'],5]], telas:[
 {tipo:'texto', tit:'Two natural forces',
  fala:'Breezy and Drop say: Wind and water are two natural forces that exist in nature, and they can be helpful and harmful to us.',
  html:fala('Breezy, the breeze','I am the wind!'+tr('Eu sou o vento!'))+
   fala('Drop, the droplet','I am the water!'+tr('Eu sou a água!'))+
   R('Wind and water are two <b>natural forces</b> that exist in nature, and they can be <b>helpful</b> and <b>harmful</b> to us.','Vento e água são duas forças naturais que existem na natureza, e podem ser úteis e prejudiciais para nós.')},
 {tipo:'texto', tit:'Helpful',
  fala:'Helpful: water the plants, water to make energy, wind to make energy, wind that spreads the seeds.',
  html:grade(2,[['help-water-plants','water the plants','regar as plantas'],['help-water-energy','water to make energy','água para fazer energia'],['help-wind-energy','wind to make energy','vento para fazer energia'],['help-wind-seeds','wind that spreads the seeds','vento que espalha as sementes']])},
 {tipo:'texto', tit:'Harmful',
  fala:'Harmful: tsunami, heavy rain and floods, tornado, strong winds.',
  html:grade(2,[['harm-tsunami','tsunami','tsunami'],['harm-floods','heavy rain and floods','chuva forte e enchentes'],['harm-tornado','tornado','tornado'],['harm-winds','strong winds','ventos fortes']])+
   caixa('Watch out!'+tr('Cuidado!'),'<p><b>helpful</b> × <b>harmful</b>: they look alike, but they are opposites.'+tr('útil × prejudicial: parecidas, mas são opostas.')+'<br><b>wind</b> × <b>window</b>: wind is air in motion.'+tr('vento × janela: vento é ar em movimento.')+'</p>')},
 {tipo:'escolha', tit:'Helpful or harmful?', fala:'Helpful or harmful? Look at the picture.', pergunta:'Is it helpful or harmful?'+tr('É útil ou prejudicial?'),
  medio:true, op:['Helpful','Harmful'], itens:[
   {m:foto('help-water-plants'), c:'Helpful', d:'Water the plants.'+tr('Regar as plantas.')},
   {m:foto('harm-tsunami'), c:'Harmful', d:'A tsunami.'+tr('Um tsunami.')},
   {m:foto('help-wind-energy'), c:'Helpful', d:'Wind to make energy.'+tr('Vento para fazer energia.')},
   {m:foto('harm-floods'), c:'Harmful', d:'Heavy rain and floods.'+tr('Chuva forte e enchentes.')},
   {m:foto('help-water-energy'), c:'Helpful', d:'Water to make energy.'+tr('Água para fazer energia.')},
   {m:foto('harm-tornado'), c:'Harmful', d:'A tornado.'+tr('Um tornado.')},
   {m:foto('help-wind-seeds'), c:'Helpful', d:'Wind that spreads the seeds.'+tr('Vento que espalha as sementes.')},
   {m:foto('harm-winds'), c:'Harmful', d:'Strong winds.'+tr('Ventos fortes.')}
  ]},
 {tipo:'revela', tit:'What the video adds',
  fala:'Wind is air in motion. Wind moves sand and makes dunes. Water is always moving. Wind and water help us. We need to protect our air and water.',
  cartoes:[
   {f:'Wind is air in motion'+tr('Vento é ar em movimento'), b:'A gentle breeze or a mighty gust. Blowing bubbles makes wind. A kite flies with the wind.'+tr('Uma brisa suave ou uma rajada forte. Soprar bolhas faz vento. A pipa voa com o vento.')},
   {f:'What wind does'+tr('O que o vento faz'), b:'Wind moves sand and makes dunes. Wind and sand wear rock and make arches.'+tr('O vento move a areia e faz dunas. Vento e areia gastam a rocha e fazem arcos.')},
   {f:'Water is always moving'+tr('A água está sempre em movimento'), b:'Rivers flow downhill. Water wears rock and makes valleys and canyons. Rain carries soil away.'+tr('Os rios descem. A água gasta a rocha e faz vales e cânions. A chuva leva a terra embora.')},
   {f:'We use the wind'+tr('Usamos o vento'), b:'Sailing, turbines for electricity, kites. Wind also spreads seeds.'+tr('Velejar, turbinas para eletricidade, pipas. O vento também espalha sementes.')},
   {f:'We use the water'+tr('Usamos a água'), b:'Hydroelectricity with dams, boats and ships, farmers water fields, drinking, cooking, washing. Rivers are home to fish and frogs.'+tr('Hidreletricidade com barragens, barcos e navios, irrigar os campos, beber, cozinhar, lavar. Os rios são a casa de peixes e sapos.')},
   {f:'Our job'+tr('Nossa tarefa'), b:'We need to protect our air and water.'+tr('Precisamos proteger nosso ar e nossa água.')}
  ]},
 {tipo:'escolha', tit:'Wind or water?', fala:'Wind or water? Which one does it?', pergunta:'Which force is it?'+tr('Qual força é?'),
  frase:true, op:['Wind','Water'], itens:[
   {m:'It makes sand dunes.'+tr('Faz dunas de areia.'), c:'Wind', d:'Wind moves sand and makes dunes.'+tr('O vento move a areia e faz dunas.')},
   {m:'It flows downhill in rivers.'+tr('Desce nos rios.'), c:'Water', d:'Rivers flow downhill.'+tr('Os rios descem.')},
   {m:'It makes valleys and canyons.'+tr('Faz vales e cânions.'), c:'Water', d:'Water wears rock.'+tr('A água gasta a rocha.')},
   {m:'It turns the turbines.'+tr('Gira as turbinas.'), c:'Wind', d:'Turbines make electricity with the wind.'+tr('As turbinas fazem eletricidade com o vento.')},
   {m:'Farmers use it in their fields.'+tr('Os agricultores usam nos campos.'), c:'Water', d:'Farmers water fields.'+tr('Os agricultores irrigam os campos.')},
   {m:'A kite flies with it.'+tr('A pipa voa com ele.'), c:'Wind', d:'A kite flies with the wind.'+tr('A pipa voa com o vento.')},
   {m:'Dams use it to make electricity.'+tr('As barragens usam para fazer eletricidade.'), c:'Water', d:'Hydroelectricity.'+tr('Hidreletricidade.')},
   {m:'It spreads the seeds.'+tr('Espalha as sementes.'), c:'Wind', d:'Wind spreads seeds.'+tr('O vento espalha as sementes.')}
  ]},
 {tipo:'completa', tit:'Air and water', fala:'Read and complete.', regra:'Wind and water'+tr('Vento e água'),
  itens:[
   C('Wind and water are two natural _.','forces',['seeds'],'Vento e água são duas … naturais.','forças'),
   C('Wind is air in _.','motion',['dunes'],'Vento é ar em ….','movimento'),
   C('A soft wind is a gentle _.','breeze',['gust'],'Um vento leve é uma … suave.','brisa'),
   C('Rain carries _ away.','soil',['air'],'A chuva leva a … embora.','terra'),
   C('We need to protect our air and _.','water',['sand'],'Precisamos proteger nosso ar e nossa ….','água')
  ]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('harm-floods',[P('Wind and water are two ___ forces.','Vento e água são duas forças ___.','natural','naturais'),P('Look at the picture. Is it helpful or harmful?','Olhe a figura. Ajuda ou prejudica?','harmful','prejudica'),P('Write one way wind is helpful and one way water is helpful.','Escreva um jeito em que o vento ajuda e um em que a água ajuda.','wind: makes energy, spreads seeds · water: waters plants, makes energy','vento: faz energia, espalha sementes · água: rega plantas, faz energia'),P('Is a tsunami wind or water?','Tsunami é vento ou água?','water','água')])}
]},

/* ===================== 6. MOVEMENT OF OBJECTS ===================== */
{k:'objetos', tema:'objects', nome:'Movement of objects', nome_pt:'Movimento dos objetos', cor:'#a78bfa', quem:'Boing',
 treino:[[['objects'],5]], telas:[
 {tipo:'texto', tit:'Bounce and fly',
  fala:'Boing says: Six Motion Stars, one for each movement! Bounce: to go up and down after hitting a surface. Fly: to move through the air.',
  html:fala('Boing, the bouncing ball','Twister blew away the 6 <b>Motion Stars</b>! One star for each movement.'+tr('O Twister levou as 6 Estrelas do Movimento! Uma estrela para cada movimento.'))+
   mov('bounce')+mov('fly')},
 {tipo:'texto', tit:'Roll and slide',
  fala:'Roll: to move by turning over and over. Slide: to move smoothly along a surface.',
  html:mov('roll')+mov('slide')},
 {tipo:'texto', tit:'Spin and swing',
  fala:'Spin: to turn around and around. Swing: to move back and forth like a pendulum.',
  html:mov('spin')+mov('swing')},
 {tipo:'texto', tit:'Watch out!',
  fala:'A wheel rolls and leaves its place. A top spins in its place. A swing goes back and forth. A slide is a toy. To slide is the movement.',
  html:fala('Boing','Don’t mix them up!'+tr('Não confunda!'))+
   caixa('roll × spin','<p><b>roll</b>: it leaves its place. <b>spin</b>: it stays in its place.'+tr('rolar: sai do lugar. girar: fica no lugar.')+'</p>')+esp()+
   caixa('swing × spin','<p><b>swing</b>: back and forth. <b>spin</b>: around and around.'+tr('balançar: vai e volta. girar: dá voltas.')+'</p>')+esp()+
   caixa('a slide × to slide','<p><b>a slide</b>: the toy. <b>to slide</b>: the movement.'+tr('o escorregador: o brinquedo. deslizar: o movimento.')+'</p>')},
 {tipo:'texto', tit:'Directions and speed',
  fala:'Things move in different directions: back and forth, up and down, round and round. Things move at different speeds: slow or fast.',
  html:R('Things move in different <b>directions</b>.','As coisas se movem em direções diferentes.')+
   passos([{t:'back and forth'+tr('para a frente e para trás')},{t:'up and down'+tr('para cima e para baixo')},{t:'round and round'+tr('em voltas')}])+
   R('Things move at different <b>speeds</b>: <b>slow</b> or <b>fast</b>.','As coisas se movem em velocidades diferentes: devagar ou rápido.')},
 {tipo:'liga', tit:'Match the movement', fala:'Match each movement to its words.',
  pares:[['bounce','up and down after hitting a surface'],['fly','through the air'],['roll','turning over and over'],['slide','smoothly along a surface'],['spin','around and around'],['swing','back and forth']]},
 {tipo:'escolha', tit:'How does it move?', fala:'How does it move? Look at the picture.', pergunta:'How does it move?'+tr('Como ele se move?'),
  medio:true, op:OP_MOV, itens:[
   ITM('bounce',0,'It goes up and down.'+tr('Sobe e desce.')),
   ITM('bounce',1,'It goes up and down.'+tr('Sobe e desce.')),
   ITM('bounce',2,'It goes up and down.'+tr('Sobe e desce.')),
   ITM('fly',0,'It moves through the air.'+tr('Move-se pelo ar.')),
   ITM('fly',1,'It moves through the air.'+tr('Move-se pelo ar.')),
   ITM('fly',2,'It moves through the air.'+tr('Move-se pelo ar.')),
   ITM('roll',0,'It turns over and over.'+tr('Vira e vira.')),
   ITM('roll',1,'It turns over and over.'+tr('Vira e vira.')),
   ITM('roll',2,'It turns over and over.'+tr('Vira e vira.')),
   ITM('slide',0,'It moves smoothly along a surface.'+tr('Desliza sobre uma superfície.')),
   ITM('slide',1,'It moves smoothly along a surface.'+tr('Desliza sobre uma superfície.')),
   ITM('slide',2,'It moves smoothly along a surface.'+tr('Desliza sobre uma superfície.')),
   ITM('spin',0,'It turns around and around.'+tr('Dá voltas e voltas.')),
   ITM('spin',1,'It turns around and around.'+tr('Dá voltas e voltas.')),
   ITM('spin',2,'It turns around and around.'+tr('Dá voltas e voltas.')),
   ITM('swing',0,'It moves back and forth.'+tr('Vai e volta.')),
   ITM('swing',1,'It moves back and forth.'+tr('Vai e volta.')),
   ITM('swing',2,'It moves back and forth.'+tr('Vai e volta.'))
  ]},
 {tipo:'completa', tit:'Direction or speed?', fala:'Read and complete.', regra:'directions × speeds'+tr('direções × velocidades'),
  itens:[
   C('Slow or fast: these are different _.','speeds',['directions'],'Devagar ou rápido: são … diferentes.','velocidades'),
   C('Up and down, round and round: these are different _.','directions',['speeds'],'Para cima e para baixo, em voltas: são … diferentes.','direções'),
   C('A swing moves back and _.','forth',['down'],'O balanço vai para a frente e para ….','trás'),
   C('A ball that bounces goes up and _.','down',['forth'],'A bola que quica vai para cima e para ….','baixo')
  ]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('obj-spin-top',[P('Look at the picture. How does the top move?','Olhe a figura. Como o pião se move?','It spins.','Ele gira.'),P('Complete: To ___ means to go up and down after hitting a surface.','Complete: ___ é subir e descer depois de bater numa superfície.','bounce','quicar'),P('Match: wheel, kite, door → roll, fly, swing.','Ligue: roda, pipa, porta → rolar, voar, balançar.','wheel: roll · kite: fly · door: swing','roda: rola · pipa: voa · porta: balança'),P('Things can move slow or ___.','As coisas podem se mover devagar ou ___.','fast','rápido')])}
]},

/* ===================== 7. ANIMALS AND BODY ===================== */
{k:'animais', tema:'animals', nome:'Movement of animals and of our body', nome_pt:'Movimento dos animais e do corpo', cor:'#34d399', quem:'Paws',
 treino:[[['animals'],5]], telas:[
 {tipo:'texto', tit:'Movements of the body',
  fala:'Make a list of movements you can do with your body. Swim, climb, play, walk, pick, sit.',
  html:fala('Paws','This is the sheet from your class. We move too!'+tr('Esta é a folha da sua aula. Nós também nos movemos!'))+
   '<img class="fescb" src="media/cie3/orig/corpo-mao.jpg" alt="">'+
   caixa('My body'+tr('Meu corpo'),'<p><b>swim, climb, play, walk, pick, sit</b>'+tr('nadar, subir, brincar, andar, colher, sentar')+'</p>')},
 {tipo:'texto', tit:'Movements of the hand',
  fala:'Make a list of movements you can do with your hand. Touch, lift, point, write, grab, push.',
  html:caixa('My hand'+tr('Minha mão'),'<p><b>touch, lift, point, write, grab, push</b>'+tr('tocar, levantar, apontar, escrever, agarrar, empurrar')+'</p>')+esp()+
   R('Learn to <b>write</b> these words: the sheet asks you to make a list.','Aprenda a escrever estas palavras: a folha pede para fazer uma lista.')},
 {tipo:'texto', tit:'How animals move',
  fala:'A fish swims. A bird flies. A monkey climbs. A dog walks and runs. A kangaroo and a frog jump. A snake crawls on the ground.',
  html:fala('Paws','Each animal has its way to move!'+tr('Cada animal tem seu jeito de se mover!'))+
   caixa('Animals'+tr('Animais'),'<p>A fish <b>swims</b>.'+tr('O peixe nada.')+'<br>A bird <b>flies</b>.'+tr('O pássaro voa.')+'<br>A monkey <b>climbs</b>.'+tr('O macaco escala.')+'<br>A dog <b>walks</b> and <b>runs</b>.'+tr('O cachorro anda e corre.')+'<br>A kangaroo and a frog <b>jump</b>.'+tr('O canguru e o sapo pulam.')+'<br>A snake <b>crawls</b> on the ground.'+tr('A cobra rasteja no chão.')+'</p>')},
 {tipo:'escolha', tit:'How does it move?', fala:'How does the animal move? Complete.', pergunta:'Which word completes it?'+tr('Qual palavra completa?'),
  frase:true, itens:[
   Q(null,'A fish _.','swims',['climbs','jumps'],'A fish swims.'+tr('O peixe nada.'),'O peixe ….','nada'),
   Q(null,'A bird _.','flies',['swims','crawls'],'A bird flies.'+tr('O pássaro voa.'),'O pássaro ….','voa'),
   Q(null,'A monkey _.','climbs',['swims','crawls'],'A monkey climbs.'+tr('O macaco escala.'),'O macaco ….','escala'),
   Q(null,'A dog _.','walks',['flies','crawls'],'A dog walks and runs.'+tr('O cachorro anda e corre.'),'O cachorro ….','anda'),
   Q(null,'A kangaroo _.','jumps',['flies','swims'],'A kangaroo jumps.'+tr('O canguru pula.'),'O canguru ….','pula'),
   Q(null,'A frog _.','jumps',['flies','climbs'],'A frog jumps.'+tr('O sapo pula.'),'O sapo ….','pula'),
   Q(null,'A snake _ on the ground.','crawls',['flies','jumps'],'A snake crawls.'+tr('A cobra rasteja.'),'A cobra … no chão.','rasteja')
  ]},
 {tipo:'escolha', tit:'Body or hand?', fala:'Is it a movement of the body or of the hand?', pergunta:'Is it in the body list or in the hand list?'+tr('Está na lista do corpo ou da mão?'),
  medio:true, op:['Body','Hand'], itens:[
   {m:'swim', c:'Body', d:'Body: swim, climb, play, walk, pick, sit.'+tr('Corpo: nadar, escalar, brincar, andar, pegar, sentar.')},
   {m:'write', c:'Hand', d:'Hand: touch, lift, point, write, grab, push.'+tr('Mão: tocar, levantar, apontar, escrever, agarrar, empurrar.')},
   {m:'climb', c:'Body', d:'Body: swim, climb, play, walk, pick, sit.'+tr('Corpo: nadar, escalar, brincar, andar, pegar, sentar.')},
   {m:'point', c:'Hand', d:'Hand: touch, lift, point, write, grab, push.'+tr('Mão: tocar, levantar, apontar, escrever, agarrar, empurrar.')},
   {m:'walk', c:'Body', d:'Body: swim, climb, play, walk, pick, sit.'+tr('Corpo: nadar, escalar, brincar, andar, pegar, sentar.')},
   {m:'grab', c:'Hand', d:'Hand: touch, lift, point, write, grab, push.'+tr('Mão: tocar, levantar, apontar, escrever, agarrar, empurrar.')},
   {m:'sit', c:'Body', d:'Body: swim, climb, play, walk, pick, sit.'+tr('Corpo: nadar, escalar, brincar, andar, pegar, sentar.')},
   {m:'lift', c:'Hand', d:'Hand: touch, lift, point, write, grab, push.'+tr('Mão: tocar, levantar, apontar, escrever, agarrar, empurrar.')}
  ]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva(null,[P('Make a list of movements you can do with your body.','Faça uma lista de movimentos que você faz com o corpo.','swim, climb, play, walk, pick, sit','nadar, subir, brincar, andar, colher, sentar'),P('Make a list of movements you can do with your hand.','Faça uma lista de movimentos que você faz com a mão.','touch, lift, point, write, grab, push','tocar, levantar, apontar, escrever, agarrar, empurrar'),P('How does a fish move? How does a bird move?','Como o peixe se move? E o pássaro?','A fish swims. A bird flies.','O peixe nada. O pássaro voa.')])}
]},

/* ===================== 8. PUSH OR PULL ===================== */
{k:'pushpull', tema:'pushpull', nome:'Push or pull', nome_pt:'Empurrar ou puxar', cor:'#f97316', quem:'Max',
 treino:[[['pushpull'],5]], telas:[
 {tipo:'texto', tit:'Push or pull?',
  fala:'Max says: A push is when I use a force to move something away from me. A pull is when I use a force to move something closer to me.',
  html:R('<b>push</b> · <b>pull</b>','push = empurrar · pull = puxar')+
   fala('Max, tug-of-war coach','Ready? Hold the rope!'+tr('Pronto? Segure a corda!'))+
   R('A <b>push</b> is when I use a force to move something <b>away from me</b>.','Push é quando uso uma força para mover algo para longe de mim.')+
   R('A <b>pull</b> is when I use a force to move something <b>closer to me</b>.','Pull é quando uso uma força para trazer algo para perto de mim.')+
   caixa('Watch out!'+tr('Cuidado!'),'<p><b>push</b>: away from me. <b>pull</b>: closer to me.'+tr('PUSH = empurrar, nunca “puxar”. PULL = puxar. Push parece puxar, mas é o contrário!')+'</p>','#f97316')},
 {tipo:'texto', tit:'Push',
  fala:'Push: riding a bike, pushing a box, pushing a door, kicking a ball. They move away from me.',
  html:grade(2,[['push-bike','riding a bike','andar de bicicleta'],['push-box','pushing a box','empurrar uma caixa'],['push-door','pushing a door','empurrar uma porta'],['push-ball','kicking a ball','chutar uma bola']])+
   R('<b>Push</b>: away from me.','Push = empurrar: para longe de mim.')},
 {tipo:'texto', tit:'Pull',
  fala:'Pull: tug of war with a rope, pulling a wagon, opening a drawer, fishing with a rod. They move closer to me.',
  html:grade(2,[['pull-rope','tug of war with a rope','cabo de guerra com corda'],['pull-wagon','pulling a wagon','puxar um carrinho'],['pull-drawer','opening a drawer','abrir uma gaveta'],['pull-fish','fishing with a rod','pescar com vara']])+
   R('<b>Pull</b>: closer to me.','Pull = puxar: para perto de mim.')},
 {tipo:'escolha', tit:'Push or pull?', fala:'Push or pull? Look at the picture.', pergunta:'Is it a push or a pull?'+tr('É push ou pull?'),
  medio:true, op:['Push','Pull'], itens:[
   {m:foto('push-bike'), c:'Push', d:'Riding a bike is a push.'+tr('Andar de bicicleta é push: empurrar.')},
   {m:foto('push-box'), c:'Push', d:'The box moves away from him.'+tr('A caixa vai para longe dele: empurrar.')},
   {m:foto('push-ball'), c:'Push', d:'The ball moves away from him.'+tr('A bola vai para longe dele: empurrar.')},
   {m:foto('pull-rope'), c:'Pull', d:'Each one brings the rope closer.'+tr('Cada um traz a corda para perto: puxar.')},
   {m:foto('pull-wagon'), c:'Pull', d:'The wagon comes along with him.'+tr('O carrinho vem junto com ele: puxar.')},
   {m:foto('pull-drawer'), c:'Pull', d:'The drawer comes closer to her.'+tr('A gaveta vem para perto dela: puxar.')},
   {m:foto('pull-fish'), c:'Pull', d:'The fish comes closer to him.'+tr('O peixe vem para perto dele: puxar.')}
  ]},
 {tipo:'texto', tit:'Forces in the video',
  fala:'Force makes things move from one place to another. There are two types of force: push and pull. Push and pull are opposite forces. Push: a shopping trolley, a volleyball, playing the piano, the golfer hitting the ball. Pull: holding the rope of a kite, picking fruit and vegetables from the plant.',
  html:R('<b>Force</b> makes things move from one place to another.','A força faz as coisas irem de um lugar para outro.')+
   R('Two types of force: <b>push</b> and <b>pull</b>. They are <b>opposite</b> forces.','Dois tipos de força: push e pull. São forças opostas.')+
   caixa('Push'+tr('Empurrar'),'<p>a shopping trolley'+tr('carrinho de compras')+'<br>a volleyball'+tr('bola de vôlei')+'<br>playing the piano'+tr('tocar piano')+'<br>the golfer hitting the ball'+tr('o golfista batendo na bola')+'</p>','#f97316')+esp()+
   caixa('Pull'+tr('Puxar'),'<p>holding the rope of a kite'+tr('segurar a linha da pipa')+'<br>picking fruit and vegetables from the plant'+tr('colher frutas e verduras da planta')+'</p>','#f97316')},
 {tipo:'escolha', tit:'Push or pull?', fala:'Push or pull? Read and choose.', pergunta:'Is it a push or a pull?'+tr('É push ou pull?'),
  frase:true, op:['Push','Pull'], itens:[
   {m:'a shopping trolley'+tr('um carrinho de compras'), c:'Push', d:'The trolley moves away from me.'+tr('O carrinho vai para longe de mim: empurrar.')},
   {m:'hitting a volleyball'+tr('bater numa bola de vôlei'), c:'Push', d:'The ball moves away from me.'+tr('A bola vai para longe de mim: empurrar.')},
   {m:'playing the piano'+tr('tocar piano'), c:'Push', d:'The fingers move the keys away.'+tr('Os dedos afastam as teclas: empurrar.')},
   {m:'the golfer hitting the ball'+tr('o golfista batendo na bola'), c:'Push', d:'The ball moves away from him.'+tr('A bola vai para longe dele: empurrar.')},
   {m:'holding the rope of a kite'+tr('segurar a linha da pipa'), c:'Pull', d:'The rope brings the kite closer.'+tr('A linha traz a pipa para perto: puxar.')},
   {m:'picking fruit from the plant'+tr('colher fruta da planta'), c:'Pull', d:'The fruit comes closer to me.'+tr('A fruta vem para perto de mim: puxar.')},
   {m:'a door that moves away from me'+tr('uma porta que vai para longe de mim'), c:'Push', d:'Pushing a door.'+tr('Empurrar uma porta.')},
   {m:'opening a drawer'+tr('abrir uma gaveta'), c:'Pull', d:'The drawer comes closer to me.'+tr('A gaveta vem para perto de mim: puxar.')}
  ]},
 {tipo:'completa', tit:'Max’s rule', fala:'Read and complete.', regra:'Force'+tr('Força'),
  itens:[
   C('A push moves something _ me.','away from',['closer to'],'Push move algo … mim.','para longe de'),
   C('A pull moves something _ me.','closer to',['away from'],'Pull move algo … mim.','para perto de'),
   C('Push and pull are _ forces.','opposite',['equal'],'Push e pull são forças ….','opostas'),
   C('Force makes things move from one _ to another.','place',['speed'],'A força faz as coisas irem de um … para outro.','lugar')
  ]},
 {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class="nptit">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva('pull-wagon',[P('Look at the picture. Is it a push or a pull?','Olhe a figura. É push ou pull?','a pull','puxar'),P('Complete: A push is when I use a force to move something ___ from me.','Complete: push é usar força para mover algo ___ de mim.','away','para longe'),P('Complete: A pull is when I use a force to move something ___ to me.','Complete: pull é usar força para mover algo ___ de mim.','closer','para perto'),P('Write one example of a push and one of a pull.','Escreva um exemplo de push e um de pull.','push: kicking a ball · pull: opening a drawer','push: chutar a bola · pull: abrir a gaveta')])}
]}

];
})();
