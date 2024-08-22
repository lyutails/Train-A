import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { ProfileForm } from './models/sign-up.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserCredentials } from './models/user-credentials.models';
import { TrimPipe } from '../../../../../common/pipes/trim-pipe/trim.pipe';

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
    MatTooltipModule,
    TrimPipe,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  @Input() editable = false;
  public profileForm!: FormGroup<ProfileForm>;
  isEditingName = false;
  isEditingEmail = false;
  userCredentials: UserCredentials = { name: '', email: '' };
  editIconColour = 'oklch(49.71% 0.165 259.85deg)';

  constructor(
    private dialog: MatDialog,
    private readonly fb: NonNullableFormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.profileForm = this.profileFormInstance;
    this.userCredentials = { name: '', email: 'lalala@lalala.com' };
    /* this.profileForm.controls['name'].disable();
    this.profileForm.controls['email'].disable(); */
  }

  private get profileFormInstance(): FormGroup<ProfileForm> {
    return this.fb.group<ProfileForm>({
      name: this.fb.control(
        {
          value: '',
          disabled: false,
        },
        [Validators.required, Validators.pattern('^\\S*$'), Validators.minLength(1), Validators.maxLength(10)],
      ),
      email: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [
            Validators.required,
            Validators.pattern('^[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\\.[a-zA-Zа-яА-Я]{2,}$'),
          ],
        },
      ),
    });
  }

  public get editNameControl(): FormControl<string> {
    return this.profileForm.controls.name;
  }

  public get editEmailControl(): FormControl<string> {
    return this.profileForm.controls.email;
  }

  public startEditing(field: string) {
    if (field === 'name') {
      this.isEditingName = true;
    } else if (field === 'email') {
      this.isEditingEmail = true;
    }
  }

  public saveName() {
    if (this.profileForm?.get('name')?.valid) {
      this.userCredentials.name = this.profileForm.controls.name.value;
      this.isEditingName = false;
    }
  }

  public saveEmail() {
    if (this.profileForm?.get('email')?.valid) {
      this.userCredentials.email = this.profileForm.controls.email.value;
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
    this.router.navigate(['']);
  }
}
