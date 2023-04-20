import {combineReducers} from 'redux';
import authReducer from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {types} from '../ActionTypes';

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === types.LOGOUT_SUCCESS) {
    // for all keys defined in your persistConfig(s)
    AsyncStorage.removeItem('persist:root');

    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
