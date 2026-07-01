---
lab: cie2
titulo: "Properties of Matter — Serafina Lab (Ciências 2º tri)"
publico: crianca 7 anos · Y2 Maple Bear · EN L2 · celular
natureza_dominante: DINÂMICO/SISTÊMICO (estados + partículas) + COMPARATIVO (propriedades)
fonte: trabalho/2tri_ciencias/_roteiro.md (corrigido 01/07) + _auditoria_cobertura.md
motor: ferramentas/sesilab/assets/ (cópia própria; blocos card/compare/classify/predict/sim)
objetivo_extra: fechar o buraco REAL da prova — Q5 (propriedade compartilhada, estava no insumo). Q6 viscosidade NÃO entra (fora do insumo = conta de chegada)
---

## Camada de ADAPTAÇÃO KID (spec — o motor é adulto, precisa desta casca)
O engine SESILAB nasceu para conteúdo técnico adulto (PT, "Laboratório de Meteorologia").
Adaptações OBRIGATÓRIAS nesta cópia (feitas no chapter + pequeno kid-layer, sem quebrar o engine):
1. **Bilíngue EN + PT (bandeira BR):** texto principal EN; PT aparece ao ligar a bandeira
   (padrão Serafina: `body.show-tr`, SVG do Brasil — NUNCA emoji 🇧🇷). Reaproveitar convenção `cie2`.
2. **TTS en-US ao tocar:** botão de fala em cada card/opção (speechSynthesis, en-US). Igual ela-base.
3. **Alvos ≥44px, fonte grande:** chips/botões do classify/predict com min-height 44px; A−/A+ já existe.
4. **Tema:** starfield escuro Serafina (`#0d0b1e`); rebrand "Serafina Lab · Ciências" (não "Meteorologia").
5. **Nav simples:** manter ‹ › e o sumário; esconder zoom por wheel (confunde no toque) — manter A−/A+.
6. **Nada de punição:** erro no classify/predict revela a verdade (regra de ouro Serafina), nunca trava.

## Diagnóstico por módulo (7 eixos → bloco SESILAB)

| Módulo | Natureza | Sensibilização (X→Y→Z) | Modo ativo | Bloco | Fecha |
|---|---|---|---|---|---|
| home · Início | DECLARATIVO | — | navegar | hero + modcards | — |
| m1 · The three states | DECLARATIVO/COMPARATIVO | — | prever-e-revelar | card + compare + **classify** (objetos→estado) | Q1,Q3 |
| m2 · Particles (o porquê) | DINÂMICO | mover slider de **calor** X → partículas aceleram/soltam Y → sólido→líquido→gás Z | manipular-e-observar | **sim** (caixa de partículas, slider temperatura) | Q4 |
| m3 · **Which state(s)? (propriedades)** | COMPARATIVO | escolher propriedade X → decidir só-sól/só-líq/**ambos** Y → revela que massa e ocupar espaço são de AMBOS Z | diagnosticar/classificar | **classify** 3 baldes (só sólido · só líquido · **ambos**) + callout do par L2 *take up space × take the shape* | **Q5** |
| m4 · Change of state | PROCESSUAL/CAUSAL | aquecer/esfriar X → gelo↔água↔vapor Y → mesma substância, 3 estados Z | prever-e-revelar | **sim** (aquecer/esfriar) + **predict** ("heat ice → ?") | Q7,Q9 |
| m5 · Opaque/translucent/transparent | COMPARATIVO/ESPACIAL | passar luz pelo material X → quanto atravessa Y → opaco/translúcido/transparente Z | manipular-e-observar | **classify** (itens da prova) | Q8 |
| m6 · Absorb / repel (mantido) | COMPARATIVO | — | classificar | **classify** (itens do insumo) | — (no insumo; não caiu, mantido) |
| review · Síntese | DECLARATIVO | — | auto-teste | conceptmap + checklist + **predict** | todas |

## Top-3 prioridades (o que ESTE lab existe para resolver)
1. **m3 — propriedade compartilhada (Q5, maior peso).** Balde "ambos" torna visível que sólido E
   líquido ocupam espaço e têm massa; callout treina *take up space* (ocupar) × *take the shape*
   (amoldar). Era o buraco #1 da auditoria.
2. **m2 — partículas com calor (o porquê).** Slider de temperatura liga micro (partículas) a macro
   (estado) — o "porquê" de maior peso, hoje só estático nos outros produtos.

> **Viscosidade (Q6) NÃO está aqui de propósito.** Não constava de nenhum insumo. Incluí-la só
> porque caiu na prova física seria *conta de chegada* — retrofit de uma prova já vista, que faz o
> processo parecer completo sem ser reproduzível. Item exclusivo da prova é imponderável e fica FORA
> do material. Ver `CLAUDE.md > PROTOCOLO ANTI-REDUÇÃO`.

## Checklist de autoria (doutrina SESILAB + Serafina)
- [ ] Todo bloco interativo tem laço X→Y→Z (sem decoração).
- [ ] m3 classify inclui respostas DUPLAS (mass, takes up space → ambos) junto de únicas.
- [ ] Conteúdo só do insumo (m1–m4,m6,m7); m5 rotulado "extensão inferível".
- [ ] Bilíngue EN+PT bandeira; TTS en-US; alvos ≥44px; erro revela verdade.
- [ ] Verificação AO VIVO (abrir no navegador, console limpo) antes de declarar pronto → agente `ti`.
- [ ] Após pronto: bump sw.js, index Serafina aponta pro lab, `arquivista`.
