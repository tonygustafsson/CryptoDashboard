import socketIOClient from 'socket.io-client';
import * as constants from '../constants';

const apiUrl = 'http://localhost:3001/';
const socket = socketIOClient(apiUrl);

export const fetchedStatistics = statistics => {
    return {
        type: constants.FETCHED_STATISTICS,
        payload: statistics
    };
};

export const fetchingInProgress = () => {
    return {
        type: constants.FETCHING_IN_PROGRESS
    };
};

export const fetchingConnectionError = () => {
    return {
        type: constants.FETCHING_CONNECTION_ERROR
    };
};

export const changeView = view => {
    return {
        type: constants.CHANGE_VIEW,
        payload: view
    };
};

export const fetchStatistics = data => {
    return dispatch => {
        dispatch(fetchingInProgress());

        socket.on('FetchStatistics', data => {
            dispatch(fetchedStatistics(data));
        });
    };
};
