import os
from playwright.sync_api import sync_playwright
AQUI=os.path.dirname(os.path.abspath(__file__))
RAIZ=os.path.normpath(os.path.join(AQUI,'..','..','..','ferramentas','HIS3_jogo.html')).replace(chr(92),'/')
BOT=open(os.path.join(AQUI,'crianca_bot.js'),encoding='utf-8').read()
MUDO="try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; }catch(e){} window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); };"
with sync_playwright() as pw:
    b=pw.chromium.launch(); p=b.new_page(viewport={'width':960,'height':540}); p.add_init_script(MUDO)
    p.goto('file:///'+RAIZ); p.evaluate("()=>{ localStorage.setItem('his3_jogo_v1', JSON.stringify({introVista:true,heroi:'lia'})); }"); p.reload(); p.wait_for_timeout(800)
    p.evaluate(BOT)
    p.evaluate("()=>{ __his3.JOGO.relogioTeste(true); try{UI.fechaMenu();}catch(e){} __his3.JOGO.iniciaFase(__his3.FASES.LISTA[1]); CRIANCA.inicia({seed:5,acerto:.7,limite:240}); }")
    for k in range(70):
        r=p.evaluate("()=>{ CRIANCA.passo(300); var u=__his3.J.urso; return [JSON.stringify(window.CRIANCA&&0), __his3.J.estado, Math.round(u.x/45*10)/10, Math.round(u.y/45*10)/10, u.noChao, JSON.stringify(__his3.J.in), !!__his3.UI.menuAberto(), u.poderes.bota, __his3.J.mundo.moradores.map(m=>m.feito?1:0).join('')]; }")
        print(k,r)
        if k==6: p.screenshot(path=os.path.join(AQUI,'dbg.png'))
    b.close()