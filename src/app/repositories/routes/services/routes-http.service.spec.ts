import { TestBed } from '@angular/core/testing';

import { RoutesHttpService } from './routes-http.service';

describe('RoutesHttpService', () => {
  let service: RoutesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
