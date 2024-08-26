import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StationsFacade } from '../../stations/station-store/services/stations.facade';
import { LatLng, LeafletMouseEvent, marker, Marker, polyline } from 'leaflet';
import { defaultIcon } from '../constants/map-default-icon';
import { MapStateService } from './map-state.service';
import { StationInfo } from '../../stations/models/station-info';
import { findPolylineIndex } from '../helpers/find-polylines-index';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private locationOutOfReach = new Subject<void>();
  public locationOutOfReach$ = this.locationOutOfReach.asObservable();
  constructor(
    private stationFacade: StationsFacade,
    private mapStateService: MapStateService,
  ) {}

  public getCityName(lat: number, lng: number): Observable<string> {
    return this.stationFacade
      .getCityName(lat, lng)
      .pipe(map((data) => data.address?.city || data.address?.town || data.address?.village || 'Undefined'));
  }

  public handleMapClick(event: LeafletMouseEvent): void {
    const { latlng } = event;
    this.mapStateService.clearPolylines();

    const currentMarker = this.mapStateService.getCurrentMarker();
    if (currentMarker) {
      currentMarker.remove();
    }

    this.getCityName(latlng.lat, latlng.lng).subscribe({
      next: (response) => {
        if (response !== 'Undefined') {
          const map = this.mapStateService.getMap();
          if (map) {
            const newMarker = marker([latlng.lat, latlng.lng], { icon: defaultIcon }).bindPopup(response).addTo(map);
            this.mapStateService.setCurrentMarker(newMarker);
            this.mapStateService.setLastMarkerAdded(newMarker);
          }
        } else {
          this.locationOutOfReach.next();
        }
      },
    });
  }

  public handleLayerMarkerClick(clickedMarker: Marker): void {
    const lastMarkerAdded = this.mapStateService.getLastMarkerAdded();
    const map = this.mapStateService.getMap();
    if (lastMarkerAdded && map) {
      const polylines = this.mapStateService.getPolylines();
      const polylineIndex = findPolylineIndex(clickedMarker, polylines);

      if (polylineIndex !== -1) {
        for (let i = polylines.length - 1; i >= polylineIndex; i--) {
          this.mapStateService.removePolyline(i);
        }
      } else {
        this.drawPolyline(lastMarkerAdded, clickedMarker);
      }

      this.mapStateService.setLastMarkerAdded(clickedMarker);
    }
  }

  private drawPolyline(startMarker: Marker, endMarker: Marker): void {
    const map = this.mapStateService.getMap();
    if (map) {
      const latlngs: LatLng[] = [startMarker.getLatLng(), endMarker.getLatLng()];
      const newPolyline = polyline(latlngs, { color: 'blue' }).addTo(map);
      this.mapStateService.addPolyline(newPolyline);
    }
  }

  public createMarker(station: StationInfo): Marker {
    const mapMarker = marker([station.latitude, station.longitude], { icon: defaultIcon }).bindPopup(station.city);
    mapMarker.on('click', () => this.handleLayerMarkerClick(mapMarker));
    return mapMarker;
  }
}
