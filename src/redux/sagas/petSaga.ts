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
    name: payload.manufatureImageRes.path.substring(payload.manufatureImageRes.path.lastIndexOf('/') + 1),
    type: payload.manufatureImageRes.mime,
    uri: Platform.OS === 'ios' ? payload.manufatureImageRes.path.replace('file://', '') : 
      payload.manufatureImageRes.path,
  });
  formData.append('authorised', {
    name: payload.authorisedImageRes.path.substring(payload.authorisedImageRes.path.lastIndexOf('/') + 1),
    type: payload.authorisedImageRes.mime,
    uri: Platform.OS === 'ios' ? payload.authorisedImageRes.path.replace('file://', '') : 
    payload.authorisedImageRes.path,
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
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/image/add`, payload?.data, 'POST', true)
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

//Get Pet Details
function* getPetDetails(data: object) {
  const {payload, callback} = data;  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/${payload.petId}`, null, 'GET', false)
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

//Edit Pet
function* updatePetDetails(data: object) {
  const {payload, callback} = data;  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/edit`, payload, 'POST', false)
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

//Identification Of Animal
function* submitIdentificationOfAnimal(data: object) {
  const {payload, callback} = data;  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/fields/Identification`, payload, 'POST', false)
    .then(response => {
      showMessage({
        message: "Data Submitted Successfully",
        type: 'success',
      });
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

//Get Identification Of Animal
function* getIdentificationOfAnimal(data: object) {
  const {payload, callback} = data;  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/fields/Identification?form_id=${payload.form_id}`, null, 'GET', false)
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

//Issue Of Identity Card
function* submitIssueOfIdentityCard(data: object) {
  const {payload, callback} = data;  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/fields/issue`, payload, 'POST', false)
    .then(response => {
      showMessage({
        message: "Data Submitted Successfully",
        type: 'success',
      });
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

//Get Issue Of Identitycard
function* getIssueOfIdentityCard(data: object) {
  const {payload, callback} = data;  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet/fields/issue?form_id=${payload.form_id}`, null, 'GET', false)
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
  yield takeLatest(types.GET_PET_DETAILS, getPetDetails);
  yield takeLatest(types.UPDATE_PET_DETAILS, updatePetDetails);
  yield takeLatest(types.PET_IDENTIFICATION_OF_ANIMAL, submitIdentificationOfAnimal);
  yield takeLatest(types.GET_IDENTIFICATION_OF_ANIMAL, getIdentificationOfAnimal);
  yield takeLatest(types.PET_ISSUE_OF_IDENTITY_CARD, submitIssueOfIdentityCard);
  yield takeLatest(types.GET_ISSUE_OF_IDENTITY_CARD, getIssueOfIdentityCard);
}
