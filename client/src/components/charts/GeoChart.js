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
        margin: 2em auto;
    }

    text {
        stroke-width: 0 !important;
    }
`;

const GeoChart = (props) => {
    return (
        <ChartContainer>
            <Chart
                chartType="GeoChart"
                data={props.data}
                options={{
                    backgroundColor: '#31343c',
                    displayMode: props.displayMode,
                    colorAxis: {colors: ['#17b3e4', '#22c995', '#c1d253']},
                    datalessRegionColor: '#636363',
                    region: props.region,
                    magnifyingGlass: { enable: false },
                    tooltip: { trigger: 'none' },
                    legend: {
                        textStyle: {
                            fontName: 'bitter',
                            backgroundColor: '#31343c',
                            color: '#fff',
                            fontSize: 16,
                        },
                    },
                    enableRegionInteractivity: false,
                }}
                graph_id={props.id}
                width="80%"
                height="600px"
                legend_toggle
            />
        </ChartContainer>
    );
}

GeoChart.propTypes = {
    data: PropTypes.array,
    id: PropTypes.string,
    displayMode: PropTypes.string,
    region: PropTypes.string,
};

export default GeoChart;
