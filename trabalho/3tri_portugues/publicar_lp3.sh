#!/bin/bash
# Publica a materia LP3 no ramo que o GitHub Pages serve (em-construcao).
# O site antigo foi tirado do ar em 06/10 trocando a fonte do Pages para esse
# ramo; aqui so entra a materia nova, o resto continua fora do ar.
# Uso: bash publicar_lp3.sh            -> publica tudo (LP3_* + dependencias + index)
#      bash publicar_lp3.sh semjogo    -> nao copia LP3_jornada* (jogo em obra)
set -e
SRC="$(cd "$(dirname "$0")/../.." && pwd)"
W="$(mktemp -d)/pub"
cd "$SRC"
git fetch -q origin em-construcao
git worktree add -q --detach "$W" origin/em-construcao
cd "$SRC/ferramentas"
FILES=$(git ls-files "LP3_*.html" "LP3_*.js")
[ "$1" = "semjogo" ] && FILES=$(echo "$FILES" | grep -v '^LP3_jornada')
DEPS="OP_estilo.css OP_questao.js OP_voz.js sera_theme.js serafina-core.css serafina-core.js
assets/react-dom.production.min.js assets/react.production.min.js
media/video_lp3_poster.jpg media/video_lp3_pt.mp4"
# vendor de engine do jogo, se existir
for f in $(git ls-files assets); do case "$f" in *phaser*|*lp3*) DEPS="$DEPS $f";; esac; done
mkdir -p "$W/ferramentas/assets" "$W/ferramentas/media"
# copia o BLOB commitado (HEAD), nunca a working tree: agentes podem estar
# editando os arquivos e o que vai ao ar tem de ser o que foi conferido.
for f in $FILES $DEPS; do git show "HEAD:ferramentas/$f" > "$W/ferramentas/$f"; done
# index sem service worker: o sw.js deste ramo so desliga o antigo
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
# carimbo de versao: ?v=BUILD em todo recurso + vigia que forca a versao nova
# em aparelho que ja visitou o site (cache de 10 min do Pages, SW antigo)
BUILD="$(git -C "$SRC" rev-parse --short HEAD)$(date +%H%M)"
python "$SRC/trabalho/3tri_portugues/carimbo_versao.py" "$W" "$BUILD"
cd "$W"
git add -A
if git diff --cached --quiet; then echo "nada mudou"; else
  git commit -qm "Publica LP3 ($(date +%d/%m\ %H:%M))"
  git push -q origin HEAD:em-construcao
  echo "publicado: $(git log --oneline -1)"
fi
cd "$SRC"; git worktree remove --force "$W" 2>/dev/null || true
