import { Routes } from '@angular/router';

export const AUTHORIZATION_ROUTES: Routes = [
  {
    path: 'signin',
    loadComponent: () =>
      import('../features/sign-in/components/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
  },
];
