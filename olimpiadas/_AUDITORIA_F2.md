# AUDITORIA DE FIDELIDADE — 2ªs FASES (2025 e 2024)

**Arquivo auditado:** `ferramentas/OP_data.js` — itens com id `25F2*` e `24F2*`
**Escopo:** 29 itens (2025 F2: Q1–Q15 · 2024 F2: Q1–Q14)
**Data:** 08/09/2026 · auditoria por conferência, **sem edição do arquivo**

**Fontes da verdade usadas (nesta ordem):**
1. `_fontes_md/OP_2025_catG_fase2_prova.md` e `_fontes_md/OP_2024_catG_fase2_prova.md` (autoridade)
2. `_fontes/DOSSIE_2025.md` e `_fontes/DOSSIE_2024.md`, seções FASE 2 (apoio)
3. Gabaritos oficiais confirmados (2025 F2: 1C 2C 3A 4B 5B 6B 7D 8C 9C 10B 11B 12A 13B 14D 15C · 2024 F2: 1B 2B 3C 4D 5B 6A 7C 8B 9D 10D 11D 12B 13C 14B 15B)

**Método:** as alternativas estão no arquivo na ordem da prova (índice 0=A … 3=D; o motor embaralha em execução), então a letra do `ok:1` foi extraída por script e comparada com o gabarito oficial, item a item. Contagens de sílaba, letra, vogal, chiado, anagrama e ordem alfabética foram **refeitas à mão**, uma a uma, e não herdadas do dossiê. Os índices de `acende` foram conferidos contra o array `texto` real de cada item (base zero).

---

## RESULTADO GERAL

| Métrica | Valor |
|---|---|
| Itens auditados | **29** |
| FALHAS CRÍTICAS | **0** |
| Observações | **5** |
| Gabaritos divergentes | 0 / 29 |
| Afirmações factuais falsas nos comentários `no` | 0 |
| `acende` errado | 0 / 5 itens com `texto` em eixo `ler` |
| `origem` divergente do id | 0 / 29 |
| Adaptação sem `nota` | 0 |
| Ambiguidade criada por adaptação | 0 |

---

## TABELA ITEM A ITEM — 2025 · 2ª FASE

