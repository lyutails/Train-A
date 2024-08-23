import { ProfileFacade } from './../../../services/profile.facade';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  model,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
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
import { ButtonComponent } from '../../../../../common/button/button.component';
import { ProfileInfo } from '../models/profile.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TrimPipe } from '../../../../../common/pipes/trim-pipe/trim.pipe';
import { PasswordUpdateComponent } from '../password-update/password-update.component';
import { Router } from '@angular/router';
import { ProfileForm } from '../models/profile-form.model';
import { ProfileInformation } from '../../../../../repositories/profile/services/models/profile-information.model';

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
    ButtonComponent,
    MatTooltipModule,
    TrimPipe,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  @Input() editable = false;
  @ViewChild('inputName')
  public inputName!: HTMLInputElement;
  public profileForm!: FormGroup<ProfileForm>;
  public userCredentials: ProfileInformation = { name: '', email: '', role: 'user' };
  public editIconColour = 'oklch(49.71% 0.165 259.85deg)';
  public isNameBeingEdited = false;
  public editSaveName = signal(true);
  public editSaveEmail = signal(true);
  public screenWidth!: number;
  public popupPassword = signal('');
  public passwordValue = model('');
  public dialog = inject(MatDialog);
  public admin = signal('');

  constructor(
    private fb: NonNullableFormBuilder,
    private cdr: ChangeDetectorRef,
    private profileFacade: ProfileFacade,
    private router: Router,
  ) {}

  ngOnInit() {
    this.profileForm = this.profileFormInstance;
    this.profileFacade.getUserProfile().subscribe({
      next: (data) => {
        console.log('get user', data);
        this.userCredentials = data;
        if (!data.name) {
          this.userCredentials.name = '';
        }
      },
      error: () => {
        console.error('Failed trying to change password');
      },
    });
    this.profileForm.controls['name'].disable();
    this.profileForm.controls['email'].disable();
    this.screenWidth = window.innerWidth;
    if (this.userCredentials.role === 'manager') {
      this.admin.set('manager');
    }
  }

  ngAfterViewInit() {
    if (this.userCredentials.role === 'manager') {
      this.admin.set('manager');
    }
  }

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
    this.editSaveName.set(false);
  }

  public editEmail() {
    this.profileForm.controls['email'].enable();
    this.editSaveEmail.set(false);
  }

  public saveName() {
    if (this.profileForm?.get('name')?.valid) {
      this.userCredentials.name = this.profileForm.controls.name.value;
      this.profileForm.controls['name'].disable();
    }
    this.editSaveName.set(true);
  }

  public saveEmail() {
    if (this.profileForm?.get('email')?.valid) {
      this.userCredentials.email = this.profileForm.controls.email.value;
      this.profileForm.controls['email'].disable();
    }
    this.editSaveEmail.set(true);
  }

  public get UserInfo(): ProfileInformation {
    return {
      name: this.profileForm.controls.name.value,
      email: this.profileForm.controls.email.value,
      role: this.userCredentials.role,
    };
  }

  public get profileInfo(): ProfileInfo {
    return {
      name: this.profileForm.controls.name.value,
      email: this.profileForm.controls.email.value,
    };
  }

  public updateUserProfileOnServer() {
    this.profileFacade.updateUserProfile(this.profileInfo).subscribe({
      next: (data) => {
        console.log('update', data, this.profileInfo);
        data.name = this.profileInfo.name;
        data.email = this.profileInfo.email;
      },
      error: () => {
        console.error('Failed trying to change password');
      },
    });
  }

  public openPasswordModal() {
    const dialogRef = this.dialog.open(PasswordUpdateComponent, {
      data: { password: this.passwordValue() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.passwordValue.set(result);
      }
    });
  }

  public logoutAndRedirectToHome() {
    this.profileFacade.logout().subscribe(() => {
      console.log('logout success');
    });
    this.router.navigate(['']);
  }
}
