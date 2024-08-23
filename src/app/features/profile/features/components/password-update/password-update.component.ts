import { Component, inject, model } from '@angular/core';
import { PasswordPopupData } from '../models/password-popup.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'TTP-password-update',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    ButtonComponent,
    MatDialogClose,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.scss',
})
export class PasswordUpdateComponent {
  public dialogRef = inject(MatDialogRef<PasswordUpdateComponent>);
  public data = inject<PasswordPopupData>(MAT_DIALOG_DATA);
  public popupPassword = model(this.data.password);

  closePasswordPopup() {
    this.dialogRef.close();
  }
}
