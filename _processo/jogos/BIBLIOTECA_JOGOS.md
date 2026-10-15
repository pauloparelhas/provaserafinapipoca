# Biblioteca de engenharia de jogos (crianças de 7–8 anos, HTML/canvas)

Versão **v1 · 18/10/2026**. Nasceu do jogo **The Lost Endings** (ING3).
É a base para os próximos jogos e, no futuro, para um "estúdio" em que a própria criança monte o jogo dela (ideia tipo CodeSpark).
Cada gênero abaixo diz:
- o que a criança faz;
- os números que funcionam;
- onde o código já existe;
- de onde veio a inspiração (somente projetos de licença aberta, reescritos aqui, sem copiar arte nem marca).

> Regra de ouro: **nada é intransponível, nada surge do nada, poder se ganha na fase e explica para que serve, texto curto, sem punição dura.**
> O teste é a criança-robô (`trabalho/3tri_ingles/gen/portao_jogo.sh`). Sem APROVADA, nada vai ao ar.

## Números do motor (física medida)
| Medida | Valor | Consequência no desenho da fase |
|---|---|---|
| Tile | 45 px | — |
| Pulo normal | 152 px (3,4 tiles) | Muro sem degrau: no máximo **3 tiles** |
| Alcance do pulo correndo | ~4,8 tiles | Buraco: no máximo **3 tiles** |
| Pulo duplo (botas) | +~2 tiles | É bônus, **nunca requisito** |
| Mola | 7,7 tiles | Depois da mola não pode ter buraco nem água logo na queda |
| Velocidade de andar | 270 px/s | Uma fase de 130 tiles se anda em ~1 min |

## Regras de dificuldade (checadas pelo portão)
- **R1, ilha:** entre dois buracos, pelo menos **3 tiles** de chão.
- **R2, inimigo antes do precipício:** nenhum inimigo andando a até 4 tiles antes de um buraco. Arremessador ou canhão: até 6 tiles.
- **R3, muro:** pilha de 4 ou mais tiles só com degrau, plataforma, mola ou aparelho nos 5 tiles antes.
- **R4, buraco:** no máximo 3 tiles. Fosso que mata não fica embaixo de aparelho (argola, trave, blocos do ritmo): cair do aparelho é voltar ao chão.
- **R5, origem:** todo projétil ou coisa que cai tem fonte desenhada e aviso de ~0,6 s ou mais. Rolante e canhão só disparam com a fonte na tela.
- **R6, poder:** o poder fica num móvel, antes da 1ª porta. Cartão de no máximo 22 palavras, dica ao passar o mouse ou tocar, visual no herói em **todas** as poses.
- **R7, texto:** balões de até ~12 palavras. Nada cobre a pergunta nem o caminho. Bandeira BR traduz **também** o que está desenhado no canvas.
- **R8, controle parental:** sem duplo sentido (o esguicho de leite foi banido), sem arma, sem ferimento, sem rede, sem compra, sem coleta de dados.

## Gêneros

### 1. Plataforma lateral, só para a direita (Vila, Floresta, Biscoito)
- **A criança:** anda, pula, pisa nas manchas, entra em portas ▼, usa o poder com ESPAÇO.
- **Ritmo:** trecho calmo → porta (perguntas) → desafio → checkpoint, três vezes, e no fim um mini-chefe que se vence pisando.
- **Código:**
  - `ING3_jogo_motor.js` (física);
  - `ING3_jogo_fases.js` (tiles);
  - `ING3_jogo_poderes.js` (poder do reino, fontes dos perigos);
  - `ING3_jogo_aparelhos.js` (cipó, argola, barra, trave, salto, blocos do ritmo);
  - mapas em `gen_mapas*.py`.
- **Inspiração aberta:** física de plataforma no estilo dos tutoriais MIT do MDN e do Phaser (pulo de altura variável, buffer de pulo, coyote time).

### 2. Água, nado (Recife)
- A criança começa **fora** d'água, pega a roupa (▼) e **toca** o pulo para subir; a roupa fica no herói em todas as poses.
- Perigos lentos e espaçados (água-viva com período ≥ 3,4 s, no máximo 2 por trecho). Sem espinho no fundo.

### 3. Voo (Céu)
- A criança começa andando e pega a capa. Segurar o pulo sobe; soltar desce **devagar** (≤ 105 px/s).
- Tempestade: aviso ≥ 1,3 s e raio ≤ 0,7 s.
- O livro do fim vale sobrevoando (zona alta).

### 4. Corrida 2,5D, estilo Enduro / OutRun (Corrida)
- **A criança:** acelera sozinha; ◀ ▶ trocam de faixa; ▲ turbo.
- **Câmera:** atrás, sem girar (evita tontura).
- **Herói:** mais rápido que todos os rivais. Rivais erram à vista. Todos param no box o mesmo tempo, e o box só serve para as perguntas.
- **Código:** `ING3_jogo_corrida.js` (técnica de segmentos projetados) e `ING3_jogo_carrinhos.js` (carrinhos de costas).
- **Inspiração aberta:** jakesgordon/javascript-racer (MIT), técnica reescrita.

### 5. Cena de esporte com pergunta (Estádio: pênalti)
- A resposta vira a jogada: certa = gol, errada = defesa. A pergunta avança sozinha.
- **Código:** `ING3_jogo_penalti.js`.

### 6. Chefão por rodadas (Castelo)
- **Abertura:** no máximo 3 telas curtas. Objetivo sempre na tela.
- **Rodadas diferentes:** acertar o alvo, pisar nas manchas, subir a escada de letras. Cada rodada termina num duelo de perguntas.
- **Regras:** ataques **não certeiros**, com sombra. Alvo alcançável com um pulo.
- **Código:** `ING3_jogo_chefao.js`.

### 7. História circular (Biscoito)
- Os objetos do livro, pegos andando, acendem a **roda da história** no topo. O fim volta ao começo, na mesma mesa.
- Um único poder útil (jogar biscoito). Os outros objetos têm efeito **imediato e visível** (vassoura varre, fita conserta a ponte) ou são só história.

## Ideias prontas para os próximos jogos (gêneros ainda não feitos)
| Gênero | Para a criança | Base técnica sugerida |
|---|---|---|
| Subida vertical (tipo Doodle Jump) | Pula de plataforma em plataforma para cima | O mesmo motor, com câmera em Y |
| Labirinto com chave | Pega a chave e abre a porta | Grade de tiles e busca BFS (o mesmo portão) |
| Ritmo / música | Toca no tempo da batida | Relógio do `ING3_jogo_aparelhos.js` (blocos do ritmo) |
| Montar e consertar | Arrasta peças | Drag-and-drop do `CIE2_dragdrop` |
| Estúdio da criança (CodeSpark) | Monta a própria fase com blocos | Os mapas já são texto: um editor de tiles com os mesmos símbolos e o mesmo portão |

## Como esta biblioteca se atualiza
Ver `PREPROMPTS.md`, seção "Atualização".
