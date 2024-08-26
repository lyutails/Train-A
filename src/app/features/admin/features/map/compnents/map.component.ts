import { Component, Input, OnInit } from '@angular/core';
import { LeafletMouseEvent, Marker, Map } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StationInfo } from '../../stations/models/station-info';
import { mapDefaultoptions } from '../constants/map-default-options';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../../../common/pop-up-window/components/pop-up/pop-up.component';
import { MapFacade } from '../services/map.facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'TTP-map',
  standalone: true,
  imports: [LeafletModule, ButtonComponent, MatProgressSpinnerModule, NgIf, AsyncPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  @Input() stations: StationInfo[] = [];
  public layers: Marker[] = [];
  public options = mapDefaultoptions;

  constructor(
    public readonly mapFacade: MapFacade,
    public dialog: MatDialog,
  ) {
    this.mapFacade.locationOutOfReach$.subscribe(() => {
      this.openDialog();
    });
  }

  public ngOnInit(): void {
    this.updateMarkers();
  }

  public onMapReady(map: Map): void {
    this.mapFacade.onMapReady(map);
  }

  private updateMarkers(): void {
    this.layers = this.stations.map((station) => this.mapFacade.createMarker(station));
  }

  public onMapClick(event: LeafletMouseEvent): void {
    this.mapFacade.handleMapClick(event);
  }

  private openDialog(): void {
    this.dialog.open(PopUpComponent, {
      width: '15rem',
      height: '10rem',
      data: { message: 'No train stations in the near area!' },
    });
  }
}
