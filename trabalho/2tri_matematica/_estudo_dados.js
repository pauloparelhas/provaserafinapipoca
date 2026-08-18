/* ================= CORES DA UNIDADE (uma só paleta em todo o produto) ==== */
var C_FIG='#a78bfa', C_LAD='#34d399', C_OBJ='#38bdf8', C_SIM='#f472b6', C_PAD='#fbbf24';

/* ============ MODO 1: folha de estudo ============
   Cada linha e [emoji, TITULO, TEXTO EM INGLES, TRADUCAO PT].
   O 4o campo cai num <span class="tr">: so aparece na bandeira. */
const CONCEITOS=[
 ["\u{1F4C4}","2-D figure","a two-dimensional figure is <b>flat</b> — you can draw it on paper.","figura plana: dá para desenhar no papel. O nome vem do número de lados."],
 ["\u{1F4CF}","Side","one straight line of the figure.","o lado: cada linha reta da figura. Conte os pauzinhos retos."],
 ["\u{1F4CD}","Vertex","the corner where two sides meet. More than one: <b>vertices</b>.","o vértice: o cantinho onde dois lados se encontram. Plural: vertices."],
 ["\u{1F517}","Edge","another word for <b>side</b>: “a triangle on each edge” means one on each side.","edge quer dizer lado: um triângulo em cada lado."],
 ["\u{1F511}","The golden rule","in a figure with straight sides, the number of <b>vertices</b> is the same as the number of <b>sides</b>.","numa figura de lados retos, o número de vértices é igual ao de lados: 3 lados = 3 vértices."],
 ["\u{2B55}","The exception","the <b>circle</b> is round: no straight sides and <b>0 vertices</b>.","o círculo é redondo: não tem lado reto e é a única figura sem cantinho."]
];
const CONCEITOS_say="A two D figure is flat. A side is one straight line of the figure. A vertex is the corner where two sides meet. The plural of vertex is vertices. Edge means the same as side. In a figure with straight sides, the number of vertices is the same as the number of sides. The circle is the only one with zero vertices.";

const MIGRACAO=[
 ["\u{1F4D5}","Book cover · Door","they look like a <b>rectangle</b>.","capa de livro e porta parecem um retângulo."],
 ["\u{1FA99}","Coin · Plate · Wheel · Clock face","they look like a <b>circle</b>.","moeda, prato, roda e relógio parecem um círculo."],
 ["\u{1F355}","Slice of pizza · Party hat","they look like a <b>triangle</b>.","fatia de pizza e chapéu de festa parecem um triângulo."],
 ["\u{1F6D1}","Stop sign","it looks like an <b>octagon</b> — 8 sides.","a placa de PARE parece um octógono, de 8 lados. Octo = 8, como o octopus."],
 ["\u{1F36F}","Honeycomb cell","it looks like a <b>hexagon</b> — 6 sides.","o favo de mel parece um hexágono, de 6 lados."],
 ["\u{26BD}","The black patch on a soccer ball","it looks like a <b>pentagon</b> — 5 sides.","o gomo preto da bola parece um pentágono, de 5 lados."]
];
const MIGRACAO_say="A book cover and a door look like a rectangle. A coin, a plate, a wheel and a clock face look like a circle. A slice of pizza and a party hat look like a triangle. A stop sign looks like an octagon. A honeycomb cell looks like a hexagon.";

const TRADICOES=[
 ["\u{1FA9E}","Symmetry","a figure has <b>symmetry</b> when you can <b>fold</b> it and the two halves <b>match</b>.","tem simetria quando dá para dobrar e as duas metades combinam."],
 ["\u{2702}\u{FE0F}","Line of symmetry","the fold line. It can be <b>standing up</b> or <b>lying down</b> — and a figure can have more than one.","a linha da dobra. Pode ser em pé ou deitada. O C e o B só funcionam com a linha deitada."],
 ["\u{1F5BC}\u{FE0F}","Matching part · Mirror image","the half that is missing is the mirror image of the other half.","a metade que falta é a imagem no espelho da outra metade."],
 ["\u{1F534}","Mira","the little red mirror: put it on the line and see if the reflected half completes the figure.","o espelhinho vermelho da aula: põe em cima da linha e vê se a metade refletida completa a figura."],
 ["\u{2705}","Letters WITH symmetry","<b>O</b> and <b>X</b> (standing up AND lying down) · <b>A</b>, <b>M</b>, <b>V</b> (standing up) · <b>C</b>, <b>B</b> (lying down).","letras com simetria: O e X têm as duas linhas; A, M e V, a linha em pé; C e B, a deitada."],
 ["\u{274C}","Letters WITHOUT symmetry","<b>G</b>, <b>P</b>, <b>J</b> and <b>R</b>.","as letras sem simetria são G, P, J e R."],
 ["\u{1F469}","MOM","the word has symmetry: the Mira goes <b>standing up, in the middle of the O</b>. Others: WOW, MUM, TOT.","a palavra tem simetria: a Mira vai em pé, no meio do O."]
];
const TRADICOES_say="A figure has symmetry when you can fold it and the two halves match. The fold line is the line of symmetry. It can be standing up or lying down. The letters O, X, A, M, V, C and B have symmetry. The letters G, P, J and R do not. The word MOM has symmetry: the Mira goes standing up, in the middle of the O.";

