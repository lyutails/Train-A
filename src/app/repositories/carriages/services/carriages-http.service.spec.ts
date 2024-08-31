import { TestBed } from '@angular/core/testing';

import { CarriagesHttpService } from './carriages-http.service';

describe('CarriagesHttpService', () => {
  let service: CarriagesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarriagesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
