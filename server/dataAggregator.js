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

    output.latest.time = moment.unix(data.globalMarket[data.globalMarket.length - 1].time).format(settings.momentDateLongFormat);
    output.latest.currencies = data.globalMarket[data.globalMarket.length - 1].noCryptocurrencies;
    output.latest.exchanges = data.globalMarket[data.globalMarket.length - 1].noExchanges;
    output.latest.btcDominance = data.globalMarket[data.globalMarket.length - 1].btcDominance;
    output.latest.ethDominance = data.globalMarket[data.globalMarket.length - 1].ethDominance;
    output.latest.othersDominance = 100 - output.latest.btcDominance - output.latest.ethDominance;

    return output;
};

module.exports = dataAggregator;
