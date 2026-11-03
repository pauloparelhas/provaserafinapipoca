# Passeio mudo: simulado (responde tudo) e cada licao (todas as telas), 360 px. Reprova erro JS, 404, scroll e portugues com a bandeira desligada.
import sys,os,re,threading,functools,http.server,socketserver
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'));S=sys.argv[1];os.makedirs(S,exist_ok=True)
MUDO="try{speechSynthesis.speak=function(){};speechSynthesis.cancel=function(){};speechSynthesis.getVoices=function(){return [];};}catch(e){};window.SpeechSynthesisUtterance=function(){};window.AudioContext=window.webkitAudioContext=function(){throw new Error('off');};HTMLMediaElement.prototype.play=function(){return Promise.resolve();};"
PT=re.compile(r"[ãõçáéíóúâêôà]|\b(você|para|prova|voltar|próxima|sair|lição|começar|estudar)\b",re.I)
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=R));srv.daemon_threads=True
threading.Thread(target=srv.serve_forever,daemon=True).start();B=f'http://127.0.0.1:{srv.server_address[1]}/ferramentas/'
err=[];pt=set();sc=set()
def olha(t,tag):
    tx=t.evaluate("document.body.innerText")
    for l in tx.split('\n'):
        if PT.search(l.replace('São Paulo','')):pt.add(tag+': '+l.strip()[:70])
    d=t.evaluate("document.documentElement.scrollWidth-innerWidth")
    if d>1:sc.add(tag+' '+str(d))
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':360,'height':640});c.add_init_script(MUDO);t=c.new_page()
    t.on('pageerror',lambda e:err.append('JS '+str(e)[:160]));t.on('response',lambda r:err.append(f'{r.status} {r.url[-50:]}') if r.status>=400 and 'favicon' not in r.url else None)
    # estudo
    t.goto(B+'CIE3_estudo.html');t.wait_for_timeout(500);olha(t,'capa');t.screenshot(path=f'{S}/est_capa.png')
    n=t.evaluate("window.CIE3_LICOES.length")
    for i in range(n):
        t.evaluate(f"window.CIE3_ESTUDO.abre({i})");t.wait_for_timeout(120)
        for k in range(40):
            e=t.evaluate("window.CIE3_ESTUDO.estado()")
            olha(t,f'L{i}.{e["i"]}')
            if k<6 or k%3==0:t.screenshot(path=f'{S}/est_{i}_{e["i"]}.png')
            if e['i']>=e['n']-1:break
            t.click('#navNext');t.wait_for_timeout(90)
    # simulado
    t.goto(B+'CIE3_simulado.html');t.wait_for_timeout(600);olha(t,'simcapa');t.screenshot(path=f'{S}/sim_capa.png')
    print(t.evaluate("[...document.querySelectorAll('button')].map(b=>b.innerText.trim().slice(0,30)).join(' | ')")[:300])
    b.close()
print('ERROS',err[:10]);print('PT',sorted(pt)[:30]);print('SCROLL',sorted(sc)[:20])
