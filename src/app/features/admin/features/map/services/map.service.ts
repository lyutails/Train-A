import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StationsFacade } from '../../stations/station-store/services/stations.facade';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private stationFacade: StationsFacade) {}

  public getCityName(lat: number, lng: number): Observable<string> {
    return this.stationFacade
      .getCityName(lat, lng)
      .pipe(map((data) => data.address?.city || data.address?.town || data.address?.village || 'Undefined'));
  }
}
