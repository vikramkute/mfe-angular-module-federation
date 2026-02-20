import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [FooterComponent],
  template: `<app-footer />`
})
export class App {}
