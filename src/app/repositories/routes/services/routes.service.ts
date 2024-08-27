import { Injectable } from '@angular/core';
import { RoutesHttpService } from './routes-http.service';
import { Observable } from 'rxjs';
import { RouteAPI } from '../../../features/admin/components/routes/features/models/routes.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor(private readonly routeHttpService: RoutesHttpService) {}

  public getRoutes(): Observable<RouteAPI[]> {
    return this.routeHttpService.getRoutes();
  }

  public postRoute(data: RouteAPI): Observable<RouteAPI[]> {
    return this.routeHttpService.postRoute(data);
  }

  public updateRoute(id: number, body: RouteAPI) {
    return this.routeHttpService.updateRoute(id, body);
  }

  public deleteRoute(id: number): Observable<void> {
    return this.routeHttpService.deleteRoute(id);
  }
}
