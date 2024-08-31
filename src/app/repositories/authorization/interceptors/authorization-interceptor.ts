import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from '../../../core/authorization/services/auth.facade';

export const authorizationInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authFacade = inject(AuthFacade);
  const token = authFacade.getTokenFromLocalStorage();

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
