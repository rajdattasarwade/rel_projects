import { TestBed } from '@angular/core/testing';

import { LeaveAndAttendanceRootService } from './leave-and-attendance-root.service';

describe('LeaveAndAttendanceRootService', () => {
  let service: LeaveAndAttendanceRootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveAndAttendanceRootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
