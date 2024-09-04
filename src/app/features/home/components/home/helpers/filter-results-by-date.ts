import { SearchRideResult } from '../../../models/search-ride-result';

export const filterResultsByDates = (results: SearchRideResult[], selectedDate: Date | null): SearchRideResult[] => {
  if (!selectedDate) {
    return results;
  }

  const selectedDateOnly = Date.parse(selectedDate.toISOString().split('T')[0]);

  return results.filter((result) => {
    const resultDate = new Date(result.departure);
    const resultDateOnly = Date.parse(resultDate.toISOString().split('T')[0]);
    return resultDateOnly === selectedDateOnly;
  });
};
