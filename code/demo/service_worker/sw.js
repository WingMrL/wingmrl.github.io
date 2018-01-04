self.addEventListener('install', event => {
  console.log('V1 installing…');

  // cache a cat SVG
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.add('./cat.svg'))
  );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/code/demo/service_worker/dog.svg'
  console.log(url.pathname);
  if (url.origin == location.origin && url.pathname == '/code/demo/service_worker/dog.svg') {
    console.log('respond cat');
    event.respondWith(caches.match('./cat.svg'));
  }
});
