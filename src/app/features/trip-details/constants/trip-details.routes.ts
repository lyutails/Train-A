import { Routes } from '@angular/router';
// import { redirectIfAuthorizedGuard } from '../../../core/guards/auth-guard';

export const TRIP_DETAILS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/trip-details/trip-details.component').then((m) => m.TripDetailsComponent),
    /* canActivate: [redirectIfAuthorizedGuard], */
  },
];
