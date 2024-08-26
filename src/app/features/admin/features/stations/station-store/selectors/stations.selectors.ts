import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StationsState } from '../models/stations.state';

const selectStationsFeature = createFeatureSelector<StationsState>('stations');

export const selectIsLoading = createSelector(selectStationsFeature, (state) => state.isLoading);

export const selectIsUpdating = createSelector(selectStationsFeature, (state) => state.isUpdating);

export const selectStations = createSelector(selectStationsFeature, (state) => state.stations);

export const selectErrorMessage = createSelector(selectStationsFeature, ({ errorMessage }) => errorMessage);
