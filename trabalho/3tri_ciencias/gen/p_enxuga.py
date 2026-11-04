# Paulo 03/11 (noite): sai a licao 9 e tudo que veio do guia da Fernanda (pergunta-chave, arrastar dos animais, creditos);
# lacuna hachurada so onde nenhum arrastar treina o mesmo; lacuna com teto de 3 palavras; mao que mostra o toque;
# textos mais curtos nas telas e nos exercicios.
import re
L='../../../ferramentas/CIE3_estudo_licoes.js'
H='../../../ferramentas/CIE3_estudo.html'
X='../../../index.html'
s=open(L,encoding='utf-8').read()
def r(a,b,n=1):
    global s; assert s.count(a)==n,(s.count(a),a[:90]); s=s.replace(a,b)
D=lambda w:'<span class="dest">'+w+'</span>'

# ---- 1. tudo que veio do guia da Fernanda sai ----
s=re.sub(r"\+lembra\('(?:[^'\\]|\\.)*','(?:[^'\\]|\\.)*'\)",'',s)
assert 'lembra(' in s and s.count('lembra(')==1
r("function lembra(en,pt){ return '<div class=\"lembra\"><span class=\"lb-ic\">?</span><div>'+en+tr(pt)+'<small class=\"credito\">Idea inspired by Fernanda’s Study Guide.</small></div></div>'; }\n","")
i=s.index(" {tipo:'arrasta', tit:'How does it move?', fala:'Drag each word to the right animal.'"); j=s.index("\n",i)
s=s[:i]+s[j+1:]
i=s.index("/* ===================== 9. A STORY"); j=s.index("\n];\n})();",i)
s=s[:i].rstrip().rstrip(',')+s[j:]
s=s.replace("\n]},\n];","\n]}\n];")
assert 'Fernanda' not in s and 'historia' not in s

# ---- 2. resposta pode vir com as proprias lacunas (cada uma com ate 3 palavras) ----
r("function P(pede,pt,resp,rpt,f){ var q=pede+tr(pt)+'<br><b class=\"resp\">'+resp+'</b>'+(rpt?tr(rpt):'');",
  "function P(pede,pt,resp,rpt,f){ var q=pede+tr(pt)+'<br>'+(resp.indexOf('<b')>=0?'<span class=\"resp\">'+resp.replace(/<b>/g,'<b class=\"resp\">')+'</span>':'<b class=\"resp\">'+resp+'</b>')+(rpt?tr(rpt):'');")

# ---- 3. sem lacuna onde o arrastar logo depois treina o mesmo ----
for tit in ["{tipo:'texto', tit:'Where is it?',\n  fala:'Twister the tornado",
            "{tipo:'texto', tit:'Where is it?',\n  fala:'The boy is behind",
            "{tipo:'texto', tit:'In the room (1/2)',","{tipo:'texto', tit:'In the room (2/2)',",
            "{tipo:'texto', tit:'Left and right on the map',","{tipo:'texto', tit:'The Eiffel Tower',",
            "{tipo:'texto', tit:'Bounce and fly',","{tipo:'texto', tit:'Roll and slide',","{tipo:'texto', tit:'Spin and swing',",
            "{tipo:'texto', tit:'Push or pull?',","{tipo:'texto', tit:'Push',","{tipo:'texto', tit:'Pull',"]:
    r(tit,tit.replace("{tipo:'texto',","{tipo:'texto', ocl:false,"))

# ---- 4. textos mais curtos ----
# L1 na prova
r("P('Look at the picture. Which sentence is right? The fish is on the bowl. / The fish is inside the bowl.','Olhe a figura. Qual frase está certa?','The fish is inside the bowl.','O peixe está dentro do aquário.','prep-inside')",
  "P('Look at the picture. Where is the fish?','Olhe a figura. Onde está o peixe?','inside the bowl','dentro do aquário','prep-inside')")
