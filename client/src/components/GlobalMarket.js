import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants';

import DoughnutChartContainer from '../containers/charts/DoughnutChartContainer';
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
    display: flex;
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

const GlobalMarket = ({ statistics, connectedToServer, view }) => {
    if (!connectedToServer) {
        return false;
    }

    if (view !== constants.VIEWS.globalMarket) {
        return false;
    }

    return (
        <div>
            <HeaderInfo>Fetched statistics at {statistics.globalMarketLatest.time}</HeaderInfo>

            <Heading>Global Market</Heading>

            <DashboardBlockArea>
                <DashboardBlockContainer heading={statistics.globalMarketLatest.noCryptocurrencies} text="Currencies" />
                <DashboardBlockContainer heading={statistics.globalMarketLatest.noExchanges} text="Exchanges" />
            </DashboardBlockArea>

            <DefaultWrapper>
                <AreaChartContainer
                    title="Total MarketCap"
                    dataHeadings={['Date', 'USD']}
                    format="#M"
                    data={[
                        statistics.globalMarket.reduce((newArray, value) => {
                            newArray.push(value.time);
                            return newArray;
                        }, []),
                        statistics.globalMarket.reduce((newArray, value) => {
                            newArray.push(value.marketcap);
                            return newArray;
                        }, [])
                    ]}
                />

                <AreaChartContainer
                    title="Total Volume 24h"
                    dataHeadings={['Date', 'USD']}
                    format="#M"
                    data={[
                        statistics.globalMarket.reduce((newArray, value) => {
                            newArray.push(value.time);
                            return newArray;
                        }, []),
                        statistics.globalMarket.reduce((newArray, value) => {
                            newArray.push(value.volume24h);
                            return newArray;
                        }, [])
                    ]}
                />
            </DefaultWrapper>

            <DefaultWrapper>
                <DoughnutChartContainer
                    data={[
                        ['Currency', 'Percentage'],
                        ['BTC', statistics.globalMarketLatest.btcDominance],
                        ['ETH', statistics.globalMarketLatest.ethDominance],
                        [
                            'Others',
                            100 -
                                statistics.globalMarketLatest.btcDominance -
                                statistics.globalMarketLatest.ethDominance
                        ]
                    ]}
                />

                <AreaChartContainer
                    title="Active currencies"
                    dataHeadings={['Date', 'Currencies']}
                    format="#"
                    data={[
                        statistics.globalMarket.reduce((newArray, value) => {
                            newArray.push(value.time);
                            return newArray;
                        }, []),
                        statistics.globalMarket.reduce((newArray, value) => {
                            newArray.push(value.noCryptocurrencies);
                            return newArray;
                        }, [])
                    ]}
                />
            </DefaultWrapper>
        </div>
    );
};

GlobalMarket.propTypes = {
    statistics: PropTypes.object,
    connectedToServer: PropTypes.bool,
    view: PropTypes.string
};

export default GlobalMarket;
