import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StationApi } from '../models/station-api.model';
import { NewStationDetails } from '../../../features/admin/features/stations/models/station.model';
import { NominatimAddressInfo } from '../models/nominatim-address-info';
import { map } from 'rxjs';

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
    return this.httpClient.post<{ id: number }>('station', station).pipe(map((response) => response.id));
  }

  public getCityName(lat: number, lng: number): Observable<NominatimAddressInfo> {
    const params = new URLSearchParams({
      format: 'json',
      lat: lat.toString(),
      lon: lng.toString(),
      addressdetails: '1',
    }).toString();

    return this.httpClient.get<NominatimAddressInfo>(`openstreetmap?${params}`);
  }
}
