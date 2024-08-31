import { RouteSegments } from './route-section.model';

export interface UpdateRideApi {
  id: number;
  rideId: number;
  segments: RouteSegments[];
}
