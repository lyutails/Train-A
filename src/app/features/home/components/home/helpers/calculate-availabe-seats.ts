import { Carriage } from '../../../../admin/features/carriages/models/carriage.model';

export const calculateAvailableSeatsByCarriage = (
  carriages: Carriage[],
  occupiedSeats: number[],
): { carriageCode: string; availableSeats: number }[] => {
  let seatOffset = 0;

  return carriages
    .filter((carriage) => carriage.code)
    .map((carriage) => {
      const totalSeats = carriage.rows * (carriage.leftSeats + carriage.rightSeats);
      const validOccupiedSeats = occupiedSeats.filter((seat) => seat > seatOffset && seat <= seatOffset + totalSeats);

      const availableSeats = totalSeats - validOccupiedSeats.length;
      seatOffset += totalSeats;

      return {
        carriageCode: carriage.code!,
        availableSeats,
      };
    });
};
