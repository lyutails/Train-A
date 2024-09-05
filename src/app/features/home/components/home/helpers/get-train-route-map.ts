import { CurrentRouteWithRideId } from '../../../../../repositories/home/models/current-route.model';
import { TrainRouteMapResult } from './train-route-results';

export const getTrainRouteMap = (data: CurrentRouteWithRideId, from: number, to: number): TrainRouteMapResult => {
  const departureIndex = data.path.indexOf(from);
  const arrivalIndex = data.path.indexOf(to);
  const currentPath = data.path.slice(departureIndex, arrivalIndex + 1);

  const allTimes: [string, string][] = [];

  const schedule = data.schedule;

  const relevantSegments = schedule.segments.slice(departureIndex, arrivalIndex);
  relevantSegments.forEach((segment) => {
    allTimes.push([segment.time[0], segment.time[1]]);
  });

  return { currentPath, allTimes };
};
