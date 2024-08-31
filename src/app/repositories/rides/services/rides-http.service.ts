import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RouteApi } from './models/route-api.model';
import { UpdateRideApi } from './models/update-route-api';
import { RouteSegments } from './models/route-section.model';

@Injectable({
  providedIn: 'root',
})
export class RidesHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRoute(id: string): Observable<RouteApi> {
    return this.httpClient.get<RouteApi>(`route/${id}`);
  }

  public addRideToRoute(id: number, segments: RouteSegments): Observable<number> {
    return this.httpClient.post<{ id: number }>(`route/${id}/ride`, segments).pipe(map((response) => response.id));
  }

  public updateRide(request: UpdateRideApi): Observable<void> {
    const { id, rideId, segments } = request;
    return this.httpClient.put<void>(`route/${id}/ride/${rideId}`, { segments: segments });
  }
}
