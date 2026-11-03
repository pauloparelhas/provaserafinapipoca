# 03/11: aperfeicoamento a partir de ideias de outro material de pais (sem copiar texto):
# pergunta-chave para lembrar em cada licao; arrastar dos animais; historia de revisao que junta os temas.
H='../../../ferramentas/CIE3_estudo.html'
L='../../../ferramentas/CIE3_estudo_licoes.js'
t=open(H,encoding='utf-8').read()
def rh(a,b):
    global t; assert t.count(a)==1,a[:80]; t=t.replace(a,b)
# arrastar: historia mantem a ordem das frases
rh("""'<div class="arr-cx" style="--c:'+cols+';--cw:'+colsW+'">'+emb(t.caixas).map(""","""'<div class="arr-cx" style="--c:'+cols+';--cw:'+colsW+'">'+(t.ordem?t.caixas:emb(t.caixas)).map(""")
rh("/* encaixe sem rolagem (03/11) */","""/* pergunta-chave e historia (03/11) */
.lembra{display:flex;gap:10px;align-items:center;margin:10px 0 0;padding:10px 12px;border-radius:14px;border:2px dashed var(--lc);background:color-mix(in srgb,var(--lc) 12%,transparent);font-weight:800;line-height:1.4}
.lembra .lb-ic{flex:none;width:34px;height:34px;border-radius:50%;background:var(--lc);color:#111;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.2em}
.hist{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.hist li{display:grid;grid-template-columns:84px minmax(0,1fr);gap:10px;align-items:center;font-weight:800;line-height:1.35}
.hist li img{width:84px;height:64px;object-fit:cover;border-radius:10px;background:#fff}
@media (min-width:900px){ .hist{grid-template-columns:1fr 1fr} }
/* encaixe sem rolagem (03/11) */""")
open(H,'w',encoding='utf-8',newline='').write(t)

s=open(L,encoding='utf-8').read()
def q(x): return x.replace("'","\\'")
# helper
a="function naProva(fig_,itens){"
assert s.count(a)==1
s=s.replace(a,"function lembra(en,pt){ return '<div class=\"lembra\"><span class=\"lb-ic\">?</span><div>'+en+tr(pt)+'</div></div>'; }\n"+a)
D=lambda w:'<span class="dest">'+w+'</span>'
def anexa(chave,tit,expr,nth=1):
    """acrescenta +expr ao html da tela tit da licao chave"""
    global s
    i=s.index("{k:'"+chave+"'");
    for _ in range(nth): i=s.index("tit:'"+tit+"'",i+1)
    j=min(x for x in [s.find("\n {tipo:",i),s.find("\n{tipo:",i),s.find("\n]}",i)] if x>0)
    seg=s[i:j]; k=seg.rstrip().rfind('}')
    assert 'html:' in seg and seg.rstrip()[-2:] in ('},',"}"), seg[-60:]
    s=s[:i]+seg[:k]+"+"+expr+seg[k:]+s[j:]
anexa('pos2','Where is it?',"lembra('Ask: “"+q(D('Where is it?'))+"” Answer with a position word: “It is "+q(D('under'))+" the table.”','Pergunte: “Onde está?” Responda com uma palavra de posição: “Está embaixo da mesa.”')",nth=2)
anexa('dir','Left and right on the map',"lembra('Hold up your two hands, palms away from you. Your "+q(D('left'))+" hand makes the letter "+q(D('L'))+".','Levante as duas mãos, com as palmas para a frente. A mão esquerda forma a letra L.')")
anexa('persp','A different view',"lembra('One thing, "+q(D('different positions'))+", "+q(D('different views'))+".','Uma coisa só, posições diferentes, visões diferentes.')")
anexa('forcas','What wind and water do',"lembra('The same force can help or hurt. Wind spreads the seeds: "+q(D('helpful'))+". Strong winds: "+q(D('harmful'))+".','A mesma força pode ajudar ou atrapalhar. O vento espalha as sementes: útil. Ventos fortes: prejudiciais.')")
anexa('objetos','Directions and speed',"lembra('How does it move? Say the "+q(D('movement'))+" (roll, spin…), the "+q(D('direction'))+" (up and down…) and the "+q(D('speed'))+" (slow or fast).','Como se move? Diga o movimento (rola, gira…), a direção (para cima e para baixo…) e a velocidade (devagar ou rápido).')")
anexa('pushpull','Push or pull?',"lembra('Ask: is it going "+q(D('away from me'))+"? It is a push. Is it coming "+q(D('closer to me'))+"? It is a pull.','Pergunte: está indo para longe de mim? É empurrar. Está vindo para perto de mim? É puxar.')")

