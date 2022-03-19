import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
import logger from 'redux-logger';





const store= createStore(reducer, applyMiddleware(logger,thunk));

export default store;