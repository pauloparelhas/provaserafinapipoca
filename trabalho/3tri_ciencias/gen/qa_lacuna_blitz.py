# QA mudo (03/11): (1) teoria: toda lacuna hachurada tem ate 3 palavras; lista onde ha lacuna; a mao de toque aparece
# na 1a tela com lacuna e some ao tocar; (2) simulado: o Blitz roda 10 questoes e mostra o tempo. Uso: python qa_lacuna_blitz.py <saida>
import sys,os,threading,functools,http.server,socketserver,json
from playwright.sync_api import sync_playwright
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'));S=sys.argv[1];os.makedirs(S,exist_ok=True)
MUDO="try{speechSynthesis.speak=function(){};speechSynthesis.cancel=function(){};}catch(e){};window.SpeechSynthesisUtterance=function(){};window.AudioContext=window.webkitAudioContext=function(){throw new Error('off');};HTMLMediaElement.prototype.play=function(){return Promise.resolve();};"
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=R));srv.daemon_threads=True
threading.Thread(target=srv.serve_forever,daemon=True).start();B=f'http://127.0.0.1:{srv.server_address[1]}/ferramentas/'
ERR=[];onde=[];mao=None
with sync_playwright() as p:
    b=p.chromium.launch()
    c=b.new_context(viewport={'width':1280,'height':720});c.add_init_script(MUDO);t=c.new_page()
    t.on('pageerror',lambda e:ERR.append('pageerror '+str(e)))
    t.goto(B+'CIE3_estudo.html');t.wait_for_timeout(500)
    n=t.evaluate("window.CIE3_LICOES.length")
    for i in range(n):
        t.evaluate(f"window.CIE3_ESTUDO.abre({i})");t.wait_for_timeout(500)
        for k in range(30):
            t.wait_for_timeout(200)
            g=t.evaluate("[].map.call(document.querySelectorAll('b.ocl'),function(b){return b.textContent.trim()})")
            tit=t.evaluate("(document.querySelector('h2')||{}).textContent||''")
            for x in g:
                if len(x.split())>3: ERR.append(f'L{i+1}.{k+1} lacuna longa: {x}')
            if g: onde.append(f'L{i+1}.{k+1} {tit[:40]!r}: {g}')
            if g and mao is None:
                t.wait_for_timeout(900); mao=t.evaluate("!!document.querySelector('.maotoque')")
                t.screenshot(path=f'{S}/mao.png')
                t.click('b.ocl.fechado',force=True);t.wait_for_timeout(200)
                if t.evaluate("!!document.querySelector('.maotoque')"): ERR.append('mao nao some ao tocar')
            e=t.evaluate("window.CIE3_ESTUDO.estado()")
            if e['i']>=e['n']-1: break
            t.click('#navNext');t.wait_for_timeout(400)
    if not mao: ERR.append('mao de toque nao apareceu')
    # simulado: Blitz
    t.goto(B+'CIE3_simulado.html');t.wait_for_timeout(800)
    t.click('.blitzbtn');t.wait_for_timeout(500)
    for q in range(12):
        if t.evaluate("!!document.querySelector('.blitztempo')"): break
        op=t.query_selector_all('.opc, .opt, button.op, .opcoes button')
        if op: op[0].click(); t.wait_for_timeout(300)
        t.click('#navNext');t.wait_for_timeout(300)
    t.screenshot(path=f'{S}/blitz_fim.png',full_page=True)
    tempo=t.evaluate("(document.querySelector('.blitztempo')||{}).textContent||''")
    total=t.evaluate("(document.querySelector('.anelin small')||{}).textContent||''")
    if not tempo: ERR.append('Blitz sem tempo no resultado')
    if total.strip()!='':
        if 'of 10' not in total: ERR.append('Blitz nao tem 10: '+total)
    print('BLITZ',tempo,total)
    b.close()
print('\n'.join(onde))
print('MAO',mao)
print('ERROS',json.dumps(ERR,ensure_ascii=False))
