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
            // FETCHING JUST HAS BEGUN
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
                // INITIAL FETCH
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
                // RECENT FETCH
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
                        // USER HAD WRITTEN NEW MESSAGES
                        // COPY THE DATA FIRST
                        let newData = [ ...action.payload.response.data];
                        let tempData = [ ...state.tempData];
                        
                        // IF THE tempData ITEM IS FOUND IN newData, REMOVE IT
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
                    // LOAD OLD MESSAGES
                    return {
                        ...state,
                        fetchedHistory: true,
                        /* IF THE NUMBER OF THE ITEMS JUST HAS LOADED IS LESS THAN 25
                           THAT MEANS THE USER IS READING THE FIRST PAGE */
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
            // FETCHING FAILED
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
            /* WRITING MESSAGE HAS BEGUN
               CREATE A TEMP MESSAGE AND STORE IN TEMPDATA
               THIS IS TO SHOW THE MESSAGE DIRECTLY ON THE SCREEN
               EVEN IF IT IS NOT ADDED TO SERVER DATABASE, YET */
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
            /*
                TELL THE SYSTEM THAT THE USER IS LOADING THE HISTORY ALREADY
                SO THAT IT DOES NOT FETCH DUPLICATELY
            */
            return {
                ...state,
                loadingHistory: !state.loadingHistory
            };
        default:
            return state;
    }
}

export default message;
