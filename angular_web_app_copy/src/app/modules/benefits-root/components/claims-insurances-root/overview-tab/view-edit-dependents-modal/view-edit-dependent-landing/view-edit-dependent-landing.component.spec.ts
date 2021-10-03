import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditDependentLandingComponent } from './view-edit-dependent-landing.component';

describe('ViewEditDependentLandingComponent', () => {
  let component: ViewEditDependentLandingComponent;
  let fixture: ComponentFixture<ViewEditDependentLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditDependentLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditDependentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
