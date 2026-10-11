# WiseBear Game — requisitos do Paulo (consolidado em 11/10/2026)

Checklist de aceite. Cada item precisa de EVIDÊNCIA (screenshot olhado, teste, trecho de código)
antes de o jogo ir ao ar. Fonte: as mensagens do Paulo nesta sessão, na ordem.

## Propósito (acima de tudo)
- [ ] R0. O site serve para ESTUDAR PARA A PROVA. O jogo é artifício pedagógico para tornar o estudo imersivo e agradável; em ~1 h a criança zera e treinou TODO o conteúdo (`_roteiro.md`, pesos v2: ortografia ≈55%, gênero/paráfrase/paródia ≈35%, invenções ≈10%).

## Estrutura e mapa
- [ ] R1. Nome visível: **WiseBear Game** (título, globo, HUD, créditos).
- [ ] R2. Abre no **globo com as Américas**, zoom no **Canadá** → mapa das fases (nada de abertura em quadros/tutorial forçado antes).
- [ ] R3. Urso começa na **esquerda** e avança para a direita (oeste→leste); fases em pontos geográficos/turísticos reais.
- [ ] R4. **Nenhuma fase trancada** (inclusive o chefão); a próxima sugerida só fica destacada.
- [ ] R5. **Hover / 1º toque no nó mostra o CONTEÚDO da fase** (regra + exemplos destacados + nº de perguntas). Curiosidade do Canadá no máximo 1 linha discreta.
- [ ] R6. Customização rápida do urso no início (uniforme, mochila de costas/rodinhas, lancheira, chapéu, óculos…), reaberta por botão; visual aparece no jogo, mapa e arenas.

## Jogabilidade (o Paulo achou a v1 "ridícula": uma cena que se repete para sempre)
- [ ] R7. **Cada fase é DIFERENTE** em layout, mecânica principal, obstáculos, inimigos e música — não só o fundo. Nenhum trecho repetido em loop; nada de "o mesmo desafio sempre".
- [ ] R8. Fases desenhadas com começo, meio e fim próprios, verticalidade, caminhos alternativos, segredos.
- [ ] R9. **Canos e submundos** (entrar com ↓), escadas, portas, espelhos como entradas de desafios.
- [ ] R10. Obstáculos variados: plataformas móveis/que caem, molas, espinhos, pingentes, troncos rolando, gelo escorregadio, vento, água; dificuldade crescente (8 anos, sem game over).
- [ ] R11. **3 tamanhos do urso** (bebê, normal, grande): pote de mel cresce; bicho encosta → diminui; bebê tocado → volta ao checkpoint.
- [ ] R12. Poderes lúdicos com uso real na fase (capa planar, bota pulo duplo, patins, pinhas/bolas de neve para arremessar).
- [ ] R13. Animação de qualidade (squash & stretch, poeira, transições íris, câmera suave, partículas).
- [ ] R14. Trilha **agradável** (a v1 era "insuportável"), por mundo, 32+ compassos; música separada dos efeitos.

## Perguntas = parte do jogo
- [ ] R15. Bater na "?" / entrar no cano/porta → **ARENA própria** (não um box simples): música **tensa**, **contador regressivo**, **≥5 perguntas em sequência**, **peixe por acerto** (combo), meta de acertos para sair; ortografia em **rodadas rápidas e numerosas**.
- [ ] R16. Errou: feedback curto (certa acesa + 1 linha), som; não atingiu a meta → repete com outras perguntas.
- [ ] R17. **Obrigatório**: a fase só termina com todas as arenas concluídas; pontos somam; aviso + seta para o desafio que falta.
- [ ] R18. **Setinha + frase** perto de tudo que é interativo ("Aperte ↓ para entrar no cano"…).
- [ ] R19. Perguntas inequívocas e que preparam para a prova (banco `LP3_banco.js`); nada de vilão para o Gigante; adequação à idade (sem sílaba CU solta, "devorar", sem "pau no gato").

## Interface (celular/tablet)
- [ ] R20. **Tela limpa**: explicação dos controles só no início e num botão "?" de ajuda; nada fixo atrapalhando.
- [ ] R21. **Tela cheia com cadeado** (não sair sem querer; destravar = ação de adulto).
- [ ] R22. **Sair da fase** a qualquer momento → mapa ou globo, com confirmação.
- [ ] R23. Toque (◀ ▶ ↓ PULAR) + teclado (←→/AD, ↑/W/Espaço, ↓/S, Enter, 1-4, Esc); tutorial ensina os dois.
- [ ] R24. Diagramação caprichada do quadro de pergunta, HUD e placar; legível em tablet.
