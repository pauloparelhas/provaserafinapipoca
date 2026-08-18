# PROMPT-PIPELINE — Material de Estudo da Mariana (7 anos)

> Cole este arquivo no projeto da Mariana (ele complementa o `CLAUDE.md` que já existe lá).
> É a **lógica de pipeline + workflow** para transformar o material de uma prova em produtos
> curtos, visuais e divertidos para uma criança de 7 anos. Inspirado no pipeline do projeto
> Prático (PSCPP), mas **adaptado ao público infantil** e **sem auditoria pesada** — no lugar,
> usamos checklists rápidos de qualidade.

---

## 0 · Princípio mestre (leia antes de tudo)

**O consumidor é uma criança de 7 anos.** Cada decisão de produto passa por três filtros:

1. **Curto** — nada de leitura longa. Bloco de texto = 1 a 2 frases simples. Uma ideia por tela.
2. **Visual** — figura, ícone, cor e diagrama explicam mais que palavra. Texto é legenda do desenho, não o contrário.
3. **Divertido** — mascote, jogo, recompensa (estrelinhas), pergunta-brincadeira. Tom de história, não de aula.

Vocabulário de criança: frases curtas, palavras concretas, analogias do dia a dia (animais, brinquedos, comida, escola). Fonte grande, muito espaço em branco, sem parede de texto.

---

## 1 · Arquitetura do pipeline (visão geral)

O pipeline é **file-driven** (cada etapa lê/escreve arquivos; o estado vive em disco, não na memória da conversa) e **replicável** (toda prova/matéria segue a mesma sequência). Isso permite rodar em **automode** e **retomar com wakeup** sem perder o fio.

```
[material da prova: PDF/foto/print/caderno]
            │
   0. MAPEAR + SEQUENCIAR fontes  → _outline_pedagogico.md   (ordem de aprendizado, não a ordem do material)
            │
   1. EXTRAIR conteúdo + FIGURAS  → conteudo/  + figuras/_figmap.json   (extrai do material; identifica/nomeia cada figura)
            │
   2. BASE (não é template)       → os HTML da matéria ANTERIOR   (motor idêntico; ver nota abaixo)
            │
   3. DERIVAR a casca             → script de substituições EXATAS que imprime o que não achou
            │
   4. PRODUTOS derivados (fan-out) → revisão · simulado · aventura · flashcards · classificar ·
                                     galeria · laboratório 3D · roteiro de vídeo
            │
   5. NotebookLM                   → sobe o consolidado como fonte p/ conversar/estudar
            │
   6. ENTREGA + commit por etapa   → pasta da Mariana / portal / impressão
```

**Regras de ouro do pipeline (herdadas do Prático):**
- **Um commit por etapa concluída** (não um commit gigante no fim). Mensagem clara do que entrou.
- **Template é imutável**: define-se UMA vez, com capricho; não se reescreve a cada matéria.
- **Versionamento sagrado**: melhorar um produto que já existe = `Edits` pontuais; mudança grande = salvar `-v2` ao lado, **nunca sobrescrever** o que já foi validado.
- **Source-from-material**: o conteúdo sai do material da prova, não de conhecimento externo. Se faltar a fonte de um tópico, **pausar e perguntar** — não inventar.
- **Checklist rápido por etapa** (no lugar de auditoria): 3-5 perguntas de sim/não antes de seguir.

---

## 2 · Etapa 0 — Mapear e SEQUENCIAR fontes não-sequenciais

O material de uma prova quase nunca vem em ordem de aprendizado: vem em ordem de caderno, de slides soltos, de fotos do quadro. **Antes de produzir qualquer coisa, monte a ordem pedagógica.**

Crie `_outline_pedagogico.md` com:

1. **Inventário das fontes** — liste cada pedaço (PDF, foto, página do caderno, link) com um rótulo curto e o(s) tópico(s) que ele cobre.
2. **Mapa de pré-requisitos** — para cada tópico, o que a criança precisa saber ANTES dele. (Ex.: "somar" vem antes de "multiplicar"; "o que é um substantivo" antes de "singular/plural".)
3. **Ordem final de aprendizado** — uma lista numerada do mais simples ao mais complexo, **independente da ordem do material**. Cada item aponta de qual fonte sai o conteúdo.

```
# _outline_pedagogico.md
## Fontes
- F1  caderno_pag3-5.pdf      → tópicos: vogais, sílabas
- F2  slide_animais.png       → tópico: substantivos (exemplos)
- F3  prova_modelo.pdf        → todos (define o que cai)

## Ordem de aprendizado (do simples ao difícil)
1. Vogais e sons        (de F1)        — pré-requisito de tudo
2. Sílabas              (de F1)        — precisa de 1
3. Substantivo: o nome das coisas (de F2) — precisa de 2
4. Singular e plural    (de F2 + F3)   — precisa de 3
```

