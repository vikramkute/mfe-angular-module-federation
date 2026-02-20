import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fallback',
  standalone: true,
  template: '<div style="padding: 40px; text-align: center;"><p>Content unavailable</p></div>'
})
class FallbackComponent {}

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposedModule: './routes'
    }).then(m => m.routes).catch(() => [])
  },
  {
    path: 'about',
    loadComponent: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      exposedModule: './Component'
    }).then(m => m.AboutComponent).catch(() => FallbackComponent)
  },
  {
    path: 'contact',
    loadComponent: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4205/remoteEntry.js',
      exposedModule: './Component'
    }).then(m => m.ContactComponent).catch(() => FallbackComponent)
  }
];
