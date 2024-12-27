# Spotify recommendations serve script

Serves the statically generated site enabling HTTP2, GZip compression and SSG features.

## How to use

### Generate a certificate

1. When developing this site I used certbot to generate a certicifate for TLS. https://certbot.eff.org/
2. Adapt `certDir` and `spdy.createServer({ key, cert })` in [`serve.js`](./serve.js) to match your files.

### Run server

```
npm install
node serve.js
```
