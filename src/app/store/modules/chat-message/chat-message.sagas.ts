import { SagaIterator } from 'redux-saga';
import { all, takeEvery, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {
  ChatMessageActionTypes,
  GetChatMessagesSuccessAction,
  GetChatMessagesFailureAction,
  ChatHasNewMessagesSuccessAction,
  ChatHasNewMessagesFailureAction,
} from './chat-message.actions';
import schema from './chat-message.schema';

/**
 * Get chat messages
 *
 * @param action
 * @param payload
 */
function* getMessages({ action, payload }: any): SagaIterator {
  try {
    yield put(new GetChatMessagesSuccessAction(normalize(payload, [schema])));
  } catch (e) {
    yield put(new GetChatMessagesFailureAction(e.message));
  }
}

/**
 * Chat has new messages
 *
 * @param action
 * @param payload
 */
function* hasNewMessages({ action, payload }: any): SagaIterator {
  try {
    yield put(new ChatHasNewMessagesSuccessAction(normalize(payload, [schema])));
  } catch (e) {
    yield put(new ChatHasNewMessagesFailureAction(e.message));
  }
}

export const chatMessageSaga = all([
  takeEvery(ChatMessageActionTypes.GET_CHAT_MESSAGES_REQUEST, getMessages),
  takeEvery(ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_REQUEST, hasNewMessages),
]);
