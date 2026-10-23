"""Portão da nuvem da família (MUDO; precisa de internet). Simula dois computadores:
o primeiro liga a nuvem, muda o jogo e manda; o segundo cola a mesma chave e tem de receber
o jogo, com o trabalho dele guardado como cópia. Depois apaga a chave de teste do servidor.
Uso: python teste_nuvem.py"""
import sys, subprocess, hashlib
exec(open(__import__('pathlib').Path(__file__).with_name('teste_funcoes.py'), encoding='utf-8').read().split('falhas = []')[0])
SEMWD = "Object.defineProperty(navigator,'webdriver',{get:()=>false});"   # a nuvem não roda em teste; aqui fingimos que não é teste (o MUDO continua)
falhas = []
with sync_playwright() as p:
    b = p.chromium.launch()
    pa = b.new_context().new_page(); pa.add_init_script(SEMWD + MUDO)
    err = []; pa.on('pageerror', lambda e: err.append(str(e)))
    pa.goto(URL); pa.evaluate("localStorage.clear()"); pa.reload(); pa.wait_for_timeout(400)
    chave = 'testegate-' + pa.evaluate("FAB.nuvem.gera()")
    pa.evaluate(f"FAB.nuvem.liga('{chave}')"); pa.wait_for_timeout(2500)
    pa.evaluate("FAB.jogo().nome='Jogo da nuvem'; FAB.salva()"); pa.wait_for_timeout(400)
    ok1 = pa.evaluate("FAB.nuvem.envia()")
    pb = b.new_context().new_page(); pb.add_init_script(SEMWD + MUDO); pb.on('pageerror', lambda e: err.append(str(e)))
    pb.goto(URL); pb.evaluate("localStorage.clear()"); pb.reload(); pb.wait_for_timeout(400)
    pb.evaluate(f"FAB.nuvem.liga('{chave}')"); pb.wait_for_timeout(4000)
    nome = pb.evaluate("FAB.jogo().nome"); copia = pb.evaluate("!!localStorage.getItem('fab_mariana_v1_antes_da_nuvem')")
    print('  mandou:', ok1, '| outro computador recebeu:', nome, '| cópia do daqui:', copia, '| erros:', err)
    if not (ok1 and nome == 'Jogo da nuvem' and copia and not err): falhas.append('nuvem')
    b.close()
h = hashlib.sha256(('fabrica|' + chave).encode()).hexdigest()
sql = "DELETE FROM estados WHERE dono = '%s'" % h
subprocess.run(['wrangler.cmd', 'd1', 'execute', 'fabrica-mariana', '--remote', '--command', sql], capture_output=True, cwd=str(RAIZ / '_nuvem'))
print('NUVEM: ' + ('OK' if not falhas else 'REPROVADA'))
sys.exit(1 if falhas else 0)
