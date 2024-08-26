import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StationsFacade } from '../../stations/station-store/services/stations.facade';
import { LatLng, marker, Marker, polyline } from 'leaflet';
import { defaultIcon } from '../constants/map-default-icon';
import { MapStateService } from './map-state.service';
import { StationInfo } from '../../stations/models/station-info';
import { findPolylineIndex } from '../helpers/find-polylines-index';
import { NewStationDetails } from '../../stations/models/station.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private relations = new BehaviorSubject<number[]>([]);
  public relations$: Observable<number[]> = this.relations.asObservable();

  constructor(
    private stationFacade: StationsFacade,
    private mapStateService: MapStateService,
  ) {}

  public getCityName(lat: number, lng: number): Observable<string> {
    return this.stationFacade
      .getCityName(lat, lng)
      .pipe(map((data) => data.address?.city || data.address?.town || data.address?.village || 'Undefined'));
  }

  public handleMapClick(): void {
    this.mapStateService.clearPolylines();

    const currentMarker = this.mapStateService.getCurrentMarker();
    if (currentMarker) {
      currentMarker.remove();
    }
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
    const mapMarker = marker([station.latitude, station.longitude], { icon: defaultIcon }).bindTooltip(station.city);
    mapMarker.on('click', () => this.handleLayerMarkerClick(mapMarker));
    return mapMarker;
  }

  public saveStation(station: NewStationDetails) {
    this.stationFacade.createStation(station);
  }
}
