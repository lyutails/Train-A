import { Price } from './price.model';
import { Time } from './time.model';

export interface Segment {
  time: Time;
  price: Price;
  occupiedSeats: number[];
}
