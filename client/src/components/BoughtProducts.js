import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as constants from '../constants';

import DashboardBlockContainer from '../containers/DashboardBlockContainer';

const DashboardBlockArea = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: stretch;
    padding-bottom: 3em;
`;

const Heading = styled.h1`
    text-transform: uppercase;
    text-align: center;
`;

const BoughtProducts = ({ products, connectedToServer, view }) => {
    if (!connectedToServer) {
        return false;
    }

    if (view !== constants.VIEWS.realtime) {
        return false;
    }

    return (
        <div>
            <Heading>Latest products</Heading>

            <DashboardBlockArea>
                { typeof(products) === 'object' && products.map((product, i) => {
                    return (
                        <DashboardBlockContainer size="large" key={i} heading={product.name} text={`${product.boughtAt}, ${product.quantity} pcs, ${product.revenue} SEK`} />
                    );
                })}
            </DashboardBlockArea>
        </div>
    );
}

BoughtProducts.propTypes = {
    products: PropTypes.array,
    connectedToServer: PropTypes.bool,
};

export default BoughtProducts;
