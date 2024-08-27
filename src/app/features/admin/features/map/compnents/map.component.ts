import { Component, OnInit } from '@angular/core';
import { LeafletMouseEvent, Marker, Map } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { mapDefaultoptions } from '../constants/map-default-options';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../../../common/pop-up-window/components/pop-up/pop-up.component';
import { MapFacade } from '../services/map.facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { StationsFacade } from '../../stations/station-store/services/stations.facade';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'TTP-map',
  standalone: true,
  imports: [
    LeafletModule,
    ButtonComponent,
    MatProgressSpinnerModule,
    NgIf,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  public layers: Marker[] = [];
  public options = mapDefaultoptions;

  constructor(
    public readonly mapFacade: MapFacade,
    public readonly stationFacade: StationsFacade,
    public dialog: MatDialog,
  ) {
    this.mapFacade.popuUpErrors$.subscribe((errorMessage) => {
      this.openDialog(errorMessage);
    });
  }

  public ngOnInit(): void {
    this.updateMarkers();
  }

  public onMapReady(map: Map): void {
    this.mapFacade.onMapReady(map);
  }

  private updateMarkers(): void {
    this.mapFacade.getStations().subscribe((stations) => {
      this.layers = stations.map((station) => this.mapFacade.createMarker(station));
    });
  }

  public onMapClick(event: LeafletMouseEvent): void {
    this.mapFacade.handleMapClick(event);
  }

  private openDialog(message: string): void {
    this.dialog.open(PopUpComponent, {
      width: '15rem',
      height: '8rem',
      data: {
        message,
      },
    });
  }

  public saveStation(): void {
    this.mapFacade.saveStation();
  }
}
