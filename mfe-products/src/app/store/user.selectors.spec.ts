import { describe, it, expect } from 'vitest';
import {
  selectUserState,
  selectUserName,
  selectIsAuthenticated,
  UserState,
} from './user.selectors';

describe('User Selectors', () => {
  const mockUserState: UserState = {
    name: 'John Doe',
    isAuthenticated: true,
  };

  describe('selectUserState', () => {
    it('should select the user state feature', () => {
      const rootState = { user: mockUserState };
      const result = selectUserState(rootState);
      expect(result).toEqual(mockUserState);
    });
  });

  describe('selectUserName', () => {
    it('should select the user name from state', () => {
      const state = { user: mockUserState };
      const result = selectUserName(state);
      expect(result).toBe('John Doe');
    });

    it('should return null when user state is null', () => {
      const state = { user: null };
      const result = selectUserName(state);
      expect(result).toBeNull();
    });

    it('should return null when name is null', () => {
      const state = { user: { name: null, isAuthenticated: true } };
      const result = selectUserName(state);
      expect(result).toBeNull();
    });

    it('should return null when user state is undefined', () => {
      const state = { user: undefined };
      const result = selectUserName(state);
      expect(result).toBeNull();
    });

    it('should handle empty string names', () => {
      const state = { user: { name: '', isAuthenticated: true } };
      const result = selectUserName(state);
      expect(result).toBe('');
    });
  });

  describe('selectIsAuthenticated', () => {
    it('should select the authenticated status from state', () => {
      const state = { user: mockUserState };
      const result = selectIsAuthenticated(state);
      expect(result).toBe(true);
    });

    it('should return false when isAuthenticated is false', () => {
      const state = { user: { name: 'John', isAuthenticated: false } };
      const result = selectIsAuthenticated(state);
      expect(result).toBe(false);
    });

    it('should return false when user state is null', () => {
      const state = { user: null };
      const result = selectIsAuthenticated(state);
      expect(result).toBe(false);
    });

    it('should return false when user state is undefined', () => {
      const state = { user: undefined };
      const result = selectIsAuthenticated(state);
      expect(result).toBe(false);
    });
  });

  describe('Selector Edge Cases', () => {
    it('should handle state with all null values', () => {
      const state = {
        user: { name: null, isAuthenticated: false },
      };
      expect(selectUserName(state)).toBeNull();
      expect(selectIsAuthenticated(state)).toBe(false);
    });

    it('should handle state with special characters in name', () => {
      const state = {
        user: {
          name: 'John & Jane <Test>',
          isAuthenticated: true,
        },
      };
      expect(selectUserName(state)).toBe('John & Jane <Test>');
    });

    it('should handle state with very long username', () => {
      const longName = 'A'.repeat(1000);
      const state = {
        user: { name: longName, isAuthenticated: true },
      };
      expect(selectUserName(state)).toBe(longName);
    });
  });
});
