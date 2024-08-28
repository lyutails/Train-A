import { Carriage } from '../../../../features/carriages/models/carriage.model';

export interface RouteAPI {
  id: number;
  path: number[];
  carriages: Carriage[];
}
