import { TestBed } from '@angular/core/testing';

import { VpfService } from './vpf.service';

describe('VpfService', () => {
  let service: VpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
