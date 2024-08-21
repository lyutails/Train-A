import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPassword(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName);
    const repeatPasswordControl = formGroup.get(matchingControlName);

    if (!passwordControl || !repeatPasswordControl) {
      return null;
    }

    if (passwordControl.value !== repeatPasswordControl.value) {
      repeatPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      repeatPasswordControl.setErrors(null);
    }

    return null;
  };
}
