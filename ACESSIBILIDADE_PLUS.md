# Acessibilidade Plus — Padrao Obrigatorio para Ferramentas ELA

## Conceito
Conjunto de recursos de acessibilidade para atividades em ingles (ELA), facilitando o aprendizado de L2 para crianca de 7 anos.

---

## 1. Idioma na Tela vs Tooltip
- **Tela:** TUDO em ingles (nomes, roles, instrucoes, feedback, botoes)
- **Tooltip (hover):** Traducao em portugues via atributo `data-pt`
- **Desktop:** CSS `::after` com `@media(hover:hover)` — tooltip aparece no hover
- **Mobile/Tablet:** Long-press (500ms) mostra `.touch-tooltip` (auto-dismiss 2.5s)
- Tooltip posiciona acima do elemento; se nao cabe, vai abaixo
- Tooltip estilizado com bandeira BR, animacao suave

## 2. Karaoke TTS — Sincronia Garantida
- **Mecanismo:** Cada palavra e uma `SpeechSynthesisUtterance` individual
- Garantia 100% de sincronia: palavra so destaca quando esta sendo falada
- Pausa de 80ms entre palavras (natural para crianca)
- Barra de karaoke fixa na parte inferior (`#karaokeBar`)
- 3 estados visuais: `.kw` (nao lida, dim), `.kw-active` (lendo, gradiente brilhante), `.kw-done` (lida, fundo sutil + borda)
- Rate: **0.55**, Pitch: 1.1, lang: en-US
- `stopKaraoke()` cancela tudo ao trocar de tela
- `karaokeActive` flag previne conflitos

## 3. Botao de Som (speak-btn) com Karaoke
- Cada card/opcao clicavel tem botao speak azul redondo
- Ao clicar: abre barra de karaoke e le o texto em ingles
- Auto-read ao virar flashcard, ao exibir quiz question, ao dar feedback

## 4. Navegacao Livre (Voltar/Avancar)
- TODA fase tem botoes "Phase X" para ir e voltar entre fases
- Crianca pode navegar livremente mesmo sem terminar a atividade
- Botoes persistentes no `.phase-nav` abaixo do conteudo de cada fase

## 5. Palavra-Chave Destacada
- Cada profissao tem `keyword` (ingles) e `keywordPT` (portugues)
- Palavra-chave aparece em destaque: cor amarela (#fbbf24), negrito, sublinhado wavy
- Classe CSS: `.kw-hl`
- Ajuda a crianca a associar a profissao com o conceito principal

## 6. Matching — Desktop vs Mobile
- Colunas SEMPRE lado a lado (NUNCA empilhar em coluna)
- Drop target = **card inteiro** (nao apenas a zona de texto pequena)
- **Desktop:** drag-and-drop classico (`draggable`, dragover/drop events)
- **Mobile/Tablet:** TAP-TO-SELECT em 2 passos:
  1. Tocar numa role chip → fica `.selected` (borda roxa + glow)
  2. Tocar num helper card → role e colocada ali
- Instrucao muda conforme dispositivo ("Drag..." vs "Tap...")
- `isTouchDevice` detecta automaticamente

## 7. Responsividade — Caber numa So Tela
- `@media(max-width:500px)` com tamanhos compactos para TODOS os elementos
- Navbar: botoes 28px, fontes menores
- Flashcards: grid 3 colunas, cards menores, emojis/fontes reduzidos
- Matching: items com min-height 46px, fontes .55-.6rem, speak-btn 20px
- Quiz: grid 2x2 SEMPRE (nunca 1 coluna), opcoes menores
- Karaoke bar: fonte .9rem, padding menor, bottom 20px
- Viewport: `100dvh` (dynamic viewport height, desconta barra do navegador)
- JAMAIS `flex-direction:column` no matching em mobile

## 8. Estrutura de Dados
Cada helper deve ter:
```javascript
{
  name: 'English Name',
  namePT: 'Nome em Portugues',
  emoji: '...',
  role: 'English role description.',
  rolePT: 'Descricao em portugues.',
  keyword: 'englishKeyword',
  keywordPT: 'palavraChavePT'
}
```

## 9. CSS Necessario
- `[data-pt]` — tooltip com `:hover::after` (dentro de `@media(hover:hover)`)
- `.touch-tooltip` — tooltip mobile via long-press JS
- `.kw-hl` — destaque de palavra-chave
- `.karaoke-bar` — barra fixa inferior para karaoke
- `.karaoke-bar .kw` / `.kw-active` / `.kw-done` — 3 estados de palavra
- `.role-chip.selected` — chip selecionado no mobile (borda roxa + glow)
- `.match-helper.drag-over` — feedback visual ao arrastar sobre card
- `.phase-nav` — container dos botoes de navegacao entre fases
