# Paulo 03/11: o mapa nao e boa imagem para a historia. A cena comeca na sala do slide; "between" vem do violao.
import re
L='../../../ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read()
i=s.index("{k:'historia'"); j=s.index("\n];\n})();",i); b=s[i:j]
m=re.search(r"<li><img src=\"media/cie3/map-school\.jpg\" alt=\"\"><div>.*?</li>",b); assert m
b=b.replace(m.group(0),"")
velho=re.search(r"<li><img src=\"media/cie3/room\.jpg\" alt=\"\"><div>.*?</li>",b).group(0)
novo='<li><img src="media/cie3/room.jpg" alt=""><div>Twister blew everything away! Pin goes into the room. A guitar is <span class="dest">between</span> the lamp and the plant. Two dogs are <span class="dest">under</span> the table.<span class="tr">O Twister espalhou tudo! O Pin entra na sala. Um violão está entre o abajur e a planta. Dois cachorros estão embaixo da mesa.</span></div></li>'
b=b.replace(velho,novo.replace("'","\'"))
fa=re.search(r"fala:'(.*?)',\n",b).group(1)
fala=fa.split('Pin goes into the room.')[1]
fala="Twister blew everything away! Pin goes into the room. A guitar is between the lamp and the plant. Two dogs are under the table."+fala.split('the bowl.',1)[1]
b=b.replace("fala:'"+fa+"'","fala:'"+fala+"'")
a=re.search(r"\{k:'k0',frase:'The Auditorium is ___ .*?\},",b).group(0)
b=b.replace(a,"{k:'k0',frase:'A guitar is ___ the lamp and the plant.',pt:'Um violão está entre o abajur e a planta.'},")
s=s[:i]+b+s[j:]
open(L,'w',encoding='utf-8',newline='').write(s)
print(fala)
