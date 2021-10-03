import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoliciesListComponent } from './view-policies-list.component';

describe('ViewPoliciesListComponent', () => {
  let component: ViewPoliciesListComponent;
  let fixture: ComponentFixture<ViewPoliciesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPoliciesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPoliciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
