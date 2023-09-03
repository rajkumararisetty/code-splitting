import { combineReducers, configureStore as createStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoSaga from './sagas/todo.saga';
import { all } from 'redux-saga/effects';
import testReducer from './reducers/test.reducer';

function* allSagas() {
  yield all([
    todoSaga(),
  ]);
}

const staticReducers = {
  test: testReducer,
}


export function createReducerManager(initialReducers) {
  let store = null;
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  return {
    addStore: (configuredStore) => {
      store = configuredStore;
    },

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => combinedReducer(state, action),

    // Adds a new reducer with the specified key
    add: (asyncReducers) => {
      const requiredAsyncReducersKeys = Object.keys(asyncReducers).filter((key) => !reducers[key]);
      if (requiredAsyncReducersKeys.length === 0) {
        return;
      }

      // Add the reducer to the reducer mapping
      requiredAsyncReducersKeys.forEach((eachReducerKey) => {
        reducers[eachReducerKey] = asyncReducers[eachReducerKey];
      });

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
      store.replaceReducer(combinedReducer);
    },

    // Removes a reducer with the specified key
    remove: (asyncReducers) => {
      const requiredAsyncReducersKeys = asyncReducers.filter((key) => !!reducers[key]);
      if (requiredAsyncReducersKeys.length === 0) {
        return;
      }
      requiredAsyncReducersKeys.forEach((key) => delete reducers[key]);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
      store.replaceReducer(combinedReducer);
    }
  };
}

const sagaMiddleware = createSagaMiddleware();

const createSagaInjector = () => {
  const injectedSagas = {};
  const runSaga = (asyncSagas) => {
    const requiredAsyncSagaKeys = Object.keys(asyncSagas).filter((key) => !injectedSagas[key]);
    if (requiredAsyncSagaKeys.length === 0) {
      return;
    }

    requiredAsyncSagaKeys.forEach((eachSagaKey) => {
      const sagaSubscription = sagaMiddleware.run(asyncSagas[eachSagaKey]);
      injectedSagas[eachSagaKey] = sagaSubscription;
    });
  };

  const cancelSaga = (asyncSagas) => {
    const requiredAsyncSagaKeys = asyncSagas.filter((key) => injectedSagas[key]);
    if (requiredAsyncSagaKeys.length === 0) {
      return;
    }

    requiredAsyncSagaKeys.forEach((eachSagaKey) => {
      injectedSagas[eachSagaKey].cancel();
      delete injectedSagas[eachSagaKey];
    });
  };
  runSaga({ root: allSagas });
  return { runSaga, cancelSaga };
};

const configureStore = () => {
  const reducerManager = createReducerManager(staticReducers);
  const middlewares = [sagaMiddleware];

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = createStore({
    reducer: reducerManager.reduce,
    middleware: middlewares,
    devTools: true
  });
  reducerManager.addStore(store);

  store.reducerManager = reducerManager;
  store.sagaManager = createSagaInjector();
  return store;
};

export default configureStore;

