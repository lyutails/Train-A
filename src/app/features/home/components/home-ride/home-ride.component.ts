import { Component, inject, Input, model, OnDestroy, signal } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe, KeyValuePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouteModalComponent } from '../route-modal/route-modal.component';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { SearchRideResult } from '../../models/search-ride-result';
import { Router } from '@angular/router';
import { CarriagesService } from '../../../../repositories/carriages/services/carriages.service';
import { map, Subject, takeUntil } from 'rxjs';
import { CarriagesWithPrice } from '../../models/carriages-with-prices';
import { calculateAvailableSeatsByCarriage } from '../home/helpers/calculate-availabe-seats';

@Component({
  selector: 'TTP-home-ride',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIcon,
    CommonModule,
    MatDialogModule,
    MatTooltipModule,
    MatTooltip,
    DatePipe,
    KeyValuePipe,
  ],
  templateUrl: './home-ride.component.html',
  styleUrl: './home-ride.component.scss',
})
export class HomeRideComponent implements OnDestroy {
  @Input() tripInfo!: SearchRideResult;
  public searchCarriages = signal(false);
  public dialog = inject(MatDialog);
  public popupRoute = signal('');
  public routeValue = model('');
  public carriagesWithPrices: CarriagesWithPrice[] = [];
  private readonly destroy$$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly carriagesService: CarriagesService,
  ) {
    this.carriagesService
      .getCarriages()
      .pipe(
        map((carriages) => {
          const availableSeatsData = calculateAvailableSeatsByCarriage(carriages, this.tripInfo.occupiedSeats);
          const availableSeatsMap = new Map<string, number>(
            availableSeatsData.map((item) => [item.carriageCode, item.availableSeats]),
          );

          const carriagesWithPrices = carriages.map((carriage) => {
            const price = carriage.code ? this.tripInfo.price[carriage.code] : undefined;
            const availableSeats =
              availableSeatsMap.get(carriage.code || '') || carriage.rows * (carriage.leftSeats + carriage.rightSeats);

            return {
              ...carriage,
              price,
              availableSeats,
            };
          });

          return carriagesWithPrices;
        }),
        takeUntil(this.destroy$$),
      )
      .subscribe((carriagesWithPrices) => {
        this.carriagesWithPrices = carriagesWithPrices;
      });
  }

  public pickTripDetails() {
    this.router.navigate(['/trip', this.tripInfo.rideId], {
      queryParams: { from: this.tripInfo.departureStation.id, to: this.tripInfo.arrivalStation.id },
    });
  }

  public openRouteModal() {
    const dialogRef = this.dialog.open(RouteModalComponent, {
      data: {
        routes: [
          { time: '18:00', station: 'startStationName', stop: 'First station' },
          { time: '19:00', station: 'lalala1', stop: '2m' },
          { time: '20:00', station: 'lalala2', stop: '5m' },
          { time: '20:00', station: 'endStationName', stop: 'Last station' },
        ],
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      return;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
