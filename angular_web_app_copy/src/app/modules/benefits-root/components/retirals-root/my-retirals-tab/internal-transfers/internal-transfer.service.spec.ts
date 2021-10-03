import { TestBed } from '@angular/core/testing';

import { InternalTransferService } from './internal-transfer.service';

describe('InternalTransferService', () => {
  let service: InternalTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
