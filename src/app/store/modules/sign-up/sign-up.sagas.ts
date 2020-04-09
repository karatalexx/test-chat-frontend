import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SignUpService } from '../../../services/sign-up/sign-up.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { SignUpActionTypes, SignUpSuccessAction, SignUpFailureAction } from './sign-up.actions';

/**
 * Sign up attempt
 *
 * @param payload
 */
function* attempt({ payload }: any): SagaIterator {
  try {
    const response = yield call([SignUpService, SignUpService.attempt], payload);

    // Store in local storage
    yield call(LocalStorageService.set, 'access_token', response.data.access_token);
    yield put(new SignUpSuccessAction(response));

    // Go to the main page
    yield put(push('/chat'));
  } catch (e) {
    yield put(new SignUpFailureAction(e.message));
  }
}

export const signUpSaga = all([takeEvery(SignUpActionTypes.SIGN_UP_REQUEST, attempt)]);
