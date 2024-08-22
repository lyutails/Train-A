import { TestBed } from '@angular/core/testing';

import { AuthorizationHttpService } from './authorization-http.service';

describe('AuthorizationHttpService', () => {
  let service: AuthorizationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
