# Correcao do Paulo (02/11): a prova e ESCRITA. Tira as telas de "dizer palavras" e poe em cada licao "On the test",
# com o jeito como pode ser cobrado e a resposta. Nao muda o indice das telas de escolha ja aprovadas.
L = 'ferramentas/CIE3_estudo_licoes.js'
s = open(L, encoding='utf-8').read()

def troca(a, b):
    global s
    assert s.count(a) == 1, a[:60]
    s = s.replace(a, b)

# helper
troca("return [\n\n/* ===================== 1.", '''function P(pede,pt,resp,rpt){ return '<li>'+pede+tr(pt)+'<br><b class="resp">'+resp+'</b>'+(rpt?tr(rpt):'')+'</li>'; }
function naProva(fig_,itens){ return (fig_?'<img class="fescb" src="media/cie3/'+fig_+'.jpg" alt="">':'')+'<ol class="naprova">'+itens.join('')+'</ol>'; }
return [

/* ===================== 1.''')

# licao 1: dizer as palavras -> completar por escrito
troca("""{tipo:'palavras', tit:'Say the words',
  fala:'In. On. Under. Inside.', pals:['in'+tr('dentro'),'on'+tr('sobre'),'under'+tr('embaixo'),'inside'+tr('dentro')]},""",
"""{tipo:'completa', tit:'Read and complete', fala:'Read and complete.', regra:'in · on · under · inside',
  itens:[
   C('The bear is _ the box.','in',['on','under'],'O urso está … a caixa.','dentro d'),
   C('The apple is _ the book.','on',['in','under'],'A maçã está … o livro.','sobre'),
   C('The ball is _ the table.','under',['on','in'],'A bola está … a mesa.','embaixo d'),
   C('The fish is _ the bowl.','inside',['on','under'],'O peixe está … o aquário.','dentro d')
  ]},""")

# licao 7: listas do corpo e da mao viram a folha da escola
i = s.index("{tipo:'palavras', tit:'Our body moves',")
j = s.index("{tipo:'texto', tit:'How animals move',")
s = s[:i] + """{tipo:'texto', tit:'Movements of the body',
  fala:'Make a list of movements you can do with your body. Swim, climb, play, walk, pick, sit.',
  html:fala('Paws','This is the sheet from your class. We move too!'+tr('Esta é a folha da sua aula. Nós também nos movemos!'))+
   '<img class="fescb" src="media/cie3/orig/corpo-mao.jpg" alt="">'+
   caixa('My body'+tr('Meu corpo'),'<p><b>swim, climb, play, walk, pick, sit</b>'+tr('nadar, subir, brincar, andar, colher, sentar')+'</p>')},
 {tipo:'texto', tit:'Movements of the hand',
  fala:'Make a list of movements you can do with your hand. Touch, lift, point, write, grab, push.',
  html:caixa('My hand'+tr('Minha mão'),'<p><b>touch, lift, point, write, grab, push</b>'+tr('tocar, levantar, apontar, escrever, agarrar, empurrar')+'</p>')+esp()+
   R('Learn to <b>write</b> these words: the sheet asks you to make a list.','Aprenda a escrever estas palavras: a folha pede para fazer uma lista.')},
 """ + s[j:]
troca("'Doctor Paws says: ", "'Paws says: ") if "'Doctor Paws says: " in s else None
s = s.replace('Paws, the vet', 'Paws, the puppy').replace('Doctor Paws', 'Paws')
s = s.replace('Look at everything in this room. Now tell me <b>where</b> each thing is!', 'Look at everything in this room. <b>Where</b> is each thing?')
s = s.replace('Olhe tudo nesta sala. Agora me diga ONDE cada coisa está!', 'Olhe tudo nesta sala. ONDE está cada coisa?')

