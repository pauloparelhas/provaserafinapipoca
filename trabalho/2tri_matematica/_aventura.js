/* --- galeria clicável das 7 figuras (lição da fase 1) ---
   As figuras são desenhadas em SVG, não são emoji: a criança precisa VER o
   polígono para contar os lados. Toque numa figura -> nome EN/PT, lados e
   vértices, e o motor lê em voz alta em inglês. */
function galeriaFiguras(box){
  var F=[
   {k:'circle',   n:'Circle',   pt:'Círculo',   co:'#fbbf24', s:'no straight sides', v:'0 vertices', pts:null},
   {k:'triangle', n:'Triangle', pt:'Triângulo', co:'#fb923c', s:'3 sides', v:'3 vertices', pts:3},
   {k:'square',   n:'Square',   pt:'Quadrado',  co:'#34d399', s:'4 equal sides', v:'4 vertices', pts:4},
   {k:'rect',     n:'Rectangle',pt:'Retângulo', co:'#60a5fa', s:'4 sides: 2 long, 2 short', v:'4 vertices', pts:'rect'},
   {k:'pentagon', n:'Pentagon', pt:'Pentágono', co:'#f472b6', s:'5 sides', v:'5 vertices', pts:5},
   {k:'hexagon',  n:'Hexagon',  pt:'Hexágono',  co:'#a78bfa', s:'6 sides', v:'6 vertices', pts:6},
   {k:'octagon',  n:'Octagon',  pt:'Octógono',  co:'#38bdf8', s:'8 sides', v:'8 vertices', pts:8}
  ];
  function svg(f){
    var d='';
    if(f.pts===null){
      d='<circle cx="30" cy="30" r="22" fill="'+f.co+'33" stroke="'+f.co+'" stroke-width="3"/>';
    }else if(f.pts==='rect'){
      d='<rect x="6" y="15" width="48" height="30" fill="'+f.co+'33" stroke="'+f.co+'" stroke-width="3"/>';
    }else{
      var n=f.pts, p=[], gira=(n%2? -90 : (n===4? -45 : 0));
      for(var i=0;i<n;i++){
        var a=(gira+i*360/n)*Math.PI/180;
        p.push((30+22*Math.cos(a)).toFixed(1)+','+(30+22*Math.sin(a)).toFixed(1));
      }
      d='<polygon points="'+p.join(' ')+'" fill="'+f.co+'33" stroke="'+f.co+'" stroke-width="3" stroke-linejoin="round"/>';
    }
    return '<svg viewBox="0 0 60 60" width="46" height="46" aria-hidden="true">'+d+'</svg>';
  }
  box.innerHTML='<div class="mapreg">'
   +F.map(function(f,i){return '<button class="mrbtn" data-i="'+i+'" style="--rc:'+f.co+'">'
     +'<span class="mre">'+svg(f)+'</span><span class="mrn">'+f.n+'</span></button>';}).join('')
   +'</div><div class="mrinfo" id="mrinfo">Toque numa figura para contar os lados. 👆</div>';
  var info=box.querySelector('#mrinfo');
  Array.prototype.forEach.call(box.querySelectorAll('.mrbtn'),function(b){
    b.addEventListener('click',function(){
      var f=F[+b.dataset.i];
      Array.prototype.forEach.call(box.querySelectorAll('.mrbtn'),function(x){x.classList.remove('on');});
      b.classList.add('on');
      info.style.borderColor=f.co;
      info.innerHTML='<b style="color:'+f.co+'">'+f.n+' · '+f.pt+'</b><br>'+f.s+' &middot; '+f.v;
      if(window.say)say(f.n+'. '+f.s+'. '+f.v);
    });
  });
}

/* --- opções reutilizadas: as 7 figuras (o motor embaralha) --- */
function FG(ok){return [
  {en:'Circle',    pt:'círculo',    ok:ok==='ci'},
  {en:'Triangle',  pt:'triângulo',  ok:ok==='tr'},
  {en:'Square',    pt:'quadrado',   ok:ok==='sq'},
  {en:'Rectangle', pt:'retângulo',  ok:ok==='re'},
  {en:'Pentagon',  pt:'pentágono',  ok:ok==='pe'},
  {en:'Hexagon',   pt:'hexágono',   ok:ok==='he'},
  {en:'Octagon',   pt:'octógono',   ok:ok==='oc'}];}

