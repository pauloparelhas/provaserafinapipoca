"""Portão do idioma inglês (MUDO). Passeia por todas as telas e janelas da Fábrica.
  python teste_ingles.py coleta  -> em português: grava gate/textos_pt.json com todo texto visível
                                     (material para completar banco/ingles_dic.js)
  python teste_ingles.py         -> em inglês: falha se algum texto da Fábrica ficou em português
                                     (pergunta da prova e o que a criança escreveu não contam)"""
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
COLETA = len(sys.argv) > 1 and sys.argv[1] == 'coleta'
JUNTA = """() => { const S = new Set(); const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT); let n;
  while ((n = w.nextNode())) { if (n.nodeType === 3) { const t = n.nodeValue.trim(); if (t && /[a-zà-ú]/i.test(t) && !(n.parentNode.closest && n.parentNode.closest('script,style,[data-sem-traducao]'))) S.add(t); }
    else ['title', 'placeholder', 'aria-label'].forEach(a => { const v = n.getAttribute(a); if (v && /[a-zà-ú]/i.test(v)) S.add(v.trim()); }); }
  if (FAB.motor && FAB.motor.textos) FAB.motor.textos().forEach(t => S.add(t));
  return [...S]; }"""
BANCOS = """(() => { const L = [], F = FAB, poe = s => { if (s && typeof s === 'string') L.push(s.trim()); };
  F.motor.textos().forEach(poe);
  F.MISSOES.forEach(m => poe(m.frase)); F.NIVEIS.forEach(n => poe(n.nome));
  Object.values(F.CONCEITOS).forEach(c => { poe(c.nome); poe(c.frase); poe(c.exemplo); });
  [F.QUANDO, F.SE, F.FACA].forEach(D => Object.values(D).forEach(b => { poe(b.nome); poe(b.fala); poe(b.sufixo); }));
  Object.values(F.TIPOS).forEach(t => poe(t.nome)); Object.values(F.CENARIOS).forEach(c => poe(c.nome));
  Object.keys(F.SPRITES).forEach(k => { if (!/^meu_/.test(k)) poe(F.SPRITES[k].nome); });
  Object.values(F.MODELOS).forEach(m => { poe(m.nome); poe(m.descricao); }); F.GRUPOS_PECAS.forEach(g => poe(g.nome));
  Object.values(F.NOME_OBJ).forEach(poe); (F.OPCOES.falas || []).forEach(poe); (F.OPCOES.sons || []).forEach(poe);
  ['Oi! Eu sou a Thalita.', 'Oi! Eu sou o Antonio.', 'Missão cumprida! Você aprendeu: Pixel.', '12 pontos.', 'Um ponto.'].forEach(poe);
  return [...new Set(L)].filter(s => !Object.prototype.hasOwnProperty.call(F.EN, s) && F.trTexto(s) === s).map(s => '[banco/motor] ' + s); })()"""
TELAS = ['painel', 'ideia', 'pixel', 'fases', 'regras', 'testar', 'diario', 'robo', 'missoes', 'jogar', 'jeito']

