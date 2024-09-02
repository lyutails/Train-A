import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteAPI } from '../../../features/admin/components/routes/features/models/routes.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRoutes(): Observable<RouteAPI[]> {
    return this.httpClient.get<RouteAPI[]>('route');
  }

  public postRoute(data: RouteAPI): Observable<RouteAPI> {
    return this.httpClient.post<RouteAPI>('route', data);
  }

  public updateRoute(id: number, body: RouteAPI) {
    return this.httpClient.put<RouteAPI>(`route/${id}`, body);
  }

  public deleteRoute(id: number): Observable<void> {
    return this.httpClient.delete<void>(`route/${id}`);
  }
}
