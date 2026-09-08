# -*- coding: utf-8 -*-
"""
recorta_figuras_op.py — recorta do PDF oficial as figuras que as questoes
da Olimpiada precisam, e grava PNG em ferramentas/media/op/.

Por que existe: tres questoes tinham ficado FORA do banco porque as
alternativas sao desenhos (as placas de 2025, as fileiras de icones de 2023,
o codigo do Carlito de 2024), e outras oito tinham entrado "adaptadas" —
com o nome da figura escrito em palavras, o que muda a questao: na prova a
crianca tem de NOMEAR o desenho sozinha, e esse e o primeiro passo do
raciocinio. Com o recorte, a questao volta a ser a da prova.

Cada recorte e uma regiao da pagina renderizada (nao a imagem embutida):
assim vem junto o que e desenho vetorial, que get_images() nao pega.

Uso:  python _processo/geracao/recorta_figuras_op.py [--conferir]
      --conferir gera tambem um contact-sheet por prova para inspecao visual.
"""
import sys, pathlib
import fitz

RAIZ = pathlib.Path(__file__).resolve().parents[2]
FONTES = RAIZ / "olimpiadas" / "_fontes"
SAIDA = RAIZ / "ferramentas" / "media" / "op"
DPI = 200          # nitido no tablet sem estourar o peso
MARGEM = 4         # folga em pontos ao redor do recorte

# nome -> (arquivo pdf, pagina 1-based, x0, y0, x1, y1)
# As coordenadas sao em pontos do PDF (a pagina tem 595 x 842).
#
# REGRA DE OURO destes recortes: quando a figura E a alternativa, o rotulo
# "(A)" NAO pode entrar no corte. O motor embaralha as alternativas, entao
# uma imagem com "(A)" gravado apareceria na posicao C e mentiria para a
# crianca. A letra quem desenha e o componente.
RECORTES = {
    # ---- 2025 - 1a fase - Q4: as quatro placas SAO as alternativas ----
    "25F1Q4_a": ("OP_2025_catG_fase1_prova.pdf", 3,  92, 196, 240, 330),
    "25F1Q4_b": ("OP_2025_catG_fase1_prova.pdf", 3,  92, 330, 240, 470),
    "25F1Q4_c": ("OP_2025_catG_fase1_prova.pdf", 3, 386, 196, 534, 330),
    "25F1Q4_d": ("OP_2025_catG_fase1_prova.pdf", 3, 386, 330, 534, 470),

    # ---- 2023 - 1a fase - Q9: tabela letra->icone + 5 fileiras ----
    # a tabela tem NOVE colunas (A E B C D R O P S); cortar em x=420 comia
    # o P e o S, que sao justamente as letras de PESCADOR que faltavam
    "23F1Q9_tabela": ("OP_2023_catG_fase1_prova.pdf", 4,  60, 105, 560, 165),
    "23F1Q9_a":      ("OP_2023_catG_fase1_prova.pdf", 4,  95, 238, 420, 292),
    "23F1Q9_b":      ("OP_2023_catG_fase1_prova.pdf", 4,  95, 294, 420, 348),
    "23F1Q9_c":      ("OP_2023_catG_fase1_prova.pdf", 4,  95, 350, 420, 403),
    "23F1Q9_d":      ("OP_2023_catG_fase1_prova.pdf", 4,  95, 405, 420, 459),
    "23F1Q9_e":      ("OP_2023_catG_fase1_prova.pdf", 4,  95, 461, 420, 514),

    # ---- figuras que hoje estao "nomeadas" e voltam a ser desenho ----
    "24F1Q3_gelo":    ("OP_2024_catG_fase1_prova.pdf", 2, 200, 470, 400, 610),
    "24F1Q11_sombras":("OP_2024_catG_fase1_prova.pdf", 5,  60, 300, 540, 440),
}


def recorta(nome, spec, doc_cache):
    arq, pag, x0, y0, x1, y1 = spec
    caminho = FONTES / arq
    if not caminho.exists():
        print("  [faltando] %s" % arq)
        return None
    doc = doc_cache.setdefault(arq, fitz.open(caminho))
    page = doc[pag - 1]
    clip = fitz.Rect(x0 - MARGEM, y0 - MARGEM, x1 + MARGEM, y1 + MARGEM)
    pix = page.get_pixmap(dpi=DPI, clip=clip)
    destino = SAIDA / (nome + ".png")
    pix.save(destino)
    return destino, pix.width, pix.height, destino.stat().st_size


def main():
    SAIDA.mkdir(parents=True, exist_ok=True)
    cache = {}
    total = 0
    for nome, spec in RECORTES.items():
        r = recorta(nome, spec, cache)
        if r:
            destino, w, h, tam = r
            total += tam
            print("  %-18s %4dx%-4d %6.1f KB" % (nome, w, h, tam / 1024))
    print("\n%d recortes, %.1f KB no total, em %s" % (len(RECORTES), total / 1024, SAIDA))

    if "--conferir" in sys.argv:
        # contact-sheet: todas as pecas de uma questao lado a lado, para
        # conferir de uma olhada se o corte pegou a figura inteira
        from collections import defaultdict
        grupos = defaultdict(list)
        for nome in RECORTES:
            grupos[nome.split("_")[0]].append(nome)
        for grupo, nomes in grupos.items():
            imgs = [fitz.open(str(SAIDA / (n + ".png"))) for n in sorted(nomes)]
            larg = max(i[0].rect.width for i in imgs)
            alt = sum(i[0].rect.height for i in imgs) + 10 * len(imgs)
            folha = fitz.open()
            pg = folha.new_page(width=larg + 20, height=alt + 20)
            y = 10
            for n, i in zip(sorted(nomes), imgs):
                r = fitz.Rect(10, y, 10 + i[0].rect.width, y + i[0].rect.height)
                pg.insert_image(r, filename=str(SAIDA / (n + ".png")))
                y += i[0].rect.height + 10
            fora = SAIDA / ("_conferir_%s.png" % grupo)
            pg.get_pixmap(dpi=120).save(fora)
            print("  conferir: %s" % fora.name)


if __name__ == "__main__":
    main()
