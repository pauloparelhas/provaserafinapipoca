var MAP=[
 {c:'bc-orange', ic:"\u{1F53A}", t:'The 7 figures', tr:'as sete figuras da unidade', open:false,
  leaves:[
   {ic:"\u{2B55}", t:'Circle — círculo', d:['Round, with no corners.','No straight sides · 0 vertices.']},
   {ic:"\u{1F53A}", t:'Triangle — triângulo', d:['3 straight sides · 3 vertices.']},
   {ic:"\u{1F7E9}", t:'Square — quadrado', d:['4 sides, all the same length · 4 vertices.']},
   {ic:"\u{1F7E6}", t:'Rectangle — retângulo', d:['4 sides: 2 long and 2 short · 4 vertices.']},
   {ic:"\u{2B50}", t:'Pentagon — pentágono', d:['5 sides · 5 vertices.','penta = 5.']},
   {ic:"\u{1F41D}", t:'Hexagon — hexágono', d:['6 sides · 6 vertices.','hexa = 6.']},
   {ic:"\u{1F6D1}", t:'Octagon — octógono', d:['8 sides · 8 vertices.','octo = 8, like an octopus.']}
  ]},
 {c:'bc-blue', ic:"\u{1F4CD}", t:'Sides and vertices', tr:'o que a prova mais cobra', open:false,
  leaves:[
   {ic:"\u{1F4CF}", t:'Side — lado', d:['One straight line of the figure.','Edge means the same thing.']},
   {ic:"\u{1F4CD}", t:'Vertex — vértice', d:['The corner where two sides meet.','More than one: vertices.']},
   {ic:"\u{1F511}", t:'The golden rule', d:['In a figure with straight sides, the number of vertices is the same as the number of sides.']},
   {ic:"\u{2B55}", t:'The exception', d:['The circle has 0 vertices — it has no corners at all.']},
   {ic:"\u{1F45C}", t:'What is in the bag?', d:['3 figures with 13 sides: triangle + square + hexagon (3+4+6).','3 figures with 12 vertices: square + square + square (4+4+4).','There is more than one right answer.']}
  ]},
 {c:'bc-green', ic:"\u{1F441}\u{FE0F}", t:'Figures around us', tr:'as figuras nos objetos do dia a dia', open:false,
  leaves:[
   {ic:"\u{1F7E6}", t:'Rectangle', d:['A book cover.','A door.']},
   {ic:"\u{2B55}", t:'Circle', d:['A coin, a plate, a wheel, a clock face.']},
   {ic:"\u{1F53A}", t:'Triangle', d:['A slice of pizza.','A party hat.']},
   {ic:"\u{1F6D1}", t:'Octagon', d:['A stop sign.']},
   {ic:"\u{1F36F}", t:'Hexagon', d:['A honeycomb cell.']},
   {ic:"\u{26BD}", t:'Pentagon', d:['The black patch on a soccer ball.']}
  ]},
 {c:'bc-pink', ic:"\u{1FA9E}", t:'Symmetry', tr:'a linha do espelho', open:false,
  leaves:[
   {ic:"\u{1FA9E}", t:'What symmetry is', d:['A figure has symmetry when you can fold it and the two halves match.']},
   {ic:"\u{2702}\u{FE0F}", t:'Line of symmetry', d:['The fold line.','It can be standing up OR lying down.','A figure can have more than one.']},
   {ic:"\u{1F5BC}\u{FE0F}", t:'Matching part', d:['The half that is missing.','It is the mirror image of the other half.']},
   {ic:"\u{1F534}", t:'Mira', d:['The little red mirror we use to check.','Put it on the line and look.']},
   {ic:"\u{2705}", t:'Letters with symmetry', d:['O and X — standing up AND lying down.','A, M and V — standing up.','C and B — lying down.']},
   {ic:"\u{274C}", t:'Letters without symmetry', d:['G, P, J and R.']},
   {ic:"\u{1F469}", t:'MOM', d:['The word has symmetry: the Mira goes standing up, in the middle of the O.','Other words: WOW, MUM, TOT.']}
  ]},
 {c:'bc-purple', ic:"\u{1F504}", t:'Slide, flip and turn', tr:'os padrões que se repetem', open:false,
  leaves:[
   {ic:"\u{27A1}\u{FE0F}", t:'Slide — deslizar', d:['The figure walks to the next spot.','It does not spin and it does not mirror.']},
   {ic:"\u{1FA9E}", t:'Flip — virar', d:['The figure shows its mirror image.']},
   {ic:"\u{1F503}", t:'Turn — girar', d:['The figure spins around a point, like a clock hand.']},
   {ic:"\u{1F9F5}", t:'Repeating pattern', d:['A little piece that comes again and again, always in the same order.','You can make one with just one figure.']},
   {ic:"\u{1F512}", t:'What never changes', d:['The number of sides, the number of vertices, the size and the name of the figure.']},
   {ic:"\u{2728}", t:'What can change', d:['Where the figure is.','Which way it faces.']}
  ]},
 {c:'bc-green', ic:"\u{1F9E9}", t:'The quilt', tr:'a colcha da última lição', open:false,
  leaves:[
   {ic:"\u{1F522}", t:'The grid', d:['3 by 3 blocks, numbered 1 to 9.']},
   {ic:"\u{2B50}", t:'Block 3', d:['The only block with just a pentagon.','A triangle on each edge makes a star.']},
   {ic:"\u{1F46F}", t:'Same design', d:['Blocks 1 and 9.','Blocks 2 and 6.','Blocks 4 and 8.','Only the colours change.']},
   {ic:"\u{2B07}\u{FE0F}", t:'Following directions', d:['Start in block 1 · down two blocks → 7 · one to the right → 8 · up one → 5 · one to the left → block 4.']}
  ]},
 {c:'bc-orange', ic:"\u{26A0}\u{FE0F}", t:'Careful with these pairs!', tr:'as pegadinhas mais prováveis', open:false,
  leaves:[
   {ic:"\u{1F4CD}", t:'side × vertex', d:['Side = one straight line.','Vertex = the corner where two sides meet.','Read the question to the end!']},
   {ic:"\u{1F4CF}", t:'standing up × lying down', d:['A line of symmetry can be lying down.','C and B only work with the line lying down.']},
   {ic:"\u{1F504}", t:'flip × turn', d:['Flip = mirror image.','Turn = spins around a point.','In Portuguese we say “virar” for both — in English we do not.']},
   {ic:"\u{1F41D}", t:'hexagon × octagon', d:['Hexagon = 6 sides.','Octagon = 8 sides, like an octopus.']},
   {ic:"\u{1F7E9}", t:'square × rectangle', d:['Both have 4 sides and 4 vertices.','In the square all four sides are the same length.']}
  ]}
];
