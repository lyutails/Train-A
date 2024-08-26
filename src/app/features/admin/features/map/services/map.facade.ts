import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { MapStateService } from './map-state.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LeafletMouseEvent, Map, marker, Marker } from 'leaflet';
import { StationInfo } from '../../stations/models/station-info';
import { defaultIcon } from '../constants/map-default-icon';
import { createStation } from '../helpers/create-new-station-model';

@Injectable({
  providedIn: 'root',
})
export class MapFacade {
  private locationOutOfReach = new Subject<void>();
  public locationOutOfReach$ = this.locationOutOfReach.asObservable();
  private mapSpinner = new BehaviorSubject<boolean>(false);
  mapSpinner$ = this.mapSpinner.asObservable();
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

  public getStreetName(lat: number, lng: number) {
    this.mapService.getCityName(lat, lng).subscribe({
      next: (response) => {
        if (response !== 'Undefined') {
          const map = this.mapStateService.getMap();
          const findIndex = this.stations.find((station) => station.city === response);
          if (findIndex) {
            this.locationOutOfReach.next();
          }
          if (map && !findIndex) {
            const newMarker = marker([lat, lng], { icon: defaultIcon }).bindTooltip(response).addTo(map);
            this.mapStateService.setCurrentMarker(newMarker);
            this.mapStateService.setLastMarkerAdded(newMarker);
          }
        } else {
          this.locationOutOfReach.next();
        }
      },
      error: () => {
        this.locationOutOfReach.next();
      },
      complete: () => {
        this.isProcessing = false;
        this.mapSpinner.next(false);
      },
    });
  }

  public saveStation() {
    const marker = this.mapStateService.getCurrentMarker();
    if (marker) {
      const newStation = createStation(marker, this.mapStateService.getPolylines(), this.stations);

      if (newStation) {
        this.mapService.saveStation(newStation);
        this.mapStateService.resetState();
      }
    }
  }

  public getStations(): Observable<StationInfo[]> {
    return this.mapService.getCurrentStations();
  }
}
