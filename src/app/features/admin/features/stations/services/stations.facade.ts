import { Injectable } from '@angular/core';
import { StationData } from '../../../../../repositories/stations/models/station-data.model';
import { Observable } from 'rxjs';
import { StationsService } from '../../../../../repositories/stations/services/stations.service';
import { NewStationDetails } from '../models/station.model';

@Injectable({
  providedIn: 'root',
})
export class StationsFacade {
  constructor(private readonly stationsService: StationsService) {}

  public getStations(): Observable<StationData[]> {
    return this.stationsService.getStations();
  }

  public deleteStation(id: number): Observable<void> {
    return this.stationsService.deleteStation(id);
  }

  public createStation(station: NewStationDetails): Observable<number> {
    return this.stationsService.createStation(station);
  }
}
