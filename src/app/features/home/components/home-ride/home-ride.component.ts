import { Component, inject, Input, model, signal } from '@angular/core';
import { ButtonComponent } from '../../../../common/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouteModalComponent } from '../route-modal/route-modal.component';
import { Carriage } from '../../../admin/features/carriages/models/carriage.model';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'TTP-home-ride',
  standalone: true,
  imports: [ButtonComponent, MatIcon, CommonModule, MatDialogModule, MatTooltipModule, MatTooltip],
  templateUrl: './home-ride.component.html',
  styleUrl: './home-ride.component.scss',
})
export class HomeRideComponent {
  @Input() tripName = '';
  @Input() tripFrom = '';
  @Input() tripTo = '';
  public searchCarriages = signal(false);
  public dialog = inject(MatDialog);
  public popupRoute = signal('');
  public routeValue = model('');

  testCarriages: Carriage[] = [
    { code: 'lalala', name: 'lalala', rows: 5, leftSeats: 2, rightSeats: 2 },
    { code: 'justCarriage', name: 'justCarriage', rows: 10, leftSeats: 3, rightSeats: 1 },
    { code: 'oneMore', name: 'oneMore', rows: 6, leftSeats: 2, rightSeats: 3 },
    { code: 'carriage2A', name: 'carriage2A', rows: 16, leftSeats: 2, rightSeats: 2 },
  ];

  public pickTripDetails() {
    this.getCarriages();
    // router.navigate /trip/:rideId?from=stationId&to=stationId
  }

  public getCarriages() {
    this.searchCarriages.set(true);
    // api call here
    // this.carriages = data
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
