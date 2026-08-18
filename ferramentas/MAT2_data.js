/* ============================================================
   MAT2_data.js — banco UNICO de classificacao (Matematica 2tri)
   Unit 9 — "2-D Geometry and Patterning" (Pearson Math Makes Sense 2).
   Compartilhado por MAT2_dragdrop.html (Sort it!) e MAT2_popit.html
   (Pop it!). 1 fonte, 2 produtos.

   Materia em INGLES (a prova e em ingles): o campo `en` carrega o
   texto principal e o campo `pt` carrega a TRADUCAO, que aparece
   quando a crianca liga a bandeira BR. Mesmo contrato do CIE2_data.js.

   Conteudo 100% derivado de trabalho/2tri_matematica/_roteiro.md
   (9 paginas do caderno da Unit 9 postadas no Toddle). Nada inventado.

   Ambiguidades tratadas (roteiro, BLOCO 2): objeto que pode ser DUAS
   figuras (window, table, sheet of paper) NUNCA vira carta de resposta
   unica. Losango e trapezio aparecem desenhados na colcha mas nao sao
   NOMEADOS em nenhum insumo -> ficam fora do banco.
   ============================================================ */
const GAMES = [

 /* ---------- 1. cada figura pelo nome ---------- */
 { key:'figures', emo:"\u{1F4D0}",
   en:"Which figure is it?", pt:"Que figura é?",
   info:"Drag each clue to the figure it describes.",
   infopt:"Arraste cada pista para a figura que ela descreve.",
   tip:"Count the straight sides: 3 = triangle · 4 = square or rectangle · round with no corners = circle.",
   tippt:"Conte os lados retos: 3 = triângulo · 4 = quadrado ou retângulo · redondo e sem cantinhos = círculo.",
   cols:[
     {id:'triangle',  en:'Triangle',  pt:'Triângulo', emo:"\u{1F53A}", co:'#fb923c'},
     {id:'square',    en:'Square',    pt:'Quadrado',  emo:"\u{1F7E9}", co:'#34d399'},
     {id:'rectangle', en:'Rectangle', pt:'Retângulo', emo:"\u{1F7E6}", co:'#60a5fa'},
     {id:'circle',    en:'Circle',    pt:'Círculo',   emo:"\u{1F7E1}", co:'#fbbf24'}
   ],
   cards:[
     {en:"3 straight sides",              pt:"3 lados retos",                    col:'triangle'},
     {en:"3 vertices",                    pt:"3 vértices",                       col:'triangle'},
     {en:"A slice of pizza",              pt:"Uma fatia de pizza",               col:'triangle'},
     {en:"A party hat",                   pt:"Um chapéu de festa",               col:'triangle'},
     {en:"4 sides, all the same length",  pt:"4 lados, todos do mesmo tamanho",  col:'square'},
     {en:"Every side is equal",           pt:"Todos os lados são iguais",        col:'square'},
     {en:"2 long sides and 2 short sides",pt:"2 lados compridos e 2 curtinhos",  col:'rectangle'},
     {en:"A book cover",                  pt:"A capa de um livro",               col:'rectangle'},
     {en:"A door",                        pt:"Uma porta",                        col:'rectangle'},
     {en:"Round, with no corners",        pt:"Redondo, sem nenhum cantinho",     col:'circle'},
     {en:"0 vertices",                    pt:"0 vértices",                       col:'circle'},
     {en:"A coin",                        pt:"Uma moeda",                        col:'circle'},
     {en:"A plate",                       pt:"Um prato",                         col:'circle'}
   ] },

 /* ---------- 2. quantos LADOS ---------- */
 { key:'sides', emo:"\u{1F4CF}",
   en:"How many sides?", pt:"Quantos lados?",
   info:"A side is one straight line of the figure. Drag each figure to its number of sides.",
   infopt:"Lado é cada linha reta da figura. Arraste cada figura para o número de lados dela.",
   tip:"penta = 5 · hexa = 6 · octo = 8, like an octopus with 8 arms.",
   tippt:"penta = 5 · hexa = 6 · octo = 8, como o polvo (octopus) de 8 braços.",
   cols:[
     {id:'s3', en:'3 sides', pt:'3 lados', emo:"3\u{FE0F}\u{20E3}", co:'#fb923c'},
     {id:'s4', en:'4 sides', pt:'4 lados', emo:"4\u{FE0F}\u{20E3}", co:'#34d399'},
     {id:'s5', en:'5 sides', pt:'5 lados', emo:"5\u{FE0F}\u{20E3}", co:'#f472b6'},
     {id:'s6', en:'6 sides', pt:'6 lados', emo:"6\u{FE0F}\u{20E3}", co:'#60a5fa'},
     {id:'s8', en:'8 sides', pt:'8 lados', emo:"8\u{FE0F}\u{20E3}", co:'#c084fc'}
   ],
   cards:[
     {en:"Triangle",            pt:"Triângulo",              col:'s3'},
     {en:"A slice of pizza",    pt:"Uma fatia de pizza",     col:'s3'},
     {en:"Square",              pt:"Quadrado",               col:'s4'},
     {en:"Rectangle",           pt:"Retângulo",              col:'s4'},
     {en:"A book cover",        pt:"A capa de um livro",     col:'s4'},
     {en:"Pentagon",            pt:"Pentágono",              col:'s5'},
     {en:"Hexagon",             pt:"Hexágono",               col:'s6'},
     {en:"A honeycomb cell",    pt:"Um favo de mel",         col:'s6'},
     {en:"Octagon",             pt:"Octógono",               col:'s8'},
     {en:"A stop sign",         pt:"Uma placa de PARE",      col:'s8'}
   ] },

 /* ---------- 3. quantos VERTICES ---------- */
 { key:'vertices', emo:"\u{1F4CD}",
   en:"How many vertices?", pt:"Quantos vértices?",
   info:"A vertex is a corner, where two sides meet. Drag each figure to its number of vertices.",
   infopt:"Vértice é o cantinho, onde dois lados se encontram. Arraste cada figura para o número de vértices.",
   tip:"Golden rule: in a figure with straight sides, the number of vertices is the SAME as the number of sides. The circle is the only one with 0.",
   tippt:"Regra de ouro: numa figura de lados retos, o número de vértices é o MESMO que o de lados. Só o círculo tem 0.",
   cols:[
     {id:'v0', en:'0 vertices', pt:'0 vértices', emo:"\u{2B55}", co:'#fbbf24'},
     {id:'v3', en:'3 vertices', pt:'3 vértices', emo:"3\u{FE0F}\u{20E3}", co:'#fb923c'},
     {id:'v4', en:'4 vertices', pt:'4 vértices', emo:"4\u{FE0F}\u{20E3}", co:'#34d399'},
     {id:'v6', en:'6 vertices', pt:'6 vértices', emo:"6\u{FE0F}\u{20E3}", co:'#60a5fa'}
   ],
   cards:[
     {en:"Circle",           pt:"Círculo",              col:'v0'},
     {en:"A wheel",          pt:"Uma roda",             col:'v0'},
     {en:"A coin",           pt:"Uma moeda",            col:'v0'},
     {en:"Triangle",         pt:"Triângulo",            col:'v3'},
     {en:"A party hat",      pt:"Um chapéu de festa",   col:'v3'},
     {en:"Square",           pt:"Quadrado",             col:'v4'},
     {en:"Rectangle",        pt:"Retângulo",            col:'v4'},
     {en:"A door",           pt:"Uma porta",            col:'v4'},
     {en:"Hexagon",          pt:"Hexágono",             col:'v6'},
     {en:"A honeycomb cell", pt:"Um favo de mel",       col:'v6'}
   ] },

 /* ---------- 4. simetria nas letras ---------- */
 { key:'symmetry', emo:"\u{1FA9E}",
   en:"Does it have symmetry?", pt:"Tem simetria?",
   info:"Put a Mira (mirror) on the letter. If one half matches the other, it has symmetry.",
   infopt:"Ponha a Mira (espelhinho) na letra. Se uma metade combina com a outra, ela tem simetria.",
   tip:"The line of symmetry can be STANDING UP or LYING DOWN. C and B only work with the line lying down!",
   tippt:"A linha de simetria pode ser EM PÉ ou DEITADA. O C e o B só funcionam com a linha deitada!",
   cols:[
     {id:'yes', en:'Has symmetry',  pt:'Tem simetria',  emo:"\u{2705}", co:'#34d399'},
     {id:'no',  en:'No symmetry',   pt:'Não tem simetria', emo:"\u{274C}", co:'#fb7185'}
   ],
   cards:[
     {en:"The letter O",  pt:"A letra O — linha em pé E deitada",  col:'yes'},
     {en:"The letter X",  pt:"A letra X — linha em pé E deitada",  col:'yes'},
     {en:"The letter A",  pt:"A letra A — linha em pé",            col:'yes'},
     {en:"The letter M",  pt:"A letra M — linha em pé",            col:'yes'},
     {en:"The letter V",  pt:"A letra V — linha em pé",            col:'yes'},
     {en:"The letter C",  pt:"A letra C — linha DEITADA",          col:'yes'},
     {en:"The letter B",  pt:"A letra B — linha DEITADA",          col:'yes'},
     {en:"The word MOM",  pt:"A palavra MOM — a Mira vai no meio do O", col:'yes'},
     {en:"The letter G",  pt:"A letra G",                          col:'no'},
     {en:"The letter P",  pt:"A letra P",                          col:'no'},
     {en:"The letter J",  pt:"A letra J",                          col:'no'},
     {en:"The letter R",  pt:"A letra R",                          col:'no'}
   ] },

 /* ---------- 5. slide, flip, turn ---------- */
 { key:'moves', emo:"\u{1F504}",
   en:"Slide, flip or turn?", pt:"Deslizar, virar ou girar?",
   info:"To make a repeating pattern with just one figure, you can slide it, flip it or turn it.",
   infopt:"Para fazer um padrão que se repete com uma só figura, você pode deslizar, virar ou girar.",
   tip:"Slide = it walks · Flip = mirror · Turn = it spins, like a clock hand.",
   tippt:"Slide = anda · Flip = espelho · Turn = roda, como o ponteiro do relógio.",
   cols:[
     {id:'slide', en:'Slide', pt:'Deslizar', emo:"\u{27A1}\u{FE0F}", co:'#60a5fa'},
     {id:'flip',  en:'Flip',  pt:'Virar',    emo:"\u{1FA9E}", co:'#f472b6'},
     {id:'turn',  en:'Turn',  pt:'Girar',    emo:"\u{1F503}", co:'#fbbf24'}
   ],
   cards:[
     {en:"The figure walks to the next spot", pt:"A figura anda para o lugar de perto", col:'slide'},
     {en:"It moves without spinning",         pt:"Ela se move sem rodar",               col:'slide'},
     {en:"It keeps facing the same way",      pt:"Ela continua virada para o mesmo lado", col:'slide'},
     {en:"You see its mirror image",          pt:"Você vê a imagem dela no espelho",    col:'flip'},
     {en:"It flips over, like a pancake",     pt:"Ela vira do avesso, como uma panqueca", col:'flip'},
     {en:"It spins around a point",           pt:"Ela roda em volta de um pontinho",    col:'turn'},
     {en:"It goes round like a clock hand",   pt:"Ela roda como o ponteiro do relógio", col:'turn'}
   ] },

 /* ---------- 6. o que muda e o que nao muda ---------- */
 { key:'samechange', emo:"\u{1F9E9}",
   en:"Slide, flip, turn: what changes?", pt:"Deslizar, virar, girar: o que muda?",
   info:"When a figure slides, flips or turns, it is still the SAME figure. Only some things change.",
   infopt:"Quando a figura desliza, vira ou gira, ela continua sendo a MESMA figura. Só algumas coisas mudam.",
   tip:"A triangle that turns is still a triangle: 3 sides, 3 vertices, same size. Only where it is and which way it faces can change.",
   tippt:"Um triângulo que gira continua triângulo: 3 lados, 3 vértices, mesmo tamanho. Só o lugar e o lado para onde ele aponta podem mudar.",
   cols:[
     {id:'same',   en:'Always the same', pt:'Continua igual', emo:"\u{1F512}", co:'#34d399'},
     {id:'change', en:'Can change',      pt:'Pode mudar',     emo:"\u{2728}", co:'#c084fc'}
   ],
   cards:[
     {en:"The number of sides",       pt:"O número de lados",           col:'same'},
     {en:"The number of vertices",    pt:"O número de vértices",        col:'same'},
     {en:"The size of the figure",    pt:"O tamanho da figura",         col:'same'},
     {en:"The name of the figure",    pt:"O nome da figura",            col:'same'},
     {en:"Where the figure is",       pt:"Onde a figura está",          col:'change'},
     {en:"Which way it faces",        pt:"Para que lado ela aponta",    col:'change'}
   ] }
];
