import React from 'react';
import PropTypes from 'prop-types';

import DoughnutChart from '../../components/charts/DoughnutChart';

class DoughnutChartContainer extends React.Component {
    componentWillMount() {
        this.id = 'DoughnutChart-' + Math.random();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data);
    }

    render() {
        return (
            <DoughnutChart id={this.id} data={this.props.data} />
        );
    }
}

DoughnutChartContainer.propTypes = {
    data: PropTypes.array,
};

export default DoughnutChartContainer;
