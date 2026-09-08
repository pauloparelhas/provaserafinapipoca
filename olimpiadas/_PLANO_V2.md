# PLANO V2 — Olimpíada de Português · Categoria G · prova 10/09/2026

Escrito em 08/09 à noite, depois da crítica do dono. Substitui `_PLANO.md` no que
conflita; o que não é citado aqui (taxonomia das famílias, comentário de erro em 4 partes,
banco com origem citada) continua valendo. Aparelho-alvo: tablet em retrato, 810×1080.

Arquivos lidos para este plano: `ferramentas/OP_truques.html` (422 linhas),
`ferramentas/OP_simulado.html` (535), `ferramentas/OP_data.js` (1044 linhas, 44 itens no
momento da leitura), `index.html`, `olimpiadas/_PLANO.md`, `olimpiadas/_AUDITORIA_BANCO.md`,
`olimpiadas/trabalho/reserva_2024F2.js` (14 itens), `_fontes/DOSSIE_2023/2024/2025.md`,
`ferramentas/assets/` (three.module.js, react.production.min.js e react-dom.production.min.js
18.3.1 já baixados às 19:02 de hoje), `sw.js`.

---

## 1. Densidade — o que ocupa tela sem entregar conteúdo

### 1.1 Medição do estado atual (tablet 810×1080, retrato)

Em `OP_truques.html` linhas 48-56 e `OP_simulado.html` linhas 63-72, o bloco
`@media(min-width:700px)` faz três coisas: `:root{--fs:1.12}`, `.card{max-width:900px;
padding:30px 34px}` e `.stage{padding:22px clamp(18px,4vw,40px) 110px}`. A 810px, `4vw`=32px.
Tudo abaixo é derivado desse CSS (fonte Nunito 800/900, ~0,55em por caractere).

**Moldura fixa (não rola, em todas as telas):**

| Elemento | Onde no código | Altura |
|---|---|---|
| `.topbar` (botão 44px + padding 10+10) | truques L37-39 | 64 px |
| `.bar` de progresso | L41 | 8 px |
| `.stage` padding-top | L50 | 22 px |
| `.card` padding-top | L51 | 30 px |
| `.qnav` fixa (48 + 9 + 9) | L168-170 | 66 px |
| `.regcontrol` fixa (48 + 9 + 9 + `.reghint` 2 linhas ≈ 36 + gap) | L113-119 | ≈ 110 px |
| **Total quando há régua** | `body.regua .stage{padding-bottom:178px}` L120 | **≈ 300 px = 28% da altura** |

**Largura:** stage 32+32 e card 34+34 consomem 132 px dos 810 (16%); o texto corre em 678 px.

**Preâmbulo do cartão "Ler e entender" antes de a primeira pergunta aparecer** (função
`render()`, truques L252-263, na ordem do DOM):

| Elemento | CSS | Altura estimada |
|---|---|---|
| `.chead` (número 40px + h2) | L75-77 | 44 px |
| `.tempo` "truque 2 de 9 · uns 4 minutos" | L78 | 27 px |
| `.truquebox` (1.2rem×1.12 = 21,5px, lh 1,45, padding 15+15, 2 linhas) | L79-80 | 106 px |
| `.speak` "Ouvir o truque" (pílula 44px centralizada + margem) | L150-151 | 54 px |
| `.corpo` (17,6px × 1,6, ~3 linhas) | L81 | 98 px |
| `.extras` (4 itens × 50px + margem) | L82-85 | 216 px |
| `.sec` "Veja como se faz" (margem 20 + 11 + 9) | L86-88 | 40 px |
| `.orig` | L89 | 20 px |
| **Preâmbulo** | | **≈ 605 px** |

Espaço útil entre moldura de cima (124) e de baixo (176): 780 px. O preâmbulo come 605.
O poema de 8 linhas do exemplo (`.lin`: 20,6px × 1,6 + padding 7+7 = **51 px por linha**,
L107-109) tem 408 px + 44 de caixa. Resultado: **a primeira dobra termina na 3ª linha do
poema**; pergunta, alternativas e "Agora você" ficam a 1 e 2 telas de rolagem. Altura total
do cartão ≈ 2 200 px.

