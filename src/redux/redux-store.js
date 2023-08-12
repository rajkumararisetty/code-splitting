import { configureStore as createStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './reducers/todo.reducer';
import contactReducer from './reducers/contact.reducer';
import todoSaga from './sagas/todo.saga';
import contactSaga from './sagas/contact.saga';
import { all } from 'redux-saga/effects';

function* allSagas() {
  yield all([
    todoSaga(),
    contactSaga(),
  ]);
}

const staticReducers = {
  todo: todoReducer,
  contact: contactReducer,
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
function configureStore() {
  const middlewares = [sagaMiddleware];
  const store = createStore({
    reducer: staticReducers, middleware: middlewares, devTools: true,
  });
  sagaMiddleware.run(allSagas);
  return store;
}
export default configureStore;
