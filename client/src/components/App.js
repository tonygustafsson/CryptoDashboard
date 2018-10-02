import React from 'react';
import styled from 'styled-components';

import GlobalMarketContainer from '../containers/GlobalMarketContainer';
import ViewChangerContainer from '../containers/ViewChangerContainer';
import BTCQuotesContainer from '../containers/BTCQuotesContainer';
import ETHQuotesContainer from '../containers/ETHQuotesContainer';
import BoughtProductsContainer from '../containers/BoughtProductsContainer';
import ErrorMessageContainer from '../containers/ErrorMessageContainer';

const AppWrapper = styled.div`
    color: #fff;
    font-family: 'Bitter', serif;
`;

const App = () => {
    return (
        <AppWrapper>
            <ErrorMessageContainer />
            <ViewChangerContainer />
            <GlobalMarketContainer />
            <BTCQuotesContainer />
            <ETHQuotesContainer />
            <BoughtProductsContainer />
        </AppWrapper>
    );
}

export default App;
