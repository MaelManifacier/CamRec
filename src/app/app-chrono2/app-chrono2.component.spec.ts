import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChrono2Component } from './app-chrono2.component';

describe('AppChrono2Component', () => {
  let component: AppChrono2Component;
  let fixture: ComponentFixture<AppChrono2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppChrono2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChrono2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
