export const transformDateToHours = (startDateStr: string, endDateStr: string): string => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const differenceInMs = endDate.getTime() - startDate.getTime();

  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}HH:${formattedMinutes}MM`;
};
