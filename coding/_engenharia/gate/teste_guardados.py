"""Portão de "Guardar e começar do zero" (MUDO). Liga o servidor local da Fábrica numa porta
livre e numa pasta temporária, e confere: guardar grava o arquivo na pasta; começar do zero volta
à primeira visita mantendo a voz; "Voltar para antes do zero" desfaz; abrir um guardado traz o
trabalho de volta; o servidor recusa nome com pasta e pedido de outra origem.
Uso: python teste_guardados.py"""
import json, pathlib, socket, subprocess, sys, tempfile, time, urllib.request
from playwright.sync_api import sync_playwright
G = pathlib.Path(__file__).resolve().parent
src = open(G / 'teste_funcoes.py', encoding='utf-8').read()
i = src.index('MUDO = ('); exec(src[i:src.index('\n', src.index('HTMLMediaElement.prototype.load', i)) + 1])
s = socket.socket(); s.bind(('127.0.0.1', 0)); PORTA = s.getsockname()[1]; s.close()
PASTA = pathlib.Path(tempfile.mkdtemp(prefix='fab_guardados_'))
srv = subprocess.Popen([sys.executable, str(G.parent / 'servidor_local.py'), '--porta', str(PORTA), '--pasta', str(PASTA)])
URL = 'http://127.0.0.1:%d/coding/index.html' % PORTA
falhas = []
def ok(c, nome):
    print(('  ok   ' if c else '  FALHA ') + nome)
    if not c: falhas.append(nome)
try:
    for _ in range(50):
        try: urllib.request.urlopen(URL, timeout=1); break
        except Exception: time.sleep(0.2)
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(); pg.add_init_script(MUDO)
        err = []; pg.on('pageerror', lambda e: err.append(str(e)))
        pg.goto(URL); pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(500)
        ok(pg.evaluate("FAB.copias.pasta()") is True, 'servidor local responde (pasta disponível)')
        pg.evaluate("FAB.jogo().nome='Jogo da Mariana'; FAB.E.prefs.voz='antonio'; FAB.salva()")
        arq = pg.evaluate("FAB.copias.guarda('Mariana 25/10')")
        ok(bool(arq) and (PASTA / arq).is_file(), 'guardar grava o arquivo na pasta (%s)' % arq)
        ok('Jogo da Mariana' in (PASTA / arq).read_text(encoding='utf-8'), 'o arquivo tem o jogo dela')
        pg.evaluate("FAB.ui.vai('jeito')"); pg.wait_for_timeout(300)
        ok(all(pg.evaluate("!!document.getElementById('%s')" % k) for k in ['jtZeraG', 'jtZera', 'jtAbreG']), 'botões na Área do papai')
        pg.click('#jtZera'); pg.wait_for_timeout(300)
        with pg.expect_navigation(): pg.click('#zrSim')
        pg.wait_for_timeout(500)
        ok(pg.evaluate("FAB.jogo().nome") != 'Jogo da Mariana' and pg.evaluate("FAB.E.jogos.length") == 1, 'começar do zero volta à primeira visita')
        ok(pg.evaluate("FAB.E.prefs.voz") == 'antonio', 'a voz escolhida fica')
        pg.evaluate("FAB.ui.vai('jeito')"); pg.wait_for_timeout(300)
        ok(pg.evaluate("!!document.getElementById('jtDesZera')"), 'aparece Voltar para antes do zero')
        with pg.expect_navigation(): pg.click('#jtDesZera')
        pg.wait_for_timeout(500)
        ok(pg.evaluate("FAB.jogo().nome") == 'Jogo da Mariana', 'Voltar para antes do zero traz o trabalho')
        with pg.expect_navigation(): pg.evaluate("FAB.copias.zera()")
        pg.wait_for_timeout(400)
        L = pg.evaluate("FAB.copias.lista()")
        ok(len(L) == 1 and L[0]['nome'] == 'Mariana 2510', 'lista mostra o guardado com o nome')
        with pg.expect_navigation(): pg.evaluate("FAB.copias.abre(%s)" % json.dumps(L[0]['arquivo']))
        pg.wait_for_timeout(500)
        ok(pg.evaluate("FAB.jogo().nome") == 'Jogo da Mariana', 'abrir um guardado traz o jogo dela')
        r1 = pg.evaluate("fetch('/fabrica-salvos/abre?arquivo=..%2F..%2Findex.html').then(r=>r.status)")
        ok(r1 == 404, 'servidor recusa caminho com pasta')
        r2 = pg.evaluate("fetch('/fabrica-salvos/guarda?nome=x',{method:'POST',body:'{\"oi\":1}'}).then(r=>r.status)")
        ok(r2 == 400, 'servidor recusa arquivo que não é da Fábrica')
        ok(not err, 'sem erro de página %s' % err)
        b.close()
    try:
        rq = urllib.request.Request('http://127.0.0.1:%d/fabrica-salvos/lista' % PORTA, headers={'Origin': 'https://exemplo.com'})
        urllib.request.urlopen(rq, timeout=2); ok(False, 'servidor recusa outra origem')
    except urllib.error.HTTPError as e:
        ok(e.code == 403, 'servidor recusa outra origem')
finally:
    srv.terminate()
    for f in PASTA.glob('*'): f.unlink()
    PASTA.rmdir()
print('GUARDADOS: ' + ('OK' if not falhas else 'REPROVADO %s' % falhas))
sys.exit(1 if falhas else 0)