const DIVERSIDADE=[
 ["\u{27A1}\u{FE0F}","Slide","the figure walks to the next spot — it does not spin and it does not mirror.","deslizar: a figura anda para o lugar de perto, sem virar e sem girar."],
 ["\u{1FA9E}","Flip","the figure shows its <b>mirror image</b>.","virar: a figura vira como no espelho."],
 ["\u{1F503}","Turn","the figure spins around a point, like a clock hand.","girar: a figura roda em volta de um pontinho, como o ponteiro do relógio."],
 ["\u{1F9F5}","Repeating pattern","a little piece that comes again and again, always in the same order. You can make one with <b>just one figure</b>.","um pedacinho que se repete sempre na mesma ordem. Dá para fazer com uma figura só."],
 ["\u{1F512}","What NEVER changes","the number of sides, the number of vertices, the size and the name of the figure.","o que não muda: número de lados, de vértices, tamanho e nome. A figura continua a mesma."],
 ["\u{2728}","What CAN change","where the figure is, and which way it faces.","o que pode mudar: onde a figura está e para que lado ela aponta."],
 ["\u{1F9E9}","The quilt","a 3 by 3 grid, blocks 1 to 9. From block 1: down two, one right, up one, one left → block <b>4</b>.","a colcha é uma grade 3 por 3. Do bloco 1, descendo dois, indo um à direita, subindo um e indo um à esquerda: chega-se no bloco 4."]
];
const DIVERSIDADE_say="Slide means the figure walks to the next spot. Flip means it shows its mirror image. Turn means it spins around a point. In a repeating pattern the same little piece comes again and again. The number of sides, the number of vertices, the size and the name of the figure never change. Only where it is and which way it faces can change.";

const REGIOES=[
 {k:'Circle',    pt:'Círculo',   co:C_OBJ, emo:"\u{2B55}", lados:"no straight sides — it is round", vert:"0 vertices", spot:"round, with no corners", obj:"a coin, a plate, a wheel, a clock face"},
 {k:'Triangle',  pt:'Triângulo', co:'#fb923c', emo:"\u{1F53A}", lados:"3 sides", vert:"3 vertices", spot:"3 straight sides", obj:"a slice of pizza, a party hat"},
 {k:'Square',    pt:'Quadrado',  co:C_LAD, emo:"\u{1F7E9}", lados:"4 sides", vert:"4 vertices", spot:"4 sides, all the same length", obj:"a window pane, a chessboard square"},
 {k:'Rectangle', pt:'Retângulo', co:'#60a5fa', emo:"\u{1F7E6}", lados:"4 sides", vert:"4 vertices", spot:"2 long sides and 2 short sides", obj:"a book cover, a door"},
 {k:'Pentagon',  pt:'Pentágono', co:C_SIM, emo:"\u{2B50}", lados:"5 sides", vert:"5 vertices", spot:"penta = 5", obj:"the black patch on a soccer ball"},
 {k:'Hexagon',   pt:'Hexágono',  co:C_FIG, emo:"\u{1F41D}", lados:"6 sides", vert:"6 vertices", spot:"hexa = 6", obj:"a honeycomb cell"},
 {k:'Octagon',   pt:'Octógono',  co:C_PAD, emo:"\u{1F6D1}", lados:"8 sides", vert:"8 vertices", spot:"octo = 8, like an octopus", obj:"a stop sign"}
];
const REGIOES_say="Circle: no straight sides, zero vertices. Triangle: three sides, three vertices. Square: four sides all the same length, four vertices. Rectangle: four sides, two long and two short, four vertices. Pentagon: five sides, five vertices. Hexagon: six sides, six vertices. Octagon: eight sides, eight vertices.";

