# NgRx Global Store Setup

## Overview
The shell application hosts the global NgRx store that is shared across all Micro Frontends (MFEs). This ensures a single source of truth for application state.

## Configuration

### Shell Application
- **Store Provider**: Configured in `src/app/app.config.ts`
- **Store Structure**: Located in `src/app/store/`
- **DevTools**: Enabled in development mode

### Webpack Configuration
All applications (shell and MFEs) are configured to share NgRx as singleton instances:

```javascript
shared: {
  '@ngrx/store': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  '@ngrx/effects': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
}
```

The shell additionally shares:
```javascript
'@ngrx/store-devtools': { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: true }
```

## Store Structure

### User Feature (Example)
Located in `src/app/store/user/`:
- `user.state.ts` - State interface and initial state
- `user.actions.ts` - Action creators
- `user.reducer.ts` - Reducer function
- `user.selectors.ts` - Selector functions
- `index.ts` - Public API

## Usage in MFEs

### 1. Import Store and Selectors
```typescript
import { Store } from '@ngrx/store';
import { selectUserName, selectIsAuthenticated } from 'shell-store-path';
```

### 2. Inject Store in Component
```typescript
export class MyComponent {
  userName$ = this.store.select(selectUserName);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(private store: Store) {}
}
```

### 3. Dispatch Actions
```typescript
import { login, logout } from 'shell-store-path';

// Login
this.store.dispatch(login({ name: 'John Doe' }));

// Logout
this.store.dispatch(logout());
```

## Adding New Features

1. Create a new feature folder in `src/app/store/`
2. Add state, actions, reducer, and selectors
3. Register the reducer in `app.config.ts`:
```typescript
provideStore({ 
  user: userReducer,
  newFeature: newFeatureReducer 
})
```

## Important Notes

- All MFEs share the same NgRx instance from the shell
- The store is initialized once in the shell application
- MFEs can read from and dispatch to the global store
- Use feature states to organize domain-specific state
- DevTools are only available in the shell application

## Restart Required
After making changes to webpack.config.js files, restart all dev servers for the changes to take effect.
