import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserName = createSelector(
  selectUserState,
  (state) => state.name
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (state) => state.isAuthenticated
);
