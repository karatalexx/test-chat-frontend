import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import {
  AuthenticationActionTypes,
  LoginSuccessAction,
  LoginFailureAction,
  LogoutSuccessAction,
  LogoutFailureAction,
} from './authentication.actions';

/**
 * Authenticate
 *
 * @param payload
 */
function* attempt({ payload }: any): SagaIterator {
  try {
    const response = yield call(
      [AuthenticationService, AuthenticationService.authenticate],
      payload
    );

    // Store in local storage
    yield call(LocalStorageService.set, 'access_token', response.data.access_token);
    yield put(new LoginSuccessAction(response));

    // Go to the main page
    yield put(push('/chat'));
  } catch (e) {
    yield put(new LoginFailureAction(e.message));
  }
}

/**
 * Logout
 *
 * @param payload
 */
function* logout({ payload }: any): SagaIterator {
  try {
    // Remove token from local storage
    yield call(LocalStorageService.remove, 'access_token');
    yield put(new LogoutSuccessAction(payload));

    // Go to the main page
    yield put(push('/'));
  } catch (e) {
    yield put(new LogoutFailureAction(e.message));
  }
}

export const loginSaga = all([
  takeEvery(AuthenticationActionTypes.LOGIN_REQUEST, attempt),
  takeEvery(AuthenticationActionTypes.LOGOUT_REQUEST, logout),
]);
