import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeReportTeamComponent } from './time-report-team.component';

describe('TimeReportTeamComponent', () => {
  let component: TimeReportTeamComponent;
  let fixture: ComponentFixture<TimeReportTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeReportTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeReportTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
