import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { login } from '../store/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private store: Store) {}

  onSubmit() {
    // Simple validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    // For demo purposes, accept any non-empty credentials
    // In production, you'd validate against a backend
    if (this.username.length >= 3 && this.password.length >= 3) {
      this.store.dispatch(login({ name: this.username }));
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Username and password must be at least 3 characters';
    }
  }
}
