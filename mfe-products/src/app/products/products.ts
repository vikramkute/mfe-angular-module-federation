import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { selectUserName, selectIsAuthenticated } from '../store/user.selectors';
import { updateUserName } from '../store/user.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
  readonly newUsername = signal('');
  readonly showUpdateForm = signal(false);

  // Using signals to derive state
  readonly userName = signal<string | null>(null);
  readonly isAuthenticated = signal<boolean>(false);

  constructor(private store: Store) {
    // Subscribe to store selectors and update signals
    this.store.select(selectUserName).subscribe(name => {
      this.userName.set(name);
    });
    this.store.select(selectIsAuthenticated).subscribe(isAuth => {
      this.isAuthenticated.set(isAuth);
    });
  }

  toggleUpdateForm() {
    this.showUpdateForm.update(state => !state);
    if (this.showUpdateForm()) {
      return;
    }
    this.newUsername.set('');
  }

  updateUsername() {
    if (this.newUsername().trim().length >= 3) {
      // Dispatch action to update the username in the shared store
      this.store.dispatch(updateUserName({ name: this.newUsername().trim() }));
      this.newUsername.set('');
      this.showUpdateForm.set(false);
    }
  }
}
