# Paulo 03/11: a prova traz mais TEXTO que figura. Telas de arrastar com texto: completar a frase (formato do slide) e classificar frases.
# Motor: caixa com `frase` (o ___ vira a vaga, cabe 1 palavra); tela com `fig` mostra a figura de apoio no topo.
H='ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:70]; t=t.replace(a,b)
r("""      return '<div class="arr-c" data-k="'+c.k+'"'+(c.cor?' style="--cc:'+c.cor+'"':'')+'>'+(c.img?'<img src="media/cie3/'+c.img+'.jpg" alt="">':'')+(c.t?'<h4>'+c.t+'</h4>':'')+'<div class="arr-den"></div></div>'; }).join('')+'</div>'+""",
  """      if(c.frase) return '<div class="arr-c arr-fr" data-k="'+c.k+'"><p>'+c.frase.replace('___','<span class="arr-den arr-vaga"></span>')+(c.pt?'<span class="tr">'+c.pt+'</span>':'')+'</p></div>';
      return '<div class="arr-c" data-k="'+c.k+'"'+(c.cor?' style="--cc:'+c.cor+'"':'')+'>'+(c.img?'<img src="media/cie3/'+c.img+'.jpg" alt="">':'')+(c.t?'<h4>'+c.t+'</h4>':'')+'<div class="arr-den"></div></div>'; }).join('')+'</div>'+""")
r("""  return {html:'<div class="regra">'+(t.regra||'Drag each one to the right place.')""","""  return {html:(t.fig?'<img class="fescb" src="media/cie3/'+t.fig+'.jpg" alt="">':'')+'<div class="regra">'+(t.regra||'Drag each one to the right place.')""")
r("""      function solta(it,cx){
        var x=t.itens[+it.dataset.i];
        if(x.c===cx.dataset.k){""","""      function solta(it,cx){
        var x=t.itens[+it.dataset.i];
        if(x.c===cx.dataset.k && !(cx.classList.contains('arr-fr') && cx.querySelector('.arr-vaga .arr-it'))){""")
r("""          var c=caixa(x.c); fala((x.t||'')+(c.t?', '+c.t:''));""","""          var c=caixa(x.c); fala(c.frase?c.frase.replace('___',x.t):(x.t||'')+(c.t?', '+c.t:'')); if(c.frase) cx.classList.add('cheia');""")
CSS=""".arr-fr{min-height:0;display:block;padding:8px 10px;border-style:solid;border-width:2px;font-weight:800;line-height:1.9}
.arr-fr p{margin:0}
.arr-vaga{display:inline-flex;vertical-align:middle;min-width:96px;min-height:40px;margin:0 3px;border:2px dashed var(--lc);border-radius:10px;align-items:center;justify-content:center}
.arr-vaga:empty::after{content:'';padding:0}
.arr-fr.cheia{border-color:var(--ok)}
.arr-fr.cheia .arr-vaga{border:none;min-width:0}
"""
r("/* ---------- treininho ---------- */",CSS+"/* ---------- treininho ---------- */")
open(H,'w',encoding='utf-8',newline='').write(t)

L='ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read()
def q(x): return x.replace("'","\\'")
def antes_do_teste(chave, tela):
    global s
    i=s.index("{k:'"+chave+"'"); j=s.index("tit:'On the test'",i); k=s.rindex("{tipo:",i,j)
    s=s[:k]+tela+",\n "+s[k:]
def FR(tit,pares,fig=None,regra='Drag each word to the right sentence.',regra_pt='Arraste cada palavra para a frase certa.'):
    cx=','.join("{k:'k%d',frase:'%s',pt:'%s'}"%(n,q(f),q(pt)) for n,(f,w,pt) in enumerate(pares))
    it=','.join("{c:'k%d',t:'%s'}"%(n,q(w)) for n,(f,w,pt) in enumerate(pares))
    return "{tipo:'arrasta', tit:'%s', fala:'%s', cols:1%s, regra:'%s', regra_pt:'%s', caixas:[%s], itens:[%s]}"%(q(tit),q(regra),(", fig:'%s'"%fig) if fig else '',q(regra),q(regra_pt),cx,it)
