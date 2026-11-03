# Paulo 03/11: a capa da teoria (mapa dos temas) nao pode rolar em tablet/computador.
# Tela larga: a trilha vira serpentina em grade (3 colunas; 5 na tela bem larga). Celular segue como era.
H='../../../ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:80]; t=t.replace(a,b)
r("""['pull-rope','Push or pull?','Empurrar ou puxar?']];""","""['pull-rope','Push or pull?','Empurrar ou puxar?'],['obj-swing-swing','A story','Uma história']];""")
r("""      return '<button class="parada lic'+(i%2?' dir':'')+'" data-i="'+i+'" style="--lc:'+corDe(l)+'">""",
  """      var r3=Math.floor(i/3), c3=r3%2?3-i%3:i%3+1, r5=Math.floor(i/5), c5=r5%2?5-i%5:i%5+1;
      return '<button class="parada lic'+(i%2?' dir':'')+'" data-i="'+i+'" style="--lc:'+corDe(l)+';--r3:'+(r3+1)+';--c3:'+c3+';--r5:'+(r5+1)+';--c5:'+c5+'">""")
CSS="""/* capa sem rolagem na tela larga (03/11): serpentina em grade */
@media (min-width:700px){
  .mapa-capa{max-width:980px}
  .mc-top{padding:10px 16px 4px}
  .mc-top svg{width:52px;height:62px}
  .trilha{display:grid;grid-template-columns:repeat(3,1fr);column-gap:10px;row-gap:4px;padding:30px 14px 8px}
  .parada.lic{grid-row:var(--r3);grid-column:var(--c3);flex-direction:column!important;justify-content:flex-start;text-align:center;min-height:0;padding:4px 2px;gap:6px}
  .parada.lic .nome{max-width:none}
  .parada .foto{width:78px;height:78px}
  .parada .aqui,.parada.dir .aqui{left:50%;right:auto;margin-left:-15px;top:-34px}
  .chegada{grid-row:4;grid-column:1/-1;margin:6px auto 2px;min-height:50px}
}
@media (min-width:1000px){
  .trilha{grid-template-columns:repeat(5,1fr)}
  .parada.lic{grid-row:var(--r5);grid-column:var(--c5)}
  .chegada{grid-row:3;width:60%}
}
"""
# (aplicado no fim do <style>, para vencer as regras da capa)
k=t.index("</style>"); t=t[:k]+CSS.replace(".mapa-capa{max-width:980px}",".mapa-capa{max-width:none}").replace("text-align:center;min-height:0;","text-align:center!important;min-height:0;")+t[k:]
open(H,'w',encoding='utf-8',newline='').write(t)
print('ok')
# + compacta em tela baixa (aplicado a mao no fim do <style>, ver CIE3_estudo.html @media (min-width:700px) and (max-height:780px))
