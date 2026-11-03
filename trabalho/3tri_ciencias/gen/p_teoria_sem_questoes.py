# Sugestao do Paulo aceita (02/11): questoes so no simulado. Teoria = materia do slide + "On the test" com resposta.
import re
L='ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read().replace('\r\n','\n')
n=0
while True:
    m=re.search(r"\{tipo:'(?:escolha|completa|liga)',",s)
    if not m: break
    j=re.compile(r"\n ?\{tipo:|\n\]\}").search(s,m.start())
    fim=j.start()+1 if s[j.start():j.start()+3]!="\n]}" else j.start()
    s=s[:m.start()]+s[fim:].lstrip(' ') ; n+=1
print('telas de exercicio',n)
s,t=re.subn(r"treino:\[\[\['\w+'\],5\]\]","treino:[]",s);print('treinos',t)
# a sala aparecia so no exercicio: fica como materia, com as frases da folha
a="tit:'On the test'"
i=s.index("{k:'pos2',");j=s.index("{tipo:'texto', "+a,i)
sala="""{tipo:'texto', tit:'In the room', fala:'There is some pizza in the box. There is a guitar between the lamp and the plant. There are two dogs under the table. There is a window behind the sofa.',
  html:fig('room')+caixa('In the room'+tr('Na sala'),'<p>pizza <b>in</b> the box · guitar <b>between</b> the lamp and the plant · two dogs <b>under</b> the table · window <b>behind</b> the sofa · racket <b>next to</b> the bag · cheese <b>on</b> the plate · rug <b>in front of</b> the sofa · lamp <b>under</b> the shelf · trophy <b>between</b> the books · picture <b>on</b> the wall · bird <b>over</b> the trees · two fish <b>in</b> the bowl</p>')},
 """
s=s[:j]+sala+s[j:]
s=re.sub(r",\s*\n\s*\n?\]\}",'\n]}',s)
open(L,'w',encoding='utf-8',newline='').write(s)
p='index.html';t=open(p,encoding='utf-8').read()
a='8 short lessons with practice<span class="tr">8 lições curtas, com treino</span>'
assert a in t
t=t.replace(a,'8 short lessons from the slides<span class="tr">8 lições curtas, dos slides</span>')
open(p,'w',encoding='utf-8',newline='').write(t)