No cartão 0 (régua, exemplo `24F1Q12` com 12 linhas): preâmbulo sem extras ≈ 390 px + poema
12×51 = 612 px. **Só o poema já não cabe na dobra**: a criança rola no meio da leitura com a
régua — o gesto que a régua existe para evitar.

No simulado, questão sem texto (ex.: `25F1Q6`): cabeçalho 32 + orig 21 + enunciado 68 +
pergunta 80 + speak 54 + 4 alternativas × 72 = 543 px. **Cabe.** Questão com texto de 12
linhas: 93 + 656 = 749 px e as alternativas nascem escondidas (L361). O simulado está no
limite; o problema grave é o cartão de truque e a barra fixa da régua.

### 1.2 O que sai (zero de perda de conteúdo)

| Sai | Motivo | Ganho |
|---|---|---|
| `.tempo` ("truque 2 de 9 · uns 4 minutos") | metalinguagem; a barra de progresso já diz onde ela está | 27 px |
| `.corpo` (texto introdutório de cada cartão, `CARTOES[].texto`) | repete o truque em prosa; a criança não lê teoria (o próprio `_PLANO.md` §2 disse isso) | 98 px |
| `.speak` como pílula de linha inteira (2 por cartão) | vira ícone de 40×40 na ponta direita do próprio `.truquebox` e da `.pede` | 108 px |
| Cartão 0 e a barra fixa `.regcontrol` | ver §2 | 110 px fixos + 178 de `padding-bottom` |
| `.sec` + `.orig` como dois blocos | fundem-se numa linha de 20 px: "Prova 2025 · 1ª fase · questão 13" | 40 px |
| Tela de índice separada (`indice()`, L220-239) com h1 + parágrafo de 2 linhas | vira faixa de 8 fichas numeradas colada sob a topbar (§3.1) | 1 tela inteira |
| `.extras` além de 2 por cartão | as demais sub-dicas já vivem como `dica` de cada item e aparecem no popup | ≥ 100 px |
| Na home: `.calm`, `.kicker`, mascote, badge de mês, emojis como ilustração | preliminares; o dono pediu objetividade e o projeto proíbe emoji como ilustração | ≈ 260 px |

### 1.3 O que encolhe e quanto

| Regra | Hoje | Passa a | Efeito |
|---|---|---|---|
| `--fs` no tablet | 1,12 (L49) | **1,0** (A+/A- continua para quem quiser mais) | −11% em todo texto |
| `.card` | max 900, padding 30/34 | **max 760, padding 18px 20px** | texto corre em 742 px em vez de 678 (+9%) |
| `.stage` padding | 22 / 32 / 110 | **12px 14px 80px** | −10 px acima, −36 nas laterais |
| `.topbar` | 64 px | **52 px** (botões 40) | −12 px |
| `.lin` (linha de poema) | 20,6px × 1,6 + 14 = 51 px | **18px × 1,45 + 8 = 34 px** | poema de 12 linhas: 408 px em vez de 612 (−33%) |
| `.truquebox` | 21,5px, padding 15 | **19px, padding 10px 44px 10px 12px** (ícone de ouvir à direita, dentro) | 2 linhas = 75 px em vez de 106 |
| `.extras li` | caixa 50 px | **linha simples com travessão, 24 px, máximo 2** | 48 px em vez de 216 |
| `.opt` | min 62 + gap 10 | **min 52 + gap 8** (alvo de toque ≥ 44 mantido) | 4 alternativas: 240 px em vez de 288 |
| `.fb` (comentário de erro) | padding 22, 4 caixas com margens 12 | **padding 14, margens 8** | ≈ −60 px |

