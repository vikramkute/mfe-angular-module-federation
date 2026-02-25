# Angular Material & Code Guidelines

**Version**: For Angular 21 with Material 21.x+  
**Last Updated**: February 25, 2026  
**IMPORTANT**: This is an **AI Assistant/Code Generator Instruction Document**. All code generation, refactoring, and development tasks MUST reference and follow these guidelines before proceeding.

> 📌 **Compatible AI Assistants**: Amazon Q, Anthropic Claude, Google Gemini, Microsoft Copilot, GitHub Copilot, and any other AI code generator

## Overview

This document provides guidelines for using Angular Material components and following best practices in code generation and development across the MFE architecture. All development, code generation, and architectural decisions should adhere to these guidelines.

### Key Priority Areas
1. **Common-UI-Lib** - Use shared components from common-ui-lib across all MFEs
2. **Angular Signals** - Preferred over RxJS for all new code (Angular 21 syntax)
3. **Material Components** - All UI must use Material Design
4. **John Papa Style Guide** - Code organization and naming conventions
5. **Standalone Components** - All components must be standalone
6. **Reactive Forms** - All forms use reactive approach

---

## 1. Common-UI-Lib - Shared Component Library

### Overview

**Common-UI-Lib** is a centralized Angular Material-based component library built to be used by ALL micro frontend applications (MFEs) and the shell application. It ensures consistent branding, styling, and user experience across the entire project.

### Why Use Common-UI-Lib?

✅ **Consistency** - All MFEs have the same look and feel  
✅ **Code Reuse** - Don't duplicate component logic  
✅ **Central Maintenance** - Update once, affects all MFEs  
✅ **Team Alignment** - Shared components mean fewer integration issues  
✅ **Scalability** - Easy to add new shared components as needed  

### Location

```
mfe-angular-module-federation/
├── common-ui-lib/
│   ├── src/
│   │   ├── header/          # Shared header component
│   │   ├── [other-components]/
│   │   ├── public-api.ts    # Exports all public components
│   │   └── common-ui-lib.ts
│   ├── package.json
│   └── dist/common-ui-lib/  # Built distributable
├── shell/
├── mfe-header/
├── mfe-footer/
└── ... other MFEs
```

### Available Components

**Current Shared Components:**
- `Header` - Reusable header component (exported as `cui-header`)

**Future Components** (to be added):
- Footer component
- Navigation component
- Breadcrumbs
- Common layouts
- Custom Material wrappers
- Utility pipes and directives

### How to Build and Use Common-UI-Lib

#### Step 1: Build the Library

```bash
cd common-ui-lib
npm install
npm run build
```

This creates `dist/common-ui-lib` with the built distributable.

#### Step 2: Import in Any MFE or Shell

```bash
cd shell  # or any mfe-*
npm install common-ui-lib@file:../common-ui-lib/dist/common-ui-lib
```

This is automatically configured in package.json:
```json
{
  "dependencies": {
    "common-ui-lib": "file:../common-ui-lib/dist/common-ui-lib"
  }
}
```

#### Step 3: Use Shared Components

```typescript
// Import from the library
import { Header } from 'common-ui-lib';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, Header],  // Import Header component
  template: `
    <cui-header></cui-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class MainLayoutComponent {}
```

### Adding New Components to Common-UI-Lib

#### 1. Create Component in Library

```bash
cd common-ui-lib
ng generate component src/footer/footer --skip-tests
```

#### 2. Update public-api.ts

```typescript
// src/public-api.ts
export * from './header/header';
export * from './footer/footer';  // Add new export
```

#### 3. Use Material for Styling

```typescript
// src/footer/footer.ts
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cui-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {}
```

#### 4. Rebuild and Test

```bash
npm run build

# In shell or MFE folder
npm install
```

### Component Development Best Practices

#### Use Signals for Component State

```typescript
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'cui-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule]
})
export class FooterComponent {
  // Signal inputs
  companyName = input('My Company');
  
  // Signal outputs
  contactClick = output<void>();
  
