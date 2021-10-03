import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendanceFilterModalComponent } from './team-attendance-filter-modal.component';

describe('TeamAttendanceFilterModalComponent', () => {
  let component: TeamAttendanceFilterModalComponent;
  let fixture: ComponentFixture<TeamAttendanceFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAttendanceFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAttendanceFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
