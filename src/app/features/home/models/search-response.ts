import { FromTo } from './from-to.model';
import { RoutesResponse } from './routes-response.model';

export interface SearchResponse {
  from: FromTo;
  to: FromTo;
  routes: RoutesResponse;
}
