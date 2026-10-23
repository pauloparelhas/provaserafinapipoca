# Oficina do Robô — como um pedido da Mariana vira peça do jogo

O "robô" da tela **Robô** somos nós (Claude, nesta pasta). A Fábrica é um site estático e não
chama IA sozinha: o pedido sai num arquivo e volta como peça no banco. Isso é de propósito —
o Paulo vê tudo o que entra, e nada chega à criança sem passar pelo portão.

## O caminho

```
Mariana preenche O QUE É / COMO É / O QUE FAZ  →  "Mandar para o robô"
   → o navegador baixa  Downloads/fabrica_mariana_AAAAMMDD-HHMM.json  (o estado inteiro dela)
Paulo diz no Claude Code: "pedidos da Mariana"  (skill fabrica-mariana)
   → Claude pega o .json mais novo, copia para coding/_engenharia/entrada/ (local, fora do git)
   → lista os pedidos com estado "enviado" que ainda não têm entrega em banco/oficina.js
   → constrói cada PEÇA (nunca o jogo inteiro) e registra em banco/oficina.js
   → roda o portão (abaixo), commit, push, publica
Mariana abre a Fábrica  →  pedido aparece "Pronto!" com a frase do robô, peça com selo "novo"
```

## O que cada tipo de pedido vira

| Ela pediu | Vira | Como |
|---|---|---|
| Personagem / Inimigo / Coisa | sprite 16×16 (2 quadros se anda) | `FAB.oficina.sprite(id, {...}, pedId)`; se é inimigo/coisa nova com comportamento já existente, também `FAB.oficina.tipo(id, {letra, classe, skin, nome, mover}, grupo, pedId)` |
| Peça da fase | sprite + tipo (classe `solido`, `nuvem`, `perigo`, `especial`, `item`) | idem |
| Cenário | `FAB.oficina.cenario(id, {nome, ceu:[c1,c2], morros, morros2, nuvens|estrelas|bolhas|cristais|planeta})` | |
| Som | `FAB.oficina.som(id, {nome, onda, notas:[[freq, dur],...]})` | aparece em "tocar som" |
| Regra nova | bloco novo em `banco/blocos.js` (QUANDO / SE / FAÇA) + o `case` no `faz()` ou `dispara()` do `js/motor.js` | é a única entrega que mexe no motor; sempre com teste no jogador-robô |
| Comportamento que o motor não tem (ex.: "solta bolhas") | novo `mover` em `passoInimigo()` do motor | registrar no ROADMAP como capacidade nova |

Letras de mapa já usadas: `# T B P X I = ~ L ^ M o * h k D F ? C g b a f s @` — peça nova usa
letra livre (minúscula ou dígito, nunca `.`).

## Regras da oficina

1. **Peça, não jogo.** Ela encaixa a peça na fase e escreve a regra. O robô nunca monta a fase dela.
2. **Fiel ao pedido.** As cores e o jeito que ela descreveu aparecem no desenho. Se o pedido for
   vago, a entrega é uma pergunta curta (`entrega(pedId, 'O robô quer saber: de que cor ele é?')`)
   e ela manda de novo — isso ensina a especificar.
3. **Frase da entrega** fala com ela, até 12 palavras, no passado: "Fiz o Dragão Bolha roxo. Ele voa!".
4. **Pixel art de verdade**: contorno `k`, luz e sombra, 16×16, só letras da paleta. Nada de emoji.
5. **Conteúdo infantil**: nada assustador de verdade, nada de violência gráfica; o agente `guardiao`
   olha toda peça nova antes de publicar.
6. **Portão** (todos verdes, senão não publica):
   - `node coding/_engenharia/gate/valida_banco.js`
   - `python coding/_engenharia/gate/qa_fabrica.py`
   - `python coding/_engenharia/gate/jogador_robo.py`
