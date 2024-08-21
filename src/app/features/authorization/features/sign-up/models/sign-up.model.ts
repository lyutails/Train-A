import { FormControl } from '@angular/forms';

export interface SignUpForm {
  email: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}

export interface SignUpResponse {
  400: 'Bad Request';
  200: 'Success';
}

export interface ErrorMessages {
  message: string;
  reason: string;
}
