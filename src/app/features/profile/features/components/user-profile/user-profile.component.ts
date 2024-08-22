import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { MatDialogModule } from '@angular/material/dialog';
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
export class UserProfileComponent implements OnInit, AfterViewInit {
  @Input() editable = false;
  public profileForm!: FormGroup<ProfileForm>;
  userCredentials: UserCredentials = { name: '', email: '' };
  editIconColour = 'oklch(49.71% 0.165 259.85deg)';
  isNameBeingEdited = false;
  @ViewChild('inputName')
  inputName!: HTMLInputElement;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.profileForm = this.profileFormInstance;
    this.profileForm.controls['name'].disable();
    this.profileForm.controls['email'].disable();
  }

  ngAfterViewInit(): void {
    // const localStorageCredentials = localStorage.getItem('credentials');
    // this.userCredentials.name = localStorageCredentials ? JSON.parse(localStorageCredentials)! : '';
    this.userCredentials = { name: 'lalala@lalala.com', email: 'lalala@lalala.com' };
    if (this.isNameBeingEdited === false) {
      const { email } = this.userCredentials;
      this.userCredentials = { name: `${email?.trim().replace(/@(.*)$/, '')}`, email: `${email}` };
    }
    // this.userCredentials = { name: '', email: 'lalala@lalala.com' };
    this.cdr.detectChanges();
  }

  /* setName(value: string) {
    this.profileForm.controls.name.value = value;
  }

  setEmail(value: string) {
    this.profileForm.controls.name.value = value;
  } */

  private get profileFormInstance(): FormGroup<ProfileForm> {
    return this.fb.group<ProfileForm>({
      name: this.fb.control(
        {
          value: '',
          disabled: false,
        },
        [Validators.required, Validators.pattern('^\\S*$'), Validators.minLength(2), Validators.maxLength(20)],
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

  public get nameFormControl(): FormControl<string> {
    return this.profileForm.controls.name;
  }

  public get emailFormControl(): FormControl<string> {
    return this.profileForm.controls.email;
  }

  public editName() {
    this.profileForm.controls['name'].enable();
  }

  public editEmail() {
    this.profileForm.controls['email'].enable();
  }

  public saveName() {
    if (this.profileForm?.get('name')?.valid) {
      this.userCredentials.name = this.profileForm.controls.name.value;
      this.profileForm.controls['name'].disable();
    }
  }

  public saveEmail() {
    if (this.profileForm?.get('email')?.valid) {
      this.userCredentials.email = this.profileForm.controls.email.value;
      this.profileForm.controls['email'].disable();
    }
  }

  /* openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  } */

  logoutAndRedirectToHome() {
    this.router.navigate(['']);
  }
}
