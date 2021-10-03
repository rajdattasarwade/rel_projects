import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendanceReportComponent } from './team-attendance-report.component';

describe('TeamAttendanceReportComponent', () => {
  let component: TeamAttendanceReportComponent;
  let fixture: ComponentFixture<TeamAttendanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAttendanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
