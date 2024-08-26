import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { MapStateService } from './map-state.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { LeafletMouseEvent, Map, marker, Marker } from 'leaflet';
import { StationInfo } from '../../stations/models/station-info';
import { defaultIcon } from '../constants/map-default-icon';
import { findStationRelatiove } from '../helpers/find-station-relations';
import { NewStationDetails } from '../../stations/models/station.model';

@Injectable({
  providedIn: 'root',
})
export class MapFacade {
  private locationOutOfReach = new Subject<void>();
  public locationOutOfReach$ = this.locationOutOfReach.asObservable();
  private mapSpinner = new BehaviorSubject<boolean>(false);
  mapSpinner$ = this.mapSpinner.asObservable();
  private isProcessing = false;
  private relations: number[] = [];

  constructor(
    private readonly mapService: MapService,
    private readonly mapStateService: MapStateService,
  ) {}

  public onMapReady(map: Map): void {
    this.mapStateService.setMap(map);
  }

  public createMarker(station: StationInfo): Marker {
    return this.mapService.createMarker(station);
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
          if (map) {
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

  public saveStation(stations: StationInfo[]) {
    const marker = this.mapStateService.getCurrentMarker();
    if (marker) {
      const city = marker.getTooltip()?.getContent()?.toString();
      const latitude = marker.getLatLng().lat;
      const longitude = marker.getLatLng().lng;
      const polylines = this.mapStateService.getPolylines();
      const trainRelations = findStationRelatiove(polylines, stations);
      this.relations = Array.from(trainRelations);

      if (city) {
        const stationDetails: NewStationDetails = {
          city,
          latitude,
          longitude,
          relations: this.relations,
        };
        console.log(stationDetails);
        this.mapService.saveStation(stationDetails);
        this.mapStateService.resetState();
        this.relations = [];
      }
    }
  }
}
