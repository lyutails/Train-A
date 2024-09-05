import { Injectable } from '@angular/core';
import { HomeHttpService } from './home-http.service';
import { SearchApi } from '../../../features/home/models/search-form-api.model';
import { Observable } from 'rxjs';
import { JourneyList } from '../models/journey-list.model';
import { CurrentRouteWithRideId } from '../models/current-route.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly homeHttpService: HomeHttpService) {}

  public searchTickets(search: SearchApi): Observable<JourneyList> {
    return this.homeHttpService.searchTickets(search);
  }

  public getRoutesForPopUp(rideId: number): Observable<CurrentRouteWithRideId> {
    return this.homeHttpService.getRoutesForPopUp(rideId);
  }
}