  // Internal state using Signal
  isExpanded = signal(false);
  
  toggleExpanded(): void {
    this.isExpanded.update(expanded => !expanded);
  }
}
```

#### Always Use Material Components

```typescript
// ✅ CORRECT: Use Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatToolbarModule, MatButtonModule]
})
export class HeaderComponent {}
```

```html
<!-- ✅ CORRECT: Material elements -->
<mat-toolbar color="primary">
  <span>My App</span>
  <button mat-icon-button>
    <mat-icon>menu</mat-icon>
  </button>
</mat-toolbar>
```

#### Follow John Papa Style

```typescript
// ✅ CORRECT: Proper naming and organization
export class CustomHeaderComponent {
  private readonly companyName = 'My Company';
  isMenuOpen = signal(false);
  
  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }
  
  private initializeComponent(): void {
    // Setup logic
  }
}
```

### Updating Dependencies in Common-UI-Lib

When adding Material components or other dependencies:

```bash
cd common-ui-lib
npm install @angular/material@21
npm run build

# Then update all MFEs and shell
cd ../shell
npm install
cd ../mfe-*
npm install
```

### Versioning Strategy

- Common-UI-Lib uses `package.json` version
- MFEs/Shell reference via file path: `file:../common-ui-lib/dist/common-ui-lib`
- Always rebuild library after changes: `npm run build`
- Always reinstall in dependent projects: `npm install`

---

## 2. Angular Material Components

### Official Reference
- **Primary Source**: [Angular Material Components](https://material.angular.dev/components/categories)
- **Version**: Angular Material 21.x (latest stable for Angular 21)
- **Documentation**: https://material.angular.dev

### Material Component Categories

All available components are organized by category:
- **Form Controls**: Autocomplete, Checkbox, Date Picker, Form Field, Input, Radio Button, Select, Slider, Slide Toggle, Stepper
- **Navigation**: Menu, Paginator, Sidebar, Tabs, Toolbar
- **Layout**: Card, Divider, Expansion Panel, Grid List, List, Stepper, Table, Tree
- **Buttons & Indicators**: Button, Button Toggle, Chips, Progress Spinner, Progress Bar
- **Popups & Modals**: Dialog, Tooltip, Snack Bar
- **Data Tables**: Table, Paginator, Sort

### Installation

```bash
# Install Angular Material 21 in any MFE
ng add @angular/material@21

# Or manually add to package.json
npm install @angular/material@21.x.x
```

### Import Material Theme

Add to `styles.css` (shell and each MFE):

```css
/* Include Material Variables */
@import '@angular/material/prebuilt-themes/indigo-pink.css';
/* Or use other themes:
   deeppurple-amber.css
   pink-bluegrey.css
   purple-green.css
*/

/* Or import Material typography globally */
@import '@angular/material/typography/all-typography.css';
```

### Usage Pattern

Always use Material components for UI consistency:

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-card>
      <mat-card-content>
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput placeholder="Enter name" />
        </mat-form-field>
        <button mat-raised-button color="primary">Submit</button>
      </mat-card-content>
    </mat-card>
  `
})
export class ExampleComponent {}
```

---

## 3. Angular Signals (Angular 21+) - PREFERRED APPROACH

### What Are Signals?

Signals are the new reactive primitive in Angular 21+ that replace traditional RxJS Observables for component state.

**Reference**: [Angular Signals Documentation](https://angular.io/guide/signals)

### Why Prefer Signals?

- ✅ Simpler API than RxJS
- ✅ Better performance (fine-grained reactivity)
- ✅ Automatic change detection
- ✅ Less boilerplate than subscriptions
- ✅ Type-safe by default
- ✅ No memory leak concerns (no unsubscribe needed)

### Signal Basics

```typescript
import { signal, computed, effect } from '@angular/core';

// Create a signal
const count = signal(0);

// Read signal value
console.log(count()); // 0

// Update signal
count.set(5);
count.update(c => c + 1); // 6

// Computed (derived) signal
const doubled = computed(() => count() * 2); // 12

