/* ============================================================
   MAT3_jogo_perguntas.js — as perguntas do JOGO Math Stars (window.MAT3J). Escrito à mão (o fork não toca).
   Pedido do Paulo (14/11): "é um jogo, as perguntas são pra dar imersão; perguntas e respostas possíveis
   devem ter tamanho adequado" — o jogo NÃO usa as alternativas longas do simulado ("What is probability?"
   com definições inteiras). O banco do simulado (MAT3_banco.js) continua intacto; aqui fica a camada do jogo:
     1) do banco entram só os itens CURTOS (CRIT): enunciado <= 14 palavras e <= 85 caracteres; cada
        alternativa <= 5 palavras e <= 30 caracteres (sinais + × ÷ = não contam como palavra); nada de
        'multi' (mais de uma certa), texto de leitura ou tabela;
     2) NOVAS: versões curtas, do jogo, dos itens de conceito (a definição vira a lacuna ou a pergunta
        "which word / which part"), em inglês, só com o conteúdo do _roteiro.md (NÃO COBRAR e INFERIDO
        respeitados), revisadas pelo revisor-sentido;
     3) EX: explicação mais curta para item do banco cuja explicação é longa demais para o balão.
   Carrega DEPOIS de MAT3_banco.js e MAT3_figuras.js. Portão: gen/jogo/verifica_perguntas_mat3.js.
   ============================================================ */
