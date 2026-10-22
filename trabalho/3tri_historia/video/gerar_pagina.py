# -*- coding: utf-8 -*-
"""ING3 (copia adaptada do gerar_pagina.py do LP3). Monta ferramentas/ING3_video.html e a legenda
em portugues ferramentas/media/video_ing3_pt.vtt.

Imersao total em ingles: nenhuma palavra em portugues visivel. O portugues so aparece pela
bandeira do Brasil (toggleTr do serafina-core, chave 'ing3_tr' — a mesma do resto do site):
liga body.show-tr (as <span class="tr">) e a legenda PT do video, mostrada numa faixa logo
abaixo do player (o video ja tem a legenda em ingles gravada na imagem; por cima dela a PT
cobriria a inglesa).
Os tempos vem da timeline que DIRIGIU o render, conferidos contra a duracao real do mp4.
Uso: python gerar_pagina.py <scratch>"""
import json, os, subprocess, sys, html

SCR = sys.argv[1]
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", "..", ".."))
MP4 = os.path.join(RAIZ, "ferramentas", "media", "video_ing3.mp4")
VTT = os.path.join(RAIZ, "ferramentas", "media", "video_ing3_pt.vtt")
tl = json.load(open(os.path.join(SCR, "timeline.json"), encoding="utf-8"))
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", MP4],
                           capture_output=True, text=True).stdout)
assert abs(dur - tl["total"]) < 0.5, (dur, tl["total"])
VER = "20261014"

NOME_PT = {
    "ft": "O que é conto de fadas?", "chars": "Personagens", "goodbad": "Bom, mau e um ajudante especial",
    "settings": "Cenários", "events": "Era uma vez…", "magic": "Magia", "numbers": "Três e sete",
    "lesson": "Uma lição", "real": "Real ou faz de conta?", "circle": "História circular",
    "mouse": "Se você der um biscoito a um rato", "cause": "Causa e efeito", "ifthen": "Se… Então…",
    "poetry": "Poesia e poema", "elements": "Elementos do poema", "rhyme": "Rima, ritmo e imagens",
    "recap": "Lembre!",
}


def mmss(s):
    s = int(s); return f"{s//60}:{s%60:02d}"