**Prova de que a meta é atingida** (cartão "Ler e entender" novo, exemplo `25F1Q13` de 8
linhas): moldura 52+8+12+18 = 90 · cabeçalho 40 · truquebox 75 · 2 extras 48 · linha de
origem 20 · poema 8×34+16 = 288 · pergunta 56 · 4 alternativas 240 · nav inferior 60 =
**917 px < 1080**. A criança começa a trabalhar sem rolar. Com o poema de 12 linhas
(`24F1Q12`) dá 1 053 px: ainda cabe. No simulado, questão sem texto: ≈ 470 px; com texto de
12 linhas: ≈ 900 px, alternativas visíveis (§2).

---

## 2. A régua

**Diagnóstico honesto.** A régua resolve um problema real (a mãe: "pula linha o tempo
todo") mas eu a promovi a conteúdo: virou o cartão 0 (`OP_data.js`, `CARTOES[0]`, k:'regua'),
a primeira frase do índice ("Comece pelo número 0: ele é o mais importante de todos",
truques L235), a frase da home (`.calm`, index L229-233) e um portão: no simulado as
alternativas nascem com `display:none` enquanto `temRegua && !it.feito` (simulado L361) e só
aparecem em `abreOpcoes()` depois de a criança descer linha por linha (L386-408). No cartão de
truque a resolução também nasce escondida (`#resolve style="display:none"`, truques L284).
Isso é fricção obrigatória em 11 das 44 questões do banco (as que têm `texto` com 3+
linhas). O dono tem razão: apoio de leitura não pode ser pedágio.

**Decisão: a régua deixa de ser cartão, deixa de ser portão e vira comportamento do texto.**

1. **Sai o cartão 0.** A sessão teórica começa em "Ler e entender". A régua aparece como a
   segunda das duas dicas desse bloco: "Leia com o dedo embaixo da linha; a linha acaba, o
   dedo desce uma." Uma linha, 24 px. Sai também a frase da home.
2. **Sai o portão.** Alternativas e resolução nascem visíveis sempre. `abreOpcoes()` e o
   `display:none` de L361 são removidos; `#resolve` nasce aberto.
3. **Sai a barra fixa `.regcontrol`** (botão "A régua desce", "Ouvir a linha", `.reghint`) e
   com ela `body.regua .stage{padding-bottom:178px}`.
4. **Novo comportamento do componente `leitura`** (todo texto com 3+ linhas, nos três
   lugares: bloco de truque, simulado, popup):
   - Todas as linhas nascem com opacidade 1. Nenhuma linha "ainda não".
   - Tocar numa linha acende essa linha (fundo âmbar, `.lin.on`) e leva as outras a 0,55.
     Tocar noutra linha move a luz para ela. É o dedo na tela: acompanha, não tranca.
   - Tocar a linha já acesa lê a linha em voz alta (`say()`), nunca automático.
   - Uma única frase de orientação, mostrada só na primeira vez que um texto de 3+ linhas
     aparece no aparelho (`localStorage op_regua_visto`): "Toque na linha que você está
     lendo." Some no primeiro toque e não volta.
   - Botão "Régua" na topbar (texto, 40 px, `aria-pressed`) liga/desliga o comportamento;
     persistido em `op_regua`. Padrão: ligado. É o controle do pai.
5. **Fica o que era conteúdo de verdade:** no comentário de erro da família "Ler e
   entender", o texto reaparece com as linhas de `acende:[...]` iluminadas e as demais a 0,4
   (já existe o dado em 9 itens, `OP_data.js` L311, 331, 502, 538, 581, 605, 627, 762, 924).
   Isso ensina onde morava a resposta; não é fricção porque vem depois de responder.
6. Transferência para o papel: a frase "Seu dedo é a régua" fica só no roteiro dos pais
   (§7) e no fecho do bloco "Ler e entender", uma linha.

---

## 3. Arquitetura de telas com banco de 100+

### 3.0 O banco: quanto existe de verdade

O universo de questões reais é **90** (6 provas × 15). Estado por prova:

| Prova | Formato | No banco hoje | Situação |
|---|---|---|---|
| 2025 F1 | 4 alt. | 14 | Q4 (placas desenhadas) fora; volta como item com recorte de imagem (abaixo) |
| 2024 F1 | 4 alt. | 15 | completa; Q3 e Q11 com `nota` de adaptação de figura |
| 2025 F2 | 4 alt. | 15 | completa (entrou hoje) |
| 2024 F2 | 4 alt. | 0 (14 prontos em `trabalho/reserva_2024F2.js`) | Q15 (código de símbolos) fora; volta com recorte de imagem |
| 2023 F1 | **5 alt. (A-E)** | 0 | 14 transcritíveis; Q9 (letra→desenho) só com recorte de imagem |
| 2023 F2 | **5 alt. (A-E)** | 0 | 15 transcritíveis (Q4 nomeia os 3 bichos; Q10, Q12, Q15 são tabelas de texto) |

Colando a reserva: **58**. Com 2023 transcrito: **87**. Com os 3 itens dependentes de
figura servidos como recorte PNG das páginas já existentes em `_fontes/png/` (`25F1Q4`,
`24F2Q15`, `23F1Q9`): **90 = tudo o que a Olimpíada já publicou para a Categoria G.**

**Como chegar a 100+ sem inventar prova:** acima de 90 só existe derivação. Entram
**15 itens de treino**, um mínimo de 1 por família e 3 nas duas maiores ("Ler e entender",
"Brincar com letras"), cada um gerado pela MESMA operação de um item real sobre outra
palavra/frase que aparece nas próprias provas (ex.: trocar as vogais de GELO→GOLE aplicado a
outra palavra da mesma prova; contar vogais numa frase do poema de 2024 Q8). Regras
inegociáveis: campo `treino:true` e `pai:'25F1Q6'`; rótulo visível "Treino, no estilo da
questão 6 de 2025"; **nunca aparecem em "Provas anteriores"**; passam no gate (4
alternativas, 1 certa, distrator indefensável conforme `feedback_escolha_legitima`).
Total: **105**. Se o tempo não der para os 15, o banco fecha em 90 reais e o rótulo da home
diz "90 perguntas de verdade" — sem maquiar.

