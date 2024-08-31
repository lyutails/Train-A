import { Component, inject, Input, model, OnInit, signal } from '@angular/core';
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
export class HomeRideComponent implements OnInit {
  @Input() tripName!: number;
  @Input() tripFrom = '';
  @Input() tripTo = '';
  @Input() routeFrom = '';
  @Input() routeTo = '';
  @Input() timeFrom = '';
  @Input() timeTo = '';
  @Input() carriages!: Carriage[];
  @Input() rideId!: number;
  public hoursFrom = signal(0);
  public minutesFrom = signal(0);
  public dayFrom = signal(0);
  public monthFrom = signal(0);
  public hoursTo = signal(0);
  public minutesTo = signal(0);
  public dayTo = signal(0);
  public monthTo = signal(0);
  public startDate = signal(0);
  public endDate = signal(0);
  public dialog = inject(MatDialog);
  public popupRoute = signal('');
  public routeValue = model('');

  testCarriages: Carriage[] = [
    { code: 'lalala', name: 'lalala', rows: 5, leftSeats: 2, rightSeats: 2 },
    { code: 'justCarriage', name: 'justCarriage', rows: 10, leftSeats: 3, rightSeats: 1 },
    { code: 'oneMore', name: 'oneMore', rows: 6, leftSeats: 2, rightSeats: 3 },
    { code: 'carriage2A', name: 'carriage2A', rows: 16, leftSeats: 2, rightSeats: 2 },
  ];

  ngOnInit() {
    const dateFrom = Date.parse(this.timeFrom);
    const date1 = new Date(dateFrom * 1000);
    this.hoursFrom.set(date1.getHours());
    this.minutesFrom.set(date1.getMinutes());
    this.dayFrom.set(date1.getDay());
    this.monthFrom.set(date1.getMonth());
    this.startDate.set(dateFrom);

    const dateTo = Date.parse(this.timeTo);
    const date2 = new Date(dateTo * 1000);
    this.hoursTo.set(date2.getHours());
    this.minutesTo.set(date2.getMinutes());
    this.dayTo.set(date2.getDay());
    this.monthTo.set(date1.getMonth());
    this.endDate.set(dateTo);
  }

  public pickTripDetails() {
    // /trip/:rideId?from=stationId&to=stationId
  }

  public openRouteModal() {
    const dialogRef = this.dialog.open(RouteModalComponent, {
      data: {
        rideid: this.rideId,
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
