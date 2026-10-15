#!/bin/bash
# PORTÃO ÚNICO do jogo ING3 (rodar antes de qualquer publicação). Tudo mudo. ~1 min.
#  1) mapas: alcançabilidade + regras de dificuldade para 7–8 anos
#  2) corrida: pista (curvas suaves, duração, pits)
#  3) jogabilidade: crianças-robô jogam todos os reinos do começo ao fim (relógio acelerado)
set -e
cd "$(dirname "$0")"
F=../../../ferramentas
for f in $F/ING3_jogo*.js; do node --check "$f"; done
node verifica_ing3.js $F | tail -3
node verifica_corrida.js $F | tail -1
PYTHONIOENCODING=utf-8 python testa_criancas.py 0,1,3,4,5,6,7,8,2 ${1:-5} | tail -12
