import { normalize } from 'normalizr';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { UserService } from '../../../services/user/user.service';
import {
  UserActionTypes,
  GetCurrentUserRequestFailureAction,
  GetCurrentUserRequestSuccessAction
} from './user.actions';
import schema from './user.schema';

/**
 * Get current user
 */
function* current(): SagaIterator {
  try {
    const response = yield call([UserService, UserService.current]);
    yield put(new GetCurrentUserRequestSuccessAction(normalize(response.data, schema)));
  } catch (e) {
    yield put(new GetCurrentUserRequestFailureAction(e.message));
  }
}

export const userSaga = all([
  takeEvery(UserActionTypes.GET_CURRENT_USER_REQUEST, current),
]);
