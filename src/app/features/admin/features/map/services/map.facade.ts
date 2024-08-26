import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { MapStateService } from './map-state.service';
import { Observable } from 'rxjs';
import { LeafletMouseEvent, Map, Marker } from 'leaflet';
import { StationInfo } from '../../stations/models/station-info';

@Injectable({
  providedIn: 'root',
})
export class MapFacade {
  public locationOutOfReach$: Observable<void>;

  constructor(
    private readonly mapService: MapService,
    private readonly mapStateService: MapStateService,
  ) {
    this.locationOutOfReach$ = this.mapService.locationOutOfReach$;
  }

  public onMapReady(map: Map): void {
    this.mapStateService.setMap(map);
  }

  public createMarker(station: StationInfo): Marker {
    return this.mapService.createMarker(station);
  }

  public handleMapClick(event: LeafletMouseEvent): void {
    this.mapService.handleMapClick(event);
  }
}
