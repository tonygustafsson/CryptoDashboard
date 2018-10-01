"use strict";

/* Used for serving the ./build for production environment,
   for development, use "npm start" */

const settings = require(__dirname + '/../settings.json');

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(settings.clientPort, () => console.log(`Example app listening on port ${settings.clientPort}!`));
