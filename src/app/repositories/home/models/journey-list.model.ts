import { CurrentRoute } from './current-route.model';
import { StationInfo } from './station-info.model';

export interface JourneyList {
  from: StationInfo;
  to: StationInfo;
  routes: CurrentRoute[];
}
