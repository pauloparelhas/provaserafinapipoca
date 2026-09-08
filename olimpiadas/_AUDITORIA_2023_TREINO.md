# AUDITORIA DE FIDELIDADE E QUALIDADE — itens `23F1*` e `TR*`

**Arquivo auditado:** `ferramentas/OP_data.js` (linhas 1235–1816)
**Fontes de confronto:** `olimpiadas/_fontes_md/OP_2023_catG_fase1_prova.md` · `olimpiadas/_fontes/DOSSIE_2023.md`
**Gabarito oficial usado:** 1=A 2=D 3=A 4=D 5=C 6=E 7=E 8=B 9=D 10=C 11=A 12=C 13=E 14=D 15=A
**Data:** 08/09/2026 · **Itens auditados:** 26 (14 em `23F1`, 12 em `TR`)
**Método:** contagem manual letra a letra / palavra a palavra; decodificação símbolo a símbolo com a tabela `quadro` de cada item; confronto verbatim linha a linha com a prova em MD. Nenhum arquivo foi editado.

---

## PARTE 1 — os 14 itens `23F1` (prova real de 2023, 1ª fase)

### Tabela item a item

| id | Q | gabarito oficial | alt. certa preservada? | alt. cortada (das 5) | verbatim enun./texto | `nota` da redução | contas / `no` / `visual` / `acende` | veredito |
|---|---|---|---|---|---|---|---|---|
| 23F1Q1 | 1 | A · EU AMO A OLIMPÍADA DE PORTUGUÊS! | **SIM** (`ok:1`) | (D) QUE MOMENTO MÁGICO! | ✔ | ✔ | 15 · 14 · 12 · 10 — **recontei as quatro, todas batem** | OK |
| 23F1Q2 | 2 | D · OS | **SIM** | (A) A | ✔ (quadro idêntico) | ✔ | `no` de O/AS/UM verdadeiros | OK |
| 23F1Q3 | 3 | A · MAÇÃ | **SIM** | (E) ARROZ | ✔ (9 linhas verbatim) | ✔ | `acende:[3,5,8]` = 0-based → "MAS NÃO QUIS COMER NADA DISSO", "MAS TAMBÉM NÃO QUIS", "AUGUSTO COMEU A MAÇÃ…" — **correto** | OK |
| 23F1Q4 | 4 | D · GUERRA | **SIM** | (E) GELADO | ✔ | ✔ | armadilha semântica (GENERAL) preservada | OK |
| 23F1Q5 | 5 | C · SOPA | **SIM** | (A) ÁRVORE DE NATAL | ✔ (quadro idêntico) | ✔ | as 3 pistas conferem | OK |
| 23F1Q6 | 6 | E · 13 | **SIM** | (A) 9 | ✔ | ✔ | 14 palavras → 13 espaços **recontado**; `no` de 10 (−3 colagens), 11 (−2), 12 (−1) aritmeticamente corretos | OK |
| 23F1Q7 | 7 | E · BO-LE-TA-BOR | **SIM** | (D) BO-LE-TAR-BO | ✔ | ✔ (declara também a figura) | BOR-BO-LE-TA confere; figura = BORBOLETA confirmada no DOSSIE l.77 | OK |
| 23F1Q8 | 8 | B · 8 | **SIM** | (E) 11 | ✔ (7 lacunas) | ✔ | **varri a frase inteira**: DIRIGIA 1 + CARRO 2 + RATO 1 + ROENDO 1 + ROUPA 1 + REI 1 + ROMA 1 = 8; nenhum R fora das lacunas | OK |
| 23F1Q9 | 9 | D | — | **item ausente do banco** | — | — | ver OBS-1 | ausente |
| 23F1Q10 | 10 | C · CARATECA | **SIM** | (E) COMPUTADOR | ✔ | ✔ (declara as 4 figuras) | CO-**RA**-ÇÃO / CAS-**TE**-LO / BO-**CA** / FA-**CA** → CA-RA-TE-CA; figuras confirmadas no DOSSIE l.124-127 | OK |
| 23F1Q11 | 11 | A · TENRO, NORTE, TENOR E TORNE. | **SIM** | (C) MORTE, TENRO, TORNE E TEMOR | ✔ (inclusive a falta de ponto final em (D)) | ✔ | TRONO/TORNO pedem 2 O ✔; TEMOR pede M ✔; TEMPO pede M e P ✔ | OK |
| 23F1Q12 | 12 | C · FRÁGIL | **SIM** | (A) COLA | ✔ | ✔ | OLHO→ALHO, FARTO→PARTO, BROCA→TROCA ✔ | OK |
| 23F1Q13 | 13 | E · LIVROS | **SIM** | (D) PONTO | ✔ | ✔ | as 3 erradas são polissemia real ✔; a certa é sentido único ✔ | OK |
| 23F1Q14 | 14 | D · FALAR É FÁCIL… | **SIM** | (A) QUEM MENTE LOGO SE ARREPENDE | ✔ (23 linhas verbatim, inclusive o erro do original "DISSE UM ELES") | ✔ | `acende:[12,13,18,20]` = 0-based → PALMAS E BRAVOS / APROVADO COM DELÍRIO / SILÊNCIO GERAL / NÃO TINHAM CORAGEM — **correto e coerente com o `visual`** | OK |
| 23F1Q15 | 15 | A · 15 | **SIM** | (E) 19 | ✔ (12 versos verbatim) | ✔ | **recontei verso a verso**: VOL·CHUBA·ATEL·XUVA · ABES·CHÃI · TICA·CHÃI·SOTE · POZZA · LUGAREZ · DINHEURO·CONPRO · CONPRO·DINHEURO = **15**; distintas = 12 (bate com o `visual`) | OK |

