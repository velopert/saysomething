import * as ActionTypes from './ActionTypes';
import { createAction } from 'redux-actions';

export const changeMessageInput = createAction(ActionTypes.CHANGE_MESSAGE_INPUT);
export const toggleVideo = createAction(ActionTypes.TOGGLE_VIDEO);
