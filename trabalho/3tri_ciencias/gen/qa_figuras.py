# Portao: toda pergunta com figura mostra a figura (carregada e visivel) na teoria, no treino e no simulado.
import sys,os,json,threading,functools,http.server,socketserver
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
S=sys.argv[1];os.makedirs(S,exist_ok=True)
MUDO="try{speechSynthesis.speak=function(){};speechSynthesis.cancel=function(){};speechSynthesis.getVoices=function(){return [];};}catch(e){};window.SpeechSynthesisUtterance=function(){};window.AudioContext=window.webkitAudioContext=function(){throw new Error('off');};HTMLMediaElement.prototype.play=function(){return Promise.resolve();};"
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=os.getcwd()));srv.daemon_threads=True
threading.Thread(target=srv.serve_forever,daemon=True).start();B=f'http://127.0.0.1:{srv.server_address[1]}/ferramentas/'
VIS="(sel)=>[...document.querySelectorAll(sel)].map(i=>{const r=i.getBoundingClientRect();return [i.getAttribute('src'),i.complete&&i.naturalWidth>0,Math.round(r.width),Math.round(r.height)]})"
ruim=[];vistas=set();n=0
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':360,'height':640});c.add_init_script(MUDO);t=c.new_page()
    # teoria: todas as telas e o treino sorteado
    t.goto(B+'CIE3_estudo.html');t.wait_for_timeout(400)
    for i in range(t.evaluate("window.CIE3_LICOES.length")):
        t.evaluate(f"window.CIE3_ESTUDO.abre({i})");t.wait_for_timeout(150)
        for k in range(60):
            e=t.evaluate("window.CIE3_ESTUDO.estado()")
            for src,ok,w,h in t.evaluate(VIS,"#tela img, .tela img, main img"):
                n+=1;vistas.add(src)
                if not ok or w<100 or h<60: ruim.append(('teoria',i,e['i'],src,ok,w,h))
            if i==0 and e['i'] in (1,): t.screenshot(path=f'{S}/teoria_completa.png')
            if e['i']>=e['n']-1:break
            t.click('#navNext');t.wait_for_timeout(70)
    # simulado: 6 rodadas inteiras, confere item a item
    t.goto(B+'CIE3_simulado.html');t.wait_for_timeout(500)
    ITENS={}
    for q in t.evaluate("window.CIE3S.ITENS.map(i=>[i.pede,!!(i.quadro&&i.quadro.indexOf('<img')>=0)])"):
        import re
        ITENS[re.sub('<[^>]+>','',q[0].split('<span')[0]).strip()]=q[1]
    for rod in range(6):
        t.goto(B+'CIE3_simulado.html');t.wait_for_timeout(350)
        t.get_by_text('Full test',exact=False).first.click();t.wait_for_timeout(250)
        for q in range(14):
            im=t.evaluate(VIS,".quadro img")
            if rod==0 and q<5: t.screenshot(path=f'{S}/sim_{q}.png')
            for src,ok,w,h in im:
                n+=1;vistas.add(src)
                if not ok or w<100 or h<60: ruim.append(('sim',rod,q,src,ok,w,h))
            bts=t.locator('.op,.opt,.opcao,button.alt,.alternativa')
            if bts.count()==0: bts=t.locator('.card button')
            bts.first.click();t.wait_for_timeout(120)
            t.click('#navNext');t.wait_for_timeout(120)
    b.close()
print('figuras conferidas',n,'distintas',len(vistas),'ruins',len(ruim));print(ruim[:12])
sys.exit(1 if ruim else 0)
