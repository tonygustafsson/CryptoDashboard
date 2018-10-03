const moment = require('moment');
const settings = require(__dirname + '/../settings.json');

moment.locale(settings.momentLocale);

const dataAggregator = function(data) {
    var output = {
        globalMarket: [],
        quotes: { BTC: [], ETH: [], XRP: [] }
    };

    if (data.globalMarket.length < 1) return output;

    for (let i = 0; i < data.globalMarket.length; i++) {
        output.globalMarket.push({
            time: moment.unix(data.globalMarket[i].time).format(settings.momentDateLongFormat),
            timeShort: moment.unix(data.globalMarket[i].time).format(settings.momentDateShortFormat),
            marketcap: Math.floor(data.globalMarket[i].marketcap / 1000000),
            volume24h: Math.floor(data.globalMarket[i].volume24h / 1000000),
            btcDominance: data.globalMarket[i].btcDominance,
            ethDominance: data.globalMarket[i].ethDominance,
            noCryptocurrencies: data.globalMarket[i].noCryptocurrencies,
            noExchanges: data.globalMarket[i].noExchanges
        });
    }

    output.globalMarketLatest = output.globalMarket[output.globalMarket.length - 1];

    for (let i = 0; i < data.quotes.length; i++) {
        var quote = data.quotes[i];

        output.quotes[quote.symbol].push({
            time: moment.unix(quote.time).format(settings.momentDateLongFormat),
            supply: Math.round(quote.supply),
            maxSupply: quote.maxSupply ? Math.round(quote.maxSupply) : Math.round(quote.supply),
            price: Math.round(quote.price),
            volume24h: Math.round(quote.volume24h / 1000000),
            percentChange1h: quote.percentChange1h.toFixed(2),
            percentChange24h: quote.percentChange24h.toFixed(2),
            percentChange7d: quote.percentChange7d.toFixed(2),
            marketcap: Math.round(quote.marketcap / 1000000)
        });
    }

    return output;
};

module.exports = dataAggregator;
