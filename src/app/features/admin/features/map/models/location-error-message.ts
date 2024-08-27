import { LocationErrorType } from './location-error-types';

export const LOCATION_ERROR_MESSAGES: Record<LocationErrorType, string> = {
  OUT_OF_REACH: 'Location is out of reach!',
  ALREADY_EXISTS: 'Train station already exist at this location!',
  NOT_FOUND: 'Location could not be found!',
  NO_CONNECTIONS_FOUND: 'Station is not connected to any stations! Please select connected stations first.',
  NO_STATION_SELECTED: 'Station was not selected. Please set new station!',
};
