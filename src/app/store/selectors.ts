import { createSelector } from 'reselect';
import * as adapters from './adapters';

const getUsersState = (state: any): any => state.users;
const getUsers = createSelector(getUsersState, adapters.getAll);

export const getCurrentUserId = createSelector(getUsersState, (state) => state.currentId);
export const getCurrentUser = createSelector(
  getUsersState,
  getCurrentUserId,
  (users, currentUserId) => {
    const { entities } = users;

    return entities[currentUserId];
  }
);

const getChatMessagesState = (state: any): any => state.chatMessages;
const getChatMessages = createSelector(getChatMessagesState, adapters.getAll);

const getChatUsersState = (state: any): any => state.chatUsers;
const getChatUsers = createSelector(getChatUsersState, adapters.getAll);

export const rootSelector = {
  getUsersState,
  getUsers,
  getCurrentUserId,
  getCurrentUser,
  getChatMessagesState,
  getChatMessages,
  getChatUsersState,
  getChatUsers,
};
