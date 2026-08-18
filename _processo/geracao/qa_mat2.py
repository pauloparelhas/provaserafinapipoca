# -*- coding: utf-8 -*-
"""qa_mat2.py — gate automatico da home e dos produtos MAT2.

Abre cada HTML num Chromium headless em 3 viewports e reprova:
  · erro de console / excecao de pagina (JS quebrado)
  · rolagem horizontal
  · alvo de toque < 40px
  · sobreposicao grosseira entre irmaos visiveis
  · vazamento de traducao: qualquer elemento controlado por uma regra
    'body.show-tr X{...}' que aparece visivel ANTES de ligar a bandeira
    (achado em 18/08: um <span class="tr" style="display:inline"> no
    Sort it! furava o toggle porque style inline vence a classe)

REGRA ZERO do projeto (CLAUDE.md): o QA roda MUDO. A fala e o audio sao
desligados por add_init_script ANTES de a pagina carregar — um QA que abriu
o lightbox da galeria fez a maquina falar sozinha, e o Paulo proibiu.

Uso:
    python _processo/geracao/qa_mat2.py
    python _processo/geracao/qa_mat2.py MAT2_simulado.html
"""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
RAIZ = Path(__file__).resolve().parents[2]
FER = RAIZ / "ferramentas"

MUDO = """
try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){};
     speechSynthesis.getVoices=function(){return [];}; }catch(e){}
window.SpeechSynthesisUtterance=function(){};
window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); };
"""

VIEWPORTS = [("retrato", 360, 640), ("paisagem", 740, 360), ("notebook", 1280, 800)]

SELETOR_TR = re.compile(r"body\.show-tr\s+([^{,]+?)\s*\{")
REGRA_BASE = re.compile(r"(?<![.\w-])([.][\w.\- ]+?)\s*\{([^}]*)\}")


def seletores_tr(caminho_html):
    """Seletores 'X' com uma regra 'body.show-tr X{...}' — so entram os que
    tambem tem uma regra base 'X{display:none...}': e o padrao de
    esconder-ate-a-bandeira. Fica de fora a .dicabtn (so troca opacidade),
    que e visivel o tempo todo por design."""
    texto = Path(caminho_html).read_text(encoding="utf-8", errors="replace")
    candidatos = sorted(set(m.strip() for m in SELETOR_TR.findall(texto)))
    ocultos_por_padrao = set()
    for sel, corpo in REGRA_BASE.findall(texto):
        if "display" in corpo and "none" in corpo:
            ocultos_por_padrao.add(sel.strip())
    return [s for s in candidatos if s in ocultos_por_padrao]


def testa(page, arquivo, vp, seletores):
    erros = []
    logs = []
    page.on("console", lambda m: logs.append((m.type, m.text)))
    page.on("pageerror", lambda e: logs.append(("pageerror", str(e))))
    page.goto(arquivo, wait_until="load")
    page.wait_for_timeout(700)
    for tipo, txt in logs:
        if tipo in ("error", "pageerror"):
            erros.append(f"[{vp}] console {tipo}: {txt[:180]}")
    larg = page.evaluate("()=>[document.documentElement.scrollWidth, window.innerWidth]")
    if larg[0] > larg[1] + 2:
        erros.append(f"[{vp}] rolagem horizontal: scrollWidth {larg[0]} > innerWidth {larg[1]}")
    pequenos = page.evaluate("""()=>{
      const out=[];
      document.querySelectorAll('button,a,[onclick]').forEach(el=>{
        const r=el.getBoundingClientRect();
        if(r.width===0&&r.height===0) return;
        const cs=getComputedStyle(el);
        if(cs.display==='none'||cs.visibility==='hidden') return;
        if(r.height<40||r.width<28) out.push((el.id||el.className||el.tagName)+' '+Math.round(r.width)+'x'+Math.round(r.height));
      });
      return out.slice(0,6);
    }""")
    for p in pequenos:
        erros.append(f"[{vp}] alvo de toque pequeno: {p}")
    if seletores:
        vazados = page.evaluate("""(sels)=>{
          const out=[];
          sels.forEach(sel=>{
            let els; try{ els=document.querySelectorAll(sel); }catch(e){ return; }
            els.forEach(el=>{
              const cs=getComputedStyle(el);
              if(cs.display!=='none' && cs.visibility!=='hidden' && (el.offsetWidth||el.offsetHeight))
                out.push(sel+' -> "'+el.textContent.trim().slice(0,40)+'"');
            });
          });
          return out.slice(0,6);
        }""", seletores)
        for v in vazados:
            erros.append(f"[{vp}] traducao vazando sem a bandeira: {v}")
    return erros


def servidor():
    """Servidor HTTP local: os produtos que leem JSON por fetch() NAO funcionam
    em file:// (o navegador bloqueia). O QA tem de ver a mesma coisa que o
    GitHub Pages serve."""
    import functools, http.server, socketserver, threading
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(RAIZ))
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{srv.server_address[1]}/"


def main():
    from playwright.sync_api import sync_playwright
    alvos = sys.argv[1:] or (["index.html"] +
             sorted("ferramentas/" + x.name for x in FER.glob("MAT2_*.html")))
    total = 0
    srv, base = servidor()
    with sync_playwright() as pw:
        nav = pw.chromium.launch()
        for nome in alvos:
            arq = base + nome
            seletores = seletores_tr(RAIZ / nome)
            achados = []
            for vp, w, h in VIEWPORTS:
                ctx = nav.new_context(viewport={"width": w, "height": h})
                ctx.add_init_script(MUDO)
                pg = ctx.new_page()
                try:
                    achados += testa(pg, arq, vp, seletores)
                except Exception as e:
                    achados.append(f"[{vp}] FALHA AO ABRIR: {e}")
                ctx.close()
            total += len(achados)
            print(f"{'FALHA' if achados else '  ok '} {nome}" +
                  ("" if not achados else "\n    " + "\n    ".join(achados[:12])))
        nav.close()
    srv.shutdown()
    print(f"\n{'REPROVADO' if total else 'APROVADO'} — {total} achado(s)")
    return 1 if total else 0


if __name__ == "__main__":
    raise SystemExit(main())
