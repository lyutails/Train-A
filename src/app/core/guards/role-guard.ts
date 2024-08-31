import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { RoleService } from '../roles/role.service';

export const redirectIfAdminRoleGuard: CanActivateFn = (): boolean | UrlTree => {
  return inject(RoleService).isAdminRole || inject(Router).createUrlTree(['/not-found']);
};
