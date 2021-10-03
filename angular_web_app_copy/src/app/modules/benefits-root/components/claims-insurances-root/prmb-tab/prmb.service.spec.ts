import { TestBed } from '@angular/core/testing';

import { PrmbService } from './prmb.service';

describe('PrmbService', () => {
  let service: PrmbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrmbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
