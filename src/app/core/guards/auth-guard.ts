import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from '../authorization/services/auth.facade';

export const redirectIfAuthorizedGuard: CanActivateFn = (): boolean | UrlTree => {
  return inject(AuthFacade).isAuthenticated || inject(Router).createUrlTree(['auth/signin']);
};
