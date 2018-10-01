'use strict';

const fs = require('fs');
const settings = require(__dirname + '/../settings.json');

const sqlite3 = require('sqlite3').verbose();
const dbLocation = __dirname + '/../' + settings.dbName;
const db = new sqlite3.Database(dbLocation);

const globalMarket = require('./globalMarket');
const marketQuotes = require('./marketQuotes');

db.on('error', (error) => {
    console.log(`SQLite error: ${error}`);
});

// Lock server while updating, avoid half done statistics in client
fs.writeFileSync(__dirname + '/../server/lock', 'Update in progress.');

setTimeout(() => globalMarket(db, settings), settings.googleServiceWaitTime);
setTimeout(() => marketQuotes(db, settings), settings.googleServiceWaitTime);

// Unlock again afterwards
setTimeout(() => {
    fs.unlinkSync(__dirname + '/../server/lock');
}, settings.googleServiceWaitTime);

process.on('exit', function () {
    db.close();

    console.log('Done with everything.');
});
