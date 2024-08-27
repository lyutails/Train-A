import { createActionGroup, props } from '@ngrx/store';
import { NewStationDetails } from '../../models/station.model';
import { StationInfo } from '../../models/station-info';

export const stationActions = createActionGroup({
  source: 'Station Page',
  events: {
    'Create Station': props<{ newStation: NewStationDetails }>(),
    'Create Station Success': props<{ station: StationInfo }>(),
    'Create Station Failure': props<{ errorMessage: string }>(),
    'Delete Station': props<{ id: number }>(),
    'Delete Station Success': props<{ id: number }>(),
    'Delete Station Failure': props<{ errorMessage: string }>(),
  },
});
