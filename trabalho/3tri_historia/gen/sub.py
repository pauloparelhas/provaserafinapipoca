# substituicoes exatas num arquivo: python sub.py arquivo tabela.py  (tabela define R=[(a,b),...]); imprime o que nao achou
import sys
f=sys.argv[1]; ns={}; exec(open(sys.argv[2],encoding='utf-8').read(),ns)
s=open(f,encoding='utf-8').read(); falta=[]
for a,b in ns['R']:
    if a not in s: falta.append(a[:90]); continue
    s=s.replace(a,b)
open(f,'w',encoding='utf-8').write(s)
print(f.split('/')[-1],'NAO ACHEI:',falta if falta else 'nada')
