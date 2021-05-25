import {combineReducers} from 'redux';
import AppReducer from './reducers/AppReducer';

const RootReducer = combineReducers({
  AppReducer,
});
export default RootReducer;