# L2 na prova
r("P('Use the words in the box: behind, next to, in front of, over, in, on, between, under. There is a guitar ___ the lamp and the plant.','Use as palavras da caixa. Tem um violão ___ o abajur e a planta.','between','entre')",
  "P('There is a guitar ___ the lamp and the plant.','Tem um violão ___ o abajur e a planta.','between','entre')")
# L3 ler o mapa
r("""fala:'When we read maps we need to pay a lot of attention to the details and to the path, the way we are going. We might get lost if we run or don’t pay attention.',""",
  """fala:'The red pin marks a place. Pay attention to the details and to the path. We might get lost if we run.',""")
r("""R('The red <span class="dest">pin</span> marks a <span class="dest">place</span> on the map.','O pino vermelho marca um lugar no mapa.')+R('When we read maps we need to <span class="dest">pay a lot of attention</span> to the <span class="dest">details</span> and to the <span class="dest">path</span>, the way we are going.','Quando lemos mapas, precisamos prestar muita atenção aos detalhes e ao caminho que estamos seguindo.')+
   R('We might get <span class="dest">lost</span> if we <span class="dest">run</span> or <span class="dest">don’t pay attention</span>.','Podemos nos perder se corrermos ou não prestarmos atenção.')""",
  """R('The red pin marks a '+'<span class="dest">place</span>.','O pino vermelho marca um lugar.')+R('Pay attention to the <span class="dest">details</span> and to the <span class="dest">path</span>.','Preste atenção aos detalhes e ao caminho.')+
   R('We might get <span class="dest">lost</span> if we run.','Podemos nos perder se corrermos.')""")
r("""{k:'k3',frase:'When we read maps we need to pay attention to the details and to the ___.',pt:'Ao ler mapas, prestamos atenção aos detalhes e ao caminho.'},{k:'k4',frase:'We might get ___ if we run or don’t pay attention.',pt:'Podemos nos perder se corrermos ou não prestarmos atenção.'}""",
  """{k:'k3',frase:'The ___ is the way we are going.',pt:'O caminho é por onde vamos.'},{k:'k4',frase:'We might get ___ if we run.',pt:'Podemos nos perder se corrermos.'}""")
r("P('When we read maps, we need to pay attention to the details and the ___.','Ao ler mapas, prestamos atenção nos detalhes e no ___.','path','caminho')",
  "P('Pay attention to the details and the ___.','Preste atenção nos detalhes e no ___.','path','caminho')")
# L3: mapa ja ensinado na tela anterior, entao o "Reading a map" tem lacuna (nenhum arrastar cobre place/details) -> ocl fica
# L4 perspectiva
r("""fala:'Gigi, the giraffe painter, says: We can see many things from different positions, and our perspective changes depending on where we are looking from.',
  html:R('We can see many things from <span class="dest">different positions</span>, and our <span class="dest">perspective</span> changes depending on <span class="dest">where we are looking from</span>.','Podemos ver muitas coisas de posições diferentes, e nossa perspectiva muda dependendo de onde estamos olhando.')}""",
  """fala:'Gigi, the giraffe painter, says: We see things from different positions. Our perspective changes with where we look from.',
  html:R('We see things from <span class="dest">different positions</span>.','Vemos as coisas de posições diferentes.')+R('Our <span class="dest">perspective</span> changes with <span class="dest">where we look from</span>.','Nossa perspectiva muda conforme o lugar de onde olhamos.')}""")
r("""fala:'The giraffe and the woman look at the painting from different positions. People are not right or wrong. They just have a different view of things.',
  html:fig('view-giraffe',240)+R('The giraffe and the woman look at the painting from <span class="dest">different positions</span>.','A girafa e a mulher olham o quadro de posições diferentes.')+R('“People are not right or wrong. They just have a <span class="dest">different view</span> of things.”','As pessoas não estão certas nem erradas; elas só têm uma visão diferente das coisas.')}""",
  """fala:'The giraffe and the woman look from different positions. Not right or wrong: just a different view.',
  html:fig('view-giraffe',240)+R('They look from <span class="dest">different positions</span>.','Elas olham de posições diferentes.')+R('Not right or wrong: just a <span class="dest">different view</span>.','Nem certo nem errado: só uma visão diferente.')}""")
