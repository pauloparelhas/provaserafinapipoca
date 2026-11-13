/* ============================================================
   MAT3_estudo_licoes.js — as 7 LIÇÕES da teoria de Math Y2, 3º trimestre
   (prova em INGLÊS em 18/11/2026). Criado em 13/11/2026.
   Fonte única: trabalho/3tri_matematica/_roteiro.md (NÃO COBRAR fica fora; INFERIDO não entra).
   Conceitos-base: trabalho/3tri_matematica/avaliacao/conceitos_base.json — todo termo é definido
   ANTES ou NA MESMA TELA do 1º uso; o conceito-mãe abre cada lição.

   Molde (teoria = mapa mental visual, Paulo 08–09/11): título-conceito → figura REAL da aula
   (recortes em media/mat3/teoria/, gen/teoria_mat3_recorta.py) ou desenho do MAT3_figuras.js →
   2–4 linhas "termo — explicação". Sem perguntas, sem oclusão, sem atividade (questões: simulado).
   Tudo visível em INGLÊS; português só em <span class="tr"> (a bandeira liga body.show-tr).
   `fala` (voz) só em inglês. Avisos do roteiro: divisão par/ímpar só "into 2 groups"; não se conta
   vértice do cone nem aresta do cilindro; "unlikely = small chance to happen".
   Lido também por MAT3_teoria_pdf.html (versão para imprimir).
   ============================================================ */
