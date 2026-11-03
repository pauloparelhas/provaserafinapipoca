# Correcao do Paulo: pergunta que depende de ver a cena tem de mostrar a cena.
p='ferramentas/CIE3_estudo_licoes.js';s=open(p,encoding='utf-8').read()
for f,a,c,e,pt,w in [('prep-in','The bear is _ the box.','in',"['on','under']",'O urso está … a caixa.','dentro d'),('prep-on','The apple is _ the book.','on',"['in','under']",'A maçã está … o livro.','sobre'),('prep-under','The ball is _ the table.','under',"['on','in']",'A bola está … a mesa.','embaixo d'),('prep-inside','The fish is _ the bowl.','inside',"['on','under']",'O peixe está … o aquário.','dentro d')]:
    o="C('%s','%s',%s,'%s','%s')"%(a,c,e,pt,w); assert o in s,o
    s=s.replace(o,"Q('%s','%s','%s',%s,'','%s','%s')"%(f,a,c,e,pt,w))
open(p,'w',encoding='utf-8',newline='').write(s)
