import { JourneyList } from '../../../../../repositories/home/models/journey-list.model';

export const transformScheduleTime = (data: JourneyList): Date[] => {
  const times: Set<string> = new Set<string>();

  data.routes.forEach((route) => {
    const departureIndex = route.path.indexOf(data.from.stationId);

    route.schedule.forEach((sch) => {
      const relevantTime = sch.segments.length > departureIndex ? new Date(sch.segments[departureIndex].time[0]) : null;

      if (relevantTime) {
        const dateString = relevantTime.toISOString().split('T')[0];
        times.add(dateString);
      }
    });
  });

  const sortedDates = Array.from(times)
    .map((dateStr) => new Date(dateStr))
    .sort((a, b) => a.getTime() - b.getTime());
  return sortedDates;
};
