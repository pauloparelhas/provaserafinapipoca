# WiseBear Game — requisitos do Paulo (consolidado em 11/10/2026)

> Preenchido em 11/10/2026 pela v2 (ferramentas/LP3_jornada.html). Evidências: QA mudo qa_v2.py (0 erros de console, 0 falhas; 9 fases + chefão completados de ponta a ponta), verificador BFS dos 9 mapas, screenshots olhados em 4 viewports.

Checklist de aceite. Cada item precisa de EVIDÊNCIA (screenshot olhado, teste, trecho de código)
antes de o jogo ir ao ar. Fonte: as mensagens do Paulo nesta sessão, na ordem.

## Propósito (acima de tudo)
- [x] R0. O site serve para ESTUDAR PARA A PROVA. O jogo é artifício pedagógico para tornar o estudo imersivo e agradável; em ~1 h a criança zera e treinou TODO o conteúdo (`_roteiro.md`, pesos v2: ortografia ≈55%, gênero/paráfrase/paródia ≈35%, invenções ≈10%).
  - **FEITO** — 9 fases x 3 arenas (5 ou 8 perguntas; "M" = 8 rápidas) + chefão com 8 duelos ≈ 170 perguntas de um banco de 269; 7 das 9 fases são ortografia/plural/dicionário/invenções, 2 são conto + paráfrase/paródia. Tempo estimado para zerar ≈ 45-55 min (ver relatório). Código: LP3_jornada_arena.js compoe().

