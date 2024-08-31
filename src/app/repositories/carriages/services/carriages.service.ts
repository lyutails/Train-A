import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carriage } from '../../../features/admin/features/carriages/models/carriage.model';
import { CarriagesHttpService } from './carriages-http.service';

@Injectable({
  providedIn: 'root',
})
export class CarriagesService {
  constructor(private carriagesHttpService: CarriagesHttpService) {}

  public getCarriages(): Observable<Carriage[]> {
    return this.carriagesHttpService.getCarriages();
  }

  public postCarriage(data: Carriage) {
    return this.carriagesHttpService.postCarriage(data);
  }

  public updateCarriage(code: string, body: Carriage) {
    return this.carriagesHttpService.updateCarriage(code, body);
  }
}
