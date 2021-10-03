import { TestBed } from '@angular/core/testing';

import { LeaveReconciliationService } from './leave-reconciliation.service';

describe('LeaveReconciliationService', () => {
  let service: LeaveReconciliationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveReconciliationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
