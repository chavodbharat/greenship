import {types} from '../ActionTypes';

const INITIAL_STATE = {
  missingPetSuccess: null,
  currentLatitude: 0.0,
  currentLongitude: 0.0,
  currentAddress: '',
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case types.UPDATE_MISSING_SUCCESS:
      return {...state, missingPetSuccess: payload};
    case types.UPDATE_CURRENT_LOCATION:
      return {
        ...state,
        currentLatitude: payload.latitude,
        currentLongitude: payload.longitude,
        currentAddress: payload.address,
      };

    default:
      return state;
  }
};
