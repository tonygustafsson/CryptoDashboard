import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants';

const ViewChangerWrapper = styled.div`
    text-align: center;
    font-size: 120%;
    background-color: #17181d;
    padding: 20px 0;

    @media (max-width: 1000px) {
        font-size: 100%;
    }
`;

const ViewChangerLink = styled.a`
    display: inline-block;
    margin-right: 1em;
    cursor: pointer;
    text-decoration: ${props => (props.currentView === props.view ? 'none' : 'underline')};
`;

const ViewChanger = ({ view, changeView }) => (
    <ViewChangerWrapper>
        <ViewChangerLink
            onClick={() => changeView(constants.VIEWS.globalMarket)}
            view={constants.VIEWS.globalMarket}
            currentView={view}
        >
            Global market
        </ViewChangerLink>
        <ViewChangerLink
            onClick={() => changeView(constants.VIEWS.BTCQuotes)}
            view={constants.VIEWS.BTCQuotes}
            currentView={view}
        >
            Bitcoin
        </ViewChangerLink>
        <ViewChangerLink
            onClick={() => changeView(constants.VIEWS.ETHQuotes)}
            view={constants.VIEWS.ETHQuotes}
            currentView={view}
        >
            Ethereum
        </ViewChangerLink>
        <ViewChangerLink
            onClick={() => changeView(constants.VIEWS.XRPQuotes)}
            view={constants.VIEWS.XRPQuotes}
            currentView={view}
        >
            Ripple
        </ViewChangerLink>
    </ViewChangerWrapper>
);

ViewChanger.propTypes = {
    view: PropTypes.string,
    changeView: PropTypes.func
};

export default ViewChanger;