**2023 tem 5 alternativas.** O banco guarda as 5, com a mais fraca marcada `fraca:true`.
Em "Provas anteriores" 2023 mostra as 5 (letras A-E, como foi na época). No simulado e no
popup, a `fraca` é removida e a questão fica no formato da prova de 2026 (4 alternativas).
O motor troca `'ABCD'.charAt(i)` (simulado L363, truques L308) por `'ABCDE'`.

**Correções já apontadas em `_AUDITORIA_BANCO.md`** (5 falhas críticas: `25F1Q3` no de
SALADA, `25F1Q11` "três A", `25F1Q12` alternativa M trocada por C, `25F1Q14` rima
GELADO/ERRADO, `25F1Q15` adaptação não declarada) entram na primeira leva de hoje. São
edições de texto, sem custo de arquitetura.

**Chave de progresso única** para tudo: `localStorage op_feitas = {id:{n, ok, t, via}}`
(quantas vezes respondeu, se acertou da última vez, quando, por onde: 'sim' | 'prova' |
'truque'). É o que permite "o que ela já fez" em qualquer tela.

### 3.1 Sessão teórica → tela "Truques de prova" (`OP_truques.html`)

**8 blocos**, um por família (1 Ler e entender · 2 Brincar com letras · 3 Contar com o dedo
· 4 Sílabas · 5 Frase com buraco · 6 Intruso e troca-troca · 7 Alfabeto e charada · 8 Código
e tabela). A família 9 (som da letra) continua como dica dentro de "Contar com o dedo".
Sem cartão 0, sem índice separado, sem tela de fim com dois parágrafos.

Anatomia de um bloco, de cima para baixo, tudo na primeira dobra (§1.3):

1. **Faixa de navegação** colada sob a topbar: 8 fichas numeradas com o nome curto; a
   atual em cor da família; ✓ na ficha quando a criança respondeu ≥ 1 questão real daquela
   família (por qualquer via) ou avançou além dela. Substitui `indice()` e o botão
   "Todos os truques" do `.qnav`.
