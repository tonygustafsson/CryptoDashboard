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

    if (view !== constants.VIEWS.lastMonth && view !== constants.VIEWS.lastWeek && view !== constants.VIEWS.today) {
        return false;
    }

    const headingText = () => {
        switch (view) {
            case constants.VIEWS.today:
                return 'Today';
            case constants.VIEWS.lastWeek:
                return 'Last week';
            default:
                return 'Last month';
        }
    };

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
                Fetched statistics from {statistics.sitesChecked} sites at {statistics.fetchTime}
            </HeaderInfo>

            <Heading>{headingText()}</Heading>

            <DashboardBlockArea>
                <DashboardBlockContainer heading={statistics.activeUsers.length} text="Active users" />
                <DashboardBlockContainer heading={statisticsTotal().pageViews} text="Page views" />
                <DashboardBlockContainer heading={statisticsTotal().sessions} text="Sessions" />
                <DashboardBlockContainer heading={statisticsTotal().transactions} text="Transactions" />
                <DashboardBlockContainer heading={statisticsTotal().revenue + " SEK"} text="Revenue" />
                <DashboardBlockContainer heading={statisticsTotal().revenuePerTransaction + " SEK"} text="Revenue / Transaction" />
                <DashboardBlockContainer heading={statisticsTotal().soldProducts} text="Products sold" />
                <DashboardBlockContainer heading={statisticsTotal().averagePageLoadTime + " s"} text="Page load time" />
            </DashboardBlockArea>

            <DefaultWrapper>
                <AreaChartContainer
                    title="Users"
                    dataHeadings={['Date', 'Page views', 'Sessions']}
                    data={[
                        statisticsPeriod().reduce((newArray, value) => { newArray.push(value.timeShort); return newArray; }, []),
                        statisticsPeriod().reduce((newArray, value) => { newArray.push(value.pageViews); return newArray; }, []),
                        statisticsPeriod().reduce((newArray, value) => { newArray.push(value.sessions); return newArray; }, []),
                    ]}
                />

                <AreaChartContainer
                    title="Revenue"
                    dataHeadings={['Date', 'Revenue', 'Products']}
                    format="#.### SEK"
                    data={[
                        statisticsPeriod().reduce((newArray, value) => { newArray.push(value.timeShort); return newArray; }, []),
                        statisticsPeriod().reduce((newArray, value) => { newArray.push(value.revenue); return newArray; }, []),
                        statisticsPeriod().reduce((newArray, value) => { newArray.push(value.soldProducts); return newArray; }, []),
                    ]}
                />
            </DefaultWrapper>

            <DefaultWrapper>
                <DoughnutChartContainer
                    data={[
                        ['Visitor type', 'Sessions'],
                        ['New visitors', statisticsTotal().newUsers],
                        ['Returning visitors', (statisticsTotal().sessions - statisticsTotal().newUsers)]
                    ]}
                />

                <DoughnutChartContainer
                    data={[
                        ['Device type', 'Users'],
                        ['Desktop', statistics.activeUsers.filter(x => x.deviceType === "DESKTOP").length],
                        ['Mobile', statistics.activeUsers.filter(x => x.deviceType === "MOBILE").length],
                        ['Tablet', statistics.activeUsers.filter(x => x.deviceType === "TABLET").length],
                    ]}
                />
            
                <GaugeChartContainer
                    data={[
                        ['Metric', 'Value'],
                        ['Page views', Math.floor(statisticsPeriod().slice(-1)[0].pageViews / statistics.top.pageViews * 100)],
                        ['Sessions', Math.floor(statisticsPeriod().slice(-1)[0].sessions / statistics.top.sessions * 100)],
                        ['Revenue', Math.floor(statisticsPeriod().slice(-1)[0].revenue / statistics.top.revenue * 100)],
                        ['Products', Math.floor(statisticsPeriod().slice(-1)[0].soldProducts / statistics.top.soldProducts * 100)],
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
