import { Injectable } from '@angular/core';
import { StationInfo } from '../../admin/features/stations/models/station-info';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { StationsService } from '../../../repositories/stations/services/stations.service';
import { CitySearchApi } from '../../../repositories/stations/models/city-search-api';
import { SearchApi } from '../models/search-form-api.model';
import { JourneyList } from '../../../repositories/home/models/journey-list.model';
import { HomeService } from '../../../repositories/home/services/home.service';
import { transformScheduleTime } from '../components/home/helpers/transform-schedule-time';
import { SearchRideResult } from '../models/search-ride-result';
import { CarouselService } from './carousel.service';
import { getTrainSchedules } from '../components/home/helpers/get-train-schedule';
import { filterResultsByDates } from '../components/home/helpers/filter-results-by-date';
import { getTrainRouteMap } from '../components/home/helpers/get-train-route-map';
import { TrainRouteMapResultCities } from '../components/home/helpers/train-route-results';

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

  public trainSearchResults: BehaviorSubject<SearchRideResult[]> = new BehaviorSubject<SearchRideResult[]>([]);
  public trainSearchResults$: Observable<SearchRideResult[]> = this.trainSearchResults.asObservable();

  public tripDetail$!: Observable<SearchRideResult[]>;

  constructor(
    private readonly stationsService: StationsService,
    private readonly homeService: HomeService,
    private readonly carouselService: CarouselService,
  ) {
    this.tripDetail$ = combineLatest([this.trainSearchResults$, this.carouselService.selectedDate$]).pipe(
      switchMap(([results, selectedDate]) => {
        const filteredResults = filterResultsByDates(results, selectedDate);
        return of(filteredResults);
      }),
    );
  }

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
    this.carouselService.selectedDate.next(null);
    return this.homeService.searchTickets(search).pipe(
      tap((data) => {
        this.processScheduleTimes(data);
        this.getTrainSchedule(data);
      }),
    );
  }

  private processScheduleTimes(data: JourneyList): void {
    const dates = transformScheduleTime(data);
    this.routesDates.next(dates);
  }

  private async getTrainSchedule(data: JourneyList): Promise<void> {
    try {
      const results = await getTrainSchedules(data);
      this.trainSearchResults.next(results);
    } catch (error) {
      console.error('Error fetching train schedules:', error);
      this.trainSearchResults.next([]);
    }
  }

  public getRoutesForPopUp(rideId: number, from: number, to: number): Observable<TrainRouteMapResultCities> {
    return this.homeService.getRoutesForPopUp(rideId).pipe(
      switchMap((data) => {
        const { currentPath, allTimes } = getTrainRouteMap(data, from, to);
        return this.stations.pipe(
          map((cities) => {
            const idToName = new Map(cities.map((city) => [city.id, city.city]));
            const cityNames = currentPath.map((id) => idToName.get(id) || 'Unknown City');
            return { cities: cityNames, allTimes };
          }),
        );
      }),
    );
  }
}
