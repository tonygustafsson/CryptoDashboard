var moment = require('moment');
const fetch = require('node-fetch');

const marketQuotes = function (db, settings) {
    var endpoint = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH';

    fetch(endpoint, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-CMC_PRO_API_KEY': settings.coinMarketCapApiKey
        }
    })
        .then(response => response.json())
        .then(response => {
            Object.keys(response.data).forEach(value => {
                let symbol = response.data[value],
                    currency = symbol.symbol,
                    supply = symbol.total_supply,
                    maxSupply = symbol.max_supply,
                    time = moment(symbol.last_updated).unix(),
                    price = symbol.quote.USD.price,
                    volume24h = symbol.quote.USD.volume_24h,
                    percentChange1h = symbol.quote.USD.percent_change_1h,
                    percentChange24h = symbol.quote.USD.percent_change_24h,
                    percentChange7d = symbol.quote.USD.percent_change_7d,
                    marketCap = symbol.quote.USD.market_cap;

                query = `INSERT INTO MarketQuotes
                    (time, symbol, supply, maxSupply, price, volume24h, percentChange1h,
                        percentChange24h, percentChange7d, marketCap)
                    VALUES (
                        ${time}, '${currency}', ${supply}, ${maxSupply},
                        ${price}, ${volume24h}, ${percentChange1h}, ${percentChange24h},
                        ${percentChange7d}, ${marketCap}
                    )`;

                db.serialize(function () {
                    let stmt = db.prepare(query);
                    stmt.run();
                    stmt.finalize();
                });
            });

            console.log('Done fetching market quotes.');
        });
};

module.exports = marketQuotes;
