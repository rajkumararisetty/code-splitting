// todoSaga.js

import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getContacts } from '../apis/contact.api'; // Replace with your API handling code
import { getAllContacts, getAllContactsFailure, getAllContactsSuccess } from '../reducers/contact.reducer';

// Worker saga to fetch todos
function* fetchContactsSaga() {
    try {
        const response = yield call(getContacts);
        yield put(getAllContactsSuccess(response));
    } catch (error) {
        console.log(error);
        yield put(getAllContactsFailure('An error occurred while fetching todos'));
    }
}

// Watcher saga to listen for GET_ALL_TODOS action
function* watchFetchContacts() {
    yield takeLatest(getAllContacts, fetchContactsSaga);
}

// Export the root saga
export default function* todoSaga() {
    yield all([
        watchFetchContacts(),
    ]);
}
