import {types} from '../ActionTypes';

const INITIAL_STATE = {
  newFormId: null,
  vaccinationObj: null,
  petObj: null
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case types.UPDATE_NEW_FORM_ID:
      return {...state, newFormId: payload};
    case types.UPDATE_VACCINATION_OBJECT:
      return {...state, vaccinationObj: payload}; 
    case types.UPDATE_PET_OBJECT:
      return {...state, petObj: payload};  

    default:
      return state;
  }
};
