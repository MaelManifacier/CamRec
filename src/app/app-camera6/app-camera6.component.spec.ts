import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCamera6Component } from './app-camera6.component';

describe('AppCamera6Component', () => {
  let component: AppCamera6Component;
  let fixture: ComponentFixture<AppCamera6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCamera6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCamera6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
