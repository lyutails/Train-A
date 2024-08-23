import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StationData } from '../models/station-data.model';
import { NewStationDetails } from '../../../features/admin/features/stations/models/station.model';

@Injectable({
  providedIn: 'root',
})
export class StationsHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public getStations(): Observable<StationData[]> {
    return this.httpClient.get<StationData[]>('station');
  }

  public deleteStation(id: number): Observable<void> {
    return this.httpClient.delete<void>(`station/${id}`);
  }

  public createStation(station: NewStationDetails): Observable<number> {
    return this.httpClient.post<number>('station', station);
  }
}
