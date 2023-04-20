import {types} from '../ActionTypes';

const INITIAL_STATE = {
  loginData: {},
  signedIn: null,
  activeModule: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case types.UPDATE_SIGN_IN:
      return {...state, signedIn: payload};
    case types.LOGIN_USER_SUCCESS:
      return {...state, loginData: payload};
    case types.LOGIN_USER_SUCCESS:
      return {...state, loginData: payload};
    case types.SET_TAB_COLOR:
      return {...state, activeModule: payload};

    default:
      return state;
  }
};
