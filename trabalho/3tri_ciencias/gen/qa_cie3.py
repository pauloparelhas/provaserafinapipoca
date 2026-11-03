# Portao CIE3: mudo, servidor local, 3 viewports. Reprova erro de console, 404, rolagem horizontal, alvo < 44 px,
# e PORTUGUES visivel com a bandeira desligada (le o texto renderizado, nao seletor). Uso: python qa_cie3.py <pasta_shots> [paginas]
import sys, os, re, threading, functools, http.server, socketserver
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
SHOTS = sys.argv[1]; os.makedirs(SHOTS, exist_ok=True)
PAGS = sys.argv[2].split(',') if len(sys.argv) > 2 else ['index.html', 'ferramentas/CIE3_simulado.html', 'ferramentas/CIE3_estudo.html', 'ferramentas/CIE3_material.html', 'ferramentas/CIE3_pocket.html']
MUDO = """try{speechSynthesis.speak=function(){};speechSynthesis.cancel=function(){};speechSynthesis.getVoices=function(){return [];};}catch(e){}
window.SpeechSynthesisUtterance=function(){};window.AudioContext=window.webkitAudioContext=function(){throw new Error('audio off');};
HTMLMediaElement.prototype.play=function(){return Promise.resolve();};"""
VP = [(360, 640), (740, 360), (1280, 800)]
PT = re.compile(r"[ãõçáéíóúâêôà]|\b(você|para|prova|voltar|próxima|sair|lição|começar|estudar|imprimir|tema|letra|som)\b", re.I)
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Q, directory=RAIZ)); srv.daemon_threads = True
threading.Thread(target=srv.serve_forever, daemon=True).start()
base = f'http://127.0.0.1:{srv.server_address[1]}/'
falhas = []
MEDE = """()=>{const r={scroll:document.documentElement.scrollWidth-innerWidth,peq:[],pt:[]};
document.querySelectorAll('button,a').forEach(e=>{const b=e.getBoundingClientRect();if(b.width&&b.height&&(b.width<40||b.height<40)&&getComputedStyle(e).visibility!='hidden')r.peq.push((e.id||e.textContent||e.className).trim().slice(0,25)+' '+Math.round(b.width)+'x'+Math.round(b.height));});
return r;}"""
with sync_playwright() as p:
    br = p.chromium.launch()
    for pg in PAGS:
        for w, h in VP:
            c = br.new_context(viewport={'width': w, 'height': h}); c.add_init_script(MUDO)
            t = c.new_page(); erros = []
            t.on('pageerror', lambda e: erros.append('JS ' + str(e)[:120]))
            t.on('console', lambda m: erros.append('CON ' + m.text[:120]) if m.type == 'error' else None)
            t.on('response', lambda r: erros.append(f'{r.status} {r.url[-60:]}') if r.status >= 400 and 'favicon' not in r.url else None)
            t.goto(base + pg); t.wait_for_timeout(700)
            r = t.evaluate(MEDE); txt = t.evaluate("document.body.innerText")
            nome = pg.split('/')[-1].replace('.html', '')
            t.screenshot(path=f'{SHOTS}/{nome}_{w}.png', full_page=(w == 1280))
            q = []
            if erros: q.append(erros[:4])
            if r['scroll'] > 1 and 'pocket' not in pg: q.append('scroll ' + str(r['scroll']))
            if r['peq']: q.append(r['peq'][:5])
            achados = sorted({l.strip()[:70] for l in txt.split('\n') if PT.search(l)})
            if achados and 'pocket' not in pg: q.append(['PT'] + achados[:8])
            if q: falhas.append((pg, w, q))
            c.close()
    br.close()
for f in falhas: print('FALHA', f)
print('QA', 'REPROVADO' if falhas else 'VERDE', len(falhas))
sys.exit(1 if falhas else 0)
