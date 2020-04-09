import { combineReducers } from 'redux';
import { ChatMessageActionTypes } from './chat-message.actions';

import {
  EntitiesActionTypes,
  EntitiesState,
  ErrorActionTypes,
  ErrorState,
  IdsActionTypes,
  IdsState,
  InProgressActionTypes,
  InProgressState,
} from './chat-message.types';

const initialState_entities: EntitiesState = {};
function entities(state = initialState_entities, action: EntitiesActionTypes): EntitiesState {
  const { type, payload } = action;

  switch (type) {
    case ChatMessageActionTypes.GET_CHAT_MESSAGES_REQUEST:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_REQUEST: {
      return state;
    }

    case ChatMessageActionTypes.GET_CHAT_MESSAGES_SUCCESS:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_SUCCESS: {
      return {
        ...state,
        ...payload.entities.chatMessages,
      };
    }

    case ChatMessageActionTypes.GET_CHAT_MESSAGES_FAILURE:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_FAILURE: {
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
    case ChatMessageActionTypes.GET_CHAT_MESSAGES_REQUEST:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_REQUEST: {
      return state;
    }

    case ChatMessageActionTypes.GET_CHAT_MESSAGES_SUCCESS:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_SUCCESS: {
      const ids = [...state, ...payload.result];

      return ids.filter((item, index) => ids.indexOf(item) === index);
    }

    case ChatMessageActionTypes.GET_CHAT_MESSAGES_FAILURE:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_FAILURE: {
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
    case ChatMessageActionTypes.GET_CHAT_MESSAGES_REQUEST:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_REQUEST: {
      return true;
    }

    case ChatMessageActionTypes.GET_CHAT_MESSAGES_SUCCESS:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_SUCCESS: {
      return false;
    }

    case ChatMessageActionTypes.GET_CHAT_MESSAGES_FAILURE:
    case ChatMessageActionTypes.CHAT_HAS_NEW_MESSAGES_FAILURE: {
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
    case ChatMessageActionTypes.GET_CHAT_MESSAGES_REQUEST: {
      return { type: null, message: null };
    }

    case ChatMessageActionTypes.GET_CHAT_MESSAGES_SUCCESS: {
      return { type: null, message: null };
    }

    case ChatMessageActionTypes.GET_CHAT_MESSAGES_FAILURE: {
      return { type, message: payload };
    }

    default: {
      return state;
    }
  }
}

export const chatMessageReducers = combineReducers({
  inProgress,
  ids,
  error,
  entities,
});
