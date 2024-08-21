import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/constants/home.routes').then(
        (m) => m.HOME_ROUTES,
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authorization/constants/authorization.routes').then(
        (m) => m.AUTHORIZATION_ROUTES,
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/constants/orders.routes').then(
        (m) => m.ORDERS_ROUTES,
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/constants/profile.routes').then(
        (m) => m.PROFILE_ROUTES,
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./core/not-found/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
  { path: '**', redirectTo: 'not-found' },
];
