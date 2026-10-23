/* ============================================================
   provas.js — de onde a PLACA ? tira as perguntas

   A Placa ? usa o MESMO banco único da matéria que o jogo e o
   simulado do site usam (ferramentas/<MAT>_banco.js), então só
   entra pergunta que já passou pelo portão do projeto.

   PARA TROCAR DE PROVA (quando o Paulo mandar a próxima matéria):
   mude só `atual` e acrescente a matéria em `lista`. O banco novo
   precisa expor window.<global>.ITENS com {p, o:[certa,...], c:0,
   dica, ex, tema}. Nada mais muda.
   ============================================================ */
window.FAB = window.FAB || {};

FAB.PROVAS = {
  atual: 'HIS3',
  lista: {
    HIS3: { nome: 'História', data: '27/10/2026', global: 'HIS3', arquivo: '../ferramentas/HIS3_banco.js',
            filtro: function (it) { return !it.texto; } /* só perguntas curtas, como no jogo */ }
  }
};

/* carrega o banco da prova atual (script comum: funciona aberto do disco e no site) */
(function () {
  var P = FAB.PROVAS.lista[FAB.PROVAS.atual]; if (!P) return;
  document.write('<script src="' + P.arquivo + '"><\/script>');
})();

/* devolve as perguntas da prova atual no formato da Fábrica */
FAB.perguntasDaProva = function () {
  var P = FAB.PROVAS.lista[FAB.PROVAS.atual]; if (!P) return [];
  var B = window[P.global]; if (!B || !B.ITENS) return [];
  return B.ITENS.filter(P.filtro || function () { return true; }).map(function (it) {
    return { id: it.id, p: it.p, o: it.o.slice(), c: it.c || 0, dica: it.dica || '', ex: it.ex || '', fonte: 'prova' };
  });
};
