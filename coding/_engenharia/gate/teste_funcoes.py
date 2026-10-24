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

    # 9. navegação v3 (Frente A): continuar de onde parei, selo, guardar com nome, desejos, trilho, seta guia
    fecha_medalhas(pg)
    pg.evaluate("FAB.ui.vai('fases')"); pg.wait_for_timeout(200)
    pg.click('#fzNova'); pg.wait_for_timeout(300); pg.click('#mbox .op[data-i="0"]'); pg.wait_for_timeout(400); pg.click('#mbox .op[data-i="0"]'); pg.wait_for_timeout(300); fecha_medalhas(pg)
    jogo_fz = pg.evaluate("FAB.E.atual")
    ok(pg.evaluate("FAB.E.onde.tela==='fases' && FAB.E.onde.fase===1"), 'onde parou guarda tela e fase (Fases, Fase 2)')
    pg5 = ctx.new_page(); pg5.add_init_script(MUDO); e5 = []; pg5.on('pageerror', lambda e: e5.append(str(e)))
    pg.wait_for_timeout(400); pg5.goto(URL); pg5.wait_for_timeout(500)
    ok(pg5.evaluate("FAB.ui.atual()") == 'painel', 'reabrir a Fábrica começa no Início')
    ok('Fases' in pg5.inner_text('.pn-onde-tx'), 'Início diz "Você parou em: Fases"')
    ok(pg5.evaluate("document.querySelectorAll('#t-painel .bt.amarelo').length") == 1, 'Início tem um botão amarelo só (Continuar)')
    ok(not pg5.query_selector('#pnExp') and not pg5.query_selector('#pnMic'), 'botões do papai saíram do Início')
    pg5.click('#pnCont'); pg5.wait_for_timeout(400)
    ok(pg5.evaluate("FAB.ui.atual()==='fases' && FAB.E.atual==='%s' && document.querySelector('#t-fases .aba.on[data-f]').dataset.f==='1'" % jogo_fz), 'Continuar volta EXATAMENTE: mesmo jogo, Fases, Fase 2')
    pg5.evaluate("FAB.ui.vai('regras')"); pg5.wait_for_timeout(200); pg5.click('[data-aba="ajustes"]'); pg5.wait_for_timeout(200)
    pg5.evaluate("FAB.regrasAba('regras'); FAB.ui.vai('painel')"); pg5.wait_for_timeout(200); pg5.click('#pnCont'); pg5.wait_for_timeout(300)
    ok(pg5.evaluate("FAB.ui.atual()==='regras' && document.querySelector('#t-regras .aba.on').dataset.aba==='ajustes'"), 'Continuar volta à aba de Regras em que parou')
    pg5.evaluate("FAB.ui.vai('testar')"); pg5.wait_for_timeout(400); pg5.evaluate("FAB.ui.vai('painel')"); pg5.wait_for_timeout(200)
    pg5.click('#pnCont'); pg5.wait_for_timeout(400)
    ok(pg5.evaluate("FAB.ui.atual()==='testar' && FAB.motor.rodando()"), 'Continuar volta ao Testar (o jogo roda de novo)')
    ok(pg5.evaluate("!!document.querySelector('#trilho #trProx') && !!document.querySelector('#trilho #trAnt')"), 'trilho anterior · Próximo passo no Testar')
    pg5.evaluate("FAB.motor.termina(); FAB.ui.imersivo(true)"); pg5.wait_for_timeout(300)
    ok(pg5.evaluate("var r=document.getElementById('trProx').getBoundingClientRect(); r.height>=44 && r.bottom<=innerHeight"), 'Próximo passo visível na tela grande (fim do teste)')
    # selo: Salvando… -> Salvo; armazenamento cheio -> Não salvou
    pg5.evaluate("FAB.ui.vai('painel'); FAB.mudou()")
    ok(pg5.evaluate("document.getElementById('selo').classList.contains('salvando')"), 'selo mostra Salvando… logo depois de mudar')
    pg5.wait_for_timeout(500)
    ok(pg5.evaluate("document.getElementById('selo').classList.contains('salvo')"), 'selo volta para Salvo')
    pg5.evaluate("Storage.prototype._s=Storage.prototype.setItem; Storage.prototype.setItem=function(){ throw new Error('cheio'); }; FAB.salva()"); pg5.wait_for_timeout(500)
    ok(pg5.evaluate("document.getElementById('selo').classList.contains('erro')"), 'navegador cheio: selo vira Não salvou')
    pg5.evaluate("Storage.prototype.setItem=Storage.prototype._s; FAB.salva()"); pg5.wait_for_timeout(500)
    ok(pg5.evaluate("FAB.estadoSalvo") == 'salvo', 'selo volta a Salvo quando consegue guardar')
    pg5.evaluate("FAB.ui.fecha()")
    # Guardar este jogo com nome
    pg5.evaluate("FAB.ui.vai('painel')"); pg5.wait_for_timeout(200)
    pg5.click('#pnGuardar'); pg5.wait_for_timeout(150); pg5.fill('#gdNome', 'Castelo da Mari'); pg5.click('#gdOk'); pg5.wait_for_timeout(400)
    ok(pg5.evaluate("FAB.guardados()[0].v.nome==='Castelo da Mari' && FAB.guardados()[0].v.guardado===true"), 'Guardar este jogo grava foto com o nome dela')
    ok('Castelo da Mari' in pg5.inner_text('#pnGuard'), 'jogo guardado aparece no Início')
    # Queria que tivesse… (fim do teste) vai para o .json
    pg5.evaluate("FAB.ui.imersivo(false); FAB.ui.vai('testar')"); pg5.wait_for_timeout(400); pg5.evaluate("FAB.motor.termina()"); pg5.wait_for_timeout(400)
    ok(pg5.evaluate("document.querySelectorAll('#tsDesejos [data-d]').length") == 6, 'fim do teste mostra 6 figuras "Queria que tivesse…"')
    pg5.click('#tsDesejos [data-d="agua"]'); pg5.wait_for_timeout(200)
    ok(pg5.evaluate("FAB.E.desejos.slice(-1)[0].o") == 'agua', 'um toque grava o desejo')
    with pg5.expect_download() as d5:
        pg5.evaluate("FAB.exporta()")
    dados = json.loads(pathlib.Path(d5.value.path()).read_text(encoding='utf-8'))
    ok(any(x.get('o') == 'agua' for x in dados.get('desejos', [])) and dados.get('onde', {}).get('tela'), 'desejos e "onde parou" vão no .json para o papai')
    # cartão "Você pediu, o robô fez"
    pg5.evaluate("FAB.E.pedidos.push({id:'pT',tipo:'inimigo',nome:'Dragão',como:'roxo',faz:'voa',estado:'pronto'}); FAB.ui.vai('painel')"); pg5.wait_for_timeout(300)
    ok(pg5.query_selector('.pn-robo') is not None, 'pedido pronto vira cartão "Você pediu, o robô fez" no Início')
    pg5.click('[data-okped="pT"]'); pg5.wait_for_timeout(200)
    ok(pg5.query_selector('[data-ped="pT"]') is None, 'Oba! tira o cartão do robô')
    # seta guia: no Início aponta o Continuar; na tela errada aponta o Próximo passo
    pg5.evaluate("FAB.ui.vai('painel')"); pg5.wait_for_timeout(600)
    ok(pg5.evaluate("document.getElementById('guia').classList.contains('on') && FAB.guia.alvo()===document.getElementById('pnCont')"), 'seta guia amarela aparece no Início, sobre o Continuar')
    pg5.evaluate("FAB.E.missoes={}; FAB.ui.vai('regras')"); pg5.wait_for_timeout(600)
    ok(pg5.evaluate("FAB.guia.alvo()===document.getElementById('trProx') && document.getElementById('trProx').textContent.indexOf('Desenhar')>=0"), 'missão em outra tela: seta no Próximo passo, que leva lá')
    pg5.click('#trProx'); pg5.wait_for_timeout(500)
    ok(pg5.evaluate("FAB.ui.atual()==='pixel' && FAB.guia.alvo()===document.getElementById('pxGrade')"), 'na tela da missão a seta aponta o lugar exato')
    ok(not e5, 'sem erro de página (navegação): ' + '; '.join(e5))
    pg5.close()

    ok(not erros, 'sem erro de página: ' + '; '.join(erros))
    b.close()
print('FUNÇÕES: ' + ('OK' if not falhas else 'FALHARAM ' + str(len(falhas))))
sys.exit(1 if falhas else 0)
