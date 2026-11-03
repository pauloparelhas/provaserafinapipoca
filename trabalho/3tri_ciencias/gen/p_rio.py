# Rio do slide S8: ceu com a represa em vez do ceu generico; margem do rio sem coqueiro e guarda-sol herdados.
import re
p = 'trabalho/3tri_ciencias/gen/t_cena.py'
s = open(p, encoding='utf-8').read()
novo = '''T['cena'] += [
  ("if(M.modo==='nado'&&M.superficie>40) ceuDoMar(c,M,t);", "if(M.modo==='nado'&&M.superficie>40){ if(A.ceuDoRio) A.ceuDoRio(c,M.superficie-J.camY,J.cam,t); else ceuDoMar(c,M,t); }"),
  ("  var px=120; c.strokeStyle='#92400e'; c.lineWidth=12;", "  if(0){ var px=120; c.strokeStyle='#92400e'; c.lineWidth=12;"),
  ("  /* placa: o mar está ali */", "  }\\n  /* placa: o rio esta ali */"),
]
'''
assert "ceuDoRio" not in s
i = s.index("T['ui'] = [")
s = s[:i] + novo + s[i:]
open(p, 'w', encoding='utf-8').write(s)
print('ok')
