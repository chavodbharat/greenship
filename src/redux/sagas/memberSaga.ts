import {takeLatest} from 'redux-saga/effects';
import * as utilActions from '../../utils/Utility';
import {serviceUrl} from '../../utils/Constants/ServiceUrls';
import {types} from '../ActionTypes';
import {showMessage} from 'react-native-flash-message';

//Get Pet List
function* getCommunityUserList(data: object) {
  const {callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}buddypress/v1/members`, null, 'GET')
    .then(response => {
      if (!response?.message) {
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
      callback(err);
    });
}

//Get Search User List
function* getSearchUserList(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/member-lists/search?name=
      ${payload.name}&gender=${payload.gender}&radius=${payload.radius}&latitude=
      ${payload.latitude}&longitude=${payload.longitude}&page=${payload.page}&per_page=
      ${payload.per_page}`, null, 'GET')
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
      callback(err);
    });
}

//Get Search Pet List
function* getSearchPetList(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/pet-lists/search?pet_name=
      ${payload.petName}&pet_art=${payload.petArt}&pet_race=${payload.petRace}&pet_gender=
      ${payload.petGender}&pet_age=${payload.petAge}&pet_radius=${payload.petRadius}&latitude=
      ${payload.latitude}&longitude=${payload.longitude}&page=${payload.page}&per_page=
      ${payload.per_page}`, null, 'GET')
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
      callback(err);
    });
}

export default function* watchMemberSaga() {
    yield takeLatest(types.GET_COMMUNITY_MEMBER_LIST, getCommunityUserList);
    yield takeLatest(types.GET_SEARCH_USER_LIST, getSearchUserList);
    yield takeLatest(types.GET_SEARCH_PET_LIST, getSearchPetList);
}