def passeio(pg, junta):
    def fecha():   # fecha a janela (e as medalhas que vêm na fila, 200 ms depois)
        vazio = 0
        for _ in range(20):
            if pg.evaluate("document.getElementById('modal').classList.contains('on')"): junta(); pg.evaluate("FAB.ui._preso=false; FAB.ui.fecha()"); vazio = 0
            else:
                vazio += 1
                if vazio >= 2: break
            pg.wait_for_timeout(250)
    for t in TELAS:
        pg.evaluate(f"FAB.ui.vai('{t}')"); pg.wait_for_timeout(350); junta(); fecha()
        if t == 'painel':
            pg.click('#pnNovo'); pg.wait_for_timeout(200); junta(); fecha()
            # v3 navegação: Guardar este jogo, jogos guardados, cartão do robô, selo (salvando / não salvou)
            pg.click('#pnGuardar'); pg.wait_for_timeout(200); junta(); pg.click('#gdOk'); pg.wait_for_timeout(300); junta(); fecha()
            pg.evaluate("FAB.E.pedidos.push({id:'pIng',tipo:'inimigo',nome:'',como:'roxo',faz:'voa',estado:'pronto'}); FAB.ui.vai('painel')"); pg.wait_for_timeout(300); junta(); fecha()
            el = pg.query_selector('[data-abreg]')
            if el: el.click(); pg.wait_for_timeout(200); junta(); fecha()
            pg.evaluate("FAB.estadoSalvo='erro'; FAB.ui.selo()"); junta(); pg.evaluate("FAB.estadoSalvo='salvando'; FAB.ui.selo()"); junta()
            pg.evaluate("FAB.ui.vai('fases'); FAB.ui.vai('painel')"); pg.wait_for_timeout(300); junta()
        if t == 'fases':
            pg.click('#fzCen'); pg.wait_for_timeout(200); junta(); fecha()
            for b in pg.query_selector_all('.peca')[:40]: b.click(); junta()
        if t == 'regras':
            for sel in ['.bloco.q', '.bloco.s', '.bloco.f']:
                el = pg.query_selector(sel)
                if el: el.click(); pg.wait_for_timeout(200); junta(); fecha()
            for sel in ['.bloco.q', '.bloco.f']:   # segunda grade: a escolha do parâmetro (peça, número, som, balão)
                for i in (0, 11, 12):
                    el = pg.query_selector(sel)
                    if not el: continue
                    el.click(); pg.wait_for_timeout(150)
                    op = pg.query_selector(f'#mbox .op[data-i="{i}"]')
                    if op: op.click(); pg.wait_for_timeout(150); junta()
                    fecha()
            el = pg.query_selector('[data-a="apaga"]')
            if el: el.click(); pg.wait_for_timeout(150); junta(); fecha()
            for a in pg.query_selector_all('.aba'):
                try: a.click(); pg.wait_for_timeout(200); junta()
                except Exception: pass
        if t == 'testar':
            pg.wait_for_timeout(1200); junta(); pg.evaluate("FAB.motor.termina()"); pg.wait_for_timeout(300); junta()
            c = pg.query_selector('.cara')
            if c: c.click(); pg.wait_for_timeout(200); junta(); fecha()
            c = pg.query_selector('#tsMudarC .esc')
            if c: c.click(); pg.wait_for_timeout(200); junta(); fecha()
            c = pg.query_selector('#tsDesejos [data-d]')   # "Queria que tivesse…"
            if c: c.click(); pg.wait_for_timeout(200); junta(); fecha()
            pg.click('#tsLupa'); pg.wait_for_timeout(200); junta()
        if t == 'diario':
            pg.click('#dgFoto'); pg.wait_for_timeout(300); junta(); fecha()
            el = pg.query_selector('[data-volta]')
            if el: el.click(); pg.wait_for_timeout(150); junta(); fecha()
        if t == 'missoes':
            pg.evaluate("document.querySelector('.ms-todas').open = true"); pg.wait_for_timeout(150); junta()
            el = pg.query_selector('button[data-m]')
            if el: el.click(); pg.wait_for_timeout(150); junta(); fecha()
        if t == 'robo':
            pg.click('#rbTipo .esc'); pg.wait_for_timeout(100); junta(); fecha()
        if t == 'painel':
            el = pg.query_selector('#pnMic')
            if el: el.click(); pg.wait_for_timeout(150); junta(); fecha()
        if t == 'jogar':
            pg.click('#jgPlay'); pg.wait_for_timeout(500); junta(); pg.evaluate("FAB.motor.para()")
    pg.evaluate("FAB.ui.medalha(FAB.MISSOES[0])"); pg.wait_for_timeout(200); junta(); fecha()
    pg.evaluate("FAB.ui.toast('Foto tirada!')"); junta()
    # janela da Placa ? (cabeçalho, botões, "A certa é:"); a pergunta em si fica na língua da prova
    pg.evaluate("FAB.abrePergunta(FAB.perguntasDaProva()[0], function () {})"); pg.wait_for_timeout(200); junta()
    pg.click('#mbox .alt'); pg.wait_for_timeout(200); junta(); fecha()

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1280, 'height': 800}); pg.add_init_script(MUDO)
    erros = []; pg.on('pageerror', lambda e: erros.append(str(e)))
    pg.goto(URL); pg.evaluate("localStorage.clear()")
    if not COLETA:
        pg.evaluate("(() => { const E = JSON.parse(localStorage.getItem('fab_mariana_v1') || 'null'); })()")
        pg.reload(); pg.wait_for_timeout(300)
        pg.evaluate("FAB.E.prefs.lingua='en'; localStorage.setItem('fab_mariana_v1', JSON.stringify(FAB.E))")
    pg.reload(); pg.wait_for_timeout(500)
    vistos = set()
    def junta(): vistos.update(pg.evaluate(JUNTA))
    passeio(pg, junta)
    if COLETA:
        out = RAIZ / '_engenharia' / 'gate' / 'textos_pt.json'
        out.write_text(json.dumps(sorted(vistos), ensure_ascii=False, indent=1), encoding='utf-8')
        print('COLETA:', len(vistos), 'textos ->', out, '| erros:', erros[:3])
    else:
        prova = set(pg.evaluate("(() => { const S = []; FAB.perguntasDaProva().forEach(q => { S.push(q.p, q.ex, q.dica, ...q.o); }); FAB.E.jogos.forEach(j => S.push(j.nome)); return S.filter(Boolean).map(s => s.trim()); })()"))
        resto = sorted(t for t in pg.evaluate("FAB.naoTraduzidos") if t not in prova and not any(t in q for q in prova))
        resto = [t for t in resto if t not in ('Ava', 'Brian', 'Thalita', 'Antonio', 'English', 'Português', 'XP')]
        # o que não passa pela tela neste passeio: textos do motor (canvas, registro da lupa), toasts e os bancos inteiros
        resto += pg.evaluate(BANCOS)
        print('INGLÊS', 'OK' if not resto and not erros else 'REPROVADO', '| ficaram em português:', len(resto), '| erros:', erros[:3])
        for t in resto[:80]: print('   ', t)
        sys.exit(1 if resto or erros else 0)
    b.close()
