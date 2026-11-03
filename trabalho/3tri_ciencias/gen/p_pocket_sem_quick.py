# Paulo 03/11: tira o "Quick review" do pocket (nao revisava nada util); o espaco vai para traducoes no formato .pt.
# Traducoes reaproveitam as da teoria (ja liberadas). Golf e picking fruit saem (tirados da teoria por ambiguidade).
P='../../../ferramentas/CIE3_pocket.html'
t=open(P,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:90]; t=t.replace(a,b)
r("""  <footer class="chk">
    <h2>&#9989; Quick review <span class="pt in">Revisão rápida</span></h2>
    <ol><li>A top <b>spins</b>.</li><li>Opening a drawer is a <b>pull</b>.</li><li>A tornado is <b>harmful</b>.</li><li>The ball is <b>under</b> the table.</li><li>The Auditorium is <b>between</b> A and B sections.</li><li>The Eiffel Tower from below: seen from the <b>bottom</b>.</li></ol>
  </footer>
""","")
# preposicoes: palavra + traducao
r("""var P=[['in','The bear is in the box.'],['on','The apple is on the book.'],['under','The ball is under the table.'],['behind','The boy is behind the tree.'],['in-front-of','The dog is in front of the chair.'],['between','The bear is between the plants.'],['next-to','The clock is next to the lamp.'],['near','The tree is near the house.'],['far-from','The tree is far from the house.'],['above','The lamp is above the table.'],['below','The cat is below the shelf.'],['inside','The fish is inside the bowl.']];
document.getElementById('prep').innerHTML=P.map(function(p){return '<div><img src="media/cie3/prep-'+p[0]+'.jpg" alt=""><b>'+p[0].replace(/-/g,' ')+'</b>'+p[1]+'</div>';}).join('');""",
"""var P=[['in','The bear is in the box.','dentro'],['on','The apple is on the book.','sobre, em cima'],['under','The ball is under the table.','embaixo'],['behind','The boy is behind the tree.','atrás'],['in-front-of','The dog is in front of the chair.','na frente'],['between','The bear is between the plants.','entre'],['next-to','The clock is next to the lamp.','ao lado'],['near','The tree is near the house.','perto'],['far-from','The tree is far from the house.','longe'],['above','The lamp is above the table.','acima'],['below','The cat is below the shelf.','abaixo'],['inside','The fish is inside the bowl.','dentro']];
document.getElementById('prep').innerHTML=P.map(function(p){return '<div><img src="media/cie3/prep-'+p[0]+'.jpg" alt=""><b>'+p[0].replace(/-/g,' ')+' <span class="pt in">'+p[2]+'</span></b>'+p[1]+'</div>';}).join('');""")
# sala: traducao de cada linha
sala=[('pizza <b>in</b> the box','pizza dentro da caixa'),('guitar <b>between</b> the lamp and the plant','violão entre o abajur e a planta'),('two dogs <b>under</b> the table','dois cachorros embaixo da mesa'),('window <b>behind</b> the sofa','janela atrás do sofá'),('racket <b>next to</b> the bag','raquete ao lado da mochila'),('cheese <b>on</b> the plate','queijo sobre o prato'),('rug <b>in front of</b> the sofa','tapete na frente do sofá'),('lamp <b>under</b> the shelf','abajur embaixo da prateleira'),('trophy <b>between</b> the books','troféu entre os livros'),('picture <b>on</b> the wall','quadro na parede'),('two fish <b>in</b> the bowl','dois peixes no aquário')]
velho='<li>'+'</li><li>'.join(a for a,_ in sala)+'</li>'
r(velho,''.join('<li>%s <span class="pt in">· %s</span></li>'%(a,b) for a,b in sala))
# mapa
r("""<b>LEFT</b> ← → <b>RIGHT</b>.""","""<b>LEFT</b> <span class="pt in">esquerda</span> ← → <b>RIGHT</b> <span class="pt in">direita</span>. Left and right: the sides of the person looking at the map.<span class="pt">Esquerda e direita: os lados de quem olha o mapa.</span>""")
# movimentos: definicao traduzida (igual a teoria)
r("""var M=[['bounce','#ca8a04','go up and down after hitting a surface','quica',""","""var M=[['bounce','#ca8a04','go up and down after hitting a surface','quica','subir e descer depois de bater numa superfície',""")
r("""['fly','#0284c7','move through the air','voa',""","""['fly','#0284c7','move through the air','voa','mover-se pelo ar',""")
r("""['roll','#db2777','move by turning over and over','rola',""","""['roll','#db2777','move by turning over and over','rola','mover-se virando e virando',""")
r("""['slide','#7c3aed','move smoothly along a surface','desliza',""","""['slide','#7c3aed','move smoothly along a surface','desliza','mover-se suavemente sobre uma superfície',""")
r("""['spin','#ea580c','turn around and around','gira',""","""['spin','#ea580c','turn around and around','gira','dar voltas e voltas',""")
r("""['swing','#16a34a','move back and forth like a pendulum','balança',""","""['swing','#16a34a','move back and forth like a pendulum','balança','ir e voltar como um pêndulo',""")
r("""<span class="ex">'+m[4].map(""","""<span class="ex">'+m[5].map(""")
r("""}).join('')+'</span>'+m[2]+'</div>';}).join('');""","""}).join('')+'</span>'+m[2]+'<span class="pt">'+m[4]+'</span></div>';}).join('');""")
r("""<div class="dv"><span>back and forth</span><span>up and down</span><span>round and round</span><span>slow · fast</span></div>""",
  """<div class="dv"><span>back and forth <span class="pt in">vai e volta</span></span><span>up and down <span class="pt in">sobe e desce</span></span><span>round and round <span class="pt in">gira e gira</span></span><span>slow · fast <span class="pt in">devagar · rápido</span></span></div>""")
