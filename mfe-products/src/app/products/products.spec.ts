import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updateUserName } from '../store/user.actions';
import { selectUserName, selectIsAuthenticated } from '../store/user.selectors';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: any;
  let storeMock: any;

  beforeEach(async () => {
    // Create mock with implementation before providing it
    storeMock = {
      select: vi.fn((selector: any) => {
        if (selector === selectUserName) {
          return of('John Doe');
        } else if (selector === selectIsAuthenticated) {
          return of(true);
        }
        return of(null);
      }),
      dispatch: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the products component', () => {
      expect(component).toBeDefined();
    });

    it('should initialize signals with default values', () => {
      expect(component.newUsername()).toBe('');
      expect(component.showUpdateForm()).toBe(false);
    });

    it('should be a standalone component', () => {
      const metadata = (ProductsComponent as any)['ɵcmp'];
      expect(metadata.standalone).toBe(true);
    });

    it('should have the correct selector', () => {
      const metadata = (ProductsComponent as any)['ɵcmp'];
      expect(metadata.selectors[0][0]).toBe('app-products');
    });
  });

  describe('Store Subscription', () => {
    it('should subscribe to userName selector in constructor', () => {
      expect(storeMock.select).toHaveBeenCalledWith(selectUserName);
    });

    it('should subscribe to isAuthenticated selector in constructor', () => {
      expect(storeMock.select).toHaveBeenCalledWith(selectIsAuthenticated);
    });

    it('should update userName signal from store', () => {
      expect(component.userName()).toBe('John Doe');
    });

    it('should update isAuthenticated signal from store', () => {
      expect(component.isAuthenticated()).toBe(true);
    });
  });

  describe('toggleUpdateForm', () => {
    it('should toggle showUpdateForm from false to true', () => {
      expect(component.showUpdateForm()).toBe(false);
      component.toggleUpdateForm();
      expect(component.showUpdateForm()).toBe(true);
    });

    it('should toggle showUpdateForm from true to false', () => {
      component.showUpdateForm.set(true);
      component.toggleUpdateForm();
      expect(component.showUpdateForm()).toBe(false);
    });

    it('should reset newUsername when hiding the form', () => {
      component.newUsername.set('Test User');
      component.showUpdateForm.set(true);
      component.toggleUpdateForm();
      expect(component.newUsername()).toBe('');
    });

    it('should not reset newUsername when showing the form', () => {
      component.newUsername.set('Test User');
      component.toggleUpdateForm();
      expect(component.newUsername()).toBe('Test User');
    });
  });

  describe('updateUsername', () => {
    it('should dispatch updateUserName action when username is valid', () => {
      component.newUsername.set('Valid User');
      component.updateUsername();

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        updateUserName({ name: 'Valid User' })
      );
    });

    it('should trim whitespace before validating', () => {
      component.newUsername.set('  Trimmed User  ');
      component.updateUsername();

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        updateUserName({ name: 'Trimmed User' })
      );
    });

    it('should not dispatch action when username is too short', () => {
      component.newUsername.set('ab');
      component.updateUsername();

      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch action when username is empty', () => {
      component.newUsername.set('');
      component.updateUsername();

      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch action when username is only whitespace', () => {
      component.newUsername.set('   ');
      component.updateUsername();

      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });

    it('should reset newUsername after successful update', () => {
      component.newUsername.set('Valid User');
      component.updateUsername();

      expect(component.newUsername()).toBe('');
    });

    it('should hide form after successful update', () => {
      component.showUpdateForm.set(true);
      component.newUsername.set('Valid User');
      component.updateUsername();

      expect(component.showUpdateForm()).toBe(false);
    });

    it('should require minimum 3 characters', () => {
      component.newUsername.set('Ab');
      component.updateUsername();
      expect(storeMock.dispatch).not.toHaveBeenCalled();

      component.newUsername.set('Abc');
      component.updateUsername();
      expect(storeMock.dispatch).toHaveBeenCalled();
    });
  });

  describe('Integration Tests', () => {
    it('should complete a full username update flow', () => {
      // Initially form is hidden
      expect(component.showUpdateForm()).toBe(false);

      // Toggle to show form
      component.toggleUpdateForm();
      expect(component.showUpdateForm()).toBe(true);

      // Enter new username
      component.newUsername.set('New User');
      expect(component.newUsername()).toBe('New User');

      // Submit form
      component.updateUsername();

      // Form should be hidden, username cleared, and action dispatched
      expect(component.showUpdateForm()).toBe(false);
      expect(component.newUsername()).toBe('');
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        updateUserName({ name: 'New User' })
      );
    });

    it('should handle form cancellation', () => {
      component.toggleUpdateForm();
      component.newUsername.set('New User');
      component.toggleUpdateForm(); // Cancel

      expect(component.showUpdateForm()).toBe(false);
      expect(component.newUsername()).toBe('');
      expect(storeMock.dispatch).not.toHaveBeenCalled();
    });
  });
});
