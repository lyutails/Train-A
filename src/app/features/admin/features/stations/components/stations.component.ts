import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../../map/compnents/map.component';
import { StationsFacade } from '../station-store/services/stations.facade';
import { StationInfo } from '../models/station-info';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TrainConnectionsPipe } from '../pipes/train-connections.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TOOLTIP_TEXT } from '../models/tool-tip-content';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'TTP-station',
  standalone: true,
  imports: [
    MapComponent,
    NgFor,
    AsyncPipe,
    NgIf,
    TrainConnectionsPipe,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
})
export class StationComponent implements OnInit {
  public tooltipContent = TOOLTIP_TEXT;

  constructor(public readonly stationsFacade: StationsFacade) {}

  ngOnInit(): void {
    this.stationsFacade.getStations();
  }

  public trackByFn(index: number, item: StationInfo): number {
    return item.id;
  }
}
