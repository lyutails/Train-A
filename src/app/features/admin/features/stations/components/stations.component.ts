import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../../map/compnents/map.component';
import { StationsFacade } from '../station-store/services/stations.facade';
import { StationInfo } from '../models/station-info';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TrainConnectionsPipe } from '../pipes/train-connections.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'TTP-station',
  standalone: true,
  imports: [MapComponent, NgFor, AsyncPipe, NgIf, TrainConnectionsPipe, MatProgressSpinnerModule],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
})
export class StationComponent implements OnInit {
  constructor(public readonly stationsFacade: StationsFacade) {}

  ngOnInit(): void {
    this.stationsFacade.getStations();
  }

  public trackByFn(index: number, item: StationInfo): number {
    return item.id;
  }
}
