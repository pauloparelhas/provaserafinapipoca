/* ================= CORES DA UNIDADE (uma só paleta em todo o produto) ==== */
var C_FIG='#a78bfa', C_LAD='#34d399', C_OBJ='#38bdf8', C_SIM='#f472b6', C_PAD='#fbbf24';

/* ============ MODO 1: folha de estudo ============ */
const CONCEITOS=[
 ["\u{1F4C4}","2-D figure","figura de duas dimensões: é <b>flat</b> (plana), dá para desenhar no papel.","o nome vem do número de lados"],
 ["\u{1F4CF}","Side","o <b>lado</b>: cada linha reta da figura.","conte os pauzinhos retos"],
 ["\u{1F4CD}","Vertex","o <b>vértice</b>: o cantinho onde dois lados se encontram. Plural: <b>vertices</b>.","corner = cantinho"],
 ["\u{1F517}","Edge","outra palavra para <b>lado</b>. “a triangle on each edge” = um triângulo em cada lado.",""],
 ["\u{1F511}","A regra de ouro","numa figura de lados retos, o número de <b>vertices</b> é igual ao número de <b>sides</b>.","3 lados = 3 vértices"],
 ["\u{2B55}","A exceção","o <b>circle</b> é redondo: não tem lado reto e tem <b>0 vertices</b>.","é a única figura sem cantinho"]
];
const CONCEITOS_say="A two D figure is flat. A side is one straight line of the figure. A vertex is the corner where two sides meet. The plural of vertex is vertices. Edge means the same as side. In a figure with straight sides, the number of vertices is the same as the number of sides. The circle is the only one with zero vertices.";

const MIGRACAO=[
 ["\u{1F4D5}","Book cover · Door","parecem um <b>rectangle</b> (retângulo).",""],
 ["\u{1FA99}","Coin · Plate · Wheel · Clock face","parecem um <b>circle</b> (círculo).","moeda, prato, roda e relógio"],
 ["\u{1F355}","Slice of pizza · Party hat","parecem um <b>triangle</b> (triângulo).",""],
 ["\u{1F6D1}","Stop sign","parece um <b>octagon</b> (octógono) — 8 lados.","octo = 8, como o octopus"],
 ["\u{1F36F}","Honeycomb cell","parece um <b>hexagon</b> (hexágono) — 6 lados.",""],
 ["\u{26BD}","O gomo preto da bola","parece um <b>pentagon</b> (pentágono) — 5 lados.",""]
];
const MIGRACAO_say="A book cover and a door look like a rectangle. A coin, a plate, a wheel and a clock face look like a circle. A slice of pizza and a party hat look like a triangle. A stop sign looks like an octagon. A honeycomb cell looks like a hexagon.";

const TRADICOES=[
 ["\u{1FA9E}","Symmetry","uma figura tem <b>symmetry</b> quando dá para dobrar (<b>fold</b>) e as duas metades <b>combinam</b> (match).",""],
 ["\u{2702}\u{FE0F}","Line of symmetry","a linha da dobra. Pode ser <b>em pé</b> ou <b>deitada</b> — e uma figura pode ter mais de uma.","o C e o B só funcionam com a linha deitada"],
 ["\u{1F5BC}\u{FE0F}","Matching part · Mirror image","a metade que falta é a imagem no espelho.",""],
 ["\u{1F534}","Mira","o espelhinho vermelho da aula: põe em cima da linha e vê se a metade refletida completa a figura.",""],
 ["\u{2705}","Letras COM simetria","<b>O</b> e <b>X</b> (em pé e deitada) · <b>A</b>, <b>M</b> e <b>V</b> (em pé) · <b>C</b> e <b>B</b> (deitada).","estas são as do material"],
 ["\u{274C}","Letras SEM simetria","<b>G</b>, <b>P</b>, <b>J</b> e <b>R</b>.",""],
 ["\u{1F469}","MOM","a palavra tem simetria: a Mira vai <b>em pé, no meio do O</b>. Outras: WOW, MUM, TOT.",""]
];
const TRADICOES_say="A figure has symmetry when you can fold it and the two halves match. The fold line is the line of symmetry. It can be standing up or lying down. The letters O, X, A, M, V, C and B have symmetry. The letters G, P, J and R do not. The word MOM has symmetry: the Mira goes standing up, in the middle of the O.";

const DIVERSIDADE=[
 ["\u{27A1}\u{FE0F}","Slide","<b>deslizar</b>: a figura anda para o lugar de perto, sem virar e sem girar.",""],
 ["\u{1FA9E}","Flip","<b>virar</b>: a figura vira como no espelho — a gente vê a imagem espelhada.",""],
 ["\u{1F503}","Turn","<b>girar</b>: a figura roda em volta de um pontinho, como o ponteiro do relógio.",""],
 ["\u{1F9F5}","Repeating pattern","um pedacinho que se repete de novo e de novo, sempre na mesma ordem. Dá para fazer com <b>uma figura só</b>.",""],
 ["\u{1F512}","O que NÃO muda","o número de lados, o número de vértices, o tamanho e o nome da figura.","a figura continua a mesma"],
 ["\u{2728}","O que PODE mudar","onde a figura está e para que lado ela aponta.",""],
 ["\u{1F9E9}","O quilt","a colcha é uma grade 3 por 3, blocos de 1 a 9. Do bloco 1, descendo dois, indo um à direita, subindo um e indo um à esquerda: chega-se no <b>bloco 4</b>.",""]
];
const DIVERSIDADE_say="Slide means the figure walks to the next spot. Flip means it shows its mirror image. Turn means it spins around a point. In a repeating pattern the same little piece comes again and again. The number of sides, the number of vertices, the size and the name of the figure never change. Only where it is and which way it faces can change.";

