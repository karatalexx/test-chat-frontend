import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { authenticationReducers } from './modules/authentication/authentication.reducers';
import { signUpReducers } from './modules/sign-up/sign-up.reducers';
import { userReducers } from './modules/user/user.reducers';
import { chatUserReducers } from './modules/chat-user/chat-user.reducers';
import { chatMessageReducers } from './modules/chat-message/chat-message.reducers';

export function rootReducer(history: History): Reducer {
  return combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducers,
    signUp: signUpReducers,
    users: userReducers,
    chatUsers: chatUserReducers,
    chatMessages: chatMessageReducers,
  });
}

export type AppState = ReturnType<typeof rootReducer>;
