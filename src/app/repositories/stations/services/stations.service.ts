import { Injectable } from '@angular/core';
import { StationsHttpService } from './stations-http.service';
import { NewStationDetails } from '../../../features/admin/features/stations/models/station.model';
import { Observable } from 'rxjs';
import { StationData } from '../models/station-data.model';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  constructor(private readonly stationHttpService: StationsHttpService) {}

  public getStations(): Observable<StationData[]> {
    return this.stationHttpService.getStations();
  }

  public deleteStation(id: number): Observable<void> {
    return this.stationHttpService.deleteStation(id);
  }

  public createStation(station: NewStationDetails): Observable<number> {
    return this.stationHttpService.createStation(station);
  }
}
