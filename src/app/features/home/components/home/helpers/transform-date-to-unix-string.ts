export const transformDateToUnixString = (dateStr: string, timeStr: string): number => {
  const date = new Date(dateStr);
  const [hours, minutes] = timeStr.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);

  return date.getTime();
};
