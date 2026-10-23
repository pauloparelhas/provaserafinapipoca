# Roteiro de melhoria contínua — Fábrica de Jogos

O produto não fica pronto. Cada rodada começa pelo que ELA fez (o .json exportado em
`entrada/`), não pelo que achamos bonito. Pergunta-guia de cada rodada: **o que ela procurou
sozinha, sem ninguém chamar? Onde ela parou?**

## Ritual de cada rodada (skill `fabrica-mariana`, comando "rodada da Fábrica")
1. Ler o .json mais novo: missões feitas e datas, testes por jogo, carinhas do diário, o que
   ela disse que ia mudar, pedidos ao robô, perguntas que escreveu.
2. Agente `mentor-coding` diagnostica: onde travou (missão parada há > 3 sessões), o que ama
   (o que repete), qual conceito está maduro para o próximo degrau.
3. Escolher NO MÁXIMO 3 melhorias. Uma delas sempre vem de um pedido dela.
4. Portões verdes → commit → publicar → linha no fim deste arquivo (data, o que mudou, por quê).

## v1 (23/10/2026) — entregue
Painel com missão sugerida · Ateliê de pixel (16×16, 2 quadros, balde, espelho) · Editor de
fases (25 peças, 7 cenários, até 5 fases) · Regras QUANDO/SÓ SE/FAÇA (11/4/18 blocos) com
contador "acordou N vezes" · Teste com lupa de bichinhos, registro das regras e mapa de onde
perdeu vida · Diário com carinhas e fotos do jogo (versões) · Robô (pedido em 3 partes) ·
19 missões + 13 cartas do saber + 6 níveis · Mostrar (modo convidado + link com o jogo
dentro) · Placa ? ligada ao banco da prova (HIS3) e às perguntas dela · ditado por voz.

## Próximos degraus (ordem sugerida, cada um só quando ela pedir ou travar)
- [ ] **"Dá para ganhar?"** — robô-jogador dentro da Fábrica que testa a fase dela e mostra onde travou (sugestão do pedagógico).
- [ ] **Animação de 2 quadros editável** (hoje pinta nos dois ao mesmo tempo) — quando ela pedir pernas que mexem.
- [ ] **Caixinhas próprias** (variável com nome que ela cria: "maçãs", "amigos salvos").
- [ ] **Regra com OU / E** (dois cadeados).
- [ ] **Plataforma que se move** e **chefão** (vida do inimigo = variável).
- [ ] **Música** de fundo (sequenciador de 8 notas = laço + sequência).
- [ ] **Vista de cima** (labirinto), cortada da v1 pelo pedagógico.
- [ ] **Ponte para o Scratch/Construct**: botão "ver como seria no Scratch" mostrando a regra dela em blocos do Scratch.
- [ ] **Galeria da família**: jogos dela com link, para avós jogarem.

## Registro das rodadas
- 23/10/2026 — v1 nasce. Revisão pedagógica aplicada: nomes de criança (acontecimento, só se,
  caixinha de número, de novo e de novo, bichinho do erro, foto do jogo), trilha de 18→19
  missões com conferência automática, regras-modelo que ela troca em vez de montar do zero,
  dicas em degrau no jogo quebrado, ficha do robô que só envia com as 3 partes.
