import {types} from '../ActionTypes';

const INITIAL_STATE = {
  loginData: {},
  signedIn: null,
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case types.UPDATE_SIGN_IN:
      return {...state, signedIn: payload};
    case types.LOGIN_USER_SUCCESS:
      return {...state, loginData: payload};

    default:
      return state;
  }
};
