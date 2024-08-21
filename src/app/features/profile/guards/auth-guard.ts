import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthorizationService } from '../../../repositories/authorization/services/authorization.service';
import { inject } from '@angular/core';

export const redirectIfAuthorizedGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthorizationService);

  if (authService.isAuthenticated) {
    return true;
  }

  const router = inject(Router);
  return router.createUrlTree(['auth/signin']);
};
