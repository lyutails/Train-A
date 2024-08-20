import { Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/auth.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent,
      ),
    canActivate: [AuthGuard],
  },
];
