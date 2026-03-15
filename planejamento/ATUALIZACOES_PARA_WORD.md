# ATUALIZACOES PENDENTES NO DOCUMENTO WORD
**Arquivo:** PROJETO_SERAFINA_Planejamento.docx
**Gerado em:** 08/03/2026 (sessao 3)

> Estas atualizacoes devem ser incorporadas manualmente ao .docx,
> ou o documento pode ser considerado substituido por este arquivo .md.

---

## 1. STATUS GERAL — ATUALIZAR

**Antes:** LP em andamento / hospedagem pendente
**Agora:**
- Todas as 6 ferramentas LP concluidas e funcionando
- Hospedagem GitHub Pages ATIVA
- Link disponivel nas configuracoes do repositorio GitHub (Settings > Pages)

---

## 2. ESTRUTURA DE PASTAS — ATUALIZAR

**Antes:** ferramentas dentro de `01_LINGUA_PORTUGUESA/ferramentas/`
**Agora:** todos os HTMLs na raiz de `provas/` (estrutura plana)

```
provas/
  index.html
  LP01_genero_textual_diario.html
  LP02-03_personagem_serafina.html
  LP04-07_maiuscula_minuscula.html
  LP05_ordem_alfabetica.html
  LP06_separacao_silabica.html
  LP08_meu_esconderijo.html
  01_LINGUA_PORTUGUESA/  (materiais de estudo)
  planejamento/          (documentos e scripts)
```

---

## 3. FERRAMENTAS CONCLUIDAS — ATUALIZAR TABELA

| Cod      | Ferramenta                 | Status       | Observacao                          |
|----------|----------------------------|--------------|-------------------------------------|
| LP-01    | Genero Textual — Diario    | CONCLUIDA    |                                     |
| LP-02/03 | Personagem Serafina        | CONCLUIDA*   | *aguarda devolutiva de 17 questoes  |
| LP-04+07 | Maiusc/Minusc + Uso        | CONCLUIDA    |                                     |
| LP-05    | Ordem Alfabetica           | CONCLUIDA    |                                     |
| LP-06    | Separacao Silabica         | CONCLUIDA    | Convertido de JSX para HTML         |
| LP-08    | Meu Esconderijo            | CONCLUIDA    |                                     |

---

## 4. PROXIMAS ETAPAS — ATUALIZAR

### Pendente imediato
- Devolutiva das 17 questoes removidas da LP02-03 (ver LP02-03_estado.md)

### ELA (AF 18/03) — 4 ferramentas planejadas
| Cod    | Ferramenta              | Conteudo                                      |
|--------|-------------------------|-----------------------------------------------|
| ELA-01 | Acrostic Poem           | Drag versos para letra certa; bonus: escrever |
| ELA-02 | Bucket Filler vs Dipper | Classificar comportamentos; 16 cards          |
| ELA-03 | My Community            | Match profissao/funcao/local; 8 profissoes    |
| ELA-05 | Family & Friends        | Vocabulario familiar + reading comprehension  |

### Historia (AF 26/03)
- Unidade 1: Quanto o tempo o tempo tem?
- Planejar apos conclusao do ELA

---

## 5. HOSPEDAGEM — ADICIONAR SECAO

- **Plataforma:** GitHub Pages
- **Como atualizar:** abrir arquivo no GitHub > editar (lapizinho) > Commit changes
- **Como adicionar novo arquivo:** na raiz do repositorio > Add file > Upload
- **Tempo de propagacao:** ~1 minuto apos cada commit
- **Para novo ciclo de provas (2o trimestre):** criar novo repositorio ou nova branch

---

## 6. GUIA DE REPLICACAO PARA PROXIMO CICLO — ADICIONAR SECAO

Para reutilizar este framework em provas futuras (2o trimestre 2026, ano seguinte, etc.):

1. **Abrir o repositorio GitHub** com os arquivos atuais
2. **Criar repositorio novo** (ex: `projeto-serafina-2trimestre`) para nao misturar
3. **Copiar o index.html** como base — ajustar nome do projeto, datas, disciplinas
4. **Para cada conteudo novo:**
   - Identificar a lista de conteudos da AF (caderno/instrucoes da escola)
   - Escolher tipo de interacao (drag-order, drag-match, fill-blank, multipla escolha)
   - Gerar novo arquivo HTML baseado nos existentes como modelo
   - Adicionar link no index.html
5. **Decisoes que NAO mudam:** visual dark space, navbar, cards amarelo/verde/vermelho,
   delay 2400ms, anti-repeticao, card errado interativo, skip silencioso
6. **Decisoes que mudam por ciclo:** conteudo pedagogico, personagem/tema, datas das AFs

---

*Este arquivo pode ser descartado apos atualizacao do .docx*
