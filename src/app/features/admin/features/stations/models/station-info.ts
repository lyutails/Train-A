export interface StationInfo {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  relations: number[];
  connectedTo?: StationInfo[];
}
