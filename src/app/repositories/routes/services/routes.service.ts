import { Injectable } from '@angular/core';
import { RoutesHttpService } from './routes-http.service';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor(private readonly routeHttpService: RoutesHttpService) {}
}
