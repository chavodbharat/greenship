import {types} from '../ActionTypes';

export const getCommunityUserList = (callback: Function) => {
  return {
    type: types.GET_COMMUNITY_MEMBER_LIST,
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