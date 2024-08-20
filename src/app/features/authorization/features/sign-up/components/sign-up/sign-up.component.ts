import { MatButton, MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
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
import { matchPassword } from '../../passwords-match.directive';
import { SignupService } from '../../signup.service';

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
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  public signUpButtonName = 'Register';
  public signInButtonName = 'Sign In';
  public formTitle = 'Sign Up';
  public signUpForm!: FormGroup<SignUpForm>;
  @ViewChild('input') inputElement!: ElementRef;

  constructor(
    private router: Router,
    private readonly fb: NonNullableFormBuilder,
    private signup: SignupService,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.signUpFormInstance;
  }

  public onSubmit() {
    if (
      this.signUpForm.controls.password.value ===
      this.signUpForm.value.password?.trim()
      /* this.signUpForm.value.password?.trim() &&
      this.signUpForm.value.repeatPassword?.trim() */
    ) {
      this.register();
      this.signUpForm.reset();
    }
  }

  private get signUpFormInstance(): FormGroup<SignUpForm> {
    return this.fb.group<SignUpForm>(
      {
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
            Validators.pattern('^\\S*$'),
          ],
        ),
        repeatPassword: this.fb.control(
          {
            value: '',
            disabled: false,
          },
          [
            Validators.required,
            Validators.pattern('^\\S*$'),
            // matchPassword('password', 'repeatPassword'),
          ],
        ),
      },
      { validators: matchPassword('password', 'repeatPassword') },
    );
  }

  register() {
    this.signup
      .signup(
        this.signUpForm.controls.email.value,
        this.signUpForm.controls.password.value,
      )
      .subscribe((data) => {
        console.log('lalala', data);
        // return this.redirectToSignIn;
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

  public get redirectToSignIn() {
    return this.router.navigate(['/signin']);
  }
}
