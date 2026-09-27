const CACHE_NAME = "ata-digital-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./manifest.json",
    "./logo-light.png",
    "./rio-mobile.png",
    "./frente.png",
    "./verso.png",
    "./ATA-icon-192.png",
    "./ATA-icon-512.png"
];

self.addEventListener("install", (evento) => {

    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARQUIVOS);
            })
    );

    self.skipWaiting();
});


self.addEventListener("activate", (evento) => {

    evento.waitUntil(
        caches.keys().then((nomes) => {

            return Promise.all(
                nomes
                    .filter((nome) => nome !== CACHE_NAME)
                    .map((nome) => caches.delete(nome))
            );

        })
    );

    self.clients.claim();
});


self.addEventListener("fetch", (evento) => {

    evento.respondWith(
        caches.match(evento.request)
            .then((resposta) => {

                return resposta || fetch(evento.request);

            })
    );

});