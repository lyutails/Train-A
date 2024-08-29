import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isoDateValidator(): ValidatorFn {
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

  return (control: AbstractControl): Record<string, boolean> | null => {
    const value = control.value;

    if (value && !isoDatePattern.test(value)) {
      return { invalidDate: true };
    }

    if (value) {
      const controlDate = new Date(value).getTime();
      const now = new Date().getTime();

      if (controlDate < now) {
        return { invalidDate: true, pastDate: true };
      }
    }

    return null;
  };
}
