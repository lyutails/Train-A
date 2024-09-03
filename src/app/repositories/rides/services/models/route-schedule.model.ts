import { RouteSegments } from './route-section.model';

export interface RouteSchedule {
  rideId: number;
  segments: RouteSegments[];
}
