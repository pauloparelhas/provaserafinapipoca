"""Teste das funções da Fábrica (MUDO), usando a tela como a criança: clica, pinta, escolhe.
Cobre: pintar o herói (missão 1), regra nova pela grade de cartões, pergunta própria,
ajustes, foto/voltar foto, pedido ao robô (baixa o .json), link de compartilhar (ida e volta),
Placa ? com pergunta da prova, e se as missões conferem. Uso: python teste_funcoes.py"""
import sys, pathlib, json, http.server, threading, functools
from playwright.sync_api import sync_playwright
RAIZ = pathlib.Path(__file__).resolve().parents[2]
class _H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(_H, directory=str(RAIZ.parent)))
threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{srv.server_address[1]}/coding/index.html'
MUDO = ("try{ speechSynthesis.speak=function(){}; speechSynthesis.cancel=function(){}; speechSynthesis.getVoices=function(){return [];}; }catch(e){}"
        "window.SpeechSynthesisUtterance=function(){}; window.AudioContext=window.webkitAudioContext=function(){ throw new Error('audio off'); }; HTMLMediaElement.prototype.play=function(){ return Promise.resolve(); }; HTMLMediaElement.prototype.load=function(){};")
falhas = []
def ok(cond, nome):
    print(('  ok   ' if cond else '  FALHA ') + nome)
    if not cond: falhas.append(nome)
def fecha_medalhas(pg):
    livre = 0
    for _ in range(14):
        if pg.evaluate("document.getElementById('modal').classList.contains('on')"):
            pg.evaluate("FAB.ui.fecha()"); livre = 0
        else:
            livre += 1
            if livre >= 2: return
        pg.wait_for_timeout(300)

