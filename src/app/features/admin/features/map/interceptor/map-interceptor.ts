import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const mapInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (request.url.startsWith('/api/openstreetmap')) {
    const baseUrl = 'https://nominatim.openstreetmap.org/reverse';
    const url = `${baseUrl}?${request.url.substring('/api/openstreetmap?'.length)}`;

    const mapRequest = request.clone({
      url: url,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
    return next(mapRequest);
  }
  return next(request);
};