2. **Cabeçalho**: número + nome da família. 40 px.
3. **O truque em uma frase** (`.truquebox`), com o ícone de ouvir dentro, à direita.
4. **Até 2 dicas** em linha simples (as 2 primeiras de `extras`; as demais saem do cartão
   e continuam vivendo como `dica` dos itens).
5. **"Veja como se faz"**: uma linha de origem + a questão real já resolvida (o `visual`
   com peças/marcas e a `respcerta`). Texto de poema todo aceso, 34 px por linha. Sem passo a
   passo escondido: o exemplo nasce resolvido. Sem "Agora você" — o lugar de responder
   passa a ser o popup (item 6), com questões reais e em quantidade.
6. **Botão "Ver nas provas de verdade (N)"** — N = quantidade de itens reais da família
   no banco. Abre o popup (§3.4). Ao lado, em texto pequeno, o progresso: "você já fez 3
   de 11". Este botão é a única chamada à ação do bloco e fica acima da dobra.
7. `.qnav` com "‹ Truque anterior" e "Próximo truque ›" (o do meio sai). No 8º bloco, o
   botão da direita vira "Ir para o simulado".

Tempo por bloco: 1 a 2 minutos sem o popup; o popup é aberto. A criança pode fazer os 8
blocos em 12 minutos e voltar a qualquer um pela faixa.

### 3.2 Simulado (`OP_simulado.html`, modo padrão)

**Tela inicial**, uma dobra: título "Simulado", contador "Rodada 3 · você já viu 30 das 90
perguntas" com barra, botão único "Começar 15 perguntas". Some o "Aquecer (5)": com o
popup e as rodadas de 15 ele deixou de ter função. Some o parágrafo sobre 1h30 (vai para
"Provas anteriores", onde faz sentido).

**Montagem da rodada** (`montaDeck`, L275-294, alterada): para cada família com `cota`,
ordena o pool por (nunca respondida em lugar nenhum → respondida só via 'truque' → errada
da última vez → acertada, da mais antiga para a mais recente) e pega `cota` itens. Itens
2023 entram com 4 alternativas. Itens `treino` entram só depois de a família esgotar os
reais nunca vistos. Assim 6 rodadas cobrem o banco inteiro sem repetir, e a 7ª começa
pelas erradas. O deck embaralhado é salvo em `sessionStorage` para sobreviver a um
refresh acidental no meio da rodada.

**Como a criança sabe o que já fez:** contador na tela inicial e no resultado ("Faltam 45
que você nunca viu"); no cabeçalho da questão, um selo pequeno "de novo" quando `n>0`;
no resultado, além do placar por família (já existe, L494-503), o botão "Refazer as que
errei" (existe) e o novo "Só as que já errei alguma vez" (deck com todos os `ok:false`
do `op_feitas`).

A questão-irmã (L431-434) continua: é o mecanismo pedagógico que já funciona.

### 3.3 "Provas anteriores" (`OP_simulado.html?prova=2025F1`, mesmo motor)

Não é um arquivo novo: é um modo do simulado, porque 90% do código é o mesmo (renderizar
questão, régua, pintar, navegar, resultado). O que muda quando `prova` está na URL:

- **Tela de escolha** (`index.html` linka direto para `OP_simulado.html?provas`): 6 linhas,
  uma por prova, "2025 · 1ª fase · 15 questões · você fez 12/15 (11 certas)". 2023 traz a
  observação "5 alternativas, como era naquele ano". A prova de 2025 F1 fica em destaque
  (é o modelo da de 2026).
- **Deck fixo**: os 15 itens da prova na ordem oficial (1 a 15), alternativas na ordem
  oficial (sem `embaralha` nas opts), letras A-E quando 2023. Os 3 itens de imagem
  aparecem com o recorte PNG. Sem irmã. Botão DICA desligado por padrão.
- **Modo prova, como na vida real**: ela marca e avança; nada é corrigido na hora
  (`pinta` só no fim). Aparece um relógio discreto contando PARA CIMA (não é cronômetro de
  pressão: é para os pais saberem quanto ela levou; 1h30 é folga). No fim: "12 de 15" e a
  grade das 15 com ✓/✗; tocar numa questão abre a questão com o comentário de erro completo
  (o `render()` já suporta revisitar item `feito` e chamar `pinta`, L373).