| id | gabarito (oficial → marcado) | enunciado/alternativas | comentários `no` · `porque` · `visual` · `acende` | veredito |
|---|---|---|---|---|
| 25F2Q1 | C → **C** (ALEGRE.) | verbatim: poema da FOCA completo (12 versos), `pede` idêntico, 4 alternativas na ordem da prova | TRISTE/CABISBAIXA/DESANIMADA descritas como antônimos — verdadeiro; `visual` correto | **OK** |
| 25F2Q2 | C → **C** (P E T.) | verbatim | AGITO (G+T), AVISO (V+S), ALISO (L+S) — as três trocas conferidas letra a letra sobre A_I_O; `visual` A-P-I-T-O correto | **OK** |
| 25F2Q3 | A → **A** (BICICLETA.) | verbatim | as três "iguais" (borboleta/caneta/camiseta com E fechado) batem com o raciocínio oficial; `visual` correto | **OK** |
| 25F2Q4 | B → **B** (GALO.) | verbatim | "GALOPE não tem T / não tem N nem S / não tem R nem I" — conferido em G-A-L-O-P-E, verdadeiro; `visual` (GALO hit, PE bad) correto | **OK** |
| 25F2Q5 | B → **B** (BRINCAR.) | verbatim; lacuna em `quadro` | as três erradas conferidas (pessoa verbal e sentido "na areia") | **OK** |
| 25F2Q6 | B → **B** (OVELHA.) | verbatim: poema completo (8 versos) | rimas conferidas; `acende:[6,7]` = "ESSA CASA É DE TELHA" / "QUEM MORA NELA É A ABELHA" — **linhas certas** | **OK** |
| 25F2Q7 | D → **D** (BI.) | verbatim; sílabas em `quadro` na ordem da prova | POR+TA (2) e JA+NE+LA (3) de 6 peças → sobra 1; comentários de TA/NE/LA verdadeiros; `visual` mostra as 6 peças corretas | **OK** |
| 25F2Q8 | C → **C** (PELO SEU CANTO.) | verbatim; texto em `quadro` | "cheiro está escrito mas vem DEPOIS" / "som e fumaça não estão no texto" — verdadeiro | **OK** |
| 25F2Q9 | C → **C** (PANELA.) | verbatim (as duas séries no `quadro`) | CAPELA muda o N do meio ✔; GALERA -ELA×-ERA e 3 letras diferentes ✔; FIVELA C→F, A→I, N→V ✔ (conferido letra a letra) | **OK** |
| 25F2Q10 | B → **B** (BORGES…) | verbatim, inclusive as quatro descrições longas | pizza≠doce, batata≠fruta, leite≠suco — cada errada falha em exatamente 1 das 3 regras ✔ | **OK** |
| 25F2Q11 | B → **B** (CABANA.) | **adaptado com `nota`**: as 3 gravuras (cachorro, nariz, bananeira — confirmadas no DOSSIE_2025) viram nomes escritos | CA/NA/BA ✔; CABELO pede BE+LO ✔; CABINE pede BI+NE ✔; ARBUSTO (AR-BUS-TO) não sai das figuras ✔ | **OK** (ver Obs. 2) |
| 25F2Q12 | A → **A** (LONTRA.) | verbatim (exemplo TESOURO/OURO preservado) | GAVIÃO→AVIÃO (5 letras) ✔; PIOLHO→OLHO (4) ✔; SAPATO→PATO (4) ✔; LONTRA: todas as subsequências contínuas ≥4 (LONT, ONTR, NTRA, LONTR, ONTRA) verificadas — nenhuma é palavra ✔ | **OK** |
| 25F2Q13 | B → **B** (ESQUILO.) | verbatim | ordem alfabética BALEIA/COELHO/ESQUILO/GATO/URSO e a inversa conferidas; "GATO é o quarto e vira o segundo" ✔; BALEIA e URSO trocam de ponta ✔ | **OK** |
| 25F2Q14 | D → **D** (TERÇA-FEIRA.) | verbatim (3 frases, uma por linha) | `acende:[1,2]` = "AMANHÃ IRÁ AO SUPERMERCADO…" e "ONTEM FOI DOMINGO…" — **as duas linhas que respondem** | **OK** |
| 25F2Q15 | C → **C** (ENCHER UM BALÃO FURADO.) | verbatim (9 versos) | `acende:[4,7,8]` = "ROUBAR UM VENTO", "CATAR ESPINHOS NA ÁGUA", "CRIAR PEIXES NO BOLSO" — **os três exemplos da mãe**; distinção "inútil × impossível de conter" em RELÓGIO PARADO correta | **OK** |

## TABELA ITEM A ITEM — 2024 · 2ª FASE

