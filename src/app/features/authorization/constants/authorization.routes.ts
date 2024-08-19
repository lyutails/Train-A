import { Routes } from '@angular/router';

export const AUTHORIZATION_ROUTES: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('../features/sign-up/components/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent,
      ),
  },
];
