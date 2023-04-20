import {all, fork} from 'redux-saga/effects';
import watchAuthSaga from './authSaga';
import watchPetSaga from './petSaga';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([fork(watchAuthSaga), fork(watchPetSaga)]);
}
