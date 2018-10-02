import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants';

import DoughnutChartContainer from '../containers/charts/DoughnutChartContainer';
import GaugeChartContainer from '../containers/charts/GaugeChartContainer';
import AreaChartContainer from '../containers/charts/AreaChartContainer';
import DashboardBlockContainer from '../containers/DashboardBlockContainer';

const DashboardBlockArea = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: stretch;
    margin: 10px 0;
`;

const DefaultWrapper = styled.div`
    display: block;
    width: 100%;
    margin: 0 auto;
`;

const HeaderInfo = styled.div`
    display: block;
    position: absolute;
    right: 10px;
    top: 5px;
    color: #636363;
    font-style: italic;
`;

const Heading = styled.h1`
    text-transform: uppercase;
    text-align: center;
`;

const Dashboard = ({ statistics, connectedToServer, view }) => {
    if (!connectedToServer) {
        return false;
    }

    if (view !== constants.VIEWS.globalMarket) {
        return false;
    }

    const statisticsPeriod = () => {
        switch (view) {
            case constants.VIEWS.today:
                return statistics.today;
            case constants.VIEWS.lastWeek:
                return statistics.lastWeek;
            default:
                return statistics.lastMonth;
        }
    };

    const statisticsTotal = () => {
        switch (view) {
            case constants.VIEWS.today:
                return statistics.totalToday;
            case constants.VIEWS.lastWeek:
                return statistics.totalLastWeek;
            default:
                return statistics.totalLastMonth;
        }
    };

    return (
        <div>
            <HeaderInfo>
                Fetched statistics at {statistics.latest.time}
            </HeaderInfo>

            <Heading>Global Market</Heading>

            <DashboardBlockArea>
                <DashboardBlockContainer heading={statistics.latest.currencies} text="Currencies" />
                <DashboardBlockContainer heading={statistics.latest.exchanges} text="Exchanges" />
            </DashboardBlockArea>

            <DefaultWrapper>
                <AreaChartContainer
                    title="Total MarketCap"
                    dataHeadings={['Date', 'USD']}
                    format="#M"
                    data={[
                        statistics.globalMarket.reduce((newArray, value) => { newArray.push(value.time); return newArray; }, []),
                        statistics.globalMarket.reduce((newArray, value) => { newArray.push(value.marketcap); return newArray; }, [])
                    ]}
                />

                <AreaChartContainer
                    title="Total Volume 24h"
                    dataHeadings={['Date', 'USD']}
                    format="#M"
                    data={[
                        statistics.globalMarket.reduce((newArray, value) => { newArray.push(value.time); return newArray; }, []),
                        statistics.globalMarket.reduce((newArray, value) => { newArray.push(value.volume24h); return newArray; }, [])
                    ]}
                />
            </DefaultWrapper>

            <DefaultWrapper>
                <DoughnutChartContainer
                    data={[
                        ['Currency', 'Percentage'],
                        ['BTC', statistics.latest.btcDominance],
                        ['ETH', statistics.latest.ethDominance],
                        ['Others', statistics.latest.othersDominance]
                    ]}
                />
            </DefaultWrapper>
        </div>
    );
}

Dashboard.propTypes = {
    statistics: PropTypes.object,
    connectedToServer: PropTypes.bool,
    view: PropTypes.string
};

export default Dashboard;
