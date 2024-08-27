import { StationsState } from '../models/stations.state';

export const stationsInitialState: StationsState = {
  isLoading: false,
  errorMessage: null,
  stations: [],
  isUpdating: false,
};
