# Pré-prompts de desenvolvimento de jogos (versionados)

**v4 · 16/10/2026** (v3 · 15/10, v2 · 15/10, v1 · 18/10). Use antes de desenhar, codar, testar e publicar qualquer jogo. Cada correção do Paulo vira uma regra aqui, para não repetir.

## P1 · Desenhar uma fase (antes de codar)
1. Gênero da `BIBLIOTECA_JOGOS.md`, objetivo da criança em uma frase, duração (~1 min por fase, fora as perguntas).
2. Mapa de trechos: calmo → porta → desafio → checkpoint (×3) → mini-chefe → fim. Respeitar R1–R8.
3. Um poder **temático** que interaja com a fase, num móvel, antes da 1ª porta. Se não houver poder razoável, **não inventar**.
4. Todo perigo com origem visível e aviso. Todo texto curto, com tradução PT na bandeira (DOM e canvas).
5. Carga cognitiva: no máximo 2 mecânicas novas por fase.

## P2 · Codar
- Reaproveitar o motor e os módulos. Não reescrever do zero sem motivo.
- Arquivo > 500 linhas: escrever direto, em partes. Agente não escreve arquivo grande.
- Nada aleatório dentro do desenho (pisca). Decoração sorteada pela posição, nunca recalculada em objeto que se move.
- QA hooks: `JOGO.relogioTeste`, `JOGO.passoFixo`, `J.teste` (quedas, danos).

## P3 · Testar (obrigatório, mudo, rápido)
1. `bash trabalho/3tri_ingles/gen/portao_jogo.sh` (~1 min). Faz:
   - sintaxe;
   - mapas (alcance + regras de dificuldade);
   - corrida;
   - **crianças-robô** jogando todos os reinos com imprecisão.
2. Critérios das crianças-robô:
   - 5 de 5 terminam;
   - no máximo 3 quedas por trecho de 8 tiles;
   - no máximo 8 quedas por criança;
   - travar no máximo 3 vezes;
   - zero erro de JavaScript.
3. Depois, `Agent(subagent_type="jogador")` para o olhar visual (capturas) e `Agent(subagent_type="guardiao")` para segurança/parental.
4. Só publica com APROVADA + LIBERA + LIBERA. Publicação: `bash trabalho/3tri_ingles/publicar_ing3.sh`, depois conferir o build no ar.

## P4 · Relatar
Relatório curto, no passado, com o que foi testado e os números (terminaram X/Y, quedas, tempo).
Durante trabalho longo: aviso curto a cada ~10 min do que está sendo feito.

## Lições já incorporadas (não repetir)
- **Poderes:**
  - poder genérico repetido em todo reino (capa para tudo, estrela global) → poder do reino, explicado;
  - roupa ou capa só aparecendo numa pose → visual do poder em todas as poses;
  - "jorrar leite" no inimigo → banido (duplo sentido).
- **Obstáculos e mapa:**
  - porteira que obrigava a responder → só incentivo (seta);
  - pula-pula longe de muro alto, muro de 4 tiles, duas ravinas com toco de 1 tile → R1–R3;
  - Chef que joga pratos logo antes do buraco → R2;
  - fosso de espuma sob aparelho → R4.
- **Corrida:**
  - vista de cima que gira → tontura → 2,5D com câmera fixa atrás;
  - rival que nunca para no box → todos param o mesmo tempo;
  - herói mais lento → herói sempre mais rápido.
- **Chefão:** alvo inalcançável e ataque certeiro → prateleira de 3 tiles, ataque com sombra e fora do alvo; abertura de 5 frases → 3 telas curtas.
- **Imagem:** pisca (`Math.floor` instável, hash da posição de plataforma móvel, tremor aleatório) → correções em `arte4`/`LP3_jornada_arte2`/`cena`.
- **Corrida (v2):**
  - box no meio da pista com todo mundo entrando → box é DESVIO à direita, convite (segurar ◀ passa direto), rápido (1,2 s), cada rival na sua vez e o mesmo tempo;
  - encostar no carro da frente "batia" e mostrava plaquinha → encostar não freia, não mostra nada: o da frente abre caminho;
  - moedas que não serviam para nada → raios (3 = 1 turbo) e rampas com salto;
  - sem música → sons de ambiente baixinhos e esparsos (motor, torcida, passarinhos, ondas, vento, gotas).
