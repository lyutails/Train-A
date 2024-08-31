import { LatLng } from 'leaflet';

export const isLatLngArray = (latLngs: unknown): latLngs is LatLng[] => {
  return Array.isArray(latLngs) && latLngs.every((latLng) => latLng instanceof LatLng);
};
