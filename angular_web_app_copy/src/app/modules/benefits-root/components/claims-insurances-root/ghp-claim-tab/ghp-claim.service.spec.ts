import { TestBed } from '@angular/core/testing';

import { GhpClaimService } from './ghp-claim.service';

describe('GhpClaimService', () => {
  let service: GhpClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhpClaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
