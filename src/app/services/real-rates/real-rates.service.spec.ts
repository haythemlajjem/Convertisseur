import { TestBed } from '@angular/core/testing';

import { RealRatesService } from './real-rates.service';

describe('RealRatesService', () => {
  let service: RealRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
