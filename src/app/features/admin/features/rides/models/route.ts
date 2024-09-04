import { RouteSchedule } from '../../../../../repositories/rides/services/models/route-schedule.model';

export interface RideRoute {
  id: number;
  path: string[];
  carriages: string[];
  schedule: RouteSchedule[];
}
