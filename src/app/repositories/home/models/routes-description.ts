import { RouteSegments } from '../../rides/services/models/route-section.model';

export interface RoutesDesciption extends RouteSegments {
  occupiedSeats: number[];
}
