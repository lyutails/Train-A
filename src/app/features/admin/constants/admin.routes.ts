import { provideEffects } from '@ngrx/effects';
import { Routes } from '@angular/router';
import { AdminPageComponent } from '../components/features/components/admin-page/admin-page.component';
import { provideState } from '@ngrx/store';
import { StationsEffects } from '../features/stations/station-store/effects/stations.effects';
import { stationReducer } from '../features/stations/station-store/reducers/stations-reducers';
import { routeResolver } from '../features/rides/resolvers/route.resolver';
import { RoutesComponent } from '../components/routes/features/components/routes/routes.component';
import { RidesComponent } from '../features/rides/components/rides.component';
import { NewRideComponent } from '../features/rides/components/new-ride/new-ride.component';

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
        children: [
          {
            path: '',
            component: RoutesComponent,
          },
          {
            path: ':id',
            component: RidesComponent,
            resolve: { route: routeResolver },
            providers: [
              provideState({
                name: 'stations',
                reducer: stationReducer,
              }),
              provideEffects([StationsEffects]),
            ],
          },
          {
            path: ':id/new-ride',
            component: NewRideComponent,
          },
        ],
      },
      {
        path: '',
        redirectTo: 'stations',
        pathMatch: 'full',
      },
    ],
  },
];
