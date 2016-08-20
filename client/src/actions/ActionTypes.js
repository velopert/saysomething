import createRequestTypes from 'utils/action';

/*
    Creates FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCESS, FETCH_MESSAGE_FAILURE actions
    accessed by FETCH_MESSAGE.STATE, e.g. FETCH_MESSAGE.REQUEST
*/
export const FETCH_MESSAGE = createRequestTypes('FETCH_MESSAGE');
export const WRITE_MESSAGE = createRequestTypes('WRITE_MESSAGE');
export const TOGGLE_LOADING = "TOGGLE_LOADING";

export const GET_SESSION = createRequestTypes('GET_SESSION');

export const CHANGE_MESSAGE_INPUT = "CHANGE_MESSAGE_INPUT";
export const TOGGLE_VIDEO = "TOGGLE_VIDEO";
