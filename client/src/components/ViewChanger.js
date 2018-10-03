import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants';

const ViewChangerLink = styled.a`
    display: inline-block;
    margin-right: 1em;
    cursor: pointer;
    text-decoration: ${props => (props.currentView === props.view ? 'none' : 'underline')};
`;

const ViewChanger = ({ view, changeView }) => (
    <div>
        <ViewChangerLink
            onClick={() => changeView(constants.VIEWS.globalMarket)}
            view={constants.VIEWS.globalMarket}
            currentView={view}
        >
            Global market
        </ViewChangerLink>
        <ViewChangerLink
            onClick={() => changeView(constants.VIEWS.btcQuotes)}
            view={constants.VIEWS.btcQuotes}
            currentView={view}
        >
            Bitcoin
        </ViewChangerLink>
        <ViewChangerLink
            onClick={() => changeView(constants.VIEWS.ethQuotes)}
            view={constants.VIEWS.ethQuotes}
            currentView={view}
        >
            Ethereum
        </ViewChangerLink>
    </div>
);

ViewChanger.propTypes = {
    view: PropTypes.string,
    changeView: PropTypes.func
};

export default ViewChanger;
