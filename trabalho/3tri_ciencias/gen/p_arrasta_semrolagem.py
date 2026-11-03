# Paulo 03/11: nada de rolagem na teoria/exercicio.
# 1) On the test com figura por pergunta: figura AO LADO da pergunta, num cartao (sem duvida de "acima ou abaixo").
# 2) Arrastar frases: figura ao lado das frases (tela larga), so 3 frases pendentes por vez; a acertada some.
# 3) Fica claro que e para ARRASTAR sem texto: peca com pegador e sombra, mao animada mostra o gesto.
# 4) "A section" -> letra em placa (nao parece artigo).
import re
H='../../../ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
def r(a,b):
    global t; assert t.count(a)==1,a[:80]; t=t.replace(a,b)

# --- motor: html ---
r("""  return {html:'<div class="'+(t.caixas[0].frase?'arr-cx1':'')+'">'+(t.fig?'<img class="fescb" src="media/cie3/'+t.fig+'.jpg" alt="">':'')+'<div class="regra">'""",
  """  var FR=!!t.caixas[0].frase;
  return {html:'<div class="'+(FR?'arr-cx1':'')+(t.fig?' comfig':'')+'">'+(t.fig?'<div class="arr-fig"><img class="fescb" src="media/cie3/'+t.fig+'.jpg" alt=""></div>':'')+'<div class="arr-col"><div class="regra">'""")
r("""    '<div class="ordmsg">'+(t.dica||'Drag, or tap one and then its place.')+'</div><button class="btn calmo" data-a="re">Start again</button></div>',""",
  """    (FR?'<div class="arr-prog">'+t.caixas.map(function(){ return '<i></i>'; }).join('')+'</div>':'')+
    '<div class="ordmsg">'+(t.dica||'')+'</div><button class="btn calmo" data-a="re">Start again</button></div></div>',""")
# --- motor: janela de frases + fala sem tags + mao ---
r("""      var msg=el.querySelector('.ordmsg'), feitos=0, sel=null, total=t.itens.length;""",
  """      var msg=el.querySelector('.ordmsg'), feitos=0, sel=null, total=t.itens.length, K=FR?3:99;
      function janela(){ var n=0; el.querySelectorAll('.arr-c').forEach(function(c){ var ok=!c.classList.contains('feita') && n<K; if(ok) n++; c.classList.toggle('fora',!ok && !c.classList.contains('cheia')); }); }
      janela();
      function semtag(s){ return s.replace(/<[^>]+>/g,''); }
      /* a mao mostra o gesto (arrastar) sem escrever nada; vai para uma caixa qualquer, nao entrega resposta */
      var demoT=window._arrOk?null:setTimeout(function(){
        if(!el.isConnected||feitos||sel) return;
        var it=el.querySelector('.arr-itens .arr-it'), cs=[].filter.call(el.querySelectorAll('.arr-c'),function(c){ return !c.classList.contains('fora'); });
        if(!it||!cs.length||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
        var cx=cs[Math.floor(Math.random()*cs.length)], a=it.getBoundingClientRect(), dv=cx.querySelector('.arr-vaga')||cx, b=dv.getBoundingClientRect();
        if(a.bottom<0||a.top>innerHeight) return;
        var g=it.cloneNode(true); g.classList.add('voa','demo'); g.style.left=a.left+'px'; g.style.top=a.top+'px'; g.style.width=a.width+'px';
        g.insertAdjacentHTML('beforeend','<svg class="mao" viewBox="0 0 24 24"><path d="M10 7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v6h1.76c.19 0 .37.04.54.11l4.54 2.26c.53.22.91.76.91 1.38 0 .06-.01.13-.02.2l-.75 5.27c-.11.73-.69 1.28-1.44 1.28h-6.79c-.41 0-.79-.17-1.06-.44L4.75 18.6l.79-.8c.2-.2.48-.33.79-.33.09 0 .16.02.24.03l3.43.72z"/></svg>');
        document.body.appendChild(g);
        var dx=(b.left+b.width/2)-(a.left+a.width/2), dy=(b.top+b.height/2)-(a.top+a.height/2);
        var an=g.animate([{transform:'translate(0,0) scale(1)',opacity:0},{transform:'translate(0,0) scale(1)',opacity:1,offset:.12},{transform:'translate(0,0) scale(1.1)',offset:.28},{transform:'translate('+dx+'px,'+dy+'px) scale(1.1)',offset:.78},{transform:'translate('+dx+'px,'+dy+'px) scale(1)',opacity:0}],{duration:2300,easing:'ease-in-out'});
        function fim(){ g.remove(); document.removeEventListener('pointerdown',fim,true); }
        an.onfinish=fim; document.addEventListener('pointerdown',fim,true);
      },700);""")
