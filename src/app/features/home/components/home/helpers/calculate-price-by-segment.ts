import { TripSchedule } from '../../../../../repositories/home/models/trip-schedule.model';

export const calculateTotalPricesAndSeatByCarriage = (
  schedule: TripSchedule,
  departureIndex: number,
  arrivalIndex: number,
): Promise<{ prices: Record<string, number>; takenSeats: number[] }> => {
  return new Promise((resolve, reject) => {
    const totalPricesByCarriage: Record<string, number> = {};
    const takeSeats: Set<number> = new Set<number>();

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

      segment.occupiedSeats.forEach((seat) => takeSeats.add(seat));
    }

    resolve({
      prices: totalPricesByCarriage,
      takenSeats: Array.from(takeSeats),
    });
  });
};