with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(viewport={'width': 1280, 'height': 800}, accept_downloads=True)
    pg = ctx.new_page(); pg.add_init_script(MUDO)
    erros = []; pg.on('pageerror', lambda e: erros.append(str(e)))
    pg.goto(URL); pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(400)
    ok(pg.evaluate("FAB.E.jogos.length") == 1, 'primeira vez já nasce com um jogo')

    # 1. pintar o herói pela grade (clique real)
    pg.evaluate("FAB.ui.vai('pixel')"); pg.wait_for_timeout(200)
    pg.click('.cor[data-c="i"]'); pg.click('#pxGrade div[data-i="137"]'); pg.wait_for_timeout(300)
    ok(pg.evaluate("/^meu_/.test(FAB.jogo().skins.heroi)"), 'pintar o herói cria a cópia dela')
    ok(pg.evaluate("!!FAB.E.missoes.heroi"), 'missão 1 (herói) conferida')
    fecha_medalhas(pg)
    ok(pg.evaluate("FAB.E.sprites[FAB.jogo().skins.heroi].quadros.every(q=>q[8][9]==='i')"), 'o pixel vale nos dois quadros')

    # 2. regra nova: QUANDO apertar tecla X → super pulo, pelos cartões
    pg.evaluate("FAB.ui.vai('regras')"); pg.wait_for_timeout(200)
    n0 = pg.evaluate("FAB.jogo().regras.length")
    pg.click('#rgNova'); pg.wait_for_timeout(150)
    pg.click('.op:has-text("apertar a tecla")'); pg.wait_for_timeout(150)
    pg.click('.op:has-text("X")'); pg.wait_for_timeout(150)
    pg.click('.op:has-text("super pulo")'); pg.wait_for_timeout(250)
    ok(pg.evaluate("FAB.jogo().regras.length") == n0 + 1, 'regra nova entrou pelos cartões')
    ok(pg.evaluate("var r=FAB.jogo().regras.slice(-1)[0]; r.quando.t==='tecla'&&r.quando.tecla==='X'&&r.faca[0].t==='pulo'"), 'regra nova tem QUANDO tecla X → super pulo')

    # 3. testar: pula e aperta X → missões "pular" e "tecla"
    pg.evaluate("FAB.ui.vai('testar')"); pg.wait_for_timeout(400)
    pg.keyboard.press('Space'); pg.wait_for_timeout(600); pg.keyboard.press('x'); pg.wait_for_timeout(700)
    pg.click('#tsPara'); pg.wait_for_timeout(500)
    fecha_medalhas(pg)
    ok(pg.evaluate("!!FAB.E.missoes.pular"), 'missão pular conferida no teste')
    ok(pg.evaluate("!!FAB.E.missoes.tecla"), 'missão tecla X conferida (regra acordou)')
    pg.click('.cara[data-c="feliz"]'); pg.wait_for_timeout(150); pg.click('#tsMudarC .esc'); pg.wait_for_timeout(200)
    fecha_medalhas(pg)
    ok(pg.evaluate("FAB.E.diario.length") >= 1 and pg.evaluate("!!FAB.E.missoes.diario"), 'carinha do fim do teste vai para o diário')

    # 4. pergunta própria + Placa ? pergunta
    pg.evaluate("FAB.regrasAba('perguntas'); FAB.ui.vai('regras')"); pg.wait_for_timeout(200)
    pg.fill('#pgP', 'Qual é a cor do céu de dia?'); pg.fill('#pgC', 'azul'); pg.fill('#pgE1', 'verde'); pg.fill('#pgE2', 'roxo')
    pg.click('#pgSalva'); pg.wait_for_timeout(200)
    ok(pg.evaluate("FAB.E.perguntas.length") == 1 and pg.evaluate("FAB.jogo().ajustes.perguntas") == 'mistura', 'pergunta dela guardada e placa passa a misturar')
    nprova = pg.evaluate("FAB.perguntasDaProva().length")
    ok(nprova > 50, f'banco da prova carregado ({nprova} perguntas)')

    # Placa ? no caminho: põe a placa colada no começo e anda até ela
    pg.evaluate("var f=FAB.jogo().fases[0]; f.mapa[9]=f.mapa[9].slice(0,3)+'?'+f.mapa[9].slice(4); FAB.mudou();")
    pg.evaluate("FAB.ui.vai('testar')"); pg.wait_for_timeout(300)
    pg.keyboard.down('ArrowRight'); pg.wait_for_timeout(700); pg.keyboard.up('ArrowRight'); pg.wait_for_timeout(300)
    abriu = pg.evaluate("!!document.querySelector('#mbox .alt')")
    ok(abriu, 'a Placa ? abre a pergunta')
    if abriu:
        certa = pg.evaluate("[...document.querySelectorAll('#mbox .alt')].findIndex(b=>b.dataset.i==='0')")
        pg.keyboard.press(str(certa + 1)); pg.wait_for_timeout(200)
        ok(pg.evaluate("!!document.querySelector('#mbox .alt.certa')"), 'mostra a resposta certa depois de responder')
        pg.click('#pqOk'); pg.wait_for_timeout(300)
        pg.click('#tsPara'); pg.wait_for_timeout(400)
        ok(pg.evaluate("(FAB.jogo().ultimoTeste.certas||0)") >= 1, 'acerto contado no teste')
    fecha_medalhas(pg)

    # 5. foto do jogo e voltar
    pg.evaluate("FAB.ui.vai('diario')"); pg.wait_for_timeout(200)
    pg.click('#dgFoto'); pg.wait_for_timeout(200)
    fecha_medalhas(pg)
    pg.evaluate("FAB.jogo().nome='Mudado'; FAB.mudou()")
    pg.evaluate("FAB.ui.vai('diario')"); pg.wait_for_timeout(200)
    pg.click('[data-volta="0"]'); pg.wait_for_timeout(150); pg.click('#vtSim'); pg.wait_for_timeout(300)
    ok(pg.evaluate("FAB.jogo().nome") != 'Mudado' and pg.evaluate("FAB.jogo().versoes.length") == 2, 'voltar a foto restaura e guarda a de antes')
    fecha_medalhas(pg)

    # 6. robô: só envia com as 3 partes e baixa o .json
    pg.evaluate("FAB.ui.vai('robo')"); pg.wait_for_timeout(200)
    ok(pg.is_disabled('#rbEnvia'), 'pedido vazio não envia')
    pg.click('#rbTipo .esc[data-v="inimigo"]'); pg.fill('#rbNome', 'Dragão Bolha'); pg.fill('#rbComo', 'roxo e pequeno com asas'); pg.fill('#rbFaz', 'voa e solta bolhas')
    with pg.expect_download() as d:
        pg.click('#rbEnvia')
    arq = d.value.suggested_filename
    ok(arq.startswith('fabrica_mariana_') and arq.endswith('.json'), f'pedido baixa o arquivo ({arq})')
    fecha_medalhas(pg)
    ok(pg.evaluate("FAB.E.pedidos.length") == 1, 'pedido registrado')

    # 7. link de compartilhar: ida e volta
    url = pg.evaluate("FAB.linkDoJogo(FAB.jogo())")
    ok('#jogo=' in url and len(url) < 30000, f'link do jogo gerado ({len(url)} caracteres)')
    pg2 = ctx.new_page(); pg2.add_init_script(MUDO); pg2.goto(url); pg2.wait_for_timeout(600)
    ok(pg2.evaluate("FAB.compartilhado===true && FAB.jogo().fases.length>=1"), 'link abre o jogo dela em modo visita')
    ok(pg2.evaluate("/^meu_/.test(FAB.jogo().skins.heroi) && !!FAB.E.sprites[FAB.jogo().skins.heroi]"), 'o herói desenhado viaja no link')
    pg2.close(run_before_unload=True); pg.wait_for_timeout(300)
    ok(pg.evaluate("JSON.parse(localStorage.getItem('fab_mariana_v1')).jogos.some(j=>j.id!=='visita') && !JSON.parse(localStorage.getItem('fab_mariana_v1')).jogos.some(j=>j.id==='visita')"), 'fechar a aba do link não apaga o trabalho dela')
    # arquivo incompleto não trava (TI 23/10)
    pg3 = ctx.new_page(); pg3.add_init_script(MUDO); pg3.goto(URL); pg3.wait_for_timeout(300)
    pg3.evaluate("localStorage.setItem('fab_mariana_v1', JSON.stringify({v:1, jogos:[{id:'a',nome:'X',fases:[{nome:'F',cenario:'dia',mapa:FAB.MODELOS.vazio.fases[0].mapa}],regras:[]}], atual:'a'}))")
    e3 = []; pg3.on('pageerror', lambda e: e3.append(str(e))); pg3.reload(); pg3.wait_for_timeout(500)
    ok(not e3 and pg3.evaluate("Array.isArray(FAB.E.diario) && typeof FAB.E.stats.testes==='number'"), 'estado incompleto é completado sem erro')
    pg3.evaluate("localStorage.clear()"); pg3.close()

    # 8. jogo quebrado: missão bug1 só confere depois de consertar
    pg.evaluate("FAB.novoJogo('quebrado'); FAB.ui.nav(); FAB.ui.vai('regras')"); pg.wait_for_timeout(200)
    ok(pg.evaluate("FAB.jogo().regras.some(r=>r.quando.obj==='bandeira'&&r.liga===false)"), 'quebrado nasce com a bandeira desligada')
    ok(not pg.evaluate("!!FAB.E.missoes.bug1"), 'bug1 ainda não conferido')

    ok(not erros, 'sem erro de página: ' + '; '.join(erros))
    b.close()
print('FUNÇÕES: ' + ('OK' if not falhas else 'FALHARAM ' + str(len(falhas))))
sys.exit(1 if falhas else 0)
