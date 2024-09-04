import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthFacade } from '../../../core/authorization/services/auth.facade';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authFacade = inject(AuthFacade);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authFacade.changeStatusOnError();
      }
      return throwError(() => error);
    }),
  );
};
