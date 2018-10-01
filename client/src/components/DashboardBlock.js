import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Block = styled.div`
    flex: 1;
    border: 1px #636363 solid;
    padding: 1em;
    background-color: ${props => props.animate ? 'rgba(255,255,255,.2)' : '#31343c'};
    min-width: 20%;
    transition: background-color 150ms;
    margin: 10px;
    text-transform: 
`;

const Heading = styled.strong`
    display: block;
    margin-bottom: ${props => props.size === 'large' ? '.5em' : '0'};
    font-size: ${props => props.size === 'large' ? '150%' : '200%'};
`;

const thousandDelimited = input => { 
    return input ? input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
}

const DashboardBlock = (props) =>
    <Block animate={props.animate}>
        <Heading size={props.size}>{thousandDelimited(props.heading)}</Heading>
        {props.text}
    </Block>

DashboardBlock.propTypes = {
    heading: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    animate: PropTypes.bool,
    size: PropTypes.string,
};

export default DashboardBlock;
