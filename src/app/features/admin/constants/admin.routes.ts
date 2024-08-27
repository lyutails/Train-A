import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { StationsEffects } from '../features/stations/station-store/effects/stations.effects';
import { stationReducer } from '../features/stations/station-store/reducers/stations-reducers';
import { routeResolver } from '../features/rides/resolvers/route.resolver';

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
  {
    path: 'routes/:id',
    loadComponent: () => import('../features/rides/components/rides.component').then((m) => m.RidesComponent),
    resolve: { route: routeResolver },
    providers: [
      provideState({
        name: 'stations',
        reducer: stationReducer,
      }),
      provideEffects([StationsEffects]),
    ],
  },
];
