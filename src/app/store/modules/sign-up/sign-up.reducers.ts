import { combineReducers } from 'redux';
import { SignUpActionTypes } from './sign-up.actions';
import {
  ErrorActionTypes,
  ErrorState,
  InProgressActionTypes,
  InProgressState,
} from './sign-up.types';

const initialState_inProgress: InProgressState = false;
function inProgress(
  state = initialState_inProgress,
  action: InProgressActionTypes
): InProgressState {
  const { type } = action;

  switch (type) {
    case SignUpActionTypes.SIGN_UP_REQUEST: {
      return true;
    }

    case SignUpActionTypes.SIGN_UP_SUCCESS: {
      return false;
    }

    case SignUpActionTypes.SIGN_UP_FAILURE: {
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
    case SignUpActionTypes.SIGN_UP_REQUEST: {
      return { type: null, message: null };
    }

    case SignUpActionTypes.SIGN_UP_SUCCESS: {
      return { type: null, message: null };
    }

    case SignUpActionTypes.SIGN_UP_FAILURE: {
      return { type, message: payload };
    }

    default: {
      return state;
    }
  }
}

export const signUpReducers = combineReducers({
  inProgress,
  error,
});
