import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideRoute } from '../models/route';
import { getPricesByValue } from '../helpers/get-prices-by-value';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { RidePriceFormComponent } from './ride-price-form/ride-price-form.component';

@Component({
  selector: 'TTP-rides',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    NgFor,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    DatePipe,
    ReactiveFormsModule,
    MatFormField,
    CommonModule,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatFormField,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormField,
    ButtonComponent,
    MatTooltipModule,
    RidePriceFormComponent,
  ],
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.scss',
})
export class RidesComponent implements OnInit, OnDestroy {
  private readonly destroy$$ = new Subject<void>();
  public priceList = getPricesByValue;
  @Input() price!: { key: string; value: number };
  public rideRoute!: RideRoute;

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
      .subscribe((rideRoute) => {
        this.rideRoute = rideRoute;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public returnToPreviousRoute(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  public trackByValue(index: number, item: { key: string; value: number }): string {
    return item.value.toString();
  }
}
