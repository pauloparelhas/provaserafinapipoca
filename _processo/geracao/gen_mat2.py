# -*- coding: utf-8 -*-
"""gen_mat2.py — deriva os produtos de Matematica (MAT2_*) dos de Geografia (GEO2_*).

O padrao que funcionou na Geografia (memoria project_geografia_2tri): copiar os HTML
da materia pronta, motor IDENTICO, e trocar so a casca + o bloco de dados, com um
script de substituicoes EXATAS que imprime o que nao encontrou. Nunca reescrever o motor.

Diferenca desta materia: a prova de Matematica e EM INGLES. Entao volta a engenharia
do CIE2 (Ciencias): o texto de CONTEUDO e ingles e a traducao PT vive no `.tr`,
ligada pelo botao da bandeira. O motor GEO2 ja tem toda essa maquinaria — o GEO
apenas a usava para "dica" (materia em portugues). Aqui:
  - a bandeira volta a ser bandeira (era lampada de dica);
  - SERA_CFG.lang volta para en-US (TTS le o conteudo em ingles);
  - trKey/somKey passam a mat2_*;
  - o acento da materia vira roxo (senao o sera_theme.js pinta de azul de Ciencias).
A casca de botoes continua em PORTUGUES: quem le e uma crianca brasileira de 7 anos;
o que a prova cobra e o conteudo, e e o conteudo que esta em ingles.

ATENCAO (17/08/2026): os HTML do GEO2 foram APAGADOS do repositorio quando a
Geografia saiu do ar. Este script fica como REGISTRO de como a derivacao foi
feita — para rodar de novo, ou se recupera a base do git
(`git show 7cd0285:ferramentas/GEO2_dragdrop.html`), ou, o que faz sentido de
verdade, se troca a BASE para MAT2 (que e o motor mais novo) com --base:

    python _processo/geracao/gen_mat2.py --base MAT2 --novo XXX2

Uso:
    python _processo/geracao/gen_mat2.py            # converte a casca de todos
    python _processo/geracao/gen_mat2.py dragdrop popit
"""
import shutil
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

RAIZ = Path(__file__).resolve().parents[2]
FER = RAIZ / "ferramentas"
V = "20260817"

PRODUTOS = ["aventura", "dragdrop", "popit", "simulado", "estudo",
            "flashcards", "nlm", "galeria", "video"]

# (obrigatoria?, de, para) — obrigatoria=False quando so alguns arquivos tem
COMUNS = [
    (False, "GEO2_data.js?v=20260810", f"MAT2_data.js?v={V}"),
    (False, "serafina-core.css?v=20260810", f"serafina-core.css?v={V}"),
    (False, "serafina-core.js?v=20260810", f"serafina-core.js?v={V}"),
    (False, "sera_theme.js?v=20260817", f"sera_theme.js?v={V}"),
    (False, "serafina-adventure.js?v=20260810", f"serafina-adventure.js?v={V}"),
    (False, "sera_summary.js?v=20260817", f"sera_summary.js?v={V}"),
    # --- casca ---
    (True, "<html lang=\"pt-BR\">", "<html lang=\"pt-BR\">"),   # fica PT: a casca e PT
    (False, "window.SERA_ACCENT={accent:'#34d399'}", "window.SERA_ACCENT={accent:'#a78bfa'}"),
    (False, "--accent:#34d399", "--accent:#a78bfa"),
    # --- botao da traducao: volta a ser bandeira ---
    (False, 'title="Mostrar dica" onclick="toggleTr()">&#128161;<span class="ft">Dica</span>',
            'title="Ver em português" onclick="toggleTr()">&#127463;&#127479;<span class="ft">PT</span>'),
    (False, 'title="Mostrar a dica" onclick="toggleTr()">&#128161;<span class="ft">Dica</span>',
            'title="Ver em português" onclick="toggleTr()">&#127463;&#127479;<span class="ft">PT</span>'),
]

# substituicoes de SERA_CFG: a linha inteira, por arquivo (o `stars` muda)
CFG_DE = ("window.SERA_CFG={trKey:'geo2_dica',lang:'pt-BR',rate:.9,%s"
          "somKey:'geo2_som',voicePrefs:['Thalita','Antonio','Antônio',"
          "'Google portugu','Maria','Daniel']};")


BASE, NOVO = "GEO2", "MAT2"


def converte(nome: str) -> None:
    src = FER / f"{BASE}_{nome}.html"
    dst = FER / f"{NOVO}_{nome}.html"
    if not src.exists():
        print(f"!! {src.name} nao existe"); return
    t = src.read_text(encoding="utf-8")
    faltou = []
    for obrig, de, para in COMUNS:
        if de in t:
            t = t.replace(de, para)
        elif obrig:
            faltou.append(de)

    # SERA_CFG: acha a linha e troca inteira, preservando o `stars`
    import re
    m = re.search(r"window\.SERA_CFG=\{trKey:'geo2_dica'[^}]*\};", t)
    if m:
        stars = re.search(r"stars:(\d+)", m.group(0))
        rate = ",rate:.85"
        novo = ("window.SERA_CFG={trKey:'mat2_tr',lang:'en-US'" + rate +
                (f",stars:{stars.group(1)}" if stars else "") +
                ",somKey:'mat2_som'};")
        t = t[:m.start()] + novo + t[m.end():]
    else:
        faltou.append("window.SERA_CFG={trKey:'geo2_dica'...}")

    dst.write_text(t, encoding="utf-8")
    print(f"[ok] {dst.name}  ({len(t)//1024} KB)" +
          (f"  !! NAO ENCONTRADO: {faltou}" if faltou else ""))


if __name__ == "__main__":
    args = sys.argv[1:]
    if "--base" in args:
        i = args.index("--base"); BASE = args[i + 1]; del args[i:i + 2]
    if "--novo" in args:
        i = args.index("--novo"); NOVO = args[i + 1]; del args[i:i + 2]
    if not (FER / f"{BASE}_dragdrop.html").exists():
        sys.exit(f"!! nao existe {BASE}_dragdrop.html em {FER}. "
                 f"A base do GEO2 saiu do repo em 17/08 — use --base MAT2.")
    for a in (args or PRODUTOS):
        converte(a)
