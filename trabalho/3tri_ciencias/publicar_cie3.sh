#!/bin/bash
# Publica Ciencias (CIE3) no ramo do Pages (em-construcao), mantendo Historia (HIS3) no ar: o botao da home leva a ela.
# Uso: bash publicar_cie3.sh. Copia o BLOB de HEAD, nunca a working tree.
set -e -o pipefail
SRC="$(cd "$(dirname "$0")/../.." && pwd)"
node "$SRC/trabalho/3tri_ciencias/gen/valida_questoes.js" "$SRC/ferramentas" | tail -3 || { echo "NAO PUBLICADO: questoes sem aprovacao"; exit 1; }
W="$(mktemp -d)/pub"
cd "$SRC"
git fetch -q origin em-construcao
git worktree add -q --detach "$W" origin/em-construcao
cd "$SRC/ferramentas"
FILES=$(git ls-files "CIE3_*.html" "CIE3_*.js" "HIS3_*.html" "HIS3_*.js")
FILES="$FILES LP3_jornada_partituras.js LP3_jornada_musica.js LP3_jornada_som.js LP3_jornada_arte.js LP3_jornada_arte2.js"
DEPS="OP_estilo.css OP_questao.js OP_voz.js sera_theme.js serafina-core.css serafina-core.js assets/react-dom.production.min.js assets/react.production.min.js"
for f in $(git ls-files media/cie3 media/his3); do DEPS="$DEPS $f"; done
for f in media/video_his3.mp4 media/video_his3_poster.jpg media/video_his3_pt.vtt media/video_cie3.mp4 media/video_cie3_poster.jpg media/video_cie3_pt.vtt; do git ls-files --error-unmatch "$f" >/dev/null 2>&1 && DEPS="$DEPS $f"; done
for f in $(git ls-files assets); do case "$f" in *phaser*|*lp3*|assets/fonts/*) DEPS="$DEPS $f";; esac; done
mkdir -p "$W/ferramentas/assets/fonts" "$W/ferramentas/media/his3" "$W/ferramentas/media/cie3/orig"
for f in $FILES $DEPS; do git show "HEAD:ferramentas/$f" > "$W/ferramentas/$f"; done
git show HEAD:index.html > "$W/index.src.html"
python "$SRC/trabalho/3tri_ciencias/gen/index_sem_sw.py" "$W/index.src.html" "$W/index.html"
rm "$W/index.src.html"
BUILD="$(git -C "$SRC" rev-parse --short HEAD)$(date +%H%M)"
python "$SRC/trabalho/3tri_portugues/carimbo_versao.py" "$W" "$BUILD"
cd "$W"
git add -A
if git diff --cached --quiet; then echo "nada mudou"; else
  git commit -qm "Publica CIE3, com HIS3 no botao da home ($(date +%d/%m\ %H:%M))"
  git push -q origin HEAD:em-construcao
  echo "publicado: $(git log --oneline -1)"
fi
cd "$SRC"; git worktree remove --force "$W" 2>/dev/null || true
