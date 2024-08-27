import { provideEffects } from '@ngrx/effects';
import { Routes } from '@angular/router';
import { AdminPageComponent } from '../components/features/components/admin-page/admin-page.component';
import { provideState } from '@ngrx/store';
import { StationsEffects } from '../features/stations/station-store/effects/stations.effects';
import { stationReducer } from '../features/stations/station-store/reducers/stations-reducers';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'stations',
        loadComponent: () =>
          import('../features/stations/components/stations.component').then((m) => m.StationComponent),
        providers: [
          provideState({
            name: 'stations',
            reducer: stationReducer,
          }),
          provideEffects([StationsEffects]),
        ],
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
