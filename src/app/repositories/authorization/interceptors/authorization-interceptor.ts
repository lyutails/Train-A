import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

export const authorizationInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authorizationService = inject(AuthorizationService);
  const token = authorizationService.getTokenFromLocalStorage();

  const url = `/api/${request.url}`;
  const authRequest = request.clone({
    url: url,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    }),
  });
  return next(authRequest);
};
