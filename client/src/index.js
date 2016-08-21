import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'containers';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import reducers from 'reducers';
import rootSaga from 'sagas';


const sagaMiddleware = createSagaMiddleware();


let middleware = [sagaMiddleware];


// DO NOT USE REDUX-LOGGER IN PRODUCTION ENV
if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger');
    const logger = createLogger();
    middleware = [...middleware, logger];
}

const store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, rootElement);
