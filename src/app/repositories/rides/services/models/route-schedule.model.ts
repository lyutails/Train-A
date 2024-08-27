import { RouteSection } from './route-section.model';

export interface RouteSchedule {
  rideId: number;
  segments: RouteSection[];
}
