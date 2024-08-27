import { Injectable } from '@angular/core';
import { Carriage } from '../../../features/admin/features/carriages/models/carriage.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarriagesHttpService {
  constructor(private httpClient: HttpClient) {}

  public getCarriages(): Observable<Carriage[]> {
    return this.httpClient.get<Carriage[]>('carriage');
  }

  public postCarriage(data: Carriage) {
    return this.httpClient.post<Carriage>('carriage', data);
  }

  public updateCarriage(code: string, body: Carriage) {
    return this.httpClient.put<Carriage>(`carriage/${code}`, body);
  }
}
