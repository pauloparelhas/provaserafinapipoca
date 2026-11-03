# Paulo 03/11: hachura so onde a crianca pode DEDUZIR (figura na tela) algo cobravel; conteudo puro fica aberto.
# Toda pergunta do On the test com a figura que a responde. Sala: uma frase por linha. Passaro sem figura sai.
import re
L='ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read().replace('\r\n','\n')
def tr(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80]); s=s.replace(a,b)
# P com figura propria
tr("function P(pede,pt,resp,rpt){ return '<li>'+","function P(pede,pt,resp,rpt,f){ return '<li>'+(f?'<img class=\"fescb\" src=\"media/cie3/'+f+'.jpg\" alt=\"picture\" style=\"max-width:220px\">':'')+")
# L1 On the test: cada pergunta com sua figura
tr("naProva('prep-under',[P('Look at the picture. Where is the ball?','Olhe a figura. Onde está a bola?','under the table','embaixo da mesa'),P('Complete: The apple is ___ the book.','Complete: A maçã está ___ o livro.','on','sobre'),P('Which sentence is right? The fish is on the bowl. / The fish is inside the bowl.','Qual frase está certa?','The fish is inside the bowl.','O peixe está dentro do aquário.')])",
   "naProva(null,[P('Look at the picture. Where is the ball?','Olhe a figura. Onde está a bola?','under the table','embaixo da mesa','prep-under'),P('Look at the picture. Complete: The apple is ___ the book.','Olhe a figura. Complete: A maçã está ___ o livro.','on','sobre','prep-on'),P('Look at the picture. Which sentence is right? The fish is on the bowl. / The fish is inside the bowl.','Olhe a figura. Qual frase está certa?','The fish is inside the bowl.','O peixe está dentro do aquário.','prep-inside')])")
# L2: passaro sem figura sai desta tela (fica na sala, onde a figura mostra)
tr(" The cat is below the shelf. A bird is flying over the trees.'"," The cat is below the shelf.'")
tr("+\n   R('A bird is flying <b>over</b> the trees.','Um pássaro está voando por cima das árvores.')},","},")
# Sala: frases do slide, uma por linha
sala=[('There is some pizza','in','the box.','Tem pizza dentro da caixa.'),('There is a guitar','between','the lamp and the plant.','Tem um violão entre o abajur e a planta.'),('There are two dogs','under','the table.','Tem dois cachorros embaixo da mesa.'),('There is a window','behind','the sofa.','Tem uma janela atrás do sofá.'),('There is a racket','next to','the bag.','Tem uma raquete ao lado da mochila.'),('There is some cheese','on','the plate.','Tem queijo sobre o prato.'),('There is a rug','in front of','the sofa.','Tem um tapete na frente do sofá.'),('There is a lamp','under','the shelf.','Tem um abajur embaixo da prateleira.'),('There is a trophy','between','the books.','Tem um troféu entre os livros.'),('There is a picture','on','the wall.','Tem um quadro na parede.'),('There is a bird flying','over','the trees.','Tem um pássaro voando por cima das árvores.'),('There are two fish','in','the bowl.','Tem dois peixes no aquário.')]
i=s.index("html:fig('room')+caixa('In the room'"); j=s.index("},\n",i)
s=s[:i]+"html:fig('room')+caixa('In the room'+tr('Na sala'),'<p class=\"linhas\">"+"<br>".join("%s <b>%s</b> %s'+tr('%s')+'"%(a,b,c,d) for a,b,c,d in sala)+"</p>')"+s[j:]
# L3 mapa: conteudo puro, sem hachura
for a,b in [("The red <b>pin</b> marks","The red pin marks"),("need to <b>pay a lot of attention</b> to the <b>details</b> and to the <b>path</b>,","need to pay a lot of attention to the details and to the path,"),("get <b>lost</b> if","get lost if"),("the person <b>looking at the map</b>.","the person looking at the map.")]: tr(a,b)
# L4
tr("many things from <b>different</b> positions, and our <b>perspective</b> changes","many things from different positions, and our perspective changes")
tr("R('One object. A different shadow on each side: <b>triangle</b>, <b>rectangle</b>, <b>circle</b>.','Um só objeto. Uma sombra diferente de cada lado: triângulo, retângulo, círculo.')",
   "R('One object. A different shadow on each side.','Um só objeto. Uma sombra diferente de cada lado.')+caixa('The shadows'+tr('As sombras'),'<p class=\"linhas\">On the left wall: a <b>triangle</b>.'+tr('Na parede da esquerda: um triângulo.')+'<br>On the right wall: a <b>rectangle</b>.'+tr('Na parede da direita: um retângulo.')+'<br>On the floor: a <b>circle</b>.'+tr('No chão: um círculo.')+'</p>')")
