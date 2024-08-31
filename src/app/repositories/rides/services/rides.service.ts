import { Injectable } from '@angular/core';
import { RidesHttpService } from './rides-http.service';
import { UpdateRideApi } from './models/update-route-api';
import { Observable } from 'rxjs';
import { RouteApi } from './models/route-api.model';
import { RouteSegments } from './models/route-section.model';

@Injectable({
  providedIn: 'root',
})
export class RidesService {
  constructor(private readonly ridesHttpService: RidesHttpService) {}

  public getRoute(id: string): Observable<RouteApi> {
    return this.ridesHttpService.getRoute(id);
  }

  public updateRide(request: UpdateRideApi): Observable<void> {
    return this.ridesHttpService.updateRide(request);
  }

  public addRideToRoute(id: number, segments: RouteSegments[]): Observable<number> {
    return this.ridesHttpService.addRideToRoute(id, segments);
  }
}
