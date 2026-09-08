# -*- coding: utf-8 -*-
"""
merge_op_data.py — junta os blocos de itens produzidos em paralelo dentro do
banco unico ferramentas/OP_data.js.

Cada agente grava um bloco solto em olimpiadas/trabalho/reserva_*.js: apenas
os itens, um array sem `window.OP` e sem funcao em volta. Este script insere
cada bloco no marcador correspondente do banco, na ordem cronologica das
provas, e nunca duplica: se o id ja existe no banco, o bloco e ignorado.

Uso:  python _processo/geracao/merge_op_data.py [reserva1.js reserva2.js ...]
      (sem argumento, pega todos os olimpiadas/trabalho/reserva_*.js)

Depois de rodar, SEMPRE:
      node _processo/geracao/valida_op_data.js
      python _processo/geracao/qa_op.py
"""
import re, sys, pathlib

RAIZ = pathlib.Path(__file__).resolve().parents[2]
BANCO = RAIZ / "ferramentas" / "OP_data.js"
TRAB = RAIZ / "olimpiadas" / "trabalho"
MARCA = "/* fim dos itens */"

def ids_do_texto(txt):
    return re.findall(r"\{id:'([^']+)'", txt)

def corpo_do_bloco(caminho):
    """Tira o comentario de cabecalho e devolve so os itens."""
    txt = caminho.read_text(encoding="utf-8")
    # remove comentarios /* ... */ do inicio do arquivo
    while True:
        s = txt.lstrip()
        if s.startswith("/*"):
            txt = s[s.index("*/") + 2:]
        else:
            txt = s
            break
    txt = txt.strip()
    # se o agente embrulhou num array, tira os colchetes externos
    if txt.startswith("["):
        txt = txt[1:]
        txt = txt[: txt.rindex("]")]
    txt = txt.strip().rstrip(",")
    return txt

def main():
    banco = BANCO.read_text(encoding="utf-8")
    if MARCA not in banco:
        print("ERRO: marcador %r nao encontrado em OP_data.js" % MARCA)
        return 1
    existentes = set(ids_do_texto(banco))
    print("banco atual: %d itens" % len(existentes))

    alvos = [pathlib.Path(a) for a in sys.argv[1:]] or sorted(TRAB.glob("reserva_*.js"))
    if not alvos:
        print("nenhum bloco de reserva encontrado em %s" % TRAB)
        return 1

    novos_total = 0
    for arq in alvos:
        if not arq.exists():
            print("  [faltando] %s" % arq.name); continue
        corpo = corpo_do_bloco(arq)
        ids = ids_do_texto(corpo)
        repetidos = [i for i in ids if i in existentes]
        if repetidos:
            print("  [pulado] %s — %d id(s) ja no banco (%s)" %
                  (arq.name, len(repetidos), ", ".join(repetidos[:3])))
            continue
        if not ids:
            print("  [vazio] %s — nenhum item reconhecido" % arq.name); continue
        bloco = "\n/* ===== %s ===== */\n%s,\n\n" % (arq.stem, corpo)
        banco = banco.replace(MARCA, bloco + MARCA)
        existentes.update(ids)
        novos_total += len(ids)
        print("  [ok] %s — %d itens (%s ... %s)" % (arq.name, len(ids), ids[0], ids[-1]))

    if novos_total:
        BANCO.write_text(banco, encoding="utf-8")
    print("\ntotal no banco agora: %d itens (+%d)" % (len(existentes), novos_total))
    print("agora rode: node _processo/geracao/valida_op_data.js && python _processo/geracao/qa_op.py")
    return 0

if __name__ == "__main__":
    sys.exit(main())
