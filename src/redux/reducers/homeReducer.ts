import {types} from '../ActionTypes';

const INITIAL_STATE = {
  missingPetSuccess: null,
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case types.UPDATE_MISSING_SUCCESS:
      return {...state, missingPetSuccess: payload};

    default:
      return state;
  }
};
