import { TripSchedule } from './trip-schedule.model';

export interface CurrentRoute {
  id: number;
  path: number[];
  carriages: string[];
  schedule: TripSchedule[];
}
