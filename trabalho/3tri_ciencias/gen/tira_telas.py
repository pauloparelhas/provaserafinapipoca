# Fotografa cada tela de cada licao da teoria (mudo), 390 px, pagina inteira. Uso: python tira_telas.py <saida> [licao]
import sys,os,threading,functools,http.server,socketserver
from playwright.sync_api import sync_playwright
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'));S=sys.argv[1];os.makedirs(S,exist_ok=True)
SO=int(sys.argv[2]) if len(sys.argv)>2 else None
MUDO="try{speechSynthesis.speak=function(){};speechSynthesis.cancel=function(){};}catch(e){};window.SpeechSynthesisUtterance=function(){};window.AudioContext=window.webkitAudioContext=function(){throw new Error('off');};HTMLMediaElement.prototype.play=function(){return Promise.resolve();};localStorage.setItem('cie3_ocl','1');"
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=R));srv.daemon_threads=True
threading.Thread(target=srv.serve_forever,daemon=True).start();B=f'http://127.0.0.1:{srv.server_address[1]}/ferramentas/'
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':760});c.add_init_script(MUDO);t=c.new_page()
    t.goto(B+'CIE3_estudo.html');t.wait_for_timeout(500)
    n=t.evaluate("window.CIE3_LICOES.length")
    for i in range(n):
        if SO is not None and i!=SO: continue
        t.evaluate(f"window.CIE3_ESTUDO.abre({i})");t.wait_for_timeout(200)
        for k in range(30):
            t.wait_for_timeout(150);t.screenshot(path=f'{S}/L{i+1}_{k+1}.png',full_page=True)
            e=t.evaluate("window.CIE3_ESTUDO.estado()")
            if e['i']>=e['n']-1: break
            t.click('#navNext');t.wait_for_timeout(150)
    b.close()
