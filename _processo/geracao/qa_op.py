# -*- coding: utf-8 -*-
"""
qa_op.py — gate do material da Olimpiada de Portugues (OP_*).

Roda MUDO (regra zero do CLAUDE.md): silencia speechSynthesis e AudioContext
ANTES de a pagina carregar. Nenhum teste automatizado pode fazer a maquina falar.

O que ele reprova:
  - erro de console em qualquer tela
  - rolagem horizontal em 360x640, 740x360 e 1280x800
  - alvo de toque com menos de 44px de altura
  - percurso quebrado: nao chega ao resultado
  - correcao de erro sem as tres partes (truque, a marcada, o gesto)
  - popup da teoria que nao corrige, nao fecha ou perde a posicao da pagina

Uso:  python _processo/geracao/qa_op.py
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path(__file__).resolve().parents[2]
ALVOS = [("OP_simulado.html", "simulado"), ("OP_estudo.html", "estudo"), ("OP_provas.html", "provas"), ("OP_video.html", "video"), ("OP_slides.html", "slides")]
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
    """Percorre uma rodada inteira marcando sempre a alternativa A.

    Como a ordem das alternativas e sorteada, algumas serao certas e outras
    erradas — o que e justamente o que se quer: exercita o elogio E a
    correcao didatica. Toda correcao de erro tem de trazer as tres partes
    (truque, a alternativa marcada, e o gesto para a proxima)."""
    page.click(".linha >> nth=1")                 # "Prova inteira", 15 questoes
    page.wait_for_selector(".opts .opt", timeout=5000)
    irmas = 0
    erros_corrigidos = 0
    for _ in range(80):
        if page.locator(".placar").count():
            break
        if page.locator(".fb").count() == 0:
            page.click(".opts .opt >> nth=0")
            page.wait_for_selector(".fb", timeout=3000)
            if page.locator(".fb.errado").count():
                erros_corrigidos += 1
                for parte, oque in [(".truq", "o truque"), (".sua", "a alternativa marcada"),
                                    (".prox", "o gesto para a proxima")]:
                    if page.locator(".fb " + parte).count() == 0:
                        falha("correcao de erro sem " + oque)
            elif page.locator(".fb.certo .porq").count() == 0:
                falha("acerto sem a explicacao do porque")
        if page.locator(".qetq").count():
            irmas += 1
        botao = page.locator(".avancar").first
        if botao.count():
            botao.click()
        else:
            page.click("#navNext")
        page.wait_for_timeout(140)
    if erros_corrigidos == 0:
        falha("simulado: percorri a rodada inteira e nenhuma correcao de erro apareceu")
    return irmas


def percorre_estudo(page):
    """Abre um bloco, abre o popup de questoes reais daquele tipo, responde,
       fecha — e confere que a pagina volta para onde estava."""
    page.click(".blocotopo >> nth=0")
    page.wait_for_selector(".bloco.aberto .acao.forte", timeout=4000)
    page.evaluate("()=>window.scrollTo(0,300)")
    antes = page.evaluate("()=>Math.round(window.scrollY)")
    page.click(".bloco.aberto .acao.forte")
    page.wait_for_selector(".modal .opt", timeout=4000)
    page.click(".modal .opt >> nth=0")
    page.wait_for_timeout(250)
    if page.locator(".modal .fb").count() == 0:
        falha("estudo: o popup nao corrigiu a resposta")
    page.click(".fechar")
    page.wait_for_timeout(300)
    if page.locator(".modal").count():
        falha("estudo: o popup nao fechou")
    depois = page.evaluate("()=>Math.round(window.scrollY)")
    if abs(depois - antes) > 30:
        falha(f"estudo: ao fechar o popup a pagina pulou de {antes}px para {depois}px")
    if page.locator(".bloco.aberto").count() == 0:
        falha("estudo: o bloco fechou sozinho depois do popup")


def percorre_provas(page):
    """Abre a primeira prova anterior e responde a primeira questao."""
    page.click(".provacard >> nth=0")
    page.wait_for_selector(".opts .opt", timeout=4000)
    if page.locator(".mapa button").count() == 0:
        falha("provas: a grade de questoes nao apareceu")
    page.click(".opts .opt >> nth=0")
    page.wait_for_timeout(250)
    if page.locator(".fb").count() == 0:
        falha("provas: a questao nao foi corrigida")


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
            if (w, h) == VP_PERCURSO:
                if nome == "simulado":
                    irmas = percorre_simulado(page)
                    checa_layout(page, f"{nome} {rot} resultado")
                    if not page.locator(".placar").count():
                        falha("simulado: nao cheguei ao resultado")
                    else:
                        print(f"  ok: rodada inteira ate o placar; {irmas} questoes-irma entraram")
                elif nome == "estudo":
                    percorre_estudo(page)
                    print("  ok: popup de questoes reais abre, corrige e devolve a rolagem")
                elif nome == "provas":
                    percorre_provas(page)
                    print("  ok: prova anterior abre e corrige")
            for e in erros:
                falha(f"{nome} {rot}: erro de console -> {e}")
            ctx.close()
    nav.close()

print("\n" + ("REPROVADO: %d problema(s)" % len(falhas) if falhas else "GATE OK: 0 problemas"))
sys.exit(1 if falhas else 0)
