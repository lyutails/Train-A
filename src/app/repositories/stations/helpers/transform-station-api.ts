import { StationApi } from '../models/station-api.model';

export const transformStationApi = (stations: StationApi[]) => {
  return stations.map((station) => ({
    id: station.id,
    city: station.city,
    latitude: station.latitude,
    longitude: station.longitude,
    relations: station.connectedTo.map((connection) => connection.id),
  }));
};