r("""{k:'k0',frase:'Our ___ changes depending on where we are looking from.',pt:'Nossa perspectiva muda dependendo de onde estamos olhando.'},{k:'k1',frase:'The tower is the same. Seen from the ___, we look up at it.',pt:'A torre é a mesma. Vista de baixo, olhamos para cima.'},{k:'k2',frase:'People are not right or wrong. They just have a ___ view of things.',pt:'As pessoas não estão certas nem erradas; só têm uma visão diferente das coisas.'}""",
  """{k:'k0',frase:'Our ___ changes with where we look from.',pt:'Nossa perspectiva muda conforme o lugar de onde olhamos.'},{k:'k1',frase:'Seen from the ___, we look up.',pt:'Vista de baixo, olhamos para cima.'},{k:'k2',frase:'Not right or wrong: just a ___ view.',pt:'Nem certo nem errado: só uma visão diferente.'}""")
r("""P('Our ___ changes depending on where we are looking from.','Nossa ___ muda dependendo de onde estamos olhando.','perspective','perspectiva'),P(fig('view-giraffe',200)+'The giraffe and the woman look at the painting from different positions. Complete: People are not right or wrong. They just have a different ___ of things.','A girafa e a mulher olham o quadro de posições diferentes. Complete: as pessoas não estão certas nem erradas; elas só têm uma ___ diferente das coisas.','view','visão')""",
  """P('Our ___ changes with where we look from.','Nossa ___ muda conforme o lugar de onde olhamos.','perspective','perspectiva'),P('Not right or wrong: just a different ___.','Nem certo nem errado: só uma ___ diferente.','view','visão','view-giraffe')""")
# L5
r("""fala:'Breezy and Drop say: Wind and water are two natural forces that exist in nature, and they can be helpful and harmful to us.',
  html:R('Wind and water are two <span class="dest">natural forces</span> that exist in nature, and they can be <span class="dest">helpful</span> and <span class="dest">harmful</span> to us.','Vento e água são duas forças naturais que existem na natureza, e podem ser úteis e prejudiciais para nós.')}""",
  """fala:'Breezy and Drop say: Wind and water are natural forces. They can be helpful and harmful to us.',
  html:R('Wind and water are <b>natural forces</b>.','Vento e água são forças naturais.')+R('They can be <span class="dest">helpful</span> and <span class="dest">harmful</span> to us.','Podem ser úteis e prejudiciais para nós.')}""")
# L6 arrastar das definicoes: sem "To ___ is to"
for a,b in [("To ___ is to go up and down after hitting a surface.","___: up and down after hitting a surface."),("To ___ is to move through the air.","___: through the air."),
            ("To ___ is to move by turning over and over.","___: turning over and over."),("To ___ is to move smoothly along a surface.","___: smoothly along a surface."),
            ("To ___ is to turn around and around.","___: around and around."),("To ___ is to move back and forth like a pendulum.","___: back and forth like a pendulum.")]: r(a,b)
