import { TripSchedule } from '../../../../../repositories/home/models/trip-schedule.model';

export const calculateTotalPricesByCarriage = (
  schedule: TripSchedule,
  departureIndex: number,
  arrivalIndex: number,
): Promise<Record<string, number>> => {
  return new Promise((resolve, reject) => {
    const totalPricesByCarriage: Record<string, number> = {};

    if (departureIndex < 0 || arrivalIndex >= schedule.segments.length || departureIndex > arrivalIndex) {
      return reject(new Error('Invalid departure or arrival index'));
    }

    for (let i = departureIndex; i <= arrivalIndex; i++) {
      const segment = schedule.segments[i];

      for (const [carriageType, price] of Object.entries(segment.price)) {
        if (!totalPricesByCarriage[carriageType]) {
          totalPricesByCarriage[carriageType] = 0;
        }
        totalPricesByCarriage[carriageType] += price;
      }
    }

    resolve(totalPricesByCarriage);
  });
};
