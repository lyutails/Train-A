import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { stationsApiActions } from '../actions/stations-api-actions';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { catchError, map, of } from 'rxjs';
import { stationActions } from '../actions/station.actions';
import { StationsService } from '../../../../../../repositories/stations/services/stations.service';
import { StationInfo } from '../../models/station-info';

@Injectable()
export class StationsEffects {
  private actions$ = inject(Actions);
  constructor(private stationService: StationsService) {}

  public loadStations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stationsApiActions.loadStations),
      mergeMap(() =>
        this.stationService.getStations().pipe(
          map((stations: StationInfo[]) => stationsApiActions.loadStationsSuccess({ stations })),
          catchError((error) => of(stationsApiActions.loadStationsFailure({ errorMessage: error.message }))),
        ),
      ),
    ),
  );

  public createStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stationActions.createStation),
      mergeMap(({ newStation }) =>
        this.stationService.createStation(newStation).pipe(
          map((station: StationInfo) => stationActions.createStationSuccess({ station })),
          catchError((error) => of(stationActions.createStationFailure({ errorMessage: error.message }))),
        ),
      ),
    ),
  );

  public deleteStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stationActions.deleteStation),
      mergeMap(({ id }) =>
        this.stationService.deleteStation(id).pipe(
          map(() => stationActions.deleteStationSuccess({ id })),
          catchError((error) => of(stationActions.deleteStationFailure({ errorMessage: error.message }))),
        ),
      ),
    ),
  );
}