/* --- opções de contagem --- */
function NUM(ok,lista){return lista.map(function(n){
  return {en:String(n), pt:'', ok:n===ok};});}

var ADVENTURE={
 storageKey:'mat2_adv',
 title:'Shape Quest', titlePt:'Unit 9 — 2-D Geometry', hero:'📐',
 phases:[

 /* ===== FASE 1 — conhecer as 7 figuras ===== */
 { id:'f1', icon:'🔺', color:'#fb923c',
   name:'Meet the figures', namePt:'as 7 figuras da unidade',
   anchor:'We name a figure by how many sides it has.',
   anchorPt:'O nome da figura vem do número de lados dela.',
   lesson:{lines:[
    ['📄','A <b>2-D figure</b> is flat: you can draw it on paper.','figura plana — dá para desenhar no papel'],
    ['🔢','We give it a name by counting its <b>sides</b>.','o nome vem do número de lados'],
    ['🐙','<b>penta</b> means 5 · <b>hexa</b> means 6 · <b>octo</b> means 8, like an <b>octopus</b>.','penta 5 · hexa 6 · octo 8'],
    ['⭕','The <b>circle</b> is the round one: it has no straight sides at all.','o círculo é o redondo, sem lado reto']
   ], custom:galeriaFiguras},
   pick:3,
   bank:[
    {t:'mc',q:'Which figure has 3 straight sides?',qpt:'Que figura tem 3 lados retos?',opts:FG('tr')},
    {t:'mc',q:'Which figure has 4 sides, all the same length?',qpt:'Que figura tem 4 lados, todos do mesmo tamanho?',opts:FG('sq')},
    {t:'mc',q:'Which figure has 2 long sides and 2 short sides?',qpt:'Que figura tem 2 lados compridos e 2 curtinhos?',opts:FG('re')},
    {t:'mc',q:'Which figure has 5 sides?',qpt:'Que figura tem 5 lados?',opts:FG('pe')},
    {t:'mc',q:'Which figure has 6 sides?',qpt:'Que figura tem 6 lados?',opts:FG('he')},
    {t:'mc',q:'Which figure has 8 sides?',qpt:'Que figura tem 8 lados?',opts:FG('oc')},
    {t:'mc',q:'Which figure is round, with no corners?',qpt:'Que figura é redonda, sem cantinhos?',opts:FG('ci')},
    {t:'mc',q:'A 2-D figure is a figure that is…',qpt:'Uma figura 2-D é uma figura que é…',opts:[
      {en:'Flat — you can draw it on paper',pt:'plana',ok:true},
      {en:'Round like a ball',pt:'redonda como uma bola',ok:false},
      {en:'Made of wood',pt:'feita de madeira',ok:false}]},
    {t:'sort',q:'How many sides does it have?',qpt:'Quantos lados ela tem?',
     buckets:[{id:'b3',en:'3 sides',pt:'3 lados',color:'#fb923c'},
              {id:'b4',en:'4 sides',pt:'4 lados',color:'#34d399'},
              {id:'b6',en:'6 sides',pt:'6 lados',color:'#a78bfa'},
              {id:'b8',en:'8 sides',pt:'8 lados',color:'#38bdf8'}],
     items:[{en:'Triangle',pt:'triângulo',b:'b3'},{en:'Square',pt:'quadrado',b:'b4'},
            {en:'Rectangle',pt:'retângulo',b:'b4'},{en:'Hexagon',pt:'hexágono',b:'b6'},
            {en:'Octagon',pt:'octógono',b:'b8'}],pick:4}
   ]},

 /* ===== FASE 2 — sides e vertices ===== */
 { id:'f2', icon:'📍', color:'#34d399',
   name:'Sides and vertices', namePt:'lado e vértice: a diferença',
   anchor:'A side is a straight line. A vertex is the corner where two sides meet.',
   anchorPt:'Side é o lado (a linha reta). Vertex é o vértice (o cantinho).',
   lesson:{lines:[
    ['📏','A <b>side</b> is one straight line of the figure.','o lado: cada linha reta'],
    ['📍','A <b>vertex</b> is the corner where two sides meet. More than one: <b>vertices</b>.','o vértice: o cantinho onde dois lados se encontram'],
    ['🔗','<b>Edge</b> means the same as side.','edge = lado'],
    ['🔑','Golden rule: in a figure with straight sides, the number of vertices is the SAME as the number of sides.','lados = vértices'],
    ['⭕','Only the <b>circle</b> is different: it has <b>0 vertices</b>.','só o círculo tem 0 vértices']
   ]},
   pick:3,
   bank:[
    {t:'mc',q:'What is a SIDE?',qpt:'O que é um side (lado)?',opts:[
      {en:'One straight line of the figure',pt:'cada linha reta da figura',ok:true},
      {en:'The corner where two lines meet',pt:'isso é o vértice',ok:false},
      {en:'The colour of the figure',pt:'',ok:false}]},
    {t:'mc',q:'What is a VERTEX?',qpt:'O que é um vertex (vértice)?',opts:[
      {en:'The corner where two sides meet',pt:'o cantinho',ok:true},
      {en:'One straight line of the figure',pt:'isso é o lado',ok:false},
      {en:'The middle of the figure',pt:'',ok:false}]},
    {t:'mc',q:'What is the plural of VERTEX?',qpt:'Qual é o plural de vertex?',opts:[
      {en:'Vertices',pt:'vértices',ok:true},
      {en:'Vertexes',pt:'não existe',ok:false},
      {en:'Verticals',pt:'',ok:false}]},
    {t:'mc',q:'How many vertices does a TRIANGLE have?',qpt:'Quantos vértices tem um triângulo?',opts:NUM(3,[3,4,0])},
    {t:'mc',q:'How many vertices does a CIRCLE have?',qpt:'Quantos vértices tem um círculo?',opts:NUM(0,[0,1,4])},
    {t:'mc',q:'How many vertices does a HEXAGON have?',qpt:'Quantos vértices tem um hexágono?',opts:NUM(6,[6,5,8])},
    {t:'mc',q:'How many sides does an OCTAGON have?',qpt:'Quantos lados tem um octógono?',opts:NUM(8,[8,6,5])},
    {t:'mc',q:'EDGE means the same as…',qpt:'Edge quer dizer o mesmo que…',opts:[
      {en:'Side',pt:'lado',ok:true},{en:'Vertex',pt:'vértice',ok:false},{en:'Colour',pt:'cor',ok:false}]},
    {t:'sort',q:'How many vertices?',qpt:'Quantos vértices?',
     buckets:[{id:'v0',en:'0 vertices',pt:'nenhum',color:'#fbbf24'},
              {id:'v3',en:'3 vertices',pt:'',color:'#fb923c'},
              {id:'v4',en:'4 vertices',pt:'',color:'#34d399'},
              {id:'v6',en:'6 vertices',pt:'',color:'#a78bfa'}],
     items:[{en:'Circle',pt:'círculo',b:'v0'},{en:'Triangle',pt:'triângulo',b:'v3'},
            {en:'Square',pt:'quadrado',b:'v4'},{en:'Rectangle',pt:'retângulo',b:'v4'},
            {en:'Hexagon',pt:'hexágono',b:'v6'}],pick:4}
   ]},

 /* ===== FASE 3 — as figuras nos objetos ===== */
 { id:'f3', icon:'👁️', color:'#38bdf8',
   name:'Figures around us', namePt:'achar as figuras no dia a dia',
   anchor:'A book cover is a rectangle. A stop sign is an octagon. A honeycomb cell is a hexagon.',
   anchorPt:'Capa de livro = retângulo. Placa de PARE = octógono. Favo de mel = hexágono.',
   lesson:{lines:[
    ['📕','A <b>book cover</b> and a <b>door</b> look like a <b>rectangle</b>.','capa de livro e porta'],
    ['🪙','A <b>coin</b>, a <b>plate</b>, a <b>wheel</b> and a <b>clock face</b> look like a <b>circle</b>.','moeda, prato, roda, relógio'],
    ['🍕','A <b>slice of pizza</b> and a <b>party hat</b> look like a <b>triangle</b>.','fatia de pizza e chapéu de festa'],
    ['🛑','A <b>stop sign</b> is an <b>octagon</b> — 8 sides.','a placa de PARE'],
    ['🍯','A <b>honeycomb cell</b> is a <b>hexagon</b> — 6 sides.','o favo de mel']
   ]},
   pick:3,
   bank:[
    {t:'mc',q:'A book cover looks like a…',qpt:'A capa de um livro parece um…',opts:FG('re')},
    {t:'mc',q:'A coin looks like a…',qpt:'Uma moeda parece um…',opts:FG('ci')},
    {t:'mc',q:'A slice of pizza looks like a…',qpt:'Uma fatia de pizza parece um…',opts:FG('tr')},
    {t:'mc',q:'A stop sign looks like an…',qpt:'Uma placa de PARE parece um…',opts:FG('oc')},
    {t:'mc',q:'A honeycomb cell looks like a…',qpt:'Um favo de mel parece um…',opts:FG('he')},
    {t:'mc',q:'A door looks like a…',qpt:'Uma porta parece um…',opts:FG('re')},
    {t:'mc',q:'A party hat looks like a…',qpt:'Um chapéu de festa parece um…',opts:FG('tr')},
    {t:'sort',q:'Which figure is it?',qpt:'Que figura é?',
     buckets:[{id:'re',en:'Rectangle',pt:'retângulo',color:'#60a5fa'},
              {id:'ci',en:'Circle',pt:'círculo',color:'#fbbf24'},
              {id:'tr',en:'Triangle',pt:'triângulo',color:'#fb923c'}],
     items:[{en:'A book cover',pt:'capa de livro',b:'re'},{en:'A door',pt:'porta',b:'re'},
            {en:'A plate',pt:'prato',b:'ci'},{en:'A wheel',pt:'roda',b:'ci'},
            {en:'A slice of pizza',pt:'fatia de pizza',b:'tr'},{en:'A party hat',pt:'chapéu de festa',b:'tr'}],pick:4}
   ]},

 /* ===== MINI CHEFE 1 ===== */
 { id:'boss1', boss:true, icon:'👑', color:'#fbbf24',
   name:'Mini chefe!', namePt:'revisão das fases 1, 2 e 3',
   intro:'4 questions from phases 1, 2 and 3!',
   introPt:'4 perguntas das fases 1, 2 e 3!',
   from:['f1','f2','f3'], count:4 },

 /* ===== FASE 4 — somar lados e vértices ===== */
 { id:'f4', icon:'👜', color:'#c084fc',
   name:'What is in the bag?', namePt:'somar os lados de um grupo',
   anchor:'Triangle + square + hexagon = 3 + 4 + 6 = 13 sides.',
   anchorPt:'Triângulo + quadrado + hexágono = 3 + 4 + 6 = 13 lados.',
   lesson:{lines:[
    ['👜','There are <b>3 figures</b> in a bag. You know the <b>total</b> of sides or vertices.','sabe-se só o total'],
    ['➕','Add the sides of each one and see if the total fits.','some os lados de cada uma e confira o total'],
    ['1️⃣','13 sides: <b>triangle + square + hexagon</b> (3 + 4 + 6).',''],
    ['2️⃣','12 vertices: <b>square + square + square</b> (4 + 4 + 4).',''],
    ['✨','There is <b>more than one</b> right answer — that is the fun of it!','existe mais de uma resposta certa']
   ]},
   pick:3,
   bank:[
    {t:'mc',q:'Which group has 13 sides in total?',qpt:'Qual grupo tem 13 lados no total?',opts:[
      {en:'Triangle + square + hexagon',pt:'3 + 4 + 6 = 13',ok:true},
      {en:'Triangle + square + square',pt:'3 + 4 + 4 = 11',ok:false},
      {en:'Square + square + square',pt:'4 + 4 + 4 = 12',ok:false}]},
    {t:'mc',q:'Which group has 12 vertices in total?',qpt:'Qual grupo tem 12 vértices no total?',opts:[
      {en:'Square + square + square',pt:'4 + 4 + 4 = 12',ok:true},
      {en:'Triangle + triangle + triangle',pt:'3 + 3 + 3 = 9',ok:false},
      {en:'Pentagon + pentagon + pentagon',pt:'5 + 5 + 5 = 15',ok:false}]},
    {t:'mc',q:'Which group has 12 vertices in total?',qpt:'Qual grupo tem 12 vértices no total?',opts:[
      {en:'Triangle + triangle + hexagon',pt:'3 + 3 + 6 = 12',ok:true},
      {en:'Triangle + square + square',pt:'3 + 4 + 4 = 11',ok:false},
      {en:'Square + hexagon + hexagon',pt:'4 + 6 + 6 = 16',ok:false}]},
    {t:'mc',q:'A triangle and a square together have how many sides?',qpt:'Um triângulo e um quadrado juntos têm quantos lados?',opts:NUM(7,[7,6,8])},
    {t:'mc',q:'Two triangles together have how many vertices?',qpt:'Dois triângulos juntos têm quantos vértices?',opts:NUM(6,[6,3,9])},
    {t:'mc',q:'A pentagon and a hexagon together have how many sides?',qpt:'Um pentágono e um hexágono juntos têm quantos lados?',opts:NUM(11,[11,10,12])},
    {t:'mc',q:'Two squares together have how many vertices?',qpt:'Dois quadrados juntos têm quantos vértices?',opts:NUM(8,[8,4,6])}
   ]},

 /* ===== FASE 5 — simetria ===== */
 { id:'f5', icon:'🪞', color:'#f472b6',
   name:'Symmetry', namePt:'dobrar e ver se combina',
   anchor:'A figure has symmetry when you fold it and the two halves match.',
   anchorPt:'Tem simetria quando dá para dobrar e as duas metades combinam.',
   lesson:{lines:[
    ['🪞','A figure has <b>symmetry</b> when you can <b>fold</b> it and the two halves <b>match</b>.','dobrar e as metades combinam'],
    ['✂️','The fold line is the <b>line of symmetry</b>.','a linha da dobra'],
    ['🖼️','The half that is missing is the <b>matching part</b> — the <b>mirror image</b>.','a metade que falta é a imagem no espelho'],
    ['🔴','We check with a <b>Mira</b>: a little red mirror.','a Mira é o espelhinho'],
    ['📏','The line can be <b>standing up</b> OR <b>lying down</b> — and a figure can have more than one!','em pé OU deitada']
   ]},
   pick:3,
   bank:[
    {t:'mc',q:'A figure has symmetry when…',qpt:'Uma figura tem simetria quando…',opts:[
      {en:'You fold it and the two halves match',pt:'dobra e as metades combinam',ok:true},
      {en:'It has a lot of colours',pt:'tem muitas cores',ok:false},
      {en:'It is very big',pt:'é bem grande',ok:false}]},
    {t:'mc',q:'What is the fold line called?',qpt:'Como se chama a linha da dobra?',opts:[
      {en:'Line of symmetry',pt:'linha de simetria',ok:true},
      {en:'Side',pt:'lado',ok:false},{en:'Vertex',pt:'vértice',ok:false}]},
    {t:'mc',q:'What is the MATCHING PART?',qpt:'O que é a matching part?',opts:[
      {en:'The mirror image — the half that is missing',pt:'a imagem no espelho, a metade que falta',ok:true},
      {en:'The longest side',pt:'o lado mais comprido',ok:false},
      {en:'The number of vertices',pt:'o número de vértices',ok:false}]},
    {t:'mc',q:'What do we use a MIRA for?',qpt:'Para que serve a Mira?',opts:[
      {en:'To check if a figure has symmetry',pt:'conferir a simetria',ok:true},
      {en:'To measure the sides',pt:'medir os lados',ok:false},
      {en:'To colour the figure',pt:'pintar a figura',ok:false}]},
    {t:'mc',q:'A line of symmetry can be…',qpt:'A linha de simetria pode ser…',opts:[
      {en:'Standing up OR lying down',pt:'em pé OU deitada',ok:true},
      {en:'Only standing up',pt:'só em pé',ok:false},
      {en:'Only lying down',pt:'só deitada',ok:false}]},
    {t:'mc',q:'You drew half of a figure. To finish it with symmetry you draw…',qpt:'Desenhou metade da figura. Para terminar com simetria você desenha…',opts:[
      {en:'The matching part, like a mirror',pt:'a metade que combina, como num espelho',ok:true},
      {en:'Any figure you like',pt:'qualquer figura',ok:false},
      {en:'A bigger half',pt:'uma metade maior',ok:false}]}
   ]},

 /* ===== FASE 6 — simetria nas letras ===== */
 { id:'f6', icon:'🔠', color:'#fbbf24',
   name:'Symmetry in letters', namePt:'as letras que se dobram',
   anchor:'O, X, A, M, V, C and B have symmetry. G, P, J and R do not.',
   anchorPt:'Têm simetria: O, X, A, M, V, C e B. Não têm: G, P, J e R.',
   lesson:{lines:[
    ['⭕','<b>O</b> and <b>X</b> have TWO lines: standing up and lying down.','O e X têm as duas linhas'],
    ['🅰️','<b>A</b>, <b>M</b> and <b>V</b> have a line <b>standing up</b>.','A, M e V: linha em pé'],
    ['🅱️','<b>C</b> and <b>B</b> have a line <b>LYING DOWN</b>. Careful — this is the trap!','C e B: linha DEITADA — a pegadinha'],
    ['❌','<b>G</b>, <b>P</b>, <b>J</b> and <b>R</b> have no line of symmetry.','G, P, J e R não têm'],
    ['👩','The word <b>MOM</b> has symmetry: the Mira goes standing up, in the middle of the O.','MOM: a Mira no meio do O']
   ]},
   pick:3,
   bank:[
    {t:'mc',q:'Which letter has a line of symmetry?',qpt:'Que letra tem linha de simetria?',opts:[
      {en:'X',pt:'em pé e deitada',ok:true},{en:'J',pt:'não tem',ok:false},{en:'P',pt:'não tem',ok:false}]},
    {t:'mc',q:'Which letter has NO line of symmetry?',qpt:'Que letra NÃO tem linha de simetria?',opts:[
      {en:'R',pt:'não tem',ok:true},{en:'A',pt:'tem, em pé',ok:false},{en:'M',pt:'tem, em pé',ok:false}]},
    {t:'mc',q:'The letter C has a line of symmetry that is…',qpt:'A letra C tem a linha de simetria…',opts:[
      {en:'Lying down',pt:'deitada',ok:true},{en:'Standing up',pt:'em pé',ok:false},{en:'It has none',pt:'não tem nenhuma',ok:false}]},
    {t:'mc',q:'The letter O has…',qpt:'A letra O tem…',opts:[
      {en:'More than one line of symmetry',pt:'mais de uma linha',ok:true},
      {en:'No line of symmetry',pt:'nenhuma',ok:false},
      {en:'Only a lying-down line',pt:'só a deitada',ok:false}]},
    {t:'mc',q:'Where do you put the Mira on MOM?',qpt:'Onde se põe a Mira em MOM?',opts:[
      {en:'Standing up, in the middle of the O',pt:'em pé, no meio do O',ok:true},
      {en:'Lying down, under the word',pt:'deitada, embaixo',ok:false},
      {en:'After the last M',pt:'depois do último M',ok:false}]},
    {t:'mc',q:'Which word shows symmetry?',qpt:'Que palavra tem simetria?',opts:[
      {en:'WOW',pt:'como MOM',ok:true},{en:'CAT',pt:'',ok:false},{en:'DOG',pt:'',ok:false}]},
    {t:'sort',q:'Does this letter have symmetry?',qpt:'Esta letra tem simetria?',
     buckets:[{id:'sim',en:'Has symmetry',pt:'tem simetria',color:'#34d399'},
              {id:'nao',en:'No symmetry',pt:'não tem',color:'#fb7185'}],
     items:[{en:'The letter O',pt:'a letra O',b:'sim'},{en:'The letter X',pt:'a letra X',b:'sim'},
            {en:'The letter A',pt:'a letra A',b:'sim'},{en:'The letter M',pt:'a letra M',b:'sim'},
            {en:'The letter C',pt:'a letra C — linha deitada',b:'sim'},{en:'The letter B',pt:'a letra B — linha deitada',b:'sim'},
            {en:'The letter G',pt:'a letra G',b:'nao'},{en:'The letter P',pt:'a letra P',b:'nao'},
            {en:'The letter J',pt:'a letra J',b:'nao'},{en:'The letter R',pt:'a letra R',b:'nao'}],pick:5}
   ]},

 /* ===== FASE 7 — slide, flip, turn e a colcha ===== */
 { id:'f7', icon:'🔄', color:'#60a5fa',
   name:'Slide, flip and turn', namePt:'os padrões e a colcha',
   anchor:'Slide = it walks · Flip = mirror · Turn = it spins.',
   anchorPt:'Slide = anda · Flip = espelho · Turn = gira.',
   lesson:{lines:[
    ['➡️','<b>Slide</b>: the figure walks to the next spot. No spinning, no mirror.','deslizar'],
    ['🪞','<b>Flip</b>: the figure shows its <b>mirror image</b>.','virar'],
    ['🔃','<b>Turn</b>: the figure spins around a point, like a clock hand.','girar'],
    ['🧵','A <b>repeating pattern</b> is a little piece that comes again and again. You can make one with <b>just one figure</b>.','com uma figura só'],
    ['🔒','What never changes: the number of sides, the number of vertices, the size and the name.','a figura continua a mesma'],
    ['🧩','The <b>quilt</b> is a 3 by 3 grid, blocks 1 to 9. From block 1: down two, one right, up one, one left → block <b>4</b>.','a colcha']
   ]},
   pick:3,
   bank:[
    {t:'mc',q:'Which move makes the figure walk to the next spot without spinning?',qpt:'Que movimento faz a figura andar sem rodar?',opts:[
      {en:'Slide',pt:'deslizar',ok:true},{en:'Flip',pt:'virar',ok:false},{en:'Turn',pt:'girar',ok:false}]},
    {t:'mc',q:'Which move shows the mirror image?',qpt:'Que movimento mostra a imagem no espelho?',opts:[
      {en:'Flip',pt:'virar',ok:true},{en:'Slide',pt:'deslizar',ok:false},{en:'Turn',pt:'girar',ok:false}]},
    {t:'mc',q:'Which move spins the figure around a point?',qpt:'Que movimento faz a figura rodar em volta de um ponto?',opts:[
      {en:'Turn',pt:'girar',ok:true},{en:'Slide',pt:'deslizar',ok:false},{en:'Flip',pt:'virar',ok:false}]},
    {t:'mc',q:'A triangle turns. How many sides does it have now?',qpt:'Um triângulo gira. Quantos lados ele tem agora?',opts:[
      {en:'Still 3',pt:'ainda 3',ok:true},{en:'Now 4',pt:'',ok:false},{en:'Now 0',pt:'',ok:false}]},
    {t:'mc',q:'When a figure slides, flips or turns, what changes?',qpt:'Quando a figura desliza, vira ou gira, o que muda?',opts:[
      {en:'Where it is and which way it faces',pt:'o lugar e o lado para onde aponta',ok:true},
      {en:'The number of sides',pt:'o número de lados',ok:false},
      {en:'The name of the figure',pt:'o nome da figura',ok:false}]},
    {t:'mc',q:'To draw the quilt border pattern, how many different figures do you need?',qpt:'Para o padrão da borda da colcha, quantas figuras diferentes?',opts:[
      {en:'Just one',pt:'uma só',ok:true},{en:'Three',pt:'três',ok:false},{en:'One for each block',pt:'uma por bloco',ok:false}]},
    {t:'mc',q:'Start in block 1. Go straight down two blocks. Which block are you in?',qpt:'Comece no bloco 1 e desça dois. Em que bloco você está?',opts:[
      {en:'Block 7',pt:'1 → 4 → 7',ok:true},{en:'Block 3',pt:'',ok:false},{en:'Block 2',pt:'',ok:false}]},
    {t:'sort',q:'Slide, flip or turn?',qpt:'Deslizar, virar ou girar?',
     buckets:[{id:'sl',en:'Slide',pt:'deslizar',color:'#60a5fa'},
              {id:'fl',en:'Flip',pt:'virar',color:'#f472b6'},
              {id:'tu',en:'Turn',pt:'girar',color:'#fbbf24'}],
     items:[{en:'It walks to the next spot',pt:'anda para o lugar de perto',b:'sl'},
            {en:'It moves without spinning',pt:'move sem rodar',b:'sl'},
            {en:'You see its mirror image',pt:'vê-se a imagem no espelho',b:'fl'},
            {en:'It flips over, like a pancake',pt:'vira do avesso',b:'fl'},
            {en:'It spins around a point',pt:'roda em volta de um pontinho',b:'tu'},
            {en:'It goes round like a clock hand',pt:'roda como o ponteiro do relógio',b:'tu'}],pick:4}
   ]},

 /* ===== CHEFE FINAL ===== */
 { id:'bossF', boss:true, final:true, icon:'🐉', color:'#f43f5e',
   name:'The Great Shape Challenge', namePt:'tudo o que você aprendeu',
   intro:'Win 6 questions from the WHOLE quest to get every badge!',
   introPt:'Vença 6 perguntas da aventura inteira para ganhar todos os emblemas!',
   from:['f1','f2','f3','f4','f5','f6','f7'], count:6 }
 ]
};

SERA_ADV.boot(ADVENTURE);
