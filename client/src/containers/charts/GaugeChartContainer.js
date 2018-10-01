import React from 'react';
import PropTypes from 'prop-types';

import GaugeChart from '../../components/charts/GaugeChart';

class GaugeChartContainer extends React.Component {
    componentWillMount() {       
        this.id = 'GaugeChart-' + Math.random();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data);
    }

    render() {
        return (
            <GaugeChart id={this.id} data={this.props.data} />
        );
    }
}

GaugeChartContainer.propTypes = {
    data: PropTypes.array,
};

export default GaugeChartContainer;
