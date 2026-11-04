# Correcoes do detector (03/11): lacunas que aceitavam duas respostas e a lista do corpo/mao.
L='../../../ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read()
def r(a,b):
    global s; assert s.count(a)==1,a[:80]; s=s.replace(a,b)
r("{k:'k2',frase:'Not right or wrong: just a ___ view.',pt:'Nem certo nem errado: só uma visão diferente.'}",
  "{k:'k2',frase:'They are not right or wrong. They just have a ___ view of things.',pt:'Não estão certas nem erradas; só têm uma visão diferente das coisas.'}")
r("P('Not right or wrong: just a different ___.','Nem certo nem errado: só uma ___ diferente.','view','visão','view-giraffe')",
  "P('People are not right or wrong. They just have a different ___ of things.','As pessoas não estão certas nem erradas; só têm uma ___ diferente das coisas.','view','visão','view-giraffe')")
r("P('Movements of your body?','Movimentos do seu corpo?'","P('Make a list of movements you can do with your body.','Faça uma lista de movimentos que você faz com o corpo.'")
r("P('Movements of your hand?','Movimentos da sua mão?'","P('Make a list of movements you can do with your hand.','Faça uma lista de movimentos que você faz com a mão.'")
open(L,'w',encoding='utf-8',newline='').write(s);print('ok')
