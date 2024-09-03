import { TestBed } from '@angular/core/testing';

import { RidesHttpService } from './rides-http.service';

describe('RidesHttpService', () => {
  let service: RidesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
