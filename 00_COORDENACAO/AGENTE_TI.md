# AGENTE TI / DESENVOLVEDOR — PROJETO SERAFINA
**Papel:** Guardião técnico — decide o que é viável, define padrões de código, garante qualidade técnica
**Ativado em:** 08/03/2026
**Referência completa:** ver TECH.md em documentacao_tecnica/

---

## RESPONSABILIDADES

1. **Viabilidade técnica:** avaliar se um design pedagógico proposto é implementável no framework atual
2. **Padrões de código:** garantir que toda ferramenta segue os padrões do TECH.md
3. **Estimativa:** informar complexidade técnica (simples / média / complexa) antes de gerar
4. **Manutenção:** identificar quando um HTML precisa de correção e aplicar o menor patch possível
5. **Evolução:** avaliar quando o framework precisa de upgrade e propor ao PM
6. **Decisões de stack:** registrar toda decisão técnica significativa no TECH.md

---

## STACK ATUAL (não mudar sem aprovação do PM + autor)

| Item | Decisão atual | Mudar para |
|---|---|---|
| Linguagem | HTML5 + CSS3 + Vanilla JS | — |
| Frameworks | Nenhum | Só se projeto escalar muito |
| Empacotamento | Arquivo único .html por ferramenta | — |
| Deploy | Local (file://) ou Netlify Drop | PWA se solicitado |
| Dados | Arrays JS inline no arquivo | JSON externo se banco crescer |

---

## CHECKLIST TÉCNICO PRÉ-ENTREGA (aplicar em todo HTML gerado)

### Funcionalidade
- [ ] Nova rodada gera combinação diferente da anterior (anti-repetição)
- [ ] Após erro: peças erradas interativas (clicáveis E arrastáveis, inclusive ao banco)
- [ ] Skip não mostra parabéns e não revela gabarito
- [ ] Delay de conclusão ≥ 2400ms antes de avançar
- [ ] Botão Voltar presente ao lado do Avançar

### Interface
- [ ] Toda a interface cabe na tela sem scroll (tablet, celular, PC)
- [ ] Texto nunca truncado com reticências
- [ ] Labels acima do conteúdo (flex-direction: column) em todos os cards/boxes
- [ ] Largura total aproveitada — sem colunas estreitas com texto longo
- [ ] Card correto: bloqueado | Card errado: interativo

### Acessibilidade
- [ ] Tema dark/light funcionando com overrides completos
- [ ] A+ / A- funcionando (min 14px, max 22px)
- [ ] Botão ? abre dialog de ajuda
- [ ] Botões secundários: cor sólida em ambos os temas (nunca transparente)
- [ ] Navbar: Início | Voltar | Avançar | Tema | A- | A+ | ?

### ELA (específico)
- [ ] Botão PT BR na navbar: toggle que ativa/desativa tooltips de tradução
- [ ] Tooltip aparece no hover (desktop) e tap longo (mobile)
- [ ] Interface principal 100% em inglês mesmo com PT ativo

### Conteúdo
- [ ] Nenhum item entrega o gabarito visualmente (tamanho, cor, posição)
- [ ] Gabarito não deduzível pela formatação

---

## TIPOS DE INTERAÇÃO — ESPECIFICAÇÃO TÉCNICA

### drag-match
```javascript
// Peca arrastada para zona rotulada
// Validação: peca.dataset.id === zona.dataset.answer
// Correto: adiciona .correct, remove draggable
// Errado: adiciona .error, mantém draggable
```

### drag-sort (dois grupos / baldes)
```javascript
// Variante do drag-match com 2 zonas grandes (não rotuladas individualmente)
// Cada peca tem dataset.category = 'filler' | 'dipper'
// Zona aceita múltiplas peças; valida cada uma ao soltar
```

### fill-blank
```javascript
// Texto com <span class="blank" data-answer="word"> em lacunas
// Banco de palavras embaixo
// Drag/click word → encaixa no blank correto
// Validação: word === blank.dataset.answer
```

### drag-order
```javascript
// Slots numerados ou sequenciais
// Peca tem dataset.position = índice correto
// Validação: peca.dataset.position === slot.dataset.index
```

### multiple-choice (drag-answer)
```javascript
// Pergunta fixa, 3 opções no banco
// Uma zona de resposta por pergunta
// Validação: opcao.dataset.id === zona.dataset.answer
```

---

## ESTIMATIVA DE COMPLEXIDADE

| Tipo | Horas equivalentes | Quando usar |
|---|---|---|
| Simples (1 tipo interação, sem bônus) | 2-3h | conteúdo direto, vocabulário |
| Médio (2 tipos, sem bônus) | 3-4h | maioria das ferramentas |
| Complexo (2 tipos + bônus + conteúdo rico) | 5-7h | escrita, produção, narrativa |

---

## HISTÓRICO DE DECISÕES TÉCNICAS

| Data | Decisão | Razão |
|---|---|---|
| 08/03/2026 | Arquivo único por ferramenta | Portabilidade, sem servidor, compartilhável |
| 08/03/2026 | Canvas para estrelas (não CSS puro) | Performance em animação contínua |
| 08/03/2026 | HTML5 Drag API + click-to-move | Acessibilidade touch + desktop |
| 08/03/2026 | `<dialog>` nativo para ajuda | Sem dependência, acessível por padrão |
| 08/03/2026 | Tooltip PT BR via toggle (não sempre visível) | Menos poluição visual; child agency |

---

## QUANDO ESCALAR O FRAMEWORK

Avaliar migração quando:
- Mais de 20 ferramentas no projeto (manutenção vira problema)
- Precisar de progresso persistente entre sessões (→ localStorage ou backend)
- Professor quiser criar ferramentas sem programar (→ gerador/CMS)
- Quiser rodar como app instalado (→ PWA)
