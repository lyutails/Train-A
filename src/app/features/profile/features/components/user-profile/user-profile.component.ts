import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { User } from '../../models/user-model';

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
    MatFormField,
    ChangePasswordDialogComponent,
  ],

  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  user: User = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };
  isEditingName = false;
  isEditingEmail = false;
  editableName = 'John Doe';
  editableEmail = 'john.doe@example.com';
  newPassword = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.http.get('/api/profile').subscribe({
      next: (data) => {
        this.user = data as User;
        this.editableName = this.user.name;
        this.editableEmail = this.user.email;
      },
      error: (error: { status: number }) => {
        if (error.status === 401) {
          // this.router.navigate(['/login']);
        }
      },
      complete: () => {
        console.log('User info retrieval completed.');
      },
    });
  }

  startEditing(field: string) {
    if (field === 'name') {
      this.isEditingName = true;
    } else if (field === 'email') {
      this.isEditingEmail = true;
    }
  }

  saveName() {
    this.http
      .put('/api/profile', { name: this.editableName, email: this.user.email })
      .subscribe({
        next: () => {
          this.user.name = this.editableName;
          this.isEditingName = false;
        },
        error: (error) => {
          console.error('Error updating name', error);
        },
      });
  }

  saveEmail() {
    this.http
      .put('/api/profile', { name: this.user.name, email: this.editableEmail })
      .subscribe({
        next: () => {
          this.user.email = this.editableEmail;
          this.isEditingEmail = false;
        },
        error: (error) => {
          console.error('Error updating email', error);
        },
      });
  }

  openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newPassword = result;
        console.log(result);
      }
    });
  }
  // savePassword() {
  //   this.http.put('/api/profile/password', { password: this.newPassword })
  //     .subscribe({
  //       next: () => {
  //         this.closeChangePasswordModal();
  //       },
  //       error: (error: any) => {
  //         console.error('Error changing password', error);
  //       }
  //     });
  // }

  // Выход из системы
  logout() {
    this.http.delete('/api/logout').subscribe({
      next: () => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
