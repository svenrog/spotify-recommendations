// @ts-nocheck
'use strict';

const fs = require('fs');
const path = require('path');
const Hono = require('hono').Hono;
const serve = require('@hono/node-server').serve;
const serveStatic = require('@hono/node-server/serve-static').serveStatic;
const http2 = require('node:http2');
const compress = require('hono/compress').compress;

const port = 443;
const host = '0.0.0.0';
const certDir = '*** PATH TO CERTIFICATE ***';
const serveDir = '../../dist';
const defaultDocument = path.join(__dirname, serveDir, 'index.html');
const defaultHtml = fs.readFileSync(defaultDocument, 'utf8');

const app = new Hono();
const routes = new Map();

app.use(compress());
app.use(async (c, next) => {
    await next();
    if (/(.ico|.js|.json|.css|.jpg|.png|.map|.woff2|.txt)$/i.test(c.req.url)) {
        c.header('Cache-Control', 'max-age=31536000');
    } else {
        c.header('Cache-Control', 'private, no-cache, must-revalidate');
        c.header('Expires', '-1');
        c.header('Pragma', 'no-cache');
    }
});

app.use(
    '*',
    serveStatic({
        root: path.join(serveDir),
        rewriteRequestPath: (path) => {
            if (routes.has(path)) return routes.get(path);
            if (path.indexOf('.') >= 0) return path;
            const routedPath = route(path);
            routes.set(path, routedPath);
            return routedPath;
        },
        onNotFound: (path, c) => {
            c.html(defaultHtml);
        },
    })
);

const route = (path) => {
    if (path.endsWith('/')) return path + 'index.html';
    return path + '/index.html';
};

serve(
    {
        hostname,
        port,
        fetch: app.fetch,
        createServer: http2.createSecureServer,
        serverOptions: {
            key: fs.readFileSync(path.join(certDir, 'privkey.pem')),
            cert: fs.readFileSync(path.join(certDir, 'fullchain.pem')),
        },
    },
    (info) => {
        console.log(`Listening on https://${hostname}:${info.port}`);
    }
);
