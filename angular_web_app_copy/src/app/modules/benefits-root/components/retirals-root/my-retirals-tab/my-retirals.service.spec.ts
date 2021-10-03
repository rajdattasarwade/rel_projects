import { TestBed } from '@angular/core/testing';

import { MyRetiralsService } from './my-retirals.service';

describe('MyRetiralsService', () => {
  let service: MyRetiralsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRetiralsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
