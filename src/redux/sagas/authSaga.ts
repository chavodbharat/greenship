import {takeLatest} from 'redux-saga/effects';
import * as utilActions from '../../utils/Utility';
import {serviceUrl} from '../../utils/Constants/ServiceUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {types} from '../ActionTypes';
import {store} from '../../store/configureStore';
import {showMessage} from 'react-native-flash-message';

function* loginUser(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}jwt-auth/v1/token`, payload, 'POST')
    .then(response => {
      if (response.success) {
        AsyncStorage.setItem('token', response?.data?.token);
        store.dispatch({
          type: types.UPDATE_SIGN_IN,
          payload: true,
        });

        store.dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: response?.data,
        });
        showMessage({
          message: 'Login successful',
          type: 'success',
        });
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
      callback();
    })
    .catch(err => {
      callback();
    });
}

function* resetPassword(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(
      `${serviceUrl.apiUrl}greensheep-api/v1/login/forgot-password`,
      payload,
      'POST',
    )
    .then(response => {
      if (response.success) {
        showMessage({
          message: response?.message,
          type: 'success',
        });
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

function* registerUser(data: object) {
  const {payload, callback} = data;
  utilActions
    .apiCall(`${serviceUrl.apiUrl}buddypress/v1/signup`, payload, 'POST')
    .then(response => {
      if (response.length > 0) {
        showMessage({
          message: 'User Created SuccessFully',
          type: 'success',
        });
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
      callback(response);
    })
    .catch(err => {
      callback();
    });
}

export default function* watchAuthSaga() {
  yield takeLatest(types.LOGIN_USER, loginUser);
  yield takeLatest(types.RESET_PASSWORD, resetPassword);
  yield takeLatest(types.REGISTER_USER, registerUser);
}