r("P('Look at the picture. How does the top move?','Olhe a figura. Como o pião se move?','It spins.','Ele gira.')","P('Look at the picture. How does the top move?','Olhe a figura. Como o pião se move?','It <b>spins</b>.','Ele gira.')")
r("P('Complete: To ___ means to go up and down after hitting a surface.','Complete: ___ é subir e descer depois de bater numa superfície.','bounce','quicar')","P('To ___: up and down after hitting a surface.','___: subir e descer depois de bater numa superfície.','bounce','quicar')")
r("'wheel: roll · kite: fly · door: swing'","'wheel: <b>roll</b> · kite: <b>fly</b> · door: <b>swing</b>'")
# L7
r("'swim, climb, play, walk, pick, sit','nadar, subir, brincar, andar, colher, sentar'),","'<b>swim</b>, <b>climb</b>, <b>play</b>, <b>walk</b>, <b>pick</b>, <b>sit</b>','nadar, subir, brincar, andar, colher, sentar'),")
r("'touch, lift, point, write, grab, push','tocar, levantar, apontar, escrever, agarrar, empurrar'),","'<b>touch</b>, <b>lift</b>, <b>point</b>, <b>write</b>, <b>grab</b>, <b>push</b>','tocar, levantar, apontar, escrever, agarrar, empurrar'),")
r("'A fish swims. A bird flies.','O peixe nada. O pássaro voa.'","'A fish <b>swims</b>. A bird <b>flies</b>.','O peixe nada. O pássaro voa.'")
r("P('Make a list of movements you can do with your body.','Faça uma lista de movimentos que você faz com o corpo.'","P('Movements of your body?','Movimentos do seu corpo?'")
r("P('Make a list of movements you can do with your hand.','Faça uma lista de movimentos que você faz com a mão.'","P('Movements of your hand?','Movimentos da sua mão?'")
# L8 mais exemplos
r("""fala:'A push or a pull can make things move from one place to another. There are two types of force: push and pull. Push and pull are opposite forces. Push: a shopping trolley, a volleyball, the golfer hitting the ball. Pull: pulling the rope of a kite, picking fruit and vegetables from the plant.',""",
  """fala:'A push or a pull can make things move. Push and pull are opposite forces. Push: a shopping trolley, a volleyball, the golfer hitting the ball. Pull: the rope of a kite, picking fruit and vegetables.',""")
r("""html:R('A <span class="dest">push</span> or a <span class="dest">pull</span> can make things <span class="dest">move</span> from one place to another.','Empurrar ou puxar pode fazer as coisas irem de um lugar para outro.')+
   R('Two types of force: <span class="dest">push</span> and <span class="dest">pull</span>. They are <span class="dest">opposite</span> forces.','Dois tipos de força: push e pull. São forças opostas.')+""",
  """html:R('A push or a pull can make things <b>move</b>.','Empurrar ou puxar faz as coisas se moverem.')+
   R('Push and pull are <b>opposite</b> forces.','Push e pull são forças opostas.')+""")
r("'<br>picking fruit and vegetables from the plant'+tr('colher frutas e verduras da planta')","'<br>picking fruit and vegetables'+tr('colher frutas e verduras')")
r("'<p>pulling the rope of a kite'+tr('puxar a linha da pipa')","'<p>the rope of a kite'+tr('a linha da pipa')")
open(L,'w',encoding='utf-8',newline='').write(s)

# ---- motor: respeita ocl:false; lacuna so ate 3 palavras; mao que mostra o toque ----
t=open(H,encoding='utf-8').read()
def rh(a,b):
    global t; assert t.count(a)==1,a[:90]; t=t.replace(a,b)
rh("""function ocluir(el){
  var bs=[].slice.call(el.querySelectorAll('b')).filter(function(b){ return !b.closest('.tr')&&!b.closest('h3')&&!b.closest('.tqnum')&&!b.closest('.passo'); });""",
"""function palavras(s){ return s.trim().split(/\\s+/).filter(Boolean).length; }
function ocluir(el){
  var bs=[].slice.call(el.querySelectorAll('b')).filter(function(b){ return !b.closest('.tr')&&!b.closest('h3')&&!b.closest('.tqnum')&&!b.closest('.passo')&&palavras(b.textContent)<=3; });""")
rh("""    b.onclick=function(){ var abre=b.classList.toggle('fechado')===false; if(abre) fala(b.textContent); pinta(); try{ localStorage.setItem('cie3_ocl','1'); }catch(e){} var d=el.querySelector('.oclhint'); if(d) d.remove(); };""",
   """    b.onclick=function(){ var abre=b.classList.toggle('fechado')===false; if(abre) fala(b.textContent); pinta(); window._oclOk=1; tiraMao(); };""")
