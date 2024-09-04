import { TestBed } from '@angular/core/testing';

import { HomeHttpService } from './home-http.service';

describe('HomeHttpService', () => {
  let service: HomeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
