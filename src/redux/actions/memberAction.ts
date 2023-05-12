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

export const getMemberProfileDetails = (payload: object, callback: Function) => {
  return {
    type: types.GET_MEMBER_PROFILE_DETAILS,
    payload,
    callback,
  };
};

export const getMemberGroupeList = (payload: object, callback: Function) => {
  return {
    type: types.GET_MEMBER_GROUP_LIST,
    payload,
    callback,
  };
};

export const getMemberFriendList = (payload: object, callback: Function) => {
  return {
    type: types.GET_MEMBER_FRIEND_LIST,
    payload,
    callback,
  };
};

export const sendFriendRequest = (payload: object, callback: Function) => {
  return {
    type: types.SEND_FRIEND_REQUEST,
    payload,
    callback,
  };
};

export const getLoginUserFriendList = (callback: Function) => {
  return {
    type: types.GET_LOGIN_USER_FRIEND_LIST,
    callback,
  };
};

export const getLoginUserGroupList = (callback: Function) => {
  return {
    type: types.GET_LOGIN_USER_GROUP_LIST,
    callback,
  };
};