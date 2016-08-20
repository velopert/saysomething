import * as ActionTypes from './ActionTypes';
import { createAction } from 'redux-actions';

export const getSession = createAction(ActionTypes.GET_SESSION.REQUEST);
