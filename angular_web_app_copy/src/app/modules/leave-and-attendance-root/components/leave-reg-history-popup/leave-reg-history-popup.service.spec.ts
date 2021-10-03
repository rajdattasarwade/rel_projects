import { TestBed } from '@angular/core/testing';

import { LeaveRegHistoryPopupService } from './leave-reg-history-popup.service';

describe('LeaveRegHistoryPopupService', () => {
  let service: LeaveRegHistoryPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveRegHistoryPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
