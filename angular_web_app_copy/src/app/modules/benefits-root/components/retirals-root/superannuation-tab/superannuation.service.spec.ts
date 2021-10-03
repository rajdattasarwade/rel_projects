import { TestBed } from '@angular/core/testing';

import { SuperannuationService } from './superannuation.service';

describe('SuperannuationService', () => {
  let service: SuperannuationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperannuationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