## Estrutura e mapa
- [x] R1. Nome visível: **WiseBear Game** (título, globo, HUD, créditos).
  - **FEITO** — "WiseBear Game" no <title>, no globo (cena.js desenhaGlobo), no mapa, no HUD (#hudName) e nos créditos. Screenshots 00_globo e 02_mapa.
- [x] R2. Abre no **globo com as Américas**, zoom no **Canadá** → mapa das fases (nada de abertura em quadros/tutorial forçado antes).
  - **FEITO** — Abre no globo (projeção ortográfica dos litorais, Canadá destacado), zoom automático em 2,6 s ou ao tocar/ENTER → mapa; customização só na 1ª vez. QA: "abre no globo", "ENTER no globo → mapa direto". Screenshots 00_globo, 00b_zoom.
- [x] R3. Urso começa na **esquerda** e avança para a direita (oeste→leste); fases em pontos geográficos/turísticos reais.
  - **FEITO** — Vancouver (esquerda) → ... → Peggy's Cove (direita), Castelo de Gelo no Ártico (alto). Nós com marco desenhado (totem, lago, celeiro, urso-polar, catarata, CN Tower, Parlamento, bordo, farol). LP3_jornada_fases.js LISTA; screenshot 02_mapa.
- [x] R4. **Nenhuma fase trancada** (inclusive o chefão); a próxima sugerida só fica destacada.
  - **FEITO** — faseLiberada() devolve sempre true; chefão mostra "fases: n/9"; a próxima sugerida tem anel pulsante. QA: "nenhuma fase trancada (chefão e 5 liberados)".
- [x] R5. **Hover / 1º toque no nó mostra o CONTEÚDO da fase** (regra + exemplos destacados + nº de perguntas). Curiosidade do Canadá no máximo 1 linha discreta.
  - **FEITO** — Cartão DOM #mapCard: nome · lugar · ideia da fase (1 linha), nº de arenas/perguntas, regra + exemplos destacados por tema (LP3_jornada_regras.js, texto do _roteiro.md), botão Jogar. Hover (mouse) e 1º toque mostram; 2º toque/Enter entra. QA: "hover muda o nó e o cartão", "1º toque só seleciona". Screenshot 02b_mapa_hover_churchill.
- [x] R6. Customização rápida do urso no início (uniforme, mochila de costas/rodinhas, lancheira, chapéu, óculos…), reaberta por botão; visual aparece no jogo, mapa e arenas.
  - **FEITO** — Tela "Monte o seu urso" (uniforme 8 cores, mochila costas/rodinhas, lancheira, chapéu boné/gorro/coroa/laço, óculos, cachecol) com preview ao vivo no canvas; salvo em lp3_jornada_v2.look; botão "Visual do urso" no mapa; o look é usado na fase, no mapa e na arena (A.LOOK). Screenshot 01b_custom_escolhido; QA "visual salvo em localStorage".

## Jogabilidade (o Paulo achou a v1 "ridícula": uma cena que se repete para sempre)
- [ ] R7. **Cada fase é DIFERENTE** em layout, mecânica principal, obstáculos, inimigos e música — não só o fundo. Nenhum trecho repetido em loop; nada de "o mesmo desafio sempre".
  - **PARCIAL** — 9 mapas desenhados à mão (LP3_jornada_mapas.js, 9 mundos + 9 submundos, verificador BFS): Vancouver = troncos na água + maré; Banff = escalada vertical de 30 linhas com elevador e avalanche; Pradarias = vento + fardos + molas; Churchill = gelo + patins + ursos-polares; Niágara = subir a cachoeira (vertical, plataformas que caem, barris); Toronto = CN Tower vertical com elevadores e porta da biblioteca; Ottawa = canal congelado com pingentes; Quebec = muralhas com canhões de neve e porta do Château; Peggy's Cove = noite, farol que revela plataformas, maré. Música por mundo com timbre/tom próprios. PARCIAL: os submundos são variações de 3 estilos visuais (caverna/gelo/mina); canoa e cipó não entraram.
- [ ] R8. Fases desenhadas com começo, meio e fim próprios, verticalidade, caminhos alternativos, segredos.
  - **PARCIAL** — Começo/meio/fim com checkpoints, 3 fases verticais (Banff, Niágara, Toronto), segredos (moeda grande em pontos altos, submundo por cano, plataformas escondidas no farol). PARCIAL: caminhos alternativos ainda são poucos (desvio pelo cano, atalhos de mola/elevador).
- [ ] R9. **Canos e submundos** (entrar com ↓), escadas, portas, espelhos como entradas de desafios.
  - **PARCIAL** — Canos (↓) com par no submundo em todas as fases; PORTA "D" (↓) como entrada de arena em Toronto e Quebec. Escadas e espelhos não entraram.
- [x] R10. Obstáculos variados: plataformas móveis/que caem, molas, espinhos, pingentes, troncos rolando, gelo escorregadio, vento, água; dificuldade crescente (8 anos, sem game over).
  - **FEITO** — Plataformas móveis (m), elevadores (N), que caem (f), molas (S), espinhos (^), pingentes (v), troncos/bolas/barris rolando (T/K), gelo (gelo:true), vento (vento:true), água/maré (W), canhões (C). Dificuldade crescente; cair/encostar = checkpoint, sem game over. LP3_jornada_motor.js perigos().
- [x] R11. **3 tamanhos do urso** (bebê, normal, grande): pote de mel cresce; bicho encosta → diminui; bebê tocado → volta ao checkpoint.
  - **FEITO** — TAM=[.72,1,1.25]; mel → cresce (pegaItem); bicho encosta → machucado() encolhe com 1,7 s de invencibilidade piscando; bebê tocado → caiu() (checkpoint).
- [x] R12. Poderes lúdicos com uso real na fase (capa planar, bota pulo duplo, patins, pinhas/bolas de neve para arremessar).
  - **FEITO** — Capa (planar segurando PULAR), bota (pulo duplo), patins (gelo não escorrega: Churchill/Ottawa), pinhas (3 arremessos, X/ENTER ou botão ARREMESSAR). Postos nos mapas onde abrem caminho (bota em Quebec sobre a mola, capa na Pradaria).
- [x] R13. Animação de qualidade (squash & stretch, poeira, transições íris, câmera suave, partículas).
  - **FEITO** — Squash & stretch no pulo/aterrissagem (u.sx/u.sy), poeira ao andar/pousar, brilho das moedas, tremor de câmera, íris circular entre cenas (A.iris), câmera com suavização X e Y, partículas de clima por cena.
- [x] R14. Trilha **agradável** (a v1 era "insuportável"), por mundo, 32+ compassos; música separada dos efeitos.
  - **FEITO** — Sequenciador próprio (LP3_jornada_musica.js) com 8 peças em notação compacta (LP3_jornada_partituras.js): mapa, bosque, gelo, cidade, submundo, arena, chefão, vitória — todas com 32 compassos (loops de 53 a 84 s), acordes/baixo/arpejo/pad/percussão suave, timbres filtrados com ADSR, eco + reverb. Validado por código (compila: 32 compassos, faixa 52-1760 Hz). Música e Efeitos separados no menu de pausa (lp3_musica / lp3_sfx).

## Perguntas = parte do jogo
- [x] R15. Bater na "?" / entrar no cano/porta → **ARENA própria** (não um box simples): música **tensa**, **contador regressivo**, **≥5 perguntas em sequência**, **peixe por acerto** (combo), meta de acertos para sair; ortografia em **rodadas rápidas e numerosas**.
  - **FEITO** — ARENA (LP3_jornada_arena.js): palco temático, música "arena" (144 bpm), cronômetro na barra do quadro (12 s rápida / 20 s conceito / 25 s leitura), 5 perguntas (8 nas caixas "M", só rápidas), peixe voando até o urso, que come; combo +25 por acerto seguido; meta 4/5 ou 6/8. Screenshots fase_1_arena_intro e fase_1_arena_pergunta.
- [x] R16. Errou: feedback curto (certa acesa + 1 linha), som; não atingiu a meta → repete com outras perguntas.
  - **FEITO** — Errou/tempo esgotado: certa acesa + 1 linha de explicação, som de erro, segue em 3 s (ou OK). Não bateu a meta: "Quase lá!" e repete com outras perguntas (compoe() sem repetir ids). Screenshot fase_1_arena_errou.
- [x] R17. **Obrigatório**: a fase só termina com todas as arenas concluídas; pontos somam; aviso + seta para o desafio que falta.
  - **FEITO** — Mastro trancado (cadeado desenhado) até todas as arenas; toast "Saída trancada... siga a seta" + seta indicadora para a arena que falta ("está no submundo: entre pelo cano"); pontos somam no HUD. QA: "saída trancada com seta" em todas as fases. Screenshots fase_*_trancada.
- [x] R18. **Setinha + frase** perto de tudo que é interativo ("Aperte ↓ para entrar no cano"…).
  - **FEITO** — dicas() em motor2.js: setinha pulsante + frase curta perto de caixa, cano, porta, mola, item, tijolo; só quando o urso está perto. Botões ↓ e ARREMESSAR no toque.
- [x] R19. Perguntas inequívocas e que preparam para a prova (banco `LP3_banco.js`); nada de vilão para o Gigante; adequação à idade (sem sílaba CU solta, "devorar", sem "pau no gato").
  - **FEITO** — Banco lido em tempo de execução, alternativas embaralhadas; nome do tema vem de LP3.TEMAS; grep de "CU" solto, "pau no gato", "cuca", "te comer" = zero nos arquivos do jogo; o Gigante nunca é chamado de vilão nos textos do jogo.

## Interface (celular/tablet)
- [x] R20. **Tela limpa**: explicação dos controles só no início e num botão "?" de ajuda; nada fixo atrapalhando.
  - **FEITO** — HUD: casa, cadeado, ajuda "?", nome da fase, arenas, pontos, moedas, pausa — e só. Legenda de teclas só no Treino (balões) e no painel "Como jogar" (botão ?). Som/música/voz foram para o menu de pausa.
- [x] R21. **Tela cheia com cadeado** (não sair sem querer; destravar = ação de adulto).
  - **FEITO** — Botão cadeado → doLock() do serafina-core (fullscreen + trava do histórico + body.locked esconde a casa); destravar = segurar o cadeado 2 s → overlay de desbloqueio do core. Esc do fullscreen: re-entra no próximo toque. QA: "cadeado trava a tela", "segurar 2 s abre o pedido de destravar". iOS sem Fullscreen API: a trava do jogo funciona mesmo assim.
- [x] R22. **Sair da fase** a qualquer momento → mapa ou globo, com confirmação.
  - **FEITO** — Menu de pausa (Esc/botão): "Sair para o mapa" e "Menu inicial" com confirmação curta; progresso das fases concluídas fica salvo. QA: "sair da fase pelo menu de pausa volta ao mapa". Screenshots 03d_pausa, 03e_confirma_sair.
- [x] R23. Toque (◀ ▶ ↓ PULAR) + teclado (←→/AD, ↑/W/Espaço, ↓/S, Enter, 1-4, Esc); tutorial ensina os dois.
  - **FEITO** — Toque ◀ ▶ ▼ PULAR (+ARREMESSAR); teclado ←→/AD, ↑/W/Espaço, ↓/S, X/Enter, 1-4 e A-D nas alternativas, Esc. Treino (nó T) ensina com balões mostrando teclas e botões.
- [x] R24. Diagramação caprichada do quadro de pergunta, HUD e placar; legível em tablet.
  - **FEITO** — Quadro da pergunta: Nunito, etiqueta do tema colorida, pergunta 26 px, cartões A/B/C ≥ 64 px, barra de tempo, peixes/meta, dica e ouvir (SVG); painéis de fim de arena/fase com estrelas animadas e placar; conferido em 1280x800, 1024x768, 768x1024 (aviso "gire o tablet") e 915x412.


## 2ª rodada (11/10/2026, depois de o Paulo jogar a v2)
Evidências: QA mudo `qa_v2.py` (0 falhas, 0 erros de console, 9 fases + chefão de ponta a ponta), verificador BFS `verifica_niveis.js` com passe de TRAVAS FECHADAS, screenshots olhados.

- [x] 1. **30 segundos para toda pergunta.**
  - **FEITO** — `LP3_jornada_arena.js` `limite()` devolve 30 para qualquer tipo; barra e número do quadro partem de 30. QA: "cronômetro de 30 s (lim=30, mostra 30)" em todas as fases.
- [x] 2. **Errou → popup de teoria (cronômetro parado).**
  - **FEITO** — `LP3_jornada_ui4.js` `UI.teoria()`: etiqueta do tema (nome de `LP3.TEMAS`), regra em 1-2 frases + 3-5 exemplos com a parte-chave destacada (`LP3_jornada_regras.js`), a resposta certa daquela pergunta e o porquê (campo `ex`), botão de ouvir (Thalita via `say()`), "Explicar mais" que expande as telinhas da lição do mesmo tema (`LP3_estudo_licoes.js` + `LP3_arte.js` carregados no jogo: telas palavras/texto/pares, com palavras destacadas, U quietinho e H mudo) e "Entendi" (segue). Temas sem lição (ex.: Chapeuzinho) mostram só "Entendi". O cronômetro não anda na fase de feedback (QA: "cronômetro parado no popup"). Vale também no duelo do chefão. Screenshots fase_*_arena_teoria e _teoria_mais.
- [x] 3. **Nada de chegar ao fim sem responder.**
  - **FEITO** — Destaque: toda caixa ?/M, porta e cano que leva à arena do submundo pendente tem brilho pulsando + seta grande animada com rótulo ("arena ?", "porta ?", "arena no cano") — `A.destaque` em `LP3_jornada_arte2.js`. Travas: tiles `G` (abre com as arenas anteriores) e `X` (abre com a arena do submundo) nos 9 mapas (`LP3_jornada_mapas.js`), paredes de 8 tiles com cadeado e "?" que viram sólidas até abrir (`LP3_jornada_motor.js` `bateTrava/abreTravas`); ao bater: "Primeiro: bata na caixa ? (pule embaixo dela)" / "Primeiro: entre no cano e vença a arena do submundo" + seta. No submundo o cano 2 só abre depois da arena. Mastro continua trancado como segurança. Verificador: com travas fechadas o mastro é inalcançável em 9/9; com travas abertas tudo completável (10/10). QA: "andar direto para a direita → bloqueado na trava", "cano 2 do submundo só abre depois da arena". Screenshots 05_trava_bloqueio, 06d_sub_cano_trancado.
- [x] 4. **Instrução clara de como entrar, balão inteiro na tela.**
  - **FEITO** — `desenhaDica()` em `LP3_jornada_cena.js`: "Pule embaixo e bata a cabeça na caixa ?" (teclas ↑ ESPAÇO + botão PULAR), "Entre no cano: aperte ↓" (↓ S + ▼), "Entre na porta: aperte ↓"; o balão é preso às bordas (clamp em X e Y) e o gancho `__lp3.dicaRect` é conferido pelo QA em 1280×800, 1024×768, 915×412 e 768×1024 ("balão inteiro"). Screenshots 06_dica_caixa, 06b_dica_cano, 06c_dica_porta, vp_*_dica.
