import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'TTP-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormField,
    ChangePasswordDialogComponent,
  ],

  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user = { name: 'John Doe', email: 'john.doe@example.com' };

  profileForm: FormGroup | undefined;
  isEditingName = false;
  isEditingEmail = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      editableName: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      editableEmail: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  get editableNameControl(): FormControl {
    return this.profileForm?.get('editableName') as FormControl;
  }

  get editableEmailControl(): FormControl {
    return this.profileForm?.get('editableEmail') as FormControl;
  }

  startEditing(field: string) {
    if (field === 'name') {
      this.isEditingName = true;
    } else if (field === 'email') {
      this.isEditingEmail = true;
    }
  }

  saveName() {
    if (this.profileForm?.get('editableName')?.valid) {
      this.user.name = this.profileForm.get('editableName')?.value.trim();
      this.isEditingName = false;
    }
  }

  saveEmail() {
    if (this.profileForm?.get('editableEmail')?.valid) {
      this.user.email = this.profileForm.get('editableEmail')?.value.trim();
      this.isEditingEmail = false;
    }
  }

  openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  logout() {
    console.log('logout');
  }
}
