import { Carriage } from '../../admin/features/carriages/models/carriage.model';

export interface CarriagesWithPrice extends Carriage {
  price?: number;
  availableSeats: number;
}
