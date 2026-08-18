# -*- coding: utf-8 -*-
"""nlm_mat2_ap2.py — pipeline NotebookLM da Matematica 2tri AP2 (Time, Money,
Adding/Subtracting 2-digit), ponta a ponta e IDEMPOTENTE. Copia de nlm_mat2.py
trocando so a fonte e os prompts. Cria um NOTEBOOK NOVO (separado do da AP1).

Uso:
    python _processo/geracao/nlm_mat2_ap2.py            # roda tudo
    python _processo/geracao/nlm_mat2_ap2.py --status
    python _processo/geracao/nlm_mat2_ap2.py --etapa baixar
"""
import argparse
import json
import os
import re
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
ESTADO = NLMDIR / "_estado_nlm_ap2.json"

AUTH = (Path.home() / "OneDrive" / "td junto outlook hotmail" / "Prático" /
        "_ecossistema" / "scripts" / "nlm_auth_garantir.py")

FONTES = [
    ("roteiro", TRAB / "_roteiro_ap2.md", "Roteiro AP2 — Time, Money, Adding/Subtracting"),
    ("video_prompt", NLMDIR / "prompt_video_ap2_v1.md", "Roteiro do video AP2"),
]

PROMPT_VIDEO_FILE = NLMDIR / "prompt_video_ap2_v1.md"

PROMPT_QUIZ = (
    "Quiz em portugues do Brasil para crianca de 7 anos sobre: units of time (less than/about/"
    "more than a minute), telling time no relogio ate o quarto de hora (o'clock, quarter past, "
    "half past, quarter to, relogio analogico e digital), money (somar centavos de moedas/precos "
    "para achar um valor exato), e somar e subtrair numeros de dois digitos com o algoritmo em "
    "coluna, incluindo reagrupamento (regroup). Escreva cada termo em ingles com a traducao entre "
    "parenteses. Explique a resposta de cada pergunta. So use o que esta nas fontes, nunca invente "
    "conta nova."
)
PROMPT_FC = (
    "Flashcards em portugues do Brasil para crianca de 7 anos sobre: as palavras minute, less "
    "than/about/more than, o'clock, quarter past, half past, quarter to, hour hand, minute hand, "
    "analog/digital clock, cent, coin, exact amount, add/addition, subtract/subtraction, sum, "
    "difference, tens, ones, regroup — cada uma com a traducao; e os fatos de horas, dinheiro e "
    "contas do roteiro. So use as fontes, nunca invente conta nova."
)

ARTEFATOS = {
    "video":      (["generate", "video", "--prompt-file", str(PROMPT_VIDEO_FILE),
                    "--language", "pt_BR", "--style", "kawaii", "--format", "explainer"],
                   "mp4", "video_mat2_ap2_nb1_pt.mp4"),
    "quiz":       (["generate", "quiz", PROMPT_QUIZ, "--quantity", "more", "--difficulty", "easy"],
                   "json", "quiz_mat2_ap2_nlm.json"),
    "flashcards": (["generate", "flashcards", PROMPT_FC, "--quantity", "more"],
                   "json", "flashcards_mat2_ap2_nlm.json"),
}


def st_load():
    if ESTADO.exists():
        try:
            return json.loads(ESTADO.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"notebook": None, "fontes": {}, "artefatos": {}, "baixados": {}}


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
    rc, out = nlm("list", timeout=120)
    if rc == 0 and "login" not in out.lower():
        print("[auth] sessao valida")
        return True
    if not AUTH.exists():
        print(f"!! [auth] nao achei a escada em {AUTH}")
        return False
    print("[auth] sessao invalida — rodando a escada (pode levar ~6 min)")
    subprocess.run([sys.executable, str(AUTH)], cwd=str(AUTH.parents[2]),
                   text=True, encoding="utf-8", errors="replace", timeout=900)
    rc, out = nlm("list", timeout=120)
    ok = rc == 0 and "login" not in out.lower()
    print("[auth] " + ("resolvido" if ok else "AINDA invalida"))
    return ok


def etapa_notebook(s):
    if s.get("notebook"):
        print(f"[notebook] ja existe: {s['notebook']}"); return s["notebook"]
    rc, out = nlm("create", "Serafina - MATEMATICA AP2: Time, Money & Adding/Subtracting")
    m = re.search(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", out)
    if rc != 0 or not m:
        print(f"!! [notebook] falhou ao criar:\n{out[:500]}")
        sys.exit(2)
    nb = m.group(0)
    s["notebook"] = nb; st_save(s)
    print(f"[notebook] criado: {nb}")
    return nb


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
    rc, out = nlm("artifact", "list", "--notebook", nb, "--json", timeout=180)
    try:
        d = json.loads(out[out.index("{"):out.rindex("}") + 1])
        # se o mesmo tipo tem +1 artefato (regeracao apos falha), fica com o
        # 'completed' se existir; senao, o mais recente por created_at.
        # (bug real achado 18/08: dict comprehension simples pegava o ULTIMO
        # da lista, que era o 'failed', escondendo o 'completed' que baixou.)
        melhores = {}
        for a in d.get("artifacts", []):
            t = a.get("type_id")
            if t not in melhores:
                melhores[t] = a
                continue
            atual = melhores[t]
            if a.get("status") == "completed" and atual.get("status") != "completed":
                melhores[t] = a
            elif a.get("status") == atual.get("status") and a.get("created_at", "") > atual.get("created_at", ""):
                melhores[t] = a
        return {t: a.get("status") for t, a in melhores.items()}
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
    ap = argparse.ArgumentParser(description="Pipeline NotebookLM da Matematica 2tri AP2.")
    ap.add_argument("--status", action="store_true")
    ap.add_argument("--etapa", choices=["notebook", "fontes", "gerar", "esperar", "baixar"])
    ap.add_argument("--espera-min", type=int, default=25)
    args = ap.parse_args()

    s = st_load()
    if args.status:
        print(json.dumps(s, ensure_ascii=False, indent=2)); return

    if not garante_sessao():
        sys.exit(2)

    ordem = ["notebook", "fontes", "gerar", "esperar", "baixar"]
    nb = s.get("notebook")
    for et in ([args.etapa] if args.etapa else ordem):
        print(f"\n===== {et.upper()} =====")
        if et == "notebook":
            nb = etapa_notebook(s)
        elif et == "fontes":
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