tr("They just have a <b>different view</b> of things.”","They just have a different view of things.”")
# L5: conteudo puro
tr("two <b>natural forces</b> that exist in nature, and they can be <b>helpful</b> and <b>harmful</b> to us.","two natural forces that exist in nature, and they can be helpful and harmful to us.")
s,n=re.subn(r"\['(help|harm)-([a-z-]+)','<b>([^<']+)</b>'",lambda m:"['%s-%s','%s'"%(m.group(1),m.group(2),m.group(3)),s); assert n==8,n
for a,b in [("Wind is <b>air in motion</b>.","Wind is air in motion."),("It fills <b>sails</b> and turns <b>wind turbines</b>.","It fills sails and turns wind turbines."),("Water makes <b>energy</b>, carries <b>boats</b> and waters the <b>plants</b>.","Water makes energy, carries boats and waters the plants.")]: tr(a,b)
# L6: definicao aberta; o nome do movimento se esconde (a crianca deduz pelas figuras)
s=re.sub(r"def:'([^']*)'",lambda m:"def:'"+m.group(1).replace('<b>','').replace('</b>','')+"'",s)
tr("return caixa(k+tr(v.pt),'<p>'+v.def+tr(v.defp)+'</p>","return caixa('Motion Star'+tr('Estrela do movimento'),'<p><b>'+k+'</b>: '+v.def+tr(v.pt+': '+v.defp)+'</p>")
tr("different <b>directions</b>.","different directions.")
tr("different <b>speeds</b>: <b>slow</b> or <b>fast</b>.","different speeds: slow or fast.")
# L7: palavras ja escritas na figura do slide
tr("'<p><b>swim</b>, <b>climb</b>, <b>play</b>, <b>walk</b>, <b>pick</b>, <b>sit</b>'","'<p>swim, climb, play, walk, pick, sit'")
tr("'<p><b>touch</b>, <b>lift</b>, <b>point</b>, <b>write</b>, <b>grab</b>, <b>push</b>'","'<p>touch, lift, point, write, grab, push'")
# L8: forca e exemplos abertos; fica escondido so away/closer
s=s.replace("I use a <b>force</b> to move","I use a force to move")
tr("R('A <b>push</b> or a <b>pull</b> can make","R('A push or a pull can make")
tr("Two types of force: <b>push</b> and <b>pull</b>. They are <b>opposite</b> forces.","Two types of force: push and pull. They are opposite forces.")
open(L,'w',encoding='utf-8',newline='').write(s)
# motor: passos (setas) nunca hachura; linhas da sala/sombra com respiro
H='ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
a="return !b.closest('.tr')&&!b.closest('h3')&&!b.closest('.tqnum'); });"
assert t.count(a)==1; t=t.replace(a,"return !b.closest('.tr')&&!b.closest('h3')&&!b.closest('.tqnum')&&!b.closest('.passo'); });")
a=".nptit{font-weight:900;margin:0 0 6px}"
assert t.count(a)==1; t=t.replace(a,a+"\n.linhas{line-height:2}.linhas .tr{display:block;line-height:1.3;margin:-4px 0 4px}")
open(H,'w',encoding='utf-8',newline='').write(t)
print('ok')
