# Joga (mudo) cada tela de arrastar: metade arrastando com o mouse, metade tocando; confere erro, acerto e fim.
# 03/11: frases aparecem poucas por vez; escolhe item cuja frase esta visivel. Uso: python testa_arrasta.py [larg] [alt]
import os,sys,threading,functools,http.server,socketserver
from playwright.sync_api import sync_playwright
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','..'))
W=int(sys.argv[1]) if len(sys.argv)>1 else 360; Hh=int(sys.argv[2]) if len(sys.argv)>2 else 640
MUDO="try{speechSynthesis.speak=function(){};speechSynthesis.cancel=function(){};}catch(e){};window.SpeechSynthesisUtterance=function(){};window.AudioContext=window.webkitAudioContext=function(){throw 1};HTMLMediaElement.prototype.play=function(){return Promise.resolve();};"
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=socketserver.ThreadingTCPServer(('127.0.0.1',0),functools.partial(Q,directory=R));srv.daemon_threads=True
threading.Thread(target=srv.serve_forever,daemon=True).start();B=f'http://127.0.0.1:{srv.server_address[1]}/ferramentas/'
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':W,'height':Hh});c.add_init_script(MUDO);t=c.new_page()
    err=[];t.on('pageerror',lambda e:err.append(str(e)))
    t.goto(B+'CIE3_estudo.html');t.wait_for_timeout(400)
    for i in range(t.evaluate("window.CIE3_LICOES.length")):
        t.evaluate(f"window.CIE3_ESTUDO.abre({i})");t.wait_for_timeout(150)
        while True:
            if t.query_selector('.arr-cx'):
                t.wait_for_timeout(300)
                its=t.evaluate("window.CIE3_LICOES[%d].telas[window.CIE3_ESTUDO.estado().i].itens"%i)
                n=len(its); modo=0
                def pega():
                    for el in t.query_selector_all('.arr-itens .arr-it'):
                        k=its[int(el.get_attribute('data-i'))]['c']
                        if t.query_selector(f'.arr-c[data-k="{k}"]:not(.fora):not(.feita)'): return el,k
                    raise SystemExit('nenhuma caixa visivel L%d'%(i+1))
                el,k=pega()
                errada=t.query_selector(f'.arr-c:not(.fora):not(.feita):not([data-k="{k}"])')
                if errada:
                    el.click(); errada.click()
                    assert t.query_selector('.arr-itens .arr-it[data-i="%s"]'%el.get_attribute('data-i')),'erro aceito'
                    if 'sel' in (el.get_attribute('class') or ''): el.click()
                while t.query_selector('.arr-itens .arr-it'):
                    t.wait_for_timeout(1250); el,k=pega(); cx=t.query_selector(f'.arr-c[data-k="{k}"]')
                    if modo%2==0:
                        el.scroll_into_view_if_needed(); a=el.bounding_box(); cx.scroll_into_view_if_needed(); a=el.bounding_box(); z=cx.bounding_box()
                        t.mouse.move(a['x']+a['width']/2,a['y']+a['height']/2);t.mouse.down();t.mouse.move(a['x']+20,a['y']+20,steps=3)
                        t.mouse.move(z['x']+z['width']/2,z['y']+z['height']/2,steps=8);t.mouse.up()
                    else: el.click(); cx.click()
                    t.wait_for_timeout(80); modo+=1
                    if modo>40: raise SystemExit('travou na licao %d'%(i+1))
                t.wait_for_timeout(1300)
                print('L%d'%(i+1),n,'itens',t.inner_text('.ordmsg'),'pontos',t.evaluate("document.querySelectorAll('.arr-prog i.ok').length"),'dentro',t.evaluate("document.querySelectorAll('.arr-den .arr-it').length"))
            e=t.evaluate("window.CIE3_ESTUDO.estado()")
            if e['i']>=e['n']-1: break
            t.click('#navNext');t.wait_for_timeout(120)
    print('ERROS',err)
    b.close()
