import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignInForm } from '../../models/sign-in.model';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../../../common/button/button.component';
import { AuthorizationService } from '../../../../../../repositories/authorization/services/authorization.service';
import { UserInfo } from '../../../../models/user-info.model';
import { ViewEncapsulation } from '@angular/core';
import { TrimPipe } from '../../../../../../common/pipes/trim-pipe/trim.pipe';

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
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  public signInForm: FormGroup<SignInForm>;
  public signInButtonName = 'Sign In';
  public isSubmitting = false;
  public emailErrorMessage: string | null = null;
  public passwordErrorMessage: string | null = null;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly http: HttpClient,
    private router: Router,
    private readonly authorizationService: AuthorizationService,
  ) {
    this.signInForm = this.signInFormInstance;
  }

  public onSubmit(): void {
    if (this.signInForm.invalid) {
      return;
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
    this.authorizationService.signIn(this.userInfo).subscribe({
      next: ({ token }) => {
        this.authorizationService.saveTokenToLocalStorage(token);
        this.router.navigate(['/']);
      },
      error: ({ error }: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.clearErrorMessages();

        if (error.reason === 'alreadyLoggedIn') {
          this.signInForm.controls['email'].setErrors({ alreadyLoggedIn: true });
        }
      },
    });
  }

  private clearErrorMessages(): void {
    this.emailErrorMessage = null;
    this.passwordErrorMessage = null;
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
}
