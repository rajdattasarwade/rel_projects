import { TestBed } from '@angular/core/testing';

import { NationalHolidayService } from './national-holiday.service';

describe('NationalHolidayService', () => {
  let service: NationalHolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalHolidayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
