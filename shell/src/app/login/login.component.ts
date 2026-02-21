import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../store/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly username = signal('');
  readonly password = signal('');
  readonly errorMessage = signal('');

  constructor(private store: Store) {}

  onSubmit() {
    // Simple validation
    if (!this.username() || !this.password()) {
      this.errorMessage.set('Please enter both username and password');
      return;
    }

    // For demo purposes, accept any non-empty credentials
    // In production, you'd validate against a backend
    if (this.username().length >= 3 && this.password().length >= 3) {
      this.store.dispatch(login({ name: this.username() }));
      this.errorMessage.set('');
      this.username.set('');
      this.password.set('');
    } else {
      this.errorMessage.set('Username and password must be at least 3 characters');
    }
  }
}
