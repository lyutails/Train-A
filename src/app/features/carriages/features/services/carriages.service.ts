import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carriage } from '../models/carriage.model';

@Injectable({
  providedIn: 'root',
})
export class CarriagesService {
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
