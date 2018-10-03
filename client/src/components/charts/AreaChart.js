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

    > div {
        margin: 0 auto;
        padding-bottom: 3em;
    }

    @media (max-width: 1000px) {
        width: calc(100% - 22px);
    }
`;

const AreaChart = props => {
    return (
        <ChartContainer>
            <Chart
                chartType="AreaChart"
                data={props.data}
                options={{
                    title: props.title,
                    enableInteractivity: true,
                    backgroundColor: '#31343c',
                    colors: ['#17b3e4', '#22c995', '#c1d253'],
                    legend: { position: 'bottom' },
                    legendTextStyle: { color: '#fff', fontName: 'Bitter', fontSize: 16 },
                    titleTextStyle: { color: '#fff', fontName: 'Bitter', fontSize: 16 },
                    vAxis: {
                        textStyle: { color: '#fff', fontName: 'Bitter', fontSize: 16 },
                        format: props.format,
                        gridlines: { color: '#636363' }
                    },
                    hAxis: {
                        textStyle: { color: '#fff', fontName: 'Bitter', fontSize: 16 },
                        maxAlternation: 1,
                        showTextEvery: 2
                    },
                    lineWidth: 2
                }}
                graph_id={props.id}
                width="100%"
                loader={<div />}
            />
        </ChartContainer>
    );
};

AreaChart.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    id: PropTypes.string,
    format: PropTypes.string
};

export default AreaChart;
