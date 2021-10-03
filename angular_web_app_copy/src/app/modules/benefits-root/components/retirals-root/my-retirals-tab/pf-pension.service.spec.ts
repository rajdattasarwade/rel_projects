import { TestBed } from '@angular/core/testing';

import { PfPensionService } from './pf-pension.service';

describe('PfPensionService', () => {
  let service: PfPensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfPensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
