import { combineReducers } from 'redux';
import { AuthenticationActionTypes } from './authentication.actions';
import {
  ErrorActionTypes,
  ErrorState,
  InProgressActionTypes,
  InProgressState,
} from './authentication.types';

const initialState_inProgress: InProgressState = false;
function inProgress(
  state = initialState_inProgress,
  action: InProgressActionTypes
): InProgressState {
  const { type } = action;

  switch (type) {
    case AuthenticationActionTypes.LOGIN_REQUEST:
    case AuthenticationActionTypes.LOGOUT_REQUEST: {
      return true;
    }

    case AuthenticationActionTypes.LOGIN_SUCCESS:
    case AuthenticationActionTypes.LOGOUT_SUCCESS: {
      return false;
    }

    case AuthenticationActionTypes.LOGIN_FAILURE:
    case AuthenticationActionTypes.LOGOUT_FAILURE: {
      return false;
    }

    default: {
      return state;
    }
  }
}

const initialState_error: ErrorState = { type: null, message: null };
function error(state = initialState_error, action: ErrorActionTypes): ErrorState {
  const { type, payload } = action;

  switch (type) {
    case AuthenticationActionTypes.LOGIN_REQUEST:
    case AuthenticationActionTypes.LOGOUT_REQUEST: {
      return { type: null, message: null };
    }

    case AuthenticationActionTypes.LOGIN_SUCCESS:
    case AuthenticationActionTypes.LOGOUT_SUCCESS: {
      return { type: null, message: null };
    }

    case AuthenticationActionTypes.LOGIN_FAILURE:
    case AuthenticationActionTypes.LOGOUT_FAILURE: {
      return { type, message: payload };
    }

    default: {
      return state;
    }
  }
}

export const authenticationReducers = combineReducers({
  inProgress,
  error,
});