> **É este `_outline` que "dá sequência" a fontes não-cronológicas.** Todos os produtos seguem a ordem dele, não a ordem em que o material chegou.

**Checklist rápido da Etapa 0:** (1) toda fonte foi inventariada? (2) a ordem vai do simples ao complexo? (3) cada tópico que cai na prova está coberto por alguma fonte? (4) nada depende de algo que vem depois?

---

## 3 · Etapa 1 — Extrair conteúdo + FIGURAS do material

Diferença em relação ao Prático: lá as figuras já vinham extraídas; **aqui é preciso extrair as figuras do próprio material.**

**Conteúdo (texto):** para cada item do `_outline`, recolha do material a definição simples, os exemplos e qualquer regrinha. Reescreva já em linguagem de criança (não copie frase de adulto). Salve em `conteudo/NN-topico.md`.

**Figuras — extração e identificação:**
1. **Extrair** as imagens do PDF/fotos (ferramenta de extração de imagens de PDF, ou recortar das fotos). Salve em `figuras/` com nome provisório.
2. **Identificar 1-a-1**: abrir cada imagem e descrever o que ela mostra; dar um rótulo que diga o tópico (`fig-vogais-boca.png`, `fig-animais-fazenda.png`). Registrar em `figuras/_figmap.json`:
   ```json
   {
     "fig-vogais-boca": { "arquivo": "img02.png", "topico": "vogais", "descricao": "boca formando A-E-I-O-U" },
     "fig-animais":     { "arquivo": "img05.png", "topico": "substantivos", "descricao": "fazenda com vaca, pato, cavalo" }
   }
   ```
3. **Faltou figura boa?** Para criança, uma figura ruim/cortada é pior que nenhuma. Se o material não tiver uma imagem clara de um conceito importante, **marque para gerar/desenhar uma** (ícone simples, ilustração) em vez de usar um recorte ilegível.

**Checklist rápido da Etapa 1:** (1) cada tópico tem texto curto em linguagem de criança? (2) cada figura tem rótulo e descrição? (3) figuras cortadas/ilegíveis foram descartadas ou substituídas? (4) o número da figura bate com o tópico certo?

---

## 4 · Etapa 2 — A base (definir UMA vez, com capricho)

> **Correção de 17/08/2026 — o que realmente aconteceu.** Esta etapa dizia: crie um
> `templates/wal-kids-base.html` e congele-o. Na prática, a "Apostila Mágica" nunca foi
> feita, e **duas matérias seguidas (Geografia e Matemática) nasceram de outro jeito, que
> funcionou**: copiar os HTML da matéria anterior — motor idêntico, já testado — e trocar
> só a casca e o bloco de dados. Os `templates/` foram apagados junto com o resto do
> material antigo (estão no histórico do git). **A base hoje é `ferramentas/MAT2_*.html`.**
>
> O parágrafo abaixo continua valendo como *critério de qualidade da base* — só troque
> "template" por "a matéria anterior", e "congelar" por "não reescrever o motor".

O coração da qualidade está aqui. A base é **uma só**, caprichada e estável. Matéria nova
preenche os espaços; ninguém reescreve o motor no dia a dia.

**O que o template kids precisa ter:**
- **Páginas curtas** ("uma ideia por tela"), navegação por setas grandes ou rolagem com seções bem separadas.
- **Bloco padrão** = título curto + 1 figura grande + 1-2 frases + (opcional) uma caixinha "Dica" ou "Brincadeira".
- **Mascote** fixo (um bichinho) que aparece dando dicas — dá identidade e acolhe a criança.
- **Cores e ícones** consistentes por tipo de caixa: 💡 dica, ⭐ importante, 🎮 brincadeira, ❓ pergunta.
- **Fonte grande**, contraste alto, muito espaço em branco. Zero parágrafo longo.
- **Áudio opcional**: botão que lê a frase em voz alta (a criança ainda lê devagar) — leitura por voz nativa do navegador.
- **Tudo num arquivo só** (HTML/CSS/JS embutidos), para abrir em qualquer tablet/celular sem instalar nada.
- **Acessível offline**: figuras embutidas (base64), nada que dependa de internet para a criança estudar.

**Princípio de excelência visual:** o produto tem que ser **gostoso de usar**, não só correto. Diagramação é parte do conteúdo, não enfeite. Defina no template os mínimos: 1 figura por tela de conceito, caixas coloridas, ícones, botão de áudio.

---

## 5 · Etapa 3 — Montar a "Apostila Mágica" (WAL kids)

Preencha o template seguindo **a ordem do `_outline_pedagogico`** (não a do material). Cada tópico vira uma sequência curta:

```
[Tela] Título alegre  →  Figura grande  →  1-2 frases simples  →  Caixa 🎮 "Vamos brincar?"
```

- Tabelas de adulto viram **desenhos comparativos** ou **pares de figuras** (ex.: "1 gato / muitos gatos" lado a lado, não uma tabela singular/plural).
- Regras viram **frases-mnemônica curtas** ou **musiquinha**.
- Cada conceito fecha com uma micro-pergunta lúdica (resposta vem com ⭐).

