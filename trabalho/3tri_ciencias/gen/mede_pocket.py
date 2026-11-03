# Mede o vazio de cada secao do pocket e fotografa a folha. Portao: reprova secao com mais de 6% vazia ou transbordando.
import os, sys
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
JS = """[...document.querySelectorAll('.sec')].map(s=>{const r=s.getBoundingClientRect();
let b=0;[...s.children].forEach(e=>{b=Math.max(b,e.getBoundingClientRect().bottom)});
return [s.className,Math.round((r.bottom-b)/r.height*100),s.scrollHeight>s.clientHeight+1]})"""
with sync_playwright() as p:
    br = p.chromium.launch()
    t = br.new_page(viewport={'width': 1200, 'height': 850}, device_scale_factor=1.5)
    t.goto('file:///' + os.path.abspath('ferramentas/CIE3_pocket.html').replace(os.sep, '/'))
    t.wait_for_timeout(700)
    ruim = 0
    for c, v, o in t.evaluate(JS):
        print(c, str(v) + '% vazio', 'TRANSBORDA' if o else '')
        if v > 6 or o: ruim += 1
    t.locator('.page').screenshot(path=sys.argv[1])
    br.close()
print('POCKET', 'REPROVADO' if ruim else 'VERDE')
sys.exit(1 if ruim else 0)
