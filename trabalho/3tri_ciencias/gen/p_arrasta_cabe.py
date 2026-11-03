# Paulo 03/11 (continua): tela de arrastar cabe na janela. Frases: quantas couberem (3, 2 ou 1).
# Recomecar vira botao pequeno no rodape do exercicio. Figuras (ate 4) numa linha so na tela larga.
H='../../../ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:80]; t=t.replace(a,b)
r("""  var cols=t.cols||Math.min(t.caixas.length,2);""",
  """  var cols=t.cols||Math.min(t.caixas.length,2);
  var colsW=(t.caixas.every(function(c){ return c.img; }) && t.caixas.length<=4)?t.caixas.length:cols;""")
r("""'<div class="arr-cx" style="grid-template-columns:repeat('+cols+',1fr)">'""",
  """'<div class="arr-cx" style="--c:'+cols+';--cw:'+colsW+'">'""")
r("""    (FR?'<div class="arr-prog">'+t.caixas.map(function(){ return '<i></i>'; }).join('')+'</div>':'')+
    '<div class="ordmsg">'+(t.dica||'')+'</div><button class="btn calmo" data-a="re">Start again</button></div></div>',""",
  """    '<div class="arr-pe">'+(FR?'<div class="arr-prog">'+t.caixas.map(function(){ return '<i></i>'; }).join('')+'</div>':'')+
    '<div class="ordmsg">'+(t.dica||'')+'</div><button class="arr-re" data-a="re">&#8634; Start again</button></div></div></div>',""")
r("""      janela();
      function semtag(s)""",
  """      janela();
      /* tira frases ate a tela caber sem rolagem (minimo 1) */
      function cabe(){ if(!FR||!el.isConnected) return; while(K>1 && document.documentElement.scrollHeight>innerHeight+2){ K--; janela(); } }
      requestAnimationFrame(cabe); el.querySelectorAll('img').forEach(function(im){ if(!im.complete) im.addEventListener('load',cabe); });
      function semtag(s)""")
CSS="""/* cabe na janela (03/11) */
.arr-cx{grid-template-columns:repeat(var(--c,2),minmax(0,1fr))}
@media (min-width:700px){ .arr-cx{grid-template-columns:repeat(var(--cw,2),minmax(0,1fr))} }
.arr-pe{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:8px}
.arr-pe .arr-prog{margin:0}
.arr-pe .ordmsg{margin:0;min-height:0}
.arr-re{border:1px solid var(--line);background:none;color:inherit;opacity:.75;border-radius:999px;padding:6px 12px;font:inherit;font-weight:800;font-size:calc(.8rem*var(--fs));cursor:pointer;min-height:36px}
.arr-den:empty::after{padding:6px 0}
@media (max-width:480px){ .arr-fig .fescb{max-height:160px} .arr-c>img{max-height:80px} .arr-c{min-height:78px} }
"""
r("/* ---------- treininho ---------- */",CSS+"/* ---------- treininho ---------- */")
open(H,'w',encoding='utf-8',newline='').write(t)
print('ok')
