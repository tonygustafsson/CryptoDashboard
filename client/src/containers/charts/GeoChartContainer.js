import React from 'react';
import PropTypes from 'prop-types';

import GeoChart from '../../components/charts/GeoChart';

class GeoChartContainer extends React.Component {
    componentWillMount() {       
        this.id = 'GeoChart-' + Math.random();
        this.data = [];

        switch (this.props.dataBy) {
            case 'countries':
                this.data = this.props.data.reduce((prevVal, x) => {
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

                this.data.unshift(['Country', 'Active Users']);

                break;
            case 'cities':
                this.data = this.props.data.reduce((prevVal, x) => {
                    let activeUsers = typeof(prevVal[x.city]) !== 'undefined' ? prevVal[x.city] + x.activeUsers : x.activeUsers,
                        cityInList = prevVal.find(city => city[0] === x.city);

                    if (typeof(cityInList) === 'undefined') {
                        prevVal.push([`${x.city}, ${x.country}`, activeUsers]);
                    }
                    else {
                        cityInList = activeUsers;
                    }
                    
                    return prevVal;
                }, []);

                this.data.unshift(['City', 'Active Users']);

                break;
            default:
                break;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data);
    }

    render() {
        return (
            <GeoChart
                displayMode={this.props.displayMode}
                dataBy={this.props.dataBy}
                id={this.id}
                data={this.data}
                region={this.props.region}
            />
        );
    }
}

GeoChartContainer.propTypes = {
    data: PropTypes.array,
    displayMode: PropTypes.string,
    dataBy: PropTypes.string,
    region: PropTypes.string,
};

export default GeoChartContainer;