def ts(s):
    h = int(s // 3600); m = int(s % 3600 // 60); x = s % 60
    return f"{h:02d}:{m:02d}:{x:06.3f}"


# ---- legenda PT: mesmos tempos da legenda em ingles gravada no video (render.html captionAt) ----
cues = []
for c in tl["cenas"]:
    fr = c["frases"]
    for i, f in enumerate(fr):
        st = f["ini"] - 0.12
        end = fr[i + 1]["ini"] - 0.13 if i + 1 < len(fr) else min(c["fim"] - 0.35, f["fim"] + 0.9)
        cues.append((st, end, f["pt"]))
with open(VTT, "w", encoding="utf-8", newline="\n") as fo:
    fo.write("WEBVTT\n\n")
    for k, (a, b, t) in enumerate(cues, 1):
        fo.write(f"{k}\n{ts(a)} --> {ts(b)}\n{t}\n\n")

itens = []
for c in tl["cenas"]:
    t = max(0, c["ini"] + 0.35)  # depois do cruzamento entre cenas
    itens.append(f'        <li><button class="cap" data-t="{t:.2f}"><span class="tm">{mmss(t)}</span>'
                 f'<span class="nm">{html.escape(c["nome"])}<span class="tr">{html.escape(NOME_PT[c["id"]])}</span></span></button></li>')
minutos = round(dur / 60)
cues_js = json.dumps([[round(a, 2), round(b, 2), t] for a, b, t in cues], ensure_ascii=False)

FLAG = ('<svg viewBox="0 0 28 20" width="26" height="19" aria-hidden="true"><rect width="28" height="20" rx="3" fill="#009c3b"/>'
        '<path d="M14 3 25 10 14 17 3 10z" fill="#ffdf00"/><circle cx="14" cy="10" r="4.2" fill="#002776"/></svg>')

PAG = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0d0b1e">
<title>The video — English: fairy tales, stories and poems</title>
<link rel="stylesheet" href="serafina-core.css?v={VER}">
<style>
/* ============================================================
   O VIDEO DE INGLES (3o tri) — gerado por trabalho/3tri_ingles/video/ (mesmo pipeline do LP3),
   com a arte do jogo The Lost Endings, narrado pela Thalita multilingue em ingles.
   Imersao total: nada em portugues na tela; o portugues vive atras da bandeira
   (<span class="tr"> + legenda PT numa faixa abaixo do player, sincronizada pelo timeupdate).
   Sem autoplay: som so quando ela mandar (regra do projeto).
   ============================================================ */
:root{{--fs:1;--bg:#0d0b1e;--bg2:#2a1736;--ink:#f2f7ff;--soft:rgba(255,255,255,.62);--dim:rgba(255,255,255,.42);
  --card:#22152f;--line:rgba(255,255,255,.13);--accent:#f472b6;--surf:rgba(255,255,255,.06)}}
body.light{{--bg:#fdf0f6;--bg2:#f3e8ff;--ink:#2a1030;--soft:rgba(42,16,48,.66);--dim:rgba(42,16,48,.5);
  --card:#fff;--line:rgba(42,16,48,.13);--accent:#be185d;--surf:rgba(42,16,48,.05)}}
*{{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}}
html,body{{height:100%}}
body{{font-family:'Nunito','Segoe UI',system-ui,sans-serif;background:linear-gradient(160deg,var(--bg),var(--bg2));color:var(--ink);overflow-x:hidden}}
.app{{position:relative;z-index:1;display:flex;flex-direction:column;min-height:100dvh}}
.topbar{{display:flex;align-items:center;gap:6px;padding:10px 12px;background:var(--card);box-shadow:0 2px 14px rgba(0,0,0,.25)}}
.topbar .title{{font-weight:900;font-size:calc(.9rem*var(--fs));color:var(--accent);flex:1;line-height:1.1}}
.iconbtn{{min-width:44px;height:44px;border:none;border-radius:13px;background:var(--line);color:var(--ink);font-size:1.02rem;font-weight:800;cursor:pointer;padding:0 8px;font-family:inherit}}
.iconbtn svg{{width:22px;height:22px;display:block;margin:auto}}
#trbtn svg{{width:26px;height:19px;border-radius:3px}}
body.show-tr #trbtn{{outline:2px solid var(--accent);outline-offset:2px}}
.iconbtn:active{{transform:scale(.9)}}
.stage{{flex:1;display:flex;align-items:flex-start;justify-content:center;padding:16px clamp(10px,3vw,26px) 40px}}
.card{{width:100%;max-width:900px;background:var(--card);border-radius:24px;box-shadow:0 14px 40px rgba(0,0,0,.35);
  padding:clamp(16px,4vw,28px);border:1px solid var(--line)}}
.aviso{{margin:0 0 14px;padding:9px 12px;border-radius:12px;background:#fff3c4;border:2px solid #d19a00;color:#4a3000;font-weight:900;font-size:14px;text-align:center}}
.aviso .tr{{color:#4a3000}}
h1{{font-size:calc(clamp(1.25rem,4vw,1.65rem)*var(--fs));font-weight:900;line-height:1.2;margin-bottom:6px}}
.sub{{font-size:calc(.95rem*var(--fs));font-weight:800;color:var(--soft);line-height:1.55;margin-bottom:16px}}
.tr{{display:none}}
body.show-tr .tr{{display:block;font-size:.8em;font-weight:700;opacity:.8;margin-top:3px;line-height:1.3}}
video{{width:100%;border-radius:16px;background:#000;display:block;border:1px solid var(--line);aspect-ratio:16/9}}
.ptcap{{display:none;margin-top:8px;min-height:3.2em;padding:8px 14px;border-radius:12px;background:var(--surf);border:1px dashed var(--line);
  font-weight:800;font-size:calc(1rem*var(--fs));line-height:1.4;color:var(--ink);text-align:center}}
body.show-tr .ptcap{{display:flex;align-items:center;justify-content:center}}
h2{{font-size:calc(1.02rem*var(--fs));font-weight:900;margin:20px 0 10px;color:var(--accent)}}
.caps{{list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}}
.cap{{width:100%;min-height:48px;display:flex;align-items:center;gap:10px;text-align:left;border:1px solid var(--line);
  border-radius:13px;background:var(--surf);color:var(--ink);font-family:inherit;font-weight:800;
  font-size:calc(.92rem*var(--fs));padding:8px 12px;cursor:pointer}}
.cap:active{{transform:scale(.98)}}
.cap .tm{{flex:0 0 auto;min-width:46px;padding:3px 7px;border-radius:9px;background:var(--line);font-variant-numeric:tabular-nums;text-align:center;font-size:.85em}}
.cap .nm{{min-width:0}}
.cap.on{{border-color:var(--accent);background:rgba(244,114,182,.16)}}
.cap.on .tm{{background:var(--accent);color:#2a1030}}
.acao{{display:block;width:100%;min-height:56px;margin-top:18px;border:none;border-radius:16px;padding:8px 12px;
  background:linear-gradient(90deg,var(--accent),#ec4899);color:#2a0618;font-family:inherit;font-weight:900;
  font-size:calc(1.05rem*var(--fs));cursor:pointer}}
.acao:active{{transform:translateY(1px)}}
.acao.pass{{background:var(--surf);color:var(--ink);border:2px solid var(--line);margin-top:10px}}
@media(min-width:700px){{:root{{--fs:1.1}} .card{{padding:30px 34px}}}}
@media(max-width:430px){{
  .topbar{{flex-wrap:wrap;gap:4px}}
  .topbar .title{{flex:0 0 100%;order:-1;margin-bottom:1px;font-size:.82rem}}
  .topbar .iconbtn{{min-width:0;flex:1 1 0;padding:0 4px}}
  .caps{{grid-template-columns:1fr}}
}}
</style>
</head>
<body>
<canvas id="starfield"></canvas>
<div class="app">
  <div class="topbar">
    <button class="iconbtn sera-home" id="btnHome" title="Home" aria-label="Home" onclick="goHome()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg></button>
    <span class="title">The video · English</span>
    <button class="iconbtn" id="trbtn" title="Portuguese" aria-label="Portuguese" onclick="toggleTr()">{FLAG}</button>
    <button class="iconbtn" id="btnFontDown" title="Smaller text" aria-label="Smaller text" onclick="fs(-1)">A-</button>
    <button class="iconbtn" id="btnFontUp" title="Bigger text" aria-label="Bigger text" onclick="fs(1)">A+</button>
    <button class="iconbtn" id="themeBtn" title="Theme" aria-label="Theme">&#9788;</button>
    <button class="iconbtn lockbtn" id="lockbtn" title="Full screen" aria-label="Full screen" onclick="toggleLock()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></button>
  </div>
  <div class="stage">
    <div class="card">
      <div class="aviso">Under construction — content not yet reviewed<span class="tr">Em construção — conteúdo ainda não validado</span></div>
      <h1>Fairy tales, stories and poems<span class="tr">Contos de fadas, histórias e poemas</span></h1>
      <p class="sub">About {minutos} minutes of cartoons with Lia, Theo, Bia and Pip. Tap a part of the list to jump straight to it.
        <span class="tr">Uns {minutos} minutos de desenho com a Lia, o Theo, a Bia e o Pip. Toque numa parte da lista para pular direto para ela.</span></p>

      <video id="vid" controls playsinline preload="metadata" poster="media/video_ing3_poster.jpg?v={VER}">
        <source src="media/video_ing3.mp4?v={VER}" type="video/mp4">
        If the video does not open here, ask a grown-up to open the file <b>media/video_ing3.mp4</b>.
      </video>
      <div class="ptcap" id="ptcap" aria-live="polite"></div>

      <h2>The parts of the video<span class="tr">As partes do vídeo</span></h2>
      <ul class="caps" id="caps">
{chr(10).join(itens)}
      </ul>

      <button class="acao" onclick="location.href='ING3_simulado.html'">Now practise in the test &rarr;<span class="tr">Agora treinar no simulado</span></button>
      <button class="acao pass" onclick="location.href='ING3_estudo.html'">Study the lessons<span class="tr">Estudar as lições</span></button>
    </div>
  </div>
</div>
<div class="unlockov" id="unlockov">
  <div class="ulk-emo">&#128274;</div>
  <h2>Unlock the screen?<small>Ask a grown-up</small></h2>
  <button class="ulk-yes" onclick="doUnlock()">Unlock</button>
  <button class="ulk-no" onclick="cancelUnlock()">Keep watching</button>
</div>
<script>window.SERA_CFG={{trKey:'ing3_tr',lang:'en-US',home:'../index.html',stars:110,somKey:'ing3_som'}};</script>
<script src="serafina-core.js?v={VER}"></script>
<script>
(function(){{
  var v=document.getElementById('vid'), bts=[].slice.call(document.querySelectorAll('.cap'));
  bts.forEach(function(b){{ b.addEventListener('click',function(){{
    var t=parseFloat(b.dataset.t);
    try{{ v.currentTime=t; }}catch(e){{}}
    var p=v.play(); if(p&&p.catch) p.catch(function(){{}});
  }}); }});
  v.addEventListener('timeupdate',function(){{
    var on=-1; bts.forEach(function(b,i){{ if(v.currentTime+0.4>=parseFloat(b.dataset.t)) on=i; }});
    bts.forEach(function(b,i){{ b.classList.toggle('on',i===on); }});
  }});
  /* legenda em portugues: so com a bandeira ligada; aparece na faixa abaixo do player */
  /* mesmas falas e tempos de media/video_ing3_pt.vtt, embutidos (o file:// bloqueia <track>) */
  var CUES={cues_js};
  var cap=document.getElementById('ptcap');
  function mostra(){{
    var on=document.body.classList.contains('show-tr'), s='', t=v.currentTime;
    if(on) for(var i=0;i<CUES.length;i++){{ if(t>=CUES[i][0]&&t<CUES[i][1]){{ s=CUES[i][2]; break; }} }}
    if(cap.textContent!==s) cap.textContent=s;
  }}
  v.addEventListener('timeupdate',mostra); v.addEventListener('seeked',mostra);
  var orig=window.toggleTr; window.toggleTr=function(){{ orig(); mostra(); }};
  mostra();
}})();
</script>
<script>window.SERA_EN=true; window.SERA_ACCENT={{accent:'#f472b6'}};</script>
<script src="sera_theme.js?v={VER}"></script>
</body>
</html>
'''
open(os.path.join(RAIZ, "ferramentas", "ING3_video.html"), "w", encoding="utf-8", newline="\n").write(PAG)
print("ING3_video.html ok; duracao", round(dur, 2), "; legendas PT:", len(cues))
for c in tl["cenas"]:
    print(f"  {mmss(c['ini'] + .35)}  ({c['ini']:.2f}s)  {c['nome']}")
