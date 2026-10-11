"""Carimbo de versão — garante que quem já visitou o site veja a versão nova.

Roda DENTRO da cópia que vai ao ar (worktree do ramo em-construcao), chamado
pelo publicar_lp3.sh. Problema que resolve (11/10/2026): tablets que já tinham
entrado continuavam vendo o jogo velho, porque
  - o GitHub Pages manda Cache-Control: max-age=600 em tudo;
  - vários .js mudaram sem trocar o ?v= da tag (o navegador reaproveitava);
  - aparelhos antigos ainda podiam ter o service worker velho (serafina-v31/32),
    que servia os .js-base do cache.

O que faz, em cada .html publicado:
  1. troca TODO ?v=... de arquivo local por ?v=<BUILD> e põe ?v=<BUILD> em quem
     não tinha — cada publicação = URLs novas = nada de cache velho de .js/.css/mídia;
  2. injeta no <head> um vigia que: desregistra qualquer service worker, apaga
     os caches, e consulta versao.json (no-store). Se a versão publicada for outra
     que a da página, recarrega UMA vez com ?v=<nova> (o HTML velho em cache
     também é furado, porque a URL muda). Repete a consulta quando a aba volta
     a ficar visível (tablet que ficou com o site aberto).
E grava versao.json na raiz.

Uso: python carimbo_versao.py <raiz_da_copia> <BUILD>
"""
import json
import re
import sys
from pathlib import Path

raiz = Path(sys.argv[1])
build = sys.argv[2]

VIGIA = """<script>/* vigia de versao (carimbo_versao.py) */(function(){var B='%s';
try{if(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister();});});}
if(window.caches&&caches.keys){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k);});});}}catch(e){}
var raiz=location.pathname.indexOf('/ferramentas/')>=0?'../':'';
function confere(){fetch(raiz+'versao.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json();}).then(function(j){
if(!j||!j.v||j.v===B)return;var k='lp3_recarregou_'+j.v;try{if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,'1');}catch(e){}
var u=new URL(location.href);u.searchParams.set('v',j.v);location.replace(u.toString());}).catch(function(){});}
confere();document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')confere();});})();</script>
"""

# src/href/poster para arquivo local (sem http, sem //, sem #, sem data:)
ATTR = re.compile(r'''((?:src|href|poster)=["'])(?!https?:|//|#|data:|mailto:)([^"'?#]+\.(?:js|css|mp4|jpg|jpeg|png|svg|json|html))(\?[^"'#]*)?(["'])''', re.I)


def carimba(html: str) -> str:
    def troca(m):
        pre, caminho, _q, fim = m.groups()
        if caminho.lower().endswith('.html'):
            return pre + caminho + '?v=' + build + fim  # link entre paginas tambem fura cache
        return pre + caminho + '?v=' + build + fim
    html = ATTR.sub(troca, html)
    # media/... dentro de JS inline (ex.: <source src> ja coberto; strings em script)
    html = re.sub(r"(media/[\w\-]+\.(?:mp4|jpg))(\?v=[\w]+)?", r"\1?v=" + build, html)
    vig = VIGIA % build
    if '<head>' in html:
        html = html.replace('<head>', '<head>\n' + vig, 1)
    else:
        html = vig + html
    return html


n = 0
for p in [raiz / 'index.html', *sorted((raiz / 'ferramentas').glob('*.html'))]:
    if not p.exists():
        continue
    s = p.read_text(encoding='utf-8')
    if 'vigia de versao' in s:
        s = re.sub(r'<script>/\* vigia de versao.*?</script>\n', '', s, flags=re.S)
    p.write_text(carimba(s), encoding='utf-8')
    n += 1
(raiz / 'versao.json').write_text(json.dumps({'v': build}), encoding='utf-8')
print(f'carimbo {build}: {n} paginas')
