import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { MapStateService } from './map-state.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LeafletMouseEvent, Map, marker, Marker } from 'leaflet';
import { StationInfo } from '../../stations/models/station-info';
import { defaultIcon } from '../constants/map-default-icon';
import { createStation } from '../helpers/create-new-station-model';
import { LOCATION_ERROR_MESSAGES } from '../models/location-error-message';

@Injectable({
  providedIn: 'root',
})
export class MapFacade {
  private popuUpErrors = new Subject<string>();
  public popuUpErrors$ = this.popuUpErrors.asObservable();
  private mapSpinner = new BehaviorSubject<boolean>(false);
  public mapSpinner$ = this.mapSpinner.asObservable();
  private isProcessing = false;
  public stations: StationInfo[] = [];

  constructor(
    private readonly mapService: MapService,
    private readonly mapStateService: MapStateService,
  ) {}

  public onMapReady(map: Map): void {
    this.mapStateService.setMap(map);
    this.getCurrentStations();
  }

  public createMarker(station: StationInfo): Marker {
    return this.mapService.createMarker(station);
  }

  public getCurrentStations(): void {
    this.mapService.getCurrentStations().subscribe((stations) => {
      this.stations = stations;
    });
  }

  public handleMapClick(event: LeafletMouseEvent): void {
    if (this.isProcessing) return;

    this.isProcessing = true;
    const { latlng } = event;
    this.mapSpinner.next(true);
    this.mapService.handleMapClick();
    this.getStreetName(latlng.lat, latlng.lng);
  }

  public getStreetName(lat: number, lng: number): void {
    this.mapService.getCityName(lat, lng).subscribe({
      next: (response) => {
        if (response !== 'Undefined') {
          this.handleCityNameResponse(response, lat, lng);
        } else {
          this.handleLocationErrors(LOCATION_ERROR_MESSAGES.OUT_OF_REACH);
        }
      },
      error: () => this.handleLocationErrors(LOCATION_ERROR_MESSAGES.NOT_FOUND),
      complete: () => {
        this.isProcessing = false;
        this.mapSpinner.next(false);
      },
    });
  }

  public saveStation() {
    const marker = this.mapStateService.getCurrentMarker();
    if (!marker) {
      this.handleLocationErrors(LOCATION_ERROR_MESSAGES.NO_STATION_SELECTED);
      return;
    }

    const newStation = createStation(marker, this.mapStateService.getPolylines(), this.stations);
    if (!newStation || newStation.relations.length === 0) {
      this.handleLocationErrors(LOCATION_ERROR_MESSAGES.NO_CONNECTIONS_FOUND);
      return;
    }

    this.mapService.saveStation(newStation);
    this.mapStateService.resetState();
  }

  public getStations(): Observable<StationInfo[]> {
    return this.mapService.getCurrentStations();
  }

  private handleCityNameResponse(cityName: string, lat: number, lng: number): void {
    if (this.doesCityExist(cityName)) {
      this.handleLocationErrors(LOCATION_ERROR_MESSAGES.ALREADY_EXISTS);
    } else {
      this.addMarkerToMap(cityName, lat, lng);
    }
  }

  private doesCityExist(cityName: string): boolean {
    return !!this.stations.find((station) => station.city === cityName);
  }

  private addMarkerToMap(cityName: string, lat: number, lng: number): void {
    const map = this.mapStateService.getMap();
    if (map) {
      const newMarker = marker([lat, lng], { icon: defaultIcon }).bindTooltip(cityName).addTo(map);
      this.mapStateService.setCurrentMarker(newMarker);
      this.mapStateService.setLastMarkerAdded(newMarker);
    }
  }

  private handleLocationErrors(message: string): void {
    this.popuUpErrors.next(message);
  }
}
