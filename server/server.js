'use strict';

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
const fs = require('fs');

const settings = require(__dirname + '/../settings.json');
const dbLocation = __dirname + '/../' + settings.dbName;
const db = new sqlite3.Database(dbLocation);

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socket(server);

const dataAggregator = require('./dataAggregator.js');

let previousStatistics = {},
    previousHistory = {},
    prevHistoryExists = () => Object.keys(previousStatistics).length > 0,
    serviceIsRunning = () => fs.existsSync('./lock'),
    objectsAreIdentical = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

io.listen(settings.serverPort);
console.log(`Listening at sockets to http://localhost:${settings.serverPort}!`);

setInterval(async () => {
    // Check for changes, push if something happens
    let statistics = await getStatistics();

    if (prevHistoryExists() && serviceIsRunning()) {
        console.log("CoinMarketCap Service is currently running, wait until it's done");
        previousHistory = {}; // Reset this so that getStatistics() wont ignore request
        return;
    }

    if (prevHistoryExists() && objectsAreIdentical(statistics, previousStatistics)) {
        // No changes, do not push
        return;
    }

    console.log('Fetch statistics for all');
    io.sockets.emit('FetchStatistics', statistics);
    previousStatistics = statistics;
}, settings.serverCheckForChangesInterval);

io.on('connection', async socket => {
    console.log(`New client connected with ID ${socket.id}`);
    console.log(`Fetch statistics for ${socket.id}`);

    let statistics = prevHistoryExists() ? previousStatistics : await getStatistics();
    socket.emit('FetchStatistics', statistics);

    socket.on('disconnect', () => console.log(`Client disconnected with ID ${socket.id}`));
});

process.on('exit', function() {
    db.close();
    console.log('Exiting API.');
});

let getStatistics = async () => {
    try {
        return new Promise(async (resolve, reject) => {
            let history = {
                globalMarket: await getGlobalMarket(),
                btcQuotes: await getMarketQuotes('BTC'),
                ethQuotes: await getMarketQuotes('ETH')
            };

            if (prevHistoryExists() && objectsAreIdentical(history, previousHistory)) {
                // No changes, no point in getting the rest
                resolve(previousStatistics);
                return;
            }

            previousHistory = history;

            let aggregatedHistory = dataAggregator(history);

            resolve(aggregatedHistory);
        });
    } catch (err) {
        console.log('Could not fetch statistics', err);
    }
};

let getGlobalMarket = async () => {
    try {
        let globalMarketQuery =
            'SELECT time, marketcap, volume24h, btcDominance, ethDominance, noCryptocurrencies, noExchanges FROM GlobalMarket ORDER BY time';

        return new Promise((resolve, reject) => {
            db.all(globalMarketQuery, [], (err, rows) => {
                if (err) reject('Could not fetch global market from DB');
                resolve(rows);
            });
        });
    } catch (err) {
        throw Error('Could not fetch global market', err);
    }
};

let getMarketQuotes = async symbol => {
    try {
        let marketQuotesQuery = `SELECT time, supply, maxSupply, price, volume24h, percentChange1h, percentChange24h, percentChange7d, marketcap FROM MarketQuotes WHERE symbol = "${symbol}" ORDER BY time`;

        return new Promise((resolve, reject) => {
            db.all(marketQuotesQuery, [], (err, rows) => {
                if (err) reject(`Could not fetch market quotes for ${symbol} from DB`);
                resolve(rows);
            });
        });
    } catch (err) {
        throw Error(`Could not fetch market quotes for ${symbol}`, err);
    }
};
