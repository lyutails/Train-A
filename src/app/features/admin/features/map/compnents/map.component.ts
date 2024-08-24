import { Component, Input, OnInit } from '@angular/core';
import { LeafletMouseEvent, marker, Marker } from 'leaflet';
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

  public ngOnInit(): void {
    this.updateMarkers();
  }

  private updateMarkers(): void {
    this.layers = this.stations.map((station) => {
      return marker([station.latitude, station.longitude], { icon: defaultIcon }).bindPopup(station.city);
    });
  }

  public onMapClick(event: LeafletMouseEvent): void {
    const { latlng } = event;

    if (this.currentMarker) {
      this.currentMarker.remove();
    }

    this.currentMarker = marker([latlng.lat, latlng.lng], { icon: defaultIcon }).addTo(event.target);
  }
}
