// @ts-nocheck
'use strict';

const fs = require('fs');
const path = require('path');
const Fastify = require('fastify');
const compress = require('@fastify/compress');
const serveStatic = require('@fastify/static');

const port = 443;
const host = '0.0.0.0';
const certDir = '*** PATH TO CERTIFICATE ***';
const serveDir = '../../dist';

const server = Fastify({
    http2: true,
    https: {
        allowHTTP1: true,
        key: fs.readFileSync(path.join(certDir, 'privkey.pem')),
        cert: fs.readFileSync(path.join(certDir, 'fullchain.pem')),
    },
});

server.register(compress);
server.addHook('onSend', (request, reply, payload, done) => {
    if (
        /(.ico|.js|.json|.css|.jpg|.png|.map|.woff2|.txt)$/i.test(request.url)
    ) {
        reply.header('Cache-Control', 'max-age=31536000');
    } else {
        reply.header('Cache-Control', 'private, no-cache, must-revalidate');
        reply.header('Expires', '-1');
        reply.header('Pragma', 'no-cache');
    }
    done();
});
server.setNotFoundHandler(function (request, reply) {
    reply.sendFile('index.html');
});
server.register(serveStatic, { root: path.join(__dirname, serveDir) });

server.listen({ port, host });
