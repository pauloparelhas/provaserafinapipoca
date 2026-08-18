# -*- coding: utf-8 -*-
"""gen_mat2_textos.py — 2a passada: as strings de casca que sobraram do GEO.

Roda DEPOIS de gen_mat2.py. Cada substituicao e EXATA e o script imprime o que
nao encontrou (o erro que mata este tipo de derivacao e a troca silenciosa que
nao aconteceu).

A tabela SUBS e, por natureza, de UMA materia: sao as strings de casca do GEO2
trocadas pelas da Matematica. Fica como MODELO do formato — a materia seguinte
escreve a sua, partindo das strings do MAT2.
"""
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
FER = Path(__file__).resolve().parents[2] / "ferramentas"

SUBS = {
"dragdrop": [
 ("<title>Arrasta e classifica — Geografia · Comunidades e lugares</title>",
  "<title>Sort it! — Math · 2-D Figures</title>"),
 ("   ARRASTA E CLASSIFICA · Geografia Y2 · Unidade 2",
  "   ARRASTA E CLASSIFICA · Matematica Y2 · Unit 9 (2-D Geometry)"),
 ("+'<div class=\"tr\" style=\"font-size:1rem;margin-top:2px\">Toque no 💡 sempre que quiser uma dica.</div>'",
  "+'<div class=\"tr\" style=\"font-size:1rem;margin-top:2px\">Toque na 🇧🇷 para ler em português.</div>'"),
 ("+'<span class=\"tr\">Dica: leia a carta em voz alta antes de arrastar. Se travar, toque no 💡.</span></p>'",
  "+'<span class=\"tr\">Leia a carta em voz alta em inglês antes de arrastar. Se não entender, toque na 🇧🇷.</span></p>'"),
 ("/* GEO: tudo em portugues; o botao da lampada revela as dicas (body.show-tr) */",
  "/* MAT: conteudo em INGLES; o botao da bandeira revela a traducao PT (body.show-tr) */"),
],
"popit": [
 ("<title>Estoura o balão — Geografia · Comunidades e lugares</title>",
  "<title>Pop it! — Math · 2-D Figures</title>"),
 ("   ESTOURA O BALAO · Geografia Y2 · Unidade 2",
  "   ESTOURA O BALAO · Matematica Y2 · Unit 9 (2-D Geometry)"),
 ("+'<div class=\"tr\" style=\"font-size:1rem;margin-top:2px\">Toque no \\u{1F4A1} sempre que quiser uma dica.</div>'",
  "+'<div class=\"tr\" style=\"font-size:1rem;margin-top:2px\">Toque na \\u{1F1E7}\\u{1F1F7} para ler em português.</div>'"),
 ("+'<span class=\"tr\">Dica: leia o balão em voz alta antes de estourar. Errar não tira ponto — é assim que se aprende.</span></p>'",
  "+'<span class=\"tr\">Leia o balão em voz alta em inglês antes de estourar. Errar não tira ponto — é assim que se aprende.</span></p>'"),
 ("+(col.pt?'Dica: '+col.pt:'')",
  "+(col.pt?col.pt:'')"),
],
"simulado": [
 ("<title>Simulado — Geografia · Comunidades e lugares</title>",
  "<title>Practice test — Math · 2-D Figures</title>"),
 ("   BANCO DE QUESTOES — Geografia Y2 · Unidade 2",
  "   BANCO DE QUESTOES — Matematica Y2 · Unit 9 (2-D Geometry)"),
],
"aventura": [
 ("<title>Expedição Brasil — Geografia · Comunidades e lugares</title>",
  "<title>Shape Quest — Math · 2-D Figures</title>"),
 ("window.SERA_CFG={trKey:'geo2_dica',lang:'pt-BR',rate:.9,stars:140,",
  "window.SERA_CFG={trKey:'mat2_tr',lang:'en-US',rate:.85,stars:140,"),
 ("listen:'🔊 Ouvir a lição<span class=\"tr\">o 💡 mostra as dicas</span>',",
  "listen:'🔊 Ouvir a lição<span class=\"tr\">a 🇧🇷 mostra a tradução</span>',"),
 ("nextPhase:'➡️ Próxima fase<span class=\"tr\"></span>',somKey:'geo2_som',voicePrefs:['Thalita','Antonio','Antônio','Google portugu','Maria','Daniel']}};",
  "nextPhase:'➡️ Próxima fase<span class=\"tr\"></span>'},somKey:'mat2_som'};"),
 ("   EXPEDIÇÃO BRASIL — dados da aventura (Geografia 2tri)",
  "   SHAPE QUEST — dados da aventura (Matematica 2tri)"),
 (" storageKey:'geo2_adv',", " storageKey:'mat2_adv',"),
],
"flashcards": [],
"nlm": [],
"galeria": [],
"video": [],
"estudo": [],
}


def roda(nome, pares):
    p = FER / f"MAT2_{nome}.html"
    if not p.exists():
        print(f"!! {p.name} nao existe"); return
    t = p.read_text(encoding="utf-8")
    faltou = []
    for de, para in pares:
        if de in t:
            t = t.replace(de, para)
        else:
            faltou.append(de[:70])
    p.write_text(t, encoding="utf-8")
    print(f"[{nome}] {len(pares)-len(faltou)}/{len(pares)} aplicadas" +
          ("  !! NAO ENCONTRADO: " + " | ".join(faltou) if faltou else ""))


if __name__ == "__main__":
    for nome in (sys.argv[1:] or list(SUBS)):
        roda(nome, SUBS[nome])
