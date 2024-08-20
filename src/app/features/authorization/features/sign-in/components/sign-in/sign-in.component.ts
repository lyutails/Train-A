import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignInForm } from '../../models/sign-in.model';

interface AuthResponse {
  token?: string;
}

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
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public signInForm: FormGroup<SignInForm>;
  public signInButtonName = 'Sign In';
  public isSubmitting = false;
  public errorMessage: string | null = null;

  constructor(
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
  ) {
    this.signInForm = this.signInFormInstance;
  }

  public onSubmit(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const { email, password } = this.signInForm.value;

    this.http
      .post<AuthResponse>('/api/auth/signin', { email, password })
      .pipe(
        catchError(() => {
          this.errorMessage =
            'Authentication failed. Please check your credentials.';
          this.isSubmitting = false;
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (response?.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          this.isSubmitting = false;
        }
      });
  }

  private get signInFormInstance(): FormGroup<SignInForm> {
    return this.fb.group<SignInForm>({
      email: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [
            Validators.required,
            Validators.pattern(
              '^[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\\.[a-zA-Zа-яА-Я]{2,}$',
            ),
          ],
        },
      ),
      password: this.fb.control(
        {
          value: '',
          disabled: false,
        },
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^S*$'),
        ],
      ),
    });
  }
}
