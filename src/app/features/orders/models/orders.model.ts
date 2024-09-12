import { Segments } from './../../trip-details/models/segments.model';
export interface OrderParameters {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: 'active' | 'completed' | 'rejected' | 'canceled';
  path: number[];
  carriages: string[];
  stationEnd: number;
  stationStart: number;
  schedule: { segments: Omit<Segments, 'occupiedSeats'>[] };
}
