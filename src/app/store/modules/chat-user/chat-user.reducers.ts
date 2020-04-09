import { combineReducers } from 'redux';
import { ChatUserActionTypes } from './chat-user.actions';

import {
  EntitiesActionTypes,
  EntitiesState,
  ErrorActionTypes,
  ErrorState,
  IdsActionTypes,
  IdsState,
  InProgressActionTypes,
  InProgressState,
} from './chat-user.types';

const initialState_entities: EntitiesState = {};
function entities(state = initialState_entities, action: EntitiesActionTypes): EntitiesState {
  const { type, payload } = action;

  switch (type) {
    case ChatUserActionTypes.GET_CHAT_USERS_REQUEST:
    case ChatUserActionTypes.CHAT_USER_CONNECTED_REQUEST: {
      return state;
    }

    case ChatUserActionTypes.GET_CHAT_USERS_SUCCESS:
    case ChatUserActionTypes.CHAT_USER_CONNECTED_SUCCESS: {
      return {
        ...state,
        ...payload.entities.chatUsers,
      };
    }

    case ChatUserActionTypes.CHAT_USER_DISCONNECTED_SUCCESS: {
      const entitiesState = { ...state };
      delete entitiesState[payload.result];

      return entitiesState;
    }

    case ChatUserActionTypes.GET_CHAT_USERS_FAILURE:
    case ChatUserActionTypes.CHAT_USER_CONNECTED_FAILURE: {
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
    case ChatUserActionTypes.GET_CHAT_USERS_REQUEST:
    case ChatUserActionTypes.CHAT_USER_CONNECTED_REQUEST: {
      return state;
    }

    case ChatUserActionTypes.GET_CHAT_USERS_SUCCESS:
    case ChatUserActionTypes.CHAT_USER_CONNECTED_SUCCESS: {
      const ids = [...state, ...payload.result];

      return ids.filter((item, index) => ids.indexOf(item) === index);
    }

    case ChatUserActionTypes.CHAT_USER_DISCONNECTED_SUCCESS: {
      return state.filter((id: number) => id !== payload.result);
    }

    case ChatUserActionTypes.GET_CHAT_USERS_FAILURE:
    case ChatUserActionTypes.CHAT_USER_CONNECTED_FAILURE:
    case ChatUserActionTypes.CHAT_USER_DISCONNECTED_FAILURE: {
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
    case ChatUserActionTypes.GET_CHAT_USERS_REQUEST: {
      return true;
    }

    case ChatUserActionTypes.GET_CHAT_USERS_SUCCESS: {
      return false;
    }

    case ChatUserActionTypes.GET_CHAT_USERS_FAILURE: {
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
    case ChatUserActionTypes.GET_CHAT_USERS_REQUEST: {
      return { type: null, message: null };
    }

    case ChatUserActionTypes.GET_CHAT_USERS_SUCCESS: {
      return { type: null, message: null };
    }

    case ChatUserActionTypes.GET_CHAT_USERS_FAILURE: {
      return { type, message: payload };
    }

    default: {
      return state;
    }
  }
}

export const chatUserReducers = combineReducers({
  inProgress,
  ids,
  error,
  entities,
});
