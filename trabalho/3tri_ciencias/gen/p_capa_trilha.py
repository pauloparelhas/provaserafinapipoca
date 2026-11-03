# Pedido do Paulo (02/11): oclusao discreta (veu no mesmo tom) e capa da teoria com arte: a trilha no mapa, com figuras dos slides.
import re
p = 'ferramentas/CIE3_estudo.html'
t = open(p, encoding='utf-8').read().replace('\r\n', '\n')

# 1. oclusao discreta
i = t.index('b.ocl{display:inline-block')
j = t.index('.oclbtn{', i)
t = t[:i] + """b.ocl{display:inline-block;min-width:44px;min-height:28px;padding:0 6px;margin:1px 0;border-radius:7px;text-align:center;cursor:pointer;transition:background .2s,color .2s}
b.ocl.fechado{color:transparent;background:color-mix(in srgb,currentColor 0%,var(--ink) 18%);user-select:none}
""" + t[j:]
t = t.replace('Tap the striped words.<span class="tr">Toque nas palavras listradas.</span>', 'Tap the hidden words.<span class="tr">Toque nas palavras escondidas.</span>')

# 2. capa
css = """
/* capa: a trilha no mapa da escola (S1), com as figuras dos slides */
.mapa-capa{position:relative;max-width:560px;margin:0 auto;border-radius:22px;overflow:hidden;color:#3b2a14;
  background:linear-gradient(90deg,rgba(120,84,40,.07) 1px,transparent 1px) 0 0/34px 34px,linear-gradient(rgba(120,84,40,.07) 1px,transparent 1px) 0 0/34px 34px,linear-gradient(165deg,#fff8e6,#f6e7c4);
  box-shadow:0 10px 30px rgba(0,0,0,.35),inset 0 0 0 3px #e4cf9f}
.mc-top{position:relative;display:flex;align-items:center;gap:10px;padding:16px 14px 12px}
.mc-top svg{flex:0 0 auto;width:76px;height:92px}
.mc-top h1{font-size:calc(1.72rem*var(--fs));font-weight:900;line-height:1.02;color:#0c4a6e;letter-spacing:-.3px}
.mc-top p{font-size:calc(.95rem*var(--fs));font-weight:800;line-height:1.3;margin-top:5px;color:#5b4524}
.mapa-capa .tr{color:#92400e}
.mc-tornado{animation:mcbal 3.2s ease-in-out infinite;transform-origin:50% 100%}
@keyframes mcbal{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
.trilha{position:relative;padding:4px 10px 12px}
.trilha>svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.parada{position:relative;display:flex;align-items:center;gap:9px;width:74%;min-height:104px;margin:0;padding:4px;border:0;background:none;font:inherit;color:inherit;text-align:left;cursor:pointer}
.parada.dir{margin-left:26%;flex-direction:row-reverse;text-align:right}
.parada .foto{position:relative;flex:0 0 auto;width:92px;height:92px;border-radius:50%;background:#fff center/cover no-repeat;box-shadow:0 0 0 5px var(--lc),0 7px 14px rgba(70,45,10,.35);transition:transform .15s}
.parada:hover .foto,.parada:focus-visible .foto{transform:scale(1.06)}
.parada .num{position:absolute;left:-5px;top:-5px;width:32px;height:32px;border-radius:50%;background:var(--lc);color:#fff;font-weight:900;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,.3);text-shadow:0 1px 2px rgba(0,0,0,.45)}
.parada .ok{position:absolute;right:-5px;bottom:-3px;width:34px;height:34px;border-radius:50%;background:#16a34a;color:#fff;font-size:20px;font-weight:900;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,.3)}
.parada .nome{font-size:calc(1.03rem*var(--fs));font-weight:900;line-height:1.14;color:#3b2a14}
.parada .aqui{position:absolute;top:-30px;left:32px;width:30px;height:40px;animation:mcpin 1.3s ease-in-out infinite;filter:drop-shadow(0 3px 2px rgba(0,0,0,.3))}
.parada.dir .aqui{left:auto;right:32px}
@keyframes mcpin{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.chegada{position:relative;display:flex;align-items:center;justify-content:center;gap:9px;margin:8px auto 6px;width:82%;min-height:58px;border-radius:16px;background:linear-gradient(180deg,#f97316,#c2410c);color:#fff;font-weight:900;font-size:calc(1.1rem*var(--fs));text-decoration:none;box-shadow:0 5px 0 #7c2d12,0 10px 16px rgba(70,45,10,.3);text-align:center}
.chegada .tr{color:#ffedd5}
.mc-placar{position:relative;display:flex;align-items:center;gap:9px;padding:4px 16px 14px;font-weight:900;font-size:calc(.9rem*var(--fs));color:#5b4524}
.mc-placar .trilho{flex:1;height:10px;border-radius:6px;background:#e4cf9f;overflow:hidden}.mc-placar .trilho i{display:block;height:100%;background:#16a34a}
"""
a = ".fescb{display:block;"
assert a in t
t = t.replace(a, css.strip() + "\n" + a, 1)

