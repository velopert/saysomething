import { takeEvery, delay }  from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import * as ActionTypes from 'actions/ActionTypes';
import * as messageApi from 'services/message';
import { fetchMessage, toggleLoading } from 'actions/message';

// FETCH INITIAL / RECENT / OLD MESSAGES
function* fetch(action) {

    // Create a Request
    const { response, error } = yield call(messageApi.fetch, action.payload);

    
    if(response) {
        // SUCCEED
        yield put({type: ActionTypes.FETCH_MESSAGE.SUCCESS, payload: { response, ...action.payload }});
    } else {
        // ERROR HAS OCCURRED
        yield put({type: ActionTypes.FETCH_MESSAGE.FAILURE, payload: { error }});
        if(error.code !== 'ECONNABORTED') {
            // IF IT IS NOT TIMED OUT, WAIT FOR 10 SEC, SO THAT IT DOES NOT DOS THE SERVER :)
            yield delay(1000*10);
        }
    }

    
    // IF USER JUST DID THE INITIAL OR RECENT MESSAGE LOADING
    if(action.payload.initial || action.payload.latest) {
        yield delay(1); // SHOULD WAIT 1ms TO REPEAT THE TASK WIHTOUT ISSUES
        const getMessageData = (state) => state.message.data; // ACCESS THE STORE USING SELECT
        const data = yield select(getMessageData); 
        const tail = (data.length > 0) ? data[data.length-1]._id : '';  // GET THE LAST MEMO ID
        yield put(fetchMessage({initial: false, latest: true, pivot: tail}));   // DISPATCH ANOTHER FETCHING ACTION
    }

}

// WRITES A NEW MESSAAGE
function* write(action) {
    
    // CREATE A REQUEST
    const { response, error } = yield call(messageApi.write, action.payload);

    if(response) {
        yield put({type: ActionTypes.WRITE_MESSAGE.SUCCESS, payload: { response }});
    } else {
        yield put({type: ActionTypes.WRITE_MESSAGE.ERROR, payload: { error }});
    }
}


// ACTION WATCHERS

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
