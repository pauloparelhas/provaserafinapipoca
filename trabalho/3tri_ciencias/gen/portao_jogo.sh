#!/bin/bash
# PORTÃO ÚNICO do jogo CIE3 (Motion Rangers), tudo MUDO: sintaxe, mapas (alcance + dificuldade), corrida,
# corrida por mérito, crianças-robô em todas as fases, grep do que aparece NA TELA.
set -e
set -o pipefail
cd "$(dirname "$0")"
F=../../../ferramentas
for f in $F/CIE3_jogo*.js; do node --check "$f"; done
node verifica_cie3.js $F | tail -20
node verifica_corrida.js $F | tail -1
node grep_tela.js $F
PYTHONIOENCODING=utf-8 python testa_corrida.py 2 | tail -6
PYTHONIOENCODING=utf-8 python testa_criancas.py 0,1,2,3,4,5,7,8,6 ${1:-5} | tail -14
PYTHONIOENCODING=utf-8 python testa_tela.py | tail -14
