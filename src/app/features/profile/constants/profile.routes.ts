import { Routes } from '@angular/router';
import { redirectIfAuthorizedGuard } from '../guards/auth-guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/components/user-profile/user-profile.component').then((m) => m.UserProfileComponent),
    canActivate: [redirectIfAuthorizedGuard],
  },
];
