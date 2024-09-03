export const getCarriagesKey = (carriages: string[]): string[] => {
  const uniqueCarriages = new Set(carriages);
  return Array.from(uniqueCarriages);
};
