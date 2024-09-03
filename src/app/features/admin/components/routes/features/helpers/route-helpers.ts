import { RouteAPI } from '../models/routes.model';
import { StationApi } from '../../../../../../repositories/stations/models/station-api.model';
import { transformStationApi } from '../../../../../../repositories/stations/helpers/transform-station-api';

export function getRouteDetails(route: RouteAPI, stations: StationApi[]): RouteAPI {
  const transformedStations = transformStationApi(stations);

  const routeStations = route.path
    .map((stationId) => {
      return transformedStations.find((station) => station.id === stationId);
    })
    .filter(Boolean);

  return {
    ...route,
    path: routeStations.map((station) => station!.id),
    carriages: route.carriages,
  };
}
