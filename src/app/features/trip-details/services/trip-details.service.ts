import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carriage } from '../../admin/features/carriages/models/carriage.model';
import { Observable } from 'rxjs';
import { TripDetailsResponse } from '../models/trip-details-response.model';

@Injectable({
  providedIn: 'root',
})
export class TripDetailsService {
  constructor(private httpClient: HttpClient) {}

  public getCarriages(): Observable<Carriage[]> {
    return this.httpClient.get<Carriage[]>('carriage');
  }

  public getRideDetails(rideId: string): Observable<TripDetailsResponse> {
    return this.httpClient.get<TripDetailsResponse>(`search/${rideId}`);
  }

  public buyTicket(rideId: string, seat: string, stationStart: string, stationEnd: string) {
    return this.httpClient.post('order', {
      rideId,
      seat,
      stationStart,
      stationEnd,
    });
  }

  public getActiveOrder() {
    return this.httpClient.get('order');
  }

  public deleteOrder(orderId: number) {
    return this.httpClient.delete(`order/${orderId}`);
  }
}
