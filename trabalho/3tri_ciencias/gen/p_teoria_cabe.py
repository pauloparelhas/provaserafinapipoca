# Paulo 03/11: "abomino barra de rolagem nesses exercicios e teoria de crianca".
# Toda tela da teoria encolhe as FIGURAS (nunca o texto) ate caber na janela; minimo 64 px.
H='../../../ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:80]; t=t.replace(a,b)
r("""  if(r.init) r.init(tela.querySelector('.corpo'));
  /* toda palavra""","""  if(r.init) r.init(tela.querySelector('.corpo'));
  encaixa();
  /* toda palavra""")
r("""function render(){""","""/* sem rolagem: figuras encolhem (busca binaria na altura maxima) ate a tela caber */
function encaixa(){
  var c=tela.querySelector('.corpo'); if(!c||c.querySelector('.arr-itens')) return;
  var ims=c.querySelectorAll('img'); if(!ims.length) return;
  c.classList.remove('encx'); c.style.removeProperty('--imx');
  function sobra(){ return document.documentElement.scrollHeight-innerHeight; }
  if(sobra()<=2) return;
  c.classList.add('encx'); var lo=64, hi=Math.max(64,Math.round(innerHeight*.6));
  for(var k=0;k<9;k++){ var m=Math.round((lo+hi)/2); c.style.setProperty('--imx',m+'px'); if(sobra()<=2) lo=m; else hi=m-1; }
  c.style.setProperty('--imx',lo+'px');
  ims.forEach(function(im){ if(!im.complete && !im.dataset.enc){ im.dataset.enc=1; im.addEventListener('load',function(){ if(c.isConnected) encaixa(); }); } });
}
addEventListener('resize',function(){ clearTimeout(window._encT); window._encT=setTimeout(function(){ if(est.lic>=0) encaixa(); },150); });
function render(){""")
r("/* ---------- treininho ---------- */","""/* encaixe sem rolagem (03/11) */
.corpo.encx img{max-height:var(--imx)!important;width:auto!important;max-width:100%!important;object-fit:contain;margin-left:auto;margin-right:auto}
/* ---------- treininho ---------- */""")
open(H,'w',encoding='utf-8',newline='').write(t)
print('ok')
