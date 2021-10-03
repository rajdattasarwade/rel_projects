import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualAttendanceComponent } from './annual-attendance.component';

describe('AnnualAttendanceComponent', () => {
  let component: AnnualAttendanceComponent;
  let fixture: ComponentFixture<AnnualAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
