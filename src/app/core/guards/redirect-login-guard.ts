import { inject } from '@angular/core';
import { AuthFacade } from '../authorization/services/auth.facade';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const redirectIfNotAuthroizedGurard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthFacade);

  if (authService.isAuthenticated) {
    const router = inject(Router);
    return router.createUrlTree(['/']);
  }

  return true;
};
