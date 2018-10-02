const moment = require('moment');
const settings = require(__dirname + '/../settings.json');

moment.locale(settings.momentLocale);

const dataAggregator = function (data) {
    var output = {
        globalMarket: [],
        btcQuotes: [],
        ethQuotes: [],
        latest: {}
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
            noExchanges: data.globalMarket[i].noExchanges,
        });
    }

    output.globalMarketLatest = output.globalMarket[output.globalMarket.length - 1];

    for (let i = 0; i < data.btcQuotes.length; i++) {
        output.btcQuotes.push({
            time: moment.unix(data.btcQuotes[i].time).format(settings.momentDateLongFormat),
            supply: Math.round(data.btcQuotes[i].supply),
            maxSupply: data.btcQuotes[i].maxSupply ? Math.round(data.btcQuotes[i].maxSupply) : Math.round(data.btcQuotes[i].supply),
            price: Math.round(data.btcQuotes[i].price),
            volume24h: Math.round(data.btcQuotes[i].volume24h / 1000000),
            percentChange1h: data.btcQuotes[i].percentChange1h.toFixed(2),
            percentChange24h: data.btcQuotes[i].percentChange24h.toFixed(2),
            percentChange7d: data.btcQuotes[i].percentChange7d.toFixed(2),
            marketcap: Math.round(data.btcQuotes[i].marketcap / 1000000)
        });
    }

    output.btcQuotesLatest = output.btcQuotes[output.btcQuotes.length - 1];

    for (let i = 0; i < data.ethQuotes.length; i++) {
        output.ethQuotes.push({
            time: moment.unix(data.ethQuotes[i].time).format(settings.momentDateLongFormat),
            supply: Math.round(data.ethQuotes[i].supply),
            maxSupply: data.ethQuotes[i].maxSupply ? Math.round(data.ethQuotes[i].maxSupply) : Math.round(data.ethQuotes[i].supply),
            price: Math.round(data.ethQuotes[i].price),
            volume24h: Math.round(data.ethQuotes[i].volume24h / 1000000),
            percentChange1h: data.ethQuotes[i].percentChange1h.toFixed(2),
            percentChange24h: data.ethQuotes[i].percentChange24h.toFixed(2),
            percentChange7d: data.ethQuotes[i].percentChange7d.toFixed(2),
            marketcap: Math.round(data.ethQuotes[i].marketcap / 1000000)
        });
    }

    output.ethQuotesLatest = output.ethQuotes[output.ethQuotes.length - 1];

    return output;
};

module.exports = dataAggregator;
