export interface NominatimAddressInfo {
  place_id: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    town?: string;
    village?: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
    country_code: string;
  };
}
