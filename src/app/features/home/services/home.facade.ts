import { Injectable } from '@angular/core';
import { StationInfo } from '../../admin/features/stations/models/station-info';
import { BehaviorSubject, Observable } from 'rxjs';
import { StationsService } from '../../../repositories/stations/services/stations.service';

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {
  private initialStationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public stations$: Observable<string[]> = this.initialStationsSubject.asObservable();

  constructor(private readonly stationsService: StationsService) {}

  public get stations(): Observable<StationInfo[]> {
    return this.stationsService.getStations();
  }
}
