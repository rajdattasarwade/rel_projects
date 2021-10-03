import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAndAttendanceComponent } from './leave-and-attendance.component';

describe('LeaveAndAttendanceComponent', () => {
  let component: LeaveAndAttendanceComponent;
  let fixture: ComponentFixture<LeaveAndAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveAndAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAndAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