r("""          var c=caixa(x.c); fala(c.frase?c.frase.replace('___',x.t):(x.t||'')+(c.t?', '+c.t:'')); if(c.frase) cx.classList.add('cheia');""",
  """          window._arrOk=1; clearTimeout(demoT);
          var c=caixa(x.c); fala(semtag(c.frase?c.frase.replace('___',x.t):(x.t||'')+(c.t?', '+c.t:''))); if(c.frase){ cx.classList.add('cheia');
            var pg=el.querySelectorAll('.arr-prog i')[feitos]; if(pg) pg.classList.add('ok');
            setTimeout(function(){ cx.classList.add('feita'); cx.classList.remove('cheia'); janela(); },1100); }""")
open(H,'w',encoding='utf-8',newline='').write(t)

# --- CSS ---
CSS="""/* sem rolagem (03/11): frases 3 por vez, figura ao lado; peca com pegador; mao que demonstra */
.arr-c.fora,.arr-c.feita{display:none!important}
.arr-itens .arr-it{box-shadow:0 4px 0 color-mix(in srgb,var(--line) 85%,#000),0 6px 12px rgba(0,0,0,.25);transition:transform .12s}
.arr-itens .arr-it:hover{transform:translateY(-2px)}
.arr-itens .arr-it::before{content:'';display:block;width:22px;height:8px;opacity:.55;background:radial-gradient(circle,currentColor 1.5px,transparent 1.8px) 0 0/7px 4px}
.arr-it.demo{opacity:1;box-shadow:0 12px 26px rgba(0,0,0,.5)}
.arr-it .mao{position:absolute;right:-16px;bottom:-26px;width:40px;height:40px;fill:#fff;stroke:#111;stroke-width:1.2;filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))}
.arr-prog{display:flex;gap:6px;justify-content:center;margin:10px 0 0}
.arr-prog i{width:12px;height:12px;border-radius:50%;border:2px solid var(--lc);opacity:.6}
.arr-prog i.ok{background:var(--ok);border-color:var(--ok);opacity:1}
.arr-cx1 .arr-itens{position:static;box-shadow:none;padding:4px 0;background:none}
body.light .arr-cx1 .arr-itens{background:none}
.arr-fig .fescb{max-height:190px;width:auto;max-width:100%}
@media (min-width:700px){
  .comfig{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:14px;align-items:start}
  .arr-fig{position:sticky;top:70px}
  .arr-fig .fescb{max-height:none;width:100%;margin:0}
}
@media (max-width:480px){
  .arr-c{min-height:86px}
  .arr-c>img{max-height:92px}
  .arr-itens .arr-it img{width:62px;height:62px}
}
.sec{display:inline-flex;align-items:center;justify-content:center;min-width:1.45em;height:1.45em;padding:0 .2em;margin:0 .1em;border:2px solid currentColor;border-radius:6px;font-weight:900;line-height:1;vertical-align:.05em}
.naprova li.npf{display:grid;grid-template-columns:116px minmax(0,1fr);gap:12px;align-items:center;padding:8px;border:2px solid var(--line);border-radius:14px;background:var(--surf)}
.naprova li.npf>img{width:116px;height:88px;object-fit:contain;margin:0;max-width:none;border-radius:10px;background:#fff}
"""
r("/* ---------- treininho ---------- */",CSS+"/* ---------- treininho ---------- */")
open(H,'w',encoding='utf-8',newline='').write(t)

# --- licoes ---
L='../../../ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read()
a="""function P(pede,pt,resp,rpt,f){ return '<li>'+(f?'<img class="fescb" src="media/cie3/'+f+'.jpg" alt="picture" style="max-width:220px">':'')+pede+tr(pt)+'<br><b class="resp">'+resp+'</b>'+(rpt?tr(rpt):'')+'</li>'; }"""
assert s.count(a)==1
s=s.replace(a,"""function P(pede,pt,resp,rpt,f){ var q=pede+tr(pt)+'<br><b class="resp">'+resp+'</b>'+(rpt?tr(rpt):''); return f?'<li class="npf"><img src="media/cie3/'+f+'.jpg" alt="picture"><div>'+q+'</div></li>':'<li>'+q+'</li>'; }""")
linhas=s.split('\n'); n=0
for i,l in enumerate(linhas):
    if l.lstrip().startswith('fala:'): continue
    novo=re.sub(r"\b([AB]) section",r'<span class="sec">\1</span> section',l)
    if novo!=l: n+=novo.count('class="sec"')-l.count('class="sec"'); linhas[i]=novo
s='\n'.join(linhas); print('secoes',n)
open(L,'w',encoding='utf-8',newline='').write(s)
print('ok')