# push/pull: legendas traduzidas; sai golf e picking fruit
for a,b in [('alt="">bike</figure>','alt="">bike <span class="pt in">bicicleta</span></figure>'),('alt="">box</figure>','alt="">box <span class="pt in">caixa</span></figure>'),('alt="">door</figure>','alt="">door <span class="pt in">porta</span></figure>'),('alt="">kick a ball</figure>','alt="">kick a ball <span class="pt in">chutar a bola</span></figure>'),
            ('alt="">rope</figure>','alt="">rope <span class="pt in">corda</span></figure>'),('alt="">wagon</figure>','alt="">wagon <span class="pt in">carrinho</span></figure>'),('alt="">drawer</figure>','alt="">drawer <span class="pt in">gaveta</span></figure>'),('alt="">fishing</figure>','alt="">fishing <span class="pt in">pescar</span></figure>')]: r(a,b)
r("""          trolley · volleyball · golf</div>""","""          shopping trolley · volleyball<span class="pt">carrinho de compras · vôlei</span></div>""")
r("""          kite rope · picking fruit</div>""","""          the rope of a kite<span class="pt">a linha da pipa</span></div>""")
# vento e agua: legendas traduzidas
for a,b in [('alt="">water the plants</figure>','alt="">water the plants <span class="pt in">regar as plantas</span></figure>'),('alt="">water: energy</figure>','alt="">water: energy <span class="pt in">água: energia</span></figure>'),('alt="">wind: energy</figure>','alt="">wind: energy <span class="pt in">vento: energia</span></figure>'),('alt="">wind spreads seeds</figure>','alt="">wind spreads seeds <span class="pt in">espalha sementes</span></figure>'),
            ('alt="">heavy rain, floods</figure>','alt="">heavy rain, floods <span class="pt in">chuva forte, enchentes</span></figure>'),('alt="">strong winds</figure>','alt="">strong winds <span class="pt in">ventos fortes</span></figure>')]: r(a,b)
# perspectiva
r("""<figure><img src="media/cie3/view-front.jpg" alt="">front</figure><figure><img src="media/cie3/view-top.jpg" alt="">top</figure><figure><img src="media/cie3/view-side.jpg" alt="">side</figure><figure><img src="media/cie3/view-bottom.jpg" alt="">bottom</figure>""",
  """<figure><img src="media/cie3/view-front.jpg" alt="">front <span class="pt in">frente</span></figure><figure><img src="media/cie3/view-top.jpg" alt="">top <span class="pt in">de cima</span></figure><figure><img src="media/cie3/view-side.jpg" alt="">side <span class="pt in">lado</span></figure><figure><img src="media/cie3/view-bottom.jpg" alt="">bottom <span class="pt in">de baixo</span></figure>""")
# animais e corpo
r("""<div class="bx"><h3>Animals</h3>fish <b>swims</b> · bird <b>flies</b> · monkey <b>climbs</b> · dog <b>walks, runs</b> · frog, kangaroo <b>jump</b> · snake <b>crawls</b></div>""",
  """<div class="bx"><h3>Animals</h3>fish <b>swims</b> · bird <b>flies</b> · monkey <b>climbs</b> · dog <b>walks, runs</b> · frog, kangaroo <b>jump</b> · snake <b>crawls</b><span class="pt">peixe nada · pássaro voa · macaco escala · cachorro anda, corre · sapo, canguru pulam · cobra rasteja</span></div>""")
r("""<b>Body:</b> swim, climb, play, walk, pick, sit<br><b>Hand:</b> touch, lift, point, write, grab, push</div>""",
  """<b>Body:</b> swim, climb, play, walk, pick, sit<span class="pt">nadar, subir, brincar, andar, colher, sentar</span><b>Hand:</b> touch, lift, point, write, grab, push<span class="pt">tocar, levantar, apontar, escrever, agarrar, empurrar</span></div>""")
open(P,'w',encoding='utf-8',newline='').write(t)
print('ok')
