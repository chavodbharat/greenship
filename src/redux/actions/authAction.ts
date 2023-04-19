import {types} from '../ActionTypes';

export const loginUserReq = (payload: object, callback: Function) => {
  return {
    type: types.LOGIN_USER,
    payload,
    callback,
  };
};

export const resetPasswordReq = (payload: object, callback: Function) => {
  return {
    type: types.RESET_PASSWORD,
    payload,
    callback,
  };
};

export const registerUser = (payload: object, callback: Function) => {
  return {
    type: types.REGISTER_USER,
    payload,
    callback,
  };
};

export const setTabBgColor = (payload: any) => {
  return {
    type: types.SET_TAB_COLOR,
    payload,
  };
};
