import { Pipe, PipeTransform } from '@angular/core';
import { StationInfo } from '../models/station-info';

@Pipe({
  name: 'trainConnections',
  standalone: true,
})
export class TrainConnectionsPipe implements PipeTransform {
  transform(relationIds: number[], stations: StationInfo[] | null): string[] {
    if (!relationIds || !stations) {
      return [];
    }

    return relationIds.map((id) => {
      const station = stations.find((station) => station.id === id);
      return station ? station.city : 'Unknown';
    });
  }
}
