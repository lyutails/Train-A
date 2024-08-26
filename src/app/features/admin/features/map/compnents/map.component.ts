import { Component, Input, OnInit } from '@angular/core';
import { LeafletMouseEvent, marker, Marker, Map, Polyline, LatLng, polyline } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StationInfo } from '../../stations/models/station-info';
import { defaultIcon } from '../constants/map-default-icon';
import { mapDefaultoptions } from '../constants/map-default-options';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { findPolylineIndex } from '../helpers/find-polylines-index';
import { MapService } from '../services/map.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../../../common/pop-up-window/components/pop-up/pop-up.component';

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

  constructor(
    private readonly mapService: MapService,
    public dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.updateMarkers();
  }

  public onMapReady(map: Map): void {
    this.map = map;
  }

  private updateMarkers(): void {
    this.layers = this.stations.map((station) => this.createMarker(station));
  }

  public onMapClick(event: LeafletMouseEvent): void {
    const { latlng } = event;
    this.polylines.forEach((poly) => poly.remove());
    this.polylines = [];

    if (this.currentMarker) {
      this.currentMarker.remove();
    }

    this.mapService.getCityName(latlng.lat, latlng.lng).subscribe({
      next: (response) => {
        if (!response || response === 'Undefined') {
          this.openDialog();
          return;
        }
        if (this.map) {
          this.currentMarker = marker([latlng.lat, latlng.lng], { icon: defaultIcon })
            .bindPopup(response)
            .addTo(this.map);
          this.lastMarkerAdded = this.currentMarker;
        }
      },
      error: () => {
        this.openDialog();
      },
    });
  }

  private onLayerMarkerClick(clickedMarker: Marker): void {
    if (this.lastMarkerAdded && this.map) {
      const polylineIndex = findPolylineIndex(clickedMarker, this.polylines);

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

  private drawPolyline(startMarker: Marker, endMarker: Marker): void {
    if (this.map) {
      const latlngs: LatLng[] = [startMarker.getLatLng(), endMarker.getLatLng()];
      const newPolyline = polyline(latlngs, { color: 'blue' }).addTo(this.map);
      this.polylines.push(newPolyline);
    }
  }

  private createMarker(station: StationInfo): Marker {
    const mapMarker = marker([station.latitude, station.longitude], { icon: defaultIcon }).bindPopup(station.city);
    mapMarker.on('click', () => this.onLayerMarkerClick(mapMarker));
    return mapMarker;
  }

  private openDialog(): void {
    this.dialog.open(PopUpComponent, {
      width: '15rem',
      height: '10rem',
      data: { message: 'No train stations in the near area!' },
    });
  }
}
