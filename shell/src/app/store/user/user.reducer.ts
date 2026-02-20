import { createReducer, on } from '@ngrx/store';
import { login, logout, updateUserName } from './user.actions';
import { initialUserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  on(login, (state, { name }) => ({
    ...state,
    name,
    isAuthenticated: true
  })),
  on(updateUserName, (state, { name }) => ({
    ...state,
    name
  })),
  on(logout, (state) => ({
    ...state,
    name: null,
    isAuthenticated: false
  }))
);
