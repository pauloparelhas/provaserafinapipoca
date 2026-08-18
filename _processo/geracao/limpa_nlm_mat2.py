# -*- coding: utf-8 -*-
"""limpa_nlm_mat2.py — tira o LaTeX do quiz/flashcards do NotebookLM e aplica
as correcoes da AUDITORIA de conteudo.

Por que existe: o NLM escreve numeros em modo matematico ($5$, $3+4+6=13$).
Como o produto nao carrega KaTeX, isso chega na tela da crianca como "$5$".
Uma passada de regex resolve, e e idempotente.

Auditoria (17/08): as 10 perguntas e os 57 cards foram lidos um a um. Um unico
reparo: na Q4 um distrator contava o circle como figura de "0 lados", o que o
roteiro (BLOCO 3) proibe — em conta, o circle so aparece contando VERTICES.
O distrator foi trocado por um grupo sem circle.

Uso: python _processo/geracao/limpa_nlm_mat2.py
"""
import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
MEDIA = Path(__file__).resolve().parents[2] / "ferramentas" / "media"

MATH = re.compile(r"\$([^$]{1,40})\$")


def limpa(s):
    if not isinstance(s, str):
        return s
    return MATH.sub(lambda m: m.group(1), s).replace("  ", " ").strip()


def anda(o):
    if isinstance(o, dict):
        return {k: anda(v) for k, v in o.items()}
    if isinstance(o, list):
        return [anda(v) for v in o]
    return limpa(o)


# --- correcoes de conteudo (auditoria) ------------------------------------
REPAROS = [
    ("octagon (octógono) + circle (círculo) + triangle (triângulo)",
     "octagon (octógono) + triangle (triângulo) + square (quadrado)"),
    ("Essa combinação resultaria em 11 lados (8 + 0 + 3), o que não atinge o total de 13.",
     "Essa combinação daria 15 lados (8 + 3 + 4), passando do total de 13."),
]


def main():
    for nome in ("quiz_mat2_nlm.json", "flashcards_mat2_nlm.json"):
        p = MEDIA / nome
        if not p.exists():
            print(f"!! {nome} nao existe"); continue
        d = anda(json.loads(p.read_text(encoding="utf-8")))
        txt = json.dumps(d, ensure_ascii=False, indent=1)
        for de, para in REPAROS:
            if de in txt:
                txt = txt.replace(de, para)
                print(f"   reparo aplicado em {nome}: {de[:45]}…")
        p.write_text(txt, encoding="utf-8")
        n = len(d.get("questions") or d.get("cards") or [])
        print(f"[ok] {nome}: {n} itens, sem LaTeX")


if __name__ == "__main__":
    main()
