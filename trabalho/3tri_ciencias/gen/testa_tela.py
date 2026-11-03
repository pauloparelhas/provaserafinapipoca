# testa_tela.py — PORTÃO do que a criança LÊ: captura todo fillText/strokeText e o DOM, com a bandeira ligada e desligada,
# jogando cada fase (robô) e abrindo telas de menu. Página MUDA (REGRA ZERO). Reprova nome velho na tela,
# e confere: tema por fase, quem pergunta, sem pergunta repetida na fase, figura de it.img desenhada.
import sys, os, re, json, time
from playwright.sync_api import sync_playwright
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, '..', '..', '..', 'ferramentas', 'CIE3_jogo.html')).replace('\\', '/')
BOT = open(os.path.join(AQUI, 'crianca_bot.js'), encoding='utf-8').read()
MUDO = """try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){} window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); }; HTMLMediaElement.prototype.play=function(){ return Promise.resolve(); };
window.__txt={}; ['fillText','strokeText'].forEach(function(n){ var o=CanvasRenderingContext2D.prototype[n]; CanvasRenderingContext2D.prototype[n]=function(s){ window.__txt[String(s)]=1; return o.apply(this,arguments); }; });
var di=CanvasRenderingContext2D.prototype.drawImage; window.__img={}; CanvasRenderingContext2D.prototype.drawImage=function(im){ if(im&&im.src) window.__img[im.src.split('/').pop()]=1; return di.apply(this,arguments); };"""
PROIB = r'\b(conde|count scribble|tinta|ink|inkwell|fairy|godmother|castle|castelo|cookie|cookies|biscoito|rabisco|pip|lia|theo|bia|leo|p[aá]gina|p[aá]ginas|page|pages|tra[cç]a|detetive|detective|kingdom|reino|knight|witch|dragon|princess)\b'
ESPERA = {0: ('position', 'pin'), 1: ('directions', 'pin'), 2: ('perspective', 'gigi'), 3: ('forces', 'drop'), 4: ('forces', 'breezy'), 5: ('objects', 'boing'), 6: ('animals', 'paws'), 7: ('pushpull', 'max')}
falhas = []
with sync_playwright() as pw:
    b = pw.chromium.launch(); p = b.new_page(viewport={'width': 960, 'height': 540}); p.add_init_script(MUDO)
    erros = []; p.on('pageerror', lambda e: erros.append(str(e)))
    p.goto('file:///' + RAIZ); p.wait_for_timeout(600)
    intro = p.evaluate("()=>__cie3.JOGO.CENAS_INTRO.length")
    if intro != 3: falhas.append('intro tem %d telas' % intro)
    for i in range(intro): p.wait_for_timeout(250); p.evaluate("()=>{ var b=document.getElementById('lgNext'); if(b) b.click(); }")
    p.wait_for_timeout(200)
    p.evaluate("()=>{ localStorage.setItem('cie3_jogo_v1', JSON.stringify({introVista:true,heroi:'helmet'})); }"); p.reload(); p.wait_for_timeout(600)
    p.evaluate(BOT)
    def dom(): return p.evaluate("()=>document.body.innerText+' '+document.title+' '+[].map.call(document.querySelectorAll('[title],[aria-label]'),function(e){return (e.title||'')+' '+(e.getAttribute('aria-label')||'');}).join(' ')")
    doms = dom()
    for fn in ('comoJogar', 'historia', 'creditos'):
        p.evaluate("(fn)=>{ __cie3.UI[fn](); }", fn); doms += dom(); p.evaluate("()=>__cie3.UI.fechaMenu()")
    p.evaluate("()=>{ __cie3.JOGO.J.tr=true; document.body.classList.add('show-tr'); __cie3.JOGO.irMapa(); }"); p.wait_for_timeout(200)
    for i in range(9): p.evaluate("(i)=>{ __cie3.UI.cartaoMapa(__cie3.FASES.LISTA[i]); }", i); doms += dom()
    for r in range(9):
        p.wait_for_timeout(400)
        p.evaluate("""(r)=>{ var J=__cie3.JOGO; J.relogioTeste(true); try{ __cie3.UI.fechaMenu(); }catch(e){} J.iniciaFase(__cie3.FASES.LISTA[r]); J.J.tr=r%2===0; CRIANCA.inicia({seed:7+r, acerto:.7, limite:r===6?420:(r===8?360:240)}); window.__perg=[];
          window.__marca=function(){ var q=J.J.quiz; if(q&&q.item&&q.m){ var k=q.item.id+'|'+q.m.tipo; if(window.__perg.indexOf(k)<0) window.__perg.push(k); } if(J.J.nivel&&J.J.nivel.quizIds) window.__ja=J.J.nivel.quizIds.slice(); }; window.__ja=[]; }""", r)
        doms += dom()
        for _ in range(3000):
            fim = p.evaluate("()=>{ var s=CRIANCA.passo(40); __marca(); try{ CENA.desenha(); }catch(e){ window.__errD=String(e); } return s.fim; }")
            if fim: break
        p.evaluate("()=>{ __cie3.JOGO.relogioTeste(false); }")
        doms += dom()
        perg = p.evaluate("()=>window.__perg"); ids = [k.split('|')[0] for k in perg]
        if r in ESPERA:
            tema, quem = ESPERA[r]
            temas = p.evaluate("(ids)=>ids.map(function(i){ return CIE3.ITENS.filter(function(x){return x.id===i;})[0].tema; })", ids)
            if any(t != tema for t in temas): falhas.append('fase %d: pergunta fora do tema %s: %s' % (r + 1, tema, sorted(set(temas))))
            quems = set(k.split('|')[1] for k in perg) - {''}
            if quems - {quem}: falhas.append('fase %d: quem pergunta %s' % (r + 1, quems))
        ja = p.evaluate("()=>window.__ja")
        lim = 2 if r == 8 else 1  # o chefão registra cada id ao montar e ao abrir
        if any(ja.count(i) > lim for i in ja): falhas.append('fase %d: pergunta repetida %s' % (r + 1, ja))
        print('fase', r + 1, 'perguntas vistas:', len(set(ids)), flush=True)
        e = p.evaluate("()=>window.__errD||''")
        if e: falhas.append('erro de desenho na fase %d: %s' % (r + 1, e))
    p.evaluate("""()=>{ var J=__cie3.JOGO; J.relogioTeste(true); J.iniciaFase(__cie3.FASES.LISTA[0]); J.J.urso.vx=0; var it=CIE3.ITENS.filter(function(x){return x.tema==='position'&&x.img;})[0]; __cie3.QUIZ.inicia({x:100,y:100,tipo:'pin'},{itens:[it]}); window.__imgAlvo=it.img.split('/').pop(); }""")
    p.wait_for_timeout(600); p.evaluate("()=>{ J=__cie3.JOGO.J; if(J.quiz) J.quiz.fase='pergunta'; CENA.desenha(); }"); p.wait_for_timeout(200)
    if not p.evaluate("()=>!!window.__img[window.__imgAlvo]"): falhas.append('figura it.img não foi desenhada no quadro')
    p.evaluate("()=>{ var J=__cie3.JOGO; J.J.quiz=null; J.iniciaFase(__cie3.FASES.LISTA[8]); J.J.stats={perguntas:9,acertos:8}; J.iniciaFinal(); }"); p.wait_for_timeout(300)
    for i in range(4):
        p.evaluate("()=>{ try{ CENA.desenha(); }catch(e){} }"); doms += dom(); p.evaluate("()=>{ var b=document.getElementById('lgNext'); if(b) b.click(); }"); p.wait_for_timeout(120)
    txt = set(p.evaluate("()=>Object.keys(window.__txt)")); imgs = p.evaluate("()=>Object.keys(window.__img)")
    b.close()
tudo = '\n'.join(sorted(txt)) + '\n' + doms
ach = sorted(set(m.group(0) + ' <= ' + linha.strip()[:70] for linha in tudo.split('\n') for m in re.finditer(PROIB, linha, re.I)))
if ach: falhas.append('nome velho NA TELA:\n    ' + '\n    '.join(ach[:30]))
if erros: falhas.append('erros de JavaScript: ' + '; '.join(erros[:3]))
print('textos capturados:', len(txt), '· figuras desenhadas:', len(imgs))
print('TELA ' + ('REPROVADA:\n  ' + '\n  '.join(falhas) if falhas else 'APROVADA'))
sys.exit(1 if falhas else 0)
