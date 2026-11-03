# Paulo 03/11: depois de ensinar, uma tela de ARRASTAR as coisas pro lugar (visual, estudo ativo), onde couber.
# Tipo novo R.arrasta: itens (figura e/ou palavra) -> caixas (figura e/ou rotulo). Arrastar com o dedo OU tocar item e depois a caixa.
H='ferramentas/CIE3_estudo.html'
t=open(H,encoding='utf-8').read()
CSS = """
/* ---------- arrastar para o lugar (03/11) ---------- */
.arr-itens{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:0 0 12px;min-height:60px}
.arr-it{touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab;border:2px solid var(--line);background:var(--surf);border-radius:12px;padding:5px 9px;font-weight:900;font-size:calc(1rem*var(--fs));line-height:1.15;text-align:center;min-height:48px;min-width:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}
.arr-it img{width:72px;height:72px;object-fit:cover;border-radius:9px;display:block;pointer-events:none}
.arr-it.sel{border-color:var(--lc);box-shadow:0 0 0 3px color-mix(in srgb,var(--lc) 45%,transparent)}
.arr-it.erro{border-color:var(--no);animation:trem .35s}
.arr-it.voa{position:fixed;z-index:50;pointer-events:none;opacity:.92;transform:scale(1.06);box-shadow:0 10px 24px rgba(0,0,0,.45)}
.arr-cx{display:grid;gap:10px}
.arr-c{border:2px dashed color-mix(in srgb,var(--cc,var(--lc)) 70%,transparent);border-radius:14px;padding:8px;background:color-mix(in srgb,var(--cc,var(--lc)) 10%,transparent);min-height:86px;cursor:pointer}
.arr-c.alvo{border-style:solid;background:color-mix(in srgb,var(--cc,var(--lc)) 24%,transparent)}
.arr-c h4{margin:0 0 6px;font-size:calc(1.05rem*var(--fs));font-weight:900;color:var(--cc,var(--lc));text-align:center}
.arr-c>img{display:block;width:100%;max-height:120px;object-fit:contain;border-radius:10px;background:#fff;margin:0 0 6px;pointer-events:none}
.arr-den{display:flex;flex-wrap:wrap;gap:5px;justify-content:center}
.arr-den .arr-it{cursor:default;border-color:var(--ok);background:rgba(52,211,153,.16);min-height:0;padding:3px 7px;font-size:calc(.9rem*var(--fs))}
.arr-den .arr-it img{width:46px;height:46px}
"""
a="/* ---------- treininho ---------- */"
assert t.count(a)==1; t=t.replace(a,CSS+a)
JS = r"""/* arrastar para o lugar: t.caixas [{k,t,img,cor}], t.itens [{t,img,c}] (c = k da caixa). Dedo arrasta; ou toca o item e depois a caixa. */
R.arrasta=function(t){
  function rot(x){ return (x.img?'<img src="media/cie3/'+x.img+'.jpg" alt="">':'')+(x.t?'<span>'+x.t+'</span>':''); }
  var itens=emb(t.itens.map(function(x,i){ return {x:x,i:i}; }));
  var cols=t.cols||Math.min(t.caixas.length,2);
  return {html:'<div class="regra">'+(t.regra||'Drag each one to the right place.')+'<span class="tr">'+(t.regra_pt||'Arraste cada um para o lugar certo.')+'</span></div>'+
    '<div class="arr-itens">'+itens.map(function(o){ return '<div class="arr-it" role="button" tabindex="0" data-i="'+o.i+'">'+rot(o.x)+'</div>'; }).join('')+'</div>'+
    '<div class="arr-cx" style="grid-template-columns:repeat('+cols+',1fr)">'+t.caixas.map(function(c){
      return '<div class="arr-c" data-k="'+c.k+'"'+(c.cor?' style="--cc:'+c.cor+'"':'')+'>'+(c.img?'<img src="media/cie3/'+c.img+'.jpg" alt="">':'')+(c.t?'<h4>'+c.t+'</h4>':'')+'<div class="arr-den"></div></div>'; }).join('')+'</div>'+
    '<div class="ordmsg">'+(t.dica||'Drag, or tap one and then its place.')+'</div><button class="btn calmo" data-a="re">Start again</button>',
    init:function(el){
      var msg=el.querySelector('.ordmsg'), feitos=0, sel=null, total=t.itens.length;
      function caixa(k){ return t.caixas.filter(function(c){ return c.k===k; })[0]; }
      function solta(it,cx){
        var x=t.itens[+it.dataset.i];
        if(x.c===cx.dataset.k){
          it.classList.remove('sel'); it.removeAttribute('role'); it.tabIndex=-1; it.onpointerdown=null; it.onclick=null;
          cx.querySelector('.arr-den').appendChild(it); feitos++;
          var c=caixa(x.c); fala((x.t||'')+(c.t?', '+c.t:''));
          msg.textContent=feitos===total?(t.fim||'Well done! Everything is in the right place.'):'Yes!';
        }else{
          it.classList.remove('erro'); void it.offsetWidth; it.classList.add('erro'); setTimeout(function(){ it.classList.remove('erro'); },450);
          msg.textContent='Not there. Try again.';
        }
      }
      el.querySelectorAll('.arr-c').forEach(function(cx){ cx.onclick=function(){ if(sel){ var s=sel; sel=null; solta(s,cx); } }; });
      el.querySelectorAll('.arr-itens .arr-it').forEach(function(it){
        it.onkeydown=function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); it.onclick(); } };
        it.onclick=function(){ if(sel) sel.classList.remove('sel'); sel=(sel===it)?null:it; if(sel){ sel.classList.add('sel'); msg.textContent='Now tap its place.'; } };
        it.onpointerdown=function(e){
          if(e.button>0) return;
          var x0=e.clientX, y0=e.clientY, r=it.getBoundingClientRect(), fant=null, alvo=null, mexeu=false;
          function mv(ev){
            if(!mexeu && Math.abs(ev.clientX-x0)+Math.abs(ev.clientY-y0)<8) return;
            if(!mexeu){ mexeu=true; fant=it.cloneNode(true); fant.classList.add('voa'); fant.style.width=r.width+'px'; document.body.appendChild(fant); it.style.opacity='.35'; }
            fant.style.left=(ev.clientX-r.width/2)+'px'; fant.style.top=(ev.clientY-r.height/2)+'px';
            var d=document.elementFromPoint(ev.clientX,ev.clientY), c=d&&d.closest?d.closest('.arr-c'):null;
            if(c!==alvo){ if(alvo) alvo.classList.remove('alvo'); alvo=c; if(alvo) alvo.classList.add('alvo'); }
            ev.preventDefault();
          }
          function up(){
            document.removeEventListener('pointermove',mv); document.removeEventListener('pointerup',up); document.removeEventListener('pointercancel',up);
            if(!mexeu) return;
            it.style.opacity=''; if(fant) fant.remove(); if(alvo) alvo.classList.remove('alvo');
            it.dataset.arrastou='1'; setTimeout(function(){ delete it.dataset.arrastou; },60);
            if(alvo){ if(sel){ sel.classList.remove('sel'); sel=null; } solta(it,alvo); }
          }
          document.addEventListener('pointermove',mv,{passive:false}); document.addEventListener('pointerup',up); document.addEventListener('pointercancel',up);
        };
        var clique=it.onclick; it.onclick=function(){ if(it.dataset.arrastou) return; clique(); };
      });
      el.querySelector('[data-a="re"]').onclick=function(){ render(); };
    }};
};
"""
a="/* treininho: pergunta do LP3_banco"
assert t.count(a)==1; t=t.replace(a,JS+a)
open(H,'w',encoding='utf-8',newline='').write(t)

