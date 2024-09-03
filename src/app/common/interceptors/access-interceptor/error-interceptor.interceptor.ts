import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthFacade } from '../../../core/authorization/services/auth.facade';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authFacade = inject(AuthFacade);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('here');
      if (error.status === 401) {
        console.log('Interceptor: Error caught', error);
        authFacade.changeStatusOnError();
      }
      return throwError(() => error);
    }),
  );
};
