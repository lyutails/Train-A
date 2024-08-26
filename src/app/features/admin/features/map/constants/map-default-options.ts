import { latLng, tileLayer } from 'leaflet';

const layerMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const copyRight = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const mapDefaultoptions = {
  layers: [
    tileLayer(layerMap, {
      maxZoom: 18,
      minZoom: 3,
      attribution: copyRight,
    }),
  ],
  zoom: 7,
  center: latLng(50.0755, 14.4378),
};
