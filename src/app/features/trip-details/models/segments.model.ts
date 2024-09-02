import { Price } from './price.model';

export interface Segments {
  time: string[];
  price: Price;
  occupiedSeats: number[];
}