const DICAS=[
 ["\u{1F4CD}","<b>Side</b> is the straight line. <b>Vertex</b> is the corner. Read the question to the end: “how many <b>sides</b>?” is not the same as “how many <b>vertices</b>?”.","Lado é a linha reta; vértice é o cantinho. Ler a pergunta até o fim — é a pegadinha número 1."],
 ["\u{1F511}","In a figure with straight sides, <b>sides = vertices</b>. If you know one, you know the other.","Numa figura de lados retos, lados = vértices. Sabendo um, você já sabe o outro."],
 ["\u{2B55}","The <b>circle</b> has <b>0 vertices</b>. It is the only figure like that.","O círculo tem 0 vértices. É a única figura assim."],
 ["\u{1F4CF}","A <b>line of symmetry</b> can be <b>lying down</b>! If you only look for the standing-up line, you miss <b>C</b> and <b>B</b>.","A linha de simetria pode ser deitada! Quem só procura a linha em pé erra o C e o B — a pegadinha número 2."],
 ["\u{1F419}","<b>penta</b> = 5 · <b>hexa</b> = 6 · <b>octo</b> = 8, like an <b>octopus</b>.","penta = 5 · hexa = 6 · octo = 8, como o polvo."],
 ["\u{1F7E9}","<b>Square</b> and <b>rectangle</b> both have 4 sides and 4 vertices. The difference: in the <b>square</b> all four sides are the same length.","Quadrado e retângulo têm os dois 4 lados e 4 vértices. O que muda: no quadrado os 4 lados são iguais."],
 ["\u{1F504}","<b>Flip</b> is the mirror. <b>Turn</b> is spinning, like a clock. In Portuguese we say “virar” for both — in English we do not.","Flip é espelho; turn é girar. Em português a gente diz “virar” para os dois — a pegadinha número 3."],
 ["\u{1F517}","<b>Edge</b> means <b>side</b>. If the question says edge, it is the side.","Edge quer dizer lado. Se a pergunta falar em edge, é o lado."]
];

/* [pergunta EN, resposta EN, tradução PT da dupla] */
const FAQ=[
 ["What is a side?","One straight line of the figure.","O que é um lado? Cada linha reta da figura."],
 ["What is a vertex?","The corner where two sides meet.","O que é um vértice? O cantinho onde dois lados se encontram."],
 ["How many sides does a triangle have?","Three.","Quantos lados tem um triângulo? Três."],
 ["How many vertices does a triangle have?","Three.","Quantos vértices tem um triângulo? Três."],
 ["How many sides does a hexagon have?","Six.","Quantos lados tem um hexágono? Seis."],
 ["How many sides does an octagon have?","Eight.","Quantos lados tem um octógono? Oito."],
 ["How many vertices does a circle have?","Zero.","Quantos vértices tem um círculo? Nenhum."],
 ["What is the difference between a square and a rectangle?","In a square all four sides are the same length; a rectangle has 2 long and 2 short sides.","Qual a diferença entre quadrado e retângulo? No quadrado os 4 lados são iguais; o retângulo tem 2 compridos e 2 curtos."],
 ["What does a stop sign look like?","An octagon.","Com que se parece uma placa de PARE? Um octógono."],
 ["What does a honeycomb cell look like?","A hexagon.","Com que se parece um favo de mel? Um hexágono."],
 ["When does a figure have symmetry?","When you fold it and the two halves match.","Quando uma figura tem simetria? Quando se dobra e as duas metades combinam."],
 ["Which letters have symmetry?","O, X, A, M, V, C and B. G, P, J and R do not.","Que letras têm simetria? O, X, A, M, V, C e B. G, P, J e R não têm."],
 ["Where do you put the Mira on MOM?","Standing up, in the middle of the O.","Onde se põe a Mira em MOM? Em pé, no meio do O."],
 ["What is a slide, a flip and a turn?","Slide = it walks · Flip = mirror image · Turn = it spins around a point.","O que são slide, flip e turn? Deslizar, virar no espelho e girar em volta de um ponto."],
 ["When a figure turns, what stays the same?","The number of sides, the number of vertices, the size and the name.","Quando a figura gira, o que continua igual? O número de lados, o de vértices, o tamanho e o nome."]
];
