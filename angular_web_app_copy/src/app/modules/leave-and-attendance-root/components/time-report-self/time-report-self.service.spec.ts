import { TestBed } from '@angular/core/testing';

import { TimeReportSelfService } from './time-report-self.service';

describe('TimeReportSelfService', () => {
  let service: TimeReportSelfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeReportSelfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
