export interface TrainRouteMapResult {
  currentPath: number[];
  allTimes: [string, string][];
}

export type TrainRouteMapResultCities = Omit<TrainRouteMapResult, 'currentPath'> & { cities: string[] };
