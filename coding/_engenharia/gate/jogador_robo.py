"""Jogador-robô (MUDO): joga os jogos-modelo SÓ com teclas reais (seta direita + pulo),
como a criança. Reprova se não chegar na bandeira. Uso: python jogador_robo.py"""
import sys, pathlib, json, http.server, threading, functools
from playwright.sync_api import sync_playwright
RAIZ = pathlib.Path(__file__).resolve().parents[2]
class _H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(_H, directory=str(RAIZ.parent)))
threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{srv.server_address[1]}/coding/index.html'
MUDO = ("try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){}"
        "window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); };")
# cada roteiro: (modelo, preparo JS opcional, sequência de teclas [(tecla, ms_segurando, ms_espera)])
def corre_pulando(n):
    return [('Space', 380, 120)] * n
ROTEIROS = {
  'primeiro': ("", None),
  'castelo': ("", None),
  # o quebrado consertado (moeda vale 1, bandeira ligada, buraco com chão): tem de dar para ganhar
  'quebrado': ("var J=FAB.jogo();J.regras.forEach(function(r){if(r.quando.obj==='moeda')r.faca[0].n=1;if(r.quando.obj==='bandeira')r.liga=true;});"
               "J.fases[0].mapa=J.fases[0].mapa.map(function(l,j){return j>=10?l.replace(/\.\.\.\.\.\./,'######'):l;});", None),
}
falhas = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for mod, (prep, seq) in ROTEIROS.items():
        pg = b.new_page(viewport={'width': 1280, 'height': 800}); pg.add_init_script(MUDO)
        erros = []; pg.on('pageerror', lambda e: erros.append(str(e)))
        pg.goto(URL); pg.wait_for_timeout(300)
        pg.evaluate(f"localStorage.clear(); FAB.novoJogo('{mod}'); {prep} FAB.salva();")
        pg.evaluate("FAB.ui.vai('testar')"); pg.wait_for_timeout(400)
        pg.keyboard.down('ArrowRight')
        for _ in range(900):                       # até ~45 s
            if pg.evaluate("!FAB.motor.rodando()"): break
            if pg.evaluate("document.getElementById('modal').classList.contains('on')"):
                pg.keyboard.press('1'); pg.wait_for_timeout(250); pg.keyboard.press('Enter'); pg.wait_for_timeout(250); continue
            o = pg.evaluate("FAB.motor.olha()")
            if o and o['noChao'] and (o['buraco'] or o['parede'] or o['perigo']):
                pg.keyboard.down('Space'); pg.wait_for_timeout(330); pg.keyboard.up('Space')
            pg.wait_for_timeout(50)
        pg.keyboard.up('ArrowRight'); pg.wait_for_timeout(1500)
        R = pg.evaluate("FAB.jogo().ultimoTeste")
        pg.screenshot(path=str(RAIZ / '_engenharia' / 'gate' / 'capturas' / f'robo_{mod}.png'))
        ok = bool(R and R.get('venceu'))
        print(mod, "GANHOU" if ok else "NAO GANHOU", json.dumps({k: R.get(k) for k in ("pontos","segundos","vidasPerdidas","moedas","mortes")} if R else None))
        if not ok: falhas.append(mod)
        if erros: falhas.append(f'{mod}: ' + '; '.join(erros))
        pg.close()
    b.close()
print('JOGADOR-ROBÔ: ' + ('LIBERA' if not falhas else 'NÃO LIBERA ' + str(falhas)))
sys.exit(1 if falhas else 0)
