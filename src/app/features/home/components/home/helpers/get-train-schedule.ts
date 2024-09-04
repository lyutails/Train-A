import { JourneyList } from '../../../../../repositories/home/models/journey-list.model';
import { SearchRideResult } from '../../../models/search-ride-result';
import { calculateTotalPricesByCarriage } from './calculate-price-by-segment';
import { transformDateToHours } from './transform-date-diffrence-to-hours';

export const getTrainSchedules = async (data: JourneyList): Promise<SearchRideResult[]> => {
  const results: SearchRideResult[] = [];

  for (const route of data.routes) {
    const departureIndex = route.path.indexOf(data.from.stationId);
    const arrivalIndex = route.path.indexOf(data.to.stationId);

    if (departureIndex === -1 || arrivalIndex === -1 || departureIndex >= arrivalIndex) {
      continue;
    }

    for (const sch of route.schedule) {
      const departure = sch.segments[departureIndex]?.time[0];
      const arrival = sch.segments[arrivalIndex - 1]?.time[1];

      if (departure !== null && arrival !== null) {
        const totalTime = transformDateToHours(departure, arrival);

        try {
          const prices = await calculateTotalPricesByCarriage(sch, departureIndex, arrivalIndex - 1);

          const result: SearchRideResult = {
            departureStation: { id: data.from.stationId, name: data.from.city },
            arrivalStation: { id: data.to.stationId, name: data.to.city },
            departure: departure,
            arrival: arrival,
            totalTime: totalTime,
            price: prices,
          };

          results.push(result);
        } catch (error) {
          console.error('Error calculating total prices:', error);
        }
      }
    }
  }

  results.sort((a, b) => {
    const departureA = new Date(a.departure).getTime();
    const departureB = new Date(b.departure).getTime();
    return departureA - departureB;
  });

  return results;
};
