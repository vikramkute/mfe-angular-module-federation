import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { AboutComponent } from './about/about';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render AboutComponent', () => {
    const aboutElement = fixture.debugElement.nativeElement.querySelector('app-about');
    expect(aboutElement).toBeTruthy();
  });

  it('should have correct selector', () => {
    expect((component.constructor as any).ɵcmp.selectors).toBeDefined();
  });
});
