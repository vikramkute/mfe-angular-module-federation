import { Component } from '@angular/core';
import { ContactComponent } from './contact/contact';

@Component({
  selector: 'app-root',
  imports: [ContactComponent],
  template: `<app-contact />`
})
export class App {}
