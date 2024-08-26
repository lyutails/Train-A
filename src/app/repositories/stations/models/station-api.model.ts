import { ConnectedStationsApi } from './connected-stations--api.model';

export interface StationApi {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedStationsApi[];
}
