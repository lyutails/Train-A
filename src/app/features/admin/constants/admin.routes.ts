import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { StationsEffects } from '../features/stations/station-store/effects/stations.effects';
import { stationReducer } from '../features/stations/station-store/reducers/stations-reducers';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'stations',
    loadComponent: () => import('../features/stations/components/stations.component').then((m) => m.StationComponent),
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
];
