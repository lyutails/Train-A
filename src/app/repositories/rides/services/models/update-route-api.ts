import { RouteSection } from './route-section.model';

export interface UpdateRideApi {
  id: number;
  rideId: number;
  routeSection: RouteSection;
}
