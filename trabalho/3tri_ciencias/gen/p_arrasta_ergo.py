# Paulo 03/11: arrastar facil. Caixa grande com "Drop here", soltar perto ja vale (ima), a caixa vai se preenchendo, rolagem automatica na borda.
H='ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:60]; t=t.replace(a,b)
r("min-height:86px;cursor:pointer}",
  "min-height:112px;cursor:pointer;display:flex;flex-direction:column;transition:background .15s,transform .15s}\n.arr-den:empty::after{content:'Drop here';display:block;margin:auto;padding:10px 0;font-weight:800;opacity:.45;font-size:calc(.85rem*var(--fs))}\n.arr-den{flex:1;align-content:center}")
r(".arr-c.alvo{border-style:solid;",".arr-c.alvo{border-style:solid;transform:scale(1.04);")
r("""            var d=document.elementFromPoint(ev.clientX,ev.clientY), c=d&&d.closest?d.closest('.arr-c'):null;""",
  """            var c=perto(ev.clientX,ev.clientY);
            if(ev.clientY>innerHeight-70) scrollBy(0,12); else if(ev.clientY<70) scrollBy(0,-12);""")
r("""      function caixa(k){""","""      /* ima: vale a caixa sob o dedo ou a mais proxima ate 60 px */
      function perto(x,y){ var m=null, dm=61; el.querySelectorAll('.arr-c').forEach(function(c){ var b=c.getBoundingClientRect(); var dx=Math.max(b.left-x,0,x-b.right), dy=Math.max(b.top-y,0,y-b.bottom), d=Math.hypot(dx,dy); if(d<dm){ dm=d; m=c; } }); return m; }
      function caixa(k){""")
open(H,'w',encoding='utf-8',newline='').write(t)
print('ok')
# Paulo 03/11: caixas tambem em ordem aleatoria a cada abertura (os itens ja eram)
t=open(H,encoding='utf-8').read()
a="'<div class=\"arr-cx\" style=\"grid-template-columns:repeat('+cols+',1fr)\">'+t.caixas.map("
assert t.count(a)==1; t=t.replace(a,a.replace("t.caixas.map(","emb(t.caixas).map("))
open(H,'w',encoding='utf-8',newline='').write(t)
print('ok2')
