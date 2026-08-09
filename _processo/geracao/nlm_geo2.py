# -*- coding: utf-8 -*-
"""nlm_geo2.py — pipeline NotebookLM da Geografia 2tri, ponta a ponta e IDEMPOTENTE.

Faz, nesta ordem:
  1. checa a sessão (`notebooklm list`) e para cedo se estiver morta, dizendo o reparo;
  2. cria (ou reaproveita) o caderno "Serafina - GEO2: Comunidades e lugares";
  3. sobe as fontes: o PDF da professora + o .md consolidado + o roteiro do vídeo;
  4. manda gerar vídeo (pt_BR, kawaii), quiz e flashcards;
  5. espera os artefatos ficarem prontos (com heartbeat no stdout);
  6. baixa tudo e move para ferramentas/media/ com o nome do padrão do projeto.

Cada etapa grava estado em `_estado_nlm.json` ao lado do roteiro, então rodar de novo
NÃO duplica caderno nem fonte nem artefato — retoma de onde parou.

Uso:
    python _processo/geracao/nlm_geo2.py            # roda tudo
    python _processo/geracao/nlm_geo2.py --status   # só mostra onde está
    python _processo/geracao/nlm_geo2.py --etapa fontes

Se a sessão estiver expirada, o reparo (interativo, tem de ser o humano) é:
    ! bash "C:/Users/paulo/OneDrive/td junto outlook hotmail/Prático/_ecossistema/skills/nlm-auth/scripts/nlm_login.sh"
ou o atalho antigo: clicar duas vezes em notebooklm_login.bat na raiz do projeto.
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

RAIZ = Path(__file__).resolve().parents[2]
TRAB = RAIZ / "trabalho" / "2tri_geografia"
NLMDIR = TRAB / "notebooklm"
MEDIA = RAIZ / "ferramentas" / "media"
ESTADO = NLMDIR / "_estado_nlm.json"
NOME_CADERNO = "Serafina - GEO2: Comunidades e lugares (Y2)"

FONTES = [
    ("pdf", TRAB / "Toddle-226a5c4b-861a-4a12-82a8-10daf9693fc9-Unidade 2 – Diferentes comunidades e sua relação com os lugares Y2.pdf"),
    ("md", NLMDIR / "nlm_source_geo2.md"),
    ("roteiro", NLMDIR / "roteiro_video.md"),
]
# tipo de artefato -> (comando de geracao, extensao esperada, nome final em media/)
ARTEFATOS = {
    "video":      (["generate", "video", "--language", "pt_BR", "--style", "kawaii"], "mp4",  "video_geo2_nb1_pt.mp4"),
    "quiz":       (["generate", "quiz"], "json", "quiz_geo2_raw.json"),
    "flashcards": (["generate", "flashcards"], "json", "flashcards_geo2_raw.json"),
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
    """Roda o CLI e devolve (rc, saida). Nunca levanta: quem decide e o chamador."""
    cmd = ["notebooklm", *args]
    print("   $ " + " ".join(str(a) for a in cmd)[:160])
    try:
        p = subprocess.run(cmd, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=timeout)
        return p.returncode, (p.stdout or "") + (p.stderr or "")
    except subprocess.TimeoutExpired:
        return 124, "TIMEOUT"


def checa_sessao():
    rc, out = nlm("list", timeout=120)
    if rc != 0 or "login" in out.lower() or "signin" in out.lower():
        print("\n!! SESSAO DO NOTEBOOKLM INVALIDA.")
        print("   Reparo (interativo — tem de ser o humano, o agente nao consegue):")
        print('   ! bash "C:/Users/paulo/OneDrive/td junto outlook hotmail/Prático/'
              '_ecossistema/skills/nlm-auth/scripts/nlm_login.sh"')
        print("   (ou clicar duas vezes em notebooklm_login.bat na raiz do projeto)")
        print("\n   Depois do login, rode este script de novo — ele retoma de onde parou.\n")
        return None
    return out


def etapa_caderno(s, listagem):
    if s.get("notebook"):
        print(f"[caderno] ja existe: {s['notebook']}")
        return s["notebook"]
    # reaproveita se o nome ja estiver na listagem (evita duplicar em reexecucao)
    for linha in (listagem or "").splitlines():
        if "GEO2" in linha:
            m = re.search(r"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})", linha)
            if m:
                s["notebook"] = m.group(1); st_save(s)
                print(f"[caderno] reaproveitado da listagem: {s['notebook']}")
                return s["notebook"]
    rc, out = nlm("create", NOME_CADERNO)
    m = re.search(r"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})", out)
    if rc != 0 or not m:
        print("!! nao consegui criar o caderno:\n" + out[:800]); return None
    s["notebook"] = m.group(1); st_save(s)
    print(f"[caderno] criado: {s['notebook']}")
    return s["notebook"]


def etapa_fontes(s, nb):
    for chave, caminho in FONTES:
        if s["fontes"].get(chave):
            print(f"[fonte] {chave}: ja subida"); continue
        if not caminho.exists():
            print(f"!! [fonte] {chave}: arquivo nao existe -> {caminho}"); continue
        rc, out = nlm("source", "add", "--notebook", nb, "--file", str(caminho))
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


def etapa_esperar(s, nb, minutos=25):
    """Poll do artifact list. O video demora; quiz/flashcards saem rapido."""
    fim = time.time() + minutos * 60
    while time.time() < fim:
        rc, out = nlm("artifact", "list", "--notebook", nb, timeout=180)
        print(f"   [{time.strftime('%H:%M:%S')}] artefatos:")
        for linha in out.splitlines():
            if linha.strip():
                print("     " + linha[:150])
        baixo = out.lower()
        if "pending" not in baixo and "processing" not in baixo and "generating" not in baixo:
            print("[esperar] nada mais pendente")
            return out
        time.sleep(60)
    print("[esperar] estourou o tempo — rode --etapa baixar depois")
    return out


def etapa_baixar(s, nb):
    MEDIA.mkdir(parents=True, exist_ok=True)
    tmp = NLMDIR / "_download"
    tmp.mkdir(exist_ok=True)
    for tipo, (_cmd, ext, final) in ARTEFATOS.items():
        if s["baixados"].get(tipo):
            print(f"[baixar] {tipo}: ja baixado -> {s['baixados'][tipo]}"); continue
        antes = {p.name for p in tmp.iterdir()}
        rc, out = nlm("download", tipo, "--notebook", nb, timeout=900)
        novos = [p for p in tmp.iterdir() if p.name not in antes]
        if not novos:  # o CLI baixa no cwd em algumas versoes
            novos = [p for p in Path.cwd().iterdir()
                     if p.is_file() and p.suffix.lstrip(".") == ext and p.stat().st_mtime > time.time() - 900]
        if rc != 0 or not novos:
            print(f"!! [baixar] {tipo} falhou:\n{out[:500]}"); continue
        origem = max(novos, key=lambda p: p.stat().st_mtime)
        destino = MEDIA / final
        shutil.move(str(origem), str(destino))
        s["baixados"][tipo] = str(destino.relative_to(RAIZ)); st_save(s)
        print(f"[baixar] {tipo}: {destino.name} ({destino.stat().st_size/1024/1024:.1f} MB)")


def main():
    ap = argparse.ArgumentParser(description="Pipeline NotebookLM da Geografia 2tri.")
    ap.add_argument("--status", action="store_true", help="so mostra o estado")
    ap.add_argument("--etapa", choices=["caderno", "fontes", "gerar", "esperar", "baixar"],
                    help="roda so uma etapa")
    ap.add_argument("--espera-min", type=int, default=25)
    args = ap.parse_args()

    s = st_load()
    if args.status:
        print(json.dumps(s, ensure_ascii=False, indent=2)); return

    listagem = checa_sessao()
    if listagem is None:
        sys.exit(2)

    nb = etapa_caderno(s, listagem)
    if not nb:
        sys.exit(3)
    if args.etapa == "caderno":
        return

    ordem = ["fontes", "gerar", "esperar", "baixar"]
    alvo = [args.etapa] if args.etapa else ordem
    for et in alvo:
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
    print("\nDepois de baixar: adicionar os cards no index.html e commitar.")


if __name__ == "__main__":
    main()
