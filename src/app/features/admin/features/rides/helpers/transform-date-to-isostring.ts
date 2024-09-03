export const transformDateToIsoString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};
