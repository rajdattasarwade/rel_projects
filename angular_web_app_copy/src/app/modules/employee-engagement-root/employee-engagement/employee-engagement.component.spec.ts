import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEngagementComponent } from './employee-engagement.component';

describe('EmployeeEngagementComponent', () => {
  let component: EmployeeEngagementComponent;
  let fixture: ComponentFixture<EmployeeEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
