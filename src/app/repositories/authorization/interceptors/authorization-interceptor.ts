import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const url = `/api/${request.url}`;
  const authRequest = request.clone({
    url: url,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  });

  return next(authRequest);
};
