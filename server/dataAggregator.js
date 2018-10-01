const moment = require('moment');
const settings = require(__dirname + '/../settings.json');

moment.locale(settings.momentLocale);

const dataAggregator = function (data) {
    var output = {
        totalLastMonth: {},
        lastMonth: [],
        activeUsers: [],
        fetchTime: 0,
        sitesChecked: 0,
        products: [],
        today: [],
        top: data.historyTop[0],
    };

    if (data.history.length < 1) return output;

    output.sitesChecked = data.history[0].sitesChecked;
    output.fetchTime = moment.unix(data.history[0].fetchTime).format(settings.momentDateLongFormat);

    for (let i = 0; i < data.history.length; i++) {
        output.lastMonth.push({
            time: moment.unix(data.history[i].time).format(settings.momentDateLongFormat),
            timeShort: moment.unix(data.history[i].time).format(settings.momentDateShortFormat),
            pageViews: data.history[i].pageViews,
            sessions: data.history[i].sessions,
            newUsers: data.history[i].newUsers,
            transactions: data.history[i].transactions,
            conversionRate: data.history[i].conversionRate,
            revenue: data.history[i].revenue,
            revenuePerTransaction: Math.floor(data.history[i].revenuePerTransaction / output.sitesChecked),
            soldProducts: data.history[i].soldProducts,
            averagePageLoadTime: data.history[i].averagePageLoadTime,
        });
    }

    output.lastWeek = output.lastMonth.slice(-7);

    for (let i = 0; i < data.historyToday.length; i++) {
        output.today.push({
            time: moment.unix(data.historyToday[i].time).format(settings.momentDateLongFormat),
            timeShort: moment.unix(data.historyToday[i].time).format(settings.momentTimeShortFormat),
            pageViews: data.historyToday[i].pageViews,
            sessions: data.historyToday[i].sessions,
            newUsers: data.historyToday[i].newUsers,
            transactions: data.historyToday[i].transactions,
            conversionRate: data.historyToday[i].conversionRate,
            revenue: data.historyToday[i].revenue,
            revenuePerTransaction: Math.floor(data.historyToday[i].revenuePerTransaction / output.sitesChecked),
            soldProducts: data.historyToday[i].soldProducts,
            averagePageLoadTime: data.historyToday[i].averagePageLoadTime,
        });
    }

    output.totalLastMonth = {
        pageViews: output.lastMonth.reduce((prevVal, x) => prevVal + x.pageViews, 0),
        sessions: output.lastMonth.reduce((prevVal, x) => prevVal + x.sessions, 0),
        newUsers: output.lastMonth.reduce((prevVal, x) => prevVal + x.newUsers, 0),
        transactions: output.lastMonth.reduce((prevVal, x) => prevVal + x.transactions, 0),
        conversionRate: Math.floor(output.lastMonth.reduce((prevVal, x) => prevVal + x.conversionRate, 0) / output.sitesChecked),
        revenue: output.lastMonth.reduce((prevVal, x) => prevVal + x.revenue, 0),
        revenuePerTransaction: output.lastMonth.reduce((prevVal, x) => prevVal + x.revenuePerTransaction, 0),
        soldProducts: output.lastMonth.reduce((prevVal, x) => prevVal + x.soldProducts, 0),
        averagePageLoadTime: parseFloat(output.lastMonth.reduce((prevVal, x) => prevVal + x.averagePageLoadTime, 0) / data.history.length).toFixed(3),
    };

    output.totalLastWeek = {
        pageViews: output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.pageViews, 0),
        sessions: output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.sessions, 0),
        newUsers: output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.newUsers, 0),
        transactions: output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.transactions, 0),
        conversionRate: Math.floor(output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.conversionRate, 0) / output.sitesChecked),
        revenue: output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.revenue, 0),
        revenuePerTransaction: output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.revenuePerTransaction, 0),
        soldProducts: output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.soldProducts, 0),
        averagePageLoadTime: parseFloat(output.lastMonth.slice(-7).reduce((prevVal, x) => prevVal + x.averagePageLoadTime, 0) / data.history.length).toFixed(3),
    };

    output.totalToday = {
        pageViews: output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.pageViews, 0),
        sessions: output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.sessions, 0),
        newUsers: output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.newUsers, 0),
        transactions: output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.transactions, 0),
        conversionRate: Math.floor(output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.conversionRate, 0) / output.sitesChecked),
        revenue: output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.revenue, 0),
        revenuePerTransaction: output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.revenuePerTransaction, 0),
        soldProducts: output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.soldProducts, 0),
        averagePageLoadTime: parseFloat(output.lastMonth.slice(-1).reduce((prevVal, x) => prevVal + x.averagePageLoadTime, 0) / data.history.length).toFixed(3),
    };

    if (data.realtime.length > 0) {
        output.activeUsers = data.realtime;
    }

    if (data.products.length < 1) return output;

    for (var i = 0; i < data.products.length; i++) {
        data.products[i].boughtAt = moment.unix(data.products[i].boughtAt).format(settings.momentDateLongFormat);
        output.products.unshift(data.products[i]);
    }

    return output;
};

module.exports = dataAggregator;
