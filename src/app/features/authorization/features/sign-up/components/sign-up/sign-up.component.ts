import { LoadingService } from './../../../../../../common/services/loading/loading.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpForm } from '../../models/sign-up.model';
import { ButtonComponent } from '../../../../../../common/button/button.component';
import { matchPassword } from '../../validators/passwords-match.directive';
import { UserInfo } from '../../../../models/user-info.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TrimPipe } from '../../../../../../common/pipes/trim-pipe/trim.pipe';
import { LoadingButtonComponent } from '../../../../../../common/loading-button/loading-button.component';
import { AuthorizationService } from '../../../../../../repositories/authorization/services/authorization.service';

@Component({
  selector: 'TTP-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatInput,
    MatIcon,
    MatLabel,
    MatFormField,
    MatIconButton,
    MatSuffix,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    MatError,
    TrimPipe,
    LoadingButtonComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup<SignUpForm>;
  emailValue = signal('');
  currentEmailInputValue = signal('');

  constructor(
    private router: Router,
    private readonly fb: NonNullableFormBuilder,
    private readonly authorizationService: AuthorizationService,
    public loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.signUpFormInstance;
    this.signUpForm.controls.email.valueChanges.subscribe((data) => this.currentEmailInputValue.set(data));
  }

  public onSubmit() {
    this.register();
  }

  isEqualToLastEmail = computed(() => {
    if (this.emailValue() !== '' && this.emailValue() !== this.currentEmailInputValue()) {
      return true;
    }
    return false;
  });

  private get signUpFormInstance(): FormGroup<SignUpForm> {
    return this.fb.group<SignUpForm>(
      {
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
        repeatPassword: this.fb.control(
          {
            value: '',
            disabled: false,
          },
          [Validators.required, Validators.pattern('^\\S*$')],
        ),
      },
      { validators: matchPassword('password', 'repeatPassword') },
    );
  }

  private register() {
    this.authorizationService.signUp(this.userInfo).subscribe({
      next: () => {
        this.router.navigate(['auth/signin']);
      },
      error: ({ error }: HttpErrorResponse) => {
        if (error.reason === 'invalidUniqueKey') {
          this.signUpForm.controls['email'].setErrors({ invalidUniqueKey: true });
          this.emailValue.set(this.signUpForm.controls.email.value);
        }
      },
    });
  }

  public get emailFormControl(): FormControl<string> {
    return this.signUpForm.controls.email;
  }

  public get passwordFormControl(): FormControl<string> {
    return this.signUpForm.controls.password;
  }

  public get repeatPasswordFormControl(): FormControl<string> {
    return this.signUpForm.controls.repeatPassword;
  }

  public get userInfo(): UserInfo {
    return {
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
    };
  }

  public get redirectToSignIn() {
    return this.router.navigate(['auth/signin']);
  }
}