i = t.index("  tela.innerHTML='<div class=\"capa\"><h1>Motion Rangers")
j = t.index("  tela.querySelectorAll('.lic').forEach", i)
novo = r"""  var PARADAS=[['prep-in','In, on, under','Dentro, sobre, embaixo'],['prep-between','Behind, between, near','Atrás, entre, perto'],['map-school','Reading a map','Lendo um mapa'],['view-bottom','Seen from where?','Visto de onde?'],['harm-tornado','Wind and water','Vento e água'],['obj-spin-pinwheel','How things move','Como as coisas se movem'],['hand','Animals and my body','Animais e meu corpo'],['pull-rope','Push or pull?','Empurrar ou puxar?']];
  var PIN='<svg class="aqui" viewBox="0 0 30 40" aria-hidden="true"><path d="M15 39C8 27 2 21 2 14a13 13 0 0 1 26 0c0 7-6 13-13 25z" fill="#e11d2e" stroke="#7f1d1d" stroke-width="1.5"/><circle cx="15" cy="14" r="6" fill="#fff"/></svg>';
  var prox=-1; LICOES.some(function(l,i){ if(!f[l.k]){ prox=i; return true; } return false; });
  /* a rota tracejada liga o centro das fotos, em zigue-zague */
  var N=LICOES.length, d='M 21 '+(100/(N+.7)*.5).toFixed(2), kk;
  for(kk=1;kk<N;kk++){ var y0=(kk-.5)*100/(N+.7), y1=(kk+.5)*100/(N+.7), x1=kk%2?79:21, x0=kk%2?21:79; d+=' C '+x0+' '+((y0+y1)/2).toFixed(2)+', '+x1+' '+((y0+y1)/2).toFixed(2)+', '+x1+' '+y1.toFixed(2); }
  d+=' L 50 99';
  tela.innerHTML='<div class="mapa-capa"><div class="mc-top">'+
    '<svg viewBox="0 0 76 92" aria-hidden="true"><g class="mc-tornado"><path d="M6 8c20-8 44-8 64 0-3 9-14 13-20 18-5 5-5 10-7 16-3 9-3 19-5 44-3-24-7-34-12-44-4-7-14-10-20-34z" fill="#8a94a6"/><path d="M8 13c18 7 42 7 60 0M17 27c12 5 30 5 42 0M26 42c8 3 18 3 25 0M31 57c5 2 10 2 14 0" stroke="#5c6678" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="29" cy="18" r="6.5" fill="#fff"/><circle cx="48" cy="18" r="6.5" fill="#fff"/><circle cx="30.5" cy="19" r="3" fill="#1e293b"/><circle cx="49.5" cy="19" r="3" fill="#1e293b"/><path d="M33 30c3 3 8 3 11 0" stroke="#1e293b" stroke-width="2.6" fill="none" stroke-linecap="round"/></g></svg>'+
    '<div><h1>Motion Rangers</h1><p>Twister blew everything away. Follow the map!'+TRc('O Twister espalhou tudo. Siga o mapa!')+'</p></div></div>'+
    '<div class="trilha"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="'+d+'" fill="none" stroke="#2563eb" stroke-width="4" stroke-dasharray="9 8" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'+
    LICOES.map(function(l,i){ var P=PARADAS[i]||['prep-in',l.nome,l.nome_pt||''];
      return '<button class="parada lic'+(i%2?' dir':'')+'" data-i="'+i+'" style="--lc:'+corDe(l)+'"><span class="foto" style="background-image:url(media/cie3/'+P[0]+'.jpg)"><span class="num">'+(i+1)+'</span>'+(f[l.k]?'<span class="ok" aria-label="done">&#10003;</span>':'')+(i===prox?PIN:'')+'</span><span class="nome">'+P[1]+TRc(P[2])+'</span></button>';
    }).join('')+
    '<a class="chegada" href="CIE3_simulado.html">&#127937; Practice Test'+TRc('Simulado')+'</a></div>'+
    '<div class="mc-placar"><span>'+n+' / '+LICOES.length+TRc(n+' de '+LICOES.length+' feitas')+'</span><span class="trilho"><i style="width:'+Math.round(n/LICOES.length*100)+'%"></i></span></div></div>';
"""
t = t[:i] + novo + t[j:]
open(p, 'w', encoding='utf-8', newline='').write(t)
print('ok')
