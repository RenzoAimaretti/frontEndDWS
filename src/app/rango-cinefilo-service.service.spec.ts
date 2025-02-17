import { TestBed } from '@angular/core/testing';

import { RangoCinefiloService } from './services/rangoCinefilo.service';

describe('RangoCinefiloServiceService', () => {
  let service: RangoCinefiloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangoCinefiloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
