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

//Get Visitor's Profile
function* getMemberProfileDetails(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}buddypress/v1/members/${payload.memberId}`, null, 'GET')
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

//Get member groupe list
function* getMemberGroupeList(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}buddypress/v1/groups?user_id=${payload.userId}`, null, 'GET')
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback(err);
    });
}

//Get member friend list
function* getMemberFriendList(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}buddypress/v1/friends?context=view&user_id=
      ${payload.userId}&is_confirmed=1`, null, 'GET')
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback(err);
    });
}

//Send friend request
function* sendFriendRequest(data: object) {
  const {payload, callback} = data;  
  utilActions
    .apiCall(`${serviceUrl.apiUrl}buddypress/v1/friends`, payload, 'POST', false)
    .then(response => {
      showMessage({
        message: "Request send successfully",
        type: 'success',
      });
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

//Get user friend list
function* getLoginUserFriendList(data: object) {
  const {callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}buddypress/v1/friends?context=view&is_confirmed=1`, null, 'GET')
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback(err);
    });
}

//Get user friend list
function* getLoginUserGroupList(data: object) {
  const {callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}buddypress/v1/groups/me?context=view`, null, 'GET')
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback(err);
    });
}

//Block User
function* blockUser(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/user-block/`, payload, 'POST')
    .then(response => {
      if (response.success && response.statusCode == 200) {
        showMessage({
          message: "User block successfully",
          type: 'success',
        });
        callback(response);
      } else {
        callback();
        showMessage({
          message: response?.error,
          type: 'danger',
        });
      }
    })
    .catch(err => {
      callback(err);
    });
}

//Send Report Problem
function* sendReportProblem(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}greensheep-api/v1/user-report/`, payload, 'POST')
    .then(response => {
      showMessage({
        message: "Report problem submitted successfully",
        type: 'success',
      });
      callback(response);
    })
    .catch(err => {
      callback(err);
    });
}

export default function* watchMemberSaga() {
    yield takeLatest(types.GET_COMMUNITY_MEMBER_LIST, getCommunityUserList);
    yield takeLatest(types.GET_SEARCH_USER_LIST, getSearchUserList);
    yield takeLatest(types.GET_SEARCH_PET_LIST, getSearchPetList);
    yield takeLatest(types.GET_MEMBER_PROFILE_DETAILS, getMemberProfileDetails);
    yield takeLatest(types.GET_MEMBER_GROUP_LIST, getMemberGroupeList);
    yield takeLatest(types.GET_MEMBER_FRIEND_LIST, getMemberFriendList);
    yield takeLatest(types.SEND_FRIEND_REQUEST, sendFriendRequest);
    yield takeLatest(types.GET_LOGIN_USER_FRIEND_LIST, getLoginUserFriendList);
    yield takeLatest(types.GET_LOGIN_USER_GROUP_LIST, getLoginUserGroupList);
    yield takeLatest(types.BLOCK_USER, blockUser);
    yield takeLatest(types.SEND_REPORT_PROBLEM, sendReportProblem);
}