def FR(tit,pares,regra,regra_pt,fig=None,ordem=False):
    cx=','.join("{k:'k%d',frase:'%s',pt:'%s'}"%(n,q(f),q(pt)) for n,(f,w,pt) in enumerate(pares))
    it=','.join("{c:'k%d',t:'%s'}"%(n,q(w)) for n,(f,w,pt) in enumerate(pares))
    return "{tipo:'arrasta', tit:'%s', fala:'%s', cols:1%s%s, regra:'%s', regra_pt:'%s', caixas:[%s], itens:[%s]}"%(q(tit),q(regra),(", fig:'%s'"%fig) if fig else '',", ordem:true" if ordem else '',q(regra),q(regra_pt),cx,it)
# L7 animais: arrastar o verbo
ani=FR('How does it move?',[
 ('A fish ___.','swims','O peixe nada.'),
 ('A bird ___.','flies','O pássaro voa.'),
 ('A monkey ___.','climbs','O macaco escala.'),
 ('A kangaroo ___.','jumps','O canguru pula.'),
 ('A snake ___ on the ground.','crawls','A cobra rasteja no chão.')],
 'Drag each word to the right animal.','Arraste cada palavra para o animal certo.')
i=s.index("{k:'animais'"); j=s.index("{tipo:'arrasta', tit:'My body or my hand?'",i)
s=s[:j]+ani+",\n "+s[j:]

# Licao 9: historia
H9=[('view-front','Lia and her brother Theo are in a park '+D('near')+' the Eiffel Tower.','Lia e o irmão Theo estão num parque perto da Torre Eiffel.'),
 ('view-bottom','Lia stands '+D('under')+' the tower and looks up. She sees it from the '+D('bottom')+'.','Lia fica embaixo da torre e olha para cima. Ela a vê de baixo.'),
 ('push-ball','Theo kicks his ball. A kick is a '+D('push')+': the ball goes '+D('away from')+' him.','Theo chuta a bola. Chutar é empurrar: a bola vai para longe dele.'),
 (None,'The ball '+D('rolls')+' on the grass.','A bola rola na grama.'),
 ('pull-wagon','Lia '+D('pulls')+' her wagon. It comes '+D('closer to')+' her.','Lia puxa o carrinho. Ele vem para perto dela.'),
 ('obj-swing-swing','Then she sits on the '+D('swing')+'. It moves '+D('back and forth')+'.','Depois ela senta no balanço. Ele vai e volta.'),
 ('help-wind-seeds','The wind spreads the seeds. Today the wind is '+D('helpful')+'.','O vento espalha as sementes. Hoje o vento é útil.')]
def li(img,en,pt): return "<li>"+("<img src=\"media/cie3/%s.jpg\" alt=\"\">"%img if img else "<span></span>")+"<div>"+en+"<span class=\"tr\">"+pt+"</span></div></li>"
import re
fala9=' '.join(re.sub('<[^>]+>','',en) for _,en,_ in H9)
html9="'<ol class=\"hist\">"+q(''.join(li(*x) for x in H9))+"</ol>'"
fill=FR('Complete the story',[
 ('Lia stands ___ the tower and looks up.','under','Lia fica embaixo da torre e olha para cima.'),
 ('She sees the tower from the ___.','bottom','Ela vê a torre de baixo.'),
 ('Theo kicks his ball. A kick is a ___.','push','Theo chuta a bola. Chutar é empurrar.'),
 ('The ball ___ on the grass.','rolls','A bola rola na grama.'),
 ('Lia brings her wagon closer to her. She ___ it.','pulls','Lia traz o carrinho para perto dela. Ela o puxa.'),
 ('Lia sits on the ___. It moves back and forth.','swing','Lia senta no balanço. Ele vai e volta.'),
 ('The wind spreads the seeds. Today the wind is ___.','helpful','O vento espalha as sementes. Hoje o vento é útil.')],
 'Drag each word to the story.','Arraste cada palavra para a história.',ordem=True)
lic9=("\n/* ===================== 9. A STORY ===================== */\n"
 "{k:'historia', tema:'objects', ic:'pushpull', nome:'A story: a day in the park', nome_pt:'Uma história: um dia no parque', cor:'#22d3ee', quem:'Lia',\n"
 " treino:[], telas:[\n"
 " {tipo:'texto', tit:'A day in the park', fala:'"+q(fala9)+"',\n  html:"+html9+"},\n "+fill+"\n]}\n")
k=s.rindex("\n];\n})();")
fim=s[:k].rstrip()
assert fim.endswith(']}'), fim[-40:]
s=fim+","+lic9+s[k:]
open(L,'w',encoding='utf-8',newline='').write(s)
print('ok')
