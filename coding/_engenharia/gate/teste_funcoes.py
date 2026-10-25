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

    # 6. Ateliê: quadros da animação, cor misturada, tela sem rolar de lado; música da fase
    pg6 = ctx.new_page(); pg6.add_init_script(MUDO); e6 = []; pg6.on('pageerror', lambda e: e6.append(str(e)))
    pg6.goto(URL); pg6.evaluate("localStorage.clear()"); pg6.reload(); pg6.wait_for_timeout(400)
    # desenho antigo (2 quadros, só letras da paleta): abrir, trocar de quadro sem pintar -> guardado igualzinho, canvas igual ao de sempre
    pg6.evaluate("""() => { const q0 = FAB.SPRITES.urso.quadros[0], q1 = FAB.SPRITES.urso.quadros[1] || q0;
      FAB.E.sprites.meu_antigo = { nome: 'Antigo', grupo: 'heroi', base: 'urso', quadros: [q0.slice(), q1.slice()] };
      window.__antigo = JSON.stringify(FAB.E.sprites.meu_antigo); FAB.jogo().skins.heroi = 'meu_antigo'; FAB.pixelPapel('heroi'); FAB.ui.vai('pixel'); }""")
    pg6.wait_for_timeout(300); fecha_medalhas(pg6)
    pg6.click('.pxq[data-q="1"]'); pg6.click('.pxq[data-q="-1"]'); pg6.wait_for_timeout(200)
    ok(pg6.evaluate("JSON.stringify(FAB.E.sprites.meu_antigo) === window.__antigo"), 'desenho antigo continua idêntico (abrir e trocar de quadro não muda nada)')
    COMPARA = """(id) => { const s = FAB.spr(id); let iguais = true;
      s.quadros.forEach((Q, n) => { const d = FAB.sprCanvas(id, n).getContext('2d').getImageData(0, 0, 16, 16).data;
        for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) { const c = FAB.PALETA[(Q[j] || '')[i]], k = (j * 16 + i) * 4;
          if (!c) { if (d[k + 3] !== 0) iguais = false; } else { const h = '#' + [d[k], d[k + 1], d[k + 2]].map(v => ('0' + v.toString(16)).slice(-2)).join(''); if (h !== c) iguais = false; } } });
      return iguais; }"""
    ok(pg6.evaluate(COMPARA, 'meu_antigo') and pg6.evaluate(COMPARA, 'urso') and pg6.evaluate(COMPARA, 'moeda'), 'desenho antigo e modelos desenham pixel a pixel como antes')
    # no jogo, o herói de 2 quadros anda 0,1,0,1 (a conta de sempre)
    pg6.evaluate("window.__qs = {}; const o = FAB.sprCanvas; FAB.sprCanvas = function (id, q) { if (id === FAB.jogo().skins.heroi) window.__qs[q || 0] = 1; return o.apply(this, arguments); }")
    pg6.evaluate("FAB.ui.vai('testar')"); pg6.wait_for_timeout(400)
    pg6.keyboard.down('ArrowRight'); pg6.wait_for_timeout(1300); pg6.keyboard.up('ArrowRight')
    ok(sorted(pg6.evaluate("Object.keys(window.__qs)")) == ['0', '1'], 'herói antigo de 2 quadros anima 0,1 como antes')
    pg6.evaluate("FAB.ui.vai('pixel')"); pg6.wait_for_timeout(300); fecha_medalhas(pg6)
    # quadro 2 pintado diferente do 1
    pg6.click('.pxq[data-q="1"]'); pg6.click('.cor[data-c="b"]'); pg6.click('#pxGrade div[data-i="0"]'); pg6.wait_for_timeout(200)
    ok(pg6.evaluate("var s = FAB.E.sprites[FAB.jogo().skins.heroi]; s.quadros[1][0][0] === 'b' && s.quadros[0][0][0] !== 'b'"), 'escolhendo o quadro 2, pinta só nele')
    pg6.click('#pxQNovo'); pg6.wait_for_timeout(200); pg6.click('.cor[data-c="r"]'); pg6.click('#pxGrade div[data-i="1"]'); pg6.wait_for_timeout(200)
    ok(pg6.evaluate("var s = FAB.E.sprites[FAB.jogo().skins.heroi]; s.quadros.length === 3 && s.quadros[2][0][1] === 'r' && s.quadros[1][0][1] !== 'r'"), 'quadro novo (3) nasce e recebe pintura própria')
    pg6.click('#pxQCopia'); pg6.wait_for_timeout(200)
    ok(pg6.evaluate("var s = FAB.E.sprites[FAB.jogo().skins.heroi]; JSON.stringify(s.quadros[2]) === JSON.stringify(s.quadros[1])"), 'copiar do quadro anterior')
    pg6.click('#pxGrade div[data-i="1"]'); pg6.wait_for_timeout(200)
    pg6.evaluate("window.__qs = {}"); pg6.evaluate("FAB.ui.vai('testar')"); pg6.wait_for_timeout(400)
    pg6.keyboard.down('ArrowRight'); pg6.wait_for_timeout(1500); pg6.keyboard.up('ArrowRight')
    ok(sorted(pg6.evaluate("Object.keys(window.__qs)")) == ['0', '1', '2'], 'no jogo o herói passa pelos 3 quadros (o 2 pintado diferente do 1 aparece)')
    ok(pg6.evaluate("var id = FAB.jogo().skins.heroi, a = FAB.sprCanvas(id, 0).getContext('2d').getImageData(0, 0, 1, 1).data, b = FAB.sprCanvas(id, 1).getContext('2d').getImageData(0, 0, 1, 1).data; a.join() !== b.join() && b[2] === 255"), 'o canvas do quadro 2 que o jogo usa tem a pintura do quadro 2')
    # misturar cor vira cor da paleta do desenho
    pg6.evaluate("FAB.ui.vai('pixel')"); pg6.wait_for_timeout(300); fecha_medalhas(pg6)
    pg6.click('#pxMix'); pg6.wait_for_timeout(200)
    mix = pg6.evaluate("document.querySelector('[data-mix]').dataset.mix")
    pg6.click('[data-mix]'); pg6.wait_for_timeout(200); pg6.click('#pxGrade div[data-i="2"]'); pg6.wait_for_timeout(200)
    ok(pg6.evaluate("(m) => { var s = FAB.E.sprites[FAB.jogo().skins.heroi], ch = s.quadros[2][0][2]; return /[1-9]/.test(ch) && s.cores && s.cores[ch] === m && !!document.querySelector('.cor.mix[data-c=\"' + ch + '\"]'); }", mix), 'cor misturada entra na paleta do desenho e fica guardada nele')
    ok(pg6.evaluate("(m) => { var d = FAB.sprCanvas(FAB.jogo().skins.heroi, 2).getContext('2d').getImageData(2, 0, 1, 1).data; return '#' + [d[0], d[1], d[2]].map(v => ('0' + v.toString(16)).slice(-2)).join('') === m; }", mix), 'o jogo desenha a cor misturada')
    # Desenhar sem rolar para o lado; no celular as ferramentas aparecem sem rolar
    for (w, h) in [(1024, 768), (1280, 800), (390, 844)]:
        pg6.set_viewport_size({'width': w, 'height': h}); pg6.evaluate("FAB.ui.vai('painel'); FAB.ui.vai('pixel')"); pg6.wait_for_timeout(350); fecha_medalhas(pg6)
        ok(pg6.evaluate("var t = document.getElementById('t-pixel'), T = document.getElementById('tela'); t.scrollWidth <= t.clientWidth + 1 && T.scrollWidth <= T.clientWidth + 1 && document.documentElement.scrollWidth <= innerWidth + 1"), f'Desenhar sem rolagem horizontal em {w}x{h}')
        ok(pg6.evaluate("var r = document.getElementById('pxDesf').getBoundingClientRect(), n = document.getElementById('pxNome').getBoundingClientRect(); r.bottom <= innerHeight && r.right <= innerWidth && n.right <= innerWidth"), f'ferramentas visíveis sem rolar em {w}x{h}')
    pg6.set_viewport_size({'width': 1280, 'height': 800})
    # música da fase
    pg6.evaluate("FAB.ui.vai('testar')"); pg6.wait_for_timeout(400)
    ok(pg6.evaluate("FAB.motor.rodando() && FAB.musica.atual() === null"), 'fase sem música escolhida continua em silêncio (jogo antigo igual)')
    pg6.evaluate("FAB.ui.vai('fases')"); pg6.wait_for_timeout(400); fecha_medalhas(pg6)
    pg6.click('#fzMus'); pg6.wait_for_timeout(200); pg6.click('.op:has-text("Aventura")'); pg6.wait_for_timeout(200)
    ok(pg6.evaluate("FAB.jogo().fases[0].musica") == 'aventura', 'música escolhida entra na fase')
    pg6.evaluate("FAB.salva()"); pg6.reload(); pg6.wait_for_timeout(500)
    ok(pg6.evaluate("FAB.jogo().fases[0].musica") == 'aventura', 'música escolhida fica salva na fase')
    pg6.evaluate("FAB.ui.vai('testar')"); pg6.wait_for_timeout(400)
    ok(pg6.evaluate("FAB.musica.atual()") == 'aventura', 'no teste a música da fase toca (mudo no robô)')
    pg6.evaluate("FAB.ui.vai('painel')"); pg6.wait_for_timeout(300)
    ok(pg6.evaluate("FAB.musica.atual() === null"), 'saiu do teste: a música para')
    ok(not e6, 'sem erro de página (Ateliê/música): ' + '; '.join(e6))
    pg6.close()

    # 10. auditoria de uso independente (24/10): A1 toques em 360 px, A3 missão fora de ordem, A7 chip da ação
    ctx6 = b.new_context(viewport={'width': 360, 'height': 640}, has_touch=True, is_mobile=True)
    pg6 = ctx6.new_page(); pg6.add_init_script(MUDO); e6 = []; pg6.on('pageerror', lambda e: e6.append(str(e)))
    pg6.goto(URL); pg6.evaluate("localStorage.clear()"); pg6.reload(); pg6.wait_for_timeout(400)
    pg6.evaluate("FAB.E.prefs.toques='sim'; FAB.ui.layout(); FAB.ui.vai('testar')"); pg6.wait_for_timeout(600)
    DENTRO = "(s=>{const e=document.querySelector('#t-testar .toques '+s); if(!e||e.hidden) return false; const r=e.getBoundingClientRect(); return r.width>=44 && r.left>=0 && r.top>=0 && r.right<=innerWidth && r.bottom<=innerHeight;})"
    ok(pg6.evaluate(DENTRO + "('[data-k=pulo]')") and pg6.evaluate(DENTRO + "('[data-k=esq]')") and pg6.evaluate(DENTRO + "('[data-k=dir]')"), 'A1: em 360 px ◀ ▶ e PULAR cabem inteiros na tela')
    ok(pg6.evaluate("[...document.querySelectorAll('#t-testar .gp-teclas button')].every(b=>b.hidden)"), 'A1: sem regra de tecla, X/C/V não aparecem')
    ok(pg6.evaluate("!!document.querySelector('#t-testar .palco .balao-ctl.toque .bc-pula')"), 'A2: 1ª vez no Testar mostra o balão dos controles (toque: andar e pular)')
    pg6.evaluate("FAB.motor.termina(); FAB.ui.fecha(); FAB.jogo().regras.push(FAB.novaRegra({quando:{t:'tecla',tecla:'X'},faca:[{t:'pulo'}]})); FAB.ui.vai('regras'); FAB.ui.vai('testar')"); pg6.wait_for_timeout(600)
    ok(pg6.evaluate(DENTRO + "('[data-k=X]')") and pg6.evaluate(DENTRO + "('[data-k=pulo]')") and pg6.evaluate("document.querySelector('#t-testar [data-k=C]').hidden"), 'A1: regra da tecla X: só o X aparece, dentro da tela, junto do PULAR')
    # A3: cumpriu a missão 8 (tecla) antes da 1: o guia segue para a 9, não volta para a 1
    pg6.evaluate("FAB.motor.termina(); FAB.ui.fecha(); FAB.E.missoes={tecla:Date.now()}; FAB.ui.vai('testar'); FAB.motor.termina(); FAB.ui.fecha()"); pg6.wait_for_timeout(400)
    i8 = pg6.evaluate("FAB.MISSOES.findIndex(m=>m.id==='tecla')")
    ok(pg6.evaluate("FAB.MISSOES.indexOf(FAB.proximaMissao())") == i8 + 1, 'A3: missão fora de ordem: a próxima é a pendente DEPOIS dela')
    ok(pg6.evaluate("document.getElementById('chipMissao').textContent.indexOf(FAB.proximaMissao().frase)>=0"), 'A3: o chip do topo mostra essa missão')
    ok(pg6.evaluate("var p=FAB.ui.proximo(); p.missao===FAB.proximaMissao() && p.tela===FAB.guia.telaDa(FAB.proximaMissao()) && p.tela!=='pixel'"), 'A3: no Testar o Próximo passo segue a missão pendente (não volta ao Desenhar)')
    pg6.evaluate("FAB.ui.vai('jogar')"); pg6.wait_for_timeout(300)
    ok('outro jogo' in pg6.inner_text('#trProx'), 'A3: no Mostrar o Próximo passo fecha o ciclo (Guardar e fazer outro jogo)')
    pg6.click('#trProx'); pg6.wait_for_timeout(250)
    ok('outro jogo' in pg6.inner_text('#mbox h2') and pg6.query_selector('#gdOnde') is not None, 'A3/A9: abre Guardar, dizendo onde fica guardado')
    n_g = pg6.evaluate("FAB.guardados().length"); pg6.click('#gdOk'); pg6.wait_for_timeout(500)
    ok(pg6.evaluate("FAB.guardados().length") == n_g + 1 and pg6.evaluate("FAB.ui.atual()") == 'painel' and pg6.evaluate("document.querySelectorAll('#mbox .op').length") >= 2, 'A3: guardou e já oferece o jogo novo')
    pg6.evaluate("FAB.ui.fecha()")
    # A7: clicar no chip "+1 pontos" abre direto os números; "trocar a ação" fica como opção de baixo
    pg6.evaluate("FAB.ui.vai('regras')"); pg6.wait_for_timeout(300)
    pg6.click('#t-regras .regra[data-r="0"] .bloco.f[data-k="0"]'); pg6.wait_for_timeout(250)
    ok(pg6.evaluate("!!document.querySelector('#mbox .op.secundaria') && [...document.querySelectorAll('#mbox .op')].some(o=>o.querySelector('span').textContent.trim()==='+5') && ![...document.querySelectorAll('#mbox .op')].some(o=>/a peça some/.test(o.textContent))"), 'A7: chip de pontos abre o seletor de número, não a lista de ações')
    pg6.click('#mbox .op:has-text("+5")'); pg6.wait_for_timeout(250)
    ok(pg6.evaluate("FAB.jogo().regras[0].faca[0].t==='ponto' && FAB.jogo().regras[0].faca[0].n===5"), 'A7: escolher +5 muda só o número')
    pg6.click('#t-regras .regra[data-r="0"] .bloco.f[data-k="2"]'); pg6.wait_for_timeout(250)
    ok(pg6.evaluate("[...document.querySelectorAll('#mbox .op')].some(o=>/vitória/.test(o.textContent))"), 'B8: som "vitória" com acento na lista')
    pg6.click('#mbox .op.secundaria'); pg6.wait_for_timeout(300)
    ok(pg6.evaluate("[...document.querySelectorAll('#mbox .op')].some(o=>/a peça some/.test(o.textContent))"), 'A7: "trocar a ação" abre a lista inteira de ações')
    pg6.evaluate("FAB.ui.fecha()"); pg6.wait_for_timeout(100)
    # B10: poucas regras primeiro, todas com um botão; nenhuma deixa de valer
    vis = pg6.evaluate("document.querySelectorAll('#t-regras .regra').length"); tot = pg6.evaluate("FAB.jogo().regras.length")
    ok(vis < tot and pg6.query_selector('#rgTodas') is not None, f'B10: Regras mostra {vis} de {tot} e o botão "Ver todas"')
    pg6.click('#rgTodas'); pg6.wait_for_timeout(200)
    ok(pg6.evaluate("document.querySelectorAll('#t-regras .regra').length") == tot, 'B10: "Ver todas as regras" mostra a lista inteira')
    pg6.click('#rgTodas'); pg6.wait_for_timeout(100)
    ok(not e6, 'sem erro de página (auditoria): ' + '; '.join(e6))
    ctx6.close()

    ok(not erros, 'sem erro de página: ' + '; '.join(erros))
    b.close()
print('FUNÇÕES: ' + ('OK' if not falhas else 'FALHARAM ' + str(len(falhas))))
sys.exit(1 if falhas else 0)
