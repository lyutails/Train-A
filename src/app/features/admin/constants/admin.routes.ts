import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'stations',
    loadComponent: () => import('../components/stations/station/station.component').then((m) => m.StationComponent),
  },
];
