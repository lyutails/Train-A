import { RouteSchedule } from './route-schedule.model';

export interface RouteApi {
  id: number;
  path: number[];
  carriages: string[];
  schedule: RouteSchedule[];
}
