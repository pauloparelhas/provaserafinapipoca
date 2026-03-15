# AGENTE REPLICAÇÃO — PROJETO SERAFINA
**Papel:** Preparar o projeto para ser replicado em AFs futuras com novos conteúdos e matérias
**Ativado em:** 08/03/2026

---

## RESPONSABILIDADE CENTRAL

Ao final de cada AF ou trimestre, empacotar o que foi aprendido em:
1. **Kit de arranque** — estrutura de pastas e arquivos prontos para um novo projeto
2. **Instruções de uso** — passo a passo para quem for replicar (humano ou IA)
3. **Template de ferramenta** — HTML base comentado, pronto para adaptar conteúdo
4. **Checklist de onboarding** — o que ler, em que ordem, antes de produzir

---

## QUANDO ESTE AGENTE É ATIVADO

- Ao concluir uma AF completa (todas as ferramentas entregues)
- Ao final de cada trimestre
- Quando o autor decidir iniciar um novo projeto derivado (nova escola, nova série, etc.)
- Quando houver decisão técnica ou pedagógica nova relevante para o template

---

## KIT DE REPLICAÇÃO — COMPONENTES

### 1. Estrutura de pastas (replicar exatamente)
```
novo_projeto/
  index.html                          ← copiar do projeto Serafina e adaptar título
  00_COORDENACAO/
    documentacao_tecnica/
      MEMORY.md                       ← zerar estado, manter estrutura
      TECH.md                         ← copiar integral + atualizar seção de ferramentas
    taxonomia/
      MAPA_TAXONOMIA.md               ← zerar status, manter estrutura de colunas
    AGENTE_GERENTE_PROJETO.md         ← copiar + atualizar backlog e datas
    AGENTE_PEDAGOGICO.md              ← copiar integral (pedagógico é universal)
    AGENTE_TI.md                      ← copiar integral (técnico é universal)
    AGENTE_GRAMATICO.md               ← copiar integral
    AGENTE_REVISOR_CONTEUDO.md        ← copiar integral
    AGENTE_ARQUIVISTA.md              ← copiar + atualizar estrutura de pastas
    AGENTE_REPLICACAO.md              ← copiar integral
  01_[DISCIPLINA_A]/
    materiais_escola/
    ferramentas/
  02_[DISCIPLINA_B]/
    materiais_escola/
    ferramentas/
  ...
```

### 2. O que SEMPRE adaptar ao replicar
| Item | Onde | O que mudar |
|---|---|---|
| Nome do projeto | MEMORY.md, index.html | "Projeto Serafina" → novo nome |
| Personagem | AGENTE_PEDAGOGICO.md | Serafina → personagem relevante ao novo livro |
| Disciplinas | MAPA_TAXONOMIA.md | Códigos LP/ELA/HIS → novos códigos |
| Datas das AFs | AGENTE_GERENTE_PROJETO.md | Atualizar calendário |
| Backlog | AGENTE_GERENTE_PROJETO.md | Limpar e repovoar com novos conteúdos |
| Lista de palavras rejeitadas | AGENTE_GRAMATICO.md | Manter lista + adicionar novas |

### 3. O que NUNCA mudar ao replicar
- Design system visual (cores, navbar, estrelas, cards)
- Mecânicas de interação (drag-drop, click-to-move, anti-repetição)
- Regras de UX (card-ok bloqueado, card-err interativo, delay 2400ms, skip silencioso)
- Fluxo de produção (design antes de codar, gates de qualidade)
- Estrutura interna dos HTMLs (canvas + nav + screens + dialog + script)

---

## TEMPLATE HTML BASE

O arquivo base para qualquer nova ferramenta está documentado no TECH.md.
Para criar uma nova ferramenta do zero, o desenvolvedor deve:

1. Abrir qualquer ferramenta existente de complexidade similar
2. Substituir os arrays de dados (CONTENT / GAME_DATA / etc.)
3. Adaptar a lógica de validação para o novo tipo de interação (se diferente)
4. Manter toda a estrutura de navbar, canvas, screens, acessibilidade intacta
5. Atualizar o `<title>` e textos de interface

**Ferramenta de referência por tipo de interação:**
| Tipo | Referência |
|---|---|
| drag-match | LP-08_meu_esconderijo.html (Nível 1) |
| fill-blank | LP-08_meu_esconderijo.html (Nível 2) |
| drag-order | LP-05_ordem_alfabetica.html |
| identify-write | LP-01_genero_textual_diario.html |
| drag-sort (2 grupos) | ELA-02_bucket_filler.html (quando concluído) |

---

## INSTRUÇÕES PARA NOVA IA / NOVO COLABORADOR

Se você está iniciando um projeto derivado deste, leia nesta ordem:

```
1. AGENTE_GERENTE_PROJETO.md    ← entenda o escopo e backlog
2. TECH.md                      ← entenda a stack e os padrões técnicos
3. AGENTE_PEDAGOGICO.md         ← entenda como se projeta uma ferramenta
4. AGENTE_TI.md                 ← entenda o checklist técnico de entrega
5. AGENTE_GRAMATICO.md          ← regras de linguagem
6. AGENTE_REVISOR_CONTEUDO.md   ← regras de conteúdo para criança
7. AGENTE_ARQUIVISTA.md         ← regras de estrutura e nomenclatura
8. MEMORY.md                    ← estado atual do projeto que está retomando
```

Não produza nada antes de ler os itens 1-4.

---

## CHECKLIST DE REPLICAÇÃO (executar ao iniciar projeto novo)

- [ ] Pasta nova criada com estrutura completa
- [ ] index.html copiado e título/links adaptados
- [ ] Todos os agentes copiados e campos variáveis atualizados
- [ ] MEMORY.md zerado (estado limpo) mas estrutura mantida
- [ ] TECH.md copiado integral (padrões técnicos são universais)
- [ ] MAPA_TAXONOMIA.md reescrito para os novos conteúdos
- [ ] Pasta .claude criada e MEMORY.md sincronizado (para auto-load do Claude)
- [ ] Teste: abrir index.html no navegador e confirmar que carrega

---

## HISTÓRICO DE REPLICAÇÕES

| Data | Projeto origem | Projeto destino | Observações |
|---|---|---|---|
| — | — | — | Primeiro projeto; nenhuma replicação ainda |
