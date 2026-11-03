p='ferramentas/CIE3_estudo.html';t=open(p,encoding='utf-8').read().replace('\r\n','\n')
a=".fescb{display:block;"
t=t.replace(a,""".parada.lic{flex-direction:row;align-items:center;justify-content:flex-start;background:none;border:0;box-shadow:none;border-radius:0;height:auto;min-height:104px;width:100%;max-width:none;padding:8px 2px;margin:0}
.parada.lic.dir{flex-direction:row-reverse;margin-left:0}
.parada.lic .nome{flex:0 1 auto;max-width:190px;background:rgba(255,248,230,.92);padding:5px 9px;border-radius:10px;font-size:calc(1.03rem*var(--fs));line-height:1.14}
.trilha{padding-top:26px}
.trilha .rota{position:absolute;left:0;top:0}
"""+a,1)
i=t.index("  /* a rota tracejada liga o centro das fotos");j=t.index("  tela.innerHTML='<div class=\"mapa-capa\">",i)
t=t[:i]+t[j:]
a=t[t.index("'<div class=\"trilha\"><svg viewBox"):t.index("LICOES.map(function(l,i){ var P=PARADAS")]
t=t.replace(a,"""'<div class="trilha"><svg class="rota" aria-hidden="true"></svg>'+
    """)
a="  tela.querySelectorAll('.lic').forEach(function(b){ b.onclick=function(){ abre(+b.dataset.i); }; });"
assert a in t
t=t.replace(a,a+"\n  desenhaRota();",1)
a="function renderCapa(){"
t=t.replace(a,"""/* a rota sai do centro real de cada foto e termina na chegada */
function desenhaRota(){
  var tr=tela.querySelector('.trilha'); if(!tr) return;
  var s=tr.querySelector('.rota'), o=tr.getBoundingClientRect(), pts=[].map.call(tr.querySelectorAll('.foto'),function(f){ var r=f.getBoundingClientRect(); return [r.left+r.width/2-o.left,r.top+r.height/2-o.top]; });
  var c=tr.querySelector('.chegada').getBoundingClientRect(); pts.push([c.left+c.width/2-o.left,c.top-o.top+6]);
  var d='M'+pts[0][0]+' '+pts[0][1]; for(var i=1;i<pts.length;i++){ var m=(pts[i-1][1]+pts[i][1])/2; d+=' C'+pts[i-1][0]+' '+m+','+pts[i][0]+' '+m+','+pts[i][0]+' '+pts[i][1]; }
  s.setAttribute('width',o.width); s.setAttribute('height',o.height); s.setAttribute('viewBox','0 0 '+o.width+' '+o.height);
  s.innerHTML='<path d="'+d+'" fill="none" stroke="#2563eb" stroke-width="4" stroke-dasharray="9 8" stroke-linecap="round"/>';
}
window.addEventListener('resize',desenhaRota);
"""+a,1)
open(p,'w',encoding='utf-8',newline='').write(t)
L='ferramentas/CIE3_estudo_licoes.js';s=open(L,encoding='utf-8').read()
a="R('push · pull','push = empurrar · pull = puxar')+\n"
s=s.replace('\r\n','\n');assert a in s;s=s.replace(a,"")
open(L,'w',encoding='utf-8',newline='').write(s)