// Effect (side effects)
effect(() => {
  console.log('Count changed:', count());
});
```

### Signals in Components

```typescript
import { Component, signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-content>
        <p>Count: {{ count() }}</p>
        <p>Doubled: {{ doubled() }}</p>
        <button mat-raised-button color="primary" (click)="increment()">+</button>
        <button mat-raised-button (click)="decrement()">-</button>
      </mat-card-content>
    </mat-card>
  `
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update(c => c + 1);
  }

  decrement(): void {
    this.count.update(c => c - 1);
  }
}
```

### Signals with Forms

```typescript
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" />
        <mat-error *ngIf="form.get('email')?.hasError('required')">
          Email is required
        </mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" [disabled]="!form.valid" (click)="onSubmit()">
        Save
      </button>
      <p *ngIf="isLoading()">Loading...</p>
      <p *ngIf="successMessage()">{{ successMessage() }}</p>
    </form>
  `
})
export class UserFormComponent {
  form: FormGroup;
  isLoading = signal(false);
  successMessage = signal(''); // Empty = no message

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.userService.saveUser(this.form.value).subscribe({
        next: () => {
          this.successMessage.set('User saved successfully!');
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.successMessage.set('');
        }
      });
    }
  }
}
```

### Converting RxJS to Signals

**Before (RxJS):**
```typescript
export class ProductComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  private destroy$ = new Subject<void>();

  constructor(private service: ProductService) {
    this.products$ = this.service.getProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**After (Signals):**
```typescript
export class ProductComponent implements OnInit {
  products = signal<Product[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    this.service.getProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => this.error.set(err.message),
      complete: () => this.isLoading.set(false)
    });
  }
}
```

### Signal Input/Output (New Syntax)

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <mat-card>
      <h2>{{ user().name }}</h2>
      <button mat-button (click)="deleteClick.emit(user().id)">Delete</button>
    </mat-card>
  `
})
export class UserCardComponent {
  // Signal-based inputs
  user = input<User>();
  
  // Signal-based outputs
  deleteClick = output<string>();
}
```

### When to Use RxJS vs Signals

| Use Case | Recommendation | Reason |
|----------|---|---|
| Component state | **Signals** | Simpler, no unsubscribe needed |
| Data streams | **RxJS** | Complex async operations |
| HTTP requests | **RxJS** | Services return Observables |
| User interactions | **Signals** | Better UX performance |
| Effects/side effects | **Signals with effect()** | Cleaner syntax |
| Complex operations (map, filter, etc.) | **RxJS** | Rich operator library |

---

## 4. John Papa Code Style Guidelines

### Reference
- **Source**: [John Papa Angular Style Guide](https://angular.io/guide/styleguide)
- **Emphasis**: Clean, maintainable, scalable code

### Key Principles to Follow

#### Naming Conventions

| Element | Pattern | Example |
|---------|---------|---------|
| Components | `kebab-case.component.ts` | `user-profile.component.ts` |
| Services | `kebab-case.service.ts` | `data.service.ts` |
| Directives | `kebab-case.directive.ts` | `highlight.directive.ts` |
| Pipes | `kebab-case.pipe.ts` | `safe-html.pipe.ts` |
| Modules | `PascalCase` | `SharedModule` |
| Classes | `PascalCase` | `UserService`, `ProductComponent` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_USERS`, `DEFAULT_TIMEOUT` |
| Variables/Properties | `camelCase` | `userName`, `isActive` |

#### File Organization

```
src/
├── app/
│   ├── core/              # Singleton services
│   │   ├── services/
│   │   └── guards/
│   ├── shared/            # Common components, pipes, directives
│   │   ├── components/
│   │   ├── directives/
│   │   └── pipes/
│   ├── features/          # Feature modules (or route components)
│   │   ├── [feature-name]/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── [feature].component.ts
│   └── app.component.ts
├── assets/
└── styles/
```

#### Single Responsibility Principle (SRP)

- **One component per file**: Each file should define one component/service
- **Small functions**: Keep functions under 75 lines
- **Clear purpose**: Each class/function should have a single, clear responsibility

#### Code Structure Examples

**Service (with RxJS for HTTP):**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
```

**Component (using Signals - PREFERRED, WITH COMMON-UI-LIB):**
```typescript
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Header } from 'common-ui-lib';  // Import from common-ui-lib

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Header  // Use shared component from common-ui-lib
  ],
  template: `
    <cui-header></cui-header>
    <form [formGroup]="form">
      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" />
        <mat-error *ngIf="form.get('email')?.hasError('required')">
          Email is required
        </mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" [disabled]="isLoading()" (click)="onSubmit()">
        Save
      </button>
      <p *ngIf="successMessage()">{{ successMessage() }}</p>
    </form>
  `
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  isLoading = signal(false);
  successMessage = signal(''); // No unsubscribe needed!

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.userService.saveUser(this.form.value).subscribe({
        next: () => {
          this.successMessage.set('Saved successfully!');
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
  }
}
```

#### TypeScript Best Practices

- Use **strict mode**: `strict: true` in `tsconfig.json`
- Use **interfaces** over types for contracts: `interface User { ... }`
- Use **types** for unions/primitives: `type Status = 'active' | 'inactive'`
- Always specify return types: `getUser(): Observable<User> { ... }`
- Avoid `any`: Use specific types or generics
- Use `readonly` for constants: `private readonly apiUrl = '...'`
- Use arrow functions for callbacks to preserve `this` context
- Use template literals for strings with interpolation

#### Comments & Documentation

- Use JSDoc comments for public APIs:
  ```typescript
  /**
   * Fetches user by ID.
   * @param id - The user ID
   * @returns Observable of the user
   */
  getUserById(id: string): Observable<User> { ... }
  ```
- Avoid obvious comments
- Explain "why", not "what"

---

## 5. Material Design Principles for UX

### Design System
- **Color**: Use Material palette (Primary, Accent, Warn)
- **Typography**: Use Material typography scales (display, headline, title, body, etc.)
- **Spacing**: Use `mat-` spacing utilities (8px base unit)
- **Icons**: Use Material Icons (`@angular/material/icon`)

### Material Button Examples

```html
<!-- Raised Button (Primary action) -->
<button mat-raised-button color="primary">Save</button>

<!-- Flat Button (Secondary action) -->
<button mat-button>Cancel</button>

<!-- Icon Button -->
<button mat-icon-button aria-label="Menu">
  <mat-icon>menu</mat-icon>
</button>

<!-- FAB (Floating Action Button) -->
<button mat-fab color="primary">
  <mat-icon>add</mat-icon>
</button>
```

### Material Form Design

```html
<mat-form-field appearance="fill">
  <mat-label>First name</mat-label>
  <input matInput formControl="firstName" />
  <mat-error *ngIf="form.get('firstName')?.hasError('required')">
    First name is required
  </mat-error>
</mat-form-field>
```

### Material Layout Components

- **Mat-Card**: For content containers
- **Mat-Toolbar**: For app headers/navigation
- **Mat-Sidenav**: For side navigation
- **Mat-Tab**: For tabbed content
- **Mat-List**: For list content
- **Mat-Table**: For data tables

---

## 6. Development Guidelines for MFE Project

### 🚀 CRITICAL: Code Generation Priorities (FOR ALL AI CODE GENERATORS)

**When generating, refactoring, or creating code across the MFE architecture, follow in this exact order:**

1. **USE COMMON-UI-LIB COMPONENTS** - Import shared components from common-ui-lib before using generic Material
2. **USE SIGNALS** - Prefer signals for component state (no manual unsubscribe!)
3. **Use Material components** - All remaining UI must use Material Design
4. **Follow John Papa conventions** - kebab-case files, camelCase variables
5. **Standalone components only** - `standalone: true` is required
6. **Reactive forms** - No template-driven forms
7. **Use RxJS for async** - HTTP requests, complex operations only
8. **No memory leaks** - Signals eliminate the need for `takeUntil` on component state
9. **Type everything** - No `any` type, use generics
10. **Organize imports** - Group by source

### For All Code Generation

**BEFORE GENERATING ANY CODE**: This checklist applies to ALL AI code generators. Remember to prioritize Angular 21 Signals!

### Module Federation Considerations

```typescript
// Modern Angular 21: Use Signals + Material + Common-UI-Lib
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Header } from 'common-ui-lib';  // Import from common-ui-lib

@Component({
  selector: 'mfe-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    Header  // Add shared component from common-ui-lib
    // ... other Material modules
  ]
})
export class HeaderComponent {
  // State using Signals
  isMenuOpen = signal(false);
  userCount = signal(0);
  
  // Derived state
  menuStatus = computed(() => this.isMenuOpen() ? 'Open' : 'Closed');

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }
}
```

### NgRx State Management

When using NgRx (as documented in STORE_INTEGRATION.md):

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}
```

### Testing Guidelines

- Use `@angular/core/testing` utilities
- Test Material components with proper testing modules
- Use `MatTooltipModule` in tests when needed
- Mock Material dialogs/modals in unit tests

Example test:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent, MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## 7. Common Material Setup Tasks

### Add Material to a New MFE

```bash
cd mfe-new
ng add @angular/material@21
```

### Import Global Material Theme

In root `styles.css`:
```css
@import '@angular/material/prebuilt-themes/indigo-pink.css';
@import '@angular/material/typography/all-typography.css';

body {
  font-family: Roboto, "Helvetica Neue", sans-serif;
  margin: 0;
}
```

### Icons Setup

In `main.ts`:
```typescript
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// Material Icons are available via <mat-icon>icon-name</mat-icon>
```

---

## 8. Quick Reference Checklist (ALL AI ASSISTANTS MUST VERIFY)

When developing new features or components:

### 🔴 CRITICAL (Must Have)
- [ ] **Common-UI-Lib components used** where available (header, footer, shared layouts)
- [ ] **Signals used for component state** (not RxJS Observables)
- [ ] All UI uses Material components (no HTML buttons, inputs, cards)
- [ ] Components are standalone (`standalone: true`)
- [ ] Form controls use reactive forms
- [ ] No `any` types used (use generics or specific types)
- [ ] Return types specified on all methods
- [ ] Material theme imported globally
- [ ] Common-UI-Lib imported and built before MFE installation

### 🟡 IMPORTANT (Should Have)
- [ ] File names follow kebab-case convention
- [ ] Classes/interfaces use PascalCase
- [ ] Properties/variables use camelCase
- [ ] Services are singleton (`providedIn: 'root'`)
- [ ] Components are small and focused (SRP)
- [ ] Material icons used instead of text/emoji
- [ ] Error messages in Material error states
- [ ] Proper spacing using Material utilities
- [ ] Colors only from Material palette (primary, accent, warn)
- [ ] Follows John Papa style guide
- [ ] No memory leaks (Signals eliminate takeUntil concerns)
- [ ] Updated common-ui-lib referenced in all MFEs/shell

---

## 9. Official Resources & Documentation

**Primary References (Read These First):**

- [Angular Signals Documentation](https://angular.io/guide/signals) **← START HERE**
- [Angular Material Components](https://material.angular.dev) **← UI COMPONENTS**
- [Angular Style Guide (John Papa)](https://angular.io/guide/styleguide) **← CODE STYLE**

**Additional References:**
- [Angular 21 Release Notes](https://blog.angular.io)
- [Material Design System](https://material.io/design)
- [RxJS Documentation](https://rxjs.dev) - For async operations only
- [NgRx Documentation](https://ngrx.io) - For complex state management
- [Angular Testing Guide](https://angular.io/guide/testing)

---

## 10. Common Pitfalls & How to Avoid Them

### ❌ Don't Do This

```typescript
// ❌ WRONG: Using RxJS for component state
export class ProductComponent {
  products$: Observable<Product[]>;
  private destroy$ = new Subject<void>();
  
  constructor(private service: ProductService) {
    this.products$ = this.service.getProducts();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

```typescript
// ❌ WRONG: Native HTML elements instead of Material
<div class="card">
  <input type="text" placeholder="Name" />
  <button onclick="save()">Save</button>
</div>
```

```typescript
// ❌ WRONG: Template-driven forms
<form (ngSubmit)="onSubmit()">
  <input [(ngModel)]="name" />
  <button type="submit">Save</button>
</form>
```

```typescript
// ❌ WRONG: Not standalone component
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule, MatButtonModule]
})
export class MyModule {}
```

### ✅ Do This Instead

```typescript
// ✅ CORRECT: Using Signals for component state
export class ProductComponent implements OnInit {
  products = signal<Product[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  
  constructor(private service: ProductService) {}
  
  ngOnInit(): void {
    this.isLoading.set(true);
    this.service.getProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => this.error.set(err.message),
      complete: () => this.isLoading.set(false)
    });
    // No OnDestroy needed!
  }
}
```

```typescript
// ✅ CORRECT: Material components
<mat-card>
  <mat-card-content>
    <mat-form-field appearance="fill">
      <mat-label>Name</mat-label>
      <input matInput formControl="name" />
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="save()">Save</button>
  </mat-card-content>
</mat-card>
```

```typescript
// ✅ CORRECT: Reactive forms
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <mat-form-field appearance="fill">
    <mat-label>Name</mat-label>
    <input matInput formControlName="name" />
  </mat-form-field>
  <button mat-raised-button color="primary" type="submit">Save</button>
</form>
```

```typescript
// ✅ CORRECT: Standalone component
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule],
  template: '...'
})
export class MyComponent {}
```

---

## 11. Version Compatibility

| Technology | Version | Notes |
|-----------|---------|-------|
| Angular | 21.x | Latest stable |
| Angular Material | 21.x | Matches Angular version |
| TypeScript | ~5.9.2 | Angular 21 requirement |
| RxJS | ~7.8.0 | Angular 21 requirement |
| Node.js | 18+ | Recommended |
| npm | 9+ | Recommended |

---

**Last Updated**: February 25, 2026

---

## 12. 📝 How to Use These Guidelines

### For Developers and Teams
1. Read the entire document once
2. Reference the **Quick Reference Checklist** before code reviews
3. Share with your team and AI assistants

### For AI Code Generators
1. **Analyze this document first** before generating any code
2. **Verify each point** in the checklist before producing code
3. **Reference specific sections** when generating Material components, Signals, or services
4. **Use the code examples** as templates for similar features
5. **Follow the priorities** - don't skip steps or reorder them

### For Custom Instructions / System Prompts
You can reference this file in your AI Assistant's system prompt or custom instructions:

```
project-guidelines: https://github.com/path/to/ANGULAR_MATERIAL_GUIDELINES.md

Before generating ANY code:
1. Read ANGULAR_MATERIAL_GUIDELINES.md
2. Verify Signal usage priority
3. Confirm Material 21 imports
4. Check John Papa style compliance
5. Validate with Quick Reference Checklist
```

---

## 13. ⚙️ AI ASSISTANT / CODE GENERATOR INSTRUCTION TAG

```
🎯 FOR ALL AI CODE GENERATORS (Amazon Q, Claude, Gemini, Copilot, etc.):
- Use Angular Signals as the PRIMARY reactive mechanism
- Use Angular 21+ syntax and features
- Verify Angular Material 21 components are used for all UI
- Apply John Papa code style guidelines
- Confirm Signals checklist before generating code
- Reference this file BEFORE proceeding with any code generation task
- Use Signal input/output syntax for component communication
- Avoid RxJS Observables for component state (only for HTTP/async operations)
```

**This document is an AI Assistant / Code Generator Instruction File.** ALL future code generation, refactoring, and architectural recommendations by ANY AI assistant MUST reference and follow these guidelines before proceeding. When a user asks for code generation or development tasks, verify compliance with this document.

---
