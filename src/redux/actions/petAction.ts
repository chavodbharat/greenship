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

export const getPetDetails = (payload: object, callback: Function) => {
  return {
    type: types.GET_PET_DETAILS,
    payload,
    callback,
  };
};

export const updatePetDetails = (payload: object, callback: Function) => {
  return {
    type: types.UPDATE_PET_DETAILS,
    payload,
    callback,
  };
};

export const submitIdentificationOfAnimal = (payload: object, callback: Function) => {
  return {
    type: types.PET_IDENTIFICATION_OF_ANIMAL,
    payload,
    callback,
  };
};

export const getIdentificationOfAnimal = (payload: object, callback: Function) => {
  return {
    type: types.GET_IDENTIFICATION_OF_ANIMAL,
    payload,
    callback,
  };
};

export const submitIssueOfIdentityCard = (payload: object, callback: Function) => {
  return {
    type: types.PET_ISSUE_OF_IDENTITY_CARD,
    payload,
    callback,
  };
};

export const getIssueOfIdentityCard = (payload: object, callback: Function) => {
  return {
    type: types.GET_ISSUE_OF_IDENTITY_CARD,
    payload,
    callback,
  };
};

export const updateVaccinationObj = (payload: any) => {
  return {
    type: types.UPDATE_VACCINATION_OBJECT,
    payload,
  };
};

export const updatePetObj = (payload: any) => {
  return {
    type: types.UPDATE_PET_OBJECT,
    payload,
  };
};

export const sendPetReportProblem = (payload: object, callback: Function) => {
  return {
    type: types.SEND_PET_REPORT_PROBLEM,
    payload,
    callback,
  };
};
