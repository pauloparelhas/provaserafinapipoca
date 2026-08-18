/* ---- MULTIPLA ESCOLHA ---- opts:[texto EN, correta?1:0, traducao PT] ---- */
const MC = [
 /* ===== AS FIGURAS E SEUS NOMES ===== */
 {th:'figuras',fig:"\u{1F7E1}",en:"Which figure is round and has <b>no corners</b>?",pt:"Que figura é redonda e não tem nenhum cantinho?",opts:[["Circle",1,"Círculo"],["Triangle",0,"Triângulo"],["Square",0,"Quadrado"]]},
 {th:'figuras',fig:"\u{1F53A}",en:"A figure with <b>3 straight sides</b> is a…",pt:"Uma figura com 3 lados retos é um…",opts:[["Triangle",1,"Triângulo"],["Rectangle",0,"Retângulo"],["Pentagon",0,"Pentágono"]]},
 {th:'figuras',fig:"\u{1F7E9}",en:"A figure with <b>4 sides all the same length</b> is a…",pt:"Uma figura com 4 lados todos do mesmo tamanho é um…",opts:[["Square",1,"Quadrado"],["Rectangle",0,"Retângulo"],["Hexagon",0,"Hexágono"]]},
 {th:'figuras',fig:"\u{1F7E6}",en:"A figure with <b>2 long sides and 2 short sides</b> is a…",pt:"Uma figura com 2 lados compridos e 2 curtinhos é um…",opts:[["Rectangle",1,"Retângulo"],["Square",0,"Quadrado"],["Triangle",0,"Triângulo"]]},
 {th:'figuras',fig:"\u{2B50}",en:"What is the name of a figure with <b>5 sides</b>?",pt:"Qual é o nome de uma figura com 5 lados?",opts:[["Pentagon",1,"Pentágono"],["Hexagon",0,"Hexágono"],["Octagon",0,"Octógono"]]},
 {th:'figuras',fig:"\u{1F41D}",en:"What is the name of a figure with <b>6 sides</b>?",pt:"Qual é o nome de uma figura com 6 lados?",opts:[["Hexagon",1,"Hexágono"],["Pentagon",0,"Pentágono"],["Octagon",0,"Octógono"]]},
 {th:'figuras',fig:"\u{1F6D1}",en:"What is the name of a figure with <b>8 sides</b>?",pt:"Qual é o nome de uma figura com 8 lados?",opts:[["Octagon",1,"Octógono"],["Hexagon",0,"Hexágono"],["Pentagon",0,"Pentágono"]]},
 {th:'figuras',fig:"\u{1F4C4}",en:"A <b>2-D figure</b> is a figure that is…",pt:"Uma figura 2-D é uma figura que é…",opts:[["Flat — you can draw it on paper",1,"Plana — dá para desenhar no papel"],["Round like a ball",0,"Redonda como uma bola"],["Made of wood",0,"Feita de madeira"]]},
 {th:'figuras',fig:"\u{1F419}",en:"The word <b>octagon</b> starts like <b>octopus</b>. How many sides does it have?",pt:"A palavra octagon começa como octopus (polvo). Quantos lados ela tem?",opts:[["8",1,"oito, como os braços do polvo"],["5",0,""],["6",0,""]]},
 {th:'figuras',fig:"\u{1F7E8}",en:"Which figure has <b>3 vertices</b>?",pt:"Que figura tem 3 vértices?",opts:[["Triangle",1,"Triângulo"],["Square",0,"Quadrado"],["Circle",0,"Círculo"]]},
 {th:'figuras',fig:"\u{1F535}",en:"Which figure has <b>no straight sides</b>?",pt:"Que figura não tem nenhum lado reto?",opts:[["Circle",1,"Círculo"],["Pentagon",0,"Pentágono"],["Rectangle",0,"Retângulo"]]},
 {th:'figuras',fig:"\u{1F7EA}",en:"A <b>square</b> and a <b>rectangle</b> both have…",pt:"O quadrado e o retângulo têm os dois…",opts:[["4 sides and 4 vertices",1,"4 lados e 4 vértices"],["3 sides and 3 vertices",0,"3 lados e 3 vértices"],["No vertices at all",0,"Nenhum vértice"]]},

 /* ===== LADOS E VERTICES ===== */
 {th:'lados',fig:"\u{1F4CF}",en:"A <b>side</b> is…",pt:"Um lado (side) é…",opts:[["One straight line of the figure",1,"Cada linha reta da figura"],["The colour of the figure",0,"A cor da figura"],["The name of the figure",0,"O nome da figura"]]},
 {th:'lados',fig:"\u{1F4CD}",en:"A <b>vertex</b> is…",pt:"Um vértice (vertex) é…",opts:[["The corner where two sides meet",1,"O cantinho onde dois lados se encontram"],["The middle of the figure",0,"O meio da figura"],["A curved line",0,"Uma linha curva"]]},
 {th:'lados',fig:"\u{1F524}",en:"What is the plural of <b>vertex</b>?",pt:"Qual é o plural de vertex?",opts:[["Vertices",1,"Vértices"],["Vertexes",0,"não existe"],["Verticals",0,""]]},
 {th:'lados',fig:"\u{1F53A}",en:"How many <b>vertices</b> does a triangle have?",pt:"Quantos vértices tem um triângulo?",opts:[["3",1,"três"],["4",0,""],["0",0,""]]},
 {th:'lados',fig:"\u{2B55}",en:"How many <b>vertices</b> does a circle have?",pt:"Quantos vértices tem um círculo?",opts:[["0",1,"nenhum: ele não tem cantinho"],["1",0,""],["4",0,""]]},
 {th:'lados',fig:"\u{1F41D}",en:"How many <b>vertices</b> does a hexagon have?",pt:"Quantos vértices tem um hexágono?",opts:[["6",1,"seis"],["5",0,""],["8",0,""]]},
 {th:'lados',fig:"\u{1F6D1}",en:"How many <b>sides</b> does an octagon have?",pt:"Quantos lados tem um octógono?",opts:[["8",1,"oito"],["6",0,""],["5",0,""]]},
 {th:'lados',fig:"\u{2B50}",en:"How many <b>vertices</b> does a pentagon have?",pt:"Quantos vértices tem um pentágono?",opts:[["5",1,"cinco"],["4",0,""],["6",0,""]]},
 {th:'lados',fig:"\u{1F511}",en:"In a figure with <b>straight sides</b>, the number of vertices is…",pt:"Numa figura de lados retos, o número de vértices é…",opts:[["The same as the number of sides",1,"O mesmo que o número de lados"],["Always one more than the sides",0,"Sempre um a mais que os lados"],["Always zero",0,"Sempre zero"]]},
 {th:'lados',fig:"\u{1F517}",en:"The word <b>edge</b> means the same as…",pt:"A palavra edge quer dizer o mesmo que…",opts:[["Side",1,"Lado"],["Vertex",0,"Vértice"],["Colour",0,"Cor"]]},
 {th:'lados',fig:"\u{1F45C}",en:"3 figures are in a bag. Together they have <b>13 sides</b>. Which group can it be?",pt:"3 figuras num saquinho, 13 lados no total. Qual grupo pode ser?",opts:[["Triangle + square + hexagon",1,"3 + 4 + 6 = 13"],["Triangle + square + square",0,"3 + 4 + 4 = 11"],["Circle + square + triangle",0,""]]},
 {th:'lados',fig:"\u{1F45C}",en:"3 figures are in a bag. Together they have <b>12 vertices</b>. Which group can it be?",pt:"3 figuras num saquinho, 12 vértices no total. Qual grupo pode ser?",opts:[["Square + square + square",1,"4 + 4 + 4 = 12"],["Triangle + triangle + triangle",0,"3 + 3 + 3 = 9"],["Pentagon + pentagon + pentagon",0,"5 + 5 + 5 = 15"]]},
 {th:'lados',fig:"\u{1F45C}",en:"Which group has <b>12 vertices</b> in total?",pt:"Qual grupo tem 12 vértices no total?",opts:[["Triangle + triangle + hexagon",1,"3 + 3 + 6 = 12"],["Triangle + square + square",0,"3 + 4 + 4 = 11"],["Square + hexagon + hexagon",0,"4 + 6 + 6 = 16"]]},
 {th:'lados',fig:"\u{2795}",en:"A triangle and a square together have how many <b>sides</b>?",pt:"Um triângulo e um quadrado juntos têm quantos lados?",opts:[["7",1,"3 + 4 = 7"],["6",0,""],["8",0,""]]},
 {th:'lados',fig:"\u{2795}",en:"Two triangles together have how many <b>vertices</b>?",pt:"Dois triângulos juntos têm quantos vértices?",opts:[["6",1,"3 + 3 = 6"],["3",0,""],["9",0,""]]},
 {th:'lados',fig:"\u{2795}",en:"A pentagon and a hexagon together have how many <b>sides</b>?",pt:"Um pentágono e um hexágono juntos têm quantos lados?",opts:[["11",1,"5 + 6 = 11"],["10",0,""],["12",0,""]]},

 /* ===== FIGURAS NOS OBJETOS DO DIA A DIA ===== */
 {th:'objetos',fig:"\u{1F4D5}",en:"A <b>book cover</b> looks like a…",pt:"A capa de um livro parece um…",opts:[["Rectangle",1,"Retângulo"],["Circle",0,"Círculo"],["Triangle",0,"Triângulo"]]},
 {th:'objetos',fig:"\u{1F6D1}",en:"A <b>stop sign</b> looks like a…",pt:"Uma placa de PARE parece um…",opts:[["Octagon",1,"Octógono"],["Hexagon",0,"Hexágono"],["Square",0,"Quadrado"]]},
 {th:'objetos',fig:"\u{1F36F}",en:"A <b>honeycomb cell</b> looks like a…",pt:"Um favo de mel parece um…",opts:[["Hexagon",1,"Hexágono"],["Octagon",0,"Octógono"],["Pentagon",0,"Pentágono"]]},
 {th:'objetos',fig:"\u{1F355}",en:"A <b>slice of pizza</b> looks like a…",pt:"Uma fatia de pizza parece um…",opts:[["Triangle",1,"Triângulo"],["Rectangle",0,"Retângulo"],["Circle",0,"Círculo"]]},
 {th:'objetos',fig:"\u{1FA99}",en:"A <b>coin</b> looks like a…",pt:"Uma moeda parece um…",opts:[["Circle",1,"Círculo"],["Square",0,"Quadrado"],["Pentagon",0,"Pentágono"]]},
 {th:'objetos',fig:"\u{1F6AA}",en:"A <b>door</b> looks like a…",pt:"Uma porta parece um…",opts:[["Rectangle",1,"Retângulo"],["Triangle",0,"Triângulo"],["Circle",0,"Círculo"]]},
 {th:'objetos',fig:"\u{1F37D}\u{FE0F}",en:"Which object looks like a <b>circle</b>?",pt:"Que objeto parece um círculo?",opts:[["A plate",1,"Um prato"],["A book cover",0,"A capa de um livro"],["A party hat",0,"Um chapéu de festa"]]},
 {th:'objetos',fig:"\u{1F389}",en:"Which object looks like a <b>triangle</b>?",pt:"Que objeto parece um triângulo?",opts:[["A party hat",1,"Um chapéu de festa"],["A wheel",0,"Uma roda"],["A door",0,"Uma porta"]]},
 {th:'objetos',fig:"\u{1F553}",en:"A <b>clock face</b> on the wall looks like a…",pt:"Um relógio de parede parece um…",opts:[["Circle",1,"Círculo"],["Hexagon",0,"Hexágono"],["Rectangle",0,"Retângulo"]]},
 {th:'objetos',fig:"\u{26A1}",en:"A <b>wheel</b> looks like a figure with how many <b>vertices</b>?",pt:"Uma roda parece uma figura com quantos vértices?",opts:[["0",1,"nenhum: é um círculo"],["4",0,""],["3",0,""]]},

 /* ===== SIMETRIA ===== */
 {th:'simetria',fig:"\u{1FA9E}",en:"A figure has <b>symmetry</b> when…",pt:"Uma figura tem simetria quando…",opts:[["You can fold it and the two halves match",1,"Dá para dobrar e as duas metades combinam"],["It has a lot of colours",0,"Ela tem muitas cores"],["It is very big",0,"Ela é bem grande"]]},
 {th:'simetria',fig:"\u{2702}\u{FE0F}",en:"The fold line of a symmetrical figure is called the…",pt:"A linha da dobra de uma figura simétrica se chama…",opts:[["Line of symmetry",1,"Linha de simetria"],["Line of numbers",0,"Linha dos números"],["Side",0,"Lado"]]},
 {th:'simetria',fig:"\u{1F5BC}\u{FE0F}",en:"The half that is missing in a symmetrical figure is its…",pt:"A metade que falta numa figura simétrica é a…",opts:[["Matching part — the mirror image",1,"A metade que combina — a imagem no espelho"],["Biggest side",0,"O maior lado"],["Number of vertices",0,"O número de vértices"]]},
 {th:'simetria',fig:"\u{1F534}",en:"What do we use a <b>Mira</b> for?",pt:"Para que serve a Mira?",opts:[["To check if a figure has symmetry",1,"Para conferir se a figura tem simetria"],["To measure how long a side is",0,"Para medir o tamanho do lado"],["To count the vertices",0,"Para contar os vértices"]]},
 {th:'simetria',fig:"\u{1F4CF}",en:"A line of symmetry can be…",pt:"A linha de simetria pode ser…",opts:[["Standing up OR lying down",1,"Em pé OU deitada"],["Only standing up",0,"Só em pé"],["Only lying down",0,"Só deitada"]]},
 {th:'simetria',fig:"\u{1F170}\u{FE0F}",en:"Which letter has a <b>line of symmetry</b>?",pt:"Que letra tem linha de simetria?",opts:[["X",1,"em pé e deitada"],["J",0,"não tem"],["P",0,"não tem"]]},
 {th:'simetria',fig:"\u{1F171}\u{FE0F}",en:"Which letter has <b>no</b> line of symmetry?",pt:"Que letra NÃO tem linha de simetria?",opts:[["R",1,"não tem"],["A",0,"tem, em pé"],["M",0,"tem, em pé"]]},
 {th:'simetria',fig:"\u{1F17E}\u{FE0F}",en:"The letter <b>O</b> has…",pt:"A letra O tem…",opts:[["More than one line of symmetry",1,"Mais de uma linha de simetria"],["No line of symmetry",0,"Nenhuma linha de simetria"],["Only a lying-down line",0,"Só a linha deitada"]]},
 {th:'simetria',fig:"\u{00A9}",en:"The letter <b>C</b> has a line of symmetry that is…",pt:"A letra C tem uma linha de simetria que é…",opts:[["Lying down",1,"Deitada"],["Standing up",0,"Em pé"],["It has none",0,"Ela não tem nenhuma"]]},
 {th:'simetria',fig:"\u{1F469}",en:"Where do you put the Mira on the word <b>MOM</b>?",pt:"Onde se põe a Mira na palavra MOM?",opts:[["Standing up, in the middle of the O",1,"Em pé, no meio do O"],["Lying down, under the word",0,"Deitada, embaixo da palavra"],["At the end, after the last M",0,"No fim, depois do último M"]]},
 {th:'simetria',fig:"\u{1F4AC}",en:"Which word shows <b>symmetry</b>?",pt:"Que palavra tem simetria?",opts:[["WOW",1,"como MOM"],["CAT",0,""],["DOG",0,""]]},
 {th:'simetria',fig:"\u{1F5D2}\u{FE0F}",en:"You drew half of a figure. To finish it with symmetry you draw…",pt:"Você desenhou metade de uma figura. Para terminar com simetria você desenha…",opts:[["The matching part, like a mirror",1,"A metade que combina, como num espelho"],["Any figure you like",0,"Qualquer figura que quiser"],["A bigger half",0,"Uma metade maior"]]},

 /* ===== PADROES: SLIDE, FLIP, TURN ===== */
 {th:'padroes',fig:"\u{27A1}\u{FE0F}",en:"Which move makes the figure <b>walk</b> to the next spot without spinning?",pt:"Que movimento faz a figura andar para o lugar de perto sem rodar?",opts:[["Slide",1,"Deslizar"],["Flip",0,"Virar"],["Turn",0,"Girar"]]},
 {th:'padroes',fig:"\u{1FA9E}",en:"Which move shows the <b>mirror image</b> of the figure?",pt:"Que movimento mostra a imagem da figura no espelho?",opts:[["Flip",1,"Virar"],["Slide",0,"Deslizar"],["Turn",0,"Girar"]]},
 {th:'padroes',fig:"\u{1F503}",en:"Which move makes the figure <b>spin around a point</b>?",pt:"Que movimento faz a figura rodar em volta de um pontinho?",opts:[["Turn",1,"Girar"],["Slide",0,"Deslizar"],["Flip",0,"Virar"]]},
 {th:'padroes',fig:"\u{1F53A}",en:"A triangle <b>turns</b>. How many sides does it have now?",pt:"Um triângulo gira. Quantos lados ele tem agora?",opts:[["Still 3",1,"Ainda 3 — o movimento não muda a figura"],["Now 4",0,""],["Now 0",0,""]]},
 {th:'padroes',fig:"\u{1F504}",en:"When a figure slides, flips or turns, what <b>changes</b>?",pt:"Quando a figura desliza, vira ou gira, o que muda?",opts:[["Where it is and which way it faces",1,"O lugar dela e o lado para onde aponta"],["The number of sides",0,"O número de lados"],["The name of the figure",0,"O nome da figura"]]},
 {th:'padroes',fig:"\u{1F9F5}",en:"In a <b>repeating pattern</b>, the little piece that comes again and again is the…",pt:"Num padrão que se repete, o pedacinho que vem de novo e de novo é o…",opts:[["Core",1,"O núcleo — o pedacinho que repete"],["Vertex",0,"Vértice"],["Mirror",0,"Espelho"]]},
 {th:'padroes',fig:"\u{1F9F6}",en:"To draw the quilt border pattern, how many <b>different figures</b> do you need?",pt:"Para desenhar o padrão da borda da colcha, de quantas figuras diferentes você precisa?",opts:[["Just one — you slide, flip or turn it",1,"Uma só — é ela que desliza, vira ou gira"],["Three different ones",0,"Três diferentes"],["One for each block",0,"Uma para cada bloco"]]},
 {th:'padroes',fig:"\u{1F9E9}",en:"The quilt is a grid with how many <b>blocks</b>?",pt:"A colcha é uma grade com quantos blocos?",opts:[["9 blocks, 3 by 3",1,"9 blocos, 3 por 3"],["6 blocks, 2 by 3",0,""],["4 blocks, 2 by 2",0,""]]},
 {th:'padroes',fig:"\u{2B07}\u{FE0F}",en:"Start in <b>Block 1</b> and go straight <b>down two blocks</b>. Which block are you in?",pt:"Comece no bloco 1 e desça dois blocos. Em que bloco você está?",opts:[["Block 7",1,"1 → 4 → 7"],["Block 3",0,""],["Block 2",0,""]]},
 {th:'padroes',fig:"\u{2B50}",en:"In the quilt, drawing a <b>triangle on each edge of the pentagon</b> makes a design that looks like a…",pt:"Na colcha, desenhar um triângulo em cada lado do pentágono faz um desenho que parece uma…",opts:[["Star",1,"Estrela"],["Circle",0,"Círculo"],["Door",0,"Porta"]]},

 /* ===== AS PALAVRAS EM INGLES ===== */
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Side</b> em português é…",pt:"",opts:[["Lado",1,""],["Cantinho",0,"isso é corner"],["Metade",0,"isso é half"]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Vertex</b> em português é…",pt:"",opts:[["Vértice (o cantinho)",1,""],["Lado",0,"isso é side"],["Padrão",0,"isso é pattern"]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Symmetry</b> em português é…",pt:"",opts:[["Simetria",1,""],["Simpatia",0,""],["Semelhança",0,""]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Flip</b> em português é…",pt:"",opts:[["Virar, como no espelho",1,""],["Deslizar",0,"isso é slide"],["Girar",0,"isso é turn"]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Turn</b> em português é…",pt:"",opts:[["Girar, como o ponteiro do relógio",1,""],["Virar no espelho",0,"isso é flip"],["Andar para o lado",0,"isso é slide"]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Slide</b> em português é…",pt:"",opts:[["Deslizar, andar para o lado",1,""],["Girar",0,"isso é turn"],["Dobrar",0,"isso é fold"]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Figure</b>, na aula de matemática, é…",pt:"",opts:[["Figura geométrica",1,""],["Pessoa de um livro",0,""],["Número",0,""]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Matching part</b> em português é…",pt:"",opts:[["A metade que combina",1,""],["O maior lado",0,""],["O nome da figura",0,""]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>How many sides?</b> quer dizer…",pt:"",opts:[["Quantos lados?",1,""],["Quantos vértices?",0,"isso é how many vertices"],["De que cor?",0,""]]},
 {th:'palavras',fig:"\u{1F4D6}",en:"<b>Sort the figures</b> quer dizer…",pt:"",opts:[["Separe as figuras em grupos",1,""],["Desenhe as figuras",0,""],["Conte as figuras",0,""]]}
];

/* ---- VERDADEIRO OU FALSO ---- */
const VF = [
 {th:'figuras',fig:"\u{2B55}",en:"A <b>circle</b> has no corners.",pt:"O círculo não tem nenhum cantinho.",ans:true},
 {th:'figuras',fig:"\u{1F7E9}",en:"All four sides of a <b>square</b> are the same length.",pt:"Os quatro lados do quadrado são todos do mesmo tamanho.",ans:true},
 {th:'figuras',fig:"\u{1F53A}",en:"A <b>triangle</b> has 4 sides.",pt:"O triângulo tem 4 lados.",ans:false},
 {th:'figuras',fig:"\u{1F6D1}",en:"An <b>octagon</b> has 8 sides.",pt:"O octógono tem 8 lados.",ans:true},
 {th:'figuras',fig:"\u{2B50}",en:"A <b>pentagon</b> has 6 sides.",pt:"O pentágono tem 6 lados.",ans:false},
 {th:'figuras',fig:"\u{1F4C4}",en:"A <b>2-D figure</b> is flat.",pt:"Uma figura 2-D é plana.",ans:true},

 {th:'lados',fig:"\u{1F4CD}",en:"A <b>vertex</b> is the corner where two sides meet.",pt:"O vértice é o cantinho onde dois lados se encontram.",ans:true},
 {th:'lados',fig:"\u{1F511}",en:"A <b>hexagon</b> has 6 sides and 6 vertices.",pt:"O hexágono tem 6 lados e 6 vértices.",ans:true},
 {th:'lados',fig:"\u{2B55}",en:"A <b>circle</b> has 4 vertices.",pt:"O círculo tem 4 vértices.",ans:false},
 {th:'lados',fig:"\u{1F517}",en:"The word <b>edge</b> means the same as <b>side</b>.",pt:"A palavra edge quer dizer o mesmo que side (lado).",ans:true},
 {th:'lados',fig:"\u{2795}",en:"A square and a triangle together have <b>7 sides</b>.",pt:"Um quadrado e um triângulo juntos têm 7 lados.",ans:true},
 {th:'lados',fig:"\u{1F524}",en:"The plural of <b>vertex</b> is <b>vertexes</b>.",pt:"O plural de vertex é vertexes.",ans:false},

 {th:'objetos',fig:"\u{1F4D5}",en:"A <b>book cover</b> looks like a rectangle.",pt:"A capa de um livro parece um retângulo.",ans:true},
 {th:'objetos',fig:"\u{1F6D1}",en:"A <b>stop sign</b> looks like a hexagon.",pt:"Uma placa de PARE parece um hexágono.",ans:false},
 {th:'objetos',fig:"\u{1F36F}",en:"A <b>honeycomb cell</b> looks like a hexagon.",pt:"Um favo de mel parece um hexágono.",ans:true},
 {th:'objetos',fig:"\u{1FA99}",en:"A <b>coin</b> looks like a circle.",pt:"Uma moeda parece um círculo.",ans:true},

 {th:'simetria',fig:"\u{1FA9E}",en:"A figure has <b>symmetry</b> when the two halves match.",pt:"Uma figura tem simetria quando as duas metades combinam.",ans:true},
 {th:'simetria',fig:"\u{1F4CF}",en:"A line of symmetry can <b>only</b> be standing up.",pt:"A linha de simetria só pode ser em pé.",ans:false},
 {th:'simetria',fig:"\u{1F17E}\u{FE0F}",en:"The letter <b>O</b> has symmetry.",pt:"A letra O tem simetria.",ans:true},
 {th:'simetria',fig:"\u{1F171}\u{FE0F}",en:"The letter <b>R</b> has symmetry.",pt:"A letra R tem simetria.",ans:false},
 {th:'simetria',fig:"\u{1F469}",en:"The word <b>MOM</b> has symmetry.",pt:"A palavra MOM tem simetria.",ans:true},
 {th:'simetria',fig:"\u{00A9}",en:"The letter <b>C</b> has a line of symmetry lying down.",pt:"A letra C tem uma linha de simetria deitada.",ans:true},

 {th:'padroes',fig:"\u{27A1}\u{FE0F}",en:"When a figure <b>slides</b>, it spins around.",pt:"Quando a figura desliza, ela roda.",ans:false},
 {th:'padroes',fig:"\u{1F53A}",en:"A triangle that <b>turns</b> is still a triangle.",pt:"Um triângulo que gira continua sendo um triângulo.",ans:true},
 {th:'padroes',fig:"\u{1F9F5}",en:"You can make a repeating pattern using <b>just one figure</b>.",pt:"Dá para fazer um padrão que se repete usando uma figura só.",ans:true},
 {th:'padroes',fig:"\u{1F9E9}",en:"The <b>quilt</b> in the lesson is a grid of 3 by 3 blocks.",pt:"A colcha da lição é uma grade de 3 por 3 blocos.",ans:true}
];

/* ---- COMPLETAR ---- */
const FILL = [
 {th:'figuras',pre:"A triangle has three",post:".",ans:"sides",bank:["circles","corners of the room"],pt:"O triângulo tem três lados."},
 {th:'figuras',pre:"A figure with five sides is a",post:".",ans:"pentagon",bank:["hexagon","octagon"],pt:"Penta quer dizer cinco."},
 {th:'figuras',pre:"A figure with six sides is a",post:".",ans:"hexagon",bank:["pentagon","octagon"],pt:"Hexa quer dizer seis."},
 {th:'figuras',pre:"A figure with eight sides is an",post:".",ans:"octagon",bank:["hexagon","pentagon"],pt:"Octo quer dizer oito, como o octopus."},
 {th:'figuras',pre:"A 2-D figure is",post:": you can draw it on paper.",ans:"flat",bank:["round","heavy"],pt:"Flat quer dizer plana."},
 {th:'lados',pre:"The corner where two sides meet is a",post:".",ans:"vertex",bank:["side","circle"],pt:"Vértice é o cantinho."},
 {th:'lados',pre:"A circle has",post:"vertices.",ans:"zero",bank:["four","three"],pt:"O círculo não tem cantinho nenhum."},
 {th:'lados',pre:"A square has four sides and four",post:".",ans:"vertices",bank:["circles","halves"],pt:"Vertices é o plural de vertex."},
 {th:'lados',pre:"Another word for side is",post:".",ans:"edge",bank:["corner","half"],pt:"Edge = lado."},
 {th:'objetos',pre:"A stop sign looks like an",post:".",ans:"octagon",bank:["hexagon","circle"],pt:""},
 {th:'objetos',pre:"A plate looks like a",post:".",ans:"circle",bank:["square","triangle"],pt:""},
 {th:'objetos',pre:"A door looks like a",post:".",ans:"rectangle",bank:["triangle","hexagon"],pt:""},
 {th:'simetria',pre:"The fold line of a symmetrical figure is the line of",post:".",ans:"symmetry",bank:["numbers","colours"],pt:""},
 {th:'simetria',pre:"The missing half is the",post:"image, like in a mirror.",ans:"mirror",bank:["biggest","smallest"],pt:""},
 {th:'simetria',pre:"We use a",post:"to check if a figure has symmetry.",ans:"Mira",bank:["ruler","pencil"],pt:"A Mira é o espelhinho vermelho."},
 {th:'simetria',pre:"A line of symmetry can be standing up or",post:".",ans:"lying down",bank:["invisible","coloured"],pt:""},
 {th:'padroes',pre:"When a figure just walks to the next spot, it is a",post:".",ans:"slide",bank:["flip","turn"],pt:""},
 {th:'padroes',pre:"When a figure shows its mirror image, it is a",post:".",ans:"flip",bank:["slide","turn"],pt:""},
 {th:'padroes',pre:"When a figure spins around a point, it is a",post:".",ans:"turn",bank:["slide","flip"],pt:""},
 {th:'padroes',pre:"A pattern that comes again and again is a",post:"pattern.",ans:"repeating",bank:["broken","silent"],pt:""}
];
/* dicas dos chips de palavra (traducao PT de cada palavra do banco) */
const WPT={"sides":"lados","vertex":"vértice","vertices":"vértices","edge":"lado","flat":"plana",
"pentagon":"pentágono","hexagon":"hexágono","octagon":"octógono","circle":"círculo","square":"quadrado",
"rectangle":"retângulo","triangle":"triângulo","zero":"zero","symmetry":"simetria","mirror":"espelho",
"Mira":"o espelhinho","lying down":"deitada","slide":"deslizar","flip":"virar","turn":"girar",
"repeating":"que se repete","corners of the room":"cantos da sala","circles":"círculos","halves":"metades"};

/* ---- LIGAR ---- cats:[[texto,traducao]], items:[[texto,traducao,catIdx]] ---- */
const MATCH = [
 {th:'figuras',t:"Match each figure to its number of sides.",tpt:"Ligue cada figura ao número de lados dela.",
  cats:[["3 sides","3 lados"],["5 sides","5 lados"],["8 sides","8 lados"]],
  items:[["\u{1F53A} Triangle","Triângulo",0],["\u{2B50} Pentagon","Pentágono",1],["\u{1F6D1} Octagon","Octógono",2]]},
 {th:'figuras',t:"Match each figure to its number of vertices.",tpt:"Ligue cada figura ao número de vértices dela.",
  cats:[["0 vertices","0 vértices"],["4 vertices","4 vértices"],["6 vertices","6 vértices"]],
  items:[["\u{2B55} Circle","Círculo",0],["\u{1F7E9} Square","Quadrado",1],["\u{1F41D} Hexagon","Hexágono",2]]},
 {th:'lados',t:"Match each word to what it means.",tpt:"Ligue cada palavra ao que ela quer dizer.",
  cats:[["Side","Lado"],["Vertex","Vértice"],["Edge","Lado (outra palavra)"]],
  items:[["One straight line of the figure","Cada linha reta da figura",0],["The corner where two sides meet","O cantinho onde dois lados se encontram",1],["Another word for side","Outra palavra para lado",2]]},
 {th:'objetos',t:"Match each object to its figure.",tpt:"Ligue cada objeto à figura dele.",
  cats:[["Rectangle","Retângulo"],["Circle","Círculo"],["Triangle","Triângulo"]],
  items:[["\u{1F4D5} Book cover","Capa de livro",0],["\u{1FA99} Coin","Moeda",1],["\u{1F355} Slice of pizza","Fatia de pizza",2]]},
 {th:'objetos',t:"Match each object to its figure.",tpt:"Ligue cada objeto à figura dele.",
  cats:[["Octagon","Octógono"],["Hexagon","Hexágono"],["Circle","Círculo"]],
  items:[["\u{1F6D1} Stop sign","Placa de PARE",0],["\u{1F36F} Honeycomb cell","Favo de mel",1],["\u{1F553} Clock face","Relógio de parede",2]]},
 {th:'simetria',t:"Match each letter to its line of symmetry.",tpt:"Ligue cada letra à linha de simetria dela.",
  cats:[["Standing up","Em pé"],["Lying down","Deitada"],["No symmetry","Não tem simetria"]],
  items:[["The letter A","A letra A",0],["The letter C","A letra C",1],["The letter J","A letra J",2]]},
 {th:'simetria',t:"Match each word to what it means.",tpt:"Ligue cada palavra ao que ela quer dizer.",
  cats:[["Symmetry","Simetria"],["Mirror image","Imagem no espelho"],["Mira","O espelhinho"]],
  items:[["The two halves match when you fold","As duas metades combinam quando se dobra",0],["What you see on the other side of the line","O que se vê do outro lado da linha",1],["The tool we use to check","A ferramenta que usamos para conferir",2]]},
 {th:'padroes',t:"Match each move to what it does.",tpt:"Ligue cada movimento ao que ele faz.",
  cats:[["Slide","Deslizar"],["Flip","Virar"],["Turn","Girar"]],
  items:[["It walks to the next spot","Anda para o lugar de perto",0],["It shows the mirror image","Mostra a imagem no espelho",1],["It spins around a point","Roda em volta de um pontinho",2]]}
];

/* ---- ORDENAR ---- itens ja na ordem CORRETA ---- */
const ORDER = [
 {th:'figuras',t:"Put the figures in order, from the fewest sides to the most.",tpt:"Coloque as figuras em ordem, da que tem menos lados para a que tem mais.",
  items:["\u{1F53A} Triangle — 3","\u{1F7E9} Square — 4","\u{2B50} Pentagon — 5","\u{1F41D} Hexagon — 6","\u{1F6D1} Octagon — 8"]},
 {th:'lados',t:"Put the figures in order, from the fewest vertices to the most.",tpt:"Coloque em ordem, da que tem menos vértices para a que tem mais.",
  items:["\u{2B55} Circle — 0","\u{1F53A} Triangle — 3","\u{1F7E6} Rectangle — 4","\u{2B50} Pentagon — 5","\u{1F41D} Hexagon — 6"]},
 {th:'simetria',t:"Put the steps in order: how to check symmetry with a Mira.",tpt:"Coloque em ordem: como conferir a simetria com a Mira.",
  items:["\u{1F440} Look at the figure","\u{1F4CF} Put the Mira on the line","\u{1FA9E} Look at the mirror image","\u{2705} See if the two halves match"]},
 {th:'padroes',t:"Put the blocks in order: the path in the quilt.",tpt:"Coloque os blocos em ordem: o caminho na colcha.",
  items:["\u{1F7E6} Start in block 1","\u{2B07}\u{FE0F} Go down two blocks: block 7","\u{27A1}\u{FE0F} Go one block right: block 8","\u{2B06}\u{FE0F} Go up one block: block 5","\u{2B05}\u{FE0F} Go one block left: block 4"]}
];

/* ---- RESPOSTA ABERTA ---- */
const OPEN = [
 {th:'lados',fig:"\u{1F4CD}",en:"What is the difference between a <b>side</b> and a <b>vertex</b>?",pt:"Qual é a diferença entre side e vertex?",men:"A side is one straight line of the figure. A vertex is the corner, where two sides meet.",menpt:"O lado é cada linha reta da figura. O vértice é o cantinho, onde dois lados se encontram."},
 {th:'lados',fig:"\u{1F511}",en:"How many <b>sides</b> and how many <b>vertices</b> does a hexagon have?",pt:"Quantos lados e quantos vértices tem um hexágono?",men:"Six sides and six vertices.",menpt:"Seis lados e seis vértices."},
 {th:'figuras',fig:"\u{2B55}",en:"Tell one thing that is special about the <b>circle</b>.",pt:"Diga uma coisa especial do círculo.",men:"It is round: it has no straight sides and no vertices at all.",menpt:"Ele é redondo: não tem lado reto nenhum nem nenhum vértice."},
 {th:'figuras',fig:"\u{1F7E9}",en:"How can you tell a <b>square</b> from a <b>rectangle</b>?",pt:"Como dá para saber se é quadrado ou retângulo?",men:"Both have 4 sides and 4 vertices, but in the square all four sides are the same length. The rectangle has 2 long sides and 2 short sides.",menpt:"Os dois têm 4 lados e 4 vértices, mas no quadrado os quatro lados são do mesmo tamanho. O retângulo tem 2 lados compridos e 2 curtinhos."},
 {th:'objetos',fig:"\u{1F441}\u{FE0F}",en:"Name <b>one thing in your house</b> that looks like a rectangle.",pt:"Diga uma coisa da sua casa que parece um retângulo.",men:"A door, a book cover, a table top, the TV screen.",menpt:"Uma porta, a capa de um livro, o tampo da mesa, a tela da TV."},
 {th:'objetos',fig:"\u{1F441}\u{FE0F}",en:"Name <b>one thing</b> that looks like a circle.",pt:"Diga uma coisa que parece um círculo.",men:"A plate, a coin, a wheel, a clock face.",menpt:"Um prato, uma moeda, uma roda, um relógio de parede."},
 {th:'simetria',fig:"\u{1FA9E}",en:"Explain what <b>symmetry</b> is.",pt:"Explique o que é simetria.",men:"A figure has symmetry when you can fold it on a line and the two halves match, like a mirror image.",menpt:"Uma figura tem simetria quando dá para dobrar numa linha e as duas metades combinam, como no espelho."},
 {th:'simetria',fig:"\u{1F520}",en:"Name <b>two letters</b> that have symmetry and <b>one</b> that does not.",pt:"Diga duas letras que têm simetria e uma que não tem.",men:"With symmetry: O, X, A, M, V, C, B. Without: G, P, J, R.",menpt:"Com simetria: O, X, A, M, V, C, B. Sem: G, P, J, R."},
 {th:'padroes',fig:"\u{1F504}",en:"What is the difference between a <b>flip</b> and a <b>turn</b>?",pt:"Qual é a diferença entre flip e turn?",men:"A flip shows the mirror image of the figure. A turn spins the figure around a point, like a clock hand.",menpt:"O flip mostra a imagem da figura no espelho. O turn faz a figura rodar em volta de um pontinho, como o ponteiro do relógio."},
 {th:'padroes',fig:"\u{1F9F5}",en:"When a figure slides, flips or turns, what <b>stays the same</b>?",pt:"Quando a figura desliza, vira ou gira, o que continua igual?",men:"The number of sides, the number of vertices, the size and the name of the figure. Only where it is and which way it faces can change.",menpt:"O número de lados, o número de vértices, o tamanho e o nome da figura. Só o lugar e o lado para onde ela aponta é que mudam."}
];

/* ================= TEMAS ================= */
const THEMES=[
 {k:'figuras',  en:'The figures',        pt:'os nomes das 7 figuras',      emo:'\u{1F53A}'},
 {k:'lados',    en:'Sides & vertices',   pt:'contar lados e vértices',     emo:'\u{1F4CD}'},
 {k:'objetos',  en:'Figures around us',  pt:'as figuras no dia a dia',     emo:'\u{1F441}\u{FE0F}'},
 {k:'simetria', en:'Symmetry',           pt:'simetria e a linha do espelho', emo:'\u{1FA9E}'},
 {k:'padroes',  en:'Slide, flip, turn',  pt:'padrões e a colcha',          emo:'\u{1F504}'},
 {k:'palavras', en:'The English words',  pt:'as palavras da unidade',      emo:'\u{1F4D6}'}
];
/* pesos — a AP1 diz que o eixo e figura, lados/vertices e simetria */
const TH_WEIGHT={figuras:20,lados:24,objetos:16,simetria:22,padroes:10,palavras:8};
