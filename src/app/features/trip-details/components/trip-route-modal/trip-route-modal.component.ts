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
  selector: 'TTP-trip-route-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIcon, MatHint, MatIconButton],
  templateUrl: './trip-route-modal.component.html',
  styleUrl: './trip-route-modal.component.scss',
})
export class TripRouteModalComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<TripRouteModalComponent>);
  public data = inject(MAT_DIALOG_DATA);
  public popupTripRoutes = model(this.data.routes);

  public numberOfPoints = this.data.routes.length;

  pointCoordinates() {
    const point0 = document.getElementById('point0');
    if (point0) {
      const rect = point0.getBoundingClientRect();
      const coordinates0 = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      };
      console.log(coordinates0.left, coordinates0.top);
      return coordinates0;
    }
    return;
  }

  ngOnInit() {
    this.dialogRef.updateSize('50vw', 'auto');
  }

  closeTripRoutePopup() {
    this.dialogRef.close();
  }
}
