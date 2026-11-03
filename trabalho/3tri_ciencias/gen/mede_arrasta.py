# Mede (mudo) se cada tela de arrastar cabe na janela, sem rolagem. Uso: python mede_arrasta.py <saida>
# Fotografa a JANELA (nao a pagina inteira): o que a crianca ve sem rolar.
import sys,os,threading,functools,http.server,socketserver,json
from playwright.sync_api import sync_playwright
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'));S=sys.argv[1];os.makedirs(S,exist_ok=True)
MUDO="try{speechSynthesis.speak=function(){};speechSynthesis.cancel=function(){};}catch(e){};window.SpeechSynthesisUtterance=function(){};window.AudioContext=window.webkitAudioContext=function(){throw new Error('off');};HTMLMediaElement.prototype.play=function(){return Promise.resolve();};localStorage.setItem('cie3_ocl','1');"
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=R));srv.daemon_threads=True
threading.Thread(target=srv.serve_forever,daemon=True).start();B=f'http://127.0.0.1:{srv.server_address[1]}/ferramentas/'
VP=[('cel',390,760),('tabR',768,1024),('tabP',1024,768),('note',1280,720),('note2',1366,768)] if len(sys.argv)>2 else [('cel',390,760),('pais',740,360),('note',1280,720)]
ruins=[];TODAS=len(sys.argv)>2
with sync_playwright() as p:
    b=p.chromium.launch()
    for nome,w,h in VP:
        c=b.new_context(viewport={'width':w,'height':h});c.add_init_script(MUDO);t=c.new_page()
        t.goto(B+'CIE3_estudo.html');t.wait_for_timeout(500)
        n=t.evaluate("window.CIE3_LICOES.length")
        for i in range(n):
            t.evaluate(f"window.CIE3_ESTUDO.abre({i})");t.wait_for_timeout(600)
            for k in range(30):
                t.wait_for_timeout(150)
                if TODAS or t.evaluate("!!document.querySelector('.arr-itens')"):
                    m=t.evaluate("({sh:document.documentElement.scrollHeight,ih:innerHeight,sw:document.documentElement.scrollWidth,iw:innerWidth})")
                    sobra=m['sh']-m['ih']
                    t.screenshot(path=f'{S}/{nome}_L{i+1}_{k+1}.png')
                    print(nome,f'L{i+1}_{k+1}','sobra',sobra,'px', 'HSCROLL' if m['sw']>m['iw'] else '')
                    if sobra>2: ruins.append((nome,i+1,k+1,sobra))
                e=t.evaluate("window.CIE3_ESTUDO.estado()")
                if e['i']>=e['n']-1: break
                t.click('#navNext');t.wait_for_timeout(600)
        c.close()
    b.close()
print('ROLAGEM',json.dumps(ruins))
