import { SagaIterator } from 'redux-saga';
import { all, takeEvery, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {
  ChatUserActionTypes,
  GetChatUsersSuccessAction,
  GetChatUsersFailureAction,
  ChatUserConnectedSuccessAction,
  ChatUserConnectedFailureAction,
  ChatUserDisconnectedSuccessAction,
  ChatUserDisconnectedFailureAction,
  ChatUserTypingSuccessAction,
  ChatUserTypingFailureAction,
  ChatUserSendNewMessageSuccessAction,
  ChatUserSendNewMessageFailureAction,
} from './chat-user.actions';
import schema from './chat-user.schema';

/**
 * Get chat users
 *
 * @param action
 * @param payload
 */
function* getChatUsers({ action, payload }: any): SagaIterator {
  try {
    yield put(new GetChatUsersSuccessAction(normalize(payload, [schema])));
  } catch (e) {
    yield put(new GetChatUsersFailureAction(e.message));
  }
}

/**
 * Chat user connected
 *
 * @param action
 * @param payload
 */
function* chatUserConnected({ action, payload }: any): SagaIterator {
  try {
    yield put(new ChatUserConnectedSuccessAction(normalize(payload, [schema])));
  } catch (e) {
    yield put(new ChatUserConnectedFailureAction(e.message));
  }
}

/**
 * Chat user disconnected
 *
 * @param action
 * @param payload
 */
function* chatUserDisconnected({ action, payload }: any): SagaIterator {
  try {
    yield put(new ChatUserDisconnectedSuccessAction(normalize(payload, schema)));
  } catch (e) {
    yield put(new ChatUserDisconnectedFailureAction(e.message));
  }
}

/**
 * Chat user typing
 *
 * @param action
 * @param payload
 */
function* chatUserTyping({ action, payload }: any): SagaIterator {
  try {
    yield put(new ChatUserTypingSuccessAction(payload));
  } catch (e) {
    yield put(new ChatUserTypingFailureAction(e.message));
  }
}

/**
 * Chat user typing
 *
 * @param action
 * @param payload
 */
function* chatUserSendMessage({ action, payload }: any): SagaIterator {
  try {
    yield put(new ChatUserSendNewMessageSuccessAction(payload));
  } catch (e) {
    yield put(new ChatUserSendNewMessageFailureAction(e.message));
  }
}

export const chatUserSaga = all([
  takeEvery(ChatUserActionTypes.GET_CHAT_USERS_REQUEST, getChatUsers),
  takeEvery(ChatUserActionTypes.CHAT_USER_CONNECTED_REQUEST, chatUserConnected),
  takeEvery(ChatUserActionTypes.CHAT_USER_DISCONNECTED_REQUEST, chatUserDisconnected),
  takeEvery(ChatUserActionTypes.CHAT_USER_TYPING_REQUEST, chatUserTyping),
  takeEvery(ChatUserActionTypes.CHAT_USER_TYPING_REQUEST, chatUserSendMessage),
]);
