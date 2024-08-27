import { LatLng } from 'leaflet';
import { StationInfo } from '../../stations/models/station-info';

export const findStationByCoordinates = (latlng: LatLng, stations: StationInfo[]): StationInfo | undefined => {
  const lat = latlng.lat;
  const lng = latlng.lng;

  return stations.find((station) => station.latitude === lat && station.longitude === lng);
};
