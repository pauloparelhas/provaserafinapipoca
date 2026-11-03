# Paulo 03/11: sem rolagem. A sala (12 frases) vira duas telas de 6, cada uma com a figura grande.
L='../../../ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read()
i=s.index("{tipo:'texto', tit:'In the room',"); j=s.index("</p>')},",i)+len("</p>')},")
bloco=s[i:j]
corte="'<br>There is a rug"
k=bloco.index(corte)
p1=bloco[:k]+"+'</p>')},"
p1=p1.replace("tit:'In the room',","tit:'In the room (1/2)',")
cab=bloco[:bloco.index("'<p class=\"linhas\">")+len("'<p class=\"linhas\">")]
cab=cab.replace("tit:'In the room',","tit:'In the room (2/2)',")
cab=cab.replace(cab[cab.index("fala:'"):cab.index("',\n",cab.index("fala:'"))+1],"fala:'There is a rug in front of the sofa. There is a lamp under the shelf. There is a trophy between the books. There is a picture on the wall. There is a bird flying over the trees. There are two fish in the bowl.'")
p2=cab+bloco[k+len("'<br>"):]
s=s[:i]+p1+"\n"+p2+s[j:]
open(L,'w',encoding='utf-8',newline='').write(s)
print(p1[:300]);print('---');print(p2[:400])
