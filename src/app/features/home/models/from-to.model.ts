import { Geolocation } from './geolocation.model';

export interface FromTo {
  stationId: number;
  city: string;
  geolocation: Geolocation;
}
