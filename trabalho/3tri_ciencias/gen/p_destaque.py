# Paulo 03/11: texto aberto (sem hachura) ganha destaque de cor nas palavras relevantes. <span class="dest"> nunca e ocluido.
L='ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read()
def D(w): return '<span class="dest">'+w+'</span>'
def tr(a,b):
    global s
    # a fala repete o texto antes do html: troca so a ultima ocorrencia (a do html)
    assert s.count(a)>=1,a[:70]; i=s.rindex(a); s=s[:i]+b+s[i+len(a):]
tr("The red pin marks a place on the map.","The red "+D("pin")+" marks a "+D("place")+" on the map.")
tr("need to pay a lot of attention to the details and to the path, the way we are going.","need to "+D("pay a lot of attention")+" to the "+D("details")+" and to the "+D("path")+", the way we are going.")
tr("We might get lost if we run or don’t pay attention.","We might get "+D("lost")+" if we "+D("run")+" or "+D("don’t pay attention")+".")
tr("the sides of the person looking at the map.","the sides of the "+D("person looking at the map")+".")
tr("many things from different positions, and our perspective changes depending on where we are looking from.","many things from "+D("different positions")+", and our "+D("perspective")+" changes depending on "+D("where we are looking from")+".")
tr("They just have a different view of things.”","They just have a "+D("different view")+" of things.”")
tr("two natural forces that exist in nature, and they can be helpful and harmful to us.","two "+D("natural forces")+" that exist in nature, and they can be "+D("helpful")+" and "+D("harmful")+" to us.")
tr("Wind is air in motion.","Wind is "+D("air in motion")+".")
tr("It fills sails and turns wind turbines.","It fills "+D("sails")+" and turns "+D("wind turbines")+".")
tr("Water makes energy, carries boats and waters the plants.","Water makes "+D("energy")+", carries "+D("boats")+" and waters the "+D("plants")+".")
tr("different directions.","different "+D("directions")+".")
tr("different speeds: slow or fast.","different "+D("speeds")+": "+D("slow")+" or "+D("fast")+".")
s=s.replace("I use a force to move","I use a "+D("force")+" to move")
tr("R('A push or a pull can make things move from one place to another.","R('A "+D("push")+" or a "+D("pull")+" can make things "+D("move")+" from one place to another.")
tr("Two types of force: push and pull. They are opposite forces.","Two types of force: "+D("push")+" and "+D("pull")+". They are "+D("opposite")+" forces.")
# definicoes dos movimentos (abertas): destaca o miolo
import re
CHAVE={'bounce':['up and down','surface'],'fly':['air'],'roll':['turning over and over'],'slide':['smoothly','surface'],'spin':['around and around'],'swing':['back and forth','pendulum']}
def defdest(m):
    d=m.group(3)
    for w in CHAVE[m.group(1)]: d=d.replace(w,D(w),1)
    return m.group(1)+":{"+m.group(2)+"def:'"+d+"'"
s,n=re.subn(r"(bounce|fly|roll|slide|spin|swing):[{](cor:'[^']*',pt:'[^']*',)def:'([^']*)'",defdest,s)
assert n==6,n
tr("The giraffe and the woman look at the painting from different positions.','A girafa","The giraffe and the woman look at the painting from "+D("different positions")+".','A girafa")
open(L,'w',encoding='utf-8',newline='').write(s)
H='ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
a=".nptit{font-weight:900;margin:0 0 6px}"
assert t.count(a)==1
t=t.replace(a,a+"\n.dest{font-weight:900;color:#fbbf24}body.light .dest{color:#b45309}")
open(H,'w',encoding='utf-8',newline='').write(t)
print('ok')
