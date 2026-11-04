# Paulo 03/11: o Blitz tambem sem rolagem (tablet e computador). Figura ao lado da pergunta em tela larga;
# a figura encolhe ate a tela caber (antes e depois de responder); resultado do Blitz enxuto (sem topicos e revisao).
H='ferramentas/CIE3_simulado.html'
t=open(H,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:80]; t=t.replace(a,b)
k=t.index('</style>')
t=t[:k]+"""/* Blitz sem rolagem (03/11) */
body.blitz .quadro .fotofonte{max-height:var(--bimx,62vh);width:auto;max-width:100%}
body.blitz .stage{padding-top:6px}
body.blitz .card{padding-top:10px;padding-bottom:10px}
body.blitz .anel{width:112px;height:112px;margin:2px auto}
body.blitz .anelin{width:86px;height:86px}
body.blitz .anelin b{font-size:calc(1.7rem*var(--fs))}
body.blitz .estrelas{font-size:24px}
body.blitz .resultado .placarsub{margin-bottom:6px}
body.blitz .resultado .avancar{margin-top:0}
body.blitz .resultado .grade{grid-template-columns:1fr 1fr}
@media (min-width:700px){
  body.blitz .q:has(.quadro){display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);column-gap:18px;align-items:start}
  body.blitz .q:has(.quadro)>*{grid-column:2}
  body.blitz .q:has(.quadro)>.qhead{grid-column:1/-1}
  body.blitz .q:has(.quadro)>.quadro{grid-column:1;grid-row:2/span 12;margin:0}
  body.blitz .q:has(.quadro) .pede{margin-top:0}
}
"""+t[k:]
r("""function mmss(ms){""","""/* encolhe a figura do Blitz ate a pagina caber na janela (busca binaria na altura maxima) */
var _bx=0;
function encaixaB(){
  if(!document.body.classList.contains('blitz')) return;
  cancelAnimationFrame(_bx); _bx=requestAnimationFrame(function(){
    var de=document.documentElement, st=document.body.style, lo=innerWidth<600?130:90, hi=Math.round(innerHeight*0.62);
    function cabe(){ return de.scrollHeight<=innerHeight+1; }
    st.setProperty('--bimx',hi+'px'); if(cabe()) return;
    while(hi-lo>6){ var m=(lo+hi)>>1; st.setProperty('--bimx',m+'px'); if(cabe()) lo=m; else hi=m; }
    st.setProperty('--bimx',lo+'px');
  });
}
addEventListener('resize',encaixaB);
document.addEventListener('load',function(e){ if(e.target.tagName==='IMG') encaixaB(); },true);
new MutationObserver(encaixaB).observe(document.getElementById('raiz')||document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});
function mmss(ms){""")
r("""  /* cada questão nova começa do alto da página */""","""  React.useEffect(function(){ document.body.classList.toggle('blitz', modo==='blitz' && tela!=='inicio'); encaixaB(); });
  /* cada questão nova começa do alto da página */""")
r("""    h('div',{className:'secao'},'by topic'),""","""    modo!=='blitz' && h('div',{className:'secao'},'by topic'),""")
r("""    OP.FAMILIAS.filter(function(fm){ return porFam[fm.k]; }).map(""","""    modo!=='blitz' && OP.FAMILIAS.filter(function(fm){ return porFam[fm.k]; }).map(""")
r("""    h('div',{className:'secao'},'review'),""","""    modo!=='blitz' && h('div',{className:'secao'},'review'),""")
r("""    h('div',{className:'filtro',role:'group'},""","""    modo!=='blitz' && h('div',{className:'filtro',role:'group'},""")
r("""    lista.length===0 && h('p',""","""    modo!=='blitz' && lista.length===0 && h('p',""")
r("""    lista.map(function(i){
      var rs=resp[i.id]""","""    modo!=='blitz' && lista.map(function(i){
      var rs=resp[i.id]""")
open(H,'w',encoding='utf-8',newline='').write(t);print('ok')
