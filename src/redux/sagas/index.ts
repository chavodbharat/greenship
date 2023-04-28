import {all, fork} from 'redux-saga/effects';
import watchAuthSaga from './authSaga';
import watchPetSaga from './petSaga';
import watchHomeSaga from './homeSaga';
import watchMemberSaga from './memberSaga';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([fork(watchAuthSaga), fork(watchPetSaga), fork(watchHomeSaga), fork(watchMemberSaga)]);
}
