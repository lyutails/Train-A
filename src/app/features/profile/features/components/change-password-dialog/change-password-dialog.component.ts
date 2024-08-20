import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'TTP-change-password-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss',
})
export class ChangePasswordDialogComponent {
  newPassword = '';

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {}

  save(): void {
    this.dialogRef.close(this.newPassword);
  }

  close(): void {
    this.dialogRef.close();
  }
}