window.MAT3_LICOES = (function(){
'use strict';
var F = window.MAT3F || {};
function tr(pt){ return pt ? '<span class="tr" lang="pt-BR">'+pt+'</span>' : ''; }
function I(n){ return 'media/mat3/teoria/'+n+'.jpg'; }
/* linha: termo (rótulo) — explicação curta */
function LN(t,e,pt){ return '<p class="ml" lang="en"><b class="mt rot">'+t+'</b>'+(e?' — '+e:'')+tr(pt)+'</p>'; }
/* definição de conceito-base: frase inteira "Termo é ..." (casa com o "def" do conceitos_base.json) */
function D(t,e,pt){ return '<p class="ml" lang="en"><b class="mt rot">'+t+'</b> '+e+tr(pt)+'</p>'; }
/* figura da aula (jpg) ou desenho SVG, com legenda curta */
function FIG(img,cap,cpt){
  var corpo = img.charAt(0)==='<' ? (img.indexOf('esc5')>=0||img.indexOf('tabgraf')>=0 ? img : '<div class="fsvg">'+img+'</div>')
            : '<img src="'+I(img)+'" alt="'+(cap||'').replace(/"/g,'')+'">';
  return '<figure class="mfig">'+corpo+(cap?'<figcaption lang="en">'+cap+tr(cpt)+'</figcaption>':'')+'</figure>';
}
/* molde 1: figura + linhas */
function M(img,cap,cpt,linhas,cl){ return '<div class="m1'+(cl?' '+cl:'')+'">'+FIG(img,cap,cpt)+'<div class="mlin">'+linhas.join('')+'</div></div>'; }
/* molde 2: colunas iguais (figura + linhas); o.antes = linhas acima das colunas (definição primeiro) */
function MC(cols,o){ o=o||{};
  return (o.antes?'<div class="mlin">'+o.antes.join('')+'</div>':'')+
    '<div class="mg cont" style="--mc:'+cols.length+'">'+cols.map(function(c){
      return '<div class="mcol">'+FIG(c[0],c[1],c[2])+(c[3]&&c[3].length?'<div class="mlin">'+c[3].join('')+'</div>':'')+'</div>'; }).join('')+'</div>'; }
/* SVG de sólido com o nome embaixo */
function SOL(n){ return F.solido ? F.solido(n) : ''; }
/* escala da probabilidade (a do slide): só escreve as palavras já ensinadas; on = destacadas */
function ESC(escritas,on){
  var P=['certain','likely','possible','unlikely','impossible'];
  return '<div class="esc5" aria-hidden="true"><i></i>'+P.map(function(p){
    var w=escritas.indexOf(p)>=0; return '<span class="'+(on.indexOf(p)>=0?'on':'')+'">'+(w?p:'&nbsp;')+'</span>'; }).join('')+'</div>';
}
function T(tit,fala,html){ return {tipo:'texto', ocl:false, tit:tit, fala:fala, html:html}; }

var LS=[

/* ===================== T1 · Words to compare and measure (U8) ===================== */
{k:'medir', tema:'medir', unid:8, nome:'Words to compare and measure', nome_pt:'Palavras para comparar e medir',
 curto:'Length', curto_pt:'Comprimento', capa:'t1_long', cor:'#d97706', treino:[], telas:[
 T('What is <em>length</em>?'+tr('O que é comprimento?'),
  'What is length? Length is how long something is, from one end to the other. Long means how much something measures from one end to the other. This pencil is long. We measure length in centimetres, metres and kilometres.',
  M('t1_long','A long pencil','Um lápis comprido',[
   D('Length','is how long something is, from one end to the other.','Comprimento (length) é o quanto algo é comprido, de uma ponta à outra.'),
   D('Long','means how much something measures from one end to the other: “This pencil is long.”','Long (comprido) quer dizer quanto algo mede de uma ponta à outra: “Este lápis é comprido.”'),
   LN('Units','we measure length in centimetres (cm), metres (m) and kilometres (km).','Unidades: medimos o comprimento em centímetros (cm), metros (m) e quilômetros (km).')])),
 T('<em>Short</em>, longer and shorter'+tr('Curto, mais comprido e mais curto'),
  'Short means not as long. It measures a smaller length from one end to the other. This pencil is short. The top pencil is longer. The bottom pencil is shorter.',
  M('t1_short','Longer and shorter','Mais comprido e mais curto',[
   D('Short','means not as long: it measures a smaller length from one end to the other. “This pencil is short.”','Short (curto) quer dizer não tão comprido: mede menos de uma ponta à outra. “Este lápis é curto.”'),
   LN('Longer','the top pencil is longer.','Longer (mais comprido): o lápis de cima é mais comprido.'),
   LN('Shorter','the bottom pencil is shorter.','Shorter (mais curto): o lápis de baixo é mais curto.')])),
 T('<em>Wide</em> and narrow'+tr('Largo e estreito'),
  'Wide means how much something measures across. This book is wide. Narrow means not wide. The thin book is narrow. The big book is wider.',
  M('t1_wide','A narrow book and a wide book','Um livro estreito e um livro largo',[
   D('Wide','means how much something measures across: “This book is wide.”','Wide (largo) quer dizer quanto algo mede de lado a lado: “Este livro é largo.”'),
   D('Narrow','means not wide: the thin book is narrow.','Narrow (estreito) quer dizer não largo: o livro fino é estreito.'),
   LN('Wider','the big book is wider.','Wider (mais largo): o livro grande é mais largo.')])),
 T('<em>Tall</em> and height'+tr('Alto e altura'),
  'Tall means how high something is, from the bottom to the top. This tree is tall. The big tree is taller. The small tree is shorter. Height is how tall someone or something is. We also use tall to talk about the height of people. This girl is tall.',
  M('t1_tall','Trees and children','Árvores e crianças',[
   D('Tall','means how high something is, from the bottom to the top: “This tree is tall.”','Tall (alto) quer dizer quanto algo é alto, de baixo até em cima: “Esta árvore é alta.”'),
   LN('Taller and shorter','the big tree is taller; the small tree is shorter.','Taller (mais alta) e shorter (mais baixa): a árvore grande é mais alta; a pequena é mais baixa.'),
   D('Height','is how tall someone or something is. We also use tall to talk about the height of people: “This girl is tall.”','Height (altura) é o quanto alguém ou algo é alto. Também usamos tall para a altura das pessoas: “Esta menina é alta.”')]))
]},

/* ===================== T2 · Perimeter (U8) ===================== */
{k:'perimetro', tema:'perimetro', unid:8, nome:'Perimeter', nome_pt:'Perímetro',
 curto:'Perimeter', curto_pt:'Perímetro', capa:'t2_add', cor:'#dc2626', treino:[], telas:[
 T('What is <em>perimeter</em>?'+tr('O que é perímetro?'),
  'What is perimeter? Perimeter is the total distance around a shape. A side is one of the straight lines of a flat shape. A rectangle has 4 sides. Around means along all the sides of the shape.',
  M('t2_def','Perimeter: the distance around','Perímetro: a distância em volta',[
   D('Perimeter','is the total distance around a shape.','Perímetro é a distância total em volta de uma forma.'),
   D('A side','is one of the straight lines of a flat shape. A rectangle has 4 sides.','Um lado (side) é uma das linhas retas de uma forma plana. O retângulo tem 4 lados.'),
   D('Around','means along all the sides of the shape. We also say “distance around”.','Around (em volta) quer dizer por todos os lados da forma. Também dizemos “distância em volta”.')])),
 T('Add all the <em>sides</em>!'+tr('Some todos os lados!'),
  'Add all the sides! Top, 6 centimetres. Bottom, 6 centimetres. Left side, 4 centimetres. Right side, 4 centimetres. 6 plus 6 plus 4 plus 4 equals 20 centimetres. Always write the number and the unit.',
  M('t2_add','Top, bottom, left side, right side','Em cima, embaixo, lado esquerdo, lado direito',[
   LN('Top and bottom','6 cm + 6 cm.','Em cima e embaixo: 6 cm + 6 cm.'),
   LN('Left side and right side','4 cm + 4 cm.','Lado esquerdo e lado direito: 4 cm + 4 cm.'),
   LN('Perimeter','6 + 6 + 4 + 4 = 20 cm.','Perímetro: 6 + 6 + 4 + 4 = 20 cm.'),
   LN('The unit','always write the number and the unit: 20 cm.','A unidade: escreva sempre o número e a unidade: 20 cm.')])),
 T('More <em>shapes</em>'+tr('Outras formas'),
  'Other examples. Square: 5 plus 5 plus 5 plus 5 equals 20 centimetres. Rectangle: 8 plus 8 plus 3 plus 3 equals 22 centimetres. Triangle: 6 plus 6 plus 6 equals 18 centimetres.',
  MC([['t2_sq','square','quadrado',[LN('Square','5 + 5 + 5 + 5 = 20 cm.','Quadrado: 5 + 5 + 5 + 5 = 20 cm.')]],
      ['t2_rect','rectangle','retângulo',[LN('Rectangle','8 + 8 + 3 + 3 = 22 cm.','Retângulo: 8 + 8 + 3 + 3 = 22 cm.')]],
      ['t2_tri','triangle','triângulo',[LN('Triangle','6 + 6 + 6 = 18 cm.','Triângulo: 6 + 6 + 6 = 18 cm.')]]]))
]},

/* ===================== T3 · 3-D solids (U6) ===================== */
{k:'solidos', tema:'solidos', unid:6, nome:'3D solids', nome_pt:'Sólidos geométricos',
 curto:'3D solids', curto_pt:'Sólidos', capa:'t3_def', cor:'#7c3aed', treino:[], telas:[
 T('What is a <em>3D solid</em>?'+tr('O que é um sólido geométrico?'),
  'What is a 3D solid? A 3D solid is a solid shape that has faces, edges and vertices. A cube is a 3D solid. A face is a flat surface of a 3D solid. An edge is a straight line where two faces meet. A vertex is a corner where two or more edges meet. More than one vertex: vertices.',
  M('t3_def','A cube','Um cubo',[
   D('A 3D solid','is a solid shape that has faces, edges and vertices. A cube is a 3D solid.','Um sólido geométrico (3D solid) é uma forma sólida que tem faces, arestas e vértices. O cubo é um sólido.'),
   D('A face','is a flat (straight) surface of a 3D solid.','Uma face é uma superfície plana (reta) do sólido.'),
   D('An edge','is a straight line where two faces meet.','Uma aresta (edge) é uma linha reta onde duas faces se encontram.'),
   D('A vertex','is a corner where two or more edges meet. More than one vertex: vertices.','Um vértice (vertex) é um canto onde duas ou mais arestas se encontram. Mais de um: vertices.')])),
 T('The <em>cube</em>'+tr('O cubo'),
  'The cube. A cube has 6 faces. A cube has 8 vertices. A cube has 12 edges.',
  M('t3_fev','A cube has 6 faces, 8 vertices and 12 edges','O cubo tem 6 faces, 8 vértices e 12 arestas',[
   LN('Faces','a cube has 6 faces.','Faces: o cubo tem 6 faces.'),
   LN('Vertices','a cube has 8 vertices.','Vértices: o cubo tem 8 vértices.'),
   LN('Edges','a cube has 12 edges.','Arestas: o cubo tem 12 arestas.')])),
 T('Cube, cuboid and <em>pyramid</em>'+tr('Cubo, bloco retangular e pirâmide'),
  'Cube: 6 faces, 12 edges, 8 vertices. Cuboid: 6 faces, 12 edges, 8 vertices. It looks like a cube, but its edges are not all the same length. Pyramid: 5 faces, 8 edges, 5 vertices.',
  MC([[SOL('cube'),'cube','cubo',[LN('Cube','6 faces, 12 edges, 8 vertices.','Cubo: 6 faces, 12 arestas, 8 vértices.')]],
      [SOL('cuboid'),'cuboid','bloco retangular',[LN('Cuboid','6 faces, 12 edges, 8 vertices. It looks like a cube, but its edges are not all the same length.','Bloco retangular: 6 faces, 12 arestas, 8 vértices. Parece um cubo, mas as arestas não têm todas o mesmo comprimento.')]],
      [SOL('pyramid'),'pyramid','pirâmide',[LN('Pyramid','5 faces, 8 edges, 5 vertices.','Pirâmide: 5 faces, 8 arestas, 5 vértices.')]]])),
 T('Flat or <em>curved</em>?'+tr('Plana ou curva?'),
  'Flat or curved? A curved surface is round, not flat. A cylinder, a cone and a sphere have a curved surface. Cylinder: 2 flat faces and 1 curved surface. Cone: 1 flat face and 1 curved surface. Sphere: 1 curved surface. No flat face, no edges, no vertices.',
  MC([[SOL('cylinder'),'cylinder','cilindro',[LN('Cylinder','2 flat faces and 1 curved surface.','Cilindro: 2 faces planas e 1 superfície curva.')]],
      [SOL('cone'),'cone','cone',[LN('Cone','1 flat face and 1 curved surface.','Cone: 1 face plana e 1 superfície curva.')]],
      [SOL('sphere'),'sphere','esfera',[LN('Sphere','1 curved surface. No flat face, no edges, no vertices.','Esfera: 1 superfície curva. Nenhuma face plana, nenhuma aresta, nenhum vértice.')]]],
     {antes:[D('A curved surface','is round, not flat. A cylinder, a cone and a sphere have a curved surface.','Uma superfície curva é arredondada, não é plana. Cilindro, cone e esfera têm superfície curva.')]})),
 T('Stay still or <em>roll</em>?'+tr('Fica parado ou rola?'),
  'Stay still or roll? Roll means to move by turning over and over, like a ball. A solid with flat faces can stay still on top of other flat surfaces. The cube cannot roll. A solid with a curved surface can roll away, like the sphere.',
  MC([[SOL('cube'),'cube','cubo',[LN('Flat faces','the cube can stay still on top of other flat surfaces. It cannot roll.','Faces planas: o cubo consegue ficar parado em cima de outras superfícies planas. Ele não rola.')]],
      [SOL('sphere'),'sphere','esfera',[LN('Curved surface','the sphere can roll away.','Superfície curva: a esfera pode sair rolando.')]]],
     {antes:[D('Roll','means to move by turning over and over, like a ball.','Rolar (roll) quer dizer mover-se girando sem parar, como uma bola.')]}))
]},

/* ===================== T4 · Data and bar graphs (U5) ===================== */
{k:'dados', tema:'dados', unid:5, nome:'Data and graphs', nome_pt:'Dados e gráficos',
 curto:'Data', curto_pt:'Dados', capa:'t4_bar', cor:'#0284c7', treino:[], telas:[
 T('What is <em>data</em>?'+tr('O que são dados?'),
  'What is data? Data is all the information we collect and find out. We organize it using charts and graphs. A piece of data is one simple fact. My favorite color is blue. I have 2 pets.',
  M('t4_data','Data in two charts','Dados em dois gráficos',[
   D('Data','is all the information we collect and find out. We organize it using charts and graphs.','Dados (data) são todas as informações que juntamos e descobrimos. Organizamos os dados em gráficos (charts e graphs).'),
   D('A piece of data','is one simple fact: “My favorite color is blue.” “I have 2 pets.”','Um dado é um fato simples: “Minha cor favorita é azul.” “Eu tenho 2 bichos de estimação.”'),
   LN('Charts and graphs','the two pictures organize data.','Gráficos: as duas figuras organizam dados.')])),
 T('A <em>bar graph</em>'+tr('Um gráfico de barras'),
  'A bar graph shows data with bars. The taller the bar, the more there are. Each bar is one group: hamsters, rabbits, dogs or cats. To find how many, look at the top of the bar and read the number on the side.',
  M('t4_bar','A bar graph about pets','Um gráfico de barras sobre bichos de estimação',[
   D('A bar graph','shows data with bars. The taller the bar, the more there are.','Um gráfico de barras mostra dados com barras. Quanto mais alta a barra, mais tem.'),
   LN('Each bar','one group: hamsters, rabbits, dogs or cats.','Cada barra: um grupo — hamsters, coelhos, cachorros ou gatos.'),
   LN('How many','look at the top of the bar and read the number on the side.','Quantos: olhe o topo da barra e leia o número do lado.')])),
 T('<em>Read</em> the bar graph'+tr('Ler o gráfico de barras'),
  'Read the bar graph. Hamsters 4. Rabbits 2. Dogs 6. Cats 3. The most: dogs, the tallest bar. The fewest: rabbits, the shortest bar.',
  M(F.barras?F.barras(['Hamsters','Rabbits','Dogs','Cats'],[4,2,6,3],6,''):'','The bar graph of the pets','O gráfico de barras dos bichos',[
   LN('How many','hamsters 4, rabbits 2, dogs 6, cats 3.','Quantos: hamsters 4, coelhos 2, cachorros 6, gatos 3.'),
   LN('The most','dogs: the tallest bar.','O maior número: cachorros, a barra mais alta.'),
   LN('The fewest','rabbits: the shortest bar.','O menor número: coelhos, a barra mais baixa.')])),
 T('Make a <em>bar graph</em>'+tr('Fazer um gráfico de barras'),
  'Make a bar graph. A table shows the numbers. Color each bar up to its number. Dogs: 6, so color the dogs bar up to 6.',
  M('<div class="tabgraf"><table class="mtab2"><tr><th>Hamsters</th><th>Rabbits</th><th>Dogs</th><th>Cats</th></tr><tr><td>4</td><td>2</td><td>6</td><td>3</td></tr></table>'+
     (F.barras?F.barras(['Hamsters','Rabbits','Dogs','Cats'],[4,2,6,3],6,''):'')+'</div>','From the table to the graph','Da tabela para o gráfico',[
   LN('The table','shows the number of each group.','A tabela mostra o número de cada grupo.'),
   LN('Color each bar','up to its number.','Pinte cada barra até o número dela.'),
   LN('Dogs: 6','color the dogs bar up to 6.','Cachorros: 6 — pinte a barra dos cachorros até o 6.')]))
]},

/* ===================== T5 · Probability (U5) ===================== */
{k:'prob', tema:'prob', unid:5, nome:'Probability', nome_pt:'Probabilidade',
 curto:'Probability', curto_pt:'Probabilidade', capa:'t5_likely', cor:'#c026d3', treino:[], telas:[
 T('What is <em>probability</em>?'+tr('O que é probabilidade?'),
  'What is probability? Probability is thinking about if something will happen, won\'t happen, or will maybe happen. Look at the arrow. At the top: it will happen. At the bottom: it won\'t happen.',
  M('t5_scale','From top to bottom','De cima para baixo',[
   D('Probability','is thinking about if something will happen, won’t happen, or will maybe happen.','Probabilidade é pensar se uma coisa vai acontecer, não vai acontecer ou talvez aconteça.'),
   LN('The arrow','at the top, it will happen; at the bottom, it won’t happen.','A seta: em cima, vai acontecer; embaixo, não vai acontecer.')])),
 T('<em>Certain</em> and <em>impossible</em>'+tr('Certo e impossível'),
  'Certain means we know it will happen. I will eat dinner tonight. Impossible means we know it won\'t happen. I will eat rocks for dinner. A unicorn carries you to bed.',
  M(ESC(['certain','impossible'],['certain','impossible']),'The top and the bottom','O topo e a base',[
   D('Certain','means we know it will happen: “I will eat dinner tonight.”','Certain (certo) quer dizer que sabemos que vai acontecer: “Vou jantar hoje à noite.”'),
   D('Impossible','means we know it won’t happen: “I will eat rocks for dinner.” “A unicorn carries you to bed.”','Impossible (impossível) quer dizer que sabemos que não vai acontecer: “Vou jantar pedras.” “Um unicórnio leva você para a cama.”')])),
 T('<em>Likely</em> and <em>unlikely</em>'+tr('Provável e pouco provável'),
  'Likely means big chance to happen. You will find students in the school. Unlikely means small chance to happen. You will see a penguin in the desert.',
  M('t5_likely','Likely and unlikely','Provável e pouco provável',[
   D('Likely','means big chance to happen: “You will find students in the school.”','Likely (provável) quer dizer grande chance de acontecer: “Você vai encontrar alunos na escola.”'),
   D('Unlikely','means small chance to happen: “You will see a penguin in the desert.”','Unlikely (pouco provável) quer dizer pequena chance de acontecer: “Você vai ver um pinguim no deserto.”')])),
 T('<em>Possible</em>'+tr('Possível'),
  'Possible means it will maybe happen. I will eat spaghetti for dinner. I will read a book. From the top: certain, likely, possible, unlikely, impossible.',
  M(ESC(['certain','likely','possible','unlikely','impossible'],['possible']),'All five, from the top','As cinco, de cima para baixo',[
   D('Possible','means it will maybe happen: “I will eat spaghetti for dinner.” “I will read a book.”','Possible (possível) quer dizer que talvez aconteça: “Vou jantar espaguete.” “Vou ler um livro.”'),
   LN('From the top','certain, likely, possible, unlikely, impossible.','De cima para baixo: certo, provável, possível, pouco provável, impossível.')]))
]},

/* ===================== T6 · Multiplication: making groups (U10) ===================== */
{k:'mult', tema:'mult', unid:10, nome:'Multiplication: making groups', nome_pt:'Multiplicação: formando grupos',
 curto:'Multiplication', curto_pt:'Multiplicação', capa:'t6_ex1', cor:'#ea580c', treino:[], telas:[
 T('What is <em>multiplication</em>?'+tr('O que é multiplicação?'),
  'What is multiplication? Multiplication is a shorter way to show repeated addition. We use it to find the total when we have equal groups. Equal groups have the same amount in each group. Repeated addition is adding the same number again and again.',
  M('t6_def','Multiplication','Multiplicação',[
   D('Multiplication','is a shorter way to show repeated addition. We use it to find the total when we have equal groups.','Multiplicação é um jeito mais curto de mostrar uma soma repetida. Usamos para achar o total quando temos grupos iguais.'),
   D('Equal groups','have the same amount in each group.','Grupos iguais têm a mesma quantidade em cada grupo.'),
   D('Repeated addition','is adding the same number again and again: 3 + 3 + 3 + 3.','Soma repetida é somar o mesmo número de novo e de novo: 3 + 3 + 3 + 3.')])),
 T('4 groups of <em>3</em>'+tr('4 grupos de 3'),
  'Four groups of three buttons. Repeated addition: 3 plus 3 plus 3 plus 3 equals 12. A multiplication sentence is the math written with numbers and signs: 4 times 3 equals 12. 3 plus 3 plus 3 plus 3 equals 12 is an addition sentence. 4 groups, 3 buttons in each group. 4 groups of 3 buttons are 12 buttons altogether.',
  M('t6_ex1','4 groups of 3 buttons','4 grupos de 3 botões',[
   LN('Repeated addition','3 + 3 + 3 + 3 = 12.','Soma repetida: 3 + 3 + 3 + 3 = 12.'),
   D('A multiplication sentence','is the math written with numbers and signs: 4 × 3 = 12. 3 + 3 + 3 + 3 = 12 is an addition sentence.','Uma sentença de multiplicação é a conta escrita com números e sinais: 4 × 3 = 12. 3 + 3 + 3 + 3 = 12 é uma sentença de adição.'),
   LN('4 × 3','4 groups, 3 buttons in each group.','4 × 3: 4 grupos, 3 botões em cada grupo.'),
   LN('Altogether','4 groups of 3 buttons are 12 buttons altogether.','Ao todo: 4 grupos de 3 botões são 12 botões ao todo.')])),
 T('More <em>groups</em>'+tr('Mais grupos'),
  'Flowers: 5 plus 5 plus 5 equals 15, so 3 times 5 equals 15. 3 groups of 5 flowers are 15 flowers altogether. Cookies: 2 plus 2 plus 2 plus 2 plus 2 equals 10, so 5 times 2 equals 10. 5 groups of 2 cookies are 10 cookies altogether.',
  MC([['t6_ex2','3 groups of 5 flowers','3 grupos de 5 flores',[LN('Flowers','5 + 5 + 5 = 15, so 3 × 5 = 15. 3 groups of 5 flowers are 15 flowers altogether.','Flores: 5 + 5 + 5 = 15, então 3 × 5 = 15. 3 grupos de 5 flores são 15 flores ao todo.')]],
      ['t6_ex3','5 groups of 2 cookies','5 grupos de 2 biscoitos',[LN('Cookies','2 + 2 + 2 + 2 + 2 = 10, so 5 × 2 = 10. 5 groups of 2 cookies are 10 cookies altogether.','Biscoitos: 2 + 2 + 2 + 2 + 2 = 10, então 5 × 2 = 10. 5 grupos de 2 biscoitos são 10 biscoitos ao todo.')]]])),
 T('Our <em>hands</em>'+tr('Nossas mãos'),
  'Our hands. 2 hands, 5 fingers on each hand. Repeated addition: 5 plus 5 equals 10. Multiplication sentence: 2 times 5 equals 10.',
  M(F.maos?F.maos(2):'','2 hands','2 mãos',[
   LN('2 hands','5 fingers on each hand.','2 mãos: 5 dedos em cada mão.'),
   LN('Repeated addition','5 + 5 = 10.','Soma repetida: 5 + 5 = 10.'),
   LN('Multiplication sentence','2 × 5 = 10.','Sentença de multiplicação: 2 × 5 = 10.')]))
]},

/* ===================== T7 · Division: equal sharing (U10) ===================== */
{k:'div', tema:'div', unid:10, nome:'Division: equal sharing', nome_pt:'Divisão: repartir igualmente',
 curto:'Division', curto_pt:'Divisão', capa:'t7_ex2', cor:'#16a34a', treino:[], telas:[
 T('What is <em>division</em>?'+tr('O que é divisão?'),
  'What is division? Division is a way to make equal groups of a number. We share a total into groups that have the same amount. Share equally means everybody gets the same amount. Mike and Laura share 10 oranges equally. 10 divided by 2 equals 5. Each one gets 5 oranges.',
  M('t7_ex1','Mike and Laura share 10 oranges','Mike e Laura repartem 10 laranjas',[
   D('Division','is a way to make equal groups of a number. We share a total into groups that have the same amount.','Divisão é um jeito de formar grupos iguais com um número. Repartimos um total em grupos com a mesma quantidade.'),
   D('Share equally','means everybody gets the same amount.','Repartir igualmente quer dizer que todos ganham a mesma quantidade.'),
   LN('Division sentence','10 ÷ 2 = 5: 10 oranges shared into 2 equal groups is 5 oranges in each group.','Sentença de divisão: 10 ÷ 2 = 5 — 10 laranjas repartidas em 2 grupos iguais dão 5 laranjas em cada grupo.')])),
 T('More <em>sharing</em>'+tr('Mais divisões'),
  '8 divided by 2 equals 4: 8 apples shared into 2 equal groups is 4 apples in each group. 12 divided by 3 equals 4: 12 cookies shared into 3 equal groups is 4 cookies in each group.',
  MC([['t7_ex2','8 apples, 2 groups','8 maçãs, 2 grupos',[LN('Apples','8 ÷ 2 = 4: 8 apples shared into 2 equal groups is 4 apples in each group.','Maçãs: 8 ÷ 2 = 4 — 8 maçãs repartidas em 2 grupos iguais dão 4 maçãs em cada grupo.')]],
      ['t7_ex3','12 cookies, 3 groups','12 biscoitos, 3 grupos',[LN('Cookies','12 ÷ 3 = 4: 12 cookies shared into 3 equal groups is 4 cookies in each group.','Biscoitos: 12 ÷ 3 = 4 — 12 biscoitos repartidos em 3 grupos iguais dão 4 biscoitos em cada grupo.')]]])),
 T('Even and odd: into <em>2</em> groups'+tr('Par e ímpar: em 2 grupos'),
  'Even and odd, into 2 groups. Even numbers, 0, 2, 4, 6, 8, 10, 12, can be shared equally into 2 groups. Odd numbers, 1, 3, 5, 7, 9: when we share them between 2, 1 is left. 8 between 2: 4 in each group. 7 between 2: 3 each, and 1 is left.',
  MC([[F.grupos?F.grupos(2,4,'apple'):'','8 apples, 2 groups','8 maçãs, 2 grupos',[LN('8 ÷ 2 = 4','4 in each group. Nothing is left.','8 ÷ 2 = 4: 4 em cada grupo. Não sobra nada.')]],
      [(F.grupos?F.grupos(2,3,'cookie'):'')+(F.soltos?F.soltos(1,'cookie'):''),'7 cookies, 2 friends','7 biscoitos, 2 amigos',[LN('7 between 2','3 each, and 1 is left.','7 entre 2: 3 para cada um, e sobra 1.')]]],
     {antes:[D('Even numbers','(0, 2, 4, 6, 8, 10, 12…) can be shared equally into 2 groups.','Números pares (0, 2, 4, 6, 8, 10, 12…) podem ser repartidos igualmente em 2 grupos.'),
             D('Odd numbers','(1, 3, 5, 7, 9…): when we share them between 2, 1 is left.','Números ímpares (1, 3, 5, 7, 9…): quando repartimos entre 2, sobra 1.')]}))
]}
];
return LS;
})();
