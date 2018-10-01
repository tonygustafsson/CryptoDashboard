const CircularJSON = require('circular-json');
const fs = require('fs');
var moment = require('moment');
const fetch = require('node-fetch');

const globalMarket = function (db, settings) {
    var endpoint = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest';

    fetch(endpoint, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-CMC_PRO_API_KEY': settings.coinMarketCapApiKey
        }})
        .then(response => response.json())
        .then(response => {
            let time = moment(response.data.last_updated).unix(),
                totalMarketCap = response.data.quote.USD.total_market_cap,
                totalVolume24h = response.data.quote.USD.total_volume_24h,
                btcDominance = response.data.btc_dominance,
                ethDominance = response.data.eth_dominance,
                noCryptocurrencies = response.data.active_cryptocurrencies,
                noExchanges = response.data.active_exchanges;


            query = `INSERT INTO GlobalMarket
            (time, marketcap, volume24h, btcDominance, ethDominance, noCryptocurrencies, noExchanges)
            VALUES (
                ${time}, ${totalMarketCap}, ${totalVolume24h}, ${btcDominance},
                ${ethDominance}, ${noCryptocurrencies}, ${noExchanges}
            )`;

            db.serialize(function() {           
                let stmt = db.prepare(query);
                stmt.run();
                stmt.finalize();
            });

            console.log('Done fetching global market.');
        });
};

module.exports = globalMarket;
