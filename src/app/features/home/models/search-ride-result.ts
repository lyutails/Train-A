export interface SearchRideResult {
  departureStation: {
    id: number;
    name: string;
  };
  arrivalStation: {
    id: number;
    name: string;
  };
  departure: string;
  arrival: string;
  totalTime: string;
  price: Record<string, number>;
}
