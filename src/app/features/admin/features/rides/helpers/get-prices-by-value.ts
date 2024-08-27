export const getPricesByValue = (price: Record<string, number>): { key: string; value: number }[] => {
  return Object.entries(price).map(([key, value]) => ({ key, value }));
};
