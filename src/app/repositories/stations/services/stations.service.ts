import { Injectable } from '@angular/core';
import { StationsHttpService } from './stations-http.service';
import { NewStationDetails } from '../../../features/admin/features/stations/models/station.model';
import { map, Observable } from 'rxjs';
import { StationApi } from '../models/station-api.model';
import { StationInfo } from '../../../features/admin/features/stations/models/station-info';
import { transformStationApi } from '../helpers/transform-station-api';
import { NominatimAddressInfo } from '../models/nominatim-address-info';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  constructor(private readonly stationHttpService: StationsHttpService) {}

  public getStations(): Observable<StationInfo[]> {
    return this.stationHttpService.getStations().pipe(map((stations: StationApi[]) => transformStationApi(stations)));
  }

  public deleteStation(id: number): Observable<void> {
    return this.stationHttpService.deleteStation(id);
  }

  public createStation(station: NewStationDetails): Observable<StationInfo> {
    return this.stationHttpService.createStation(station).pipe(
      map((id: number) => ({
        ...station,
        id,
      })),
    );
  }

  public getCityName(lat: number, lng: number): Observable<NominatimAddressInfo> {
    return this.stationHttpService.getCityName(lat, lng);
  }
}
