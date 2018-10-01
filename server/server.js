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

io.on('connection', async (socket) => {    
    console.log(`New client connected with ID ${socket.id}`);
    console.log(`Fetch statistics for ${socket.id}`);

    let statistics = prevHistoryExists() ? previousStatistics : await getStatistics();
    socket.emit('FetchStatistics', statistics);

    socket.on('disconnect', () => console.log(`Client disconnected with ID ${socket.id}`));
});

process.on('exit', function () {
    db.close();
    console.log('Exiting API.');
});

let getStatistics = async () => {
    try {
        return new Promise(async (resolve, reject) => {
            let globalMarket = await getGlobalMarket();
            let marketQuotes = await getMarketQuotes();

            if (prevHistoryExists() && objectsAreIdentical(history, previousHistory)) {
                // No changes, no point in getting the rest
                resolve(previousStatistics);
                return;
            }

            previousHistory = history;

            let historyTop = await getHistoryTop(),
                historyToday = await getHistoryToday(),
                realtime = await getRealTime(),
                products = await getProducts(),
                statistics = {
                    history: history,
                    historyToday: historyToday,
                    historyTop: historyTop,
                    realtime: realtime,
                    products: products,
                };
    
            let aggregatedStatistics = dataAggregator(statistics);
            
            resolve(aggregatedStatistics);    
        });
    }
    catch (err) {
        console.log('Could not fetch statistics', err);
    }
}

let getHistoryLastMonth = async () => {
    try {
        let historyLastMonthQuery = 'SELECT time, fetchTime, sitesChecked, pageViews, sessions, newUsers, transactions, conversionRate, revenue, revenuePerTransaction, soldProducts, averagePageLoadTime FROM HistorySumLastMonth ORDER BY time';

        return new Promise((resolve, reject) => {
            db.all(historyLastMonthQuery, [], (err, rows) => {
                if (err) reject('Could not fetch history last month from DB');
                resolve(rows);
            });
        });
    }
    catch(err) {
        throw Error('Could not fetch history', err);
    }
};

let getHistoryToday = async () => {
    try {
        let historyTodayQuery = 'SELECT time, fetchTime, sitesChecked, pageViews, sessions, newUsers, transactions, conversionRate, revenue, revenuePerTransaction, soldProducts, averagePageLoadTime FROM HistorySumToday ORDER BY time';

        return new Promise((resolve, reject) => {
            db.all(historyTodayQuery, [], (err, rows) => {
                if (err) reject('Could not fetch todays history from DB');
                resolve(rows);
            });
        });
    }
    catch(err) {
        throw Error('Could not fetch todays history', err);
    }
};

let getHistoryTop = async () => {
    try {
        let historyTopQuery = 'SELECT pageViews, sessions, newUsers, transactions, conversionRate, revenue, revenuePerTransaction, soldProducts, averagePageLoadTime FROM HistoryTopLastMonth';

        return new Promise((resolve, reject) => {
            db.all(historyTopQuery, [], (err, rows) => {
                if (err) reject('Could not fetch history top from DB');
                resolve(rows);
            });
        });
    }
    catch(err) {
        console.log('Could not fetch history top', err);
    }
};

let getRealTime = async () => {
    try {
        let realtimeQuery = 'SELECT country, city, deviceType, SUM(activeUsers) AS activeUsers FROM realTime WHERE fetchID = (SELECT MAX(fetchID) FROM RealTime) GROUP BY country, city ORDER BY activeUsers DESC';

        return new Promise((resolve, reject) => {
            db.all(realtimeQuery, [], (err, rows) => {
                if (err) reject('Could not fetch real time from DB');
                resolve(rows);
            });
        });
    }
    catch(err) {
        console.log('Could not fetch real time', err);
    }
};

let getProducts = async () => {
    try {
        let productQuery = 'SELECT name, category, quantity, revenue, boughtAt FROM Products WHERE fetchID = (SELECT MAX(fetchID) FROM Products) ORDER BY id DESC LIMIT 10';

        return new Promise((resolve, reject) => {
            db.all(productQuery, [], (err, rows) => {
                if (err) reject('Could not fetch products from DB');
                resolve(rows);
            });
        });
    }
    catch(err) {
        console.log('Could not fetch products', err);
    }
};
