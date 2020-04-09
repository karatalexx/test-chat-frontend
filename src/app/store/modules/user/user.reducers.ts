import { combineReducers } from 'redux';
import { AuthenticationActionTypes } from '../authentication/authentication.actions';
import { UserActionTypes } from './user.actions';

import {
  CurrentIdState,
  EntitiesActionTypes,
  EntitiesState,
  ErrorActionTypes,
  ErrorState,
  IdsActionTypes,
  IdsState,
  InProgressActionTypes,
  InProgressState,
} from './user.types';

const initialState_entities: EntitiesState = {};
function entities(state = initialState_entities, action: EntitiesActionTypes): EntitiesState {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.GET_CURRENT_USER_REQUEST: {
      return state;
    }

    case UserActionTypes.GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        ...payload.entities.users,
      };
    }

    case AuthenticationActionTypes.LOGOUT_SUCCESS: {
      const entitiesState = { ...state };
      delete entitiesState[payload];

      return entitiesState;
    }

    case UserActionTypes.GET_CURRENT_USER_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
}

const initialState_ids: IdsState = [];
function ids(state = initialState_ids, action: IdsActionTypes): IdsState {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.GET_CURRENT_USER_REQUEST: {
      return [];
    }

    case UserActionTypes.GET_CURRENT_USER_SUCCESS: {
      const ids = [...state, ...[payload.result]];
      return ids.filter((item, index) => ids.indexOf(item) === index);
    }

    case AuthenticationActionTypes.LOGOUT_SUCCESS: {
      return state.filter((id: number) => id !== payload);
    }

    case UserActionTypes.GET_CURRENT_USER_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
}

const initialState_currentId: CurrentIdState = null;
function currentId(state = initialState_currentId, action: any): CurrentIdState {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.GET_CURRENT_USER_REQUEST: {
      return null;
    }

    case UserActionTypes.GET_CURRENT_USER_SUCCESS: {
      return payload.result;
    }

    case UserActionTypes.GET_CURRENT_USER_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
}

const initialState_inProgress: InProgressState = false;
function inProgress(
  state = initialState_inProgress,
  action: InProgressActionTypes
): InProgressState {
  const { type } = action;

  switch (type) {
    case UserActionTypes.GET_CURRENT_USER_REQUEST: {
      return true;
    }

    case UserActionTypes.GET_CURRENT_USER_SUCCESS: {
      return false;
    }

    case UserActionTypes.GET_CURRENT_USER_FAILURE: {
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
    case UserActionTypes.GET_CURRENT_USER_REQUEST: {
      return { type: null, message: null };
    }

    case UserActionTypes.GET_CURRENT_USER_SUCCESS: {
      return { type: null, message: null };
    }

    case UserActionTypes.GET_CURRENT_USER_FAILURE: {
      return { type, message: payload };
    }

    default: {
      return state;
    }
  }
}

export const userReducers = combineReducers({
  inProgress,
  ids,
  currentId,
  error,
  entities,
});
