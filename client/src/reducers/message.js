import * as ActionTypes from 'actions/ActionTypes';

const request = {
    fetching: false,
    fetched: false,
    response: null,
    error: null
}

const initialState = {
    data: [],
    tempData: [],
    isAtTop: false,
    loadingHistory: false,
    fetchedHistory: false,
    requests: {
        fetch: { ...request },
        write: { ...request }
    }
}

function message(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.FETCH_MESSAGE.REQUEST:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    fetch: {
                        ...state.requests.fetch,
                        fetching: true,
                        fetched: false,
                        response: null,
                        error: null
                    }
                }
            };
        case ActionTypes.FETCH_MESSAGE.SUCCESS:
            if(action.payload.initial) {
                return {
                    ...state,
                    fetchedHistory: false,
                    data: action.payload.response.data,
                    requests: {
                        ...state.requests,
                        fetch: {
                            ...state.requests.fetch,
                            fetching: false,
                            fetched: true,
                        }
                    }
                };
            } else {
                // loading new messages
                if(action.payload.latest) {
                    if(state.tempData.length ===0) {
                        return {
                            ...state,
                            fetchedHistory: false,
                            data: [...state.data, ...action.payload.response.data],
                            requests: {
                                ...state.requests,
                                fetch: {
                                    ...state.requests.fetch,
                                    fetching: false,
                                    fetched: true,
                                }
                            }
                        };
                    } else {
                        // there is user's temp message

                        // copy array first
                        let newData = [ ...action.payload.response.data];
                        let tempData = [ ...state.tempData];

                        for(let i = 0; i < newData.length; i++) {
                            for(let j = 0; j < tempData.length; j++) {
                                if(newData[i].uid === tempData[j].uid) {
                                    tempData.splice(j,1);
                                }
                            }
                        }

                        return {
                            ...state,
                            fetchedHistory: false,
                            data: [...state.data, ...action.payload.response.data],
                            tempData: tempData,
                            requests: {
                                ...state.requests,
                                fetch: {
                                    ...state.requests.fetch,
                                    fetching: false,
                                    fetched: true,
                                }
                            }
                        };
                    }
                } else {
                    // loading old messages
                    return {
                        ...state,
                        fetchedHistory: true,
                        isAtTop: (action.payload.response.data.length < 25),
                        loadingHistory: false,
                        data: [...action.payload.response.data, ...state.data],
                        requests: {
                            ...state.requests,
                            fetch: {
                                ...state.requests.fetch,
                                fetching: false,
                                fetched: true,
                            }
                        }
                    };
                }
            }
        case ActionTypes.FETCH_MESSAGE.FAILURE:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    fetch: {
                        ...state.requests.fetch,
                        fetching: false,
                        error: action.payload
                    }
                }
            }
        case ActionTypes.WRITE_MESSAGE.REQUEST:
            const tempMessage = {
                _id: '',
                message: action.payload.message,
                uid: action.payload.uid,
                color: action.payload.session.color
            };
            return {
                ...state,
                tempData: [...state.tempData, tempMessage]
            };
        case ActionTypes.TOGGLE_LOADING:
            return {
                ...state,
                loadingHistory: !state.loadingHistory
            };
        default:
            return state;
    }
}

export default message;
