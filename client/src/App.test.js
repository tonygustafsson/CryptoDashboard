import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { AppContainer } from './containers/AppContainer';

const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(thunk))
);

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Provider store={store}>
      <AppContainer store={store} />
    </Provider>, div
  );

  ReactDOM.unmountComponentAtNode(div);
});
