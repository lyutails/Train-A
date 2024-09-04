import { Component, inject, Input, model, signal } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe, KeyValuePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouteModalComponent } from '../route-modal/route-modal.component';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { SearchRideResult } from '../../models/search-ride-result';
import { Router } from '@angular/router';

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
export class HomeRideComponent {
  @Input() tripInfo!: SearchRideResult;
  public searchCarriages = signal(false);
  public dialog = inject(MatDialog);
  public popupRoute = signal('');
  public routeValue = model('');

  constructor(private readonly router: Router) {}

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
}
