import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeReportSelfComponent } from './time-report-self.component';

describe('TimeReportSelfComponent', () => {
  let component: TimeReportSelfComponent;
  let fixture: ComponentFixture<TimeReportSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeReportSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeReportSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
