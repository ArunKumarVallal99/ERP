import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import RootReducer from '../index';

export default createStore(RootReducer, applyMiddleware(thunk));
