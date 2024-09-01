import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../../../common/button/button.component';
import { Router } from '@angular/router';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'TTP-auth-buy-seat',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatDialogActions, MatDialogContent, MatDialogClose, MatIcon, MatIconButton],
  templateUrl: './auth-buy-seat.component.html',
  styleUrl: './auth-buy-seat.component.scss',
})
export class AuthBuySeatComponent {
  public dialogRef = inject(MatDialogRef<AuthBuySeatComponent>);
  public data = inject(MAT_DIALOG_DATA);
  public popupAuthToBuy = model('');

  constructor(private readonly router: Router) {}

  redirectToSignIn() {
    this.router.navigate(['/auth/signin']);
    this.dialogRef.close();
  }

  redirectToSignUp() {
    this.router.navigate(['/auth/signup']);
    this.dialogRef.close();
  }

  closeAuthToBuyPopup() {
    this.dialogRef.close();
  }
}
