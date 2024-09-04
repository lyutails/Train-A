import { Injectable } from '@angular/core';
import { StationInfo } from '../../admin/features/stations/models/station-info';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StationsService } from '../../../repositories/stations/services/stations.service';
import { CitySearchApi } from '../../../repositories/stations/models/city-search-api';

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {
  private initialStations: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public stations$: Observable<string[]> = this.initialStations.asObservable();

  private cities: BehaviorSubject<CitySearchApi[]> = new BehaviorSubject<CitySearchApi[]>([]);
  public cities$: Observable<CitySearchApi[]> = this.cities.asObservable();

  constructor(private readonly stationsService: StationsService) {}

  public get stations(): Observable<StationInfo[]> {
    return this.stationsService.getStations();
  }

  public getCity(value: string): Observable<CitySearchApi[]> {
    return this.stationsService.getCity(value).pipe(tap((cities) => this.cities.next(cities)));
  }
}
