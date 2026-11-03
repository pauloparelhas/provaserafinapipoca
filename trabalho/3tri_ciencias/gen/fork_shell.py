# Deriva CIE3_simulado/estudo do shell ING3 com as melhorias do HIS3. Substituicoes EXATAS: imprime o que nao achou.
import re
D='ferramentas/'
def fork(src,dst,subs):
    s=open(D+src,encoding='utf-8').read()
    for a,b in subs:
        if a not in s: print('NAO ACHOU',src,repr(a[:60]))
        s=s.replace(a,b)
    s=s.replace('ING3','CIE3').replace('ing3','cie3')
    open(D+dst,'w',encoding='utf-8',newline='').write(s)
foto='''/* ---- CIE3: figura da aula ---- */
.quadro .fotofonte{display:block;width:100%;max-width:420px;margin:0 auto;border-radius:10px;border:2px solid var(--line);background:#fff}
body.papel .quadro .fotofonte{border-color:#bbb}
'''
fork('ING3_simulado.html','CIE3_simulado.html',[
 ('<title>Simulado — Inglês</title>','<title>Practice Test — Science</title>'),
 (r'ENGLISH LANGUAGE ARTS \2013  YEAR 2',r'SCIENCE \2013  YEAR 2'),
 ('/* ---- ING3: traducao atras da bandeira e poema ---- */',foto+'/* ---- traducao atras da bandeira ---- */'),
 ('@media (max-width:430px){.topbar{gap:4px}.topbar .iconbtn{width:38px;min-width:38px;height:44px;padding:0;font-size:15px}#trbtn svg{width:22px;height:16px}}','@media (max-width:430px){.topbar{gap:3px;padding:6px;flex-wrap:wrap;justify-content:center}.topbar .title{display:none}.topbar .iconbtn{width:auto;min-width:44px;height:44px;padding:0;font-size:15px}#trbtn svg{width:22px;height:16px}}'),
 ('Rodada de 12 com as cotas por tema (fairy 3, real 2, circle 2, cause 2,','Rodada de 14 com as cotas por tema (ver gen_simulado_cie3.js;'),
 ('poem 3). A rodada','). A rodada'),
 ('Practice Test — English','Practice Test — Science'),
 ('Fairy tales · Real or make-believe · Circle stories · Cause and effect · Poems','Position · Directions · Perspective · Wind and water · Objects · Animals · Push or pull'),
 ('Simulado de Inglês · 3º trimestre','Practice Test · Science · 3rd term'),
])
h=open(D+'HIS3_estudo.html',encoding='utf-8').read()
m=re.search(r"/\* ---- HIS3: Caderno do Detetive ---- \*/.*?(?=/\* ---- herdado do ING3 ---- \*/)",h,re.S)
fala=m.group(0).replace('HIS3: Caderno do Detetive','CIE3: herdado do Caderno do Detetive')
s=open(D+'ING3_estudo.html',encoding='utf-8').read()
a=s.index("window.ING3ARTE={icone"); b=s.index("return '<svg class=\"licic\"",a)
arte=s[a:b]
novo='''window.ING3ARTE={icone:function(k){ var c={position:'#f472b6',directions:'#fb7185',perspective:'#fbbf24',forces:'#38bdf8',objects:'#a78bfa',animals:'#34d399',pushpull:'#f97316'}[k]||'#f472b6';
  var d={position:'<circle cx="18" cy="14" r="10" fill="'+c+'"/><path d="M10 20l8 13 8-13z" fill="'+c+'"/><circle cx="18" cy="14" r="4" fill="#fff"/>',
         directions:'<path d="M3 18 18 3l15 15-15 15z" fill="'+c+'"/><path d="M11 18h13m-5-5 5 5-5 5" stroke="#1e1b3a" stroke-width="3" fill="none"/>',
         perspective:'<ellipse cx="18" cy="18" rx="15" ry="10" fill="'+c+'"/><circle cx="18" cy="18" r="5" fill="#1e1b3a"/>',
         forces:'<path d="M18 3c7 9 10 13 10 19a10 10 0 0 1-20 0c0-6 3-10 10-19z" fill="'+c+'"/>',
         objects:'<circle cx="18" cy="24" r="9" fill="'+c+'"/><path d="M7 6c2 5 4 5 6 0M23 6c2 5 4 5 6 0" stroke="'+c+'" stroke-width="3" fill="none"/>',
         animals:'<circle cx="18" cy="24" r="8" fill="'+c+'"/><circle cx="7" cy="15" r="4" fill="'+c+'"/><circle cx="14" cy="9" r="4" fill="'+c+'"/><circle cx="22" cy="9" r="4" fill="'+c+'"/><circle cx="29" cy="15" r="4" fill="'+c+'"/>',
         pushpull:'<path d="M2 18h13m-5-6 6 6-6 6" stroke="'+c+'" stroke-width="4" fill="none"/><path d="M34 18H21m5-6-6 6 6 6" stroke="'+c+'" stroke-width="4" fill="none"/>'}[k]||'';
  '''
