import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  template: `<app-header />`
})
export class App {}
