import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import appState from 'reducers';
import rootSaga from 'sagas';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = createStore(
    appState,
    persistedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  store.subscribe(() => {
    const data = store.getState();
    if (!data.error.LOAD_USER_LOGIN) {
      saveState(store.getState());
    }
  });

  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('reducers', () => {
        store.replaceReducer(appState);
      });
    }
  }

  return store;
};

export default configureStore();
