import {types} from '../ActionTypes';

export const getMemberListData = (callback: Function) => {
  return {
    type: types.GET_MEMBER_LIST,
    callback,
  };
};