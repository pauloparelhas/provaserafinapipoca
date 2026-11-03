# fork_jogo.py — deriva ferramentas/CIE3_jogo* do motor ING3_jogo* (com as melhorias de HIS3) por
# substituições EXATAS: imprime o que não achou. Rodar: python fork_jogo.py
# NUNCA toca em CIE3_jogo_arteA.js / arteB.js / arteC.js (arte em paralelo).
# Tabelas: t_motor.py (motor, motor2, fases, perigos, marceu, aparelhos, chefinho, ambiente, arte, html),
# t_poderes.py, t_cena.py (cena, ui, quiz, penalti), t_duelos.py (chefao, corrida, carrinhos, estadio).
import os, re, shutil, subprocess, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
F = os.path.normpath(os.path.join(AQUI, '..', '..', '..', 'ferramentas'))
sys.path.insert(0, AQUI)
import t_motor, t_poderes, t_cena, t_duelos
ARQS = ['ambiente', 'aparelhos', 'arte', 'arte2', 'arte3', 'arte4', 'arte5', 'carrinhos', 'cena', 'chefao', 'chefinho', 'corrida', 'estadio', 'fases', 'marceu', 'motor', 'motor2', 'partituras', 'penalti', 'perigos', 'poderes', 'quiz', 'ui']
TAB = {}
for mod in (t_motor, t_poderes, t_cena, t_duelos): TAB.update(mod.T)
BLOCOS = {}
for mod in (t_motor, t_poderes, t_cena, t_duelos): BLOCOS.update(getattr(mod, 'BLOCOS', {}))
faltou = 0
def aplica(nome, s):
    global faltou
    for ini, fim, novo in BLOCOS.get(nome, []):
        i = s.find(ini); j = s.find(fim, i + len(ini)) if i >= 0 else -1
        if i < 0 or j < 0: print('NAO ACHEI bloco', nome, repr(ini[:70])); faltou += 1; continue
        s = s[:i] + novo + s[j:]
    for a, b in TAB.get(nome, []):
        if a not in s: print('NAO ACHEI', nome, repr(a[:90])); faltou += 1; continue
        s = s.replace(a, b)
    return s
def grava(destino, s): open(os.path.join(F, destino), 'w', encoding='utf-8', newline='\n').write(s)
for n in ARQS:
    s = open(os.path.join(F, 'ING3_jogo_%s.js' % n), encoding='utf-8', newline='').read().replace('\r\n', '\n')
    s = aplica(n, s)
    s = s.replace('ING3', 'CIE3').replace('ing3', 'cie3')
    grava('CIE3_jogo_%s.js' % n, s)
h = open(os.path.join(F, 'ING3_jogo.html'), encoding='utf-8', newline='').read().replace('\r\n', '\n')
h = aplica('html', h).replace('ING3', 'CIE3').replace('ing3', 'cie3').replace('?v=20261018d', '?v=20261102a')
grava('CIE3_jogo.html', h)
for n in ('CIE3_jogo_base.js', 'CIE3_jogo_cie.js', 'CIE3_jogo_pele.js'): shutil.copyfile(os.path.join(AQUI, 'novos', n), os.path.join(F, n))
subprocess.check_call([sys.executable, os.path.join(AQUI, 'gen_mapas_cie3.py')])
print('FORK:', 'tudo achado' if not faltou else 'FALTARAM %d' % faltou)
sys.exit(1 if faltou else 0)
