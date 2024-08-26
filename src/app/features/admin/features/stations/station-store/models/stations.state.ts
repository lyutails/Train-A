import { StationInfo } from '../../models/station-info';
import { StationApiState } from './stations-api.state';

export interface StationsState extends StationApiState {
  stations: StationInfo[];
  isUpdating: boolean;
}
