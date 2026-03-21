# Prompt para NotebookLM — Video Historia U1
## "Quanto tempo o tempo tem?"

### INSTRUCOES DE USO
1. No NotebookLM, crie um novo notebook
2. Faca upload dos 2 PDFs da pasta 03_HISTORIA como fontes:
   - `U1- Quanto tempo o tempo tem.pdf` (planner da escola)
   - `Toddle-...Unidade1 - Quanto tempo o tempo tem_ Historia Y2.pdf` (slides)
3. Cole o prompt abaixo na area de chat do NotebookLM
4. Para gerar AUDIO/PODCAST: use o botao "Audio Overview" e cole as instrucoes de tom
5. Para gerar VIDEO: NotebookLM nao gera video nativo — use o audio gerado + imagens/slides para montar no CapCut, Canva Video, ou similar

---

### PROMPT PARA RESUMO ESTRUTURADO (colar no chat)

```
Voce e uma professora super legal e animada explicando Historia para uma crianca de 7 anos.
O tema e "Quanto tempo o tempo tem?" — Unidade 1 de Historia do 2o ano.

Com base nos documentos que voce tem, crie um resumo completo cobrindo TODOS estes topicos:

1. MARCADORES DO TEMPO
- O que sao marcadores do tempo?
- Instrumentos antigos: Relogio de Sol, Ampulheta, Clepsidra (relogio de agua)
- Instrumentos do dia a dia: Relogio de Ponteiro, Relogio Digital, Calendario
- Marcadores da natureza: Dia e Noite, Estacoes do Ano

2. TEMPO RAPIDO E TEMPO DEVAGAR
- Por que brincar parece passar rapido?
- Por que esperar na fila parece demorar?
- O tempo do relogio e sempre igual, mas a gente SENTE diferente

3. ANTES, DEPOIS, AO MESMO TEMPO
- Ordenar eventos: o que vem primeiro na sua rotina?
- Ontem, hoje e amanha
- Linha do tempo: como organizar acontecimentos

4. OBJETOS DE MEMORIA
- Objetos que guardam lembranças (foto, brinquedo antigo, cobertor)
- Fases da vida: bebe, crianca, adulto
- Cada pessoa tem memorias diferentes dos mesmos momentos

REGRAS DE FORMATO:
- Linguagem simples, frases curtas (max 15 palavras por frase)
- Use exemplos do dia a dia de uma crianca de 7 anos
- Inclua emojis para deixar divertido
- Ao final de cada topico, inclua 2 perguntas de revisao (multipla escolha, 3 opcoes)
- Tom: animado, encorajador, como se estivesse contando uma historia — NAO tom de sala de aula
- NAO simplifique demais: a crianca precisa aprender o conteudo real da prova
```

---

### INSTRUCOES PARA AUDIO OVERVIEW (podcast)

Ao clicar em "Audio Overview" no NotebookLM, use estas instrucoes de customizacao:

```
Crie uma conversa entre duas apresentadoras mulheres, em portugues do Brasil.
O publico e uma crianca de 7 anos se preparando para uma prova de Historia.

TOM E ESTILO:
- Animado e envolvente, como um programa de TV infantil (pense Mundo Bita, Galinha Pintadinha)
- As apresentadoras devem parecer genuinamente empolgadas com o tema
- Usar perguntas retoricas para a crianca ("Voce ja reparou que...")
- Incluir momentos de "voce sabia?" com curiosidades
- NAO ser infantilizado demais — a crianca tem 7 anos, nao 3
- Universo feminino mas sem estereotipos: referencias a aventura, descoberta, curiosidade
- Duracao ideal: 5-8 minutos

CONTEUDO OBRIGATORIO (cobrir tudo):
1. O que sao marcadores do tempo (relogio de sol, ampulheta, clepsidra, relogio digital, calendario)
2. Tempo rapido vs devagar (brincar = rapido, esperar = devagar)
3. Antes, depois, ao mesmo tempo (rotina diaria como exemplo)
4. Objetos que guardam memorias (foto, brinquedo antigo)

ENCERRAR COM:
- Resumo rapido dos 4 topicos
- Frase motivacional: "Voce esta super preparada pra prova!"
- Uma ultima pergunta para a crianca pensar
```

---

### PROMPT PARA QUIZ EM JSON (colar no chat)

```
Com base nos documentos, gere um quiz em formato JSON com 15 perguntas sobre a Unidade 1.
Nivel: 2o ano do fundamental (7 anos).

Cobrir equilibradamente:
- 4 perguntas sobre instrumentos/marcadores do tempo
- 4 perguntas sobre tempo rapido vs devagar
- 4 perguntas sobre antes/depois/ordenacao
- 3 perguntas sobre objetos de memoria e fases da vida

Formato JSON:
[
  {
    "topic": "instrumentos",
    "question": "Pergunta aqui?",
    "options": ["Opcao A", "Opcao B", "Opcao C"],
    "correct": 0,
    "explanation": "Explicacao curta e animada"
  }
]

REGRAS:
- Opcoes claras, sem ambiguidade
- Apenas UMA resposta correta por pergunta
- Explicacao em tom amigavel (max 1 frase)
- Nao usar "todas as anteriores" ou "nenhuma das anteriores"
- Vocabulario simples mas preciso
```

---

### COMO MONTAR O VIDEO

NotebookLM gera audio (podcast), nao video. Para transformar em video:

**Opcao 1 — Canva Video (mais facil):**
1. Gere o audio no NotebookLM e baixe o MP3
2. No Canva, crie um video (formato 9:16 para celular)
3. Adicione o audio como trilha
4. Insira imagens/ilustracoes de cada topico como slides sincronizados com o audio
5. Adicione textos-chave que aparecem na tela
6. Exporte como MP4

**Opcao 2 — CapCut (mais controle):**
1. Importe o audio do NotebookLM
2. Adicione imagens/slides da pasta 03_HISTORIA como B-roll
3. Use transicoes suaves entre topicos
4. Adicione legendas automaticas (recurso do CapCut)
5. Exporte como MP4

**Imagens sugeridas para o video:**
- Relogio de Sol (buscar imagem livre ou usar os SVGs do site)
- Ampulheta com areia caindo
- Relogio antigo de pendulo
- Celular mostrando horas
- Calendario na parede
- Crianca brincando (tempo rapido) vs crianca esperando (tempo devagar)
- Linha do tempo com rotina diaria
- Caixa de lembranças com fotos e brinquedos

Salvar o video final em: `03_HISTORIA/assets/video_u1_tempo.mp4`
Eu (Claude) integro com player HTML5 no site.
