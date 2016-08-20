import { takeEvery, delay }  from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import * as ActionTypes from 'actions/ActionTypes';
import * as messageApi from 'services/message';
import { fetchMessage, toggleLoading } from 'actions/message';

function* fetch(action) {

    const { response, error } = yield call(messageApi.fetch, action.payload);

    if(response) {
        yield put({type: ActionTypes.FETCH_MESSAGE.SUCCESS, payload: { response, ...action.payload }});
    } else {
        yield put({type: ActionTypes.FETCH_MESSAGE.ERROR, payload: { error }});
        yield delay(1000*10);
    }



    if(action.payload.initial || action.payload.latest) {
        yield delay(1);
        const getMessageData = (state) => state.message.data;
        const data = yield select(getMessageData);
        const tail = (data.length > 0) ? data[data.length-1]._id : '';
        yield put(fetchMessage({initial: false, latest: true, pivot: tail}));
    }

}

function* write(action) {
    yield delay(1);
    const { response, error } = yield call(messageApi.write, action.payload);

    if(response) {
        yield put({type: ActionTypes.WRITE_MESSAGE.SUCCESS, payload: { response }});
    } else {
        yield put({type: ActionTypes.WRITE_MESSAGE.ERROR, payload: { error }});
    }
}

function* watchFetch() {
    yield* takeEvery(ActionTypes.FETCH_MESSAGE.REQUEST, fetch);
}

function* watchWrite() {
    yield* takeEvery(ActionTypes.WRITE_MESSAGE.REQUEST, write);
}


export default function* messageSaga() {
    yield fork(watchFetch);
    yield fork(watchWrite);
}
