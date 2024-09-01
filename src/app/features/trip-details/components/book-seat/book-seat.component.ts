import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonComponent } from '../../../../common/button/button.component';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'TTP-book-seat',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatDialogActions, MatDialogContent, MatDialogClose, MatIcon],
  templateUrl: './book-seat.component.html',
  styleUrl: './book-seat.component.scss',
})
export class BookSeatComponent {
  public dialogRef = inject(MatDialogRef<BookSeatComponent>);
  public data = inject(MAT_DIALOG_DATA);
  public popupBookSeat = model(this.data.password);

  constructor(private readonly router: Router) {}

  /* public saveAndClosePasswordPopup() {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.controls.password.value;
      this.profileFacade.updatePassword(newPassword).subscribe({
        next: () => {
          this.closePasswordPopup();
        },
        error: () => {
          console.error('Failed trying to change password');
        },
      });
      this.changePasswordForm.reset();
    }
  } */

  closeBookSeatPopup() {
    this.dialogRef.close();
  }
}
