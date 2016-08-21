import { takeEvery }  from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import * as ActionTypes from 'actions/ActionTypes';
import * as sessionApi from 'services/session';


// GETS THE SESSION AND PUT IN THE SESSION STORE

function* get(action) {

    const { response, error } = yield call(sessionApi.get);

    if(response) {
        yield put({type: ActionTypes.GET_SESSION.SUCCESS, payload: { response }});
    } else {
        yield put({type: ActionTypes.GET_SESSION.ERROR, payload: { error }});
    }
}

function* watchGet() {
    yield* takeEvery(ActionTypes.GET_SESSION.REQUEST, get);
}


export default function* sessionSaga() {
  yield fork(watchGet);
}
