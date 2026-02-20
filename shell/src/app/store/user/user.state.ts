export interface UserState {
  name: string | null;
  isAuthenticated: boolean;
}

export const initialUserState: UserState = {
  name: null,
  isAuthenticated: false
};
