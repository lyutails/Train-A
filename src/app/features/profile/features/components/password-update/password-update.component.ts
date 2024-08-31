import { Component, inject, model, OnInit } from '@angular/core';
import { PasswordPopupData } from '../models/password-popup.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { ProfileService } from '../../../../../repositories/profile/services/profile.service';
import { ProfileFacade } from '../../../services/profile.facade';
import { TrimPipe } from '../../../../../common/pipes/trim-pipe/trim.pipe';

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
    MatIconButton,
    MatHint,
    TrimPipe,
    MatError,
    ReactiveFormsModule,
  ],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.scss',
})
export class PasswordUpdateComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<PasswordUpdateComponent>);
  public data = inject<PasswordPopupData>(MAT_DIALOG_DATA);
  public popupPassword = model(this.data.password);
  public changePasswordForm!: FormGroup<PasswordPopupData>;

  constructor(
    private fb: NonNullableFormBuilder,
    public profileService: ProfileService,
    public profileFacade: ProfileFacade,
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.changePasswordFormInstance;
  }

  private get changePasswordFormInstance(): FormGroup<PasswordPopupData> {
    return this.fb.group<PasswordPopupData>({
      password: this.fb.control(
        {
          value: '',
          disabled: false,
        },
        [Validators.required, Validators.minLength(8), Validators.pattern('^\\S*$')],
      ),
    });
  }

  public get passwordFormControl(): FormControl<string> {
    return this.changePasswordForm.controls.password;
  }

  public saveAndClosePasswordPopup() {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.controls.password.value;
      this.profileFacade.updatePassword(newPassword).subscribe({
        next: () => {
          this.closePasswordPopup();
        },
        error: () => {
          console.error('Failed trying to change password');
        },
      });
      this.changePasswordForm.reset();
    }
  }

  closePasswordPopup() {
    this.dialogRef.close();
  }
}