- Alternância "Corrigir na hora" (persistida em `op_prova_modo`) para quando os pais
  quiserem usar a prova como aula. Padrão: corrigir no fim.
- Resultado grava em `op_feitas` com `via:'prova'`, então o simulado sabe o que ela já viu.

### 3.4 O popup por tipo de questão (dentro de "Truques de prova")

Componente React (§4) montado num `<dialog>` de tela quase cheia (tablet: 94% da altura,
largura máxima 720 px, cantos 20 px). Abre pelo botão do bloco ou por qualquer ficha da
lista de origens.

**O que mostra, de cima para baixo:**

1. Barra do popup: nome da família colorido · contador "2 de 11" · botão fechar (X, 44 px)
   à direita. Abaixo, a frase do truque em uma linha (a mesma do bloco), com ícone de ouvir;
   tocar nela recolhe/expande. É o vínculo teoria→prova que o dono pediu.
2. Linha de origem: "Olimpíada 2025 · 1ª fase · questão 6" (+ "5 alternativas" em 2023;
   + "Treino, no estilo da questão N" nos derivados, que aqui aparecem por último).
3. A questão inteira renderizada pelas MESMAS funções do simulado (`OP_questao.js`,
   §4): enunciado, `quadro`, texto com régua-por-toque, pergunta, alternativas.
4. Ao responder: pintura ok/no e o comentário completo (truque + `visual` + "você marcou"
   + `porque` + "na próxima"), idêntico ao do simulado. Ícone de ouvir.
5. Rodapé fixo do popup: "‹ Anterior" · "Próxima desta família ›" · "Fechar". Na última:
   "Fechar e ir para o próximo truque".

**Comportamento:**

- **Rolagem da teoria**: o popup é uma camada; o DOM do bloco não é tocado. Ao abrir,
  `body` recebe `overflow:hidden` e o popup rola por dentro; ao fechar, remove-se a classe.
  A posição de rolagem do bloco é preservada por construção (nada re-renderiza). O bloco
  atual (`cur`) não muda.
- **Progresso**: cada resposta grava em `op_feitas` com `via:'truque'`. A ficha do bloco
  ganha ✓ e o texto "você já fez 3 de 11" atualiza ao fechar (única atualização feita no
  bloco, por `textContent`, sem re-render).
- **O que ela já respondeu**: ao reabrir a família, o popup começa na primeira questão
  ainda não respondida; as já respondidas aparecem pintadas, com o comentário visível e um
  botão "Tentar de novo" (limpa só o estado dessa questão no popup, não apaga o histórico).
  A lista de fichas dentro do popup (1…N) mostra ✓ verde / ✗ âmbar / vazio.
- **Ordem dentro da família**: 2025 F1, 2024 F1, 2025 F2, 2024 F2, 2023 F1, 2023 F2, treino.
  O item usado como "Veja como se faz" do bloco fica de fora da lista do popup (ela já viu
  resolvido).
- **Fechar** por X, por "Fechar", por Esc ou tocando fora. Sem confirmação.
- Sem nota, sem relógio, sem irmã, sem TTS automático.

### 3.5 Home (`index.html`)

Cabeçalho de uma linha: "Olimpíada de Português · 2º ano · quinta, 10/09". Três portas em
coluna, 88 px cada, ícone SVG simples à esquerda e um número à direita:
**Truques de prova** ("8 truques, cada um com as perguntas de verdade") ·
**Simulado** ("15 por vez · 90 perguntas · rodada 3") ·
**Provas anteriores** ("2023, 2024 e 2025 · 1ª e 2ª fase").
Abaixo, pequeno: "O vídeo dos truques". Rodapé com fonte e botão "Atualizar". Tema
claro/escuro fica. Saem: mascote, badge, `.calm`, `.kicker`, os emojis de ilustração
(`index.html` L214-243).

### 3.6 O que NÃO deve existir

- Cartão 0, barra fixa da régua, alternativas escondidas, botão "A régua desce",
  `.reghint`, texto "Comece pelo número 0".
