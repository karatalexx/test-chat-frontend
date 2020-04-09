import { IAction } from '../../store.types';

export enum UserActionTypes {
  GET_CURRENT_USER_REQUEST = '[get current] request',
  GET_CURRENT_USER_SUCCESS = '[get current] success',
  GET_CURRENT_USER_FAILURE = '[get current] failure',
}

// Get current user
export class GetCurrentUserRequestAction implements IAction {
  readonly type = UserActionTypes.GET_CURRENT_USER_REQUEST;
}
export class GetCurrentUserRequestSuccessAction implements IAction {
  readonly type = UserActionTypes.GET_CURRENT_USER_SUCCESS;

  constructor(public payload: any) {}
}
export class GetCurrentUserRequestFailureAction implements IAction {
  readonly type = UserActionTypes.GET_CURRENT_USER_FAILURE;

  constructor(public payload: any) {}
}