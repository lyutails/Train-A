import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isoDateValidator(): ValidatorFn {
  const isoDatePattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/;

  return (control: AbstractControl): Record<string, boolean> | null => {
    if (control.value && !isoDatePattern.test(control.value)) {
      return { invalidDate: true };
    }
    return null;
  };
}
