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
        "window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); }; HTMLMediaElement.prototype.play=function(){ return Promise.resolve(); }; HTMLMediaElement.prototype.load=function(){};")
# cada roteiro: (modelo, preparo JS opcional, sequência de teclas [(tecla, ms_segurando, ms_espera)])
def corre_pulando(n):
    return [('Space', 380, 120)] * n
ROTEIROS = {
  'primeiro': ("", None),
  'castelo': ("", None),
  # o quebrado consertado (moeda vale 1, bandeira ligada, buraco com chão): tem de dar para ganhar
  'quebrado': ("var J=FAB.jogo();J.regras.forEach(function(r){if(r.quando.obj==='moeda')r.faca[0].n=1;if(r.quando.obj==='bandeira')r.liga=true;});"
               "J.fases[0].mapa=J.fases[0].mapa.map(function(l,j){return j>=10?l.replace(/\.\.\.\.\.\./,'######'):l;});", None),
  # modelos novos (23/10): neve (ponto de volta, cristais, morcego) e corrida COM o relógio ligado (45 s)
  'neve': ("", None),
  'corrida': ("var J=FAB.jogo();J.ajustes.tempo=(FAB.MODELOS.corrida.ajustes||{}).tempo||45;", None),
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
        # o robô mora DENTRO da página e olha o jogo a cada quadro (a máquina de teste é lenta para
        # ir e voltar pelo Playwright): segura a seta, pula na frente de buraco/parede/perigo e
        # segura o pulo até o herói parar de subir. Usa só FAB.motor.olha() e FAB.motor.tecla().
        pg.evaluate("""(() => { let pulando = false, ymin = 1e9; FAB.motor.tecla('dir', true);
          (function passo() { if (!FAB.motor.rodando()) return; const o = FAB.motor.olha();
            if (o && !document.getElementById('modal').classList.contains('on')) {
              if (!pulando && o.noChao && (o.buraco || o.parede || o.perigo)) { pulando = true; ymin = o.y; FAB.motor.tecla('pulo', true); }
              else if (pulando) { if (o.y < ymin) ymin = o.y; else if (!o.noChao && o.y > ymin + 1 || o.noChao && o.y >= ymin) { pulando = false; FAB.motor.tecla('pulo', false); } }
            }
            requestAnimationFrame(passo); })(); })()""")
        for _ in range(900):                       # até ~45 s
            if pg.evaluate("!FAB.motor.rodando()"): break
            if pg.evaluate("document.getElementById('modal').classList.contains('on')"):
                pg.keyboard.press('1'); pg.wait_for_timeout(250); pg.keyboard.press('Enter'); pg.wait_for_timeout(250); continue
            pg.wait_for_timeout(50)
        pg.evaluate("FAB.motor.rodando() && FAB.motor.tecla('dir', false)"); pg.wait_for_timeout(1500)
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
