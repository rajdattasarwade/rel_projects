import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyLandingComponent } from './policy-landing.component';

describe('PolicyLandingComponent', () => {
  let component: PolicyLandingComponent;
  let fixture: ComponentFixture<PolicyLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
