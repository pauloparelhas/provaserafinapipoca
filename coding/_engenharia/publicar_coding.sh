#!/bin/bash
# Publica a Fábrica de Jogos (coding/) no ramo que o GitHub Pages serve (em-construcao),
# sem tocar na matéria que está no ar. Copia o BLOB commitado (HEAD), nunca a working tree.
# Portões antes. Uso: bash coding/_engenharia/publicar_coding.sh
set -e -o pipefail
SRC="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$SRC"
node coding/_engenharia/gate/valida_banco.js
W="$(mktemp -d)/pub"
git fetch -q origin em-construcao
git worktree add -q --detach "$W" origin/em-construcao
PROVA=$(node -e "var s={document:{write(){}}};s.window=s;require('vm').createContext(s);['catalogo','blocos','oficina','provas'].forEach(f=>require('vm').runInContext(require('fs').readFileSync('coding/banco/'+f+'.js','utf8'),s));console.log(s.FAB.PROVAS.lista[s.FAB.PROVAS.atual].arquivo.replace('../',''))")
FILES=$(git ls-files coding | grep -v '^coding/_engenharia/' | grep -v '[.]bat$')
FILES="$FILES ferramentas/serafina-core.js ferramentas/assets/fonts/nunito-latin.woff2 $PROVA"
for f in $FILES; do mkdir -p "$W/$(dirname "$f")"; git show "HEAD:$f" > "$W/$f"; done
# o cartão da Fábrica na home vem do index.html commitado (sem service worker neste ramo)
git show HEAD:index.html > "$W/index.src.html"
python - "$W/index.src.html" "$W/index.html" <<'PY'
import sys
s=open(sys.argv[1],encoding='utf-8').read()
i=s.find("if ('serviceWorker' in navigator) {")
if i>=0:
    j=s.index('</script>',i); s=s[:i]+"/* sem service worker neste ramo */\n"+s[j:]
open(sys.argv[2],'w',encoding='utf-8').write(s)
PY
rm "$W/index.src.html"
cd "$W"; git add -A
if git diff --cached --quiet; then echo "nada mudou"; else
  git commit -qm "Publica a Fábrica de Jogos ($(date +%d/%m\ %H:%M))"
  git push -q origin HEAD:em-construcao
  echo "publicado: $(git log --oneline -1)"
fi
cd "$SRC"; git worktree remove --force "$W" 2>/dev/null || true
