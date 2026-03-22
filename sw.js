// Service Worker — Projeto Serafina
// Estratégia: network-first para HTML, cache-first para base CSS/JS
var CACHE = 'serafina-v3';

// Arquivos base compartilhados — pre-cache no install
var BASE_FILES = [
  '/ferramentas/base.css',
  '/ferramentas/base.js',
  '/ferramentas/ela-base.css',
  '/ferramentas/ela-base.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(BASE_FILES);
    })
  );
  self.skipWaiting();
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
  // Base CSS/JS: stale-while-revalidate (serve do cache, atualiza em background)
  var isBase = BASE_FILES.some(function(f) { return url.indexOf(f) !== -1; });
  if (isBase) {
    e.respondWith(
      caches.open(CACHE).then(function(cache) {
        return cache.match(e.request).then(function(cached) {
          var fetched = fetch(e.request).then(function(response) {
            cache.put(e.request, response.clone());
            return response;
          });
          return cached || fetched;
        });
      })
    );
    return;
  }
  // Outros recursos (fontes, imagens): comportamento padrão do browser
});
