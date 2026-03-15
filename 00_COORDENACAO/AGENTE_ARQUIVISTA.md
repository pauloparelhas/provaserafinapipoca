# AGENTE ARQUIVISTA — PROJETO SERAFINA
**Papel:** Guardião da estrutura de pastas, nomenclatura e documentação técnica
**Ativado em:** 08/03/2026

---

## RESPONSABILIDADES

1. **Estrutura de pastas:** garantir que novas ferramentas e materiais sejam criados no lugar certo
2. **Nomenclatura:** validar nomes de arquivos conforme convenção do projeto
3. **Sincronização de docs:** após cada sessão, verificar se MEMORY.md e TECH.md estão atualizados nos dois locais (pasta visível + cópia oculta do Claude)
4. **Registro de entregas:** atualizar MAPA_TAXONOMIA.md com status de cada ferramenta
5. **Onboarding:** qualquer novo agente ou colaborador deve ler este arquivo + TECH.md antes de produzir

---

## ESTRUTURA OFICIAL DO PROJETO

```
provas/
  index.html                            ← hub central (atualizar a cada nova ferramenta)
  │
  ├── 00_COORDENACAO/                   ← meta, admin, suporte ao projeto
  │   ├── documentacao_tecnica/
  │   │   ├── MEMORY.md                 ← estado geral do projeto (sincronizar com .claude)
  │   │   └── TECH.md                   ← guia técnico, design system, replicação
  │   ├── taxonomia/
  │   │   └── MAPA_TAXONOMIA.md         ← mapa de status de todos os conteúdos
  │   ├── AGENTE_ARQUIVISTA.md          ← este arquivo
  │   ├── AGENTE_GRAMATICO.md
  │   ├── AGENTE_REVISOR_CONTEUDO.md
  │   ├── informativo_AFs_1trimestre_2026.png
  │   ├── instrucoes_originais.txt
  │   ├── PROJETO_SERAFINA_Planejamento.docx
  │   ├── TRANSCRICAO_Materiais_Escola.docx
  │   └── preparacao_para_prova_original.docx
  │
  ├── 01_LINGUA_PORTUGUESA/             ← AF: 10/03/2026
  │   ├── materiais_escola/             ← imagens/docs recebidos da escola
  │   └── ferramentas/                  ← arquivos HTML gerados
  │
  ├── 02_ELA_INGLES/                    ← AF: 18/03/2026
  │   ├── materiais_escola/
  │   └── ferramentas/
  │
  ├── 03_HISTORIA/                      ← AF: 26/03/2026
  │   ├── materiais_escola/
  │   └── ferramentas/
  │
  ├── 04_LIVRO_SERAFINA/                ← aguardando livro físico
  │
  └── 05_LINKS_FERRAMENTAS/             ← registro de links para compartilhamento
```

---

## CONVENÇÃO DE NOMENCLATURA

### Ferramentas HTML
```
[DISCIPLINA]-[NN]_[nome_slug].html
Exemplos:
  LP-01_genero_textual_diario.html
  ELA-01_acrostic_poem.html
  HIS-01_linha_do_tempo.html
```

### Materiais da escola
```
[DISCIPLINA]_[descricao_slug].[ext]
Exemplos:
  LP_ordem_alfabetica_instrucoes.png
  ELA_bucket_filler_exercicio.pdf
```

### Documentos de coordenação
```
[TIPO]_[Titulo_Slug].docx
Exemplos:
  AGENTE_GRAMATICO.md
  PROJETO_SERAFINA_Planejamento.docx
```

---

## CHECKLIST PÓS-SESSÃO (executar após cada sessão de desenvolvimento)

- [ ] Nova ferramenta adicionada no `index.html` raiz
- [ ] Nova ferramenta registrada no `MAPA_TAXONOMIA.md`
- [ ] `MEMORY.md` atualizado em `documentacao_tecnica/` E em `.claude/projects/.../memory/`
- [ ] `TECH.md` atualizado se houve nova decisão técnica, novo padrão ou nova ferramenta
- [ ] Pasta da disciplina criada com subpastas `materiais_escola/` e `ferramentas/` se nova

---

## PROTOCOLO DE SINCRONIZAÇÃO DE DOCS

Os arquivos `MEMORY.md` e `TECH.md` existem em dois locais:

| Local | Caminho | Quem usa |
|---|---|---|
| Visível (authoritative) | `provas/00_COORDENACAO/documentacao_tecnica/` | Autor do projeto |
| Oculto (auto-load) | `%USERPROFILE%\.claude\projects\...\memory\` | Claude Code (carregamento automático) |

**Regra:** o arquivo visível é a fonte da verdade. Após qualquer edição, sincronizar para o oculto com:
```
cp provas/00_COORDENACAO/documentacao_tecnica/MEMORY.md → .claude/projects/.../memory/MEMORY.md
cp provas/00_COORDENACAO/documentacao_tecnica/TECH.md   → .claude/projects/.../memory/TECH.md
```
O Claude Code faz essa sincronização automaticamente ao final de cada sessão.

---

## REGISTRO DE AGENTES DO PROJETO

| Agente | Arquivo | Quando atua |
|---|---|---|
| Gerente de Projeto | AGENTE_GERENTE_PROJETO.md | Sempre — orquestra todos os outros |
| Pedagógico | AGENTE_PEDAGOGICO.md | Antes de codar — design da ferramenta |
| TI / Dev | AGENTE_TI.md | Antes e durante — viabilidade e geração |
| Gramático | AGENTE_GRAMATICO.md | Após geração — revisão PT |
| Revisor de Conteúdo | AGENTE_REVISOR_CONTEUDO.md | Após geração — adequação infantil |
| Arquivista | AGENTE_ARQUIVISTA.md | Após entrega — estrutura e docs |
| Replicação | AGENTE_REPLICACAO.md | Ao fechar AF / trimestre |
