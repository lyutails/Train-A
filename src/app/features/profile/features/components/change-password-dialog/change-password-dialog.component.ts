import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'TTP-change-password-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss',
})
export class ChangePasswordDialogComponent {
  changePasswordForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {
    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  save(): void {
    if (this.changePasswordForm.valid) {
      const password = this.newPassword?.value.trim();
      this.dialogRef.close(password);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
