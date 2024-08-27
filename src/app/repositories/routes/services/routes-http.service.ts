import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteAPI } from '../../../features/admin/components/routes/features/components/routes/routes.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  getRoutes(): Observable<RouteAPI[]> {
    return this.httpClient.get<RouteAPI[]>('route');
  }
}
