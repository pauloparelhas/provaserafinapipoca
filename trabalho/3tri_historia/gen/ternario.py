# J.tr?X:Y  ->  (X)  quando X e Y sao literais string ou N.pt/N.nome  (HIS3 e PT puro: vale sempre o ramo portugues)
import re, glob, os, sys
F = sys.argv[1]
S = r"'(?:[^'\\]|\\.)*'"
TERM = r"(?:" + S + r"|[A-Za-z_.]+)"
for f in glob.glob(os.path.join(F, 'HIS3_jogo_*.js')):
    s = open(f, encoding='utf-8').read()
    s2, n = re.subn(r"J\.tr\s*\?\s*(" + S + r")\s*:\s*" + S, r"(\1)", s)
    s2, n2 = re.subn(r"J\.tr\s*\?\s*(N\.pt|N\.dpt)\s*:\s*N\.\w+", r"\1", s2)
    if n or n2:
        open(f, 'w', encoding='utf-8').write(s2); print(os.path.basename(f), n, n2)
