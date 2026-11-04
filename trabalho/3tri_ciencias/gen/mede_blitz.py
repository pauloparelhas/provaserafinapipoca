# Mede (mudo) a rolagem do Blitz do simulado: inicio, cada questao antes e depois de responder (certo e errado), resultado.
# Uso: python mede_blitz.py <saida> [rodadas]
import sys,os,threading,functools,http.server,socketserver,json
from playwright.sync_api import sync_playwright
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'));S=sys.argv[1];os.makedirs(S,exist_ok=True)
N=int(sys.argv[2]) if len(sys.argv)>2 else 3
MUDO="try{speechSynthesis.speak=function(){};speechSynthesis.cancel=function(){};}catch(e){};window.SpeechSynthesisUtterance=function(){};window.AudioContext=window.webkitAudioContext=function(){throw new Error('off');};HTMLMediaElement.prototype.play=function(){return Promise.resolve();};"
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=R));srv.daemon_threads=True
threading.Thread(target=srv.serve_forever,daemon=True).start();B=f'http://127.0.0.1:{srv.server_address[1]}/ferramentas/'
VP=[('cel',390,760),('tabR',768,1024),('tabP',1024,768),('note',1280,720),('note2',1366,768)]
ruins=[];pior={}
def mede(t,nome,rot):
    m=t.evaluate("({sh:document.documentElement.scrollHeight,ih:innerHeight,sw:document.documentElement.scrollWidth,iw:innerWidth})")
    s=m['sh']-m['ih']
    if m['sw']>m['iw']+1: ruins.append((nome,rot,'HSCROLL'))
    if s>2:
        ruins.append((nome,rot,s))
        if s>pior.get(nome,(0,))[0]: pior[nome]=(s,rot); t.screenshot(path=f'{S}/{nome}_pior.png')
with sync_playwright() as p:
    b=p.chromium.launch()
    for nome,w,h in VP:
        c=b.new_context(viewport={'width':w,'height':h});c.add_init_script(MUDO);t=c.new_page()
        t.goto(B+'CIE3_simulado.html');t.wait_for_timeout(700);mede(t,nome,'inicio')
        for rd in range(N):
            t.click('.blitzbtn' if rd==0 else 'text=Next Blitz');t.wait_for_timeout(400)
            for q in range(10):
                t.wait_for_timeout(250);qid=f'r{rd}q{q}';mede(t,nome,qid+'-antes')
                op=t.query_selector_all('.opt')
                if op:
                    (op[-1] if q%2 else op[0]).click();t.wait_for_timeout(400);mede(t,nome,qid+'-depois')
                if q==0 and rd==0: t.screenshot(path=f'{S}/{nome}_q1.png')
                t.click('#navNext');t.wait_for_timeout(300)
            t.wait_for_timeout(400);mede(t,nome,f'r{rd}-resultado')
            if rd==0: t.screenshot(path=f'{S}/{nome}_res.png')
        c.close()
    b.close()
print('PIOR',json.dumps(pior))
print('ROLAGEM',len(ruins),json.dumps(ruins[:40]))