const REGIOES=[
 {k:'Circle',    pt:'Círculo',   co:C_OBJ, emo:"\u{2B55}", lados:"nenhum lado reto — é redondo", vert:"0 vertices", spot:"round, with no corners", obj:"a coin, a plate, a wheel, a clock face"},
 {k:'Triangle',  pt:'Triângulo', co:'#fb923c', emo:"\u{1F53A}", lados:"3 sides", vert:"3 vertices", spot:"3 straight sides", obj:"a slice of pizza, a party hat"},
 {k:'Square',    pt:'Quadrado',  co:C_LAD, emo:"\u{1F7E9}", lados:"4 sides", vert:"4 vertices", spot:"4 sides, all the same length", obj:"a chessboard square, a window pane"},
 {k:'Rectangle', pt:'Retângulo', co:'#60a5fa', emo:"\u{1F7E6}", lados:"4 sides", vert:"4 vertices", spot:"2 long sides and 2 short sides", obj:"a book cover, a door"},
 {k:'Pentagon',  pt:'Pentágono', co:C_SIM, emo:"\u{2B50}", lados:"5 sides", vert:"5 vertices", spot:"penta = 5", obj:"the black patch on a soccer ball"},
 {k:'Hexagon',   pt:'Hexágono',  co:C_FIG, emo:"\u{1F41D}", lados:"6 sides", vert:"6 vertices", spot:"hexa = 6", obj:"a honeycomb cell"},
 {k:'Octagon',   pt:'Octógono',  co:C_PAD, emo:"\u{1F6D1}", lados:"8 sides", vert:"8 vertices", spot:"octo = 8, like an octopus", obj:"a stop sign"}
];
const REGIOES_say="Circle: no straight sides, zero vertices. Triangle: three sides, three vertices. Square: four sides all the same length, four vertices. Rectangle: four sides, two long and two short, four vertices. Pentagon: five sides, five vertices. Hexagon: six sides, six vertices. Octagon: eight sides, eight vertices.";

const DICAS=[
 ["\u{1F4CD}","<b>Side</b> é o lado (a linha reta). <b>Vertex</b> é o vértice (o cantinho). Ler a pergunta até o fim: “how many <b>sides</b>?” é diferente de “how many <b>vertices</b>?”.","a pegadinha número 1"],
 ["\u{1F511}","Numa figura de lados retos, <b>lados = vértices</b>. Sabendo um, você já sabe o outro.",""],
 ["\u{2B55}","O <b>circle</b> tem <b>0 vértices</b>. É a única figura assim.",""],
 ["\u{1F4CF}","A <b>line of symmetry</b> pode ser <b>deitada</b>! Quem só procura a linha em pé erra o <b>C</b> e o <b>B</b>.","a pegadinha número 2"],
 ["\u{1F419}","<b>penta</b> = 5 · <b>hexa</b> = 6 · <b>octo</b> = 8, como o <b>octopus</b>.",""],
 ["\u{1F7E9}","<b>Square</b> e <b>rectangle</b> têm os dois 4 lados e 4 vértices. O que muda: no <b>square</b> os 4 lados são iguais.",""],
 ["\u{1F504}","<b>Flip</b> é espelho. <b>Turn</b> é girar, como o relógio. Em português a gente diz “virar” para os dois — em inglês, não.","a pegadinha número 3"],
 ["\u{1F517}","<b>Edge</b> quer dizer <b>side</b>. Se a pergunta falar em edge, é o lado.",""]
];

const FAQ=[
 ["What is a side?","One straight line of the figure. — É cada linha reta da figura."],
 ["What is a vertex?","The corner where two sides meet. — O cantinho onde dois lados se encontram."],
 ["How many sides does a triangle have?","Three. — Três."],
 ["How many vertices does a triangle have?","Three. — Três."],
 ["How many sides does a hexagon have?","Six. — Seis."],
 ["How many sides does an octagon have?","Eight. — Oito."],
 ["How many vertices does a circle have?","Zero. — Nenhum."],
 ["What is the difference between a square and a rectangle?","In a square all four sides are the same length; a rectangle has 2 long and 2 short sides."],
 ["What does a stop sign look like?","An octagon. — Um octógono."],
 ["What does a honeycomb cell look like?","A hexagon. — Um hexágono."],
 ["When does a figure have symmetry?","When you fold it and the two halves match."],
 ["Which letters have symmetry?","O, X, A, M, V, C and B. G, P, J and R do not."],
 ["Where do you put the Mira on MOM?","Standing up, in the middle of the O."],
 ["What is a slide, a flip and a turn?","Slide = it walks · Flip = mirror image · Turn = it spins around a point."],
 ["When a figure turns, what stays the same?","The number of sides, the number of vertices, the size and the name."]
];
