import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Router } from '@angular/router';

describe('App Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it('should render RouterOutlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeDefined();
  });

  it('should have the correct selector', () => {
    const metadata = (App as any)['ɵcmp'];
    expect(metadata.selectors[0][0]).toBe('app-root');
  });

  it('should be a standalone component', () => {
    const metadata = (App as any)['ɵcmp'];
    expect(metadata.standalone).toBe(true);
  });
});