- Tela de índice dos truques e tela de fim com parágrafos; texto introdutório (`.corpo`);
  linha `.tempo`; pílulas "Ouvir" de linha inteira.
- "Aquecer (5)". Relógio regressivo em qualquer lugar. Nota em porcentagem.
- Passo a passo com botão "próximo passo": o exemplo nasce resolvido.
- Um segundo banco, um segundo renderizador de questão, ou um `OP_provas.html` separado.
- Questão inventada apresentada como prova. Item de treino em "Provas anteriores".
- Emoji como ilustração de conceito na home ou nas telas (os ícones da topbar herdados do
  core continuam por enquanto; trocar por SVG é tarefa do pós-prova).
- Qualquer texto na tela da criança com "sessão teórica", "família", "eixo", "banco",
  "distrator", "metalinguagem".

---

## 4. React

**Decisão: React 18.3.1 local (`ferramentas/assets/react.production.min.js` +
`react-dom.production.min.js`, já baixados, 142 KB somados, UMD, sem JSX e sem build) entra
SÓ no popup de `OP_truques.html`. Os motores do simulado e da teoria continuam vanilla.**

Para não nascer um segundo renderizador, o que hoje está duplicado entre
`OP_simulado.html` (L326-467) e `OP_truques.html` (L266-395) é extraído para
`ferramentas/OP_questao.js`: funções puras que recebem `(item, estado)` e devolvem HTML
(`htmlQuestao`, `htmlOpts`, `htmlFeedback`, `htmlLeitura`) mais a lógica de `op_feitas`.
Simulado e teoria chamam essas funções com `innerHTML` como já fazem; o componente React
`Popup` (escrito com `React.createElement` via alias `h`, ~150 linhas) cuida do que é
estado — aberto/fechado, índice na família, respostas, restauração ao reabrir, navegação —
e injeta o HTML das mesmas funções por `dangerouslySetInnerHTML`, ligando os cliques nas
alternativas por delegação no contêiner. Uma fonte de verdade para a questão; React onde
há estado de verdade.

Justificativa em 3 linhas: (1) o dono pediu React no popup e o popup é exatamente a peça
com estado não trivial que o modelo do React simplifica; (2) reescrever dois motores que
passaram nos gates 36 horas antes da prova é o maior risco disponível e não muda nada que
a criança veja; (3) com `OP_questao.js` puro, migrar simulado e provas para React depois da
prova é trabalho de montagem, não de reescrita. `sw.js`: `CACHE` sobe para `serafina-v29`,
os dois arquivos do React e `OP_questao.js` entram em `BASE_FILES`; o simulado não carrega
React.

---

## 5. Nomes visíveis

| Onde | Antes | Agora | Por quê |
|---|---|---|---|
| Porta 1 da home e título da tela | "A caixa de truques" | **Truques de prova** | É a expressão do dono, é concreta para 7 anos ("truque" ela entende; "caixa" era metáfora sem função) e diz do que são os truques. "Sessão teórica" fica no plano, nunca na tela: é palavra de adulto. |
| Cada bloco | "Truque 3 de 9" | **Só o nome da família** ("Contar com o dedo") com o número na ficha | O nome da família é o que ela vai reconhecer no comentário de erro e no popup. |
| A frase | `.truquebox` sem rótulo | **"O truque:"** como prefixo pequeno | Nomeia o gesto para ela pedir "qual é o truque?" na prova. |
| Botão do bloco | "Agora você" | **"Ver nas provas de verdade (11)"** | Diz o que abre e quanto tem; "de verdade" é o argumento que importa para a criança e para o dono. |
| Porta 2 | "Simulado" | **Simulado** | Já é o nome da escola. |
| Porta 3 | — | **Provas anteriores** | Como o dono chamou; é o nome que os pais usam. |
| Modo dentro de Provas anteriores | — | **"Corrigir no fim" / "Corrigir na hora"** | Duas palavras, sem "modo prova/modo estudo". |
| Selo de item derivado | — | **"Treino, no estilo da questão 6 de 2025"** | Nunca se passa por prova. |
| Comentário de erro | "Olha o truque" | **"Olha o truque"** (mantido) | Frase curta, já ligada ao nome da tela. |

