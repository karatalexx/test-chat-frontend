import { IAction } from '../../store.types';

export enum ChatMessageActionTypes {
  GET_CHAT_MESSAGES_REQUEST = '[get chat messages] request',
  GET_CHAT_MESSAGES_SUCCESS = '[get chat messages] success',
  GET_CHAT_MESSAGES_FAILURE = '[get chat messages] failure',

  CHAT_HAS_NEW_MESSAGES_REQUEST = '[chat has new messages] request',
  CHAT_HAS_NEW_MESSAGES_SUCCESS = '[chat has new messages] success',
  CHAT_HAS_NEW_MESSAGES_FAILURE = '[chat has new messages] failure',
}

// Get chat messages
export class GetChatMessagesRequestAction implements IAction {
  readonly type = ChatMessageActionTypes.GET_CHAT_MESSAGES_REQUEST;

  constructor(public payload: any) {}
}
export class GetChatMessagesSuccessAction implements IAction {
  readonly type = ChatMessageActionTypes.GET_CHAT_MESSAGES_SUCCESS;

  constructor(public payload: any) {}
}
export class GetChatMessagesFailureAction implements IAction {
  readonly type = ChatMessageActionTypes.GET_CHAT_MESSAGES_FAILURE;

  constructor(public payload: any) {}
}

// Chat has new message
export class ChatHasNewMessagesRequestAction implements IAction {
  readonly type = ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_REQUEST;

  constructor(public payload: any) {}
}
export class ChatHasNewMessagesSuccessAction implements IAction {
  readonly type = ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_SUCCESS;

  constructor(public payload: any) {}
}
export class ChatHasNewMessagesFailureAction implements IAction {
  readonly type = ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_FAILURE;

  constructor(public payload: any) {}
}
