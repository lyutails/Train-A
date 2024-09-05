import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderParameters } from '../models/orders.model';
import { UsersOrders } from '../models/users-orders.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  public getActiveOrder(): Observable<OrderParameters[]> {
    return this.httpClient.get<OrderParameters[]>('order');
  }

  public deleteOrder(orderId: number) {
    return this.httpClient.delete(`order/${orderId}`);
  }

  public getUsersOrders(): Observable<UsersOrders[]> {
    return this.httpClient.get<UsersOrders[]>('users');
  }
}
