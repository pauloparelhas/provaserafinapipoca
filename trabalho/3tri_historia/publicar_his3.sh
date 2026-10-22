#!/bin/bash
# Publica a materia de Historia (HIS3) no ramo que o GitHub Pages serve (em-construcao),
# e TIRA DO AR o Ingles (ING3_*), cuja prova ja passou (22/10; pedido do Paulo).
# Fork do trabalho/3tri_ingles/publicar_ing3.sh. Uso: bash publicar_his3.sh
set -e
SRC="$(cd "$(dirname "$0")/../.." && pwd)"
W="$(mktemp -d)/pub"
cd "$SRC"
git fetch -q origin em-construcao
git worktree add -q --detach "$W" origin/em-construcao
cd "$SRC/ferramentas"
FILES=$(git ls-files "HIS3_*.html" "HIS3_*.js")
# o jogo HIS3 reaproveita o som, a musica e a arte-base do WiseBear
FILES="$FILES LP3_jornada_partituras.js LP3_jornada_musica.js LP3_jornada_som.js LP3_jornada_arte.js LP3_jornada_arte2.js"
DEPS="OP_estilo.css OP_questao.js OP_voz.js sera_theme.js serafina-core.css serafina-core.js
assets/react-dom.production.min.js assets/react.production.min.js"
for f in $(git ls-files media/his3); do DEPS="$DEPS $f"; done
for f in media/video_his3.mp4 media/video_his3_poster.jpg media/video_his3_pt.vtt; do git ls-files --error-unmatch "$f" >/dev/null 2>&1 && DEPS="$DEPS $f"; done
for f in $(git ls-files assets); do case "$f" in *phaser*|*lp3*|assets/fonts/*) DEPS="$DEPS $f";; esac; done
mkdir -p "$W/ferramentas/assets/fonts" "$W/ferramentas/media/his3"
# tira do ar o que era so do Ingles (e qualquer sobra do Portugues que nao seja dependencia)
for f in $(cd "$W/ferramentas" && ls ING3_* LP3_* 2>/dev/null); do case " $FILES " in *" $f "*) ;; *) rm -f "$W/ferramentas/$f";; esac; done
rm -f "$W/ferramentas/media/video_ing3.mp4" "$W/ferramentas/media/video_ing3_poster.jpg" "$W/ferramentas/media/video_ing3_pt.vtt"
# copia o BLOB commitado (HEAD), nunca a working tree
for f in $FILES $DEPS; do git show "HEAD:ferramentas/$f" > "$W/ferramentas/$f"; done
git show HEAD:index.html > "$W/index.src.html"
python - "$W/index.src.html" "$W/index.html" <<'EOF'
import sys
s=open(sys.argv[1],encoding='utf-8').read()
i=s.find("if ('serviceWorker' in navigator) {")
if i>=0:
    j=s.index('</script>',i)
    s=s[:i]+"/* sem service worker neste ramo */\n"+s[j:]
open(sys.argv[2],'w',encoding='utf-8').write(s)
EOF
rm "$W/index.src.html"
BUILD="$(git -C "$SRC" rev-parse --short HEAD)$(date +%H%M)"
python "$SRC/trabalho/3tri_portugues/carimbo_versao.py" "$W" "$BUILD"
cd "$W"
git add -A
if git diff --cached --quiet; then echo "nada mudou"; else
  git commit -qm "Publica HIS3 e tira do ar o ING3 ($(date +%d/%m\ %H:%M))"
  git push -q origin HEAD:em-construcao
  echo "publicado: $(git log --oneline -1)"
fi
cd "$SRC"; git worktree remove --force "$W" 2>/dev/null || true
