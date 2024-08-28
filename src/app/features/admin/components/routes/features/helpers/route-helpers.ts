import { RouteAPI } from '../models/routes.model';
import { StationApi } from '../../../../../../repositories/stations/models/station-api.model';

export function getRouteDetails(route: RouteAPI, stations: StationApi[]): RouteAPI {
  const routeStations = route.path
    .map((stationId) => {
      return stations.find((station) => station.id === stationId);
    })
    .filter(Boolean);

  return {
    ...route,
    path: routeStations.map((station) => station!.id),
    carriages: route.carriages,
  };
}