# ---- telas nas licoes: so com figura do slide e resposta indiscutivel ----
L='ferramentas/CIE3_estudo_licoes.js'
s=open(L,encoding='utf-8').read()
def antes_do_teste(chave_licao, tela):
    global s
    i=s.index("{k:'"+chave_licao+"'"); j=s.index("tit:'On the test'",i)
    k=s.rindex("{tipo:'texto'",i,j)
    s=s[:k]+tela+",\n "+s[k:]
def C(k,t,img=None,cor=None): return "{k:'%s',t:'%s'%s%s}"%(k,t,(",img:'%s'"%img) if img else '',(",cor:'%s'"%cor) if cor else '')
def I(c,t=None,img=None): return "{c:'%s'%s%s}"%(c,(",t:'%s'"%t) if t else '',(",img:'%s'"%img) if img else '')
def T(tit,caixas,itens,cols=None,regra=None,regra_pt=None):
    return "{tipo:'arrasta', tit:'%s', fala:'Drag each one to the right place.'%s%s, caixas:[%s], itens:[%s]}"%(tit,(", cols:%d"%cols) if cols else '',(", regra:'%s', regra_pt:'%s'"%(regra,regra_pt)) if regra else '',','.join(caixas),','.join(itens))
# 1. palavra -> figura (in, on, under). inside fica fora: o peixe tambem esta 'in' o aquario (duas certas)
antes_do_teste('pos1',T('Put the word on the picture',[C(w,'',img='prep-'+w) for w in ['in','on','under']],[I(w,w) for w in ['in','on','under']],3,'Drag each word to its picture.','Arraste cada palavra para a sua figura.'))
# 2. palavra -> figura (behind, in front of, between, next to, near, far from)
P2=[('behind','behind'),('in-front-of','in front of'),('between','between'),('far-from','far from')]  # near x next to: duas certas, ficam fora
antes_do_teste('pos2',T('Put the word on the picture',[C(k,'',img='prep-'+k) for k,_ in P2],[I(k,w) for k,w in P2],2,'Drag each word to its picture.','Arraste cada palavra para a sua figura.'))
# 4. vista da torre
V=['front','top','bottom']  # side parece front na foto: fica fora
antes_do_teste('persp',T('Where are you looking from?',[C(v,'',img='view-'+v) for v in V],[I(v,'from the '+v) for v in V],3,'Drag each label to its picture.','Arraste cada etiqueta para a sua figura.'))
# 5. ajuda ou prejudica
H5=[('help','help-water-plants'),('help','help-water-energy'),('help','help-wind-energy'),('help','help-wind-seeds'),('harm','harm-tsunami'),('harm','harm-floods'),('harm','harm-tornado'),('harm','harm-winds')]
antes_do_teste('forcas',T('Helpful or harmful?',[C('help','Helpful','', '#22c55e'),C('harm','Harmful','','#ef4444')],[I(c,None,img) for c,img in H5],2))
# 6. objeto -> movimento (um exemplo de cada, a figura do slide)
M6=[('bounce','obj-bounce-basketball'),('fly','obj-fly-kite'),('roll','obj-roll-wheel'),('slide','obj-slide-ice-cube'),('spin','obj-spin-top'),('swing','obj-swing-swing')]
COR={'bounce':'#eab308','fly':'#0ea5e9','roll':'#ec4899','slide':'#8b5cf6','spin':'#f97316','swing':'#22c55e'}
antes_do_teste('objetos',T('How does it move?',[C(k,k,None,COR[k]) for k,_ in M6],[I(k,None,img) for k,img in M6],3))
# 7. corpo ou mao (palavras do slide)
B7=['swim','climb','walk','sit']; M7=['touch','write','grab','point']
antes_do_teste('animais',T('My body or my hand?',[C('body','My body',None,'#34d399'),C('hand','My hand',None,'#38bdf8')],[I('body',w) for w in B7]+[I('hand',w) for w in M7],2))
# 8. empurrar ou puxar (push-door fica fora: traz a palavra PUSH)
P8=[('push','push-bike'),('push','push-box'),('push','push-ball'),('pull','pull-rope'),('pull','pull-wagon'),('pull','pull-drawer'),('pull','pull-fish')]
antes_do_teste('pushpull',T('Push or pull?',[C('push','Push',None,'#f97316'),C('pull','Pull',None,'#38bdf8')],[I(c,None,img) for c,img in P8],2))
# 8b. logo depois da definicao: ligar push a away from me e pull a closer to me (Paulo 03/11)
i=s.index("{k:'pushpull'"); j=s.index("{tipo:'texto', tit:'Push',",i)
s=s[:j]+T('Away or closer?',[C('push','Push','push-box','#f97316'),C('pull','Pull','pull-wagon','#38bdf8')],[I('push','away from me'),I('pull','closer to me')],2,'Drag each one to push or to pull.','Arraste cada um para push ou para pull.')+",\n "+s[j:]
# na definicao, push e pull tambem em destaque
D=lambda w:'<span class="dest">'+w+'</span>'
for w in ('push','pull'):
    a="R('A "+w+" is when I use"; assert s.count(a)==1,a
    s=s.replace(a,"R('A "+D(w)+" is when I use")
s=s.replace(",img:''","")
open(L,'w',encoding='utf-8',newline='').write(s)
print('ok')
