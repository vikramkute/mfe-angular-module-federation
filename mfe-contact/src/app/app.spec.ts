import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-contact component', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-contact')).toBeTruthy();
  });
});
