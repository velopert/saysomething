import * as ActionTypes from 'actions/ActionTypes';

const initialState = {
    session: null
};

export default function ui(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.GET_SESSION.SUCCESS:
            // GETS THE SESSION AND STORE IN THE STATE
            return {
                session: action.payload.response.data
            };
        default:
            return state;
    }
}
