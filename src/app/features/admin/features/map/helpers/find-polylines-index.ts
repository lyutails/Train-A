import { Marker, Polyline } from 'leaflet';
import { isLatLngArray } from './is-latlng-array-type';

export const findPolylineIndex = (marker: Marker, polylines: Polyline[]) => {
  const clickedLatLng = marker.getLatLng();

  for (let i = 0; i < polylines.length; i++) {
    const polylineLatLngs = polylines[i].getLatLngs();

    if (isLatLngArray(polylineLatLngs)) {
      if (polylineLatLngs.some((latLng) => latLng.equals(clickedLatLng))) {
        return i + 1;
      }
    }
  }

  return -1;
};