# "On the test" no fim de cada licao
TELAS = {
'pos1': ('prep-under', [
  ("Look at the picture. Where is the ball?", "Olhe a figura. Onde está a bola?", "under the table", "embaixo da mesa"),
  ("Complete: The apple is ___ the book.", "Complete: A maçã está ___ o livro.", "on", "sobre"),
  ("Which sentence is right? The fish is on the bowl. / The fish is inside the bowl.", "Qual frase está certa?", "The fish is inside the bowl.", "O peixe está dentro do aquário."),
]),
'pos2': ('room', [
  ("Use the words in the box: behind, next to, in front of, over, in, on, between, under. There is a guitar ___ the lamp and the plant.", "Use as palavras da caixa. Tem um violão ___ o abajur e a planta.", "between", "entre"),
  ("There is a racket ___ the bag.", "Tem uma raquete ___ a mochila.", "next to", "ao lado de"),
  ("There is a picture ___ the wall.", "Tem um quadro ___ a parede.", "on", "na"),
]),
'dir': ('map-school', [
  ("Look at the map. What is between A section and B section?", "Olhe o mapa. O que há entre a seção A e a B?", "the Auditorium", "o auditório"),
  ("Is B section on the left or on the right of the Auditorium?", "A seção B fica à esquerda ou à direita do auditório?", "on the right", "à direita"),
  ("When we read maps, we need to pay attention to the details and the ___.", "Ao ler mapas, prestamos atenção nos detalhes e no ___.", "path", "caminho"),
  ("True or false: we might get lost if we run.", "Verdadeiro ou falso: podemos nos perder se corrermos.", "True", "Verdadeiro"),
]),
'persp': ('view-bottom', [
  ("Look at the picture. The tower is seen from the ___.", "Olhe a figura. A torre é vista de ___.", "bottom", "baixo"),
  ("Our perspective changes depending on ___ we are looking from.", "Nossa perspectiva muda dependendo de ___ estamos olhando.", "where", "onde"),
  ("Complete: People are not right or wrong. They just have a different ___ of things.", "As pessoas não estão certas nem erradas; só têm outra ___ das coisas.", "view", "visão"),
]),
'forcas': ('harm-floods', [
  ("Wind and water are two ___ forces.", "Vento e água são duas forças ___.", "natural", "naturais"),
  ("Look at the picture. Is it helpful or harmful?", "Olhe a figura. Ajuda ou prejudica?", "harmful", "prejudica"),
  ("Write one way wind is helpful and one way water is helpful.", "Escreva um jeito em que o vento ajuda e um em que a água ajuda.", "wind: makes energy, spreads seeds · water: waters plants, makes energy", "vento: faz energia, espalha sementes · água: rega plantas, faz energia"),
  ("Is a tsunami wind or water?", "Tsunami é vento ou água?", "water", "água"),
]),
'objetos': ('obj-spin-top', [
  ("Look at the picture. How does the top move?", "Olhe a figura. Como o pião se move?", "It spins.", "Ele gira."),
  ("Complete: To ___ means to go up and down after hitting a surface.", "Complete: ___ é subir e descer depois de bater numa superfície.", "bounce", "quicar"),
  ("Match: wheel, kite, door → roll, fly, swing.", "Ligue: roda, pipa, porta → rolar, voar, balançar.", "wheel: roll · kite: fly · door: swing", "roda: rola · pipa: voa · porta: balança"),
  ("Things can move slow or ___.", "As coisas podem se mover devagar ou ___.", "fast", "rápido"),
]),
'animais': (None, [
  ("Make a list of movements you can do with your body.", "Faça uma lista de movimentos que você faz com o corpo.", "swim, climb, play, walk, pick, sit", "nadar, subir, brincar, andar, colher, sentar"),
  ("Make a list of movements you can do with your hand.", "Faça uma lista de movimentos que você faz com a mão.", "touch, lift, point, write, grab, push", "tocar, levantar, apontar, escrever, agarrar, empurrar"),
  ("How does a fish move? How does a bird move?", "Como o peixe se move? E o pássaro?", "A fish swims. A bird flies.", "O peixe nada. O pássaro voa."),
]),
'pushpull': ('pull-wagon', [
  ("Look at the picture. Is it a push or a pull?", "Olhe a figura. É push ou pull?", "a pull", "puxar"),
  ("Complete: A push is when I use a force to move something ___ from me.", "Complete: push é usar força para mover algo ___ de mim.", "away", "para longe"),
  ("Complete: A pull is when I use a force to move something ___ to me.", "Complete: pull é usar força para mover algo ___ de mim.", "closer", "para perto"),
  ("Write one example of a push and one of a pull.", "Escreva um exemplo de push e um de pull.", "push: kicking a ball · pull: opening a drawer", "push: chutar a bola · pull: abrir a gaveta"),
]),
}
def js(t):
    return "'" + t.replace("\\", "\\\\").replace("'", "\\'") + "'"
import re
for k, (fig, itens) in TELAS.items():
    ini = s.index("{k:'" + k + "',")
    prox = s.find("{k:'", ini + 5)
    fim = s.rfind("]}", ini, prox if prox > 0 else len(s))
    corpo = ','.join('P(%s,%s,%s,%s)' % (js(a), js(b), js(c), js(d)) for a, b, c, d in itens)
    tela = ",\n {tipo:'texto', tit:'On the test', fala:'This is how it can come on the test.', html:'<p class=\"nptit\">This is how it can come on the test.'+tr('É assim que pode cair na prova.')+'</p>'+naProva(%s,[%s])}\n" % (js(fig) if fig else 'null', corpo)
    # recua ate o ultimo item da lista telas
    s = s[:fim].rstrip() + tela + s[fim:]
open(L, 'w', encoding='utf-8', newline='').write(s)

# CSS nos dois lugares: html atual e script de fork
css = ".naprova{margin:6px 0 0;padding-left:22px;font-weight:800;line-height:1.35}.naprova li{margin:0 0 10px}.naprova .resp{color:#16a34a}body.light .naprova .resp{color:#15803d}.nptit{font-weight:900;margin:0 0 6px}\\n"
p = 'trabalho/3tri_ciencias/gen/fork_shell.py'
f = open(p, encoding='utf-8').read()
mark = ".fescb{display:block;"
assert mark in f
if '.naprova' not in f:
    f = f.replace(mark, css + mark, 1)
    open(p, 'w', encoding='utf-8').write(f)
print('ok')
