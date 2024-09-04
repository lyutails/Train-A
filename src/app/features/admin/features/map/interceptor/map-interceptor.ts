import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const mapInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const baseUrl = 'https://nominatim.openstreetmap.org';
  let url = '';

  if (request.url.startsWith('/api/openstreetmap')) {
    if (request.url.includes('/api/openstreetmap/reverse')) {
      url = `${baseUrl}/reverse?${request.url.substring('/api/openstreetmap/reverse?'.length)}`;
    } else if (request.url.includes('/api/openstreetmap/search')) {
      url = `${baseUrl}/search?${request.url.substring('/api/search/openstreetmap?'.length)}`;
    }

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
