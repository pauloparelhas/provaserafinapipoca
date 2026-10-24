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

## v2 (23/10/2026) — entregue
Tela grande (o jogo ocupa a tela; barras recolhem e voltam pela setinha) · mapa e grade de
desenho crescem com a tela · Opções na engrenagem (idioma, voz, 5 temas de cor, 3 tamanhos,
barra à esquerda/direita, com/sem nomes, quais telas aparecem, tela grande, botões de dedo) ·
voz gravada Thalita/Antonio e Ava/Brian · Fábrica inteira em inglês · trava de segurança (CSP) ·
4 heróis, 3 inimigos, cristal/relógio/cogumelo, ponto de volta, madeira/neve/areia, 4 cenários,
2 jogos-modelo (neve, corrida), 5 blocos, 6 missões (25) e nível "Dona da Fábrica".

## v3 (24/10/2026) — entregue
- Navegação: "Continuar de onde parei", trilho com Voltar / missão / Próximo passo, seta guia
  (js/guia.js), selo Salvo/Na nuvem, missões Agora/Depois, "Guardar este jogo", "Queria que tivesse…".
- Mundo: mapa de 12 a 48 linhas com câmera vertical; fase nova por formato (Reta, Torre, Poço, Lago);
  cipó/escada, cano em par, água com fôlego, bolha e peixe; poderes pena, luva, pequenino; cavalo.
  Blocos novos só aparecem quando a peça existe; regras nascem com a peça (FAB.PACOTES).
- Tela de criar fases menos poluída (banco/fase_recheio.js): jeitos Pouca coisa (padrão), Médio,
  Tudo; peça que já está no mapa aparece sempre. Fase Reta nova começa Vazia, Algumas coisas ou
  Cheia de ideias; o que já vem no recheio não cumpre missão sozinho (missoes.js desconta).

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
- 23/10/2026 — v2: pedido do pai (mais opções, voz não robótica com escolha, tela imersiva,
  painéis que ela personaliza, inglês completo, segurança parental). "Meu primeiro jogo": espinhos
  afastados da plataforma de cima (o herói batia a cabeça e caía neles). Robô-jogador passou a
  morar dentro da página (a máquina de teste roda a menos de 30 quadros e o vaivém do Playwright
  chegava atrasado).
