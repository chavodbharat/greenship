import {types} from '../ActionTypes';

export const getMemberListData = (callback: Function) => {
  return {
    type: types.GET_MEMBER_LIST,
    callback,
  };
};

export const getSearchUserList = (payload: object, callback: Function) => {
  return {
    type: types.GET_SEARCH_USER_LIST,
    payload,
    callback,
  };
};

export const getSearchPetList = (payload: object, callback: Function) => {
  return {
    type: types.GET_SEARCH_PET_LIST,
    payload,
    callback,
  };
};