fork('ING3_estudo.html','CIE3_estudo.html',[
 ('<title>English · Study</title>','<title>Science · Study</title>'),
 ('TEORIA de Inglês (ELA, 3º tri)','TEORIA de Science (3º tri)'),
 ('/* ---- ING3: tradução atrás da bandeira, aviso, texto de leitura ---- */',fala+'.naprova{margin:6px 0 0;padding-left:22px;font-weight:800;line-height:1.35}.naprova li{margin:0 0 10px}.naprova .resp{color:#16a34a}body.light .naprova .resp{color:#15803d}.nptit{font-weight:900;margin:0 0 6px}\n.lw .fesc{display:block;width:100%;max-width:220px;margin:0 auto 6px;border-radius:10px;background:#fff}
.lw{min-width:0;max-width:100%}.fesc{max-width:100%}
.fescb{display:block;width:100%;max-width:320px;margin:0 auto 8px;border-radius:10px;background:#fff}\n.figs{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin:6px 0 10px}.figs figure{margin:0;text-align:center;font-weight:800}.figs img{width:100%;border-radius:10px;background:#fff;display:block;margin-bottom:3px}\n@media(max-width:520px){.passos.vert{flex-direction:column;align-items:stretch}}\n.ops.longas .op{flex-basis:120px}\n/* ---- tradução atrás da bandeira, aviso ---- */'),
 ('<span class="title" id="titulo">English · Study</span>','<span class="title" id="titulo">Motion Rangers · Study</span>'),
 (arte,novo),
 ('@media (max-width:430px){.topbar .iconbtn{width:38px;min-width:38px;height:44px;padding:0}}','@media (max-width:430px){.topbar{gap:3px;padding:6px;flex-wrap:wrap;justify-content:center}.topbar .title{display:none}.topbar .iconbtn{width:auto;min-width:44px;height:44px;padding:0}}'),
 ("titulo.textContent='English · Study';","titulo.textContent='Motion Rangers · Study';"),
 ("<h1>English · 3rd term'+TRc('Inglês · 3º trimestre')+'</h1>'+","<h1>Motion Rangers · Study'+TRc('Motion Rangers · Teoria')+'</h1><div class=\"falaper\" style=\"--lc:#f472b6\"><b>Pin</b><span>Twister blew everything away! Study the lessons and find it all.'+TRc('O Twister espalhou tudo! Estude as lições e encontre tudo.')+'</span></div>'+"),
])
s=open(D+'CIE3_estudo.html',encoding='utf-8').read()
a="""'</div>'+(it.texto?'<div class="tqtexto">'"""
assert a in s
s=s.replace(a,"""'</div>'+(it.img?'<img class="tqimg" src="'+it.img+'" alt="">':'')+(it.texto?'<div class="tqtexto">'""",1)
s=s.replace('.tqimg{display:block;','.tqimg{background:#fff;display:block;')
open(D+'CIE3_estudo.html','w',encoding='utf-8',newline='').write(s)
print('tqimg ja existe' if 'it.img' in s else 'FALTA it.img no treino')
print('ingles residual:',[w for w in ('fairy','Fairy','poem','Poem','castle','English') if w in s])
