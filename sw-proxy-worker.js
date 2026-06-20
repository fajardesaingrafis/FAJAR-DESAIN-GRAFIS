addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Ambil file sw.js asli dari GitHub/jsdelivr
  const upstream = 'https://cdn.jsdelivr.net/gh/fajardesaingrafis/FAJAR-DESAIN-GRAFIS@main/sw.js';

  const resp = await fetch(upstream, {
    cf: { cacheTtl: 60, cacheEverything: true } // cache 60 detik di edge Cloudflare
  });

  const body = await resp.text();

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Service-Worker-Allowed': '/',
      'Cache-Control': 'no-cache' // browser selalu cek versi terbaru saat update SW
    }
  });
}
