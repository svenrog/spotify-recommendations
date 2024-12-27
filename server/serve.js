// @ts-nocheck
'use strict';

const express = require('express');
const compression = require('compression');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');
const app = express();

const port = 443;
const certDir = '*** PATH TO CERTIFICATE ***';
const serveDir = '../dist';
const defaultDocument = path.join(__dirname, serveDir, 'index.html');

app.use(compression());
app.use((req, res, next) => {
    if (/(.ico|.js|.json|.css|.jpg|.png|.map|.woff2|.txt)$/i.test(req.path)) {
        res.header('Cache-Control', 'max-age=31536000');
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');

        const testPath = path.join(__dirname, serveDir, req.path, 'index.html');
        if (fs.existsSync(testPath)) {
            res.sendFile(testPath);
        } else {
            res.sendFile(defaultDocument);
        }
    }
});

app.use(express.static(path.join(__dirname, serveDir)));

const server = spdy.createServer(
    {
        key: fs.readFileSync(`${certDir}/privkey.pem`),
        cert: fs.readFileSync(`${certDir}/fullchain.pem`),
    },
    app
);

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log('SSL enabled');
});
