import {types} from '../ActionTypes';

export const getMissingPetListReq = (payload: object, callback: Function) => {
  return {
    type: types.GET_MISSING_PET_LIST,
    payload,
    callback,
  };
};

export const getMyPetListReq = (callback: Function) => {
  return {
    type: types.GET_MY_PET_LIST,
    callback,
  };
};

export const updateMissingPetReq = (payload: object, callback: Function) => {
  return {
    type: types.UPDATE_MISSING_PET,
    payload,
    callback,
  };
};
export const getUserProfilePic = (payload: object, callback: Function) => {
  return {
    type: types.GET_USER_PROFILE,
    payload,
    callback,
  };
};

export const updateUserProfilePic = (payload: object, callback: Function) => {
  return {
    type: types.UPDATE_USER_PROFILE_PIC,
    payload,
    callback,
  };
};

export const getBannerImage = (payload: object, callback: Function) => {
  return {
    type: types.GET_BANNER_IMAGE,
    payload,
    callback,
  };
};

export const updateBannerImage = (payload: object, callback: Function) => {
  return {
    type: types.UPDATE_BANNER_IMAGE,
    payload,
    callback,
  };
};

export const getProfileFieldsReq = (callback: Function) => {
  return {
    type: types.GET_PROFILE_FIELDS,
    callback,
  };
};
export const updateProfileReq = (payload: object, callback: Function) => {
  return {
    type: types.UPDATE_PROFILE,
    payload,
    callback,
  };
};
