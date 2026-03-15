// Service Worker — Projeto Serafina
// Estratégia: network-first para HTML, garante versão sempre atualizada
var CACHE = 'serafina-v2';

self.addEventListener('install', function(e) {
  self.skipWaiting(); // Assume controle imediatamente, sem esperar
});

self.addEventListener('activate', function(e) {
  // Limpa caches antigos
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;

  var url = e.request.url;
  var isHTML = e.request.destination === 'document'
            || url.endsWith('.html')
            || url.endsWith('/')
            || url.indexOf('.html?') !== -1;

  if (isHTML) {
    // HTML: sempre busca do servidor (ignora cache do browser E do CDN)
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .then(function(response) {
          // Salva cópia fresca no cache (para uso offline)
          var clone = response.clone();
          caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
          return response;
        })
        .catch(function() {
          // Sem internet: serve do cache
          return caches.match(e.request);
        })
    );
  }
  // Outros recursos (CSS, fontes, imagens): comportamento padrão do browser
});
