# Paulo 03/11: a licao 9 ficou parecida demais com o "Final Challenge" do guia da Fernanda (parque, bola, balanco, vento).
# Refeita no NOSSO universo (Twister, Pin, mapa da escola, a sala do slide) e com credito da ideia em letra menor.
# Credito tambem nas caixas "pergunta-chave" e no arrastar dos animais, que vieram de ideias do guia dela.
import re
L='../../../ferramentas/CIE3_estudo_licoes.js'
H='../../../ferramentas/CIE3_estudo.html'
s=open(L,encoding='utf-8').read()
def q(x): return x.replace("'","\\'")
D=lambda w:'<span class="dest">'+w+'</span>'
SEC=lambda x:'<span class="sec">'+x+'</span>'
CRED="'<p class=\"credito\">Idea inspired by Fernanda’s Study Guide.<span class=\"tr\">Ideia inspirada no guia de estudo da Fernanda.</span></p>'"
# credito nas caixas pergunta-chave
a="function lembra(en,pt){ return '<div class=\"lembra\"><span class=\"lb-ic\">?</span><div>'+en+tr(pt)+'</div></div>'; }"
assert s.count(a)==1
s=s.replace(a,"function lembra(en,pt){ return '<div class=\"lembra\"><span class=\"lb-ic\">?</span><div>'+en+tr(pt)+'<small class=\"credito\">Idea inspired by Fernanda’s Study Guide.</small></div></div>'; }")
# credito no arrastar dos animais
a="regra:'Drag each word to the right animal.', regra_pt:'Arraste cada palavra para o animal certo.',"
assert s.count(a)==1
s=s.replace(a,a+" credito:'Idea inspired by Fernanda’s Study Guide.',")
# licao 9 nova
H9=[('map-school','Twister blew everything away! Pin looks at the school map. The Auditorium is '+D('between')+' '+SEC('A')+' section and '+SEC('B')+' section.','O Twister espalhou tudo! O Pin olha o mapa da escola. O Auditório fica entre a seção A e a seção B.'),
 ('room','Pin goes into the room. Two dogs are '+D('under')+' the table. Two fish are '+D('in')+' the bowl.','O Pin entra na sala. Dois cachorros estão embaixo da mesa. Dois peixes estão no aquário.'),
 ('view-shadow','Pin looks at one object. It makes three different '+D('shadows')+': a triangle, a rectangle and a circle.','O Pin olha um objeto. Ele faz três sombras diferentes: um triângulo, um retângulo e um círculo.'),
 ('obj-spin-top','Pin finds a top. It '+D('spins')+' around and around.','O Pin acha um pião. Ele gira e gira.'),
 ('obj-roll-wheel','A wheel '+D('rolls')+', turning over and over.','Uma roda rola, virando e virando.'),
 ('push-box','Pin moves a box '+D('away from')+' the door. It is a '+D('push')+'.','O Pin afasta uma caixa da porta. É empurrar.'),
 ('pull-drawer','Pin opens a drawer. It comes '+D('closer')+'. It is a '+D('pull')+'.','O Pin abre uma gaveta. Ela vem para perto. É puxar.'),
 ('harm-tornado','Twister is a tornado. Wind can be '+D('harmful')+'!','O Twister é um tornado. O vento pode ser prejudicial!')]
def li(img,en,pt): return "<li><img src=\"media/cie3/%s.jpg\" alt=\"\"><div>%s<span class=\"tr\">%s</span></div></li>"%(img,en,pt)
fala9=' '.join(re.sub('<[^>]+>','',en) for _,en,_ in H9)
html9="'<ol class=\"hist\">"+q(''.join(li(*x) for x in H9))+"</ol>'+"+CRED
def FR(tit,pares,regra,regra_pt):
    cx=','.join("{k:'k%d',frase:'%s',pt:'%s'}"%(n,q(f),q(pt)) for n,(f,w,pt) in enumerate(pares))
    it=','.join("{c:'k%d',t:'%s'}"%(n,q(w)) for n,(f,w,pt) in enumerate(pares))
    return "{tipo:'arrasta', tit:'%s', fala:'%s', cols:1, ordem:true, credito:'Idea inspired by Fernanda’s Study Guide.', regra:'%s', regra_pt:'%s', caixas:[%s], itens:[%s]}"%(q(tit),q(regra),q(regra),q(regra_pt),cx,it)
fill=FR('Complete the story',[
 ('The Auditorium is ___ '+SEC('A')+' section and '+SEC('B')+' section.','between','O Auditório fica entre a seção A e a seção B.'),
 ('Two dogs are ___ the table.','under','Dois cachorros estão embaixo da mesa.'),
 ('One object makes three different ___.','shadows','Um objeto faz três sombras diferentes.'),
 ('The top ___ around and around.','spins','O pião gira e gira.'),
 ('The wheel ___, turning over and over.','rolls','A roda rola, virando e virando.'),
 ('Pin moves the box away. It is a ___.','push','O Pin afasta a caixa. É empurrar.'),
 ('Pin brings the drawer closer. It is a ___.','pull','O Pin traz a gaveta para perto. É puxar.'),
 ('Twister is a tornado. It is ___.','harmful','O Twister é um tornado. Ele é prejudicial.')],
 'Drag each word to the story.','Arraste cada palavra para a história.')
lic9=("/* ===================== 9. A STORY ===================== */\n"
 "{k:'historia', tema:'objects', ic:'pushpull', nome:'A story: Pin’s mission at school', nome_pt:'Uma história: a missão do Pin na escola', cor:'#22d3ee', quem:'Pin',\n"
 " treino:[], telas:[\n"
 " {tipo:'texto', tit:'Pin’s mission', fala:'"+q(fala9)+"',\n  html:"+html9+"},\n "+fill+"\n]}\n")
i=s.index("/* ===================== 9. A STORY ===================== */"); j=s.index("\n];\n})();",i)
s=s[:i]+lic9.rstrip('\n')+s[j:]
open(L,'w',encoding='utf-8',newline='').write(s)

t=open(H,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:80]; t=t.replace(a,b)
r("['obj-swing-swing','A story','Uma história']","['obj-spin-top','A story','Uma história']")
# credito no rodape do arrastar
r("""'<div class="ordmsg">'+(t.dica||'')+'</div><button class="arr-re" data-a="re">&#8634; Start again</button></div></div></div>',""",
  """'<div class="ordmsg">'+(t.dica||'')+'</div><button class="arr-re" data-a="re">&#8634; Start again</button></div>'+(t.credito?'<p class="credito">'+t.credito+'</p>':'')+'</div></div>',""")
k=t.index("</style>")
t=t[:k]+".credito{display:block;margin:6px 0 0;font-size:calc(.72rem*var(--fs));font-weight:700;opacity:.62;text-align:right;font-style:italic}\n.lembra .credito{margin-top:4px}\n"+t[k:]
open(H,'w',encoding='utf-8',newline='').write(t)
print('ok')
