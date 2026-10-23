/* ============================================================
   oficina.js — PEÇAS QUE O ROBÔ (a IA) CONSTRUIU A PEDIDO DELA

   Cresce para sempre. Cada entrega registra de qual pedido veio,
   para a Mariana ver "o robô fez o que eu pedi". Fluxo completo
   em _engenharia/OFICINA.md.

   Formatos aceitos:
     FAB.oficina.sprite(id, {nome, grupo, quadros:[[16 linhas de 16]]}, pedidoId)
     FAB.oficina.tipo(id, {letra, classe, skin, nome, mover?}, grupo, pedidoId)
         grupo = id de FAB.GRUPOS_PECAS onde a peça aparece no editor
     FAB.oficina.cenario(id, {nome, ceu:[cor1,cor2], morros, morros2, ...}, pedidoId)
     FAB.oficina.som(id, {nome, notas:[[freq, dur], ...], onda}, pedidoId)
     FAB.oficina.entrega(pedidoId, 'frase curta do robô para ela')
   Letras de mapa já usadas: # T B P X I = ~ L ^ M o * h k D F ? C g b a f s @
   ============================================================ */
window.FAB = window.FAB || {};
FAB.ENTREGAS = FAB.ENTREGAS || {};
FAB.SONS_EXTRA = FAB.SONS_EXTRA || {};
FAB.oficina = {
  sprite: function (id, s, ped) { s.oficina = ped || true; FAB.SPRITES[id] = s; },
  tipo: function (id, t, grupo, ped) {
    t.oficina = ped || true; FAB.TIPOS[id] = t;
    var g = FAB.GRUPOS_PECAS.filter(function (x) { return x.id === grupo; })[0] || FAB.GRUPOS_PECAS[1];
    if (g.tipos.indexOf(id) < 0) g.tipos.push(id);
  },
  cenario: function (id, c, ped) { c.oficina = ped || true; FAB.CENARIOS[id] = c; },
  som: function (id, s, ped) { s.oficina = ped || true; FAB.SONS_EXTRA[id] = s; if (FAB.OPCOES.sons.indexOf(id) < 0) FAB.OPCOES.sons.push(id); },
  entrega: function (ped, frase) { FAB.ENTREGAS[ped] = frase; }
};

/* ===================== ENTREGAS (mais nova embaixo) ===================== */
