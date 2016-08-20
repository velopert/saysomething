import * as ActionTypes from './ActionTypes';
import { createAction } from 'redux-actions';

export const fetchMessage = createAction(ActionTypes.FETCH_MESSAGE.REQUEST);
export const writeMessage = createAction(ActionTypes.WRITE_MESSAGE.REQUEST);
export const toggleLoading = createAction(ActionTypes.TOGGLE_LOADING);
