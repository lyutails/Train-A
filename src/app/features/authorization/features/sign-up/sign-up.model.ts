import { FormControl } from '@angular/forms';

export interface SignUpForm {
  email: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}

export interface SignUpErrors {
  404: 'invalidUniqueKey';
}
