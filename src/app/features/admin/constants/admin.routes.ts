import { Routes } from '@angular/router';
import { AdminPageComponent } from '../components/features/components/admin-page/admin-page.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'stations',
        loadComponent: () =>
          import('../features/stations/components/stations.component').then((m) => m.StationComponent),
      },
      {
        path: 'carriages',
        loadComponent: () =>
          import('../features/carriages/components/carriages/carriages.component').then((m) => m.CarriagesComponent),
      },
      {
        path: 'routes',
        loadComponent: () =>
          import('../components/routes/features/components/routes/routes.component').then((m) => m.RoutesComponent),
      },
      {
        path: '',
        redirectTo: 'stations',
        pathMatch: 'full',
      },
    ],
  },
];
