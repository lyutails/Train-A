import { Schedule } from './schedule.model';

export interface RoutesResponse {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}
