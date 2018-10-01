import { combineReducers } from 'redux';

import statisticsReducer from './statisticsReducer';

const reducers = combineReducers({
  dashboard: statisticsReducer,
})

export default reducers
