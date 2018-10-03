import React from 'react';
import styled from 'styled-components';

import GlobalMarketContainer from '../containers/GlobalMarketContainer';
import QuotesContainer from '../containers/QuotesContainer';
import ViewChangerContainer from '../containers/ViewChangerContainer';
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
            <QuotesContainer title="Bitcoin" symbol="BTC" />
            <QuotesContainer title="Ethereum" symbol="ETH" />
        </AppWrapper>
    );
};

export default App;
