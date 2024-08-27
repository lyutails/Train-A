import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { RidesFacade } from '../services/rides.facade';
import { RideRoute } from '../models/route';

export const routeResolver: ResolveFn<RideRoute> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot,
): Observable<RideRoute> => {
  const ridesFacade = inject(RidesFacade);
  const router = inject(Router);
  const id = activatedRouteSnapshot.paramMap.get('id');

  if (id) {
    return ridesFacade.getRouteRides(id).pipe(
      catchError(() => {
        router.navigate(['/not-found']);
        throw new Error('Route not found');
      }),
    );
  }

  return throwError(() => new Error('id parameter is missing'));
};
