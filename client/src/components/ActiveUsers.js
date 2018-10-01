import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants';

import GeoChartContainer from '../containers/charts/GeoChartContainer';

const GeoTable = styled.table`
    width: 100%;
    table-layout: fixed;
    border-spacing: 20px 10px;

    th { text-align: left; }
    td {
        border: 1px #636363 solid;
        padding: 10px;
        background-color: #31343c;
    }
`;
 
const DefaultWrapper = styled.div`
    display: block;
    width: 100%;
    margin: 0 auto;
`;

const Heading = styled.h1`
    text-transform: uppercase;
    text-align: center;
`;

const ActiveUsers = ({ locations, connectedToServer, view }) => {
    if (!connectedToServer) {
        return false;
    }

    if (view !== constants.VIEWS.realtime) {
        return false;
    }
    
    this.data = locations.reduce((prevVal, x) => {
        let activeUsers = typeof(prevVal[x.country]) !== 'undefined' ? prevVal[x.country] + x.activeUsers : x.activeUsers,
            countryInList = prevVal.find(country => country[0] === x.country);

        if (typeof(countryInList) === 'undefined') {
            prevVal.push([x.country, activeUsers]);
        }
        else {
            countryInList = activeUsers;
        }
        
        return prevVal;
    }, []);

    return (
        <div>
            <Heading>Active users</Heading>

            <DefaultWrapper>
                <GeoChartContainer displayMode="regions" region="world" dataBy="countries" data={locations} />
                <GeoChartContainer displayMode="markers" region="SE" dataBy="cities" data={locations} />
            </DefaultWrapper>

            <GeoTable style={{ paddingTop: '10px' }}>
                <tbody>
                    { typeof(this.data) === 'object' && this.data.map((location, i) => {
                        return (
                            <tr key={i}>
                                <td>{location[0]}</td>
                                <td>{location[1]} visitors</td>
                            </tr>
                        );
                    })}
                </tbody>
            </GeoTable>
        </div>
    );
}

ActiveUsers.propTypes = {
    locations: PropTypes.array,
    connectedToServer: PropTypes.bool,
    view: PropTypes.string
};

export default ActiveUsers;
