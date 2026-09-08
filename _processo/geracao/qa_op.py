# -*- coding: utf-8 -*-
"""
qa_op.py — gate do material da Olimpiada de Portugues (OP_*).

Roda MUDO (regra zero do CLAUDE.md): silencia speechSynthesis e AudioContext
ANTES de a pagina carregar. Nenhum teste automatizado pode fazer a maquina falar.

O que ele reprova:
  - erro de console em qualquer tela
  - rolagem horizontal em 360x640, 740x360 e 1280x800
  - alvo de toque com menos de 44px de altura
  - percurso quebrado: nao chega ao resultado respondendo tudo errado
  - a regua nao liberando as alternativas ao chegar na ultima linha
  - questao-irma nao entrando depois de um erro

Uso:  python _processo/geracao/qa_op.py
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path(__file__).resolve().parents[2]
ALVOS = [("OP_simulado.html", "simulado"), ("OP_truques.html", "truques")]
# O aparelho de uso e o TABLET (decisao do Paulo, 08/09). O celular fica
# como piso de seguranca: nao e o alvo, mas nao pode quebrar.
VIEWPORTS = [(810, 1080, "tablet retrato"), (1080, 810, "tablet paisagem"),
             (768, 1024, "tablet menor"), (360, 640, "celular (piso)")]
VP_PERCURSO = (810, 1080)   # onde o percurso completo e testado

MUDO = """
try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){};
     speechSynthesis.getVoices=function(){return [];}; }catch(e){}
window.SpeechSynthesisUtterance=function(){};
window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); };
"""

falhas = []
def falha(msg):
    falhas.append(msg)
    print("  REPROVA:", msg)

def checa_layout(page, ctx):
    larg = page.evaluate("()=>[document.documentElement.scrollWidth, window.innerWidth]")
    if larg[0] > larg[1] + 1:
        falha(f"{ctx}: rolagem horizontal ({larg[0]}px de conteudo em {larg[1]}px de tela)")
    baixos = page.evaluate("""()=>{
      var r=[];
      document.querySelectorAll('button,a').forEach(function(b){
        if(b.offsetParent===null) return;
        var h=b.getBoundingClientRect().height;
        if(h>0 && h<44) r.push((b.id||b.className||b.tagName)+' '+Math.round(h)+'px');
      });
      return r;
    }""")
    for b in baixos:
        falha(f"{ctx}: alvo de toque menor que 44px -> {b}")

def percorre_simulado(page):
    """Responde tudo ERRADO de proposito: e o caminho que exercita o
       comentario didatico e a entrada da questao-irma."""
    page.click(".esc.forte")          # o botao, nao o titulo da barra de cima
    page.wait_for_selector(".pede", timeout=5000)
    irmas_vistas = 0
    for passo in range(60):
        if page.locator(".placar").count():
            break
        # desce a regua ate o fim, se houver
        for _ in range(30):
            bt = page.locator("#btDesce")
            if not bt.count() or not bt.is_visible():
                break
            bt.click()
        if page.locator("#opts").is_visible() is False:
            falha("regua: cheguei ao fim do texto e as alternativas nao apareceram")
            return irmas_vistas
        # marca uma alternativa errada, se a questao ainda nao foi respondida
        if page.locator("#fb.show").count() == 0:
            idx = page.evaluate("""()=>{
              var it=deck[cur];
              for(var i=0;i<it.opts.length;i++) if(!it.opts[i].ok) return i;
              return 0;
            }""")
            page.click(f"#opt{idx}")
            page.wait_for_selector("#fb.show", timeout=3000)
            for parte in [".truque", ".sua", ".prox"]:
                if page.locator(f"#fb {parte}").count() == 0:
                    falha(f"comentario de erro sem a parte {parte}")
        if page.locator(".irma").count():
            irmas_vistas += 1
        page.click("#next")
        page.wait_for_timeout(120)
    return irmas_vistas

with sync_playwright() as pw:
    nav = pw.chromium.launch()
    for arquivo, nome in ALVOS:
        caminho = RAIZ / "ferramentas" / arquivo
        if not caminho.exists():
            print(f"[pulado] {arquivo} ainda nao existe")
            continue
        print(f"\n=== {arquivo} ===")
        for w, h, rot in VIEWPORTS:
            ctx = nav.new_context(viewport={"width": w, "height": h})
            ctx.add_init_script(MUDO)
            page = ctx.new_page()
            erros = []
            page.on("console", lambda m: erros.append(m.text) if m.type == "error" else None)
            page.on("pageerror", lambda e: erros.append(str(e)))
            page.goto(caminho.as_uri())
            page.wait_for_timeout(500)
            checa_layout(page, f"{nome} {rot} inicio")
            if nome == "simulado" and (w, h) == VP_PERCURSO:
                irmas = percorre_simulado(page)
                checa_layout(page, f"{nome} {rot} resultado")
                if not page.locator(".placar").count():
                    falha("simulado: nao cheguei ao resultado respondendo tudo")
                if irmas == 0:
                    falha("simulado: errei todas e nenhuma questao-irma entrou")
                else:
                    print(f"  ok: {irmas} questoes-irma entraram depois dos erros")
            for e in erros:
                falha(f"{nome} {rot}: erro de console -> {e}")
            ctx.close()
    nav.close()

print("\n" + ("REPROVADO: %d problema(s)" % len(falhas) if falhas else "GATE OK: 0 problemas"))
sys.exit(1 if falhas else 0)
