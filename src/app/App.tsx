import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createAppStore } from './store';
import { Routes } from './routes';

const history = createBrowserHistory();
const store = createAppStore(history);

export function App(): ReactElement {
  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
  );
}
