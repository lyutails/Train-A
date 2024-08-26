import { TestBed } from '@angular/core/testing';

import { StationsHttpService } from './stations-http.service';

describe('StationsHttpService', () => {
  let service: StationsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
