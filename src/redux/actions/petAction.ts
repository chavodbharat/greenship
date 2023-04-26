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

export const addPetVaccine = (payload: object, callback: Function) => {
  return {
    type: types.ADD_PET_VACCINE,
    payload,
    callback,
  };
};

export const getPetArtList = (callback: Function) => {
  return {
    type: types.GET_PET_ART_LIST,
    callback,
  };
};

export const getPetRaceList = (payload: object, callback: Function) => {
  return {
    type: types.GET_PET_RACE_LIST,
    payload,
    callback,
  };
};

export const getAllCountryList = (callback: Function) => {
  return {
    type: types.GET_COUNTRY_LIST,
    callback,
  };
};

export const createPet = (payload: object, callback: Function) => {
  return {
    type: types.CREATE_PET,
    payload,
    callback,
  };
};

export const uploadPetProfilePhoto = (payload: object, callback: Function) => {
  return {
    type: types.UPLOAD_PET_PROFILE_IMAGE,
    payload,
    callback,
  };
};