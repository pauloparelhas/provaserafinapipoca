var BLOCKS=[
 { key:'figuras', emo:"\u{1F53A}", en:"The 7 figures", axis:"nome em inglês · lados · vértices",
   groups:[
    {name:'0 vertices', pt:'sem cantinho', emo:"\u{2B55}", co:C_OBJ, chips:[
      ["circle","círculo — redondo, 0 lados retos"]]},
    {name:'3 sides', pt:'3 lados, 3 vértices', emo:"\u{1F53A}", co:'#fb923c', chips:[
      ["triangle","triângulo"]]},
    {name:'4 sides', pt:'4 lados, 4 vértices', emo:"\u{1F7E9}", co:C_LAD, chips:[
      ["square","quadrado — 4 lados iguais"],["rectangle","retângulo — 2 compridos, 2 curtos"]]},
    {name:'5, 6 and 8 sides', pt:'penta · hexa · octo', emo:"\u{2B50}", co:C_FIG, chips:[
      ["pentagon","pentágono — 5"],["hexagon","hexágono — 6"],["octagon","octógono — 8"]]}
   ]},
 { key:'partes', emo:"\u{1F4CD}", en:"Sides and vertices", axis:"as palavras que a prova usa",
   groups:[
    {name:'Side / edge', pt:'o lado', emo:"\u{1F4CF}", co:C_LAD, chips:[
      ["side","lado — cada linha reta"],["edge","lado (outra palavra)"],["straight","reto"],["curved","curvo"]]},
    {name:'Vertex / vertices', pt:'o cantinho', emo:"\u{1F4CD}", co:C_SIM, chips:[
      ["vertex","vértice (um)"],["vertices","vértices (mais de um)"],["corner","cantinho"]]},
    {name:'The golden rule', pt:'lados = vértices', emo:"\u{1F511}", co:C_PAD, chips:[
      ["3 sides = 3 vertices",""],["4 sides = 4 vertices",""],["6 sides = 6 vertices",""],["circle = 0 vertices","a exceção"]]}
   ]},
 { key:'objetos', emo:"\u{1F441}\u{FE0F}", en:"Figures around us", axis:"o objeto e a figura dele",
   groups:[
    {name:'Rectangle', pt:'retângulo', emo:"\u{1F7E6}", co:'#60a5fa', chips:[
      ["book cover","capa de livro"],["door","porta"]]},
    {name:'Circle', pt:'círculo', emo:"\u{2B55}", co:C_OBJ, chips:[
      ["coin","moeda"],["plate","prato"],["wheel","roda"],["clock face","relógio de parede"]]},
    {name:'Triangle', pt:'triângulo', emo:"\u{1F53A}", co:'#fb923c', chips:[
      ["slice of pizza","fatia de pizza"],["party hat","chapéu de festa"]]},
    {name:'Octagon · Hexagon · Pentagon', pt:'8 · 6 · 5', emo:"\u{1F6D1}", co:C_FIG, chips:[
      ["stop sign","placa de PARE — octagon"],["honeycomb cell","favo de mel — hexagon"],["black patch on a ball","gomo preto da bola — pentagon"]]}
   ]},
 { key:'simetria', emo:"\u{1FA9E}", en:"Symmetry", axis:"a linha do espelho",
   groups:[
    {name:'The words', pt:'as palavras', emo:"\u{1F4AC}", co:C_SIM, chips:[
      ["symmetry","simetria"],["line of symmetry","linha de simetria"],["fold","dobrar"],["match","combinar"],["matching part","a metade que combina"],["mirror image","imagem no espelho"],["half","metade"],["Mira","o espelhinho"]]},
    {name:'Letters WITH symmetry', pt:'têm simetria', emo:"\u{2705}", co:C_LAD, chips:[
      ["O","em pé e deitada"],["X","em pé e deitada"],["A","em pé"],["M","em pé"],["V","em pé"],["C","DEITADA"],["B","DEITADA"]]},
    {name:'Letters WITHOUT', pt:'não têm simetria', emo:"\u{274C}", co:'#fb7185', chips:[
      ["G",""],["P",""],["J",""],["R",""]]},
    {name:'Words with symmetry', pt:'palavras simétricas', emo:"\u{1F469}", co:C_PAD, chips:[
      ["MOM","a Mira vai no meio do O"],["WOW",""],["MUM",""],["TOT",""]]}
   ]},
 { key:'padroes', emo:"\u{1F504}", en:"Slide, flip, turn", axis:"os três movimentos",
   groups:[
    {name:'Slide', pt:'deslizar', emo:"\u{27A1}\u{FE0F}", co:'#60a5fa', chips:[
      ["it walks to the next spot","anda para o lugar de perto"],["no spinning, no mirror","não roda nem espelha"]]},
    {name:'Flip', pt:'virar', emo:"\u{1FA9E}", co:C_SIM, chips:[
      ["you see the mirror image","vê-se a imagem no espelho"]]},
    {name:'Turn', pt:'girar', emo:"\u{1F503}", co:C_PAD, chips:[
      ["it spins around a point","roda em volta de um pontinho"],["like a clock hand","como o ponteiro do relógio"]]},
    {name:'Always the same', pt:'nunca muda', emo:"\u{1F512}", co:C_LAD, chips:[
      ["the number of sides","o número de lados"],["the number of vertices","o número de vértices"],["the size","o tamanho"],["the name of the figure","o nome da figura"]]}
   ]},
 { key:'pares', emo:"\u{26A0}\u{FE0F}", en:"Pairs that trick you", axis:"leia até o fim",
   groups:[
    {name:'side × vertex', pt:'lado × vértice', emo:"\u{1F4CD}", co:'#fb7185', chips:[
      ["side = a straight line","o lado"],["vertex = a corner","o cantinho"]]},
    {name:'flip × turn', pt:'espelho × girar', emo:"\u{1F504}", co:C_PAD, chips:[
      ["flip = mirror","virar como no espelho"],["turn = spin","girar em volta de um ponto"]]},
    {name:'hexagon × octagon', pt:'6 × 8', emo:"\u{1F41D}", co:C_FIG, chips:[
      ["hexagon = 6","hexa = seis"],["octagon = 8","octo = oito, octopus"]]},
    {name:'square × rectangle', pt:'os dois têm 4 lados', emo:"\u{1F7E9}", co:C_LAD, chips:[
      ["square: 4 equal sides","4 lados iguais"],["rectangle: 2 long, 2 short","2 compridos, 2 curtos"]]}
   ]}
];
