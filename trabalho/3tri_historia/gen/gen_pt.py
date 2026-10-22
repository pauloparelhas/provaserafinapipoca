# Gera ferramentas/HIS3_jogo_pt.js: dicionário EN->PT extraído dos PARES que o jogo de Inglês já
# tinha (txt/txtPt, en/pt, toast(en,dur,pt), J.tr?pt:en, ['en','pt'], PLACA_PT) + regras manuais.
# O jogo de História é PT puro: o canvas (fillText/strokeText/measureText) e a voz (say) traduzem
# pelo dicionário em tempo de execução. Rodar: python gen_pt.py
import re, os, glob, json
F = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'ferramentas')
S = r"'((?:[^'\\]|\\.)*)'"
D = {}
def add(en, pt):
    en = en.replace("\\'", "'"); pt = pt.replace("\\'", "'")
    if not en or not pt or en == pt: return
    if re.search(r'[A-Za-z]', en) is None: return
    D.setdefault(en, pt)
for f in sorted(glob.glob(os.path.join(F, 'HIS3_jogo_*.js'))):
    s = open(f, encoding='utf-8').read()
    for m in re.finditer(r'(\w+):' + S + r'\s*,\s*\1(?:Pt|_pt):' + S, s): add(m.group(2), m.group(3))
    for m in re.finditer(r'\ben:' + S + r'\s*,\s*pt:' + S, s): add(m.group(1), m.group(2))
    for m in re.finditer(r'toast\(' + S + r'\s*,\s*[\w.]+\s*,\s*' + S + r'\)', s): add(m.group(1), m.group(2))
    for m in re.finditer(r'J\.tr\s*\?\s*' + S + r'\s*:\s*' + S, s): add(m.group(2), m.group(1))
    for m in re.finditer(r'\[\s*' + S + r'\s*,\s*' + S + r'\s*\]', s):
        a, b = m.group(1), m.group(2)
        if re.search(r'[ãáàâéêíóôõúç]', b, re.I) or (a[:1].isupper() and b[:1].isupper() and a != b and len(a) > 3): add(a, b)
    for m in re.finditer(r"PLACA_PT=\{([^}]*)\}", s):
        for k, v in re.findall(S + r'\s*:\s*' + S, m.group(1)): add(k, v)
MAN = json.load(open(os.path.join(os.path.dirname(__file__), 'pt_manual.json'), encoding='utf-8'))
D.update(MAN.get('exato', {}))
out = ('/* HIS3_jogo_pt.js — GERADO por trabalho/3tri_historia/gen/gen_pt.py. Não editar à mão.\n'
       '   O jogo de História é PT puro: o canvas e a voz traduzem os textos herdados do jogo de Inglês. */\n'
       '(function(){\n"use strict";\nvar D=' + json.dumps(D, ensure_ascii=False, indent=0) + ';\n'
       'var RX=' + json.dumps(MAN.get('regex', []), ensure_ascii=False) + '.map(function(r){ return [new RegExp(r[0]), r[1]]; });\n'
       'function tr(s){ if(typeof s!=="string"||!s) return s; var k=s.trim(); if(D[k]!==undefined) return s.replace(k,D[k]); for(var i=0;i<RX.length;i++){ if(RX[i][0].test(s)) return s.replace(RX[i][0],RX[i][1]); } return s; }\n'
       'window.HIS3_TR=tr; window.HIS3_DIC=D;\n'
       'var P=CanvasRenderingContext2D.prototype;\n'
       '["fillText","strokeText"].forEach(function(n){ var o=P[n]; P[n]=function(t,x,y,m){ arguments[0]=tr(t); return o.apply(this,arguments); }; });\n'
       'var om=P.measureText; P.measureText=function(t){ return om.call(this,tr(t)); };\n'
       'function liga(){ if(window.say&&!window.say.__pt){ var os=window.say; window.say=function(t){ arguments[0]=tr(t); return os.apply(this,arguments); }; window.say.__pt=1; } }\n'
       'liga(); document.addEventListener("DOMContentLoaded",liga);\n'
       '})();\n')
open(os.path.join(F, 'HIS3_jogo_pt.js'), 'w', encoding='utf-8').write(out)
print('pares', len(D))
