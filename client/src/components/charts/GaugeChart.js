import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import styled from 'styled-components';

const ChartContainer = styled.div`
    display: inline-block;
    width: calc(50% - 22px);
    background-color: #31343c;
    border: 1px #636363 solid;
    margin: 10px;

    table {
        margin: 4em auto !important;
    }
`;

const GaugeChart = props => {
    return (
        <ChartContainer>
            <Chart
                chartType="Gauge"
                data={props.data}
                options={{
                    width: 800,
                    height: 200
                }}
                graph_id={props.id}
                width="100%"
                legend_toggle
            />
        </ChartContainer>
    );
};

GaugeChart.propTypes = {
    data: PropTypes.array,
    id: PropTypes.string
};

export default GaugeChart;
