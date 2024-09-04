import { Schedule } from './schedule.model';

export interface TripDetailsResponse {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: Schedule;
}
