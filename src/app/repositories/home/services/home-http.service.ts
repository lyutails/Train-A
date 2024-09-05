import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchApi } from '../../../features/home/models/search-form-api.model';
import { JourneyList } from '../models/journey-list.model';
import { Observable } from 'rxjs';
import { CurrentRouteWithRideId } from '../models/current-route.model';

@Injectable({
  providedIn: 'root',
})
export class HomeHttpService {
  constructor(private httpClient: HttpClient) {}

  public searchTickets(search: SearchApi): Observable<JourneyList> {
    let params = new HttpParams()
      .set('fromLatitude', search.fromLatitude.toString())
      .set('fromLongitude', search.fromLongitude.toString())
      .set('toLatitude', search.toLatitude.toString())
      .set('toLongitude', search.toLongitude.toString());

    if (search.time !== undefined) {
      params = params.set('time', search.time.toString());
    }
    return this.httpClient.get<JourneyList>('search', { params });
  }

  public getRoutesForPopUp(rideId: number): Observable<CurrentRouteWithRideId> {
    return this.httpClient.get<CurrentRouteWithRideId>(`search/${rideId}`);
  }
}
