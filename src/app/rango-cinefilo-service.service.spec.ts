import { TestBed } from '@angular/core/testing';

import { RangoCinefiloServiceService } from './services/rango-cinefilo-service.service';

describe('RangoCinefiloServiceService', () => {
  let service: RangoCinefiloServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangoCinefiloServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
