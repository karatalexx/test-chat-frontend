import { IAction } from '../../store.types';

export enum ChatUserActionTypes {
  GET_CHAT_USERS_REQUEST = '[get chat users] request',
  GET_CHAT_USERS_SUCCESS = '[get chat users] success',
  GET_CHAT_USERS_FAILURE = '[get chat users] failure',

  CHAT_USER_CONNECTED_REQUEST = '[chat user connected] request',
  CHAT_USER_CONNECTED_SUCCESS = '[chat user connected] success',
  CHAT_USER_CONNECTED_FAILURE = '[chat user connected] failure',

  CHAT_USER_DISCONNECTED_REQUEST = '[chat user disconnected] request',
  CHAT_USER_DISCONNECTED_SUCCESS = '[chat user disconnected] success',
  CHAT_USER_DISCONNECTED_FAILURE = '[chat user disconnected] failure',

  CHAT_USER_TYPING_REQUEST = '[chat user typing] request',
  CHAT_USER_TYPING_SUCCESS = '[chat user typing] success',
  CHAT_USER_TYPING_FAILURE = '[chat user typing] failure',

  CHAT_USER_SEND_NEW_MESSAGE_REQUEST = '[chat user send new message] request',
  CHAT_USER_SEND_NEW_MESSAGE_SUCCESS = '[chat user send new message] success',
  CHAT_USER_SEND_NEW_MESSAGE_FAILURE = '[chat user send new message] failure',
}

// Get chat users
export class GetChatUsersRequestAction implements IAction {
  readonly type = ChatUserActionTypes.GET_CHAT_USERS_REQUEST;

  constructor(public payload: any) {}
}
export class GetChatUsersSuccessAction implements IAction {
  readonly type = ChatUserActionTypes.GET_CHAT_USERS_SUCCESS;

  constructor(public payload: any) {}
}
export class GetChatUsersFailureAction implements IAction {
  readonly type = ChatUserActionTypes.GET_CHAT_USERS_FAILURE;

  constructor(public payload: any) {}
}

// User connected
export class ChatUserConnectedRequestAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_CONNECTED_REQUEST;

  constructor(public payload: any) {}
}
export class ChatUserConnectedSuccessAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_CONNECTED_SUCCESS;

  constructor(public payload: any) {}
}
export class ChatUserConnectedFailureAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_CONNECTED_FAILURE;

  constructor(public payload: any) {}
}

// User disconnected
export class ChatUserDisconnectedRequestAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_DISCONNECTED_REQUEST;

  constructor(public payload: any) {}
}
export class ChatUserDisconnectedSuccessAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_DISCONNECTED_SUCCESS;

  constructor(public payload: any) {}
}
export class ChatUserDisconnectedFailureAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_DISCONNECTED_FAILURE;

  constructor(public payload: any) {}
}

// User typing
export class ChatUserTypingRequestAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_TYPING_REQUEST;

  constructor(public payload: any) {}
}
export class ChatUserTypingSuccessAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_TYPING_SUCCESS;

  constructor(public payload: any) {}
}
export class ChatUserTypingFailureAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_TYPING_FAILURE;

  constructor(public payload: any) {}
}

// User send new message
export class ChatUserSendNewMessageRequestAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_SEND_NEW_MESSAGE_REQUEST;

  constructor(public payload: any) {}
}
export class ChatUserSendNewMessageSuccessAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_SEND_NEW_MESSAGE_SUCCESS;

  constructor(public payload: any) {}
}
export class ChatUserSendNewMessageFailureAction implements IAction {
  readonly type = ChatUserActionTypes.CHAT_USER_SEND_NEW_MESSAGE_FAILURE;

  constructor(public payload: any) {}
}
