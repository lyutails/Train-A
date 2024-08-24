import { FormArray, FormControl } from '@angular/forms';

export interface Carriage {
  code?: FormControl<string>;
  name?: FormControl<string>;
  rows: FormControl<number>;
  leftSeats: FormArray<FormControl<number>>;
  rightSeats: FormArray<FormControl<number>>;
}
