import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StationApi } from '../models/station-api.model';
import { NewStationDetails } from '../../../features/admin/features/stations/models/station.model';

@Injectable({
  providedIn: 'root',
})
export class StationsHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public getStations(): Observable<StationApi[]> {
    return this.httpClient.get<StationApi[]>('station');
  }

  public deleteStation(id: number): Observable<void> {
    return this.httpClient.delete<void>(`station/${id}`);
  }

  public createStation(station: NewStationDetails): Observable<number> {
    return this.httpClient.post<number>('station', station);
  }
}
