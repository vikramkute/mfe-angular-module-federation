import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        loadComponent: () => loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4206/remoteEntry.js',
          exposedModule: './Component'
        }).then(m => m.ProductsComponent)
      }
    ]
  }
];