### Respostas às quatro perguntas críticas da redução 5→4

1. **A alternativa correta foi preservada em todos?** **SIM, nos 14 itens.** Nenhuma questão teve o gabarito cortado. Zero falhas críticas nesta frente.
2. **Os quatro textos que sobraram são verbatim?** **SIM.** Confronto caractere a caractere com o MD da prova: enunciados, quadros, textos corridos e alternativas idênticos. Foram preservados até detalhes de pontuação inconsistentes do original (a (D) da Q11 sem ponto final; o "DISSE UM ELES" da fábula, que é erro do próprio Monteiro Lobato reproduzido pela banca).
3. **Existe o campo `nota` declarando a redução?** **SIM, nos 14 itens.** Nas Q7 e Q10 a `nota` declara também a segunda adaptação (a figura da prova virou nome escrito).
4. **O corte tornou alguma questão ambígua ou trivial?** **NÃO.** Verificação alternativa por alternativa:
   - Q1 saiu a de 8 vogais (a menor) — a comparação decisiva 15×14 continua de pé.
   - Q2 saiu "A", que errava gênero E número; sobrou "AS", que é justamente o distrator fino (acerta número, erra gênero). O corte **melhorou** o item.
   - Q4 saiu GELADO: sobraram 3 palavras com o mesmo som + 1 diferente — a lógica do intruso continua íntegra.
   - Q5 saiu ÁRVORE DE NATAL (absurdo semântico); sobrou PIZZA, o distrator forte. O corte **endureceu** o item.
   - Q7/Q10/Q11/Q12/Q13/Q14 saíram distratores de segunda linha; a armadilha central de cada questão está preservada.
   - Q6, Q8 e Q15 (numéricas): o gabarito continua na mesma posição relativa da escala original (13 = máximo em 9–13 e em 10–13; 8 = 2º em 7–11 e em 7–10; 15 = mínimo em 15–19 e em 15–18). Nenhuma trivialidade foi introduzida pelo corte.

---

## PARTE 2 — os 12 itens `TR` (autorais de treino)

### Tabela item a item

