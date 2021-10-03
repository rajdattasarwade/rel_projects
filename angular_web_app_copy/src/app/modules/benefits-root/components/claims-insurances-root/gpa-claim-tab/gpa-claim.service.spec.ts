import { TestBed } from '@angular/core/testing';

import { GpaClaimService } from './gpa-claim.service';

describe('GpaClaimService', () => {
  let service: GpaClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpaClaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
