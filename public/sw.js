if (!self.define) {
  let e,
    s = {}
  const n = (n, i) => (
    (n = new URL(n + '.js', i).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = n), (e.onload = s), document.head.appendChild(e)
        } else (e = n), importScripts(n), s()
      }).then(() => {
        let e = s[n]
        if (!e) throw new Error(`Module ${n} didn’t register its module`)
        return e
      })
  )
  self.define = (i, t) => {
    const a =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (s[a]) return
    let c = {}
    const r = (e) => n(e, a),
      o = { module: { uri: a }, exports: c, require: r }
    s[a] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (t(...e), c))
  }
}
define(['./workbox-5afaf374'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/155-b857a5ab18674a7c.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/459-7bfe40d17f19d569.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/725-7eea3f465c3c7e2b.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/75fc9c18-9881522b69bd8a4f.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/883-a0758e3e7c603124.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/988-48b55eebb161e8d8.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/framework-fc97f3f1282ce3ed.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/main-7fd727d7ede96332.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/pages/_app-6f5ebbeb22c1ea49.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/pages/_error-1995526792b513b2.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/pages/buy-ticket-89de424ea96ff6f1.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/pages/index-a22f23473282b635.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/pages/rides-594be02984d0c9f4.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/pages/settings-93c5307c8269a568.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/pages/top-up-c4eabc600a8d994d.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/pages/transactions-1a9ad59116df510e.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/polyfills-5cd94c89d3acac5f.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/chunks/webpack-cb7634a8b6194820.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/css/ea2465d8262bac41.css',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/k8COzMn8wzHVZY-6MGuQq/_buildManifest.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/k8COzMn8wzHVZY-6MGuQq/_middlewareManifest.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/_next/static/k8COzMn8wzHVZY-6MGuQq/_ssgManifest.js',
          revision: 'k8COzMn8wzHVZY-6MGuQq',
        },
        {
          url: '/android-chrome-192x192.png',
          revision: '2c0a2857d7e27fd4ec4dfdd892ff224c',
        },
        {
          url: '/android-chrome-512x512.png',
          revision: '7e108c28e6c5fb3021593e753bca0f74',
        },
        {
          url: '/apple-touch-icon.png',
          revision: '5722a19a76d7ff479cb4edbe609d7554',
        },
        {
          url: '/browserconfig.xml',
          revision: 'a493ba0aa0b8ec8068d786d7248bb92c',
        },
        {
          url: '/favicon-16x16.png',
          revision: 'fbf969555e1eb674d319dcdaf7e9588d',
        },
        {
          url: '/favicon-32x32.png',
          revision: '5f63d627fd5dc19f5d3b2f863a744863',
        },
        { url: '/favicon.ico', revision: '85b42f2a5ccb71a9f9f689d83c88f966' },
        { url: '/manifest.json', revision: '17162ead416bf3b4016484b5bd24adbd' },
        {
          url: '/mstile-150x150.png',
          revision: 'dc10cff87605ae72db90e30f7fff41a3',
        },
        {
          url: '/safari-pinned-tab.svg',
          revision: '3423ddc0bc435d9eaae1a24f79ea11df',
        },
        {
          url: '/site.webmanifest',
          revision: 'b9aa277fcfc34c31db6c7a7ea3469b8c',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: i,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    )
})
