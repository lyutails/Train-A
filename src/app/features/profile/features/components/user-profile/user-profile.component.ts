import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { ProfileFacade } from '../../../services/profile.facade';
import { ProfileInformation } from '../../../../../repositories/profile/services/models/profile-information.model';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { ProfileForm } from '../../models/profile-form.model';

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
    ButtonComponent,
  ],

  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user: ProfileInformation | undefined;
  profileForm: FormGroup<ProfileForm> | undefined;
  isEditingName = false;
  isEditingEmail = false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private facade: ProfileFacade,
  ) {
    this.getUserInfo();
  }

  ngOnInit() {
    this.profileForm = new FormGroup<ProfileForm>({
      editableName: new FormControl(this.user?.name || ''),
      editableEmail: new FormControl(this.user?.email || '', [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\\.[a-zA-Zа-яА-Я]{2,}$'),
      ]),
    });
  }

  getUserInfo() {
    this.facade.getUserProfile().subscribe({
      next: (data: ProfileInformation) => {
        this.user = data;
        this.profileForm?.setValue({
          editableName: this.user!.name,
          editableEmail: this.user!.email,
        });
      },
      error: (error: { status: number }) => {
        if (error.status === 401) {
          this.router.navigate(['auth/signin']);
        }
      },
      complete: () => {
        console.log('User info retrieval completed.');
      },
    });
  }

  get editableNameControl(): FormControl | null {
    const control = this.profileForm?.get('editableName');
    return control instanceof FormControl ? control : null;
  }

  get editableEmailControl(): FormControl | null {
    const control = this.profileForm?.get('editableEmail');
    return control instanceof FormControl ? control : null;
  }

  startEditing(field: string) {
    if (field === 'name') {
      this.isEditingName = true;
    } else if (field === 'email') {
      this.isEditingEmail = true;
    }
  }

  saveName() {
    const nameControl = this.profileForm?.get('editableName');
    if (nameControl && nameControl.valid && this.user) {
      this.user.name = nameControl.value?.trim() || '';
      this.facade.updateUserProfile(this.user).subscribe({
        next: (data: ProfileInformation) => {
          if (data) {
            this.user = data;
            this.profileForm?.setValue({
              editableName: data.name || '',
              editableEmail: data.email || '',
            });
            this.isEditingName = false;
          }
        },
        error: (error: Error) => {
          console.error('Error updating name', error);
        },
      });
    }
  }

  saveEmail() {
    const emailControl = this.profileForm?.get('editableEmail');
    if (emailControl && emailControl.valid && this.user) {
      this.user.email = emailControl.value?.trim() || '';
      this.facade.updateUserProfile(this.user).subscribe({
        next: (data: ProfileInformation) => {
          if (data) {
            this.user = data;
            this.profileForm?.setValue({
              editableName: data.name || '',
              editableEmail: data.email || '',
            });
            this.isEditingEmail = false;
          }
        },
        error: (error: Error) => {
          console.error('Error updating email', error);
        },
      });
    }
  }

  openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
    dialogRef.afterClosed().subscribe({
      error: (error: Error) => {
        console.error('Error changing password', error);
      },
    });
  }

  logout() {
    this.facade.logout().subscribe(() => {
      console.log('logout');
    });
  }
}
