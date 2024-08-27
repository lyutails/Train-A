import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StationInfo } from '../../models/station-info';

export const stationsApiActions = createActionGroup({
  source: 'Station Page',
  events: {
    'Load Stations': emptyProps(),
    'Load Stations Success': props<{ stations: StationInfo[] }>(),
    'Load Stations Failure': props<{ errorMessage: string }>(),
  },
});
