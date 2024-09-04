import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'trip/:rideId',
    loadComponent: () =>
      import('../../trip-details/components/trip-details/trip-details.component').then((m) => m.TripDetailsComponent),
  },
];
