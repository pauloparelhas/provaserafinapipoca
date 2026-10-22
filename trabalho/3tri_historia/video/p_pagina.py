# Adapta gerar_pagina.py (copiado do Ingles) para a pagina do video de Historia (PT puro).
import os
P = os.path.join(os.path.dirname(__file__), 'gerar_pagina.py')
s = open(P, encoding='utf-8').read()
R = [
 ('"""ING3 (copia adaptada do gerar_pagina.py do LP3). Monta ferramentas/ING3_video.html e a legenda\nem portugues ferramentas/media/video_ing3_pt.vtt.', '"""HIS3 (copia do ING3). Monta ferramentas/HIS3_video.html e a legenda\nferramentas/media/video_his3_pt.vtt.'),
 ('video_ing3.mp4"', 'video_his3.mp4"'), ('video_ing3_pt.vtt"', 'video_his3_pt.vtt"'),
 ('VER = "20261014"', 'VER = "20261022"'),
 ('''NOME_PT = {
    "ft": "O que é conto de fadas?", "chars": "Personagens", "goodbad": "Bom, mau e um ajudante especial",
    "settings": "Cenários", "events": "Era uma vez…", "magic": "Magia", "numbers": "Três e sete",
    "lesson": "Uma lição", "real": "Real ou faz de conta?", "circle": "História circular",
    "mouse": "Se você der um biscoito a um rato", "cause": "Causa e efeito", "ifthen": "Se… Então…",
    "poetry": "Poesia e poema", "elements": "Elementos do poema", "rhyme": "Rima, ritmo e imagens",
    "recap": "Lembre!",
}''', 'NOME_PT = {}'),
 ('<span class="nm">{html.escape(c["nome"])}<span class="tr">{html.escape(NOME_PT[c["id"]])}</span></span>', '<span class="nm">{html.escape(c["nome"])}</span>'),
 ('<html lang="en">', '<html lang="pt-BR">'),
 ('<title>The video — English: fairy tales, stories and poems</title>', '<title>O vídeo — História: Detetives do Tempo</title>'),
 ('<span class="title">The video · English</span>', '<span class="title">O vídeo · História</span>'),
 ('    <button class="iconbtn" id="trbtn" title="Portuguese" aria-label="Portuguese" onclick="toggleTr()">{FLAG}</button>\n', ''),
 ('title="Smaller text" aria-label="Smaller text"', 'title="Letra menor" aria-label="Letra menor"'),
 ('title="Bigger text" aria-label="Bigger text"', 'title="Letra maior" aria-label="Letra maior"'),
 ('title="Theme" aria-label="Theme"', 'title="Tema" aria-label="Tema"'), ('title="Full screen" aria-label="Full screen"', 'title="Tela cheia" aria-label="Tela cheia"'),
 ('      <div class="aviso">Under construction — content not yet reviewed<span class="tr">Em construção — conteúdo ainda não validado</span></div>\n', ''),
 ('<h1>Fairy tales, stories and poems<span class="tr">Contos de fadas, histórias e poemas</span></h1>', '<h1>Detetives do Tempo</h1>'),
 ('''<p class="sub">About {minutos} minutes of cartoons with Lia, Theo, Bia and Pip. Tap a part of the list to jump straight to it.
        <span class="tr">Uns {minutos} minutos de desenho com a Lia, o Theo, a Bia e o Pip. Toque numa parte da lista para pular direto para ela.</span></p>''',
  '<p class="sub">Uns {minutos} minutos com o Tic e os detetives: tudo da prova de História. Toque numa parte da lista para pular direto para ela.</p>'),
 ('poster="media/video_ing3_poster.jpg?v={VER}"', 'poster="media/video_his3_poster.jpg?v={VER}"'),
 ('<source src="media/video_ing3.mp4?v={VER}" type="video/mp4">', '<source src="media/video_his3.mp4?v={VER}" type="video/mp4">'),
 ('If the video does not open here, ask a grown-up to open the file <b>media/video_ing3.mp4</b>.', 'Se o vídeo não abrir aqui, peça a um adulto para abrir o arquivo <b>media/video_his3.mp4</b>.'),
 ('<h2>The parts of the video<span class="tr">As partes do vídeo</span></h2>', '<h2>As partes do vídeo</h2>'),
 ('''<button class="acao" onclick="location.href='ING3_simulado.html'">Now practise in the test &rarr;<span class="tr">Agora treinar no simulado</span></button>''', '''<button class="acao" onclick="location.href='HIS3_simulado.html'">Agora treinar no simulado &rarr;</button>'''),
 ('''<button class="acao pass" onclick="location.href='ING3_estudo.html'">Study the lessons<span class="tr">Estudar as lições</span></button>''', '''<button class="acao pass" onclick="location.href='HIS3_estudo.html'">Estudar no Caderno do Detetive</button>'''),
 ('<h2>Unlock the screen?<small>Ask a grown-up</small></h2>', '<h2>Desbloquear a tela?<small>Peça para um adulto</small></h2>'),
 ('<button class="ulk-yes" onclick="doUnlock()">Unlock</button>', '<button class="ulk-yes" onclick="doUnlock()">Desbloquear</button>'),
 ('<button class="ulk-no" onclick="cancelUnlock()">Keep watching</button>', '<button class="ulk-no" onclick="cancelUnlock()">Continuar assistindo</button>'),
 ("window.SERA_CFG={{trKey:'ing3_tr',lang:'en-US',home:'../index.html',stars:110,somKey:'ing3_som'}};", "window.SERA_PT=true; window.SERA_CFG={{trKey:null,lang:'pt-BR',home:'../index.html',stars:110,somKey:'his3_som'}};"),
 ('media/video_ing3_pt.vtt', 'media/video_his3_pt.vtt'),
 ('"ING3_video.html"', '"HIS3_video.html"'), ('print("ING3_video.html ok', 'print("HIS3_video.html ok'),
]
falta = [a[:70] for a, b in R if a not in s]
for a, b in R: s = s.replace(a, b)
open(P, 'w', encoding='utf-8').write(s)
print('NAO ACHEI:', falta or 'nada')
