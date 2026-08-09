# 🎬 PROMPT-MESTRE PARA NOTEBOOKLM — VÍDEO EDUCATIVO INFANTIL

> Prompt genérico, pronto para copiar/colar. Preencha os campos `[ENTRE COLCHETES]`
> no topo e use o resto como está. Funciona com as SUAS fontes, no SEU NotebookLM.

> **Como usar (passo a passo):**
> 1. Crie um notebook novo no NotebookLM.
> 2. Faça **upload das suas fontes** (PDFs da escola, slides, fotos do caderno, apostila). Quanto mais material real, melhor — o vídeo só usa o que você subir.
> 3. **Preencha o BLOCO DE CONFIGURAÇÃO** abaixo (campos entre colchetes).
> 4. Cole o **PROMPT 1** no chat para gerar o roteiro estruturado.
> 5. Clique em **"Video Overview"** (ou "Audio Overview") e cole o **PROMPT 2** nas instruções de customização.
> 6. Baixe e use.

---

## ⚙️ BLOCO DE CONFIGURAÇÃO — preencha antes de colar

```
IDADE DA CRIANÇA:        [ex: 7 anos]
ANO/SÉRIE:               [ex: 2º ano / Year 2]
MATÉRIA:                 [ex: Ciências / História / Inglês]
TEMA DA UNIDADE:         [ex: "Estados da Matéria" / "Marcadores do Tempo"]
IDIOMA DO VÍDEO:         [Português do Brasil  OU  English]
OBJETIVO:                [ex: revisar para a prova de amanhã]
DURAÇÃO ALVO:            [ex: 8 a 10 minutos]
TÓPICOS A COBRIR:        [liste os 3 a 5 tópicos principais da unidade — copie do
                          sumário do material da escola; um por linha]
```

---

## 📝 PROMPT 1 — ROTEIRO ESTRUTURADO (colar no chat)

```
Você é um(a) professor(a) super animado(a) e carinhoso(a) explicando [MATÉRIA]
para uma criança de [IDADE]. A criança está se preparando para [OBJETIVO].

Com base EXCLUSIVAMENTE nos documentos e imagens que subi (não invente nada que
não esteja nas fontes), crie um roteiro de vídeo completo sobre o tema
"[TEMA DA UNIDADE]", cobrindo TODOS estes tópicos nesta ordem:

[COLE AQUI OS TÓPICOS — para cada um, peça que percorra os slides/páginas
correspondentes e explique os conceitos, vocabulário e exemplos do material.
Exemplo de como detalhar um tópico:]

TÓPICO 1 — [NOME]
- Percorra cada slide/página sobre este tópico e explique o conceito principal
- Liste os exemplos concretos que aparecem no material (não invente novos)
- Vocabulário-chave que a criança precisa saber

(repita o formato para os tópicos 2, 3, 4...)

REGRAS DE FORMATO (obrigatórias):
- Idioma: [IDIOMA DO VÍDEO]
- Frases curtas: no máximo 12 a 15 palavras por frase
- Linguagem simples, mas SEM simplificar o conteúdo real da prova
- Use exemplos do dia a dia de uma criança de [IDADE]
- Referencie cada imagem/slide ao falar dele ("Olha esta figura!", "Viu neste slide...")
- Inclua momentos "Você sabia?" com curiosidades retiradas do material
- Ao final de cada tópico: 1 pergunta rápida de revisão
- Termine com uma frase de incentivo: "Você está pronto(a) pra prova! Você consegue!"
- Tom: empolgado e acolhedor, como um programa de TV infantil — NÃO tom de sala de aula
- NÃO infantilizar demais: a criança tem [IDADE], não 3 anos
```

---

## 🎥 PROMPT 2 — CUSTOMIZAÇÃO DO VIDEO/AUDIO OVERVIEW (colar ao gerar)

```
Crie um vídeo usando os slides e imagens das fontes como elementos visuais.
Mostre cada slide enquanto o(a) narrador(a) o explica.
O público é uma criança de [IDADE] se preparando para [OBJETIVO].

Cubra os tópicos NESTA ORDEM, usando os slides como âncora visual:
[LISTE OS MESMOS TÓPICOS DO PROMPT 1]

ESTILO:
- Dois apresentadores animados e encorajadores
- Ritmo alegre, com entusiasmo genuíno pelo tema
- Use perguntas retóricas para a criança ("Você já reparou que...?")
- Frases curtas, vocabulário simples
- Sem estereótipos; foco em aventura, descoberta e curiosidade
- Encerre com: "Você está SUPER preparado(a)! Estamos orgulhosos de você!"

DURAÇÃO: [DURAÇÃO ALVO]
IDIOMA: [IDIOMA DO VÍDEO]
```

---

## ✅ Checklist de qualidade (o que faz a diferença)

- **Suba fontes reais e ricas** — PDF da escola + fotos do caderno + apostila. O vídeo é tão bom quanto as fontes.
- **"Não invente nada fora das fontes"** está no prompt de propósito — evita o NLM alucinar conteúdo que não cai na prova.
- **Liste os tópicos exatamente como aparecem no material da escola** — garante cobertura completa.
- **Frases ≤15 palavras + idade explícita** — calibra a linguagem pro nível certo.
- **Idioma**: matéria em inglês → gere em inglês; matéria em português → gere em PT-BR.
