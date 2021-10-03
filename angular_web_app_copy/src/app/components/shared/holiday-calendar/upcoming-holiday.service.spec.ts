import { TestBed } from '@angular/core/testing';

import { UpcomingHolidayService } from './upcoming-holiday.service';

describe('UpcomingHolidayService', () => {
  let service: UpcomingHolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingHolidayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
