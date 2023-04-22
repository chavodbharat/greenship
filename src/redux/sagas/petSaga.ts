import {takeLatest} from 'redux-saga/effects';
import * as utilActions from '../../utils/Utility';
import {serviceUrl} from '../../utils/Constants/ServiceUrls';
import {types} from '../ActionTypes';
import {showMessage} from 'react-native-flash-message';

//Get Pet List
function* getPetListData(data: object) {
  const {callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/mypets`, null, 'GET')
    .then(response => {
      if (response.success && response.statusCode == 200) {
        callback(response);
      } else {
        callback();
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    })
    .catch(err => {
      callback();
    });
}

//Delete Pet
function* deletePet(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/${payload.petId}`, null, 'DELETE')
    .then(response => {
      if (response.success && response.statusCode == 200) {
        showMessage({
          message: "Pet Deleted Successfully",
          type: 'success',
        });
        callback(response);
      } else {
        callback();
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    })
    .catch(err => {
      callback();
    });
}

//Get Vaccine Menu List
function* getVaccineMenuList(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/vaccine/lists?form_id=` 
      + payload.form_id, null, 'GET')
    .then(response => {
      if (response.success && response.statusCode == 200) {
        callback(response);
      } else {
        callback();
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    })
    .catch(err => {
      callback();
    });
}

//Get Vaccine List
function* getVaccinationList(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/vaccine/get?form_id=` + payload.form_id 
      + '&vaccine_type=' + payload.vaccine_type, null, 'GET')
    .then(response => {
      if (response.success && response.statusCode == 200) {
        callback(response);
      } else {
        callback();
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    })
    .catch(err => {
      callback();
    });
}

export default function* watchPetSaga() {
  yield takeLatest(types.GET_PET_LIST, getPetListData);
  yield takeLatest(types.DELETE_PET, deletePet);
  yield takeLatest(types.GET_PET_VACCINE_MENU_LIST, getVaccineMenuList);
  yield takeLatest(types.GET_PET_VACCINATION_LIST, getVaccinationList);
}
