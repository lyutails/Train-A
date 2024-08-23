import { Component } from '@angular/core';
import { MapComponent } from '../../map/compnents/map.component';
import { StationsFacade } from '../services/stations.facade';

@Component({
  selector: 'TTP-station',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
})
export class StationComponent {
  constructor(private readonly stationFacade: StationsFacade) {
    this.stationFacade.getStations().subscribe();
  }
}
