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

const BTCQuotes = ({ statistics, connectedToServer, view }) => {
    if (!connectedToServer) {
        return false;
    }

    if (view !== constants.VIEWS.btcQuotes) {
        return false;
    }

    return (
        <div>
            <HeaderInfo>
                Fetched statistics at {statistics.btcQuotesLatest.time}
            </HeaderInfo>

            <Heading>Bitcoin</Heading>

            <DashboardBlockArea>
                <DashboardBlockContainer heading={statistics.btcQuotesLatest.marketcap + 'M USD'} text="Marketcap" />
                <DashboardBlockContainer heading={statistics.btcQuotesLatest.price + ' USD'} text="Current price" />
                <DashboardBlockContainer heading={statistics.btcQuotesLatest.supply + ' BTC'} text="Circulating supply" />
            </DashboardBlockArea>

            <DashboardBlockArea>
                <DashboardBlockContainer heading={statistics.btcQuotesLatest.percentChange1h + '%'} text="1h change" />
                <DashboardBlockContainer heading={statistics.btcQuotesLatest.percentChange24h + '%'} text="24h change" />
                <DashboardBlockContainer heading={statistics.btcQuotesLatest.percentChange7d + '%'} text="7d change" />
            </DashboardBlockArea>

            <DefaultWrapper>
                <AreaChartContainer
                    title="MarketCap"
                    dataHeadings={['Date', 'USD']}
                    format="#M"
                    data={[
                        statistics.btcQuotes.reduce((newArray, value) => { newArray.push(value.time); return newArray; }, []),
                        statistics.btcQuotes.reduce((newArray, value) => { newArray.push(value.marketcap); return newArray; }, [])
                    ]}
                />

                <AreaChartContainer
                    title="Price"
                    dataHeadings={['Date', 'USD']}
                    format="#"
                    data={[
                        statistics.btcQuotes.reduce((newArray, value) => { newArray.push(value.time); return newArray; }, []),
                        statistics.btcQuotes.reduce((newArray, value) => { newArray.push(value.price); return newArray; }, [])
                    ]}
                />

                <AreaChartContainer
                    title="Volume 24h"
                    dataHeadings={['Date', 'USD']}
                    format="#M"
                    data={[
                        statistics.btcQuotes.reduce((newArray, value) => { newArray.push(value.time); return newArray; }, []),
                        statistics.btcQuotes.reduce((newArray, value) => { newArray.push(value.volume24h); return newArray; }, [])
                    ]}
                />

                <DoughnutChartContainer
                    data={[
                        ['Supply', 'Max'],
                        ['Circulating supply', statistics.btcQuotesLatest.supply],
                        ['Not mined yet', statistics.btcQuotesLatest.maxSupply - statistics.btcQuotesLatest.supply]
                    ]}
                />
            </DefaultWrapper>
        </div>
    );
}

BTCQuotes.propTypes = {
    statistics: PropTypes.object,
    connectedToServer: PropTypes.bool,
    view: PropTypes.string
};

export default BTCQuotes;