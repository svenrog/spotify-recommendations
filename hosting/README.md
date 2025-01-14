# Spotify recommendations serve script

Serves the statically generated site enabling HTTP2, GZip compression and SSG features.

## How to use

### Generate a certificate

-   When developing this site I used certbot to generate a certicifate for TLS. https://certbot.eff.org/

### Prepare self-hosting using [Express](https://expressjs.com/)

[This](./serve-express/serve.js) implementation was able to serve around 500 requests per second when benchmarking.

-   Copy files from [express](./serve-express) to desired location.
-   Modify `serveDir` to match your `dist` folder location.
-   Adapt `certDir` and `spdy.createServer({ key, cert })` to match your certificate files.

### Prepare self-hosting using [Hono](https://hono.dev/)

[This](./serve-hono/serve.js) implementation was able to serve around 1000 requests per second when benchmarking using node. 3000 rps when serving via Bun (no http2 support).

-   Copy files from [hono](./serve-hono) to desired location.
-   Modify `serveDir` to match your `dist` folder location.
-   Adapt `certDir` and `serverOptions: { key, cert })` to match your certificate files.

### Prepare self-hosting using [Fastify](https://fastify.dev/)

[This](./serve-fastify/serve.js) implementation was able to serve around 2000 requests per second when benchmarking.

-   Copy files from [fastify](./serve-fastify) to desired location.
-   Modify `serveDir` to match your `dist` folder location.
-   Adapt `certDir` and `Fastify({ key, cert })` to match your certificate files.

### Run server

```
npm install
node serve.js
```
