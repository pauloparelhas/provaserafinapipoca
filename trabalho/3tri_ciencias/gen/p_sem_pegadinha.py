# Ordem do Paulo (02/11): sem pegadinha que o material nao traz. Tira pares, "Watch out" e "write one" das licoes,
# troca a faixa do pocket e corrige o roteiro. Rodar uma vez.
import re
p='ferramentas/CIE3_estudo_licoes.js';s=open(p,encoding='utf-8').read()
def tira_tela(tit):
    global s
    n=0
    while True:
        i=s.find("{tipo:'texto', tit:'%s',"%tit) if tit=='Watch out!' else s.find("{tipo:'completa', tit:'%s',"%tit)
        if i<0: return n
        j=re.compile(r"\n \{tipo:|\n\]\}").search(s,i)
        s=s[:i].rstrip(' ')+s[j.start()+2 if s[j.start():j.start()+3]=="\n {" else j.start():]
        s=s.replace(",\n\n]}",'\n]}')
        n+=1
print('watch',tira_tela('Watch out!'),'touching',tira_tela('Touching or not?'))
s,a=re.subn(r"\+?(?:esp\(\)\+)?\s*caixa\('Watch out!'\+tr\('Cuidado!'\),'.*?</p>'\)",'',s,flags=re.S);print('caixas',a)
s=s.replace("regra:'directions × speeds'+tr('direções × velocidades'),","regra:'directions · speeds'+tr('direções · velocidades'),")
s,a=re.subn(r",?P\('Write one way wind is helpful.*?\)(?=\]\))",'',s);print('w1',a)
s,a=re.subn(r",?P\('Write one example of a push.*?\)(?=\]\))",'',s);print('w2',a)
open(p,'w',encoding='utf-8',newline='').write(s)
# pocket
p='ferramentas/CIE3_pocket.html';s=open(p,encoding='utf-8').read()
i=s.index('<footer class="baixo">');j=s.index('</footer>',i)+9
s=s[:i]+'''<footer class="chk">
    <h2>&#9989; Check yourself <span class="pt in">Teste-se</span></h2>
    <ol><li>A top: spin or bounce?</li><li>A drawer opening: push or pull?</li><li>A tornado: helpful or harmful?</li><li>The ball is ___ the table. (under)</li><li>The Auditorium is ___ A and B sections.</li><li>The Eiffel Tower from below: seen from the ___.</li></ol>
    <p class="resp">1 spin · 2 pull · 3 harmful · 4 under · 5 between · 6 bottom</p>
  </footer>'''+s[j:]
s=s.replace('.chk ol{padding-left:3.6mm;font-size:6.6pt;font-weight:700;columns:2;column-gap:3mm}','.chk ol{padding-left:3.6mm;font-size:7pt;font-weight:700;columns:3;column-gap:4mm}')
s=s.replace(' · Write one example of each.','')
open(p,'w',encoding='utf-8',newline='').write(s)
# roteiro
p='trabalho/3tri_ciencias/_roteiro.md';s=open(p,encoding='utf-8').read()
i=s.index('## Armadilhas de L2');j=s.index('## Complementos da revis')
s=s[:i]+'## Nível (ordem do Paulo, 02/11)\nNada de pares que enganam nem pegadinha: os slides mostram cada palavra com sua figura e nunca contrapõem palavras parecidas. A prova é de Y2: nível exigido pelo material, nada além. Distrator = outra palavra do slide, bem distinta.\n\n'+s[j:]
open(p,'w',encoding='utf-8').write(s)
