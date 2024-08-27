import { FormControl } from '@angular/forms';

export interface CarriageForm {
  code?: FormControl<string>;
  name?: FormControl<string>;
  rows: FormControl<number>;
  leftSeats: FormControl<number>;
  rightSeats: FormControl<number>;
}
