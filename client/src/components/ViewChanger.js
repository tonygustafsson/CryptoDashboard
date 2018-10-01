import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants';

const ViewChangerLink = styled.a`
    display: inline-block;
    margin-right: 1em;
    cursor: pointer;
    text-decoration: ${props => props.currentView === props.view ? 'none' : 'underline'};
`;

const ViewChanger = ({ view, changeView }) => 
    <div>
        <ViewChangerLink onClick={() => changeView(constants.VIEWS.lastMonth)} view={constants.VIEWS.lastMonth} currentView={view}>Last month</ViewChangerLink>
        <ViewChangerLink onClick={() => changeView(constants.VIEWS.lastWeek)} view={constants.VIEWS.lastWeek} currentView={view}>Last week</ViewChangerLink>
        <ViewChangerLink onClick={() => changeView(constants.VIEWS.today)} view={constants.VIEWS.today} currentView={view}>Today</ViewChangerLink>
        <ViewChangerLink onClick={() => changeView(constants.VIEWS.realtime)} view={constants.VIEWS.realtime} currentView={view}>Realtime</ViewChangerLink>
    </div>

ViewChanger.propTypes = {
    view: PropTypes.string,
    changeView: PropTypes.func,
};

export default ViewChanger;
