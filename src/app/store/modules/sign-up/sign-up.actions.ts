import { IAction } from '../../store.types';

export enum SignUpActionTypes {
  SIGN_UP_REQUEST = '[sign up] request',
  SIGN_UP_SUCCESS = '[sign up] success',
  SIGN_UP_FAILURE = '[sign up] failure',
}

// Sign up attempt
export class SignUpRequestAction implements IAction {
  readonly type = SignUpActionTypes.SIGN_UP_REQUEST;

  constructor(public payload: any) {}
}
export class SignUpSuccessAction implements IAction {
  readonly type = SignUpActionTypes.SIGN_UP_SUCCESS;

  constructor(public payload: any) {}
}
export class SignUpFailureAction implements IAction {
  readonly type = SignUpActionTypes.SIGN_UP_FAILURE;

  constructor(public payload: any) {}
}