| id | gabarito (oficial → marcado) | enunciado/alternativas | comentários `no` · `porque` · `visual` · `acende` | veredito |
|---|---|---|---|---|
| 24F2Q1 | B → **B** (APOSENTADO) | verbatim | **contagens refeitas:** GUARDANAPO = 10 letras / GUAR-DA-NA-PO = 4 sílabas; APOSENTADO = 10 letras / A-PO-SEN-TA-DO = 5; BÁR-BA-RO = 3; POR-TU-GUÊS = 3. O item diz "as mesmas 10 letras" — **corrige o erro conhecido do DOSSIE_2024**, que afirma que GUARDANAPO tem mais letras | **OK** |
| 24F2Q2 | B → **B** (PRÓXIMO) | verbatim | LONGE/AFASTADO/DISTANTE como sinônimos entre si ✔ | **OK** |
| 24F2Q3 | C → **C** (INVERNO) | verbatim (12 versos) | FLOR/SOL como iscas dentro de linhas que dizem o contrário ✔; `acende:[0,2,11]` = "SOU A ESTAÇÃO DO FRIO;", "E O SOL NÃO TEM CALOR.", "À CASA A TIRITAR." — **as três linhas que sustentam a resposta** | **OK** |
| 24F2Q4 | D → **D** (CENTRO) | verbatim | anagramas conferidos letra a letra: ACERTO / ARCOTE / CERATO = {A,C,E,R,T,O}; CENTRO = {C,E,N,T,R,O} — troca A por N ✔; `visual` correto | **OK** (ver Obs. 3) |
| 24F2Q5 | B → **B** (GIGANTE.) | verbatim (dois parágrafos do trecho, COLOSSAL em destaque) | pista "ESSE TAMANHO FORA DO COMUM" ✔; BONITO não fala de tamanho ✔ | **OK** |
| 24F2Q6 | A → **A** (GRIPADA) | verbatim | as duas pistas (motivos de saúde / para repousar) ✔ | **OK** |
| 24F2Q7 | C → **C** (VERÃO.) | verbatim (exemplos LEGALZÃO/LEGALZONA preservados) | CARRÃO→carro, GRANDÃO→grande, MENINÃO→menino ✔; VERÃO não é aumentativo de "ver" ✔ | **OK** |
| 24F2Q8 | B → **B** (SAPATO) | **adaptado com `nota`**: o desenho do sapo (confirmado no DOSSIE_2024) vira o nome escrito SAPO; `enun` ajustado de "VEJA A FIGURA…" para "ESTE É O NOME…" | RA-PO-SA ✔, SA-RAM-PO ✔, PO-RO-SA ✔ têm SA e PO; SA-PA-TO tem SA e **não** tem PO ✔ | **OK** |
| 24F2Q9 | D → **D** (SO-) | verbatim (5 falas do diálogo) | CONCORRER, DECORRER, PERCORRER existem e nenhuma significa ajudar ✔; SO+CORRER = SOCORRER ✔ | **OK** (ver Obs. 4) |
| 24F2Q10 | D → **D** (MÉDICO VETERINÁRIO.) | verbatim (as 8 palavras no `quadro`) | "MÉDICO explica cinco das oito" — recontado: CLÍNICA, VACINA, DOENTES, EXAME, CUIDAR = 5; sobram ANIMAIS, CACHORRO, FAZENDA = 3 ✔ | **OK** |
| 24F2Q11 | D → **D** (SE COELHOS USASSEM COTONETE) | verbatim (3 estrofes + a estrofe incompleta com a lacuna) | esquema de rima conferido (GRATOS/SAPATOS, FARTURA/DENTADURA, SOL/CACHECOL) ✔; POLEIRO rima com INTEIRO, que é a 1ª linha ✔; `acende:[2,5,8]` = os três terceiros versos — **corretos** | **OK** |
| 24F2Q12 | B → **B** (TCHIBUM.) | verbatim (frase da piscina em `enun`, pergunta em `pede`) | NHOM NHOM=comer, TIRIRIRIRIM=musiquinha, CREC=quebrar ✔ | **OK** |
| 24F2Q13 | C → **C** (DO - MOS - CEU - CÊ.) | verbatim (carta com os 4 buracos) | (A) acerta DO e MOS e produz APARE**SEU** e VO**SE** ✔; (B) QUERIDA para Bartolomeu e COMBINARAM com sujeito NÓS ✔; (D) COMBINARAM + APARECEMOS ✔ | **OK** |
| 24F2Q14 | B → **B** (8) | verbatim (frase dos alto-falantes no `quadro`) | **contagem refeita som a som:** CEDIDOS 2 (C inicial + S final), NOVOS 1, LIVROS 1, ESTÃO 1, DISPONÍVEIS 2, EMPRÉSTIMO 1 = **8** ✔. Letras S da frase = **7** ✔ (afirmação do distrator "7"). C da frase = **2** (CEDIDOS, BIBLIOTECA) ✔ (afirmação dos distratores "9" e "10"); C de BIBLIOTECA soa /k/ ✔ | **OK** (ver Obs. 5) |

---

## FALHAS CRÍTICAS

**Nenhuma.** Nos 29 itens:

- nenhum `ok:1` diverge do gabarito oficial;
- nenhum enunciado, alternativa ou texto-base foi alterado de modo a mudar o raciocínio exigido;
- nenhuma alternativa inventada — as 116 alternativas (29 × 4) conferem com a prova, texto e ordem;
- **nenhuma afirmação factual falsa** nos comentários `no`, `porque` ou `visual`: todas as contagens de sílaba, letra, vogal e chiado, todas as decodificações, rimas, anagramas, trocas de letra e ordens alfabéticas foram recontadas e conferem;
- nenhuma adaptação sem `nota`;
- nenhuma ambiguidade criada (nenhum item ficou com duas respostas defensáveis).

---

## OBSERVAÇÕES (não bloqueiam nada; nenhuma é erro de conteúdo)

**Obs. 1 — a 2024 F2 está no banco com 14 de 15 questões.**
Falta apenas a **Q15 de 2024** (o código de símbolos: ESPORTE → ⴃ Ȣ ˨ Π Ͽ ֏ ⴃ, gabarito B). Ela depende de sete glifos alinhados 1-a-1 e é a única da 2ª fase que não sobrevive sem a tabela de símbolos. A ausência é coerente com o total de 29 itens combinado e **não é falha** — só fica registrado que o gabarito oficial 2024 F2 nº 15 = B não tem item correspondente no banco.

