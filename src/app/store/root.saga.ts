import { all } from 'redux-saga/effects';
import { signUpSaga } from './modules/sign-up/sign-up.sagas';
import { loginSaga } from './modules/authentication/authentication.sagas';
import { userSaga } from './modules/user/user.sagas';
import { chatMessageSaga } from './modules/chat-message/chat-message.sagas';
import { chatUserSaga } from './modules/chat-user/chat-user.sagas';

export function* rootSaga() {
  yield all([signUpSaga, loginSaga, userSaga, chatMessageSaga, chatUserSaga]);
}
