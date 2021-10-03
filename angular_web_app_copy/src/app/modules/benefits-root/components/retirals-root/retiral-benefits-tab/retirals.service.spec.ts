import { TestBed } from '@angular/core/testing';

import { RetiralsService } from './retirals.service';

describe('RetiralsService', () => {
  let service: RetiralsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetiralsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