rh("""  var visto=false; try{ visto=localStorage.getItem('cie3_ocl')==='1'; }catch(e){}
  if(!visto){ var h=document.createElement('p'); h.className='oclhint'; h.innerHTML='Tap the hidden words.<span class="tr">Toque nas palavras escondidas.</span>'; el.insertBefore(h,el.firstChild); }""",
   """  /* a mao toca a primeira lacuna (sem escrever comando), ate a crianca tocar uma */
  if(!window._oclOk && !(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)) setTimeout(function(){
    if(!el.isConnected||window._oclOk) return; var b=bs.filter(function(x){ return x.classList.contains('fechado'); })[0]; if(!b) return;
    var a=b.getBoundingClientRect(); if(a.bottom<0||a.top>innerHeight) return;
    var m=document.createElement('div'); m.className='maotoque';
    m.innerHTML='<svg viewBox="0 0 24 24"><path d="M10 7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v6h1.76c.19 0 .37.04.54.11l4.54 2.26c.53.22.91.76.91 1.38 0 .06-.01.13-.02.2l-.75 5.27c-.11.73-.69 1.28-1.44 1.28h-6.79c-.41 0-.79-.17-1.06-.44L4.75 18.6l.79-.8c.2-.2.48-.33.79-.33.09 0 .16.02.24.03l3.43.72z"/></svg>';
    m.style.left=(a.left+a.width/2-14+scrollX)+'px'; m.style.top=(a.top+a.height/2-4+scrollY)+'px'; document.body.appendChild(m); b.classList.add('chama');
    document.addEventListener('pointerdown',tiraMao,true);
  },650);""")
rh("""R.texto=function(t){ return {html:t.html||'',init:ocluir}; };""",
   """function tiraMao(){ document.querySelectorAll('.maotoque').forEach(function(x){ x.remove(); }); document.querySelectorAll('b.ocl.chama').forEach(function(x){ x.classList.remove('chama'); }); document.removeEventListener('pointerdown',tiraMao,true); }
R.texto=function(t){ return {html:t.html||'',init:t.ocl===false?null:ocluir}; };""")
rh("""  document.querySelectorAll('.arr-it.demo').forEach(function(x){ x.remove(); });""",
   """  document.querySelectorAll('.arr-it.demo').forEach(function(x){ x.remove(); }); tiraMao();""")
# lacuna com cara de lacuna (listras) + mao
rh("""b.ocl.fechado{background:color-mix(in srgb,currentColor 0%,var(--ink) 18%);user-select:none}""",
   """b.ocl.fechado{background:repeating-linear-gradient(135deg,color-mix(in srgb,var(--ink) 22%,transparent) 0 6px,color-mix(in srgb,var(--ink) 8%,transparent) 6px 12px);outline:2px dashed color-mix(in srgb,var(--ink) 45%,transparent);outline-offset:-2px;user-select:none}
b.ocl.chama{animation:chama 1.1s ease-in-out infinite}
@keyframes chama{50%{transform:scale(1.08)}}
.maotoque{position:absolute;z-index:60;width:44px;height:44px;pointer-events:none;animation:toque 1.1s ease-in-out infinite}
.maotoque svg{width:100%;height:100%;fill:#fff;stroke:#111;stroke-width:1.2;filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))}
@keyframes toque{0%,100%{transform:translate(10px,14px)}50%{transform:translate(0,0) scale(.9)}}""")
# fora: credito e caixas do guia; parada 9
rh(""".credito{display:block;margin:6px 0 0;font-size:calc(.72rem*var(--fs));font-weight:700;opacity:.62;text-align:right;font-style:italic}
.lembra .credito{margin-top:4px}
""","")
rh("""+(t.credito?'<p class="credito">'+t.credito+'</p>':'')""","")
rh(""",['obj-spin-top','A story','Uma história']];""","];")
open(H,'w',encoding='utf-8',newline='').write(t)

x=open(X,encoding='utf-8').read()
a='8 short lessons and a story<span class="tr">8 lições curtas e uma história</span>'
assert x.count(a)==1; x=x.replace(a,'8 short lessons<span class="tr">8 lições curtas</span>')
open(X,'w',encoding='utf-8',newline='').write(x)
print('ok')
