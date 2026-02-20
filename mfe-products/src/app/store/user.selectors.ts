import { createFeatureSelector, createSelector } from '@ngrx/store';

// User state interface (matching shell store)
export interface UserState {
  name: string | null;
  isAuthenticated: boolean;
}

// Feature selector
export const selectUserState = createFeatureSelector<UserState>('user');

// Selectors
export const selectUserName = createSelector(
  selectUserState,
  (state) => state?.name || null
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (state) => state?.isAuthenticated || false
);
