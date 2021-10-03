import { TestBed } from '@angular/core/testing';

import { PmeService } from './pme.service';

describe('PmeService', () => {
  let service: PmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
