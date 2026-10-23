# Nuvem da família — como o progresso da Mariana fica guardado

## A decisão (23/10/2026)

O pai pediu para avaliar login e banco de dados (Vercel, Cloudflare, OAuth) para salvar o
progresso dela de forma satisfatória. Avaliação:

| Caminho | O que dá | O que custa / arrisca | Veredito |
|---|---|---|---|
| Só navegador (localStorage) + arquivo .json | funciona sem internet, zero dado fora de casa | some se limparem o navegador; não passa de um computador para outro | **continua sendo a base** |
| Login com OAuth (Google etc.) | conta de verdade | criança de 7 anos com conta e senha; tela de login de terceiros dentro do produto; dado pessoal (e-mail) | **não** |
| Vercel + banco (Postgres/KV) | servidor completo | projeto e cobrança novos; o firewall do trabalho bloqueia `*.vercel.app` | não agora |
| **Cloudflare Worker + D1, com chave da família** | guarda e traz o progresso em qualquer computador, 10 versões de segurança | só a conta Cloudflare que o Paulo já usa (mafoppy); grátis neste tamanho | **escolhido** |

**Por que a chave da família e não login:** a criança nunca digita senha. O papai liga uma vez
em Opções > Área do papai: o app gera um código longo (`abcd23-efgh45-...`), que ele copia e
cola no outro computador se quiser. Sem e-mail, sem nome, sem conta. O servidor guarda o
SHA-256 da chave, nunca a chave. Quem não tem a chave não lê nada; não existe listagem,
página pública, chat ou qualquer canal com pessoas ou robôs de fora.

## Peças

- Servidor: `coding/_nuvem/worker.js` + `wrangler.toml` + `schema.sql` → `https://fabrica-mariana-nuvem.pauloparelhas.workers.dev`
  (D1 `fabrica-mariana` id `19d8c38a-c333-4871-bca0-2b8a69f73353`, conta pauloparelhas@gmail.com). Tentei KV
  primeiro: ele demora até 60 s para mostrar a versão nova em outro computador; o D1 mostra na hora.
  Limite 1,9 MB por versão (passou disso, vai sem as fotos antigas dos jogos).
  Publicar mudança: `cd coding/_nuvem && wrangler deploy`.
- App: `coding/js/nuvem.js`. Desligada = nenhuma conexão. Ligada: manda o estado 12 s depois da
  última mudança; ao abrir, se a nuvem tem trabalho mais novo (outro computador), traz e guarda o
  local em `fab_mariana_v1_antes_da_nuvem`.
- Trava: a CSP do `index.html` só libera conexão para esse endereço; `gate/seguranca.js` reprova
  qualquer outro endereço ou canal de rede, e só `js/nuvem.js` pode usar `fetch`.
- A chave fica no navegador (`fab_nuvem_chave`), fora do arquivo .json e fora do link do jogo.

## Publicar um jogo
Continua sendo o **link com o jogo dentro** (tela Mostrar): não passa por servidor nenhum.
Galeria pública não existe de propósito.

## Se um dia precisar mudar
- Mais de uma criança: uma chave por criança (o app já guarda tudo por chave).
- Apagar tudo da nuvem: `cd coding/_nuvem && wrangler d1 execute fabrica-mariana --remote --command "DELETE FROM estados"`.
- Portão: `python coding/_engenharia/gate/teste_nuvem.py` (dois computadores simulados; apaga a chave de teste no fim).
