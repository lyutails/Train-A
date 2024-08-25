import { Component, Input, OnInit } from '@angular/core';
import { LeafletMouseEvent, marker, Marker, Map, Polyline, LatLng, polyline } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StationInfo } from '../../stations/models/station-info';
import { defaultIcon } from '../constants/map-default-icon';
import { mapDefaultoptions } from '../constants/map-default-options';
import { ButtonComponent } from '../../../../../common/button/button.component';

@Component({
  selector: 'TTP-map',
  standalone: true,
  imports: [LeafletModule, ButtonComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  @Input() stations: StationInfo[] = [];
  public layers: Marker[] = [];
  public options = mapDefaultoptions;
  private currentMarker?: Marker;
  private lastMarkerAdded?: Marker;
  private polylines: Polyline[] = [];
  private map?: Map;

  public ngOnInit(): void {
    this.updateMarkers();
  }

  private updateMarkers(): void {
    this.layers = this.stations.map((station) => {
      const m = marker([station.latitude, station.longitude], { icon: defaultIcon })
        .bindPopup(station.city)
        .on('click', () => this.onLayerMarkerClick(m));
      return m;
    });
  }

  public onMapClick(event: LeafletMouseEvent): void {
    const { latlng } = event;

    if (this.map) {
      this.polylines.forEach((poly) => poly.remove());
      this.polylines = [];

      if (this.currentMarker) {
        this.currentMarker.remove();
      }

      this.currentMarker = marker([latlng.lat, latlng.lng], { icon: defaultIcon }).addTo(this.map);

      this.lastMarkerAdded = this.currentMarker;
    }
  }

  private onLayerMarkerClick(clickedMarker: Marker): void {
    if (this.lastMarkerAdded && this.map) {
      const polylineIndex = this.findPolylineIndex(clickedMarker);

      if (polylineIndex !== -1) {
        for (let i = this.polylines.length - 1; i >= polylineIndex; i--) {
          this.polylines[i].remove();
          this.polylines.pop();
        }
      } else {
        this.drawPolyline(this.lastMarkerAdded, clickedMarker);
      }
      this.lastMarkerAdded = clickedMarker;
    }
  }

  private findPolylineIndex(marker: Marker): number {
    const clickedLatLng = marker.getLatLng();

    for (let i = 0; i < this.polylines.length; i++) {
      const polylineLatLngs = this.polylines[i].getLatLngs() as LatLng[];
      if (polylineLatLngs.some((latLng) => latLng.equals(clickedLatLng))) {
        return i + 1;
      }
    }

    return -1;
  }

  private drawPolyline(startMarker: Marker, endMarker: Marker): void {
    if (this.map) {
      const latlngs: LatLng[] = [startMarker.getLatLng(), endMarker.getLatLng()];
      const newPolyline = polyline(latlngs, { color: 'blue' }).addTo(this.map);
      this.polylines.push(newPolyline);
    }
  }

  public onMapReady(map: Map): void {
    this.map = map;
  }
}
