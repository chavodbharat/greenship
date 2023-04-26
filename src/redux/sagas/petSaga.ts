import {takeLatest} from 'redux-saga/effects';
import * as utilActions from '../../utils/Utility';
import {serviceUrl} from '../../utils/Constants/ServiceUrls';
import {types} from '../ActionTypes';
import {showMessage} from 'react-native-flash-message';
import { Platform } from 'react-native';

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

//Add Pet Vaccine
function* addPetVaccine(data: object) {
  const {payload, callback} = data;

  const formData = new FormData();
  formData.append('manufature', {
    name: payload.manufatureImageRes.fileName,
    type: payload.manufatureImageRes.type,
    uri: Platform.OS === 'ios' ? payload.manufatureImageRes.uri.replace('file://', '') : 
      payload.manufatureImageRes.uri,
  });
  formData.append('authorised', {
    name: payload.authorisedImageRes.fileName,
    type: payload.authorisedImageRes.type,
    uri: Platform.OS === 'ios' ? payload.authorisedImageRes.uri.replace('file://', '') : 
    payload.authorisedImageRes.uri,
  });
  formData.append('vaccine_type',  payload.vaccineType);
  formData.append('start_date',  payload.startDate);
  formData.append('end_date',  payload.endDate);
  formData.append('vaccine_id', payload.vaccineId);
  formData.append('form_id', payload.formId);
  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/vaccine/add`, formData, 'POST', true)
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

//Get Pet Art List
function* getPetArtList(data: object) {
  const {callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/options/get-petart`, null, 'GET')
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

//Get Pet Race List
function* getPetRaceList(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/options/get-petrace?pet_art=` + payload.petArt, null, 'GET')
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

//Get Country List
function* getAllCountryList(data: object) {
  const {callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/options/get-countries`, null, 'GET')
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

//Create New Pet
function* createPet(data: object) {
  const {payload, callback} = data;  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/create`, payload, 'POST', false)
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

//Add Pet Profile
function* uploadPetProfilePhoto(data: object) {
  const {payload, callback} = data;

  console.log("petProfilePicRes.assets[0].fileName", payload.petProfilePicRes.assets[0])
  const formData = new FormData();
  formData.append('pet_profile[]', {
    name: payload.petProfilePicRes.assets[0].fileName,
    type: payload.petProfilePicRes.assets[0].type,
    uri: Platform.OS === 'ios' ? payload.petProfilePicRes.assets[0].uri.replace('file://', '') : 
      payload.petProfilePicRes.assets[0].uri,
  });
  formData.append('form_id',  payload.formId);
  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/image/add`, formData, 'POST', true)
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
  yield takeLatest(types.ADD_PET_VACCINE, addPetVaccine);
  yield takeLatest(types.GET_PET_ART_LIST, getPetArtList);
  yield takeLatest(types.GET_PET_RACE_LIST, getPetRaceList);
  yield takeLatest(types.CREATE_PET, createPet);
  yield takeLatest(types.UPLOAD_PET_PROFILE_IMAGE, uploadPetProfilePhoto);
  yield takeLatest(types.GET_COUNTRY_LIST, getAllCountryList);
}
