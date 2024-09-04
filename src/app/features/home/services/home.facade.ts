import { Injectable } from '@angular/core';
import { StationInfo } from '../../admin/features/stations/models/station-info';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StationsService } from '../../../repositories/stations/services/stations.service';
import { CitySearchApi } from '../../../repositories/stations/models/city-search-api';
import { SearchApi } from '../models/search-form-api.model';
import { JourneyList } from '../../../repositories/home/models/journey-list.model';
import { HomeService } from '../../../repositories/home/services/home.service';

@Injectable({
  providedIn: 'root',
})
export class HomeFacade {
  private initialStations: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public stations$: Observable<string[]> = this.initialStations.asObservable();

  private cities: BehaviorSubject<CitySearchApi[]> = new BehaviorSubject<CitySearchApi[]>([]);
  public cities$: Observable<CitySearchApi[]> = this.cities.asObservable();

  public routesDates: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);
  public routesDates$: Observable<Date[]> = this.routesDates.asObservable();

  constructor(
    private readonly stationsService: StationsService,
    private readonly homeService: HomeService,
  ) {}

  public get stations(): Observable<StationInfo[]> {
    return this.stationsService.getStations();
  }

  public getCity(value: string): Observable<CitySearchApi[]> {
    return this.stationsService.getCity(value).pipe(
      tap((newCities) => {
        const currentCities = this.cities.getValue();
        const updatedCities = [...currentCities, ...newCities];
        this.cities.next(updatedCities);
      }),
    );
  }

  public searchTickets(search: SearchApi): Observable<JourneyList> {
    return this.homeService.searchTickets(search).pipe(
      tap((data) => {
        this.processScheduleTimes(data);
      }),
    );
  }

  private processScheduleTimes(data: JourneyList): void {
    const times: Set<string> = new Set<string>();

    data.routes.forEach((route) => {
      const departureIndex = route.path.indexOf(data.from.stationId);

      route.schedule.forEach((sch) => {
        let relevantTime: Date | null = null;
        if (departureIndex === 0) {
          relevantTime = sch.segments.length > 0 ? new Date(sch.segments[0].time[0]) : null;
        } else {
          relevantTime =
            sch.segments.length > departureIndex ? new Date(sch.segments[departureIndex - 1].time[1]) : null;
        }

        if (relevantTime) {
          const dateString = relevantTime.toISOString().split('T')[0];
          times.add(dateString);
        }
      });
    });

    const sortedDates = Array.from(times)
      .map((dateStr) => new Date(dateStr))
      .sort((a, b) => a.getTime() - b.getTime());
    this.routesDates.next(sortedDates);
  }
}
