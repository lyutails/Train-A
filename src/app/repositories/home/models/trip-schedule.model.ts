import { RoutesDesciption } from './routes-description';

export interface TripSchedule {
  rideId: number;
  segments: RoutesDesciption[];
}
