import { Polyline } from 'leaflet';
import { StationInfo } from '../../stations/models/station-info';
import { isLatLngArray } from './is-latlng-array-type';

export const findStationRelatiove = (polylines: Polyline[], stations: StationInfo[]): Set<number> => {
  const uniqueRelations = new Set<number>();

  polylines.forEach((polyline) => {
    const latlngs = polyline.getLatLngs();
    if (isLatLngArray(latlngs)) {
      latlngs.forEach((latlng) => {
        stations.forEach((station) => {
          if (station.latitude === latlng.lat && station.longitude === latlng.lng) {
            uniqueRelations.add(station.id);
          }
        });
      });
    }
  });

  return uniqueRelations;
};
