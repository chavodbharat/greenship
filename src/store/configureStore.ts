import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from '../config/ReactotronConfig';
import combineReducers from '../redux/reducers';
import {rootSaga} from '../redux/sagas';
import logger from 'redux-logger';

let store,
  persistor,
  persistConfig,
  sagaMiddleware,
  middleware,
  persistedReducer,
  sagaMonitor,
  enhancer;

persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [], //these reduce will not persist data
  whitelist: ['auth'], //these reduce will persist data
};

if (!__DEV__) {
  // Middleware: Redux Saga
  sagaMiddleware = createSagaMiddleware();
  const middleware1 = [sagaMiddleware, logger];
  sagaMonitor = Reactotron.createSagaMonitor();
  middleware = applyMiddleware(...middleware1);
  enhancer = compose(middleware, Reactotron.createEnhancer());
  persistedReducer = persistReducer(persistConfig, combineReducers);
  store = createStore(persistedReducer, middleware);
} else {
  sagaMiddleware = createSagaMiddleware();
  const middleware1 = [sagaMiddleware, logger];
  sagaMonitor = Reactotron.createSagaMonitor();
  middleware = applyMiddleware(...middleware1);
  enhancer = compose(middleware, Reactotron.createEnhancer());
  persistedReducer = persistReducer(persistConfig, combineReducers);
  store = createStore(persistedReducer, enhancer);
}

sagaMiddleware.run(rootSaga);
persistor = persistStore(store);

export {store, persistor};