| id | eixo | `origem` exata? | gabarito recalculado do zero | tabela embaralhada? | ambiguidade | veredito |
|---|---|---|---|---|---|---|
| TR01 | codigo | ✔ `'Treino no estilo da prova'` | ■●▲◆★☼▼♥✦ = QUEM·NÃO·TEM·CÃO·CA·ÇA·COM·GA·TO → **QUEM NÃO TEM CÃO CAÇA COM GATO** = `ok` | ✔ (linha de baixo lida em ordem dá "GA COM TEM CA TO QUEM ÇA NÃO CÃO") | nenhuma | OK |
| TR02 | codigo | ✔ | ▲★♥▲✚☼◆■● = CA·DA·MA·CA·CO·NO·SEU·GA·LHO → **CADA MACACO NO SEU GALHO** = `ok` | ✔ ("MA GA CA LHO NO SEU CO DA") | nenhuma | **FC-1** (erro de contagem no `no`) |
| TR03 | codigo | ✔ | ■●◆♥●★▼ = P·A·L·H·A·Ç·O → **PALHAÇO** = `ok` | ✔ ("Ç P O A H L") | nenhuma | OK |
| TR04 | codigo | ✔ | ▲♥☼■●◆▲★ = O·SA·PO·NÃO·LA·VA·O·PÉ → **O SAPO NÃO LAVA O PÉ** = `ok` | ✔ ("LA PÉ O VA NÃO SA PO") | nenhuma | OK |
| TR05 | placa | ✔ | círculo vermelho cortado **+** bicicleta — única que satisfaz "não pode andar de bicicleta" | — | nenhuma | OK |
| TR06 | placa | ✔ | homem + risco + mulher — única que *mostra* banheiro (a do círculo cortado proíbe) | — | nenhuma | OBS-2 (dica) |
| TR07 | placa | ✔ | pessoa andando sobre faixas brancas — única que mostra onde atravessar a pé | — | nenhuma | OBS-3 (descrição do PARE) |
| TR08 | placa | ✔ | círculo vermelho cortado **+** fósforo aceso — única com as duas metades | — | nenhuma | OK |
| TR09 | alfabeto | ✔ | B·C·D·**?**·F·G → falta E → **ENZO** (único nome com E) | — | nenhuma | OK |
| TR10 | alfabeto | ✔ | DEDO (D→E→**D**✗) · FILHO (L→**H**✗) · CHUVA (V→**A**✗) · **BEIJO** B<E<I<J<O ✔ | — | nenhuma | OK |
| TR11 | alfabeto | ✔ | S: em SOL ✔ · em SAPATO ✔ · som/palavra SOM ✔ · entre R e T ✔ — **4/4**. O = 3/4 (cai no alfabeto) · C = 2/4 · A = 2/4 | — | nenhuma | OK |
| TR12 | alfabeto | ✔ | L: em LUA ✔ · em BALA ✔ · em ESCOLA ✔ · entre K e M ✔ — **4/4**. A = 3/4 (cai no alfabeto) · U = 1/4 · B = 1/4 | — | nenhuma | OK |

### Verificações transversais dos `TR`

- **`origem`**: os 12 itens trazem `origem:'Treino no estilo da prova'`, string idêntica, **nenhum** cita ano, fase ou número de questão. Nenhum item de treino se apresenta como questão de prova real. **Zero falhas nesta frente.**
- **Charadas de letra (TR11/TR12)**: as quatro pistas fecham na letra do gabarito nas duas, e **nenhum distrator satisfaz as quatro**. Nos dois itens o distrator forte (O e A) passa em três e morre na pista do alfabeto — e o próprio `no` diz isso à criança, o que é honesto.
- **Placas (TR05–TR08)**: as quatro trazem `nota` declarando que na prova as placas são desenhadas e que aqui vêm descritas em palavras. As descrições correspondem a placas reais e reconhecíveis (R-12 bicicleta proibida; ciclovia azul; sanitário; faixa de pedestres; PARE octogonal; triângulo amarelo de perigo de fogo; proibido fogo; lavatório). Em cada item a resposta certa é a **única** que satisfaz a fala da criança do enunciado.
- **`truque`**: os 12 usam frases já existentes no banco — 8 são o `truque` canônico da família em `FAMILIAS` (linhas 62–82: `codigo`, `placa`, `alfabeto`) e os 4 restantes reaproveitam variantes já usadas por itens de prova real (`'Cante o alfabeto… até o fim da palavra.'` de `24F1Q1`; `'Na charada, a letra fala dela mesma…'` de `25F1Q1`). Nenhum `truque` inventado.
- **Vocabulário / metalinguagem**: varredura no trecho 1234–1817 por 18 termos de gramática (substantivo, adjetivo, artigo, concordância, verbo, sujeito, fonema, dígrafo, polissemia, pronome, tônica, oxítona…): **zero ocorrências**. As explicações usam "de menino/de menina", "um só ou vários", "pedaço", "peça", "pontinho".

---

## FALHAS CRÍTICAS

### FC-1 — `TR02`: contagem errada dentro do comentário de erro

Único erro de fato encontrado nos 26 itens. Não muda o gabarito, mas **ensina uma contagem errada** dentro de uma questão cuja habilidade treinada é exatamente contar peças — e a criança que conferir vai achar 8.

- **Localização:** `OP_data.js`, item `TR02`, `opts[1]` (alternativa `'CADA MACACO NO GALHO.'`), campo `no`.
- **Está lá:**
  > `Essa pulou o losango, que vale SEU. Conte: a sequência tem nove símbolos e essa frase tem sete pedaços. Sobrou símbolo sem uso.`
- **Deveria estar:**
  > `Essa pulou o losango, que vale SEU. Conte: a sequência tem nove símbolos e essa frase tem oito pedaços. Sobrou símbolo sem uso.`
