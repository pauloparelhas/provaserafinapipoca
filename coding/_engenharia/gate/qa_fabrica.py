"""QA da Fábrica — MUDO (REGRA ZERO). Abre coding/index.html do disco, passa por todas as
telas em 3 tamanhos, joga o teste, e reprova erro de console. Uso:
  python coding/_engenharia/gate/qa_fabrica.py [pasta_de_capturas]"""
import sys, pathlib, json
from playwright.sync_api import sync_playwright
RAIZ = pathlib.Path(__file__).resolve().parents[2]
import http.server, threading, functools
class _H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
_srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(_H, directory=str(RAIZ.parent)))
threading.Thread(target=_srv.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{_srv.server_address[1]}/coding/index.html'
OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else RAIZ / '_engenharia' / 'gate' / 'capturas'); OUT.mkdir(parents=True, exist_ok=True)
MUDO = ("try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){}"
        "window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); };")
TELAS = ['painel', 'ideia', 'pixel', 'fases', 'regras', 'testar', 'diario', 'robo', 'missoes', 'jogar']
VIEW = [(1280, 800), (1024, 700), (740, 900), (390, 800)]
erros = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for (w, h) in VIEW:
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.add_init_script(MUDO)
        pg.on('console', lambda m: m.type == 'error' and erros.append(f'{w}x{h} console: {m.text}'))
        pg.on('pageerror', lambda e: erros.append(f'{w}x{h} pageerror: {e}'))
        pg.goto(URL); pg.wait_for_timeout(500)
        for t in TELAS:
            pg.evaluate(f"FAB.ui.vai('{t}')"); pg.wait_for_timeout(350)
            if t == 'testar':
                pg.keyboard.down('ArrowRight'); pg.wait_for_timeout(700); pg.keyboard.press('Space'); pg.wait_for_timeout(900); pg.keyboard.up('ArrowRight')
            for _ in range(4):
                if pg.evaluate("document.getElementById('modal').classList.contains('on')"): pg.evaluate("FAB.ui._preso=false;FAB.ui.fecha()"); pg.wait_for_timeout(300)
            larg = pg.evaluate("document.documentElement.scrollWidth > innerWidth + 1")
            if larg: erros.append(f'{w}x{h} {t}: rolagem horizontal')
            pg.screenshot(path=str(OUT / f'{t}_{w}x{h}.png'))
        pg.close()
    b.close()
print('\n'.join(erros) or 'QA OK: nenhuma falha')
sys.exit(1 if erros else 0)
