import React from 'react';
import PropTypes from 'prop-types';

import AreaChart from '../../components/charts/AreaChart';

class AreaChartContainer extends React.Component {
    getAggregatedData(headings, data) {
        let aggregatedData = [headings];

        // We need a format of [['Time', 'Page views'], ['2018-02-01', '200']]
        for (let i = 0; i < data[0].length; i++) {
            // Foreach item in first data array, for instance statistics.data.lastMonth.time
            let newDataItem = [];

            for (let j = 0; j < data.length; j++) {
                // Foreach item in all data arrays, for instance statistics.data.lastMonth.time and statistics.data.lastMonth.sessions
                newDataItem.push(data[j][i]);
            }

            aggregatedData.push(newDataItem);
        }

        return aggregatedData;
    }

    componentWillMount() {
        let aggregatedData = this.getAggregatedData(this.props.dataHeadings, this.props.data);
        this.aggregatedData = aggregatedData;
        this.id = 'AreaChart-' + Math.random();
    }

    componentWillUpdate(nextProps, nextState) {
        let aggregatedData = this.getAggregatedData(nextProps.dataHeadings, nextProps.data);
        this.aggregatedData = aggregatedData;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data);
    }

    render() {
        return (
            <AreaChart data={this.aggregatedData} title={this.props.title} id={this.id} format={this.props.format} />
        );
    }
}

AreaChartContainer.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    dataHeadings: PropTypes.array,
    format: PropTypes.string,
};

export default AreaChartContainer;
