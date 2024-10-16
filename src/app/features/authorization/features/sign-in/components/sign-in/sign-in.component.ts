import { Component, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { SignInForm } from '../../models/sign-in.model';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../../../common/button/button.component';
import { UserInfo } from '../../../../models/user-info.model';
import { AuthFacade } from '../../../../../../core/authorization/services/auth.facade';
import { ViewEncapsulation } from '@angular/core';
import { TrimPipe } from '../../../../../../common/pipes/trim-pipe/trim.pipe';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'TTP-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ButtonComponent,
    TrimPipe,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  public signInForm: FormGroup<SignInForm>;
  public signInButtonName = 'Sign In';
  public isSubmitting = false;
  public hide = signal(true);

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private router: Router,
    private readonly authFacade: AuthFacade,
  ) {
    this.signInForm = this.signInFormInstance;
  }

  public onSubmit(): void {
    this.signInForm.setErrors(null);

    if (this.signInForm.invalid) {
      return this.signInForm.markAllAsTouched();
    }

    this.isSubmitting = true;
    this.signIn();
  }

  private get signInFormInstance(): FormGroup<SignInForm> {
    return this.fb.group<SignInForm>({
      email: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [
            Validators.required,
            Validators.pattern('^[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\\.[a-zA-Zа-яА-Я]{2,}$'),
          ],
        },
      ),
      password: this.fb.control(
        {
          value: '',
          disabled: false,
        },
        [Validators.required, Validators.minLength(8), Validators.pattern('^\\S*$')],
      ),
    });
  }

  private signIn() {
    this.authFacade.signIn(this.userInfo).subscribe({
      next: ({ token }) => {
        this.authFacade.saveUserInfo(token);
        this.router.navigate(['/']);
      },
      error: ({ error }: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.clearErrorMessages();

        if (error.reason === 'invalidFields') {
          this.signInForm.controls['email'].setErrors({ invalidFields: true });
          this.signInForm.controls['password'].setErrors({ invalidFields: true });
        } else if (error.reason === 'invalidEmail') {
          this.signInForm.controls['email'].setErrors({ invalidEmail: true });
        } else if (error.reason === 'alreadyLoggedIn') {
          this.signInForm.controls['email'].setErrors({ alreadyLoggedIn: true });
        } else {
          this.signInForm.setErrors({ formError: true });
        }
      },
    });
  }

  private clearErrorMessages(): void {
    this.signInForm.controls['email'].setErrors(null);
    this.signInForm.controls['password'].setErrors(null);
  }

  public get redirectToSignUp() {
    return this.router.navigate(['/auth/signup']);
  }

  public get userInfo(): UserInfo {
    return {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value,
    };
  }

  public showHidePassword() {
    this.hide.set(!this.hide());
  }
}
