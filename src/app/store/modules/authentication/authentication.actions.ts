import { IAction } from '../../store.types';

export enum AuthenticationActionTypes {
  LOGIN_REQUEST = '[login] request',
  LOGIN_SUCCESS = '[login] success',
  LOGIN_FAILURE = '[login] failure',

  LOGOUT_REQUEST = '[logout] request',
  LOGOUT_SUCCESS = '[logout] success',
  LOGOUT_FAILURE = '[logout] failure',
}

// Login attempt
export class LoginRequestAction implements IAction {
  readonly type = AuthenticationActionTypes.LOGIN_REQUEST;

  constructor(public payload: any) {}
}
export class LoginSuccessAction implements IAction {
  readonly type = AuthenticationActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {}
}
export class LoginFailureAction implements IAction {
  readonly type = AuthenticationActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {}
}

// Logout
export class LogoutRequestAction implements IAction {
  readonly type = AuthenticationActionTypes.LOGOUT_REQUEST;

  constructor(public payload: any) {}
}
export class LogoutSuccessAction implements IAction {
  readonly type = AuthenticationActionTypes.LOGOUT_SUCCESS;

  constructor(public payload: any) {}
}
export class LogoutFailureAction implements IAction {
  readonly type = AuthenticationActionTypes.LOGOUT_FAILURE;

  constructor(public payload: any) {}
}
