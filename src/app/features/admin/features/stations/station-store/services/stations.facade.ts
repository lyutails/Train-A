import { Injectable } from '@angular/core';
import { NewStationDetails } from '../../models/station.model';
import { Store } from '@ngrx/store';
import { selectIsLoading, selectStations } from '../selectors/stations.selectors';
import { stationActions } from '../actions/station.actions';
import { stationsApiActions } from '../actions/stations-api-actions';

@Injectable({
  providedIn: 'root',
})
export class StationsFacade {
  constructor(private readonly store: Store) {}

  public getStations(): void {
    console.log('Dispatching loadStations action from component');
    return this.store.dispatch(stationsApiActions.loadStations());
  }

  public deleteStation(id: number): void {
    return this.store.dispatch(stationActions.deleteStation({ id }));
  }

  public createStation(newStation: NewStationDetails): void {
    return this.store.dispatch(stationActions.createStation({ newStation }));
  }

  public get isLoading() {
    return this.store.select(selectIsLoading);
  }

  public get stations() {
    return this.store.select(selectStations);
  }
}
