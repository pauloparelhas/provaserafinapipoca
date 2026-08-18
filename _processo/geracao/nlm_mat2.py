# -*- coding: utf-8 -*-
"""nlm_mat2.py — pipeline NotebookLM da Matematica 2tri, ponta a ponta e IDEMPOTENTE.

Derivado de nlm_geo2.py, com UMA diferenca estrutural: a auth do NotebookLM
NAO e mais problema do humano. Antes de qualquer chamada, este script roda a
escada `nlm_auth_garantir.py` do projeto Pratico (doctor -> colheita de cookies
do perfil -> login completo com o perfil persistente). Ordem do Paulo em
17/08/2026: "login do nlm e automatico, nao precisa de mim". A sessao do CLI e
global (~/.notebooklm/), entao a escada do Pratico serve este projeto.

Faz, nesta ordem:
  0. GARANTE a sessao (escada de 3 degraus, sem humano);
  1. usa o caderno que ja existe (as 9 imagens da Unit 9 + as instrucoes da AP1);
  2. sobe as fontes novas: o .md consolidado e o roteiro do video;
  3. manda gerar video (pt_BR, kawaii), quiz e flashcards;
  4. espera os artefatos (heartbeat no stdout);
  5. baixa e move para ferramentas/media/ com o nome do padrao do projeto.

Estado em `_estado_nlm.json` ao lado do roteiro: rodar de novo nao duplica nada.

Uso:
    python _processo/geracao/nlm_mat2.py            # roda tudo
    python _processo/geracao/nlm_mat2.py --status
    python _processo/geracao/nlm_mat2.py --etapa baixar
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

RAIZ = Path(__file__).resolve().parents[2]
TRAB = RAIZ / "trabalho" / "2tri_matematica"
NLMDIR = TRAB / "notebooklm"
MEDIA = RAIZ / "ferramentas" / "media"
ESTADO = NLMDIR / "_estado_nlm.json"

# O caderno ja existia (criado pelo Paulo com as 9 imagens da Unit 9).
NOTEBOOK = "1d809265-42c8-404f-acc1-f63e454ae8bf"

# A escada de auth vive no projeto Pratico e vale para toda a maquina.
AUTH = (Path.home() / "OneDrive" / "td junto outlook hotmail" / "Prático" /
        "_ecossistema" / "scripts" / "nlm_auth_garantir.py")

FONTES = [
    ("md", NLMDIR / "nlm_source_mat2.md", "Conteudo consolidado da Unit 9 (2-D figures)"),
    ("roteiro", NLMDIR / "prompt_video_v1.md", "Roteiro do video"),
]

PROMPT_VIDEO_FILE = NLMDIR / "prompt_video_v1.md"

PROMPT_QUIZ = (
    "Quiz em portugues do Brasil para crianca de 7 anos sobre as figuras 2-D da Unit 9: "
    "os nomes em ingles das figuras (circle, triangle, square, rectangle, pentagon, hexagon, "
    "octagon), quantos lados (sides) e quantos vertices (vertices) cada uma tem, as figuras nos "
    "objetos do dia a dia, a simetria (symmetry, line of symmetry, as letras que tem simetria) e "
    "os movimentos slide, flip e turn. Escreva cada nome de figura em ingles com a traducao entre "
    "parenteses. Explique a resposta de cada pergunta. So use o que esta nas fontes."
)
PROMPT_FC = (
    "Flashcards em portugues do Brasil para crianca de 7 anos sobre a Unit 9 de matematica: "
    "cada figura 2-D com o nome em ingles e em portugues e quantos lados e vertices tem; as "
    "figuras nos objetos do dia a dia; as palavras side, vertex, vertices, edge, symmetry, line "
    "of symmetry, mirror image, slide, flip, turn com a traducao; e as letras que tem e que nao "
    "tem simetria. So use as fontes."
)

ARTEFATOS = {
    "video":      (["generate", "video", "--prompt-file", str(PROMPT_VIDEO_FILE),
                    "--language", "pt_BR", "--style", "kawaii", "--format", "explainer"],
                   "mp4", "video_mat2_nb1_pt.mp4"),
    "quiz":       (["generate", "quiz", PROMPT_QUIZ, "--quantity", "more", "--difficulty", "easy"],
                   "json", "quiz_mat2_nlm.json"),
    "flashcards": (["generate", "flashcards", PROMPT_FC, "--quantity", "more"],
                   "json", "flashcards_mat2_nlm.json"),
}


def st_load():
    if ESTADO.exists():
        try:
            return json.loads(ESTADO.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"notebook": NOTEBOOK, "fontes": {}, "artefatos": {}, "baixados": {}}


def st_save(s):
    NLMDIR.mkdir(parents=True, exist_ok=True)
    ESTADO.write_text(json.dumps(s, ensure_ascii=False, indent=2), encoding="utf-8")


def nlm(*args, timeout=600):
    cmd = ["notebooklm", *args]
    print("   $ " + " ".join(str(a) for a in cmd)[:160])
    env = dict(os.environ, NOTEBOOKLM_HL="pt_BR")
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, env=env,
                           encoding="utf-8", errors="replace", timeout=timeout)
        return p.returncode, (p.stdout or "") + (p.stderr or "")
    except subprocess.TimeoutExpired:
        return 124, "TIMEOUT"


def garante_sessao():
    """A escada de 3 degraus. NUNCA pedir login ao humano antes de rodar isto."""
    rc, out = nlm("list", timeout=120)
    if rc == 0 and "login" not in out.lower():
        print("[auth] sessao valida")
        return True
    if not AUTH.exists():
        print(f"!! [auth] nao achei a escada em {AUTH}")
        return False
    print("[auth] sessao invalida — rodando a escada (pode levar ~6 min)")
    p = subprocess.run([sys.executable, str(AUTH)], cwd=str(AUTH.parents[2]),
                       text=True, encoding="utf-8", errors="replace", timeout=900)
    rc, out = nlm("list", timeout=120)
    ok = rc == 0 and "login" not in out.lower()
    print("[auth] " + ("resolvido" if ok else "AINDA invalida"))
    return ok


def etapa_fontes(s, nb):
    for chave, caminho, titulo in FONTES:
        if s["fontes"].get(chave):
            print(f"[fonte] {chave}: ja subida"); continue
        if not caminho.exists():
            print(f"!! [fonte] {chave}: arquivo nao existe -> {caminho}"); continue
        rc, out = nlm("source", "add", str(caminho), "--notebook", nb,
                      "--type", "file", "--title", titulo, "--timeout", "300")
        if rc == 0:
            s["fontes"][chave] = True; st_save(s)
            print(f"[fonte] {chave}: OK ({caminho.name[:60]})")
        else:
            print(f"!! [fonte] {chave} falhou:\n{out[:500]}")


def etapa_gerar(s, nb):
    for tipo, (cmd, _ext, _final) in ARTEFATOS.items():
        if s["artefatos"].get(tipo):
            print(f"[gerar] {tipo}: ja pedido"); continue
        rc, out = nlm(*cmd, "--notebook", nb)
        if rc == 0:
            s["artefatos"][tipo] = True; st_save(s)
            print(f"[gerar] {tipo}: pedido")
        else:
            print(f"!! [gerar] {tipo} falhou:\n{out[:500]}")


def status_artefatos(nb):
    """{type_id: status} do --json. Nunca parsear a tabela (quebra em linhas)."""
    rc, out = nlm("artifact", "list", "--notebook", nb, "--json", timeout=180)
    try:
        d = json.loads(out[out.index("{"):out.rindex("}") + 1])
        return {a.get("type_id"): a.get("status") for a in d.get("artifacts", [])}
    except Exception:
        return {}


def etapa_esperar(s, nb, minutos=40):
    fim = time.time() + minutos * 60
    pendentes = {"pending", "processing", "generating"}
    while time.time() < fim:
        st = status_artefatos(nb)
        print(f"   [{time.strftime('%H:%M:%S')}] " +
              (" · ".join(f"{k}={v}" for k, v in st.items()) if st else "sem leitura"))
        faltam = [k for k, v in st.items() if v in pendentes]
        if st and not faltam:
            print("[esperar] nada mais pendente")
            return st
        time.sleep(60)
    print("[esperar] estourou o tempo — rode --etapa baixar depois")
    return status_artefatos(nb)


def etapa_baixar(s, nb):
    MEDIA.mkdir(parents=True, exist_ok=True)
    tmp = NLMDIR / "_download"
    tmp.mkdir(exist_ok=True)
    st = status_artefatos(nb)
    for tipo, (_cmd, ext, final) in ARTEFATOS.items():
        if s["baixados"].get(tipo):
            print(f"[baixar] {tipo}: ja baixado -> {s['baixados'][tipo]}"); continue
        if st.get(tipo) and st[tipo] != "completed":
            print(f"[baixar] {tipo}: ainda '{st[tipo]}' — pulando"); continue
        antes = {p.name for p in tmp.iterdir()}
        rc, out = nlm("download", tipo, "--notebook", nb, timeout=900)
        novos = [p for p in tmp.iterdir() if p.name not in antes]
        if not novos:
            novos = [p for p in Path.cwd().iterdir()
                     if p.is_file() and p.suffix.lstrip(".") == ext
                     and p.stat().st_mtime > time.time() - 900]
        if rc != 0 or not novos:
            print(f"!! [baixar] {tipo} falhou:\n{out[:500]}"); continue
        origem = max(novos, key=lambda p: p.stat().st_mtime)
        destino = MEDIA / final
        shutil.move(str(origem), str(destino))
        s["baixados"][tipo] = str(destino.relative_to(RAIZ)); st_save(s)
        print(f"[baixar] {tipo}: {destino.name} ({destino.stat().st_size/1024/1024:.1f} MB)")


def main():
    ap = argparse.ArgumentParser(description="Pipeline NotebookLM da Matematica 2tri.")
    ap.add_argument("--status", action="store_true")
    ap.add_argument("--etapa", choices=["fontes", "gerar", "esperar", "baixar"])
    ap.add_argument("--espera-min", type=int, default=25)
    ap.add_argument("--refazer", choices=["video", "quiz", "flashcards"], action="append")
    args = ap.parse_args()

    s = st_load()
    for tipo in (args.refazer or []):
        s["artefatos"].pop(tipo, None)
        antigo = s["baixados"].pop(tipo, None)
        if antigo:
            velho = RAIZ / antigo
            if velho.exists():
                arq = velho.with_name(velho.stem + "_v1" + velho.suffix)
                if arq.exists():
                    arq.unlink()
                velho.rename(arq)
                print(f"[refazer] {tipo}: antigo guardado como {arq.name}")
        st_save(s)
    if args.status:
        print(json.dumps(s, ensure_ascii=False, indent=2)); return

    if not garante_sessao():
        sys.exit(2)

    nb = s.get("notebook") or NOTEBOOK
    ordem = ["fontes", "gerar", "esperar", "baixar"]
    for et in ([args.etapa] if args.etapa else ordem):
        print(f"\n===== {et.upper()} =====")
        if et == "fontes":
            etapa_fontes(s, nb)
        elif et == "gerar":
            etapa_gerar(s, nb)
        elif et == "esperar":
            etapa_esperar(s, nb, args.espera_min)
        elif et == "baixar":
            etapa_baixar(s, nb)

    print("\n===== RESUMO =====")
    print(json.dumps(s, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
