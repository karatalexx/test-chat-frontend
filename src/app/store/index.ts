import { History } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';
import { ApiService } from '../services/api.service';

// Transform action to plain object
const actionClassMiddleWare = (store: any) => (next: any) => (action: any) => {
  return next({ ...action });
};

export function createAppStore(history: History, initialState: object = {}): Store<any> {
  const devToolCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devToolCompose || compose;
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(actionClassMiddleWare, routerMiddleware(history), sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootSaga);
  ApiService.dispatch = store.dispatch;

  return store;
}
