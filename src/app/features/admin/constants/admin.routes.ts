import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'stations',
    loadComponent: () => import('../features/stations/components/stations.component').then((m) => m.StationComponent),
  },
];
