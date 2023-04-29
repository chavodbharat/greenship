import {takeLatest} from 'redux-saga/effects';
import * as utilActions from '../../utils/Utility';
import {serviceUrl} from '../../utils/Constants/ServiceUrls';
import {types} from '../ActionTypes';
import {showMessage} from 'react-native-flash-message';

//Get Pet List
function* getMemberListData(data: object) {
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

export default function* watchMemberSaga() {
    yield takeLatest(types.GET_MEMBER_LIST, getMemberListData);
  }