import { Component } from '@angular/core';
import { MapComponent } from '../../map/compnents/map.component';
import { StationsFacade } from '../station-store/services/stations.facade';
import { StationInfo } from '../models/station-info';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TrainConnectionsPipe } from '../pipes/train-connections.pipe';
import { ButtonComponent } from '../../../../../common/button/button.component';

@Component({
  selector: 'TTP-station',
  standalone: true,
  imports: [MapComponent, NgFor, AsyncPipe, NgIf, TrainConnectionsPipe, ButtonComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
})
export class StationComponent {
  constructor(public readonly stationsFacade: StationsFacade) {
    this.stationsFacade.getStations();
  }

  public trackByFn(index: number, item: StationInfo): number {
    return item.id;
  }
}
