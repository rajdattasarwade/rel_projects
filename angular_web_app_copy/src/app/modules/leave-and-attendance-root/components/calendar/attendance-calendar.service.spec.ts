import { TestBed } from '@angular/core/testing';

import { AttendanceCalendarService } from './attendance-calendar.service';

describe('AttendanceCalendarService', () => {
  let service: AttendanceCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