- **Perguntas:** barra que enchia sozinha → o Next só avança no toque e "respira" devagar; no jogo a pergunta tem 1–2 linhas (texto de leitura fica no simulado/estudo).
- **Pisca:** nada de alternar cor/visibilidade, nem tremer rápido (`sin(t*50)`): oscilação lenta (≤ 1,5 Hz) ou fixa; clarão de tela só véu morno ≤ 16 %.
- **Poder com o corpo certo:** bola se CHUTA (pose `kick`, sai do pé), não se joga com a mão.
- **Chefão (v4):** a estrela era reta e não alcançava o Conde → estrela GUIADA (arco até o tinteiro ou o Conde, que sente e perde vida); ESPAÇO **ou ▼** jogam; a Fada Madrinha dá as estrelas e faz as perguntas; só o chefão recomeça, e só após 7 quedas.
- **Equilíbrio (v3, SUBSTITUÍDO em v4):** ~~3 voltas de ritmo por roteiro~~ — o Paulo reprovou: "as posições ficaram artificiais… mesmo sem ver ninguém ultrapassar… magicamente volta pra 1". Handicap indicado por ele é só a INTENÇÃO; o mecanismo nunca pode ser roteiro.
- **Mérito (v4, corrida):** posição = habilidade. (1) A posição só muda quando um carro passa INTEIRO pelo outro (histerese de 1 carrinho) — e medir o herói ONDE ELE É DESENHADO (z + PLAYER_Z no pseudo-3D; o erro de 8 segmentos fazia carros "invisíveis" contarem à frente). (2) Nada de elástico nem ritmo que olha a posição do herói; o rival só depende do NÍVEL escolhido, da volta em que ELE está e da curva. (3) A criança escolhe EASY/MEDIUM/HARD. (4) ▲ acelera, ▼ freia, soltar perde; curva empurra para fora; turbo é da criança (nunca automático). (5) Portão `testa_corrida.py`: crianças perfeita/boa/fraca × 3 níveis; reprova se a habilidade ou o nível não pesam, se alguma troca de posição não foi à vista, se o EASY é difícil ou o HARD é fácil.
- **Prêmio pela pergunta (v4, biscoito):** o objeto da história se GANHA respondendo (a resposta É o objeto); errou → outra pergunta na hora; 2ª errada → entrega assim mesmo (incentiva, nunca trava).
- **Chefão (v4):** golpe = dano que se sente (pedaço da frase + tremida forte, sem pisca); estrela rebatida volta; a fada cura; tensão sonora grave cresce até o "tá quase".
- **Chefão (v5):** estrela se CONQUISTA (a fada só aparece para perguntar; certa = 3 ★); cada rodada tem ESCUDO; estrela sem escudo arranca uma LETRA que forma "YOU ARE A SUPER PLAYER" no alto — o fim tem lógica e drama.
- **Teste e publicação:**
  - teste que demorava 30 min e não jogava de verdade → crianças-robô em relógio acelerado (~15 s);
  - publicar só no `main` → o site sai do ramo `em-construcao`.

## Atualização ("melhore, se atualize")
Quando o Paulo pedir para se atualizar:
1. Pesquisar referências **abertas e seguras** (MIT/BSD/Apache/CC0) do gênero pedido: técnica, números, boas práticas de jogo infantil. O agente `guardiao` confere licença e segurança.
2. Escrever o que se aprendeu como regra ou número nesta página e na biblioteca. Subir a versão (v2, v3…) com data.
3. Se a regra puder ser verificada por código, acrescentar ao portão (`verifica_ing3.js`, `crianca_bot.js`, `testa_criancas.py`).
4. Nunca copiar arte, nome, personagem ou marca de jogo comercial. Inspiração de mecânica, sim; conteúdo, não.