- **Prova:** CA·DA·MA·CA·CO·NO·GA·LHO = **8** peças (9 símbolos − 1 pulado = 8). O item irmão `TR04` faz a mesma conta corretamente ("são oito símbolos e essa frase tem sete pedaços" para O·SA·PO·LA·VA·O·PÉ = 7) — o "sete" do TR02 é cópia não recalculada do TR04.

**Nenhuma outra falha crítica.** Nenhum gabarito errado, nenhuma correta cortada, nenhuma ambiguidade, nenhum `origem` mentiroso.

---

## OBSERVAÇÕES

**OBS-1 — `23F1Q9` ausente do banco, sem registro.**
A questão 9 de 2023 (tabela letra→ícone, "PESCADOR") não existe no banco e nada no arquivo documenta a ausência. É uma omissão defensável (na prova as cinco alternativas *são* fileiras de ícones), e há precedente declarado no cabeçalho do arquivo para a 2025 Q4. Mas o `DOSSIE_2023.md` (linhas 96–118) já traz a tabela inteira e a decodificação das cinco alternativas — o item é reconstruível em texto exatamente como os `TR01`–`TR04` foram construídos. Sugestão: ou criar o item, ou acrescentar uma linha de comentário no bloco `/* ===== reserva_2023F1 ===== */` dizendo que a Q9 ficou de fora por ser 100% icônica. Sem ela, o bloco de 2023 F1 tem 14 de 15.

**OBS-2 — `TR06`: a `dica` conta errado quantas placas têm gente ou água.**
- Está lá: `Três dessas placas têm gente ou água desenhada.`
- São **quatro**: pessoa (opt 1), pessoa + lixeira (opt 2), homem e mulher (opt 3, a certa), copo + torneira (opt 4).
- Sugestão: `Três dessas placas têm gente desenhada e a quarta tem água. Olhe o desenho INTEIRO de cada uma antes de escolher, e não só o primeiro pedaço.`

**OBS-3 — `TR07`: "OITO PONTAS" para descrever o octógono do PARE.**
- Está lá: `UMA PLACA VERMELHA DE OITO PONTAS COM A PALAVRA PARE ESCRITA DENTRO.`
- "Pontas" para uma criança de 7 anos remete a estrela, não a octógono.
- Sugestão: `UMA PLACA VERMELHA DE OITO LADOS COM A PALAVRA PARE ESCRITA DENTRO.`

**OBS-4 — `23F1Q7` e `23F1Q10`: o enunciado verbatim aponta para um desenho que não existe mais.**
"…AS SÍLABAS DO DESENHO ABAIXO?" e "…A SEGUNDA SÍLABA DE CADA FIGURA?" ficaram verbatim, mas o desenho virou frase no `quadro` ("O DESENHO É UMA BORBOLETA."). A `nota` de cada item declara a adaptação, então não é fabricação — mas vale registrar que **a adaptação retira uma habilidade que a prova cobra**: nomear a figura sozinha. Na prova de 10/09 a criança terá de deduzir o nome do desenho; aqui ele vem de graça. Não é caso de correção do item (a alternativa seria não ter o item), e sim de o material treinar essa habilidade em outro lugar.

**OBS-5 — `TR10` é um paralelo próximo de `24F1Q1` (item de prova real).**
Mesma habilidade, mesma estrutura de distratores e até a mesma redação de armadilha ("é a pegadinha: … vão andando bonito para a frente… e aí a última letra volta"). As palavras são todas diferentes (DEDO/FILHO/CHUVA/BEIJO × BATATA/ALMA/AMOR/CINTO), então é um item legítimo e não uma duplicata. Só convém que o sorteio do simulado não coloque os dois na mesma rodada.

---

## VEREDITO SOBRE REMOÇÃO

**Nenhum item de treino deve ser removido do banco.**

Os 12 `TR` resolvem-se do zero com resposta única e defensável; as quatro tabelas de código estão de fato embaralhadas (ler a linha de baixo da esquerda para a direita não entrega nenhuma das quatro respostas); as quatro placas descrevem sinais reais e reconhecíveis, com uma única alternativa satisfazendo a fala da criança; as duas charadas fecham as quatro pistas no gabarito sem que nenhum distrator passe em todas. O único defeito real (FC-1) é a troca de uma palavra — `sete` por `oito` — dentro de um comentário de erro, e as OBS-2 e OBS-3 são ajustes de redação de uma linha cada. Tudo é corrigível no lugar; nada exige descarte.

Quanto aos `23F1`: os 14 itens estão fiéis ao gabarito oficial e verbatim à prova, com a redução 5→4 declarada em todos. Também nenhum deve sair. A única decisão de escopo aberta é a OBS-1 (criar ou documentar a ausência da Q9).
