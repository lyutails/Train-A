import { Routes } from '@angular/router';
import { redirectIfAdminRoleGuard } from './core/guards/role-guard';
import { redirectIfNotAuthroizedGurard } from './core/guards/redirect-login-guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/constants/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authorization/constants/authorization.routes').then((m) => m.AUTHORIZATION_ROUTES),
    canActivate: [redirectIfNotAuthroizedGurard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/constants/admin.routes').then((m) => m.ADMIN_ROUTES),
    canActivate: [redirectIfAdminRoleGuard],
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/constants/orders.routes').then((m) => m.ORDERS_ROUTES),
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/constants/profile.routes').then((m) => m.PROFILE_ROUTES),
  },
  {
    path: 'trip',
    loadChildren: () =>
      import('./features/trip-details/constants/trip-details.routes').then((m) => m.TRIP_DETAILS_ROUTES),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./core/not-found/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