def SORT(tit,caixas,itens):
    cx=','.join("{k:'%s',t:'%s',cor:'%s'}"%c for c in caixas)
    it=','.join("{c:'%s',t:'%s'}"%(c,q(w)) for c,w in itens)
    return "{tipo:'arrasta', tit:'%s', fala:'Drag each one to the right place.', cols:2, caixas:[%s], itens:[%s]}"%(q(tit),cx,it)
# L2 sala: a ficha do slide (as 8 palavras da caixa, uma por frase)
antes_do_teste('pos2',FR('Complete the sentences',[
 ('There is some pizza ___ the box.','in','Tem pizza dentro da caixa.'),
 ('There is a guitar ___ the lamp and the plant.','between','Tem um violão entre o abajur e a planta.'),
 ('There are two dogs ___ the table.','under','Tem dois cachorros embaixo da mesa.'),
 ('There is a window ___ the sofa.','behind','Tem uma janela atrás do sofá.'),
 ('There is a racket ___ the bag.','next to','Tem uma raquete ao lado da mochila.'),
 ('There is some cheese ___ the plate.','on','Tem queijo sobre o prato.'),
 ('There is a rug ___ the sofa.','in front of','Tem um tapete na frente do sofá.'),
 ('There is a bird flying ___ the trees.','over','Tem um pássaro voando por cima das árvores.')],fig='room',
 regra='Look at the room. Drag each word to its sentence.',regra_pt='Olhe a sala. Arraste cada palavra para a sua frase.'))
# L3 mapa
antes_do_teste('dir',FR('Complete the sentences',[
 ('The Auditorium is ___ A section and B section.','between','O Auditório fica entre a seção A e a seção B.'),
 ('A section is on the ___ of the Auditorium.','left','A seção A fica à esquerda do Auditório.'),
 ('B section is on the ___ of the Auditorium.','right','A seção B fica à direita do Auditório.'),
 ('When we read maps we need to pay attention to the details and to the ___.','path','Ao ler mapas, prestamos atenção aos detalhes e ao caminho.'),
 ('We might get ___ if we run or don’t pay attention.','lost','Podemos nos perder se corrermos ou não prestarmos atenção.')],fig='map-school'))
# L4 perspectiva (a girafa com o contexto da tela anterior)
antes_do_teste('persp',FR('Complete the sentences',[
 ('Our ___ changes depending on where we are looking from.','perspective','Nossa perspectiva muda dependendo de onde estamos olhando.'),
 ('The tower is the same. Seen from the ___, we look up at it.','bottom','A torre é a mesma. Vista de baixo, olhamos para cima.'),
 ('People are not right or wrong. They just have a ___ view of things.','different','As pessoas não estão certas nem erradas; só têm uma visão diferente das coisas.')],fig=None))
# L5 com texto
antes_do_teste('forcas',SORT('Helpful or harmful? (words)',[('help','Helpful','#22c55e'),('harm','Harmful','#ef4444')],
 [('help','water the plants'),('help','water to make energy'),('help','wind to make energy'),('help','wind that spreads the seeds'),('harm','tsunami'),('harm','heavy rain and floods'),('harm','tornado'),('harm','strong winds')]))
# L6 definicao -> movimento
antes_do_teste('objetos',FR('Complete the sentences',[
 ('To ___ is to go up and down after hitting a surface.','bounce','Quicar é subir e descer depois de bater numa superfície.'),
 ('To ___ is to move through the air.','fly','Voar é mover-se pelo ar.'),
 ('To ___ is to move by turning over and over.','roll','Rolar é mover-se virando e virando.'),
 ('To ___ is to move smoothly along a surface.','slide','Deslizar é mover-se suavemente sobre uma superfície.'),
 ('To ___ is to turn around and around.','spin','Girar é dar voltas e voltas.'),
 ('To ___ is to move back and forth like a pendulum.','swing','Balançar é ir e voltar como um pêndulo.')]))
# L8 com texto
antes_do_teste('pushpull',SORT('Push or pull? (words)',[('push','Push','#f97316'),('pull','Pull','#38bdf8')],
 [('push','riding a bike'),('push','kicking a ball'),('push','a shopping trolley'),('push','a volleyball'),('pull','tug of war with a rope'),('pull','opening a drawer'),('pull','the rope of a kite'),('pull','fishing with a rod')]))
open(L,'w',encoding='utf-8',newline='').write(s)
print('ok')
