import { DatePipe } from '@angular/common';
import { TrainRouteMapResultCities } from './train-route-results';
import { calculateStopDuration } from './transform-detailed-route-date';
import { ModalRoute } from '../../../models/model-route';

export const transformDetailedRoute = (detailedRoute: TrainRouteMapResultCities): ModalRoute[] => {
  const { cities, allTimes } = detailedRoute;
  const datePipe = new DatePipe('en-US');

  const formatTimeToUTC = (dateString: string): string => {
    const date = new Date(dateString);
    return datePipe.transform(date, 'HH:mm', '+0000') || '';
  };

  return cities.map((city, index) => {
    let stop: string;
    let time: string;

    if (index === 0) {
      stop = 'First station';
      time = formatTimeToUTC(allTimes[index][0]);
    } else if (index === cities.length - 1) {
      stop = 'Last station';
      time = formatTimeToUTC(allTimes[allTimes.length - 1][0]);
    } else {
      stop = calculateStopDuration(allTimes[index - 1][1], allTimes[index][0]);
      time = `${formatTimeToUTC(allTimes[index - 1][1])}-${formatTimeToUTC(allTimes[index][0])}`;
    }

    return {
      time,
      station: city,
      stop,
    };
  });
};
