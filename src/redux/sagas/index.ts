import {all, fork} from 'redux-saga/effects';
import watchAuthSaga from './authSaga';
import watchHomeSaga from './homeSaga';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([fork(watchAuthSaga), fork(watchHomeSaga)]);
}
