// todoSaga.js

import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getAllTodos, getAllTodosSuccess, getAllTodosFailure } from '../reducers/todo.reducer';
import { getTodos } from '../apis/todo.api'; // Replace with your API handling code

// Worker saga to fetch todos
function* fetchTodosSaga() {
    try {
        // Replace 'api.fetchTodos' with your actual API call function
        const response = yield call(getTodos);
        yield put(getAllTodosSuccess(response));
    } catch (error) {
        console.log(error);
        yield put(getAllTodosFailure('An error occurred while fetching todos'));
    }
}

// Watcher saga to listen for GET_ALL_TODOS action
function* watchFetchTodos() {
    yield takeLatest(getAllTodos, fetchTodosSaga);
}

// Export the root saga
export default function* todoSaga() {
    yield all([
        watchFetchTodos(),
    ]);
}
