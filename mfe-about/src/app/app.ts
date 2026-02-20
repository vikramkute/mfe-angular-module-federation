import { Component } from '@angular/core';
import { AboutComponent } from './about/about';

@Component({
  selector: 'app-root',
  imports: [AboutComponent],
  template: `<app-about />`
})
export class App {}
