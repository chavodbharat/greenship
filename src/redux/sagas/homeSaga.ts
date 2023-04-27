import {takeLatest} from 'redux-saga/effects';
import * as utilActions from '../../utils/Utility';
import {serviceUrl} from '../../utils/Constants/ServiceUrls';
import {types} from '../ActionTypes';
import {showMessage} from 'react-native-flash-message';
import {store} from '../../store/configureStore';

function* getMissingPetList(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(
      `${serviceUrl.apiUrl}greensheep-api/v1/emergency/pet/list/?address=${payload.address}&latitude=${payload?.latitude}&longitude=${payload?.longitude}&distance=${payload?.distance}`,
      null,
      'GET',
    )
    .then(response => {
      if (response.success) {
        callback(response);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
        callback();
      }
    })
    .catch(err => {
      callback();
    });
}

function* getMyPetList(data: object) {
  const {callback} = data;
  utilActions
    .apiCall(
      `${serviceUrl.apiUrl}greensheep-api/v1/emergency/pet/mypets`,
      null,
      'GET',
    )
    .then(response => {
      if (response.success) {
        callback(response);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
        callback();
      }
    })
    .catch(err => {
      callback();
    });
}

function* updateMissingPet(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(
      `${serviceUrl.apiUrl}greensheep-api/v1/emergency/pet/missing-update/`,
      payload,
      'POST',
    )
    .then(response => {
      if (response.success) {
        showMessage({
          message: 'Missing pet reported successfully',
          type: 'success',
        });

        store.dispatch({
          type: types.UPDATE_MISSING_SUCCESS,
          payload: true,
        });
        callback(response);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
        callback();
      }
    })
    .catch(err => {
      callback();
    });
}

function* getUserProfile(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(
      `${serviceUrl.apiUrl}buddypress/v1/members/${payload?.id}/avatar/?context=${payload?.context}`,
      null,
      'GET',
    )
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

function* updateUserProfilePic(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(
      `${serviceUrl.apiUrl}buddypress/v1/members/${payload?.id}/avatar`,
      payload?.data,
      'POST',
      true,
    )
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

function* getBannerImage(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(
      `${serviceUrl.apiUrl}buddypress/v1/members/${payload?.id}/cover/?context=${payload?.context}`,
      null,
      'GET',
    )
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

function* updateBannerImage(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(
      `${serviceUrl.apiUrl}buddypress/v1/members/${payload?.id}/cover`,
      payload?.data,
      'POST',
      true,
    )
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

export default function* watchHomeSaga() {
  yield takeLatest(types.GET_MISSING_PET_LIST, getMissingPetList);
  yield takeLatest(types.GET_MY_PET_LIST, getMyPetList);
  yield takeLatest(types.UPDATE_MISSING_PET, updateMissingPet);
  yield takeLatest(types.GET_USER_PROFILE, getUserProfile);
  yield takeLatest(types.UPDATE_USER_PROFILE_PIC, updateUserProfilePic);
  yield takeLatest(types.UPDATE_BANNER_IMAGE, updateBannerImage);
  yield takeLatest(types.GET_BANNER_IMAGE, getBannerImage);
  
}
