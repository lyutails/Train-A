import { Injectable } from '@angular/core';
import { NewStationDetails } from '../../models/station.model';
import { Store } from '@ngrx/store';
import { selectErrorMessage, selectIsLoading, selectIsUpdating, selectStations } from '../selectors/stations.selectors';
import { stationActions } from '../actions/station.actions';
import { stationsApiActions } from '../actions/stations-api-actions';
import { StationsService } from '../../../../../../repositories/stations/services/stations.service';
import { Observable } from 'rxjs';
import { NominatimAddressInfo } from '../../../../../../repositories/stations/models/nominatim-address-info';

@Injectable({
  providedIn: 'root',
})
export class StationsFacade {
  constructor(
    private readonly store: Store,
    private stationService: StationsService,
  ) {}

  public getStations(): void {
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

  public getCityName(lat: number, lng: number): Observable<NominatimAddressInfo> {
    return this.stationService.getCityName(lat, lng);
  }

  public get isUpdating() {
    return this.store.select(selectIsUpdating);
  }

  public get errorMessage() {
    return this.store.select(selectErrorMessage);
  }
}
