import {types} from '../ActionTypes';

export const getPetListData = (callback: Function) => {
  return {
    type: types.GET_PET_LIST,
    callback,
  };
};

export const deletePet = (payload: object, callback: Function) => {
  return {
    type: types.DELETE_PET,
    payload,
    callback,
  };
};

export const getPetVaccineMenuList = (payload: object, callback: Function) => {
  return {
    type: types.GET_PET_VACCINE_MENU_LIST,
    payload,
    callback,
  };
};

export const getPetVaccinationList = (payload: object, callback: Function) => {
  return {
    type: types.GET_PET_VACCINATION_LIST,
    payload,
    callback,
  };
};