window.MAT3J=(function(){
'use strict';
var CRIT={p_pal:14, p_car:85, o_pal:5, o_car:30};
function pal(s){ return String(s).trim().split(/\s+/).filter(function(w){ return /[A-Za-z0-9]/.test(w); }).length; }
function curto(it){
  if(!it||it.texto||it.tabela||Array.isArray(it.c)) return false;
  if(pal(it.p)>CRIT.p_pal||String(it.p).length>CRIT.p_car) return false;
  return it.o.every(function(o){ return pal(o)<=CRIT.o_pal&&String(o).length<=CRIT.o_car; });
}
/* explicação curta para o balão (o banco segue com a longa) */
var EX={
  t5_05:['Unlikely: small chance to happen. "You will see a penguin in the desert."','Unlikely: pouca chance de acontecer. "Você vai ver um pinguim no deserto."']
};
var NOVAS=[
  /* ---- T1 measure */
  {id:'j1_01', de:'t1_01', tema:'measure', tipo:'conceito', p:'Length is how ___ something is, from one end to the other.', p_pt:'Comprimento (length) é o quanto uma coisa é ___, de uma ponta à outra.',
   o:['long','tall','wide'], o_pt:['comprida','alta','larga'], c:0, dica:'Pense num lápis: de uma ponta à outra.', dica_en:'Think of a pencil: from one end to the other.',
   ex:'Length is how long something is, from one end to the other.', ex_pt:'Comprimento é o quanto uma coisa é comprida, de uma ponta à outra.'},
  {id:'j1_02', de:'t1_05', tema:'measure', tipo:'conceito', p:'Which word means how high something is, from the bottom to the top?', p_pt:'Qual palavra quer dizer o quanto uma coisa é alta, de baixo até em cima?',
   o:['tall','wide','long'], o_pt:['alto','largo','comprido'], c:0, dica:'Pense numa árvore: de baixo até em cima.', dica_en:'Think of a tree: from the bottom to the top.',
   ex:'Tall is how high something is, from the bottom to the top. A tall tree goes very high.', ex_pt:'Alto (tall) é o quanto uma coisa é alta, de baixo até em cima. Uma árvore alta vai bem para o alto.'},
  {id:'j1_03', de:'t1_04', tema:'measure', tipo:'conceito', p:'Which word means how much something measures across, from one side to the other?', p_pt:'Qual palavra quer dizer o quanto uma coisa mede de um lado ao outro?',
   o:['wide','tall','long'], o_pt:['largo','alto','comprido'], c:0, dica:'Pense num livro largo: de um lado ao outro.', dica_en:'Think of a wide book: from one side to the other.',
   ex:'Wide is how much something measures across, from one side to the other.', ex_pt:'Largo (wide) é o quanto uma coisa mede de um lado ao outro.'},
  {id:'j1_04', de:'t1_12', tema:'measure', tipo:'conceito', p:'Which word means how tall someone or something is?', p_pt:'Qual palavra quer dizer o quanto alguém ou alguma coisa é alto?',
   o:['height','length','perimeter'], o_pt:['altura (height)','comprimento (length)','perímetro (perimeter)'], c:0, dica:'Pense em medir uma menina de pé, dos pés à cabeça.', dica_en:'Think of measuring a girl, from her feet to her head.',
   ex:'Height is how tall someone or something is, like a tall girl.', ex_pt:'Altura (height) é o quanto alguém ou alguma coisa é alto, como uma menina alta.'},
  /* ---- T2 perimeter */
  {id:'j2_01', de:'t2_02', tema:'perimeter', tipo:'conceito', p:'How do we find the perimeter of a shape?', p_pt:'Como achamos o perímetro de uma figura?',
   o:['add all the sides','count the corners','add only 2 sides'], o_pt:['somar todos os lados','contar os cantos','somar só 2 lados'], c:0, dica:'Perímetro: a distância toda em volta.', dica_en:'Perimeter: the total distance around.',
   ex:'Perimeter: add all the sides of the shape!', ex_pt:'Perímetro: some todos os lados da figura!'},
  {id:'j2_02', de:'t2_01', tema:'perimeter', tipo:'conceito', p:'Perimeter is the total distance ___ a shape.', p_pt:'Perímetro é a distância total ___ uma figura.',
   o:['around','across','inside'], o_pt:['em volta de','de um lado ao outro de','dentro de'], c:0, dica:'Passe o dedo por todos os lados da figura.', dica_en:'Move your finger along all the sides of the shape.',
   ex:'Perimeter is the total distance around a shape: along all its sides.', ex_pt:'Perímetro é a distância total em volta de uma figura: por todos os lados.'},
  {id:'j2_03', de:'t2_11', tema:'perimeter', tipo:'rapida', p:'What is the perimeter of the rectangle?', p_pt:'Qual é o perímetro do retângulo?', fig:['retangulo',170,90,5,3],
   o:['16 cm','8 cm','13 cm'], o_pt:['16 cm','8 cm','13 cm'], c:0, dica:'Some em cima, embaixo e os dois lados.', dica_en:'Add the top, the bottom and both sides.',
   ex:'5 + 5 + 3 + 3 = 16 cm.', ex_pt:'5 + 5 + 3 + 3 = 16 cm.'},
  /* ---- T3 solids */
  {id:'j3_01', de:'t3_02', tema:'solids', tipo:'conceito', p:'Which part is a flat surface of a 3D solid?', p_pt:'Qual parte é uma superfície plana de um sólido 3D?',
   o:['a face','an edge','a vertex'], o_pt:['uma face','uma aresta','um vértice'], c:0, dica:'Passe a mão no lado liso de um cubo.', dica_en:'Touch the flat side of a cube.',
   ex:'A face is a flat surface of a 3D solid. A cube has 6 faces.', ex_pt:'Face é uma superfície plana de um sólido 3D. O cubo tem 6 faces.'},
  {id:'j3_02', de:'t3_03', tema:'solids', tipo:'conceito', p:'Which part is a straight line where two faces meet?', p_pt:'Qual parte é uma linha reta onde duas faces se encontram?',
   o:['an edge','a face','a vertex'], o_pt:['uma aresta','uma face','um vértice'], c:0, dica:'É uma linha, não um canto.', dica_en:'It is a line, not a corner.',
   ex:'An edge is a straight line where two faces meet. A cube has 12 edges.', ex_pt:'Aresta é uma linha reta onde duas faces se encontram. O cubo tem 12 arestas.'},
  {id:'j3_03', de:'t3_04', tema:'solids', tipo:'conceito', p:'Which part is a corner where two or more edges meet?', p_pt:'Qual parte é um canto onde duas ou mais arestas se encontram?',
   o:['a vertex','an edge','a face'], o_pt:['um vértice','uma aresta','uma face'], c:0, dica:'É um canto, uma pontinha.', dica_en:'It is a corner.',
   ex:'A vertex is a corner where two or more edges meet. A cube has 8 vertices.', ex_pt:'Vértice é um canto onde duas ou mais arestas se encontram. O cubo tem 8 vértices.'},
  {id:'j3_04', de:'t3_18', tema:'solids', tipo:'rapida', p:'A sphere has…', p_pt:'Uma esfera tem…', fig:['solido','sphere'],
   o:['no flat face','1 flat face','2 flat faces'], o_pt:['nenhuma face plana','1 face plana','2 faces planas'], c:0, dica:'Pense numa bola. Ela tem alguma parte plana?', dica_en:'Think of a ball. Does it have a flat part?',
   ex:'A sphere has only a curved surface: no flat face.', ex_pt:'A esfera só tem superfície curva: nenhuma face plana.'},
  {id:'j3_05', de:'t3_19', tema:'solids', tipo:'conceito', p:'Which solid can roll?', p_pt:'Qual sólido pode rolar?',
   o:['sphere','cube','pyramid'], o_pt:['esfera','cubo','pirâmide'], c:0, dica:'Quem rola tem superfície curva.', dica_en:'A solid with a curved surface can roll.',
   ex:'A sphere has a curved surface, so it can roll. A cube and a pyramid have only flat faces.', ex_pt:'A esfera tem superfície curva, então rola. O cubo e a pirâmide só têm faces planas.'},
  /* ---- T4 data */
  {id:'j4_01', de:'t4_01', tema:'data', tipo:'conceito', p:'All the information we collect and find out is called…', p_pt:'Toda a informação que juntamos e descobrimos se chama…',
   o:['data','a piece of data','a bar graph'], o_pt:['dados (data)','um dado (a piece of data)','um gráfico de barras'], c:0, dica:'Toda a informação, não só um fato.', dica_en:'All the information, not only one fact.',
   ex:'Data is all the information we collect and find out. A piece of data is one fact.', ex_pt:'Dados (data) são toda a informação que juntamos e descobrimos. Um dado (a piece of data) é um fato só.'},
  {id:'j4_02', de:'t4_11', tema:'data', tipo:'conceito', p:'In a bar graph, which part tells how many?', p_pt:'Num gráfico de barras, qual parte diz quantos?',
   o:['the top of the bar','the name under the bar','the color of the bar'], o_pt:['o topo da barra','o nome embaixo da barra','a cor da barra'], c:0, dica:'Veja até onde a barra sobe.', dica_en:'Look how high the bar goes.',
   ex:'Read the number where the top of the bar is: that is how many.', ex_pt:'Leia o número onde fica o topo da barra: é quantos há.'},
  /* ---- T5 probability */
  {id:'j5_01', de:'t5_15', tema:'probability', tipo:'conceito', p:'Look at the probability scale. Which word is between likely and unlikely?', p_pt:'Olhe a escala de probabilidade. Qual palavra fica entre likely e unlikely?', fig:['escalaVazia',2],
   o:['possible','certain','impossible'], o_pt:['possível','certo','impossível'], c:0, dica:'Fica no meio da escala.', dica_en:'It is in the middle of the scale.',
   ex:'From the top: certain, likely, possible, unlikely, impossible.', ex_pt:'De cima para baixo: certain, likely, possible, unlikely, impossible.'},
  /* ---- T6 multiplication */
  {id:'j6_01', de:'t6_01', tema:'multiplication', tipo:'conceito', p:'Multiplication is a shorter way to show…', p_pt:'Multiplicação é um jeito mais curto de mostrar…',
   o:['repeated addition','sharing into groups','adding different numbers'], o_pt:['adição repetida','repartir em grupos','somar números diferentes'], c:0, dica:'3 + 3 + 3 + 3 = 4 × 3.', dica_en:'3 + 3 + 3 + 3 = 4 × 3.',
   ex:'Multiplication is a shorter way to show repeated addition: 3 + 3 + 3 + 3 = 4 × 3.', ex_pt:'Multiplicação é um jeito mais curto de mostrar a adição repetida: 3 + 3 + 3 + 3 = 4 × 3.'},
  {id:'j6_02', de:'t6_02', tema:'multiplication', tipo:'conceito', p:'Equal groups have ___ in each group.', p_pt:'Grupos iguais têm ___ em cada grupo.',
   o:['the same amount','a different amount','only one thing'], o_pt:['a mesma quantidade','uma quantidade diferente','só uma coisa'], c:0, dica:'Iguais = a mesma coisa.', dica_en:'Equal means the same.',
   ex:'Equal groups have the same amount in each group.', ex_pt:'Grupos iguais têm a mesma quantidade em cada grupo.'},
  /* ---- T7 division */
  {id:'j7_01', de:'t7_02', tema:'division', tipo:'conceito', p:'To share equally means…', p_pt:'Repartir igualmente quer dizer…',
   o:['everybody gets the same','one friend gets more','we add the same number'], o_pt:['todo mundo ganha o mesmo','um amigo ganha mais','somamos o mesmo número'], c:0, dica:'Igualmente = a mesma quantidade.', dica_en:'Equally means the same amount.',
   ex:'To share equally means everybody gets the same amount.', ex_pt:'Repartir igualmente quer dizer que todo mundo ganha a mesma quantidade.'},
  {id:'j7_02', de:'t7_14', tema:'division', tipo:'rapida', p:'Share 7 cookies between 2 friends: 3 each. How many are left?', p_pt:'Reparta 7 biscoitos entre 2 amigos: 3 para cada um. Quantos sobram?', fig:['soltos',7,'cookie'],
   o:['1','0','2'], o_pt:['1','0','2'], c:0, dica:'3 + 3 = 6. E o 7?', dica_en:'3 + 3 = 6. And 7?',
   ex:'3 cookies for each friend and 1 is left: 3 + 3 + 1 = 7.', ex_pt:'3 biscoitos para cada amigo e sobra 1: 3 + 3 + 1 = 7.'},
  {id:'j7_03', de:'t7_15', tema:'division', tipo:'rapida', p:'Which number leaves 1 when we share it between 2 friends?', p_pt:'Qual número deixa sobrar 1 quando repartimos entre 2 amigos?',
   o:['5','4','8'], o_pt:['5','4','8'], c:0, dica:'Tente repartir cada número entre 2.', dica_en:'Try to share each number between 2.',
   ex:'5 is odd: 2 for each friend and 1 is left. 4 and 8 are even: nothing is left.', ex_pt:'5 é ímpar: 2 para cada amigo e sobra 1. 4 e 8 são pares: não sobra nada.'},
  {id:'j7_04', de:'t7_08', tema:'division', tipo:'conceito', p:'12 ÷ 3 = 4 means: 12 shared into 3 equal groups is…', p_pt:'12 ÷ 3 = 4 quer dizer: 12 repartidos em 3 grupos iguais dá…',
   o:['4 in each group','9 in each group','3 in each group'], o_pt:['4 em cada grupo','9 em cada grupo','3 em cada grupo'], c:0, dica:'Olhe o número depois do =.', dica_en:'Look at the number after the =.',
   ex:'12 shared into 3 equal groups is 4 in each group: 4 + 4 + 4 = 12.', ex_pt:'12 repartidos em 3 grupos iguais dá 4 em cada grupo: 4 + 4 + 4 = 12.'},
  {id:'j7_05', de:'t7_13', tema:'division', tipo:'rapida', p:'Which number can be shared equally between 2 friends?', p_pt:'Qual número pode ser repartido igualmente entre 2 amigos?',
   o:['6','5','9'], o_pt:['6','5','9'], c:0, dica:'Tente repartir cada número entre 2.', dica_en:'Try to share each number between 2.',
   ex:'6 is even: 3 for each friend. 5 and 9 are odd: 1 is left.', ex_pt:'6 é par: 3 para cada amigo. 5 e 9 são ímpares: sobra 1.'}
];
var BANCO=(window.MAT3&&MAT3.ITENS)||[];
var ITENS=BANCO.filter(curto).map(function(it){ var e=EX[it.id]; if(!e) return it; var n={}; for(var k in it) n[k]=it[k]; n.ex=e[0]; n.ex_pt=e[1]; return n; })
  .concat(NOVAS.filter(function(it){ var ok=curto(it); if(!ok&&window.console) console.warn('MAT3J: pergunta do jogo fora do critério', it.id); return ok; }));
return {ITENS:ITENS, NOVAS:NOVAS, EX:EX, CRIT:CRIT, curto:curto, pal:pal};
})();
