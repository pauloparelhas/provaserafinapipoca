# Critério de viabilidade de questão (identificador de questão absurda)

Criado em 22/10/2026 por ordem do Paulo, depois de ver no banco de História perguntas como
"Como o carteiro entregava? a pé / de drone / de avião" e distratores do tipo "fazia bolo",
"pulava de paraquedas", "sinais de fumaça". **Questão só entra em produto (banco, simulado,
caderno, jogo) se passar aqui.** Vale para todas as matérias.

## A pergunta-mãe
"Uma criança de 8 anos que NÃO estudou o conteúdo acertaria só por bom senso ou eliminando
as bobagens?" Se sim, a questão não mede nada: **reprova**.

## Uma questão APROVADA tem de ter:
1. **Conteúdo cobrável:** o que se pergunta está no roteiro (átomo do insumo) e é algo que a
   professora poderia cobrar na AF. Pode ser fácil; não pode ser trivial de vida diária.
2. **Pergunta com nexo:** uma frase clara, de um jeito que a prova faria (classificar, ligar,
   antes × hoje, mudou × continuou, qual(is), quem fez/para quem/objetivo, completar).
3. **Distratores plausíveis do MESMO assunto:** cada alternativa errada tem de ser um erro que
   uma criança que estudou mal cometeria — outro tipo de fonte, outra etapa da mesma história,
   a ferramenta de outra profissão, o "hoje" no lugar do "antes", outro rio, outro registro da
   linha do tempo. Nunca piada, nunca coisa de outro universo.
4. **Uma só resposta certa, inequívoca** (regras do roteiro: objeto nomeado, "de mercúrio",
   ancorar na história, futuro ≠ hoje).

## REPROVA (absurda / ridícula) se tiver QUALQUER um destes:
- **A. Distrator-piada ou fora do mundo:** bolo, paraquedas, foguete, dinossauro, mágica,
  pombo-correio, sinais de fumaça, signo, cor do tênis, "ficar com preguiça", "o céu mudou de
  cor", "as pessoas cansaram de ter nomes", tabuada, celular onde não cabe etc.
- **B. Resposta por bom senso:** a pergunta pode ser respondida sem o conteúdo ("o que o carteiro
  faz?", "a escola tem história?", "devemos respeitar o colega?").
- **C. Distrator absoluto/óbvio:** "nada", "nunca", "nenhum", "proibido", "não existe", "só
  enfeite", "ninguém", "sim/não" banal — salvo quando "nenhuma" é um erro plausível do conteúdo.
- **D. Anacronismo grotesco** usado como distrator (drone/avião/robô/foguete para o carteiro de
  antigamente; "vídeo-chamada" antes do celular) — o certo é usar a OUTRA etapa real da história
  (bicicleta, moto, aparelho com tela).
- **E. Pergunta sem nexo ou duplicada** de outra (mesma ideia, mesmas opções).
- **F. Fora do roteiro** (conta de chegada) ou dado impreciso.
- **G. Alternativa certa visivelmente diferente** das erradas (muito mais longa, única com as
  palavras do enunciado), entregando a resposta.

## Decisão
- **APROVA:** passa em tudo.
- **ADAPTA:** o conteúdo é cobrável, mas a forma falha → reescrever pergunta e/ou distratores com
  alternativas do MESMO assunto (e dizer quais).
- **EXCLUI:** não mede conteúdo cobrável (B, E, F sem conserto). Menos questões, todas boas.

## Portão
A decisão fica registrada em `trabalho/<tri>_<mat>/_avaliacao_questoes.json` com a impressão
digital de cada item (pergunta + alternativas). O validador (`gen/valida_questoes.js`) reprova o
build se algum item do banco ou das telas de escolha não tiver APROVA com a impressão digital
atual — mudou o texto, precisa ser reavaliado.
