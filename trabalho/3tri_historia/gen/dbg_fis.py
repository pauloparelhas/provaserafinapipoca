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
    p.evaluate("()=>{ var u=__his3.J.urso; u.x=37.9*45; u.y=29*45; u.vy=0; u.poderes.bota=true; }")
    seq=[(0,{}),(6,{'jump':True}),(14,{}),(22,{'jump':True,'left':True}),(40,{'left':True}),(70,{})]
    for f in range(70):
        for a,inp in seq:
            if f==a: p.evaluate("(i)=>{ var J=__his3.J; J.in.jump=!!i.jump; J.in.left=!!i.left; J.in.right=false; }",inp)
        r=p.evaluate("()=>{ __his3.JOGO.passoFixo(1/60,1); var u=__his3.J.urso; return [Math.round(u.x/45*10)/10, Math.round(u.y/45*100)/100, u.noChao, Math.round(u.vy), u.puloExtra]; }")
        if f%4==0: print(f,r)
    b.close()
