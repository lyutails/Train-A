import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent,
      ),
  },
];
