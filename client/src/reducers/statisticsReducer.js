import * as constants from '../constants';

const initState = {
    statistics: {},
    loading: true,
    connectedToServer: false,
    view: constants.VIEWS.lastMonth,
    autoUpdateViews: true,
  };
  
  const statisticsReducer = (state = initState, action) => {
    switch (action.type) {
      case constants.FETCHING_IN_PROGRESS:
        return { ...state, loading: true };
      case constants.FETCHED_STATISTICS:
        return { ...state, loading: false, connectedToServer: true, statistics: action.payload };
      case constants.FETCHING_CONNECTION_ERROR:
        return { ...state, loading: false, connectedToServer: false };
      case constants.CHANGE_VIEW:
        return { ...state, view: action.payload, autoUpdateViews: false };
      case constants.AUTO_CHANGE_VIEW:
        return { ...state, view: action.payload };
      default:
        return state;
    }
  }
  
  export default statisticsReducer;
