import { createReducer, on } from '@ngrx/store';
import { stationsInitialState } from '../constants/stations-initial-state';
import { stationsApiActions } from '../actions/stations-api-actions';
import { StationsState } from '../models/stations.state';
import { stationActions } from '../actions/station.actions';

export const stationReducer = createReducer(
  stationsInitialState,
  on(
    stationsApiActions.loadStations,
    (state): StationsState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    stationsApiActions.loadStationsSuccess,
    (state, { stations }): StationsState => ({
      ...state,
      isLoading: false,
      stations,
    }),
  ),
  on(
    stationsApiActions.loadStationsFailure,
    (state, { errorMessage }): StationsState => ({
      ...state,
      isLoading: false,
      errorMessage,
    }),
  ),

  on(
    stationActions.createStation,
    (state): StationsState => ({
      ...state,
      isUpdating: true,
    }),
  ),
  on(
    stationActions.createStationSuccess,
    (state, { station }): StationsState => ({
      ...state,
      isUpdating: false,
      errorMessage: null,
      stations: [...state.stations, station],
    }),
  ),
  on(
    stationActions.createStationFailure,
    (state, { errorMessage }): StationsState => ({
      ...state,
      isUpdating: false,
      errorMessage,
    }),
  ),

  on(
    stationActions.deleteStation,
    (state): StationsState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    stationActions.deleteStationSuccess,
    (state, { id }): StationsState => ({
      ...state,
      isLoading: false,
      stations: state.stations.filter((station) => station.id !== id),
    }),
  ),
  on(
    stationActions.deleteStationFailure,
    (state, { errorMessage }): StationsState => ({
      ...state,
      isLoading: false,
      errorMessage,
    }),
  ),
);
