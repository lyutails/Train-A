import { Component } from '@angular/core';
import { MapComponent } from '../../map/compnents/map.component';

@Component({
  selector: 'TTP-station',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss',
})
export class StationComponent {}