**Checklist rápido da Etapa 3:** (1) nenhuma tela tem mais que ~2 frases? (2) toda tela de conceito tem figura? (3) a ordem segue o `_outline`? (4) tem pelo menos uma brincadeira por tópico? (5) abre no tablet sem internet?

---

## 6 · Etapa 4 — Produtos derivados (use o Workflow para fan-out)

Aqui sim cabe **orquestração paralela**: depois da Apostila pronta, gere os derivados em paralelo, um agente por produto. Esta é a hora do `Workflow` (fan-out → cada produto independente).

| Produto | Forma | Por que funciona com 7 anos |
|---|---|---|
| **Mapa mental** | imagem/diagrama colorido, central + ramos com ícones | mostra o todo num olhar; cada ramo é uma figura |
| **Roteiro de vídeo** (1-3 min) | texto curto de narração + indicação de cada cena/figura | criança aprende vendo+ouvindo; curtinho segura a atenção |
| **Quiz lúdico** | 5-8 perguntas, alternativas com figura, recompensa em ⭐ | vira jogo; erro não pune, convida a tentar de novo |
| **Flashcards ilustrados** | frente = figura/pergunta, verso = resposta curta | revisão rápida, formato de "cartinha" que criança adora |
| **Musiquinha/rima** (opcional) | mnemônico cantado | fixa regra chata (ex.: ordem, exceções) brincando |

Padrão de orquestração (1 agente por produto, todos lendo a Apostila + `_outline`):

```
pipeline(PRODUTOS,
  p => gerar(p, lendo: Apostila + _outline + figuras),   // cada produto em paralelo
)
```

**Checklist rápido da Etapa 4:** (1) o vídeo tem menos de 3 min de narração? (2) o quiz premia o acerto e acolhe o erro? (3) os flashcards cabem na palma da mão (poucas palavras)? (4) tudo usa as MESMAS figuras/cores da Apostila (identidade visual única)?

---

## 7 · Etapa 5 — NotebookLM (estudo conversável)

Consolide o conteúdo da matéria num único markdown e suba como **fonte** no caderno da Mariana. Assim dá para "conversar" com o material (perguntar, pedir mais exemplos) usando a CLI autenticada — mesma lógica de automação do projeto principal (nada colado à mão).

---

## 8 · Etapa 6 — Entrega + commit por etapa

- Cada etapa concluída = **um commit** com mensagem clara (`feat(materia X): apostila kids montada`, `feat(materia X): quiz + flashcards`).
- Entrega na pasta/portal da Mariana; se for impresso, exportar as telas em PDF caprichado.
- Atualizar um `_materia.md` com o checklist de etapas (✅/⏳) — é o painel de progresso da matéria.

---

## 9 · Automode + Wakeup (rodar sozinho e retomar)

O pipeline é longo e tem esperas (extração, NotebookLM, geração de produtos). Para não ficar travado:

- **Automode**: deixe o pipeline rodar etapa após etapa sem pedir OK a cada passo. Só pausa para **decisões de conteúdo ambíguas** (um tópico que pode ser ensinado de dois jeitos), para **ações destrutivas** ou quando **falta a fonte** de um tópico.
- **Operações longas em background** (extração de figuras, NotebookLM, render de vídeo) + voltar a checar depois — nunca ficar bloqueado esperando.
- **Wakeup agendado**: quando depender de algo externo que demora (processamento do NotebookLM, fila de render), **agende a retomada** em vez de ficar parado, e continue de onde parou (o estado está nos arquivos).
- **STOP_STATE**: se a sessão for interrompida, deixe um `_stop_state.md` curto dizendo o que está pronto e qual é o próximo passo — para retomar limpo na próxima janela.

---

## 10 · Replicação (runbook por matéria)

Toda matéria nova = repetir exatamente:

```
0. _outline_pedagogico.md       (sequenciar fontes não-cronológicas)
1. extrair conteúdo + figuras   (conteudo/ + figuras/_figmap.json)
2. (template já existe — não mexer)
3. montar Apostila Mágica       (WA/<materia>-kids.html)
4. fan-out dos produtos         (mapa · vídeo · quiz · flashcards · musiquinha)
5. NotebookLM (fonte consolidada)
6. entrega + commit por etapa
```

Mesma sequência, mesmo template, mesma identidade visual (mascote/cores/ícones). É a replicação clara que faz cada nova prova sair rápido e com qualidade constante.

---

### Resumo em uma frase
Pegue o material bagunçado de uma prova, **coloque os conceitos em ordem de aprender**, **extraia e identifique as figuras**, e despeje tudo num **template kids caprichado** que vira Apostila + mapa + vídeo + quiz + flashcards — curtos, coloridos e divertidos — rodando em automode, com commit por etapa e retomada agendada.