**Obs. 2 — `enun` de 25F2Q11 ainda diz "OBSERVE AS FIGURAS:" embora não haja figuras.**
A `nota` já resolve em português claro ("Na prova aparecem três gravuras e é a criança que descobre os nomes… Aqui os nomes já vêm escritos"), então a adaptação é legítima. Mas o item irmão (24F2Q8) recebeu o ajuste também no `enun` ("VEJA A FIGURA…" → "ESTE É O NOME…"), e aqui não.
- Está lá: `enun:'OBSERVE AS FIGURAS:'`
- Ficaria coerente com o irmão: `enun:'ESTES SÃO OS NOMES DAS FIGURAS:'`
(Estilo/consistência, não conteúdo.)

**Obs. 3 — `proximo` de 24F2Q4 afirma que CENTRO é "a única palavra conhecida das quatro".**
ACERTO também é palavra comum do português. A frase vem do DOSSIE_2024 ("a única palavra COMUM da lista"), que é apoio e não autoridade. Não afeta o gabarito nem o raciocínio, mas é uma afirmação frouxa dentro de um item cujo mérito é justamente exigir conferência letra a letra.
- Está lá: `'CENTRO é a única palavra conhecida das quatro, e é justamente ela a intrusa. Confira as letras uma por uma; não confie no que parece familiar.'`
- Formulação exata sugerida: `'CENTRO é a palavra mais familiar do grupo, e é justamente ela a intrusa. Confira as letras uma por uma; não confie no que parece familiar.'`

**Obs. 4 — 24F2Q9 tem `texto` (5 falas) e eixo `silabas`, sem `acende`.**
A regra de `acende` vale para eixo `ler`, então não há falha. Ainda assim, a resposta depende de uma linha específica — a última, `— CLARO QUE NÃO, ELES FORAM CORRER!` (índice 4) — e um `acende:[4]` ajudaria a criança a achar "a última frase" de que o `pede` fala. Mesma situação, em menor grau, em 25F2Q1 (poema decorativo, resposta não depende de linha).

**Obs. 5 — em 24F2Q14 e 25F2Q9, a palavra "ABAIXO" do `pede` aponta para cima.**
A ordem de render de `OP_questao.js` é `enun → nota → quadro → texto → pede`. Em 24F2Q14 o `pede` diz "NA FRASE ABAIXO, QUE A ESCOLA COMUNICOU…", mas a frase está no `quadro`, portanto **acima** do `pede`. É fidelidade verbatim ao papel (na prova a frase vinha depois), e não muda o raciocínio; só soa estranho na tela.
- Está lá: `pede:'NA FRASE ABAIXO, QUE A ESCOLA COMUNICOU PELOS ALTO-FALANTES, QUANTOS CHIADOS OS ALUNOS PODERÃO OUVIR?'`
- Se quiser corrigir a direção sem tocar no que se pede: `pede:'NA FRASE ACIMA, QUE A ESCOLA COMUNICOU PELOS ALTO-FALANTES, QUANTOS CHIADOS OS ALUNOS PODERÃO OUVIR?'`

---

## NOTAS DE MÉTODO

- **O erro conhecido do dossiê não contaminou o banco.** O DOSSIE_2024 (Fase 2 · Q1) afirma que GUARDANAPO "tem 10 letras, mais até que APOSENTADO". As duas têm 10. O item 24F2Q1 escreve corretamente "as mesmas 10 letras de APOSENTADO" — o banco seguiu a prova, não o dossiê.
- **Contagem de 24F2Q14 refeita de forma independente** (letras S = 7; C = 2; chiados = 8), batendo com o gabarito B e com o `visual` do item.
- **Figuras conferidas no dossiê antes de aceitar as adaptações:** 25F2Q11 = cachorro + nariz + bananeira (CA/NA/BA); 24F2Q8 = sapo. As duas `nota` descrevem exatamente o que a prova traz.
- **Integridade estrutural:** 29 ids únicos, sem duplicatas; todos com 4 alternativas e exatamente um `ok:1`; todos com `dica`, `truque`, `visual`, `porque` e `proximo`; todas as strings `origem` batem com ano, fase e número do id.