---

## 6. Ordem de execução

Hoje é 08/09, ~21h. O material tem de estar no ar e utilizável às 9h de 09/09; a criança
usa à tarde e à noite; prova 10/09 de manhã. Estimativas por bloco de trabalho.

**Hoje à noite — imprescindível (sem isto, o material continua o que o dono criticou):**

1. `OP_data.js`: colar `reserva_2024F2.js` (→ 58 itens); aplicar as 5 correções críticas
   da auditoria; campo `fraca` preparado; `nota` de adaptação onde falta. Rodar o gate.
   Commit. (40 min)
2. `OP_questao.js`: extrair render de questão, régua-por-toque (§2.4), pintura, `op_feitas`.
   Simulado e truques passam a usar. Commit. (1h15)
3. Densidade (§1.2-1.3) nos dois HTML: `--fs` 1,0, card 760/18-20, `.lin` 34 px, remoção
   de `.tempo`, `.corpo`, pílulas, barra da régua, portão das alternativas. Medir em
   810×1080 com a fala silenciada (regra zero). Commit + push. (1h)
4. Simulado: rodadas com prioridade por `op_feitas`, tela inicial de uma dobra, contador,
   "Só as que já errei". Commit. (45 min)
5. Provas anteriores como modo `?prova=` (4 provas disponíveis: 2025F1, 2024F1, 2025F2,
   2024F2), corrigir no fim + grade de revisão, letras A-E prontas. Commit. (1h)
6. Truques: 8 blocos sem cartão 0, faixa de fichas, exemplo nascendo resolvido, botão
   "Ver nas provas de verdade" abrindo por enquanto a lista simples (fallback vanilla:
   o mesmo `<dialog>` com `OP_questao.js`, sem React) para a criança não ficar sem a função
   se o React atrasar. Home com 3 portas. `sw.js` v29. Commit + push. (1h15)

**Amanhã de manhã, 7h-12h — desejável, nesta ordem:**

7. Popup React (§3.4) substituindo o fallback; navegação na família, restauração, ✓ nas
   fichas. É o primeiro item da manhã porque é a peça que liga teoria a prova. (2h30)
8. 2023 F1 e F2 transcritos com 5 alternativas e `fraca` (29 itens → 87). Duas provas
   novas em "Provas anteriores". (1h30, paralelizável com o 7 num subagente Sonnet
   por prova, com o gate como portão)
9. Recortes PNG de `25F1Q4`, `24F2Q15`, `23F1Q9` a partir de `_fontes/png/` (→ 90).
   (30 min)
10. QA de layout 810×1080 + 360×640 com fala silenciada; agente `ti`. Push final antes do
    meio-dia. (45 min)

**Tarde de 09/09, só se sobrar — corta primeiro:**

11. Os 15 itens de treino (→ 105) com gate de distrator. Se não der, a home diz "90
    perguntas de verdade".
12. Relógio contando para cima em Provas anteriores.
13. Ícones SVG na topbar no lugar dos emojis herdados do core.

**O que se corta, nesta ordem, se a noite não render:** primeiro o 5 vira só 2025F1 e
2024F1 (duas provas), depois o 4 perde "Só as que já errei", depois o 6 mantém o índice
antigo mas sem o cartão 0. **O que não se corta:** a densidade (3), a régua sem portão (2),
o banco em 58 corrigido (1), a home com as três portas.

**Roteiro para os pais (09/09):** tarde: "Truques de prova", os 8 blocos, abrindo o popup
em cada um e fazendo 2 ou 3 perguntas (25-30 min, em duas sentadas). Noite: "Provas
anteriores" → 2025 · 1ª fase, corrigir no fim, revisar as erradas (30-40 min). 10/09 de
manhã: uma rodada do simulado só até a 5ª pergunta, e a frase de despedida: "Leia a
pergunta primeiro. Leia as quatro respostas até o fim."
