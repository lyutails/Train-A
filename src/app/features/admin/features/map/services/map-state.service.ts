import { Injectable } from '@angular/core';
import { Marker, Polyline, Map } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
  private map?: Map;
  private currentMarker?: Marker;
  private lastMarkerAdded?: Marker;
  private polylines: Polyline[] = [];

  setMap(map: Map): void {
    this.map = map;
  }

  getMap(): Map | undefined {
    return this.map;
  }

  setCurrentMarker(marker: Marker): void {
    this.currentMarker = marker;
  }

  getCurrentMarker(): Marker | undefined {
    return this.currentMarker;
  }

  setLastMarkerAdded(marker: Marker): void {
    this.lastMarkerAdded = marker;
  }

  getLastMarkerAdded(): Marker | undefined {
    return this.lastMarkerAdded;
  }

  addPolyline(polyline: Polyline): void {
    this.polylines.push(polyline);
  }

  removePolyline(index: number): void {
    this.polylines[index].remove();
    this.polylines.splice(index, 1);
  }

  getPolylines(): Polyline[] {
    return this.polylines;
  }

  clearPolylines(): void {
    this.polylines.forEach((poly) => poly.remove());
    this.polylines = [];
  }

  resetState(): void {
    this.map = undefined;
    this.currentMarker = undefined;
    this.lastMarkerAdded = undefined;
    this.clearPolylines();
  }
}
