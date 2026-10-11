# -*- coding: utf-8 -*-
"""Monta ferramentas/LP3_video.html (padrao do OP_video.html) com o sumario por cena.
Os tempos vem da timeline que DIRIGIU o render, conferidos contra a duracao real do mp4.
Uso: python gerar_pagina.py <scratch>"""
import json, os, subprocess, sys, html

SCR = sys.argv[1]
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", "..", ".."))
MP4 = os.path.join(RAIZ, "ferramentas", "media", "video_lp3_pt.mp4")
tl = json.load(open(os.path.join(SCR, "timeline.json"), encoding="utf-8"))
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", MP4],
                           capture_output=True, text=True).stdout)
assert abs(dur - tl["total"]) < 0.5, (dur, tl["total"])

def mmss(s):
    s = int(s); return f"{s//60}:{s%60:02d}"

itens = []
for c in tl["cenas"]:
    t = max(0, c["ini"] + 0.35)  # depois do cruzamento entre cenas
    itens.append(f'        <li><button class="cap" data-t="{t:.2f}"><span class="tm">{mmss(t)}</span>'
                 f'<span class="nm">{html.escape(c["nome"])}</span></button></li>')
minutos = round(dur / 60)

PAG = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0d0b1e">
<title>O vídeo — Português: contos de fadas, paráfrase, paródia e ortografia</title>
<link rel="stylesheet" href="serafina-core.css?v=20261011">
<style>
/* ============================================================
   O VIDEO DE PORTUGUES (3o tri) — todo o conteudo em desenho, com o ursinho.
   Video feito por codigo (trabalho/3tri_portugues/video/), narrado pela Thalita.
   Sem autoplay: som so quando ela mandar (regra do projeto).
   O sumario pula o video para a cena; os tempos sao os do video gerado.
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
.iconbtn:active{{transform:scale(.9)}}
.stage{{flex:1;display:flex;align-items:flex-start;justify-content:center;padding:16px clamp(10px,3vw,26px) 40px}}
.card{{width:100%;max-width:900px;background:var(--card);border-radius:24px;box-shadow:0 14px 40px rgba(0,0,0,.35);
  padding:clamp(16px,4vw,28px);border:1px solid var(--line)}}
h1{{font-size:calc(clamp(1.25rem,4vw,1.65rem)*var(--fs));font-weight:900;line-height:1.2;margin-bottom:6px}}
.sub{{font-size:calc(.95rem*var(--fs));font-weight:800;color:var(--soft);line-height:1.55;margin-bottom:16px}}
video{{width:100%;border-radius:16px;background:#000;display:block;border:1px solid var(--line);aspect-ratio:16/9}}
h2{{font-size:calc(1.02rem*var(--fs));font-weight:900;margin:20px 0 10px;color:var(--accent)}}
.caps{{list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}}
.cap{{width:100%;min-height:48px;display:flex;align-items:center;gap:10px;text-align:left;border:1px solid var(--line);
  border-radius:13px;background:var(--surf);color:var(--ink);font-family:inherit;font-weight:800;
  font-size:calc(.92rem*var(--fs));padding:8px 12px;cursor:pointer}}
.cap:active{{transform:scale(.98)}}
.cap .tm{{flex:0 0 auto;min-width:46px;padding:3px 7px;border-radius:9px;background:var(--line);font-variant-numeric:tabular-nums;text-align:center;font-size:.85em}}
.cap.on{{border-color:var(--accent);background:rgba(244,114,182,.16)}}
.cap.on .tm{{background:var(--accent);color:#2a1030}}
.acao{{display:block;width:100%;min-height:56px;margin-top:18px;border:none;border-radius:16px;
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
    <button class="iconbtn sera-home" title="Início" onclick="goHome()">&#127968;</button>
    <span class="title">O vídeo de Português</span>
    <button class="iconbtn" title="Letra menor" onclick="fs(-1)">A-</button>
    <button class="iconbtn" title="Letra maior" onclick="fs(1)">A+</button>
    <button class="iconbtn" title="Tema" onclick="document.body.classList.toggle('light')">&#127769;</button>
    <button class="iconbtn lockbtn" id="lockbtn" title="Tela cheia" onclick="toggleLock()">&#128274;</button>
  </div>
  <div class="stage">
    <div class="card">
      <h1>Contos de fadas, paráfrase, paródia e ortografia, em desenho</h1>
      <p class="sub">Uns {minutos} minutos com o ursinho. Tudo o que está nas lições, contado de um jeito só de assistir.
        Toque numa parte da lista para pular direto para ela.</p>

      <video id="vid" controls playsinline preload="metadata" poster="media/video_lp3_poster.jpg">
        <source src="media/video_lp3_pt.mp4?v=20261012b" type="video/mp4">
        Se o vídeo não abrir aqui, peça para um adulto abrir o arquivo
        <b>media/video_lp3_pt.mp4</b>.
      </video>

      <h2>As partes do vídeo</h2>
      <ul class="caps" id="caps">
{chr(10).join(itens)}
      </ul>

      <button class="acao" onclick="location.href='LP3_simulado.html'">Agora treinar no simulado &rarr;</button>
      <button class="acao pass" onclick="location.href='LP3_estudo.html'">Estudar as lições</button>
    </div>
  </div>
</div>
<script>window.SERA_CFG={{trKey:null,lang:'pt-BR',home:'../index.html',stars:110,somKey:'lp3_som'}};</script>
<script src="serafina-core.js?v=20261011"></script>
<script src="OP_voz.js?v=20261011"></script>
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
}})();
</script>
<script>window.SERA_ACCENT={{accent:'#f472b6'}};</script>
<script src="sera_theme.js?v=20261011"></script>
</body>
</html>
'''
open(os.path.join(RAIZ, "ferramentas", "LP3_video.html"), "w", encoding="utf-8", newline="\n").write(PAG)
print("LP3_video.html ok; duracao", round(dur, 2))
for c in tl["cenas"]:
    print(f"  {mmss(c['ini'] + .35)}  ({c['ini']:.2f}s)  {c['nome']}")
