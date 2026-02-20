# Products MFE - Store Integration

## Overview
This document explains how the Products MFE accesses and updates the shared NgRx store from the shell application.

## Implementation

### 1. Store Selectors (`src/app/store/user.selectors.ts`)
Created local selectors that match the shell's store structure:

```typescript
export interface UserState {
  name: string | null;
  isAuthenticated: boolean;
}

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUserName = createSelector(selectUserState, (state) => state?.name || null);
export const selectIsAuthenticated = createSelector(selectUserState, (state) => state?.isAuthenticated || false);
```

### 2. Store Actions (`src/app/store/user.actions.ts`)
Created local action that matches the shell's action:

```typescript
export const updateUserName = createAction(
  '[User] Update Name',
  props<{ name: string }>()
);
```

### 3. Products Component (`src/app/products/products.ts`)
Injects the Store and subscribes to user data, plus dispatches update action:

```typescript
export class ProductsComponent {
  userName$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;
  newUsername = '';
  showUpdateForm = false;

  constructor(private store: Store) {
    this.userName$ = this.store.select(selectUserName);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  updateUsername() {
    if (this.newUsername.trim().length >= 3) {
      // Dispatch action to update the username in the shared store
      this.store.dispatch(updateUserName({ name: this.newUsername.trim() }));
      this.newUsername = '';
      this.showUpdateForm = false;
    }
  }
}
```

### 4. Template (`src/app/products/products.html`)
Displays the username and provides an update form:

```html
<div *ngIf="isAuthenticated$ | async">
  <p>Logged in as: {{ userName$ | async }}</p>
  <button (click)="toggleUpdateForm()">Update Username</button>
  <div *ngIf="showUpdateForm">
    <input [(ngModel)]="newUsername" placeholder="Enter new username" />
    <button (click)="updateUsername()">Save Changes</button>
  </div>
</div>
```

## How It Works

1. **Shared Store Instance**: The shell application initializes the NgRx store
2. **Webpack Module Federation**: NgRx is configured as a singleton in webpack configs
3. **Same Store Reference**: All MFEs receive the same store instance from the shell
4. **Selectors**: Each MFE creates its own selectors to access the shared state
5. **Actions**: MFEs can dispatch actions that are handled by the shell's reducers
6. **Reactive Updates**: When the username is updated from any MFE, all MFEs see the changes instantly

## Key Points

- ✅ MFEs can both read and write to the shared store
- ✅ Actions dispatched from MFEs are handled by shell reducers
- ✅ State changes are automatically propagated to all MFEs
- ✅ Type-safe access to store data
- ✅ Reactive updates using Observables
- ✅ No need to import reducers in MFEs (they're in the shell)

## Testing the Update Feature

1. Start the shell and products MFE servers
2. Navigate to `http://localhost:4200`
3. Login with any credentials
4. Navigate to `/products`
5. You should see your username displayed
6. Click "Update Username" button
7. Enter a new username (min 3 characters)
8. Click "Save Changes"
9. The username will update in the products page
10. Navigate to other pages - you'll see the updated username everywhere (including the shell's user bar)

## Cross-MFE State Updates

The beauty of this architecture is that when you update the username from the products MFE:
- The shell's user bar immediately shows the new username
- Any other MFE displaying the username will also update
- All components subscribed to the store receive the update automatically

## Shell Store Configuration

The shell's reducer handles the update action:

```typescript
// shell/src/app/store/user/user.reducer.ts
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
```

## Best Practices

1. **Define actions in MFEs**: Create local action definitions that match the shell
2. **Keep reducers in shell**: Only the shell should have reducers
3. **Use selectors for reading**: Always use selectors to read state
4. **Dispatch actions for writing**: Use store.dispatch() to update state
5. **Match action types exactly**: Action type strings must match between shell and MFEs
6. **Handle null values**: Always provide fallback values in selectors
7. **Type safety**: Define interfaces for type checking

## Troubleshooting

### Issue: "Action not handled"
**Solution**: Ensure the action type string matches exactly between MFE and shell:
```typescript
// Both must have the same string
'[User] Update Name'
```

### Issue: "State not updating"
**Solution**: 
1. Verify the reducer in the shell handles the action
2. Check that the action is being dispatched correctly
3. Use Redux DevTools to see if the action is received

### Issue: "Changes not reflected in other MFEs"
**Solution**:
1. Verify NgRx is shared as singleton in webpack configs
2. Ensure all MFEs are using the same store instance
3. Check that components are using async pipe or subscribing to observables

### Issue: "Cannot read property 'name' of undefined"
**Solution**: Add null checks in selectors:
```typescript
(state) => state?.name || null
```
