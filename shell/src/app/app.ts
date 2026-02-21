import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectIsAuthenticated, selectUserName, logout } from './store/user';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  @ViewChild('header', { read: ViewContainerRef }) headerContainer!: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef }) footerContainer!: ViewContainerRef;

  isAuthenticated$: Observable<boolean>;
  userName$: Observable<string | null>;

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userName$ = this.store.select(selectUserName);
  }

  async ngOnInit() {
    // Load header and footer components
    this.isAuthenticated$.subscribe(async (isAuth) => {
      if (isAuth) {
        await this.loadHeaderComponent();
        await this.loadFooterComponent();
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
    this.clearContainers();
  }

  private clearContainers(): void {
    if (this.headerContainer) {
      this.headerContainer.clear();
    }
    if (this.footerContainer) {
      this.footerContainer.clear();
    }
  }

  private async loadHeaderComponent(): Promise<void> {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Component'
      });
      this.headerContainer.createComponent(module.HeaderComponent);
    } catch (error) {
      console.error('Error loading header:', error);
    }
  }

  private async loadFooterComponent(): Promise<void> {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Component'
      });
      this.footerContainer.createComponent(module.FooterComponent);
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }
}
