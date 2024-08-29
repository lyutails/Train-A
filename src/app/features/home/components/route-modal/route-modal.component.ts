import { Component, inject, model, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatHint } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'TTP-route-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIcon, MatHint, MatIconButton],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss',
})
export class RouteModalComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<RouteModalComponent>);
  public data = inject(MAT_DIALOG_DATA);
  public popupRoute = model(this.data.route);

  /*  testRoutesInfo = [
    { time: '18:00', station: 'endStationName', stop: 'First station' },
    { time: '19:00', station: 'lalala1', stop: '2m' },
    { time: '20:00', station: 'lalala2', stop: '5m' },
    { time: '20:00', station: 'startStationName', stop: 'Last station' },
  ]; */

  ngOnInit() {
    this.dialogRef.updateSize('50vw', 'auto');
  }

  closeRoutePopup() {
    this.dialogRef.close();
  }
}
