# Mede (mudo) se algo do pocket A4 transborda (conteudo cortado). Uso: python mede_pocket.py <png>
import os,sys,threading,functools,http.server,socketserver
from playwright.sync_api import sync_playwright
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'))
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=R));srv.daemon_threads=True
threading.Thread(target=srv.serve_forever,daemon=True).start();B=f'http://127.0.0.1:{srv.server_address[1]}/ferramentas/'
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':1400,'height':1000},device_scale_factor=2);t=c.new_page()
    err=[];t.on('pageerror',lambda e:err.append(str(e)))
    t.goto(B+'CIE3_pocket.html');t.wait_for_timeout(1200)
    print('TRANSBORDA',t.evaluate("[...document.querySelectorAll('.page, .sec, .sec *')].filter(e=>e.scrollHeight>e.clientHeight+1 && getComputedStyle(e).overflow!=='visible' || (e.closest('.sec') && e.getBoundingClientRect().bottom>e.closest('.sec').getBoundingClientRect().bottom+1)).map(e=>e.tagName+'.'+e.className+' '+(e.scrollHeight-e.clientHeight)).slice(0,20)"))
    print('FOLGA',t.evaluate("[...document.querySelectorAll('.sec')].map(s=>{var u=[...s.children].reduce((m,c)=>Math.max(m,c.getBoundingClientRect().bottom),0);return s.className+' '+Math.round(s.getBoundingClientRect().bottom-u)})"))
    t.screenshot(path=sys.argv[1],full_page=True); print('ERROS',err)
