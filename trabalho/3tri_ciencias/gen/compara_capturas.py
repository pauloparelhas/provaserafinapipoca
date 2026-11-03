# compara_capturas.py — REFEITURA 03/11: para cada fase, 2 quadros do CIE3 ao lado do equivalente aprovado (ING3/HIS3).
# Página MUDA (REGRA ZERO). Saída: trabalho/3tri_ciencias/provas_refeitura/<fase>_<n>.png (esquerda CIE3, direita referência).
# Uso: python compara_capturas.py [fases separadas por vírgula, ex. 1,2,3]
import os, sys
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
AQUI = os.path.dirname(os.path.abspath(__file__))
FER = os.path.normpath(os.path.join(AQUI, '..', '..', '..', 'ferramentas')).replace('\\', '/')
OUT = os.path.normpath(os.path.join(AQUI, '..', 'provas_refeitura')); os.makedirs(OUT, exist_ok=True)
MUDO = "try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){} window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); }; HTMLMediaElement.prototype.play=function(){ return Promise.resolve(); };"
JOGOS = {'CIE3': ('cie3', 'helmet'), 'ING3': ('ing3', 'lia'), 'HIS3': ('his3', 'lia')}
# fase CIE3 -> (jogo de referência, fase de referência, [(col, linha de apoio) CIE3], [(col, linha) ref], poder?)
PLANO = {
  1: ('ING3', 1, [(29, 10), (68, 10)], [(29, 10), (68, 10)]),
  2: ('ING3', 2, [(27, 10), (57, 10)], [(27, 10), (57, 10)]),
  3: ('HIS3', 2, [(12, 32), (22, 20)], [(12, 32), (22, 20)]),
  4: ('ING3', 4, [(40, 13), (100, 12)], [(40, 13), (100, 12)]),
  5: ('ING3', 5, [(20, 10), (60, 6)], [(20, 10), (60, 6)]),
  6: ('ING3', 6, [(31, 10), (47, 7)], [(31, 10), (47, 7)]),
  7: ('ING3', 3, [], []),
  8: ('ING3', 7, [(25, 10), (60, 10)], [(25, 10), (60, 10)]),
  9: ('ING3', 9, [], []),
}
def abre(pw, jogo):
    chave, heroi = JOGOS[jogo]
    b = pw.chromium.launch(args=['--mute-audio']); p = b.new_page(viewport={'width': 960, 'height': 540}); p.add_init_script(MUDO)
    p.goto('file:///%s/%s_jogo.html' % (FER, jogo))
    p.evaluate("([k,h])=>localStorage.setItem(k+'_jogo_v1',JSON.stringify({introVista:true,heroi:h}))", [chave, heroi]); p.reload(); p.wait_for_timeout(900)
    return b, p
def quadro(p, jogo, fase, pos, poder, arq):
    g = '__' + JOGOS[jogo][0]
    p.evaluate("([g,id])=>{ var X=window[g], f=X.FASES.LISTA.filter(function(q){return q.id===id;})[0]; try{ X.UI.fechaMenu(); }catch(e){} X.JOGO.iniciaFase(f); }", [g, fase]); p.wait_for_timeout(900)
    p.evaluate("()=>{ try{ var b=document.querySelector('#avisoOk,.aviso button,#lgNext'); if(b) b.click(); }catch(e){} }")
    if pos:
        p.evaluate("([g,c,r,pod])=>{ var J=window[g].JOGO.J, u=J.urso; u.x=c*45+22; u.y=r*45; u.vy=0; u.invT=99; if(pod&&window.PODERES){ var it=J.mundo.itens.filter(function(i){return i.tipo==='poder'||i.tipo==='capa'||i.tipo==='traje';})[0]; if(it){ it.pego=true; try{ PODERES.pega(it); }catch(e){} } (J.mundo.ovos||[]).forEach(function(o){ o.chocado=true; u.montado=true; }); } }", [g, pos[0], pos[1], poder])
        p.wait_for_timeout(200)
        p.evaluate("()=>{ try{ var b=[].filter.call(document.querySelectorAll('button'),function(b){return b.offsetParent&&/go|Vamos|Let/i.test(b.innerText);})[0]; if(b) b.click(); }catch(e){} }")
        p.wait_for_timeout(1100)
    else:
        p.wait_for_timeout(2500)
        p.evaluate("()=>{ try{ var b=document.getElementById('lgNext'); for(var i=0;i<4&&b;i++) b.click(); }catch(e){} }"); p.wait_for_timeout(1500)
    p.screenshot(path=arq)
def junta(a, b, destino, rotulo):
    A, B = Image.open(a), Image.open(b); W = Image.new('RGB', (A.width + B.width + 12, max(A.height, B.height) + 28), (20, 20, 30))
    W.paste(A, (0, 28)); W.paste(B, (A.width + 12, 28)); d = ImageDraw.Draw(W); d.text((8, 6), 'CIE3 (novo)', fill=(255, 255, 255)); d.text((A.width + 20, 6), rotulo, fill=(255, 255, 255)); W.save(destino)
sel = [int(x) for x in sys.argv[1].split(',')] if len(sys.argv) > 1 else list(PLANO)
TMP = os.path.join(OUT, '_tmp'); os.makedirs(TMP, exist_ok=True)
with sync_playwright() as pw:
    for jogo in ('CIE3', 'ING3', 'HIS3'):
        tarefas = []
        for f in sel:
            ref, fr, pc, pr = PLANO[f]
            if jogo == 'CIE3': tarefas += [(f, k, pos) for k, pos in enumerate(pc or [None, None])]
            elif jogo == ref: tarefas += [(fr, k, pos) for k, pos in enumerate(pr or [None, None]) if os.environ.get('REFAZ') or not os.path.exists(os.path.join(TMP, '%s_%d_%d.png' % (jogo, fr, k)))]
        if not tarefas: continue
        b, p = abre(pw, jogo); erros = []; p.on('pageerror', lambda e: erros.append(str(e)))
        for fase, k, pos in tarefas:
            quadro(p, jogo, fase, pos, k == 1, os.path.join(TMP, '%s_%d_%d.png' % (jogo, fase, k)))
        if erros: print(jogo, 'ERROS', erros[:3])
        b.close()
for f in sel:
    ref, fr = PLANO[f][0], PLANO[f][1]
    for k in (0, 1):
        junta(os.path.join(TMP, 'CIE3_%d_%d.png' % (f, k)), os.path.join(TMP, '%s_%d_%d.png' % (ref, fr, k)), os.path.join(OUT, 'fase%d_%d.png' % (f, k + 1)), '%s fase %d (aprovado)' % (ref, fr))
print('ok', OUT)
