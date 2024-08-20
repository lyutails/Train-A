import { MatButton, MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
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
import { SignUpForm } from '../../sign-up.model';
import { ButtonComponent } from '../../../../../../common/button/button.component';

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
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  public signUpButtonName = 'Register';
  public signInButtonName = 'Sign In';
  public formTitle = 'Sign Up';
  public signUpForm!: FormGroup<SignUpForm>;

  constructor(
    private router: Router,
    private readonly fb: NonNullableFormBuilder,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.signUpFormInstance;
  }

  public onSubmit() {
    if (
      this.signUpForm.valid &&
      this.passwordFormControl === this.repeatPasswordFormControl
    ) {
      this.signUpForm.reset();
    }
  }

  private get signUpFormInstance(): FormGroup<SignUpForm> {
    return this.fb.group<SignUpForm>({
      email: this.fb.control(
        { value: '', disabled: false },
        { validators: [Validators.required, Validators.email] },
      ),
      password: this.fb.control(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required, Validators.minLength(8)] },
      ),
      repeatPassword: this.fb.control(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required, Validators.minLength(8)] },
      ),
    });
  }

  public get emailFormControl(): FormControl<string> {
    return this.signUpForm.controls.email;
  }

  public get passwordFormControl(): FormControl<string> {
    return this.signUpForm.controls.password;
  }

  public get repeatPasswordFormControl(): FormControl<string> {
    return this.signUpForm.controls.password;
  }

  public get redirectToSignIn() {
    return this.router.navigate(['/signin']);
  }
}
