import createRequestTypes from 'utils/action';


/* MESSAGE */
export const FETCH_MESSAGE = createRequestTypes('FETCH_MESSAGE');
export const WRITE_MESSAGE = createRequestTypes('WRITE_MESSAGE');
export const TOGGLE_LOADING = "TOGGLE_LOADING";

/* SESSION */
export const GET_SESSION = createRequestTypes('GET_SESSION');


/* UI */
export const CHANGE_MESSAGE_INPUT = "CHANGE_MESSAGE_INPUT";
export const TOGGLE_VIDEO = "TOGGLE_VIDEO";
