import { createAction, props } from '@ngrx/store';

// Action to update username in the shared store
// This action is defined in the shell but can be dispatched from any MFE
export const updateUserName = createAction(
  '[User] Update Name',
  props<{ name: string }>()
);
