import { TestBed } from '@angular/core/testing';

import { GratuityService } from './gratuity.service';

describe('GratuityService', () => {
  let service: GratuityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GratuityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
