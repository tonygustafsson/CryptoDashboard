import React from 'react';
import styled from 'styled-components';

import HistoryContainer from '../containers/HistoryContainer';
import ViewChangerContainer from '../containers/ViewChangerContainer';
import ActiveUsersContainer from '../containers/ActiveUsersContainer';
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
            <HistoryContainer />
            <ActiveUsersContainer />
            <BoughtProductsContainer />
        </AppWrapper>
    );
}

export default App;
