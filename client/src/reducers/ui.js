import * as ActionTypes from 'actions/ActionTypes';

const initialState = {
    Input: {
        value: ''
    },
    Video: {
        visibility: true
    }
}

export default function ui(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.CHANGE_MESSAGE_INPUT:
            // CHANGE THE MESSAGE INPUT
            return {
                ...state,
                Input: {
                    value: action.payload
                }
            };
        case ActionTypes.TOGGLE_VIDEO:
            // TOGGLE THE VIDEO STATE
            return {
                ...state,
                Video: {
                    visibility: !state.Video.visibility
                }
            };
        default:
            return state;
    }
}
