import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';
import styled from 'styled-components';

const ChartContainer = styled.div`
    display: inline-block;
    width: calc(25% - 22px);
    background-color: #31343c;
    border: 1px #636363 solid;
    margin: 10px;

    > div {
        padding: 2em 0;
    }
`;

const DoughnutChart = ( props ) => {
    return (
        <ChartContainer>
            <Chart
                chartType="PieChart"
                data={props.data}
                options={{
                    pieHole: 0.8,
                    legend: { alignment: 'center', position: 'bottom', textStyle: { color: '#fff', fontName: 'Bitter', fontSize: 16 } },
                    backgroundColor: '#31343c',
                    pieSliceTextStyle: { color: '#fff', fontSize: 16, fontName: 'Bitter' },
                    colors: ['#17b3e4', '#22c995', '#c1d253'],
                    chartArea: { top: 10, left: 10, right: 10, bottom: 60 },
                    enableInteractivity: false
                }}
                graph_id={props.id}
                width="100%"
            />
        </ChartContainer>
    );
}

DoughnutChart.propTypes = {
    id: PropTypes.string,
    data: PropTypes.array,
};

export default DoughnutChart;
