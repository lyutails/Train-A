export interface SearchResponse {
  from: FromTo;
  to: FromTo;
  routes: RoutesResponse;
}

export interface FromTo {
  stationId: number;
  city: string;
  geolocation: Geolocation;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
}

export interface RoutesResponse {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}

export interface Schedule {
  rideId: number;
  segments: Segment;
}

export interface Segment {
  time: Time;
  price: Price;
  occupiedSeats: number[];
}

export interface Price {
  type: number;
}

export interface Time {
  departure_from_prev_station: string;
  arrival_at_next_station: string;
}
