import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'containers';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import reducers from 'reducers';
import rootSaga from 'sagas';


require('stylesheets/main.scss');

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);


const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}><App /></Provider>
, rootElement);
