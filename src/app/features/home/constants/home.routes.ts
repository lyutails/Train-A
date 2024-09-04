import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'trip/:rideId',
    loadComponent: () => import('../../../test/test.component').then((m) => m.TestComponent),
  },
];
