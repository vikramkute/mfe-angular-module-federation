import { describe, it, expect } from 'vitest';
import { updateUserName } from './user.actions';

describe('User Actions', () => {
  describe('updateUserName', () => {
    it('should create an action with type [User] Update Name', () => {
      const action = updateUserName({ name: 'John Doe' });
      expect(action.type).toBe('[User] Update Name');
    });

    it('should include the name property in the action payload', () => {
      const testName = 'Jane Smith';
      const action = updateUserName({ name: testName });
      expect(action.name).toBe(testName);
    });

    it('should handle empty string names', () => {
      const action = updateUserName({ name: '' });
      expect(action.name).toBe('');
      expect(action.type).toBe('[User] Update Name');
    });

    it('should handle names with special characters', () => {
      const specialName = "O'Brien-Smith & Associates";
      const action = updateUserName({ name: specialName });
      expect(action.name).toBe(specialName);
    });

    it('should handle very long names', () => {
      const longName = 'A'.repeat(1000);
      const action = updateUserName({ name: longName });
      expect(action.name).toBe(longName);
    });

    it('should be comparable to other instances of the same action', () => {
      const action1 = updateUserName({ name: 'John' });
      const action2 = updateUserName({ name: 'John' });
      expect(action1.type).toBe(action2.type);
      expect(action1.name).toBe(action2.name);
    });
  });
});
