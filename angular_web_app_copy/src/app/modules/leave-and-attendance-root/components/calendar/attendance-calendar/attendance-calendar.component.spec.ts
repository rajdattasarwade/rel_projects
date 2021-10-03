import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCalendarComponent } from './attendance-calendar.component';

describe('AttendanceCalendarComponent', () => {
  let component: AttendanceCalendarComponent;
  let fixture: ComponentFixture<AttendanceCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
