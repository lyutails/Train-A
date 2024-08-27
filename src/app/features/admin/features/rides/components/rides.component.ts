import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideRoute } from '../models/route';

@Component({
  selector: 'TTP-rides',
  standalone: true,
  imports: [MatTableModule, MatCardModule, NgFor, NgIf, AsyncPipe, MatProgressSpinnerModule, DatePipe],
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.scss',
})
export class RidesComponent implements OnInit, OnDestroy {
  private readonly destroy$$ = new Subject<void>();
  public rideRoute = signal<RideRoute | null>(null);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        map((data: { route?: RideRoute }) => data.route),
        filter((rideRoute): rideRoute is RideRoute => Boolean(rideRoute)),
        takeUntil(this.destroy$$),
        tap(console.log),
      )
      .subscribe({
        next: (rideRoute) => {
          this.rideRoute.set(rideRoute);
        },
        error: (err) => {
          console.error('Failed to load ride route data', err);
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public returnToPreviousRoute(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
