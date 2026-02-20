import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[User] Login',
  props<{ name: string }>()
);

export const updateUserName = createAction(
  '[User] Update Name',
  props<{ name: string }>()
);

export const logout = createAction('[User] Logout');
