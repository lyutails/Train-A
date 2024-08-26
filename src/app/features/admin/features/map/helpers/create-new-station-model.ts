import { Marker, Polyline } from 'leaflet';
import { findStationRelatiove } from './find-station-relations';
import { StationInfo } from '../../stations/models/station-info';
import { NewStationDetails } from '../../stations/models/station.model';

export const createStation = (
  marker: Marker,
  polylines: Polyline[],
  stations: StationInfo[],
): NewStationDetails | null => {
  const city = marker.getTooltip()?.getContent()?.toString();
  const latitude = marker.getLatLng().lat;
  const longitude = marker.getLatLng().lng;
  const trainRelations = findStationRelatiove(polylines, stations);
  if (city) {
    const stationDetails: NewStationDetails = {
      city,
      latitude,
      longitude,
      relations: Array.from(trainRelations),
    };
    return stationDetails;
  }
  return null;
};
