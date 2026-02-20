import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectUserName, selectIsAuthenticated } from '../store/user.selectors';
import { updateUserName } from '../store/user.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, NgIf, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
  userName$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;
  newUsername = '';
  showUpdateForm = false;

  constructor(private store: Store) {
    this.userName$ = this.store.select(selectUserName);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
    if (!this.showUpdateForm) {
      this.newUsername = '';
    }
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
