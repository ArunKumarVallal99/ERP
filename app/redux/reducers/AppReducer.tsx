import {Actions} from '../action_types/ActionTypes';
import {Keys} from '../../utils/async_storage/Key';

//fetch default auth key

//fetch default language

//fetch default app theme

//Apply default app theme , localization
const INITIAL_STATE = {
  appTheme: null,
  appLanguage: null,
  authToken: null,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Actions.AppTheme:
      return {...state, appTheme: action.payload};
    case Actions.AppLanguage:
      return {...state, appLanguage: action.payload};
    default:
      return state;
  }
};
